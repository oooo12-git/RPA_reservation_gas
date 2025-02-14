function formSubmit_selection(e) {
  Logger.log('formSubmit_selection 함수 실행됨');

  const columns = getColumnProperties();

  // 스프레드시트와 시트들 가져오기
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let selectionSheet = ss.getSheetByName('selection');
  let infoSheet = ss.getSheetByName('info');

  // selection 시트의 마지막 행 데이터 가져오기
  let lastRow = selectionSheet.getLastRow();
  let newRecord = selectionSheet.getRange(lastRow, 1, 1, selectionSheet.getLastColumn()).getValues()[0];
  
  // selection 시트에서 필요한 데이터 추출
  let time = newRecord[0];
  let selection_email = newRecord[3];  // 4번째 열의 이메일
  let selected_picture_number = newRecord[1];  // 2번째 열의 선택된 사진 번호
  
  // 날짜 문자열에서 년.월.일 부분만 추출
  let dateObj = new Date(newRecord[0]); // Date 객체로 변환
  let selected_date = Utilities.formatDate(dateObj, "Asia/Seoul", "yyyy. M. d");
  
  // 14일 후 날짜 계산
  let dueDateObj = new Date(dateObj);
  dueDateObj.setDate(dueDateObj.getDate() + 14);
  let due_date = Utilities.formatDate(dueDateObj, "Asia/Seoul", "yyyy. M. d");
  
  // 선택된 사진 번호 개수 계산
  let selected_picture_count = selected_picture_number.trim().split(/\s+/).length;
  
  Logger.log('선택된 날짜: ' + selected_date);
  Logger.log('마감 날짜: ' + due_date);
  Logger.log('선택된 이메일: ' + selection_email);
  Logger.log('선택된 사진 번호: ' + selected_picture_number);
  Logger.log('선택된 사진 개수: ' + selected_picture_count);

  // info 시트에서 이메일이 일치하는 행 찾기
  let infoData = infoSheet.getRange(2, 7, infoSheet.getLastRow() - 1, 1).getValues(); // 7번째 열(이메일) 데이터
  
  for (let i = 0; i < infoData.length; i++) {
    if (infoData[i][0] === selection_email) {
      let row = i + 2;
      
      // info 시트에서 이름 가져오기
      let name = infoSheet.getRange(row, columns.NAME_COLUMN).getValue();
      let studio = infoSheet.getRange(row, columns.STUDIO_COLUMN).getValue();

      emailAlarmSelectionFormSubmitted(name, time, due_date);

      let studio1CalendarId = 'e4078b3f6425088e10f2fa64229001821ae20bdf8e63c42fe2c096c65cdd6aa6@group.calendar.google.com';
      let studio2CalendarId = 'b319798d4b5cd32ef01cbe414c6b78541f258d88630e0b7d81f8d8513dc895ac@group.calendar.google.com';
      
      if (studio === '1st') {
        // 캘린더 이벤트 생성
        let calendar = CalendarApp.getCalendarById(studio1CalendarId);
        let eventTitle = `보정 ${name}(${selected_picture_count}) ${selected_picture_number}`;
        calendar.createAllDayEvent(eventTitle, dueDateObj);
        Logger.log(name + '보정 이벤트 생성 성공!(1호점)');
      } else if (studio === '2nd') {
        let calendar = CalendarApp.getCalendarById(studio2CalendarId);
        let eventTitle = `보정 ${name}(${selected_picture_count}) ${selected_picture_number}`;
        calendar.createAllDayEvent(eventTitle, dueDateObj);
        Logger.log(name + '보정 이벤트 생성 성공!(2호점)');
      }
      
      // 기존 데이터 업데이트
      infoSheet.getRange(row, columns.SELECTED_PICTURE_NUMBER_COLUMN).setValue(selected_picture_number);
      infoSheet.getRange(row, columns.SELECTED_DATE_COLUMN).setValue(selected_date);
      infoSheet.getRange(row, columns.DUE_DATE_COLUMN).setValue(due_date);
      infoSheet.getRange(row, columns.SELECTED_PICTURE_COUNT_COLUMN).setValue(selected_picture_count);
      
      Logger.log('데이터 업데이트 완료 - 행: ' + row + 
                 ', 선택된 사진 번호: ' + selected_picture_number + 
                 ', 선택된 날짜: ' + selected_date +
                 ', 마감 날짜: ' + due_date +
                 ', 선택된 사진 개수: ' + selected_picture_count);
      break;
    }
  }
} 