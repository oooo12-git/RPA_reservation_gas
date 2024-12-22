function sendConfirmationEmail(name, email, date_of_shooting, studio) {
    let day = date_of_shooting.toDateString();  // 날짜를 문자열로 변환 (예: Mon Sep 25 2023)
    let hours = ('0' + date_of_shooting.getHours()).slice(-2);
    let minutes = ('0' + date_of_shooting.getMinutes()).slice(-2);
    // 요일 가져오기
    let daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let dayOfWeek = daysOfWeek[date_of_shooting.getDay()]; // getDay()는 요일을 숫자로 반환 (0: 일요일 ~ 6: 토요일)
    
    if (studio == "1st") {
      let subject = "Deposit Confirmed and Reservation Made from JP12206b Studio"; 
      let message = "Dear <span style='color: blue'>" + name + "</span>,\n\n" +
      "Hello, this is <span style='color: red'>JP12206b Studio</span>. I am writing to inform you that your reservation has been confirmed upon receipt of the deposit.\n\n" +
      "Reservation date and time: <span style='color: blue'>" + day + " at " + hours + ":" + minutes + "</span>\n\n" +
      "Looking forward to seeing you on the reservation day.\n\n" +
      "Thank you.\n\n" +
      "Best regards,\n" +
      "JP12206b Studio";

      try {
        GmailApp.sendEmail(email, subject, "", {htmlBody: message});
        Logger.log('Email sended: ' + message);
      } catch(error){
        Logger.log('이메일 발송 실패: ' + error.message);
      }
    } else if (studio == "2nd") {
      let subject = "Deposit Confirmed and Reservation Made from JP12839c Studio";
      let message = "Dear <span style='color: blue'>" + name + "</span>,\n\n" +
      "Hello, this is <span style='color: red'>JP12839c Studio</span>. I am writing to inform you that your reservation has been confirmed upon receipt of the deposit.\n\n" +
      "Reservation date and time: <span style='color: blue'>" + day + " at " + hours + ":" + minutes + "</span>\n\n" +
      "Looking forward to seeing you on the reservation day.\n\n" +
      "Thank you.\n\n" +
      "Best regards,\n" +
      "JP12839c Studio";

      try {
        GmailApp.sendEmail(email, subject, "", {htmlBody: message});
        Logger.log('Email sended: ' + message);
      } catch(error){
        Logger.log('이메일 발송 실패: ' + error.message);
      }
      
    }
}