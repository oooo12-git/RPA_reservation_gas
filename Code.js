function sayHello() {
  Logger.log("Hello, world!");
}

function formSubmit(e) {
    Logger.log('formSubmit 함수 실행됨');
    // 시트 response와 시트 info 참조 가져오기
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheetResponse = ss.getSheetByName('response');
    const sheetInfo = ss.getSheetByName('info');
    
    // 폼 제출 데이터를 가져오기
    const responses = e.values;
    
    // 시트 response의 마지막 행 데이터 가져오기
    const lastRow = sheetResponse.getLastRow();
    const newRecord = sheetResponse.getRange(lastRow, 1, 1, sheetResponse.getLastColumn()).getValues()[0];
    
    // response 시트의 새로운 행에서 B열부터 J열까지의 데이터 가져오기
    const sourceData = sheetResponse.getRange(lastRow, 2, 1, 9).getValues()[0];
    
    // info 시트의 마지막 행 가져오기
    const lastRowInfo = sheetInfo.getLastRow();
    
    // info 시트의 다음 행(A3부터 시작)에 데이터 붙여넣기
    sheetInfo.getRange(lastRowInfo + 1, 1, 1, 9).setValues([sourceData]);
}

function edit(e) {
  // 수정된 범위 가져오기
  Logger.log('edit 함수 실행됨');
  const range = e.range;
  const sheet = range.getSheet();
  var sheetName = sheet.getName();
  var row = range.getRow();
  var editedColumn = range.getColumn();
  var value = range.getValue();

  
  // info 시트의 T열(체크박스 열)이 수정되었는지 확인
  if (sheetName === 'info' && editedColumn === 20) { // T열은 20번째 열
    
    // 체크박스가 체크되었는지 확인
    if (value === true) {
      // I열(numberOfPeople)의 값 가져오기
      const numberOfPeople = sheet.getRange(row, 9).getValue(); // I열은 9번째 열
      
      // numberOfPeople이 숫자인지 확인
      if (!isNaN(numberOfPeople) && numberOfPeople !== "") {
        // 숫자인 경우 예치금 계산
        const depositWon = numberOfPeople * 100000;
        const depositDollar = numberOfPeople * 79.6;
        
        sheet.getRange(row, 21).setValue(depositWon);
        sheet.getRange(row, 22).setValue(depositDollar);
      } else {
        // 숫자가 아닌 경우 "기입필요" 입력
        sheet.getRange(row, 21).setValue("기입필요");
        sheet.getRange(row, 22).setValue("기입필요");
      }

      // 가격 정보 계산 로직
      calculateAndSetPrice(sheet, row);
    } else {
      // 체크 해제시 값 지우기
      sheet.getRange(row, 21).setValue('');
      sheet.getRange(row, 22).setValue('');
      sheet.getRange(row, 23).setValue('');
    }
  }

  var SEND_MAIL_COLUMN = 25; // AR열 = 26 + 18 열
  var CONFIRM_COLUMN = 26; // AS열 = 26 + 19 열

  if (sheetName === 'info' && editedColumn === SEND_MAIL_COLUMN && value == "Send!") {
    var rowValues = sheet.getRange(range.getRow(), 1, 1, sheet.getLastColumn()).getValues()[0];
    // range.getRow(): 현재 편집된 셀의 행 번호를 가져옵니다. 
    // 1 : 첫 번째 열(열 A)**부터 데이터를 가져옵니다.
    // 1 : 가져올 행의 개수, 즉 한 행만 가져옵니다.
    // sheet.getLastColumn(): 해당 시트의 마지막 열 번호를 가져옵니다.
    // getValues(): 위에서 지정한 범위의 데이터를 2차원 배열 형태로 가져옵니다. 예를 들어, 편집된 행에 데이터가 ["A", "B", "C"]라면, 반환값은 [["A", "B", "C"]]이 됩니다.
    // {values: ["A", "B", "C"]} 형태로 전달.
    addCalendarSendMailAddContact({values: rowValues, row: row});
  }
  if (sheetName === 'info' && editedColumn == CONFIRM_COLUMN && value == "confirmed!") {
    var rowValues = sheet.getRange(range.getRow(), 1, 1, sheet.getLastColumn()).getValues()[0];
    handleConfirmation({values: rowValues, row: row});
  }
}

