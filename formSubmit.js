function formSubmit(e) {
  var sheet = e.source.getActiveSheet(); 
  var reservationFormSheetName = "response";
  var selectionFormSheetName = "selection";

  if (sheet.getName() === reservationFormSheetName) {
    // 여기에 특정 폼에 대한 처리 로직을 작성
    Logger.log('reservation form 제출됨');
    formSubmit_reservation(e);
  }
  if (sheet.getName() === selectionFormSheetName) {
    // 여기에 특정 폼에 대한 처리 로직을 작성
    Logger.log('selection form 제출됨');
    formSubmit_selection(e);
  }
  else {
    Logger.log('알 수 없는 폼 제출됨');
  }
}
