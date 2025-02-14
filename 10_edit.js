function edit(e) {
  Logger.log('edit 함수 실행됨');
  const range = e.range;
  const sheet = range.getSheet();
  let sheetName = sheet.getName();
  let row = range.getRow();
  let editedColumn = range.getColumn();
  let value = range.getValue();

  // 프로퍼티에서 컬럼 정보 가져오기
  const columns = getColumnProperties();
  
  let name = sheet.getRange(row, columns.NAME_COLUMN).getValue();
  let phoneNumber = sheet.getRange(row, columns.PHONE_NUMBER_COLUMN).getValue();
  let email = sheet.getRange(row, columns.EMAIL_COLUMN).getValue();
  let date_of_shooting = new Date(sheet.getRange(row, columns.DATE_OF_SHOOTING_COLUMN).getValue());
  let numberOfPeople = sheet.getRange(row, columns.NUMBER_OF_PEOPLE_COLUMN).getValue();

  const values = sheet.getRange(row, columns.COUPLE_PROFILE_COLUMN, 1, 9).getValues()[0];
  let [couple_profile, group_profile, 
        individual_1st, individual_1st_hm, 
        individual_2nd, individual_2nd_hm,
        individual_3rd, individual_3rd_hm,
        individual_more_4] = values;

  let studio = sheet.getRange(row, columns.STUDIO_COLUMN).getValue();
  let sendMail = sheet.getRange(row, columns.SEND_MAIL_COLUMN).getValue();
  let confirm = sheet.getRange(row, columns.CONFIRM_COLUMN).getValue();

  // info 시트의 계산 버튼 열이 수정되었는지 확인
  if (sheetName === 'info' && editedColumn === columns.CALCULATE_BUTTON_COLUMN) {
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
        sheet.getRange(row, columns.DEPOSIT_COLUMN).setValue(depositWon);
        sheet.getRange(row, columns.DEPOSIT_DOLLAR_COLUMN).setValue(depositDollar);
        sheet.getRange(row, columns.PRICE_KO_COLUMN).setValue('');
        sheet.getRange(row, columns.PRICE_EN_COLUMN).setValue('');
      } else {
        // 숫자가 아닌 경우 "기입필요" 입력
        sheet.getRange(row, columns.DEPOSIT_COLUMN).setValue("기입필요");
        sheet.getRange(row, columns.DEPOSIT_DOLLAR_COLUMN).setValue("기입필요");
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

      calculateAndSetPrice(sheet, row, columns.PRICE_KO_COLUMN, columns.PRICE_EN_COLUMN,
        couple_profile, group_profile, 
        individual_1st, individual_1st_hm, 
        individual_2nd, individual_2nd_hm,
        individual_3rd, individual_3rd_hm,
        individual_more_4, numberOfPeople);
    } else {
      // 체크 해제시 값 지우기
      sheet.getRange(row, columns.DEPOSIT_COLUMN).setValue('');
      sheet.getRange(row, columns.DEPOSIT_DOLLAR_COLUMN).setValue('');
      sheet.getRange(row, columns.PRICE_KO_COLUMN).setValue('');
      sheet.getRange(row, columns.PRICE_EN_COLUMN).setValue('');
    }
  }

  if (sheetName === 'info' && editedColumn === columns.SEND_MAIL_COLUMN && value == "Send!") {
    let rowValues = sheet.getRange(range.getRow(), 1, 1, sheet.getLastColumn()).getValues()[0];
    // range.getRow(): 현재 편집된 셀의 행 번호를 가져옵니다. 
    // 1 : 첫 번째 열(열 A)**부터 데이터를 가져옵니다.
    // 1 : 가져올 행의 개수, 즉 한 행만 가져옵니다.
    // sheet.getLastColumn(): 해당 시트의 마지막 열 번호를 가져옵니다.
    // getValues(): 위에서 지정한 범위의 데이터를 2차원 배열 형태로 가져옵니다. 예를 들어, 편집된 행에 데이터가 ["A", "B", "C"]라면, 반환값은 [["A", "B", "C"]]이 됩니다.
    // {values: ["A", "B", "C"]} 형태로 전달.
    addCalendarSendMailAddContact({values: rowValues, row: row}, row, name, phoneNumber, email, 
      date_of_shooting, numberOfPeople, studio, sendMail, couple_profile, group_profile, 
      individual_1st, individual_2nd, individual_3rd, columns.EVENT_ID_COLUMN, 
      columns.DEPOSIT_COLUMN, columns.DEPOSIT_DOLLAR_COLUMN, 
      columns.PRICE_KO_COLUMN, columns.PRICE_EN_COLUMN);
  }
  if (sheetName === 'info' && editedColumn == columns.CONFIRM_COLUMN && value == "Confirmed!") {
    let rowValues = sheet.getRange(range.getRow(), 1, 1, sheet.getLastColumn()).getValues()[0];
    handleConfirmationWithCalendar({values: rowValues, row: row}, name, email, numberOfPeople, 
      date_of_shooting, studio, couple_profile, group_profile, individual_1st, individual_2nd, 
      individual_3rd, columns.EVENT_ID_COLUMN);
  }
}