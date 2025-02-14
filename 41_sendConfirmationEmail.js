function sendConfirmationEmail(name, email, date_of_shooting, studio) {
    let day = date_of_shooting.toDateString();  // 영문 날짜
    
    // 한글 날짜 변환
    let year = date_of_shooting.getFullYear();
    let month = date_of_shooting.getMonth() + 1;
    let date = date_of_shooting.getDate();
    let ko_daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    let ko_dayOfWeek = ko_daysOfWeek[date_of_shooting.getDay()];
    let ko_day = `${year}년 ${month}월 ${date}일 (${ko_dayOfWeek})`;
    
    let hours = ('0' + date_of_shooting.getHours()).slice(-2);
    let minutes = ('0' + date_of_shooting.getMinutes()).slice(-2);
    // 요일 가져오기
    let daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let dayOfWeek = daysOfWeek[date_of_shooting.getDay()]; // getDay()는 요일을 숫자로 반환 (0: 일요일 ~ 6: 토요일)
    
    if (studio == "1st") {
      let subject = "예약금 입금 확인 및 예약 확정 JP12206b 스튜디오 / Deposit Confirmed and Reservation Made from JP12206b Studio";
      let ko_message = "안녕하세요 <span style='color: blue'>" + name + "</span>님,<br><br>" +
                  "<span style='color: red'>JP12206b Studio</span>입니다. 예약금 입금 확인되어 예약이 확정되었음을 알려드립니다.<br><br>" +
                  "예약 날짜 및 시간: <span style='color: blue'>" + ko_day + " " + hours + ":" + minutes + "</span><br><br>" +
                  "예약하신 날짜에 뵙겠습니다.<br><br>" +
                  "감사합니다.<br>" +
                  "JP12206b Studio" +
                  "<br><br>------ English Version ------<br><br>";

      let message = "Dear <span style='color: blue'>" + name + "</span>,<br><br>" +
                  "Hello, this is <span style='color: red'>JP12206b Studio</span>. I am writing to inform you that your reservation has been confirmed upon receipt of the deposit.<br><br>" +
                  "Reservation date and time: <span style='color: blue'>" + day + " at " + hours + ":" + minutes + "</span><br><br>" +
                  "Looking forward to seeing you on the reservation day.<br><br>" +
                  "Thank you.<br><br>" +
                  "Best regards,<br>" +
                  "JP12206b Studio";

      try {
        GmailApp.sendEmail(email, subject, "", {htmlBody: ko_message + message});
        Logger.log('Email sent: ' + ko_message + message);
      } catch(error){
        Logger.log('이메일 발송 실패: ' + error.message);
      }
    } else if (studio == "2nd") {
      let subject = "예약금 입금 확인 및 예약 확정 JP12839c 스튜디오 / Deposit Confirmed and Reservation Made from JP12839c Studio";
      let ko_message = "안녕하세요 <span style='color: blue'>" + name + "</span>님,<br><br>" +
                  "<span style='color: red'>JP12839c Studio</span>입니다. 예약금 입금 확인되어 예약이 확정되었음을 알려드립니다.<br><br>" +
                  "예약 날짜 및 시간: <span style='color: blue'>" + ko_day + " " + hours + ":" + minutes + "</span><br><br>" +
                  "예약하신 날짜에 뵙겠습니다.<br><br>" +
                  "감사합니다.<br>" +
                  "JP12839c Studio" +
                  "<br><br>------ English Version ------<br><br>";

      let message = "Dear <span style='color: blue'>" + name + "</span>,<br><br>" +
                  "Hello, this is <span style='color: red'>JP12839c Studio</span>. I am writing to inform you that your reservation has been confirmed upon receipt of the deposit.<br><br>" +
                  "Reservation date and time: <span style='color: blue'>" + day + " at " + hours + ":" + minutes + "</span><br><br>" +
                  "Looking forward to seeing you on the reservation day.<br><br>" +
                  "Thank you.<br><br>" +
                  "Best regards,<br>" +
                  "JP12839c Studio";

      try {
        GmailApp.sendEmail(email, subject, "", {htmlBody: ko_message + message});
        Logger.log('Email sent: ' + ko_message + message);
      } catch(error){
        Logger.log('이메일 발송 실패: ' + error.message);
      }
    }
}