function calculateAndSetPrice(sheet, row) {
  // 각 열의 값들을 가져오기
  // 10번째 열부터 9개의 열을 가져오기(J열 ~ R열)
  const values = sheet.getRange(row, 10, 1, 9).getValues()[0];
  let [couple_profile, group_profile, 
        individual_1st, individual_1st_hm, 
        individual_2nd, individual_2nd_hm,
        individual_3rd, individual_3rd_hm,
        individual_more_4] = values;

  // 가격 계산
  let priceText = "";
  
  // individual_more_4가 0이 아닌 경우 처리
  if (individual_more_4 !== 0) {
    sheet.getRange(row, 23).setValue("기입 필요");
    return;
  }

  let totalPrice = 0;  // 총액을 저장할 변수

  // Couple Profile 가격
  if (typeof couple_profile !== 'number') {
    couple_profile = false;
  }
  if (couple_profile) {
    const couplePrice = {1: 340000, 2: 490000, 3: 640000}[couple_profile];
    if (couplePrice) {
      totalPrice += couplePrice;
      priceText += `※ Shooting fee for Couple Profile: KRW ${couplePrice}\n\n`;
    }
  }

  // Group Profile 가격
  if (typeof group_profile !== 'number') {
    group_profile = false;
  }
  if (group_profile) {
    const groupPrice = {1: 400000, 2: 590000, 3: 790000}[group_profile];
    if (groupPrice) {
      totalPrice += groupPrice;
      priceText += `※ Shooting fee for Group Profile: KRW ${groupPrice}\n\n`;
    }
  }

  // Individual Profile 1st
  if (typeof individual_1st !== 'number') {
    individual_1st = false;
  }
  if (individual_1st && individual_1st !== 0) {
    const ind1Price = {1: 240000, 2: 340000, 3: 440000}[individual_1st];
    if (ind1Price) {
      totalPrice += ind1Price;
      priceText += `※ Shooting fee for Individual Profile 1st: KRW ${ind1Price}\n`;
      if (individual_1st_hm === "Yes") {
        const hmPrice = {1: 110000, 2: 132000, 3: 154000}[individual_1st];
        if (hmPrice) {
          totalPrice += hmPrice;
          priceText += `※ The fee for Hair & Makeup 1st: KRW ${hmPrice}\n`;
        }
      }
      priceText += "\n";
    }
  }

  // Individual Profile 2nd
  if (typeof individual_2nd !== 'number') {
    individual_2nd = false;
  }
  if (individual_2nd && individual_2nd !== 0) {
    const ind2Price = {1: 240000, 2: 340000, 3: 440000}[individual_2nd];
    if (ind2Price) {
      totalPrice += ind2Price;
      priceText += `※ Shooting fee for Individual Profile 2nd: KRW ${ind2Price}\n`;
      if (individual_2nd_hm === "Yes") {
        const hmPrice = {1: 110000, 2: 132000, 3: 154000}[individual_2nd];
        if (hmPrice) {
          totalPrice += hmPrice;
          priceText += `※ The fee for Hair & Makeup 2nd: KRW ${hmPrice}\n`;
        }
      }
      priceText += "\n";
    }
  }

  // Individual Profile 3rd
  if (typeof individual_3rd !== 'number') {
    individual_3rd = false;
  }
  if (individual_3rd && individual_3rd !== 0) {
    const ind3Price = {1: 240000, 2: 340000, 3: 440000}[individual_3rd];
    if (ind3Price) {
      totalPrice += ind3Price;
      priceText += `※ Shooting fee for Individual Profile 3rd: KRW ${ind3Price}\n`;
      if (individual_3rd_hm === "Yes") {
        const hmPrice = {1: 110000, 2: 132000, 3: 154000}[individual_3rd];
        if (hmPrice) {
          totalPrice += hmPrice;
          priceText += `※ The fee for Hair & Makeup 3rd: KRW ${hmPrice}\n`;
        }
      }
      priceText += "\n";
    }
  }

  // 총액 추가
  priceText += `\n※ Total Price: KRW ${totalPrice.toLocaleString()}`;

  // W열(23번째 열)에 결과 입력
  sheet.getRange(row, 23).setValue(priceText.trim());
}

