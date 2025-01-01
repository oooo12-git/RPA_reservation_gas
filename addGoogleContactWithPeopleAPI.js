function addGoogleContactWithPeopleAPI(contactName, phoneNumber) {
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
      ]
    };
    try {
        let response = People.People.createContact(resource);
        Logger.log('Contact created: ' + response);
      } catch (e) {
        Logger.log('Failed to create contact: ' + e.message);
      }
}