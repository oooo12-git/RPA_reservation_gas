// 프로퍼티 초기화 함수
function initializeColumnProperties() {
  const scriptProperties = PropertiesService.getScriptProperties();

  const columnProperties = {
    NAME_COLUMN: 1,
    PHONE_NUMBER_COLUMN: 6,
    EMAIL_COLUMN: 7,
    DATE_OF_SHOOTING_COLUMN: 9,
    NUMBER_OF_PEOPLE_COLUMN: 10,
    COUPLE_PROFILE_COLUMN: 11,
    GROUP_PROFILE_COLUMN:12,
    INDIVIDUAL_PROFILE_1ST_COLUMN: 13,
    INDIVIDUAL_PROFILE_CONCEPTS_1ST_COLUMN: 14,
    INDIVIDUAL_PROFILE_1ST_HM_COLUMN:15,
    INDIVIDUAL_PROFILE_2ND_COLUMN: 16,
    INDIVIDUAL_PROFILE_CONCEPTS_2ND_COLUMN: 17,
    INDIVIDUAL_PROFILE_2ND_HM_COLUMN:18,
    INDIVIDUAL_PROFILE_3RD_COLUMN: 19,
    INDIVIDUAL_PROFILE_CONCEPTS_3RD_COLUMN: 20,
    INDIVIDUAL_PROFILE_3RD_HM_COLUMN: 21,
    INDIVIDUAL_PROFILE_4TH_COLUMN: 22,
    INDIVIDUAL_PROFILE_CONCEPTS_4TH_COLUMN: 23,
    INDIVIDUAL_PROFILE_4TH_HM_COLUMN: 24,
    CALCULATE_BUTTON_COLUMN: 25,
    DEPOSIT_COLUMN: 26,
    DEPOSIT_DOLLAR_COLUMN: 27,
    PRICE_KO_COLUMN: 28,
    PRICE_EN_COLUMN: 29,
    CHOSEN_CONCEPTS_COLUMN: 30,
    STUDIO_COLUMN: 31,
    SEND_MAIL_COLUMN: 32,
    CONFIRM_COLUMN: 33,
    EVENT_ID_COLUMN: 34,
    DRIVE_LINK_COLUMN: 35,
    SEND_ADJUST_INFO_COLUMN: 36,
    SELECTED_PICTURE_NUMBER_COLUMN: 37,
    SELECTED_DATE_COLUMN: 38,
    DUE_DATE_COLUMN: 39,
    SELECTED_PICTURE_COUNT_COLUMN: 40,
    ADJUST_CALENDAR_ADD_COLUMN: 41,
  };

  // 프로퍼티에 저장
  scriptProperties.setProperties(columnProperties);
}

// 프로퍼티에서 컬럼 정보 가져오는 함수
function getColumnProperties() {
  const scriptProperties = PropertiesService.getScriptProperties();
  const properties = scriptProperties.getProperties();

  // 문자열로 저장된 값들을 숫자로 변환
  Object.keys(properties).forEach((key) => {
    properties[key] = parseInt(properties[key]);
  });

  return properties;
}
