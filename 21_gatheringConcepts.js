function gatheringConcepts(sheet,row) {
    Logger.log("gatheringConcepts 함수 실행됨");
    let columns = getColumnProperties();

    let individualProfileConcepts1st = sheet.getRange(row, columns.INDIVIDUAL_PROFILE_CONCEPTS_1ST_COLUMN).getValue();
    let individualProfileConcepts2nd = sheet.getRange(row, columns.INDIVIDUAL_PROFILE_CONCEPTS_2ND_COLUMN).getValue();
    let individualProfileConcepts3rd = sheet.getRange(row, columns.INDIVIDUAL_PROFILE_CONCEPTS_3RD_COLUMN).getValue();
    let individualProfileConceptsEach = sheet.getRange(row, columns.INDIVIDUAL_PROFILE_CONCEPTS_4TH_COLUMN).getValue();

    let conceptsText = [
        individualProfileConcepts1st,
        individualProfileConcepts2nd,
        individualProfileConcepts3rd,
        individualProfileConceptsEach
    ].join("\n");

    sheet.getRange(row, columns.CHOSEN_CONCEPTS_COLUMN).setValue(conceptsText.trim());
}
