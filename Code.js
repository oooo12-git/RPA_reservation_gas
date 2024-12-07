function sayHello() {
  Logger.log("Hello, world!");
}

function onFormSubmit(e) {
    // 시트 response와 시트 info 참조 가져오기
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheetResponse = ss.getSheetByName('response');
    const sheetInfo = ss.getSheetByName('info');
    
    // 폼 제출 데이터를 가져오기
    const responses = e.values;
    
    // 시트 response의 마지막 행 데이터 가져오기
    const lastRow = sheetResponse.getLastRow();
    const newRecord = sheetResponse.getRange(lastRow, 1, 1, sheetResponse.getLastColumn()).getValues()[0];
    
    // response 시트의 새로운 행에서 B열부터 J열까지의 데이터 가져오기
    const sourceData = sheetResponse.getRange(lastRow, 2, 1, 9).getValues()[0];
    
    // info 시트의 마지막 행 가져오기
    const lastRowInfo = sheetInfo.getLastRow();
    
    // info 시트의 다음 행(A3부터 시작)에 데이터 붙여넣기
    sheetInfo.getRange(lastRowInfo + 1, 1, 1, 9).setValues([sourceData]);
}

function onEdit(e) {
  // 수정된 범위 가져오기
  const range = e.range;
  const sheet = range.getSheet();
  
  // info 시트의 T열(체크박스 열)이 수정되었는지 확인
  if (sheet.getName() === 'info' && range.getColumn() === 20) { // T열은 20번째 열
    const row = range.getRow();
    
    // 체크박스가 체크되었는지 확인
    if (range.getValue() === true) {
      // I열(numberOfPeople)의 값 가져오기
      const numberOfPeople = sheet.getRange(row, 9).getValue(); // I열은 9번째 열
      
      // numberOfPeople이 숫자인지 확인
      if (!isNaN(numberOfPeople) && numberOfPeople !== "") {
        // 숫자인 경우 예치금 계산
        const depositWon = numberOfPeople * 100000;
        const depositDollar = numberOfPeople * 79.6;
        
        sheet.getRange(row, 21).setValue(depositWon);
        sheet.getRange(row, 22).setValue(depositDollar);
      } else {
        // 숫자가 아닌 경우 "기입필요" 입력
        sheet.getRange(row, 21).setValue("기입필요");
        sheet.getRange(row, 22).setValue("기입필요");
      }

      // 가격 정보 계산 로직
      calculateAndSetPrice(sheet, row);
    } else {
      // 체크 해제시 값 지우기
      sheet.getRange(row, 21).setValue('');
      sheet.getRange(row, 22).setValue('');
      sheet.getRange(row, 23).setValue('');
    }
  }
}

function calculateAndSetPrice(sheet, row) {
  // 각 열의 값들을 가져오기
  // 10번째 열부터 9개의 열을 가져오기(J열 ~ R열)
  const values = sheet.getRange(row, 10, 1, 9).getValues()[0];
  let [couple_profile, group_profile, 
        individual_1st, individual_1st_hm, 
        individual_2nd, individual_2nd_hm,
        individual_3rd, individual_3rd_hm,
        individual_more_4] = values;

  // 가격 계산
  let priceText = "";
  
  // individual_more_4가 0이 아닌 경우 처리
  if (individual_more_4 !== 0) {
    sheet.getRange(row, 23).setValue("기입 필요");
    return;
  }

  let totalPrice = 0;  // 총액을 저장할 변수

  // Couple Profile 가격
  if (typeof couple_profile !== 'number') {
    couple_profile = false;
  }
  if (couple_profile) {
    const couplePrice = {1: 340000, 2: 490000, 3: 640000}[couple_profile];
    if (couplePrice) {
      totalPrice += couplePrice;
      priceText += `※ Shooting fee for Couple Profile: KRW ${couplePrice}\n\n`;
    }
  }

  // Group Profile 가격
  if (typeof group_profile !== 'number') {
    group_profile = false;
  }
  if (group_profile) {
    const groupPrice = {1: 400000, 2: 590000, 3: 790000}[group_profile];
    if (groupPrice) {
      totalPrice += groupPrice;
      priceText += `※ Shooting fee for Group Profile: KRW ${groupPrice}\n\n`;
    }
  }

  // Individual Profile 1st
  if (typeof individual_1st !== 'number') {
    individual_1st = false;
  }
  if (individual_1st && individual_1st !== 0) {
    const ind1Price = {1: 240000, 2: 340000, 3: 440000}[individual_1st];
    if (ind1Price) {
      totalPrice += ind1Price;
      priceText += `※ Shooting fee for Individual Profile 1st: KRW ${ind1Price}\n`;
      if (individual_1st_hm === "Yes") {
        const hmPrice = {1: 110000, 2: 132000, 3: 154000}[individual_1st];
        if (hmPrice) {
          totalPrice += hmPrice;
          priceText += `※ The fee for Hair & Makeup 1st: KRW ${hmPrice}\n`;
        }
      }
      priceText += "\n";
    }
  }

  // Individual Profile 2nd
  if (typeof individual_2nd !== 'number') {
    individual_2nd = false;
  }
  if (individual_2nd && individual_2nd !== 0) {
    const ind2Price = {1: 240000, 2: 340000, 3: 440000}[individual_2nd];
    if (ind2Price) {
      totalPrice += ind2Price;
      priceText += `※ Shooting fee for Individual Profile 2nd: KRW ${ind2Price}\n`;
      if (individual_2nd_hm === "Yes") {
        const hmPrice = {1: 110000, 2: 132000, 3: 154000}[individual_2nd];
        if (hmPrice) {
          totalPrice += hmPrice;
          priceText += `※ The fee for Hair & Makeup 2nd: KRW ${hmPrice}\n`;
        }
      }
      priceText += "\n";
    }
  }

  // Individual Profile 3rd
  if (typeof individual_3rd !== 'number') {
    individual_3rd = false;
  }
  if (individual_3rd && individual_3rd !== 0) {
    const ind3Price = {1: 240000, 2: 340000, 3: 440000}[individual_3rd];
    if (ind3Price) {
      totalPrice += ind3Price;
      priceText += `※ Shooting fee for Individual Profile 3rd: KRW ${ind3Price}\n`;
      if (individual_3rd_hm === "Yes") {
        const hmPrice = {1: 110000, 2: 132000, 3: 154000}[individual_3rd];
        if (hmPrice) {
          totalPrice += hmPrice;
          priceText += `※ The fee for Hair & Makeup 3rd: KRW ${hmPrice}\n`;
        }
      }
      priceText += "\n";
    }
  }

  // 총액 추가
  priceText += `\n※ Total Price: KRW ${totalPrice.toLocaleString()}`;

  // W열(23번째 열)에 결과 입력
  sheet.getRange(row, 23).setValue(priceText.trim());
}


