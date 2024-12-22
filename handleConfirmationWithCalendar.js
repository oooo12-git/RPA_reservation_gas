function handleConfirmationWithCalendar(e) {
    Logger.log('handleConfirmationWithCalendar 함수 실행됨');
    
    let responses = e.values;
    let row = e.row;
    
    let name = responses[0];  // name 필드(A열)
    let email = responses[5];  // email 필드 (F열)
    let numberOfPeople = responses[8] // Number of people 필드(I열)
    let date_of_shooting = new Date(responses[7]);  // Date of shooting 필드(H열)
    let studio = responses[23];  // which Studio? 필드 (1st or 2nd)(X열)
    let eventId = responses[26]; // eventId 필드 (AA열)
    let couple_profile = responses[9];
    let group_profile = responses[10];
    let individual_1st = responses[11];
    let individual_2nd = responses[13];
    let individual_3rd = responses[15];
    
    // 캘린더 ID 설정
    let studio1CalendarId = 'e4078b3f6425088e10f2fa64229001821ae20bdf8e63c42fe2c096c65cdd6aa6@group.calendar.google.com';
    let studio2CalendarId = 'b319798d4b5cd32ef01cbe414c6b78541f258d88630e0b7d81f8d8513dc895ac@group.calendar.google.com';
    
    // 스튜디오에 따라 캘린더 선택
    let calendarId;
    if (studio == "1st") {
      calendarId = studio1CalendarId;
    } else if (studio == "2nd") {
      calendarId = studio2CalendarId;
    } else {
      Logger.log('알 수 없는 스튜디오: ' + studio);
      return;
    }
    Logger.log('캘린더 ID: ' + calendarId);

    
    if (!eventId) {
      Logger.log('저장된 Event ID가 없습니다. 이벤트를 찾을 수 없습니다.');
      return;
    }
    
    try {
      let calendar = CalendarApp.getCalendarById(calendarId);
      if (!calendar) {
        throw new Error('캘린더를 찾을 수 없습니다. ID: ' + calendarId);
      }
      
      let event = calendar.getEventById(eventId);
      if (!event) {
        throw new Error('이벤트를 찾을 수 없습니다. Event ID: ' + eventId);
      }
      
      // 기존 이벤트 삭제
      event.deleteEvent();
      Logger.log('기존 캘린더 이벤트 삭제 성공! Event ID: ' + eventId);
      
      // 업데이트된 제목으로 새 이벤트 생성
      let hours = ('0' + date_of_shooting.getHours()).slice(-2);
      let minutes = ('0' + date_of_shooting.getMinutes()).slice(-2);
      let newEventTitle = name + ' (' + numberOfPeople +') ' + hours + ':' + minutes;

      let additionalInfo = [];
      if (couple_profile >= 1) additionalInfo.push('커플' + couple_profile);
      if (group_profile >= 1) additionalInfo.push('그룹' + group_profile);
      if (individual_1st >= 1) additionalInfo.push('프' + individual_1st);
      if (individual_2nd >= 1) additionalInfo.push('프' + individual_2nd);
      if (individual_3rd >= 1) additionalInfo.push('프' + individual_3rd);

      if (additionalInfo.length > 0) {
        newEventTitle += ' ' + additionalInfo.join(', ');
      }
      
      let startTime = new Date(
        date_of_shooting.getFullYear(), 
        date_of_shooting.getMonth(), 
        date_of_shooting.getDate(),
        date_of_shooting.getHours(),
        date_of_shooting.getMinutes()
      );
      let endTime = new Date(
        date_of_shooting.getFullYear(), 
        date_of_shooting.getMonth(), 
        date_of_shooting.getDate(), 
        date_of_shooting.getHours() + 1, // 1시간 후 종료
        date_of_shooting.getMinutes()
      );
      
      let newEvent = calendar.createEvent(newEventTitle, startTime, endTime);
      Logger.log('새 캘린더 이벤트 생성 성공! New Event ID: ' + newEvent.getId());
      
      // 시트에 새로운 Event ID 저장
      let newEventId = newEvent.getId();
      let sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
      sheet.getRange(row, 27).setValue(newEventId); // 필요 시 열 번호 조정

      // 확인 이메일 전송
      let priceText = responses[22];
      sendConfirmationEmail(name, email, date_of_shooting, numberOfPeople, priceText);

    } catch (error) {
      Logger.log('확인 처리 중 에러 발생: ' + error.message);
    }
  }