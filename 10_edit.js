function edit(e) {
  Logger.log("edit 함수 실행됨");
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
  let date_of_shooting = new Date(
    sheet.getRange(row, columns.DATE_OF_SHOOTING_COLUMN).getValue()
  );
  let numberOfPeople = sheet
    .getRange(row, columns.NUMBER_OF_PEOPLE_COLUMN)
    .getValue();
  let driveLink = sheet.getRange(row, columns.DRIVE_LINK_COLUMN).getValue();

  const values = sheet
    .getRange(row, columns.COUPLE_PROFILE_COLUMN, 1, 9)
    .getValues()[0];
  let [
    couple_profile,
    group_profile,
    individual_1st,
    individual_1st_hm,
    individual_2nd,
    individual_2nd_hm,
    individual_3rd,
    individual_3rd_hm,
    individual_more_4,
  ] = values;

  let studio = sheet.getRange(row, columns.STUDIO_COLUMN).getValue();
  let sendMail = sheet.getRange(row, columns.SEND_MAIL_COLUMN).getValue();
  let confirm = sheet.getRange(row, columns.CONFIRM_COLUMN).getValue();

  // info 시트의 계산 버튼 열이 수정되었는지 확인
  if (
    sheetName === "info" &&
    editedColumn === columns.CALCULATE_BUTTON_COLUMN
  ) {
    // 체크박스가 체크되었는지 확인
    if (value === true) {
      // I열(numberOfPeople)의 값 가져오기
      // const numberOfPeople = sheet.getRange(row, 10).getValue(); // I열은 9번째 열
      Logger.log("CalculateButtonColumn 체크됨");
      // numberOfPeople이 숫자인지 확인
      if (!isNaN(numberOfPeople) && numberOfPeople !== "") {
        // 숫자인 경우 예치금 계산
        const depositWon = (numberOfPeople * 100000).toLocaleString();
        const depositDollar = numberOfPeople * 80;
        sheet.getRange(row, columns.DEPOSIT_COLUMN).setValue(depositWon);
        sheet
          .getRange(row, columns.DEPOSIT_DOLLAR_COLUMN)
          .setValue(depositDollar);
        sheet.getRange(row, columns.PRICE_KO_COLUMN).setValue("");
        sheet.getRange(row, columns.PRICE_EN_COLUMN).setValue("");
      } else {
        // 숫자가 아닌 경우 "기입필요" 입력
        sheet.getRange(row, columns.DEPOSIT_COLUMN).setValue("기입필요");
        sheet.getRange(row, columns.DEPOSIT_DOLLAR_COLUMN).setValue("기입필요");
        sheet.getRange(row, columns.PRICE_KO_COLUMN).setValue("기입필요");
        sheet.getRange(row, columns.PRICE_EN_COLUMN).setValue("기입필요");
      }

      // 가격 정보 계산 로직
      Logger.log("couple_profile: " + couple_profile);
      Logger.log("group_profile: " + group_profile);
      Logger.log("individual_1st: " + individual_1st);
      Logger.log("individual_1st_hm: " + individual_1st_hm);
      Logger.log("individual_2nd: " + individual_2nd);
      Logger.log("individual_2nd_hm: " + individual_2nd_hm);
      Logger.log("individual_3rd: " + individual_3rd);
      Logger.log("individual_3rd_hm: " + individual_3rd_hm);
      Logger.log("individual_more_4: " + individual_more_4);

      calculateAndSetPrice(
        sheet,
        row,
        columns.PRICE_KO_COLUMN,
        columns.PRICE_EN_COLUMN,
        couple_profile,
        group_profile,
        individual_1st,
        individual_1st_hm,
        individual_2nd,
        individual_2nd_hm,
        individual_3rd,
        individual_3rd_hm,
        individual_more_4,
        numberOfPeople
      );
    } else {
      // 체크 해제시 값 지우기
      sheet.getRange(row, columns.DEPOSIT_COLUMN).setValue("");
      sheet.getRange(row, columns.DEPOSIT_DOLLAR_COLUMN).setValue("");
      sheet.getRange(row, columns.PRICE_KO_COLUMN).setValue("");
      sheet.getRange(row, columns.PRICE_EN_COLUMN).setValue("");
    }
  }

  if (
    sheetName === "info" &&
    editedColumn === columns.SEND_MAIL_COLUMN &&
    value == "Send!"
  ) {
    let rowValues = sheet
      .getRange(range.getRow(), 1, 1, sheet.getLastColumn())
      .getValues()[0];
    // range.getRow(): 현재 편집된 셀의 행 번호를 가져옵니다.
    // 1 : 첫 번째 열(열 A)**부터 데이터를 가져옵니다.
    // 1 : 가져올 행의 개수, 즉 한 행만 가져옵니다.
    // sheet.getLastColumn(): 해당 시트의 마지막 열 번호를 가져옵니다.
    // getValues(): 위에서 지정한 범위의 데이터를 2차원 배열 형태로 가져옵니다. 예를 들어, 편집된 행에 데이터가 ["A", "B", "C"]라면, 반환값은 [["A", "B", "C"]]이 됩니다.
    // {values: ["A", "B", "C"]} 형태로 전달.
    addCalendarSendMailAddContact(
      { values: rowValues, row: row },
      row,
      name,
      phoneNumber,
      email,
      date_of_shooting,
      numberOfPeople,
      studio,
      sendMail,
      couple_profile,
      group_profile,
      individual_1st,
      individual_2nd,
      individual_3rd,
      columns.EVENT_ID_COLUMN,
      columns.DEPOSIT_COLUMN,
      columns.DEPOSIT_DOLLAR_COLUMN,
      columns.PRICE_KO_COLUMN,
      columns.PRICE_EN_COLUMN
    );
  }
  if (
    sheetName === "info" &&
    editedColumn == columns.CONFIRM_COLUMN &&
    value == "Confirmed!"
  ) {
    let rowValues = sheet
      .getRange(range.getRow(), 1, 1, sheet.getLastColumn())
      .getValues()[0];
    handleConfirmationWithCalendar(
      { values: rowValues, row: row },
      name,
      email,
      numberOfPeople,
      date_of_shooting,
      studio,
      couple_profile,
      group_profile,
      individual_1st,
      individual_2nd,
      individual_3rd,
      columns.EVENT_ID_COLUMN
    );
  }
  if (
    sheetName === "info" &&
    editedColumn == columns.SEND_ADJUST_INFO_COLUMN &&
    value == "Send!"
  ) {
    if (!driveLink || driveLink.trim() === "") {
      // 드라이브 링크가 비어있는 경우
      SpreadsheetApp.getUi().alert("드라이브 링크가 없습니다.");
      sheet.getRange(row, columns.SEND_ADJUST_INFO_COLUMN).setValue("reject");
      return;
    }
    sendAdjustInfoEmail(name, email, studio, driveLink);
  }

  if (
    sheetName === "info" &&
    editedColumn === columns.ADJUST_CALENDAR_ADD_COLUMN
  ) {
    // 체크박스가 체크되었는지 확인
    if (value === true) {
      Logger.log("AdjustCalendarAddColumn 체크됨");
      let studio1CalendarId =
        "e4078b3f6425088e10f2fa64229001821ae20bdf8e63c42fe2c096c65cdd6aa6@group.calendar.google.com";
      let studio2CalendarId =
        "b319798d4b5cd32ef01cbe414c6b78541f258d88630e0b7d81f8d8513dc895ac@group.calendar.google.com";
      let selected_picture_number = sheet
        .getRange(row, columns.SELECTED_PICTURE_NUMBER_COLUMN)
        .getValue();
      // 선택된 사진 번호에 대한 사진 개수 계산
      let selected_picture_count = String(selected_picture_number)
        .trim()
        .split(/\s+/).length;
      sheet
        .getRange(row, columns.SELECTED_PICTURE_COUNT_COLUMN)
        .setValue(selected_picture_count);
      // 사진 선택일자에 14일 더한 날짜를 마감 날짜로 설정
      let selected_date = sheet
        .getRange(row, columns.SELECTED_DATE_COLUMN)
        .getValue();
      let dueDateObj = new Date(selected_date);
      dueDateObj.setDate(dueDateObj.getDate() + 14);
      let due_date = Utilities.formatDate(
        dueDateObj,
        "Asia/Seoul",
        "yyyy. M. d"
      );
      sheet.getRange(row, columns.DUE_DATE_COLUMN).setValue(due_date);

      if (studio === "1st") {
        let calendar = CalendarApp.getCalendarById(studio1CalendarId);
        let eventTitle = `보정 ${name}(${selected_picture_count}) ${selected_picture_number}`;
        calendar.createAllDayEvent(eventTitle, dueDateObj);
        Logger.log(name + "보정 이벤트 생성 성공!(1호점)");
      } else if (studio === "2nd") {
        let calendar = CalendarApp.getCalendarById(studio2CalendarId);
        let eventTitle = `보정 ${name}(${selected_picture_count}) ${selected_picture_number}`;
        calendar.createAllDayEvent(eventTitle, dueDateObj);
        Logger.log(name + "보정 이벤트 생성 성공!(2호점)");
      }
    }
  }
}
