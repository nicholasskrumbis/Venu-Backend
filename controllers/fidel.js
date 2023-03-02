const User = require("../models/user");
const mongoose = require("mongoose");

exports.uploadCard = async (req, res) => {
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
        const resJson = JSON.parse(result);
        const cardId = resJson["items"][0].id;
        console.log(resJson);
        if (resJson["status"] == 201) {
            console.log("addding to userrrrrr")
            console.log(req.body.userId)
            User.update(
                { _id: mongoose.Types.ObjectId(req.body.userId) },
                { $push: { cards: cardId } },
                function(err, docs) {
                  if (err)
                    res.status(404).send({ data: err });
                  else 
                    res.status(200).send({ data: resJson })
                }
            );
        } else {      
            res.status(resJson["status"]).send({ data: resJson });   
        }
      })
      .catch(error => {
        console.log(error)
        res.status(400).send({ data: error })
      });
}

exports.updateCardStatus = (req, res) => {
    var myHeaders = new Headers();
    myHeaders.append("Fidel-Key", "sk_test_d6e16caa-53bb-46c3-81b7-99c1f2583686");
    myHeaders.append("Content-Type", "application/json");

    const cardId = req.params["cardId"];

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

    fetch("https://api.fidel.uk/v1/cards/"+cardId+"/metadata", requestOptions)
      .then(response => response.text())
      .then(result => {
        const resJson = JSON.parse(result);
        if (resJson["status"] == 200) {
          res.status(200).send({ data: resJson });
        } else {
          res.status(resJson["status"]).send({ data: resJson });
        }
      })
      .catch(error => {
        console.log(error)
        res.status(400).send({ data: error })
      });
}

exports.isActive = (req, res) => {
    var myHeaders = new Headers();
    myHeaders.append("Fidel-Key", "sk_test_d6e16caa-53bb-46c3-81b7-99c1f2583686");

    const cardId = req.params["cardId"];

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://api.fidel.uk/v1/cards/"+cardId, requestOptions)
      .then(response => response.text())
      .then(result => {
        var resJson = JSON.parse(result);
        if (resJson["status"] != 200) {
          res.status(resJson["status"]).send({ data: resJson })
        } else {
          res.status(200).send({ data: { "isActive": resJson["items"][0].metadata?.isActive } })
        }
      })
      .catch(error => {
        console.log(error)
        res.status(400).send({ data: error })
    });
}

exports.onTransaction = (req, res) => {
    const cardId = req.card.id;
    const brandId = req.brand.id;
}