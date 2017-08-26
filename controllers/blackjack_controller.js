var db = require("../models");

module.exports = function(app){


  ///    /   (login page)

    //GET route to show the login page
    app.get("/", function(req,res){
    res.render("login");
      });   

    //GET route to check if player login works
    app.post("/checklogin", function(req,res){
      console.log(req.body)
      name = req.body.name;
      password = req.body.password;
      console.log("checking info below")
      console.log(req.params.name)
      db.blackjack.findOne({
        where: {name: name, password: password},
      }).then(function(dbblackjack){
        if (dbblackjack === null){
          res.json("Error wrong login info")
        }else{
          res.redirect("/game/" + name)
        }
      })
      });

    //POST route for creating a new account
    app.post("/", function(req, res) {
      name = req.body.name
      password: req.body.password

      db.blackjack.findOne({
        where: {name:  name},
      }).then(function(dbblackjack){
        if (dbblackjack === null){

          console.log(req.body);
          db.blackjack.create({
            name: req.body.name,
            password: req.body.password,
            bank: 1000.00 
          }).then(function(dbblackjack) {
            res.redirect("/game/" + name);
          });



        }else{
          res.json("Error username already exists")
        }
      })
    })





//////////////////////////////////////////////////////////////////////////////


     //GET route to show the game
     app.get("/game/:player", function(req,res){

      playerId = req.params.player; //make sure the form name has the id "player"
      db.blackjack.findOne({
        where: {name:  playerId},
      }).then(function(dbblackjack){
        if (dbblackjack === null){
          res.json("Error 404 user does not exist")
        }else{
          res.render("game");
        }
      })
       });

       app.put("/game/update/:player/:bank", function(req,res){
        console.log("update request recieved")
        name = req.params.player;
        bank = req.params.bank;
        console.log(bank)
        bank = bank.replace( /,/g, "" );
        bank = parseFloat(bank)
        db.blackjack.update({
          bank:bank
        }, {
          where: {
            name: name
          }
        }).then(function(dbTodo) {
          // res.redirect("/");
        });
      });


      app.put("/game/getbank/:player", function(req,res){
        name = req.params.player;
        db.blackjack.findOne({
          where: {name:  playerId},
        }).then(function(dbblackjack){
          console.log(dbblackjack.bank)
          res.json({money:dbblackjack.bank})
        })         
      })

//////////////////////////////////////////////////////////////////////////////

    //GET route to return the stats of the queried player
    app.get("/api/:player", function(req,res){
      playerId = req.params.player; //make sure the form name has the id "player"
      db.blackjack.findOne({
        where: {name:  playerId},
      }).then(function(dbblackjack){
        if (dbblackjack === null){
          console.log("User does not exist")
          res.json("Error 404 user does not exist")
        }else{
          console.log("Sending user json info to page")
          res.json(dbblackjack);
        }
      })
      });


  


}