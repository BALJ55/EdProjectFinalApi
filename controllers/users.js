var express = require('express')
  , router = express.Router();


//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------


var admin = require("firebase-admin");

// Fetch the service account key JSON file contents
var serviceAccount = require("./esalud-f8523-firebase-adminsdk-3yp2o-ec3ef26e7e.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://esalud-f8523.firebaseio.com/"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();
var ref = db.ref("/Data");
ref.once("value", function(snapshot) {
  //console.log(snapshot.val());
});



var request = require('request');


//CREAR REGISTRO EN LA DB CON EL STRING INGRESADO
var setData=function(arg,date,DiagnosticStr,id){
	
	var usersRef = ref.child(id);
	global.Diagnostico=[];
	var test=request.get('http://uvgproyectos.esaludgt.org/web/Api/Codigos?diagnostico='+DiagnosticStr,function (error, response, body) {
  	      if (!error && response.statusCode == 200) {
							var response=body;
							usersRef.set({
								ConsultaData: {
								Date: date,
								cie10:"Lorem Ipsum",
								Diagnostico: JSON.parse(body)
					
							}
						});
        	}
    	}
	);
	console.log(test.response);	
	
	//console.log("global: "+global.Diagnostico+" end");
	
	/*
	if(arg){
		usersRef.set({
  		ConsultaData: {
    		Date: date,
				cie10:"Lorem Ipsum",
    		Diagnostico: DiagnosticoK,
				
  		}
		});
		return "Query con datos ingresados exitoso";
	}else{
		return "Error";
	}
	*/
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