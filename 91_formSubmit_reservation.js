function formSubmit_reservation(e) {
  Logger.log("formSubmit_reservation 함수 실행됨");

  // 시트 response와 시트 info 참조 가져오기
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheetResponse = ss.getSheetByName("response");
  let sheetInfo = ss.getSheetByName("info");

  // 프로퍼티에서 컬럼 정보 가져오기
  const columns = getColumnProperties();

  // 시트 response의 마지막 행 데이터 가져오기
  let lastRow = sheetResponse.getLastRow(); // 마지막 행 번호
  let newRecord = sheetResponse
    .getRange(lastRow, 1, 1, sheetResponse.getLastColumn())
    .getValues()[0]; // 마지막 행 데이터
  let time = newRecord[0];
  let name = newRecord[1];
  emailAlarmFormSubmitted(name, time);

  let numberOfPeople;
  if (newRecord[9] == "More than 4") {
    numberOfPeople = 4;
  } else {
    numberOfPeople = newRecord[9];
  }

  let numberOfConcepts_1p = newRecord[10];
  let HM_1p = newRecord[11];

  let numberOfCoupleProfile_2p = newRecord[12];
  let numberOfConcepts_2p_1st = newRecord[13];
  let HM_2p_1st = newRecord[14];
  let numberOfConcepts_2p_2nd = newRecord[15];
  let HM_2p_2nd = newRecord[16];

  let numberOfCoupleProfile_3p = newRecord[17];
  let numberOfGroupProfile_3p = newRecord[18];
  let numberOfConcepts_3p_1st = newRecord[19];
  let HM_3p_1st = newRecord[20];
  let numberOfConcepts_3p_2nd = newRecord[21];
  let HM_3p_2nd = newRecord[22];
  let numberOfConcepts_3p_3rd = newRecord[23];
  let HM_3p_3rd = newRecord[24];

  let numberOfCoupleProfile_4p = newRecord[25];
  let numberOfGroupProfile_4p = newRecord[26];
  let numberOfConceptsEach_4p = newRecord[27];
  let HMEach_4p = newRecord[28];

  let englishName = newRecord[29];
  let conceptNames_1p = newRecord[30];
  let conceptNames_2p_1st = newRecord[31];
  let conceptNames_2p_2nd = newRecord[32];
  let conceptNames_3p_1st = newRecord[33];
  let conceptNames_3p_2nd = newRecord[34];
  let conceptNames_3p_3rd = newRecord[35];
  let conceptNamesEach_4p = newRecord[36];

  // response 시트의 새로운 행에서 B열부터 J열까지의 데이터 가져오기
  let sourceData = sheetResponse.getRange(lastRow, 2, 1, 9).getValues()[0];

  // sourceData 배열 재구성 - englishName을 2번째 위치에 삽입
  sourceData.splice(1, 0, englishName);

  // info 시트의 A3 행에 새로운 행 추가
  sheetInfo.insertRowBefore(3);

  // info 시트의 A3 행에 데이터 붙여넣기
  sheetInfo.getRange(3, 1, 1, 10).setValues([sourceData]); // A3 행에 데이터 붙여넣기

  let countryCodeMap = {
    "대한민국(+82)": "+82",
    "China(+86)": "+86",
    "Japan(+81)": "+81",
    "Taiwan(+886)": "+886",
    "Hong Kong(+852)": "+852",
    "USA(+1)": "+1",
    "Canada(+1)": "+1",
    "Other Country": "",
  };

  let countryCode = countryCodeMap[newRecord[7]] || "";
  let rawPhoneNumber = newRecord[5];

  // 전화번호 맨 앞의 0 제거
  let refinedPhoneNumber = rawPhoneNumber.replace(/^0+/, "");
  let phoneNumber = countryCode + "-" + refinedPhoneNumber;
  sheetInfo.getRange(3, columns.PHONE_NUMBER_COLUMN, 1, 1).setValue(phoneNumber);

  let coupleProfileMap = {
    1: "No, I won't shoot.",
    2: numberOfCoupleProfile_2p,
    3: numberOfCoupleProfile_3p,
    4: numberOfCoupleProfile_4p,
  };

  let coupleProfile = coupleProfileMap[numberOfPeople] || "";
  sheetInfo.getRange(3, columns.COUPLE_PROFILE_COLUMN, 1, 1).setValue(coupleProfile);

  let groupProfileMap = {
    1: "No, I won't shoot.",
    2: "No, I won't shoot.",
    3: numberOfGroupProfile_3p,
    4: numberOfGroupProfile_4p,
  };

  let groupProfile = groupProfileMap[numberOfPeople] || "";
  sheetInfo.getRange(3, columns.GROUP_PROFILE_COLUMN, 1, 1).setValue(groupProfile);

  let individualProfile1stMap = {
    1: numberOfConcepts_1p,
    2: numberOfConcepts_2p_1st,
    3: numberOfConcepts_3p_1st,
    4: "",
  };

  let individualProfile1st = individualProfile1stMap[numberOfPeople] || "";
  sheetInfo.getRange(3, columns.INDIVIDUAL_PROFILE_1ST_COLUMN, 1, 1).setValue(individualProfile1st);

  let individualProfile1stHMMap = {
    1: HM_1p,
    2: HM_2p_1st,
    3: HM_3p_1st,
    4: "",
  };

  let individualProfileConcepts1stMap = {
    1: conceptNames_1p,
    2: conceptNames_2p_1st,
    3: conceptNames_3p_1st,
    4: "",
  };
  let individualProfileConcepts1st = individualProfileConcepts1stMap[numberOfPeople] || "";
  sheetInfo.getRange(3, columns.INDIVIDUAL_PROFILE_CONCEPTS_1ST_COLUMN, 1, 1).setValue(individualProfileConcepts1st);

  let individualProfile1stHM = individualProfile1stHMMap[numberOfPeople] || "";
  sheetInfo.getRange(3, columns.INDIVIDUAL_PROFILE_1ST_HM_COLUMN, 1, 1).setValue(individualProfile1stHM);

  let individualProfile2ndMap = {
    1: "",
    2: numberOfConcepts_2p_2nd,
    3: numberOfConcepts_3p_2nd,
    4: "",
  };
  let individualProfile2nd = individualProfile2ndMap[numberOfPeople] || "";
  sheetInfo.getRange(3, columns.INDIVIDUAL_PROFILE_2ND_COLUMN, 1, 1).setValue(individualProfile2nd);

  let individualProfileConcepts2ndMap = {
    1: "",
    2: conceptNames_2p_2nd,
    3: conceptNames_3p_2nd,
    4: "",
  };
  let individualProfileConcepts2nd = individualProfileConcepts2ndMap[numberOfPeople] || "";
  sheetInfo.getRange(3, columns.INDIVIDUAL_PROFILE_CONCEPTS_2ND_COLUMN, 1, 1).setValue(individualProfileConcepts2nd);

  let individualProfile2ndHMMap = {
    1: "",
    2: HM_2p_2nd,
    3: HM_3p_2nd,
    4: "",
  };
  let individualProfile2ndHM = individualProfile2ndHMMap[numberOfPeople] || "";
  sheetInfo.getRange(3, columns.INDIVIDUAL_PROFILE_2ND_HM_COLUMN, 1, 1).setValue(individualProfile2ndHM);

  let individualProfile3rdMap = {
    1: "",
    2: "",
    3: numberOfConcepts_3p_3rd,
    4: "",
  };
  let individualProfile3rd = individualProfile3rdMap[numberOfPeople] || "";
  sheetInfo.getRange(3, columns.INDIVIDUAL_PROFILE_3RD_COLUMN, 1, 1).setValue(individualProfile3rd);

  let individualProfileConcepts3rdMap = {
    1: "",
    2: "",
    3: conceptNames_3p_3rd,
    4: "",
  };
  let individualProfileConcepts3rd = individualProfileConcepts3rdMap[numberOfPeople] || "";
  sheetInfo.getRange(3, columns.INDIVIDUAL_PROFILE_CONCEPTS_3RD_COLUMN, 1, 1).setValue(individualProfileConcepts3rd);

  let individualProfile3rdHMMap = {
    1: "",
    2: "",
    3: HM_3p_3rd,
    4: "",
  };
  let individualProfile3rdHM = individualProfile3rdHMMap[numberOfPeople] || "";
  sheetInfo.getRange(3, columns.INDIVIDUAL_PROFILE_3RD_HM_COLUMN, 1, 1).setValue(individualProfile3rdHM);

  let individualProfileEachMap = {
    1: "",
    2: "",
    3: "",
    4: numberOfConceptsEach_4p,
  };
  let individualProfileEach = individualProfileEachMap[numberOfPeople] || "";
  sheetInfo.getRange(3, columns.INDIVIDUAL_PROFILE_4TH_COLUMN, 1, 1).setValue(individualProfileEach);

  let individualProfileConceptsEachMap = {
    1: "",
    2: "",
    3: "",
    4: conceptNamesEach_4p,
  };
  let individualProfileConceptsEach = individualProfileConceptsEachMap[numberOfPeople] || "";
  sheetInfo.getRange(3, columns.INDIVIDUAL_PROFILE_CONCEPTS_4TH_COLUMN, 1, 1).setValue(individualProfileConceptsEach);

  let individualProfileEachHMMap = {
    1: "",
    2: "",
    3: "",
    4: HMEach_4p,
  };
  let individualProfileEachHM =
    individualProfileEachHMMap[numberOfPeople] || "";
  sheetInfo.getRange(3, columns.INDIVIDUAL_PROFILE_4TH_HM_COLUMN, 1, 1).setValue(individualProfileEachHM);
}
