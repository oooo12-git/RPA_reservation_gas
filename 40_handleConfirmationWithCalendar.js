function handleConfirmationWithCalendar(
  e,
  name,
  email,
  numberOfPeople,
  date_of_shooting,
  studio,
  couple_profile,
  group_profile,
  individual_1st,
  individual_2nd,
  individual_3rd,
  EVENT_ID_COLUMN
) {
  Logger.log("handleConfirmationWithCalendar 함수 실행됨");

  let responses = e.values;
  let row = e.row;

  // let name = responses[0];  // name 필드(A열)
  // let email = responses[6];  // email 필드 (G열)
  // let numberOfPeople = responses[9] // Number of people 필드(J열)
  // let date_of_shooting = new Date(responses[8]);  // Date of shooting 필드(I열)
  // let studio = responses[24];  // which Studio? 필드 (1st or 2nd)(Y열)
  let eventId = responses[EVENT_ID_COLUMN - 1]; // eventId 필드 (AB열)
  // let couple_profile = responses[10];
  // let group_profile = responses[11];
  // let individual_1st = responses[12];
  // let individual_2nd = responses[14];
  // let individual_3rd = responses[16];

  // 캘린더 ID 설정
  let studio1CalendarId =
    "e4078b3f6425088e10f2fa64229001821ae20bdf8e63c42fe2c096c65cdd6aa6@group.calendar.google.com";
  let studio2CalendarId =
    "b319798d4b5cd32ef01cbe414c6b78541f258d88630e0b7d81f8d8513dc895ac@group.calendar.google.com";

  // 스튜디오에 따라 캘린더 선택
  let calendarId;
  if (studio == "1st") {
    calendarId = studio1CalendarId;
  } else if (studio == "2nd") {
    calendarId = studio2CalendarId;
  } else {
    Logger.log("알 수 없는 스튜디오: " + studio);
    return;
  }
  Logger.log("캘린더 ID: " + calendarId);

  if (!eventId) {
    Logger.log("저장된 Event ID가 없습니다. 이벤트를 찾을 수 없습니다.");
    return;
  }

  try {
    let calendar = CalendarApp.getCalendarById(calendarId);
    if (!calendar) {
      throw new Error("캘린더를 찾을 수 없습니다. ID: " + calendarId);
    }

    // 기존 이벤트가 있는 경우에만 삭제 시도
    if (eventId) {
      try {
        let event = calendar.getEventById(eventId);
        if (event) {
          event.deleteEvent();
          Logger.log("기존 캘린더 이벤트 삭제 성공! Event ID: " + eventId);
        } else {
          Logger.log("기존 이벤트가 이미 삭제되었거나 존재하지 않습니다.");
        }
      } catch (deleteError) {
        Logger.log("기존 이벤트 삭제 중 에러 발생: " + deleteError.message);
        // 삭제 실패해도 계속 진행
      }
    }

    // 업데이트된 제목으로 새 이벤트 생성
    let hours = ("0" + date_of_shooting.getHours()).slice(-2);
    let minutes = ("0" + date_of_shooting.getMinutes()).slice(-2);
    let newEventTitle =
      "!test " + name + " (" + numberOfPeople + ") " + hours + ":" + minutes;

    let additionalInfo = [];
    if (couple_profile >= 1) additionalInfo.push("커플" + couple_profile);
    if (group_profile >= 1) additionalInfo.push("그룹" + group_profile);
    if (individual_1st >= 1) additionalInfo.push("프" + individual_1st);
    if (individual_2nd >= 1) additionalInfo.push("프" + individual_2nd);
    if (individual_3rd >= 1) additionalInfo.push("프" + individual_3rd);

    if (additionalInfo.length > 0) {
      newEventTitle += " " + additionalInfo.join(", ");
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
    Logger.log("새 캘린더 이벤트 생성 성공! New Event ID: " + newEvent.getId());

    // 시트에 새로운 Event ID 저장
    let newEventId = newEvent.getId();
    let sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.getRange(row, EVENT_ID_COLUMN).setValue(newEventId); // 필요 시 열 번호 조정 - AB열

    // 확인 이메일 전송
    sendConfirmationEmail(name, email, date_of_shooting, studio);

    SpreadsheetApp.getUi().alert(
      "예약 일정 캘린더 업데이트, 예약금 확인 이메일 전송 완료"
    );
  } catch (error) {
    Logger.log("확인 처리 중 에러 발생: " + error.message);
    throw error; // 상위로 에러를 전파하여 실제 에러 내용을 확인할 수 있도록 함
  }
}
