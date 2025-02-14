function sendAdjustInfoEmail(name, email, studio, driveLink) {
    Logger.log('sendAdjustInfoEmail 함수 실행됨');
    selectionFormLink = "https://docs.google.com/forms/d/e/1FAIpQLSf0rvSfGCo3QZyGcI_300Pl83dAhaxNgZaIyimKh6hXXXu4iw/viewform?usp=header"
    if (studio == "1st") {
        let subject = "보정할 사진을 선택해주세요 JP12206b 스튜디오 / Select the picture to adjust from JP12206b Studio";
        let ko_message = "안녕하세요 <span style='color: blue'>" + name + "</span>님,<br><br>" +
                  "<span style='color: red'>JP12206b Studio</span>입니다. 보정할 사진 선택을 위한 안내 드립니다.<br><br>" +
                  "1. 아래 구글 드라이브 링크에서 촬영된 사진들을 확인해주세요.<br><br>" +
                  "<a href='" + driveLink + "'>구글 드라이브 링크 클릭</a><br><br>" +
                  "2. 마음에 드시는 사진을 선택하신 후, 아래 구글 폼에서 사진 번호를 입력해주세요.<br><br>" +
                  "<a href='" + selectionFormLink + "'>구글 폼 링크 클릭</a><br><br>" +
                  "* 구글 폼 작성 시 주의사항<br>" +
                  "- 예약하실 때 사용하신 이메일을 반드시 입력해주세요.<br>" +
                  "- 사진 파일명의 번호만 입력해주세요. (예: image_1111.jpg → 1111)<br>" +
                  "- 여러 장을 선택하실 경우 번호 사이에 띄어쓰기를 해주세요. (예: 1111 1112 1113)<br><br>" +
                  "구글폼을 제출한 후 14일 내에 보정 작업을 거쳐 완성본을 전달드릴 예정입니다.<br><br>" +
                  "완벽한 보정본 전달을 위해 최선을 다하겠습니다.<br><br>" +
                  "감사합니다.<br>" +
                  "JP12206b Studio" +
                  "<br><br>------ English Version ------<br><br>";
        let en_message = "Hello <span style='color: blue'>" + name + "</span>,<br><br>" +
                  "Hello, this is <span style='color: red'>JP12206b Studio</span>. For the adjustment of the picture, please follow the instructions below.<br><br>" +
                  "1. Please check the pictures taken from the following Google Drive link.<br><br>" +
                  "<a href='" + driveLink + "'>Click here to access the Google Drive link</a><br><br>" +
                  "2. Please select the picture you like and enter the picture number in the following Google form.<br><br>" +
                  "<a href='" + selectionFormLink + "'>Click here to access the Google form</a><br><br>" +
                  "* Please note the following when filling out the Google form:<br>" +
                  "- Please enter the email you used when booking.<br>" +
                  "- Please enter only the picture number (e.g., image_1111.jpg → 1111).<br>" +
                  "- Please enter the picture numbers with spaces between them (e.g., 1111 1112 1113).<br><br>" +
                  "After submitting the Google form, we will adjust the pictures within 14 days and send you the completed pictures.<br><br>" +
                  "We will do our best to ensure the delivery of the perfect adjusted pictures.<br><br>" +
                  "Thank you.<br>" +
                  "JP12206b Studio";
        try {
            GmailApp.sendEmail(email, subject, "", {htmlBody: ko_message + en_message});
            Logger.log('Email sent: ' + ko_message + en_message);
        } catch(error) {
            Logger.log('이메일 발송 실패: ' + error.message);
        }
    }
    else if (studio == "2nd") {
            let subject = "보정할 사진을 선택해주세요 JP12839c 스튜디오 / Select the picture to adjust from JP12839c Studio";
            let ko_message = "안녕하세요 <span style='color: blue'>" + name + "</span>님,<br><br>" +
                    "<span style='color: red'>JP12839c Studio</span>입니다. 보정할 사진 선택을 위한 안내 드립니다.<br><br>" +
                    "1. 아래 구글 드라이브 링크에서 촬영된 사진들을 확인해주세요.<br><br>" +
                    "<a href='" + driveLink + "'>구글 드라이브 링크 클릭</a><br><br>" +
                    "2. 마음에 드시는 사진을 선택하신 후, 아래 구글 폼에서 사진 번호를 입력해주세요.<br><br>" +
                    "<a href='" + selectionFormLink + "'>구글 폼 링크 클릭</a><br><br>" +
                    "* 구글 폼 작성 시 주의사항<br>" +
                    "- 예약하실 때 사용하신 이메일을 반드시 입력해주세요.<br>" +
                    "- 사진 파일명의 번호만 입력해주세요. (예: image_1111.jpg → 1111)<br>" +
                    "- 여러 장을 선택하실 경우 번호 사이에 띄어쓰기를 해주세요. (예: 1111 1112 1113)<br><br>" +
                    "구글폼을 제출한 후 14일 내에 보정 작업을 거쳐 완성본을 전달드릴 예정입니다.<br><br>" +
                    "완벽한 보정본 전달을 위해 최선을 다하겠습니다.<br><br>" +
                    "감사합니다.<br>" +
                    "JP12839c Studio" +
                    "<br><br>------ English Version ------<br><br>";
            let en_message = "Hello <span style='color: blue'>" + name + "</span>,<br><br>" +
                    "Hello, this is <span style='color: red'>JP12839c Studio</span>. For the adjustment of the picture, please follow the instructions below.<br><br>" +
                    "1. Please check the pictures taken from the following Google Drive link.<br><br>" +
                    "<a href='" + driveLink + "'>Click here to access the Google Drive link</a><br><br>" +
                    "2. Please select the picture you like and enter the picture number in the following Google form.<br><br>" +
                    "<a href='" + selectionFormLink + "'>Click here to access the Google form</a><br><br>" +
                    "* Please note the following when filling out the Google form:<br>" +
                    "- Please enter the email you used when booking.<br>" +
                    "- Please enter only the picture number (e.g., image_1111.jpg → 1111).<br>" +
                    "- Please enter the picture numbers with spaces between them (e.g., 1111 1112 1113).<br><br>" +
                    "After submitting the Google form, we will adjust the pictures within 14 days and send you the completed pictures.<br><br>" +
                    "We will do our best to ensure the delivery of the perfect adjusted pictures.<br><br>" +
                    "Thank you.<br>" +
                    "JP12839c Studio";
        try {
            GmailApp.sendEmail(email, subject, "", {htmlBody: ko_message + en_message});
            Logger.log('Email sent: ' + ko_message + en_message);
        } catch(error) {
            Logger.log('이메일 발송 실패: ' + error.message);
        }
    }
}