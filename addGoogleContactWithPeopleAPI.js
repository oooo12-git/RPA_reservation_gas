function addGoogleContactWithPeopleAPI(contactName, phoneNumber, emailAddress) {
    let resource = {
      "names": [
        {
          "givenName": contactName
        }
      ],
      "phoneNumbers": [
        {
          "value": phoneNumber,
          "type": "mobile"
        }
      ],
      "emailAddresses": [
        {
          "value": emailAddress,
          "type": "home"
        }
      ]
    };
    try {
        let response = People.People.createContact(resource);
        Logger.log('Contact created: ' + response);
      } catch (e) {
        Logger.log('Failed to create contact: ' + e.message);
      }
}