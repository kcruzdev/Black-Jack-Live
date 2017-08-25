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
          res.render("login");
        }else{
          res.render("game")
        }
      })
      });

    //POST route for creating a new account
    app.post("/", function(req, res) {
      console.log(req.body);
      db.blackjack.create({
        name: req.body.name,
        password: req.body.password,
        bank: 500 
      }).then(function(dbblackjack) {
        res.redirect("/game");
      });
    });

//////////////////////////////////////////////////////////////////////////////


     //GET route to show the game
     app.get("/game", function(req,res){
      res.render("game");
       });

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