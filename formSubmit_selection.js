function formSubmit_selection(e) {
  Logger.log('formSubmit_selection 함수 실행됨');

  // 스프레드시트와 시트들 가져오기
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let selectionSheet = ss.getSheetByName('selection');
  let infoSheet = ss.getSheetByName('info');

  // selection 시트의 마지막 행 데이터 가져오기
  let lastRow = selectionSheet.getLastRow();
  let newRecord = selectionSheet.getRange(lastRow, 1, 1, selectionSheet.getLastColumn()).getValues()[0];
  
  // selection 시트에서 필요한 데이터 추출
  let selection_email = newRecord[3];  // 4번째 열의 이메일
  let selected_picture_number = newRecord[1];  // 2번째 열의 선택된 사진 번호

  Logger.log('선택된 이메일: ' + selection_email);
  Logger.log('선택된 사진 번호: ' + selected_picture_number);

  // info 시트에서 이메일이 일치하는 행 찾기
  let infoData = infoSheet.getRange(2, 7, infoSheet.getLastRow() - 1, 1).getValues(); // 7번째 열(이메일) 데이터
  
  for (let i = 0; i < infoData.length; i++) {
    if (infoData[i][0] === selection_email) {
      // 일치하는 이메일을 찾으면 해당 행의 30번째 열에 선택된 사진 번호 입력
      let row = i + 2; // getRange는 1부터 시작하고, 데이터는 2행부터 시작하므로 +2
      infoSheet.getRange(row, 30).setValue(selected_picture_number);
      Logger.log('데이터 업데이트 완료 - 행: ' + row + ', 선택된 사진 번호: ' + selected_picture_number);
      break;
    }
  }
} 