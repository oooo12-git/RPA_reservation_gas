function sayHello() {
  Logger.log("Hello, world!");
}

function edit(e) {
  // 수정된 범위 가져오기
  Logger.log('edit 함수 실행됨');
  const range = e.range;
  const sheet = range.getSheet();
  let sheetName = sheet.getName();
  let row = range.getRow();
  let editedColumn = range.getColumn();
  let value = range.getValue();

  
  // info 시트의 T열(체크박스 열)이 수정되었는지 확인
  if (sheetName === 'info' && editedColumn === 20) { // T열은 20번째 열
    
    // 체크박스가 체크되었는지 확인
    if (value === true) {
      // I열(numberOfPeople)의 값 가져오기
      const numberOfPeople = sheet.getRange(row, 9).getValue(); // I열은 9번째 열
      
      // numberOfPeople이 숫자인지 확인
      if (!isNaN(numberOfPeople) && numberOfPeople !== "") {
        // 숫자인 경우 예치금 계산
        const depositWon = (numberOfPeople * 100000).toLocaleString();
        const depositDollar = numberOfPeople * 80;
        
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

  let SEND_MAIL_COLUMN = 25; // AR열 = 26 + 18 열
  let CONFIRM_COLUMN = 26; // AS열 = 26 + 19 열

  if (sheetName === 'info' && editedColumn === SEND_MAIL_COLUMN && value == "Send!") {
    let rowValues = sheet.getRange(range.getRow(), 1, 1, sheet.getLastColumn()).getValues()[0];
    // range.getRow(): 현재 편집된 셀의 행 번호를 가져옵니다. 
    // 1 : 첫 번째 열(열 A)**부터 데이터를 가져옵니다.
    // 1 : 가져올 행의 개수, 즉 한 행만 가져옵니다.
    // sheet.getLastColumn(): 해당 시트의 마지막 열 번호를 가져옵니다.
    // getValues(): 위에서 지정한 범위의 데이터를 2차원 배열 형태로 가져옵니다. 예를 들어, 편집된 행에 데이터가 ["A", "B", "C"]라면, 반환값은 [["A", "B", "C"]]이 됩니다.
    // {values: ["A", "B", "C"]} 형태로 전달.
    addCalendarSendMailAddContact({values: rowValues, row: row});
  }
  if (sheetName === 'info' && editedColumn == CONFIRM_COLUMN && value == "Confirmed!") {
    let rowValues = sheet.getRange(range.getRow(), 1, 1, sheet.getLastColumn()).getValues()[0];
    handleConfirmationWithCalendar({values: rowValues, row: row});
  }
}

function addCalendarSendMailAddContact(e) {
    Logger.log('addCalendarSendMailAddContact 함수 실행됨');
  
    // 폼 응답 데이터를 가져옴
    let responses = e.values;
    let row = e.row; // 시트의 행번호
    
    let name = responses[0];  // name 필드(A열)
    let phoneNumber = responses[4]; // Phone number 필드(E열)
    let email = responses[5];  // email 필드 (F열)
    let numberOfPeople = responses[8] // Number of people 필드(I열)
    let date_of_shooting = new Date(responses[7]);  // Date of shooting 필드(H열)
    let studio = responses[23];  // which Studio? 필드 (1st or 2nd)(X열)
    let sendMail = responses[24];  // send mail 필드 (Send! or reject)(Y열)
    // let confirm = responses[25] // confirm 필드 (confirmed! or reject)
    let couple_profile = responses[9];
    let group_profile = responses[10];
    let individual_1st = responses[11];
    let individual_2nd = responses[13];
    let individual_3rd = responses[15];
    // 1호점 및 2호점 캘린더 ID 설정 (실제 캘린더 ID를 입력해야 함)
    let studio1CalendarId = 'e4078b3f6425088e10f2fa64229001821ae20bdf8e63c42fe2c096c65cdd6aa6@group.calendar.google.com';
    let studio2CalendarId = 'b319798d4b5cd32ef01cbe414c6b78541f258d88630e0b7d81f8d8513dc895ac@group.calendar.google.com';

    // 스튜디오 필드 값에 따른 캘린더 선택
    let calendarId;
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
      // 날짜를 YYMMDD 형식으로 변환
      let year = date_of_shooting.getFullYear().toString().slice(-2); // 연도의 마지막 2자리
      let month = ('0' + (date_of_shooting.getMonth() + 1)).slice(-2);
      let day = ('0' + date_of_shooting.getDate()).slice(-2);
      let dateLabel = year + month + day; // YYMMDD 형식의 날짜
      // 시간과 분을 가져와 두 자리 형식으로 설정
      let hours = ('0' + date_of_shooting.getHours()).slice(-2);
      let minutes = ('0' + date_of_shooting.getMinutes()).slice(-2);

      // 캘린더 추가
      addCalendar(calendarId, name, hours, minutes, numberOfPeople, date_of_shooting, row, couple_profile, group_profile, individual_1st, individual_2nd, individual_3rd);
    
      // 구글 연락처 추가
      let contactName = name + " " + dateLabel; // 예: Jae Hyun Kim 0920
      addGoogleContactWithPeopleAPI(contactName, phoneNumber);
  
      // 예약금 알림 이메일 전송
      let depositWon = responses[20];
      let depositDollar = responses[21];
      let priceText = responses[22];
      sendDepositNoticeEmail(name, email, date_of_shooting, numberOfPeople, depositWon, depositDollar, priceText, studio);
    }
}