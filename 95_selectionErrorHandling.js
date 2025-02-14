function selectionErrorHandling(name_from_form, date_of_shooting, selection_email, selected_picture_number, time) {
  Logger.log('selectionErrorHandling 함수 실행됨');
  
  try {
    // 스프레드시트와 error 시트 가져오기
    let ss = SpreadsheetApp.getActiveSpreadsheet();
    let errorSheet = ss.getSheetByName('error');
    
    // 두 번째 행에 새 데이터 삽입
    errorSheet.insertRowAfter(1);
    let newRow = [name_from_form, date_of_shooting, selection_email, selected_picture_number, time];
    errorSheet.getRange(2, 1, 1, 5).setValues([newRow]);
    
    // 시간 형식 변환
    const date = new Date(time);
    const koreanTime = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`;
    
    // 촬영 날짜 형식 변환
    const shootingDate = new Date(date_of_shooting);
    const koreanShootingDate = `${shootingDate.getFullYear()}년 ${shootingDate.getMonth() + 1}월 ${shootingDate.getDate()}일`;
    
    // 이메일 제목과 본문 설정
    let subject = '[에러] 보정 신청 오류 발생 ' + name_from_form + '님 ' + koreanTime;
    let body = `${name_from_form}님의 보정 신청 처리 중 오류가 발생했습니다.\n\n` + 
              '신청 시간: ' + koreanTime + '\n' +
              '촬영 날짜: ' + koreanShootingDate + '\n' +
              '이메일: ' + selection_email + '\n' +
              '선택된 사진 번호: ' + selected_picture_number + '\n\n' +
              '* 오류 원인: info 시트에서 일치하는 이메일을 찾을 수 없습니다.\n' +
              '* error 시트에 기록되었습니다. 확인해 주세요.';
    
    // 관리자 이메일 주소로 알림 메일 발송
    let adminEmail1 = 'jp@jpjpjpjpjp.com';
    let adminEmail2 = 'ted@jpjpjpjpjp.com';
    let adminEmail3 = 'jhdmbwy12@jpjpjpjpjp.com';

    GmailApp.sendEmail(adminEmail1, subject, body);
    GmailApp.sendEmail(adminEmail2, subject, body);
    GmailApp.sendEmail(adminEmail3, subject, body);
    
    Logger.log('에러 알림 이메일이 관리자들에게 발송되었습니다.');
    Logger.log('에러 데이터가 성공적으로 기록되었습니다: ' + 
              'Name: ' + name_from_form + 
              ', Email: ' + selection_email + 
              ', Selected Pictures: ' + selected_picture_number);
              
  } catch (error) {
    Logger.log('에러 처리 중 오류 발생: ' + error.message);
  }
} 