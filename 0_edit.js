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

  const values = sheet.getRange(row, 11, 1, 9).getValues()[0];
  let [couple_profile, group_profile, 
        individual_1st, individual_1st_hm, 
        individual_2nd, individual_2nd_hm,
        individual_3rd, individual_3rd_hm,
        individual_more_4] = values;

  const numberOfPeople = sheet.getRange(row, 10).getValue();

  let CALCULATE_BUTTON_COLUMN = 21; // Y열
  let DEPOSIT_COLUMN = 22; // Z열
  let DEPOSIT_DOLLAR_COLUMN = 23; // AA열
  let PRICE_TEXT_COLUMN = 24; // AB열
  let SEND_MAIL_COLUMN = 26; // Z열
  let CONFIRM_COLUMN = 27; // AA열
  
  // info 시트의 T열(체크박스 열)이 수정되었는지 확인
  if (sheetName === 'info' && editedColumn === CALCULATE_BUTTON_COLUMN) { // T열은 20번째 열
    
    // 체크박스가 체크되었는지 확인
    if (value === true) {
      // I열(numberOfPeople)의 값 가져오기
      // const numberOfPeople = sheet.getRange(row, 10).getValue(); // I열은 9번째 열
      Logger.log('CalculateButtonColumn 체크됨');
      // numberOfPeople이 숫자인지 확인
      if (!isNaN(numberOfPeople) && numberOfPeople !== "") {
        // 숫자인 경우 예치금 계산
        const depositWon = (numberOfPeople * 100000).toLocaleString();
        const depositDollar = numberOfPeople * 80;
        
        sheet.getRange(row, DEPOSIT_COLUMN).setValue(depositWon);
        sheet.getRange(row, DEPOSIT_DOLLAR_COLUMN).setValue(depositDollar);
      } else {
        // 숫자가 아닌 경우 "기입필요" 입력
        sheet.getRange(row, DEPOSIT_COLUMN).setValue("기입필요");
        sheet.getRange(row, DEPOSIT_DOLLAR_COLUMN).setValue("기입필요");
      }

      // 가격 정보 계산 로직
      Logger.log('couple_profile: ' + couple_profile);
      Logger.log('group_profile: ' + group_profile);
      Logger.log('individual_1st: ' + individual_1st);
      Logger.log('individual_1st_hm: ' + individual_1st_hm);
      Logger.log('individual_2nd: ' + individual_2nd);
      Logger.log('individual_2nd_hm: ' + individual_2nd_hm);
      Logger.log('individual_3rd: ' + individual_3rd);
      Logger.log('individual_3rd_hm: ' + individual_3rd_hm);
      Logger.log('individual_more_4: ' + individual_more_4);

      calculateAndSetPrice(sheet, row, PRICE_TEXT_COLUMN,couple_profile, group_profile, 
        individual_1st, individual_1st_hm, 
        individual_2nd, individual_2nd_hm,
        individual_3rd, individual_3rd_hm,
        individual_more_4, numberOfPeople);
    } else {
      // 체크 해제시 값 지우기
      sheet.getRange(row, DEPOSIT_COLUMN).setValue('');
      sheet.getRange(row, DEPOSIT_DOLLAR_COLUMN).setValue('');
      sheet.getRange(row, PRICE_TEXT_COLUMN).setValue('');
    }
  }



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