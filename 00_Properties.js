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
      CALCULATE_BUTTON_COLUMN: 21,
      DEPOSIT_COLUMN: 22,
      DEPOSIT_DOLLAR_COLUMN: 23,
      PRICE_KO_COLUMN: 24,
      PRICE_EN_COLUMN: 25,
      STUDIO_COLUMN: 26,
      SEND_MAIL_COLUMN: 27,
      CONFIRM_COLUMN: 28,
      EVENT_ID_COLUMN: 29,
      DRIVE_LINK_COLUMN: 30,
      SEND_ADJUST_INFO_COLUMN: 31,
      SELECTED_PICTURE_NUMBER_COLUMN: 32,
      SELECTED_DATE_COLUMN: 33,
      DUE_DATE_COLUMN: 34,
      SELECTED_PICTURE_COUNT_COLUMN: 35
    };
  
    // 프로퍼티에 저장
    scriptProperties.setProperties(columnProperties);
  }
  
  // 프로퍼티에서 컬럼 정보 가져오는 함수
  function getColumnProperties() {
    const scriptProperties = PropertiesService.getScriptProperties();
    const properties = scriptProperties.getProperties();
    
    // 문자열로 저장된 값들을 숫자로 변환
    Object.keys(properties).forEach(key => {
      properties[key] = parseInt(properties[key]);
    });
    
    return properties;
  }
  