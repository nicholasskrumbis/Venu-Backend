const User = require("../models/user");

exports.uploadCard = (req, res) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Fidel-Key", "pk_test_6831a077-74e8-4c7f-89d2-114a03b3ed94");
    
    var raw = JSON.stringify({
      "number": req.body.number,
      "expMonth": req.body.expMonth,
      "expYear": req.body.expYear,
      "countryCode": req.body.countryCode,
      "termsOfUse": req.body.termsOfUse,
      "metadata": {
        "isActive": true
      }
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://api.fidel.uk/v1/programs/8fad6519-199f-4695-a238-c2c4ea202db0/cards", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result)
        var resJson = JSON.parse(result);
        if (resJson["status"] == 400) {
          /// TODO : push card id to user "cards" field
          res.status(400).send({ data: resJson })
        } else {
          res.status(200).send({ data: resJson })
        }
      })
      .catch(error => res.status(400).send({ data: error }));
}

exports.updateCardStatus = (req, res) => {
    var myHeaders = new Headers();
    myHeaders.append("Fidel-Key", "sk_test_d6e16caa-53bb-46c3-81b7-99c1f2583686");
    myHeaders.append("Content-Type", "application/json");

    const cardid = req.params["cardid"];

    var isActive = true;
    if (req.params["status"] == "inactive")
        isActive = false;

    var raw = JSON.stringify({
      "isActive": isActive
    });

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://api.fidel.uk/v1/cards/"+cardid+"/metadata", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result)
        var resJson = JSON.parse(result);
        if (resJson["status"] == 400) {
          res.status(400).send({ data: resJson })
        } else {
          res.status(200).send({ data: resJson })
        }
      })
      .catch(error => res.status(400).send({ data: error }));
}

exports.isActive = (req, res) => {
    var myHeaders = new Headers();
    myHeaders.append("Fidel-Key", "pk_test_6831a077-74e8-4c7f-89d2-114a03b3ed94");

    const cardid = req.params["cardid"];

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://api.fidel.uk/v1/cards/"+cardid, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result)
        var resJson = JSON.parse(result);
        if (resJson["status"] == 400) {
          res.status(400).send({ data: resJson })
        } else {
          if (resJson.items?.metadata?.isActive) {
            res.status(200).send({ data: { "isActive": true } })
          } else {
            res.status(200).send({ data: { "isActive": false } })
          }
        }
      })
      .catch(error => {
        console.log(error);
        res.status(400).send({ data: error })
    });
}