function addCalendarSendMailAddContact(e) {
    Logger.log('addCalendarSendMailAddContact 함수 실행됨');
  
    // 폼 응답 데이터를 가져옴
    var responses = e.values;
    var row = e.row; // 시트의 행번호
    
    var name = responses[0];  // name 필드(A열)
    var phoneNumber = responses[4]; // Phone number 필드(E열)
    var email = responses[5];  // email 필드 (F열)
    var numberOfPeople = responses[8] // Number of people 필드(I열)
    var date_of_shooting = new Date(responses[7]);  // Date of shooting 필드(H열)
    var studio = responses[23];  // which Studio? 필드 (1st or 2nd)(X열)
    var sendMail = responses[24];  // send mail 필드 (Send! or reject)(Y열)
    // var confirm = responses[25] // confirm 필드 (confirmed! or reject)
  
    // 1호점 및 2호점 캘린더 ID 설정 (실제 캘린더 ID를 입력해야 함)
    var studio1CalendarId = 'e4078b3f6425088e10f2fa64229001821ae20bdf8e63c42fe2c096c65cdd6aa6@group.calendar.google.com';
    var studio2CalendarId = 'b319798d4b5cd32ef01cbe414c6b78541f258d88630e0b7d81f8d8513dc895ac@group.calendar.google.com';

    // 스튜디오 필드 값에 따른 캘린더 선택
    var calendarId;
    if (studio == "1st") {
      calendarId = studio1CalendarId;
    } else if (studio == "2nd") {
      calendarId = studio2CalendarId;
    } else {
      // 다른 스튜디오가 있을 경우에 대한 처리
      return;
    }

    Logger.log('캘린더 ID: ' + calendarId);
    // 선택한 캘린더에 예약 이벤트 추가
    if (sendMail == "Send!"){
      // 날짜를 MMDD 형식으로 변환
      var month = ('0' + (date_of_shooting.getMonth() + 1)).slice(-2);
      var day = ('0' + date_of_shooting.getDate()).slice(-2);
      var dateLabel = month + day; // MMDD 형식의 날짜
      // 시간과 분을 가져와 두 자리 형식으로 설정
      var hours = ('0' + date_of_shooting.getHours()).slice(-2);
      var minutes = ('0' + date_of_shooting.getMinutes()).slice(-2);

      // 캘린더 추가
      addCalendar(calendarId, name, hours, minutes, numberOfPeople, date_of_shooting, row);
    
      // 구글 연락처 추가
        //   var contactName = name + " " + dateLabel; // 예: Jae Hyun Kim 0920
        //   addGoogleContactWithPeopleAPI(contactName, phoneNumber);
  
      // 예약 확인 이메일 전송
    //   sendConfirmationEmail(name, email, date_of_shooting, numberOfPeople);
    }
}
function addCalendar(calendarId, name, hours, minutes, numberOfPeople, date_of_shooting, row){
    Logger.log('addCalenadar 함수 실행됨');
    try{
        var calendar = CalendarApp.getCalendarById(calendarId);
        if (!calendar) {
            throw new Error('캘린더를 찾을 수 없습니다. ID: ' + calendarId);
    }

        var eventTitle = 'X ' + name + ' (' + numberOfPeople +') ' + hours + ':' + minutes;

        var startTime = new Date(
            date_of_shooting.getFullYear(), 
            date_of_shooting.getMonth(), 
            date_of_shooting.getDate(),
            date_of_shooting.getHours(),
            date_of_shooting.getMinutes()
        );
        var endTime = new Date(
            date_of_shooting.getFullYear(), 
            date_of_shooting.getMonth(), 
            date_of_shooting.getDate(), 
            date_of_shooting.getHours() + 1, // 1시간 후 종료
            date_of_shooting.getMinutes()
        );
    
        var event = calendar.createEvent(eventTitle, startTime, endTime);
        Logger.log('캘린더 이벤트 생성 성공! Event ID: ' + event.getId());
        // 시트에 Event ID 저장 (AA열)
        var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        sheet.getRange(row, 27).setValue(event.getId()); // 필요 시 열 번호 조정
    
    }catch (e) {
        Logger.log('캘린더 이벤트 생성 에러 발생: ' + e.message);
    }
  
}
