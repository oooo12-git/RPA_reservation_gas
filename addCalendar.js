function addCalendar(calendarId, name, hours, minutes, numberOfPeople, date_of_shooting, row, couple_profile, group_profile, individual_1st, individual_2nd, individual_3rd){
    Logger.log('addCalenadar 함수 실행됨');
    try{
        let calendar = CalendarApp.getCalendarById(calendarId);
        if (!calendar) {
            throw new Error('캘린더를 찾을 수 없습니다. ID: ' + calendarId);
        }
        let eventTitle = '!test X ' + name + ' (' + numberOfPeople +') ' + hours + ':' + minutes;

        let additionalInfo = [];
        if (couple_profile >= 1) additionalInfo.push('커플' + couple_profile);
        if (group_profile >= 1) additionalInfo.push('그룹' + group_profile);
        if (individual_1st >= 1) additionalInfo.push('프' + individual_1st);
        if (individual_2nd >= 1) additionalInfo.push('프' + individual_2nd);
        if (individual_3rd >= 1) additionalInfo.push('프' + individual_3rd);
        
        if (additionalInfo.length > 0) {
            eventTitle += ' ' + additionalInfo.join(', ');
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
    
        let event = calendar.createEvent(eventTitle, startTime, endTime);
        Logger.log('캘린더 이벤트 생성 성공! Event ID: ' + event.getId());
        // 시트에 Event ID 저장 (AA열)
        let sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        sheet.getRange(row, 27).setValue(event.getId()); // 필요 시 열 번호 조정
    
    }catch (e) {
        Logger.log('캘린더 이벤트 생성 에러 발생: ' + e.message);
    }
  
}