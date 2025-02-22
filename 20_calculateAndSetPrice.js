function calculateAndSetPrice(sheet, row, PRICE_KO_COLUMN, PRICE_EN_COLUMN, couple_profile, group_profile, 
  individual_1st, individual_1st_hm, 
  individual_2nd, individual_2nd_hm,
  individual_3rd, individual_3rd_hm,
  individual_more_4,numberOfPeople) {
    // 각 열의 값들을 가져오기
    // 10번째 열부터 9개의 열을 가져오기(J열 ~ R열)
    Logger.log("calculateAndSetPrice 함수 실행됨");
    // const values = sheet.getRange(row, 11, 1, 9).getValues()[0];
    // let [couple_profile, group_profile, 
    //       individual_1st, individual_1st_hm, 
    //       individual_2nd, individual_2nd_hm,
    //       individual_3rd, individual_3rd_hm,
    //       individual_more_4] = values;
    // const numberOfPeople = sheet.getRange(row, 10).getValue();
  
    // 가격 계산
    let priceText = "";
    let ko_priceText = "";
    
    // individual_more_4가 비어있지 않은 경우 처리
    if (individual_more_4 !== "") {
      sheet.getRange(row, PRICE_KO_COLUMN).setValue("기입 필요");
      sheet.getRange(row, PRICE_EN_COLUMN).setValue("기입 필요");
      return;
    }
  
    let totalPrice = 0;  // 총액을 저장할 변수
  
    // Couple Profile 가격
    if (typeof couple_profile !== 'number') {
      couple_profile = false;
    }
    if (individual_1st >= 1 && individual_2nd >= 1 && numberOfPeople === 2 && couple_profile >= 1) {
        const couplePrice = {1: 238000, 2: 343000, 3: 448000}[couple_profile];
        totalPrice += couplePrice;
        ko_priceText += `※ 커플 프로필 촬영 비용: ${couplePrice.toLocaleString()}원 &#128522;30% 할인 적용\n`;
        priceText += `※ Shooting fee for Couple Profile: KRW ${couplePrice.toLocaleString()} &#128522;30% discount applied\n\n`;
    }
    else if (individual_1st >= 1 && individual_2nd >= 1 && individual_3rd >= 1 && numberOfPeople === 3 && couple_profile >= 1) {
        const couplePrice = {1: 238000, 2: 343000, 3: 448000}[couple_profile];
        totalPrice += couplePrice;
        ko_priceText += `※ 커플 프로필 촬영 비용: ${couplePrice.toLocaleString()}원 &#128522;30% 할인 적용\n\n`;
        priceText += `※ Shooting fee for Couple Profile: KRW ${couplePrice.toLocaleString()} &#128522;30% discount applied\n\n`;
    }
    else if (couple_profile) {
        const couplePrice = {1: 340000, 2: 490000, 3: 640000}[couple_profile];
        if (couplePrice) {
            totalPrice += couplePrice;
            ko_priceText += `※ 커플 프로필 촬영 비용: ${couplePrice.toLocaleString()}원\n\n`;
            priceText += `※ Shooting fee for Couple Profile: KRW ${couplePrice.toLocaleString()}\n\n`;
        }
    }
  
    // Group Profile 가격
    if (typeof group_profile !== 'number') {
      group_profile = false;
    }
    if (individual_1st >= 1 && individual_2nd >= 1 && individual_3rd >= 1 && numberOfPeople === 3 && group_profile >= 1) {
        const groupPrice = {1: 280000, 2: 413000, 3: 553000}[group_profile];
        totalPrice += groupPrice;
        ko_priceText += `※ 그룹 프로필 촬영 비용: ${groupPrice.toLocaleString()}원 &#128522;30% 할인 적용\n\n`;
        priceText += `※ Shooting fee for Group Profile: KRW ${groupPrice.toLocaleString()} &#128522;30% discount applied\n\n`;
    }
    else if (group_profile) {
      const groupPrice = {1: 400000, 2: 590000, 3: 790000}[group_profile];
      if (groupPrice) {
        totalPrice += groupPrice;
        ko_priceText += `※ 그룹 프로필 촬영 비용: ${groupPrice.toLocaleString()}원\n\n`;
        priceText += `※ Shooting fee for Group Profile: KRW ${groupPrice.toLocaleString()}\n\n`;
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
        ko_priceText += `※ 개인 프로필 첫번째 고객 촬영 비용: ${ind1Price.toLocaleString()}원\n`;
        priceText += `※ Shooting fee for Individual Profile 1st: KRW ${ind1Price.toLocaleString()}\n`;
        if (individual_1st_hm === "Yes") {
          const hmPrice = {1: 110000, 2: 132000, 3: 154000}[individual_1st];
          if (hmPrice) {
            totalPrice += hmPrice;
            ko_priceText += `※ 첫번째 고객 헤어메이크업 비용: ${hmPrice.toLocaleString()}원\n`;
            priceText += `※ The fee for Hair & Makeup 1st: KRW ${hmPrice.toLocaleString()}\n`;
          }
        }
        ko_priceText += "\n";
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
        ko_priceText += `※ 개인 프로필 두번째 고객 촬영 비용: ${ind2Price.toLocaleString()}원\n`;
        priceText += `※ Shooting fee for Individual Profile 2nd: KRW ${ind2Price.toLocaleString()}\n`;
        if (individual_2nd_hm === "Yes") {
          const hmPrice = {1: 110000, 2: 132000, 3: 154000}[individual_2nd];
          if (hmPrice) {
            totalPrice += hmPrice;
            ko_priceText += `※ 두번째 고객 헤어메이크업 비용: ${hmPrice.toLocaleString()}원\n`;
            priceText += `※ The fee for Hair & Makeup 2nd: KRW ${hmPrice.toLocaleString()}\n`;
          }
        }
        ko_priceText += "\n";
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
        ko_priceText += `※ 개인 프로필 세번째 고객 촬영 비용: ${ind3Price.toLocaleString()}원\n`;
        priceText += `※ Shooting fee for Individual Profile 3rd: KRW ${ind3Price.toLocaleString()}\n`;
        if (individual_3rd_hm === "Yes") {
          const hmPrice = {1: 110000, 2: 132000, 3: 154000}[individual_3rd];
          if (hmPrice) {
            totalPrice += hmPrice;
            ko_priceText += `※ 세번째 고객 헤어메이크업 비용: ${hmPrice.toLocaleString()}원\n`;
            priceText += `※ The fee for Hair & Makeup 3rd: KRW ${hmPrice.toLocaleString()}\n`;
          }
        }
        ko_priceText += "\n";
        priceText += "\n";
      }
    }
  
    // 총액 추가
    ko_priceText += `※ 총 비용: ${totalPrice.toLocaleString()}원`;
    priceText += `※ Total Price: KRW ${totalPrice.toLocaleString()}`;
  
    // X열에 한글 가격 텍스트, Y열에 영어 가격 텍스트 입력
    sheet.getRange(row, PRICE_KO_COLUMN).setValue(ko_priceText.trim());
    sheet.getRange(row, PRICE_EN_COLUMN).setValue(priceText.trim());
  }