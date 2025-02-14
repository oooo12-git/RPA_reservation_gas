function emailAlarmFormSubmitted(name, time) {
    Logger.log('emailAlarmFormSubmitted 함수 실행됨');
    
    // 시간 형식 변환
    const date = new Date(time);
    const koreanTime = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`;
    
    // 이메일 제목과 본문 설정
    let subject = '새로운 예약 신청 알림 ' + name + '님 ' + koreanTime;
    let body = `${name}님이 예약 신청하셨습니다. \n` + '신청 시간: ' + koreanTime + '\n확인해 주세요.';
    
    // 관리자 이메일 주소로 알림 메일 발송
    let adminEmail1 = 'jp@jpjpjpjpjp.com';
    let adminEmail2 = 'ted@jpjpjpjpjp.com';
    let adminEmail3 = 'jhdmbwy12@jpjpjpjpjp.com';

    GmailApp.sendEmail(adminEmail1, subject, body);
    GmailApp.sendEmail(adminEmail2, subject, body);
    GmailApp.sendEmail(adminEmail3, subject, body);
    
    Logger.log(`알림 이메일이 ${adminEmail1}, ${adminEmail2}, ${adminEmail3}로 발송되었습니다.`);
}


