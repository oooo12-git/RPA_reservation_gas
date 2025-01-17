function editForAddContactToOthers(e) {
    // 수정된 범위 가져오기
    Logger.log('editForAddContactToOthers 함수 실행됨');
    const range = e.range;
    const sheet = range.getSheet();
    let sheetName = sheet.getName();
    let row = range.getRow();
    let editedColumn = range.getColumn();
    let value = range.getValue();
  
    let SEND_MAIL_COLUMN = 26; // Z열
    // let CONFIRM_COLUMN = 27; // AA열
  
    if (sheetName === 'info' && editedColumn === SEND_MAIL_COLUMN && value == "Send!") {
      let rowValues = sheet.getRange(range.getRow(), 1, 1, sheet.getLastColumn()).getValues()[0];
      // range.getRow(): 현재 편집된 셀의 행 번호를 가져옵니다. 
      // 1 : 첫 번째 열(열 A)**부터 데이터를 가져옵니다.
      // 1 : 가져올 행의 개수, 즉 한 행만 가져옵니다.
      // sheet.getLastColumn(): 해당 시트의 마지막 열 번호를 가져옵니다.
      // getValues(): 위에서 지정한 범위의 데이터를 2차원 배열 형태로 가져옵니다. 예를 들어, 편집된 행에 데이터가 ["A", "B", "C"]라면, 반환값은 [["A", "B", "C"]]이 됩니다.
      // {values: ["A", "B", "C"]} 형태로 전달.
      addContactToOthers({values: rowValues, row: row});
    }
}

function addContactToOthers(e) {
    Logger.log('addContactToOthers 함수 실행됨');
  
    // 폼 응답 데이터를 가져옴
    let responses = e.values;    
    let name = responses[0];  // name 필드(A열)
    let phoneNumber = responses[5]; // Phone number 필드(F열)
    let email = responses[6]; // email 필드(G열)
    let date_of_shooting = new Date(responses[8]);  // Date of shooting 필드(I열)

    let year = date_of_shooting.getFullYear().toString().slice(-2); // 연도의 마지막 2자리
    let month = ('0' + (date_of_shooting.getMonth() + 1)).slice(-2);
    let day = ('0' + date_of_shooting.getDate()).slice(-2);
    let dateLabel = year + month + day; // YYMMDD 형식의 날짜
    // 시간과 분을 가져와 두 자리 형식으로 설정

    // 구글 연락처 추가
    let contactName = name + " " + dateLabel; // 예: Jae Hyun Kim 240920
    addGoogleContactWithPeopleAPI(contactName, phoneNumber, email);

}