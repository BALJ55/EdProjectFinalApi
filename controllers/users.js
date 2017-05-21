var express = require('express')
  , router = express.Router();


//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------

var firebase = require("firebase");
firebase.initializeApp({
  serviceAccount: "eSalud-534df159e7ce.json",
  databaseURL: "https://esalud-f8523.firebaseio.com/"
});


// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = firebase.database();
var ref = db.ref("restricted_access/secret_document");
ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});

var usersRef = ref.child("Data");
var setData=function(arg,date,DiagnosticStr,id){
	if(arg){
		usersRef.set({
  		id: {
    		date: date,
    		DiagnosticStr: DiagnosticStr
  		}
		});
		return "Error al ingresar";
	}else{
		return "Query con datos ingresados exitoso";
	}
}


//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------

router.post('/', function(req,res){
	if(!req.body.id){
		return res.json({
			msj:'error',
			error:true
		});
	}
	var result=setData(true,req.body.date,req.body.DiagnosticStr,req.body.id);
	return res.json({
		success: result
	})

});


module.exports = router;