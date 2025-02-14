function sendDepositNoticeEmail(name, email, date_of_shooting, numberOfPeople, depositWon, depositDollar, ko_priceText, priceText, studio) {
    let depositAmount = depositWon.toLocaleString();
    let usdAmount = depositDollar.toLocaleString();
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
    
    // priceText의 숫자 부분만 파란색으로 변환
    let ko_coloredPriceText = ko_priceText.replace(/KRW\s+([\d,]+)/g, 'KRW <span style=\'color: blue\'>$1</span>');
    let en_coloredPriceText = priceText.replace(/KRW\s+([\d,]+)/g, 'KRW <span style=\'color: blue\'>$1</span>');
    
    if (studio == "1st") {
      let subject = "프로필 사진 촬영 안내 JP12206b 스튜디오/ Profile Photo Shooting Instructions from JP12206b Studio";
      let ko_message = "안녕하세요 <span style='color: blue'>" + name + "</span>님,<br><br>" +
                  "<span style='color: red'>JP12206b Studio</span>입니다. <span style='color: blue'>" + ko_day +" "+ hours + ":" + minutes + "</span> 예약과 관련하여 안내드립니다.<br><br>" +
                  "예약 확정을 위해 예약금 <span style='color: blue'>" + depositAmount +"</span>원을 국민은행 <span style='color: red'>77880104334542</span> 박진 계좌로 입금해 주시기 바랍니다. " +
                  "1시간 이내 입금이 확인되지 않으면 예약이 자동 취소됩니다. " +"<br><br>" +
                  ko_coloredPriceText.replace(/\n/g, '<br>') + "<br><br>" +
                  "*촬영 후 총 금액에서 예약금을 제외한 잔금을 결제해 주시면 됩니다." + "<br>" +
                  "*예약 확정 후 일정 조정 및 취소가 불가하오니 신중하게 예약해 주시기 바랍니다. (예약금 환불 불가)" + "<br>" +
                  "*코로나19로 인한 취소 및 일정 변경도 불가합니다." + 
                  "<br><br>" +
                  "*보정은 스튜디오 기준으로 진행되며, 과도한 보정은 이미지를 해칠 수 있습니다. (쌍꺼풀 제작, 문신 제거, 액세서리 제거, 다래끼 제거 등)" + 
                  "<br><br>" +
                  "*보정 요청은 2회까지 가능하며, 수정 요청 사항을 사진으로 표시하여 정확하게 피드백해 주시기 바랍니다." + 
                  "<br><br>" +
                  "*요청사항은 jp@jpjpjpjpjp.com으로 보내주시기 바랍니다." +
                  "<br><br>" +
                  "*선택용 원본 이미지는 1620x1080px, 최종본은 6336x9504px 크기로 제공됩니다." + "<br>" +
                  "*추가 보정 비용: 장당 40,000원" + 
                  "<br><br>" +
                  "*촬영 당일 예약 시간 10분 전 도착을 부탁드립니다. 너무 일찍 도착하시면 촬영 중에는 입장이 어려울 수 있습니다. (지각 시 다음 촬영에 차질이 생길 수 있으니 시간 엄수 부탁드립니다.)" + "<br>" +
                  "*차량 이용 시 근처 유료 주차장을 이용해 주세요. (&#128663; 주차장 주소: 광진구 자양동 218-13)" + "<br>" +
                  "*도보 시 복권방 왼쪽 회색 대문을 통해 건물로 진입하실 수 있습니다. (&#127984; 스튜디오 주소: 광진구 자양로 15길 36 지하 1층 제이피스튜디오)" + 
                  "<br><br>" +
                  "*촬영 가능한 의상은 다음과 같습니다: 슬리브리스 슬립(화이트, 블랙, 아이보리 등), 오프숄더 스웨터(블랙, 화이트), 셔츠(화이트), 터틀넥 스웨터(블랙, 아이보리)" + 
                  "<br><br>" +
                  "*사이즈는 S, M 사이즈로 제한됩니다. 더 작거나 큰 사이즈가 필요한 경우 개인 의상을 준비해 주세요." + "<br>" +
                  "*슬립 촬영 시 속옷 끈이 보이지 않도록 속옷 패드와 니플 패치를 반드시 준비해 주세요." + "<br>" +
                  "<span style='color: red'>*전신 촬영 시 외부 신발 착용이 불가하오니 깨끗한 신발을 준비해 주세요.</span>" + 
                  "<br><br>" +
                  "*※ 코로나19 관련 안내: 최근 2주 이내 해외여행, 확진자 접촉, 다중이용시설 방문 등으로 의심 증상이 있으신 경우 방문을 자제해 주시기 바랍니다. 코로나19 검사를 받으신 경우 검사 결과 확인 후 방문해 주세요." + "<br>" +
                  "*위 지침 미준수 시 피해 보상 청구 권리 포기에 동의한 것으로 간주됩니다." + 
                  "<br><br>" +
                  "*또한 예약된 시간에는 예약자만 방문 가능합니다." + "<br><br>" +
                  "*&#128663; 주차장 주소: 광진구 자양동 218-13" + "<br>" +
                  "*&#127984; 스튜디오 주소: 광진구 자양로 15길 36 지하 1층 제이피스튜디오" +
                  "<br><br>감사합니다.<br>" +
                  "JP12206b Studio" +
                  "<br><br>------ English Version ------<br><br>";

      let message = "Dear <span style='color: blue'>" + name + "</span>,<br><br>" +
                  "Hello, this is <span style='color: red'>JP12206b Studio</span>. I am leaving a text message regarding your reservation on <span style='color: blue'>" + day +" at "+ hours + ":" + minutes + ".</span><br><br>" +
                  "Please send the reservation deposit of KRW <span style='color: blue'>" + depositAmount +"</span> to my bank account, Park Jin (박진), at KB Bank (국민은행)  <span style='color: red'>77880104334542</span>, to confirm your reservation. " +
                  "If you don't send the deposit within an hour, your reservation will be canceled. " +
                  "It is convenient to use Wise App, When you send the deposit / <span style='color: red'>If you use Paypal, You can pay by</span> <span style='color: blue'>USD $" + usdAmount + "</span> <span style='color: red'>(include transfer fee)</span>" + "<br><br>" + 
                  "Wiseapp : Https://wise.com/pay/me/jinp201" + "<br>" + 
                  "Paypal: https://paypal.me/jp12206b?country.x=KR&locale.x=ko_KR " + "<br><br>" +
                  en_coloredPriceText.replace(/\n/g, '<br>') + "<br><br>" +
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

      try {
        GmailApp.sendEmail(email, subject, "", {htmlBody: ko_message + message});
        Logger.log('Email sent: ' + ko_message + message);
      } catch(error){
        Logger.log('이메일 발송 실패: ' + error.message);
      }
    } else if (studio == "2nd") {
      let subject = "프로필 사진 촬영 안내 JP12839c 스튜디오/ Profile Photo Shooting Instructions from JP12839c Studio";
      let ko_message = "안녕하세요 <span style='color: blue'>" + name + "</span>님,<br><br>" +
                  "<span style='color: red'>JP12839c Studio</span>입니다. <span style='color: blue'>" + ko_day +" "+ hours + ":" + minutes + "</span> 예약과 관련하여 안내드립니다.<br><br>" +
                  "예약 확정을 위해 예약금 <span style='color: blue'>" + depositAmount +"</span>원을 국민은행 <span style='color: red'>77880104334542</span> 박진 계좌로 입금해 주시기 바랍니다. " +
                  "1시간 이내 입금이 확인되지 않으면 예약이 자동 취소됩니다. " + "<br><br>" +
                  ko_coloredPriceText.replace(/\n/g, '<br>') + "<br><br>" +
                  "*촬영 후 총 금액에서 예약금을 제외한 잔금을 결제해 주시면 됩니다." + "<br>" +
                  "*예약 확정 후 일정 조정 및 취소가 불가하오니 신중하게 예약해 주시기 바랍니다. (예약금 환불 불가)" + "<br>" +
                  "*코로나19로 인한 취소 및 일정 변경도 불가합니다." + 
                  "<br><br>" +
                  "*보정은 스튜디오 기준으로 진행되며, 과도한 보정은 이미지를 해칠 수 있습니다. (쌍꺼풀 제작, 문신 제거, 액세서리 제거, 다래끼 제거 등)" + 
                  "<br><br>" +
                  "*보정 요청은 2회까지 가능하며, 수정 요청 사항을 사진으로 표시하여 정확하게 피드백해 주시기 바랍니다." + 
                  "<br><br>" +
                  "*요청사항은 jp@jpjpjpjpjp.com으로 보내주시기 바랍니다." +
                  "<br><br>" +
                  "*선택용 원본 이미지는 1620x1080px, 최종본은 6336x9504px 크기로 제공됩니다." + "<br>" +
                  "*추가 보정 비용: 장당 40,000원" + 
                  "<br><br>" +
                  "*촬영 당일 예약 시간 10분 전 도착을 부탁드립니다. 너무 일찍 도착하시면 촬영 중에는 입장이 어려울 수 있습니다. (지각 시 다음 촬영에 차질이 생길 수 있으니 시간 엄수 부탁드립니다.)" + "<br>" +
                  "*차량 이용 시 근처 유료 주차장을 이용해 주세요. (&#128663; 주차장 주소: 서울특별시 광진구 자양로13길 59 자양동, 자양전통시장 공영주차장)" + 
                  "<br><br>" +
                  "*도보로 오시는 경우, 공원이 보이시면 약국 왼쪽에 출입문이 있습니다. (&#127984; 스튜디오 주소: 서울 광진구 자양로13길 47 지하 1층 제이피스튜디오 2호점)" + 
                  "<br><br>" +
                  "*촬영 가능한 의상은 다음과 같습니다: 슬리브리스 슬립(화이트, 블랙, 아이보리 등), 오프숄더 스웨터(블랙, 화이트), 셔츠(화이트), 터틀넥 스웨터(블랙, 아이보리)" + 
                  "<br><br>" +
                  "*사이즈는 S, M 사이즈로 제한됩니다. 더 작거나 큰 사이즈가 필요한 경우 개인 의상을 준비해 주세요." + "<br>" +
                  "*슬립 촬영 시 속옷 끈이 보이지 않도록 속옷 패드와 니플 패치를 반드시 준비해 주세요." + "<br>" +
                  "<span style='color: red'>*전신 촬영 시 외부 신발 착용이 불가하오니 깨끗한 신발을 준비해 주세요.</span>" + 
                  "<br><br>" +
                  "*※ 코로나19 관련 안내:" + "<br>" +
                  "최근 2주 이내 해외여행, 확진자 접촉, 다중이용시설 방문 등으로 의심 증상이 있으신 경우 방문을 자제해 주시기 바랍니다. 코로나19 검사를 받으신 경우 검사 결과 확인 후 방문해 주세요." + "<br>" +
                  "(위 지침 미준수 시 피해 보상 청구 권리 포기에 동의한 것으로 간주됩니다.)" + 
                  "<br><br>" +
                  "*또한 예약된 시간에는 예약자만 방문 가능합니다." + "<br><br>" +
                  "*&#128663; 주차장 주소: 서울특별시 광진구 자양로13길 59 자양동, 자양전통시장 공영주차장" + 
                  "<br><br>" +
                  "*&#127984; 스튜디오 주소: 서울 광진구 자양로13길 47 지하 1층 제이피스튜디오 2호점" +
                  "<br><br>감사합니다.<br>" +
                  "JP12839c Studio" +
                  "<br><br>------ English Version ------<br><br>";

      let message = "Dear <span style='color: blue'>" + name + "</span>,<br><br>" +
                  "Hello, this is <span style='color: red'>JP12839c Studio</span>. I am leaving a text message regarding your reservation on <span style='color: blue'>" + day +" at "+ hours + ":" + minutes + ".</span><br><br>" +
                  "Please send the reservation deposit of KRW <span style='color: blue'>" + depositAmount +"</span> to my bank account, Park Jin (박진), at KB Bank (국민은행)  <span style='color: red'>77880104334542</span>, to confirm your reservation. " +
                  "If you don't send the deposit within an hour, your reservation will be canceled. " +
                  "It is convenient to use Wise App, When you send the deposit / <span style='color: red'>If you use Paypal, You can pay by</span> <span style='color: blue'>USD $" + usdAmount + "</span> <span style='color: red'>(include transfer fee)</span>" + "<br><br>" + 
                  "Wiseapp : Https://wise.com/pay/me/jinp201" + "<br>" + 
                  "Paypal: https://paypal.me/jp12206b?country.x=KR&locale.x=ko_KR " + "<br><br>" +
                  en_coloredPriceText.replace(/\n/g, '<br>') + "<br><br>" +
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

      try {
        GmailApp.sendEmail(email, subject, "", {htmlBody: ko_message + message});
        Logger.log('Email sent: ' + ko_message + message);
      } catch(error){
        Logger.log('이메일 발송 실패: ' + error.message);
      }
    }
  }