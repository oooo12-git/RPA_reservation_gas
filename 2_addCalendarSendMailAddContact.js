function addCalendarSendMailAddContact(e, row, name, phoneNumber, email, date_of_shooting, numberOfPeople, studio, sendMail, couple_profile, group_profile, individual_1st, individual_2nd, individual_3rd, EVENT_ID_COLUMN, DEPOSIT_COLUMN, DEPOSIT_DOLLAR_COLUMN, PRICE_KO_COLUMN, PRICE_EN_COLUMN) {
    Logger.log('addCalendarSendMailAddContact 함수 실행됨');
  
    // 폼 응답 데이터를 가져옴
    let responses = e.values;
    //예약금(원화,달러), priceText는 시트에서 변경한 값 받아서 쓸 수 있도록 함.
    let depositWon = responses[DEPOSIT_COLUMN-1]; 
    let depositDollar = responses[DEPOSIT_DOLLAR_COLUMN-1];
    let ko_priceText = responses[PRICE_KO_COLUMN-1];
    let priceText = responses[PRICE_EN_COLUMN-1];
    // let row = e.row; // 시트의 행번호
    
    // let name = responses[0];  // name 필드(A열)
    // let phoneNumber = responses[5]; // Phone number 필드(F열)
    // let email = responses[6];  // email 필드 (G열)
    // let date_of_shooting = new Date(responses[8]);  // Date of shooting 필드(I열)
    // let numberOfPeople = responses[9] // Number of people 필드(J열)
    // let studio = responses[24];  // which Studio? 필드 (1st or 2nd)(Y열)
    // let sendMail = responses[25];  // send mail 필드 (Send! or reject)(Z열)
    // // let confirm = responses[25] // confirm 필드 (confirmed! or reject)
    // let couple_profile = responses[10];
    // let group_profile = responses[11];
    // let individual_1st = responses[12];
    // let individual_2nd = responses[13];
    // let individual_3rd = responses[14];
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

    // Logger.log('캘린더 ID: ' + calendarId);
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
      addCalendar(calendarId, name, hours, minutes, numberOfPeople, date_of_shooting, row, couple_profile, group_profile, individual_1st, individual_2nd, individual_3rd, EVENT_ID_COLUMN);
    
      // 구글 연락처 추가
      let contactName = name + " " + dateLabel; // 예: Jae Hyun Kim 0920
      addGoogleContactWithPeopleAPI(contactName, phoneNumber, email);
  
      // 예약금 알림 이메일 전송
      sendDepositNoticeEmail(name, email, date_of_shooting, numberOfPeople, depositWon, depositDollar, ko_priceText, priceText, studio);
    }
}