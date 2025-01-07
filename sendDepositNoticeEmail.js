function sendDepositNoticeEmail(name, email, date_of_shooting, numberOfPeople, depositWon, depositDollar, priceText, studio) {
    let depositAmount = depositWon.toLocaleString();
    let usdAmount = depositDollar.toLocaleString();
    let day = date_of_shooting.toDateString();  // 날짜를 문자열로 변환 (예: Mon Sep 25 2023)
    let hours = ('0' + date_of_shooting.getHours()).slice(-2);
    let minutes = ('0' + date_of_shooting.getMinutes()).slice(-2);
    // 요일 가져오기
    let daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let dayOfWeek = daysOfWeek[date_of_shooting.getDay()]; // getDay()는 요일을 숫자로 반환 (0: 일요일 ~ 6: 토요일)
    
    // priceText의 숫자 부분만 파란색으로 변환
    let coloredPriceText = priceText.replace(/KRW\s+([\d,]+)/g, 'KRW <span style=\'color: blue\'>$1</span>');
    
    if (studio == "1st") {
      let subject = "Profile Photo Shooting Instructions from JP12206b Studio";
      let message = "Dear <span style='color: blue'>" + name + "</span>,<br><br>" +
                  "Hello, this is <span style='color: red'>JP12206b Studio</span>. I am leaving a text message regarding your reservation on <span style='color: blue'>" + day +" at "+ hours + ":" + minutes + ".</span><br><br>" +
                  "Please send the reservation deposit of KRW <span style='color: blue'>" + depositAmount +"</span> to my bank account, Park Jin (박진), at KB Bank (국민은행)  <span style='color: red'>77880104334542</span>, to confirm your reservation. " +
                  "If you don't send the deposit within an hour, your reservation will be canceled. " +
                  "It is convenient to use Wise App, When you send the deposit / <span style='color: red'>If you use Paypal, You can pay by</span> <span style='color: blue'>USD $" + usdAmount + "</span> <span style='color: red'>(include transfer fee)</span>" + "<br><br>" + 
                  "Wiseapp : Https://wise.com/pay/me/jinp201" + "<br>" + 
                  "Paypal: https://paypal.me/jp12206b?country.x=KR&locale.x=ko_KR " + "<br><br>" +
                  coloredPriceText.replace(/\n/g, '<br>') + "<br><br>" +
                  "*Please pay the remaining shooting fee from the total amount (excluding the reservation deposit) after the photo shoot." + "<br>" +
                  "*The schedule, timing, or cancellation is not possible after the reservation is confirmed, so please make your reservation with careful consideration. (Reservation fee cannot be refunded.)" + "<br>" +
                  "*Cancellations or schedule changes are not possible due to COVID-19." + 
                  "<br><br>" +
                  "* Photo retouching is carried out according to the studio guidelines, and excessive retouching can negatively impact your image (e.g., double eyelid production, tattoo removal, accessory removal, sty removal, etc.)." + 
                  "<br><br>" +
                  "*You can request photo retouching twice, so please provide us with accurate feedback by displaying the request modifications them in a picture." + 
                  "<br><br>" +
                  "*Please send your request to jp@jpjpjpjpjp.com." +
                  "<br><br>" +
                  "*The original image for selection is available in size 1620x1080px, and the final version is available in size 6336x9504px." + "<br>" +
                  "*Additional photo retouching fee: KRW 40,000 per sheet" + 
                  "<br><br>" +
                  "*Please arrive 10 minutes prior to the scheduled shooting time on the day. Please note that arriving too early may result in the inability to enter during shooting. (If you are running late, the next shooting session could be disrupted, so please be on time.)" + "<br>" +
                  "*Please use the nearby paid parking lot when using a vehicle. (&#128663; Parking lot address: 218-13, Jayang-dong, Gwangjin-gu) (광진구 자양동 218-13)" + "<br>" +
                  "*If you arrive on foot, you can enter the building through the gray gate on the left side of the lottery store. (&#127984; Studio address: JP Studio on B1, 36, Jayang-ro 15-gil, Gwangjin-gu, Seoul) (광진구 자양로 15길 36 지하 1층 제이피스튜디오)" + 
                  "<br><br>" +
                  "*The clothes available for the shooting are as follows: sleeveless slips (white, black, ivory, etc.), off-shoulder sweaters (black, white), shirts (white), turtleneck sweaters (black, ivory)" + 
                  "<br><br>" +
                  "*NOTE: The available sizes are limited to small and medium. If you need a smaller or larger size, please bring your own clothes." + "<br>" +
                  "*Please ensure to bring and use an underwear pad and nipple patches to prevent the visibility of underwear straps during the shooting with a slip." + "<br>" +
                  "<span style='color: red'>*When taking whole body shooting impossible to use outside shoes, Please prepare clean shoes</span>" + 
                  "<br><br>" +
                  "*※ COVID-19 Notice: If you have any suspicious symptoms such as recent overseas travel, contact with confirmed COVID-19 patients, or exposure to crowded areas within the past two weeks, please refrain from visiting. If you have undergone a COVID-19 test, please visit after receiving the test results." + "<br>" +
                  "*Non-compliance with the above guidelines will be considered as agreement to waive any claims for damages." + 
                  "<br><br>" +
                  "*In addition, only the person with the reservation is allowed to visit during the reserved time." + "<br><br>" +
                  "*&#128663; Parking lot address: 218-13, Jayang-dong, Gwangjin-gu) (광진구 자양동 218-13)" + "<br>" +
                  "*&#127984; Studio Address: JP Studio on B1, 36, Jayang-ro 15-gil, Gwangjin-gu (광진구 자양로 15길 36 지하 1층 제이피스튜디오)" +
                  "<br><br>Best regards,<br>" +
                  "JP12206b Studio";

                      // MailApp 또는 GmailApp을 사용하여 이메일 전송
      try {
        // htmlBody 옵션을 추가하여 HTML 이메일 전송
        GmailApp.sendEmail(email, subject, "", {htmlBody: message});
        Logger.log('Email sended: ' + message);
      } catch(error){
        Logger.log('이메일 발송 실패: ' + error.message);
      }
    } else if (studio == "2nd") {
      let subject = "Profile Photo Shooting Instructions from JP12839c Studio";
      let message = "Dear <span style='color: blue'>" + name + "</span>,<br><br>" +
                  "Hello, this is <span style='color: red'>JP12839c Studio</span>. I am leaving a text message regarding your reservation on <span style='color: blue'>" + day +" at "+ hours + ":" + minutes + ".</span><br><br>" +
                  "Please send the reservation deposit of KRW <span style='color: blue'>" + depositAmount +"</span> to my bank account, Park Jin (박진), at KB Bank (국민은행)  <span style='color: red'>77880104334542</span>, to confirm your reservation. " +
                  "If you don't send the deposit within an hour, your reservation will be canceled. " +
                  "It is convenient to use Wise App, When you send the deposit / <span style='color: red'>If you use Paypal, You can pay by</span> <span style='color: blue'>USD $" + usdAmount + "</span> <span style='color: red'>(include transfer fee)</span>" + "<br><br>" + 
                  "Wiseapp : Https://wise.com/pay/me/jinp201" + "<br>" + 
                  "Paypal: https://paypal.me/jp12206b?country.x=KR&locale.x=ko_KR " + "<br><br>" +
                  coloredPriceText.replace(/\n/g, '<br>') + "<br><br>" +
                  "*Please pay the remaining shooting fee from the total amount (excluding the reservation deposit) after the photo shoot." + "<br>" +
                  "*The schedule, timing, or cancellation is not possible after the reservation is confirmed, so please make your reservation with careful consideration. (Reservation fee cannot be refunded.)" + "<br>" +
                  "*Cancellations or schedule changes are not possible due to COVID-19." + 
                  "<br><br>" +
                  "* Photo retouching is carried out according to the studio guidelines, and excessive retouching can negatively impact your image (e.g., double eyelid production, tattoo removal, accessory removal, sty removal, etc.)." + 
                  "<br><br>" +
                  "*You can request photo retouching twice, so please provide us with accurate feedback by displaying the request modifications them in a picture." + 
                  "<br><br>" +
                  "*Please send your request to jp@jpjpjpjpjp.com." + 
                  "<br><br>" +
                  "*The original image for selection is available in size 1620x1080px, and the final version is available in size 6336x9504px." + "<br>" +
                  "*Additional photo retouching fee: KRW 40,000 per sheet" + 
                  "<br><br>" +
                  "*Please arrive 10 minutes prior to the scheduled shooting time on the day. Please note that arriving too early may result in the inability to enter during shooting. (If you are running late, the next shooting session could be disrupted, so please be on time.)" + "<br>" +
                  "*Please use the nearby paid parking lot when using a vehicle. (&#128663; Parking lot address:59, Jayang-ro 13-gil, Gwangjin-gu, Seoul, Republic of Korea (서울특별시 광진구 자양로13길 59 자양동, 자양전통시장 공영주차장)" + 
                  "<br><br>" +
                  "*If you arrive on foot, You can see the park, and there is a door to the left of the pharmacy. (&#127984; Studio Address: JP Studio on B1, 47, Jayang-ro 13-gil, Gwangjin-gu, Seoul (서울 광진구 자양로13길 47 지하 1층 제이피스튜디오 2호점)" + 
                  "<br><br>" +
                  "*The clothes available for the shooting are as follows: sleeveless slips (white, black, ivory, etc.), off-shoulder sweaters (black, white), shirts (white), turtleneck sweaters (black, ivory)" + 
                  "<br><br>" +
                  "*NOTE: The available sizes are limited to small and medium. If you need a smaller or larger size, please bring your own clothes." + "<br>" +
                  "*Please ensure to bring and use an underwear pad and nipple patches to prevent the visibility of underwear straps during the shooting with a slip." + "<br>" +
                  "<span style='color: red'>*When taking whole body shooting impossible to use outside shoes, Please prepare clean shoes</span>" + 
                  "<br><br>" +
                  "*※ COVID-19 Notice:" + "<br>" + 
                  "If you have any suspicious symptoms such as recent overseas travel, contact with confirmed COVID-19 patients, or exposure to crowded areas within the past two weeks, please refrain from visiting. If you have undergone a COVID-19 test, please visit after receiving the test results." + "<br>" +
                  "(Non-compliance with the above guidelines will be considered as agreement to waive any claims for damages.)" + 
                  "<br><br>" +
                  "*In addition, only the person with the reservation is allowed to visit during the reserved time." + "<br><br>" +
                  "*&#128663; Parking lot address:59, Jayang-ro 13-gil, Gwangjin-gu, Seoul, Republic of Korea (서울특별시 광진구 자양로13길 59 자양동, 자양전통시장 공영주차장)" + 
                  "<br><br>" +
                  "*&#127984; Studio Address: JP Studio on B1, 47, Jayang-ro 13-gil, Gwangjin-gu, Seoul (서울 광진구 자양로13길 47 지하 1층 제이피스튜디오 2호점)" +
                  "<br><br>Best regards,<br>" +
                  "JP12839c Studio";
      // MailApp 또는 GmailApp을 사용하여 이메일 전송
      try {
        // htmlBody 옵션을 추가하여 HTML 이메일 전송
        GmailApp.sendEmail(email, subject, "", {htmlBody: message});
        Logger.log('Email sended: ' + message);
      } catch(error){
        Logger.log('이메일 발송 실패: ' + error.message);
      }
    }
  }