//==========================database========================

/*
The code is written bottom up
each error callback is separate for easy debugging and error messages
*/
var db;
var username;
var email;

  function querySuccess(tx, results) {
  var len = results.rows.length;
        console.log("myDB table: " + len + " rows found.");
        for (var i=0; i<len; i++){
            console.log("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data);
        }
}


function logging(tx){
alert("logging");
tx.executeSql('SELECT * FROM myDB', [], querySuccess, errorSelect);//this works
}

//on click select query separate form submit button
$("#logit").click(function(){
  alert("logit");
   db.transaction(logging, errorTrans);
});



function errorSelect(err){
alert("SELECT "+err.message);
}

function insertSuccess(){
  alert("inserted");
   tx.executeSql('SELECT * FROM myDB', [], querySuccess, errorSelect);//this doesnot work
}
function queryDB(tx) {//called by formsent() on succes of transaction() method
  alert("queryDB called");
	username=$("#username").val();
	email=$("#email").val();

	var sql='INSERT INTO myDB (id,data) VALUES(?,?)';
   tx.executeSql(sql, [username,email], insertSuccess, errorInsert);
}
function errorInsert(err){//error for the insert
alert("Insert "+err.message);
}



function formSent(){//fired when form is submited
  alert("formSent called");
 db.transaction(queryDB, errorTrans);
 return false;
}
function errorTrans(err){ //error for formsent
alert("formsent "+err.message+"|"+err.code);//error is generated here
}


function createSuccess(){//just alerts on success
alert("DB Created");
}

function populateDB(tx) {//transaction obj is passed. Table Created not populated
  alert("populateDB called");
   tx.executeSql('CREATE TABLE IF NOT EXISTS myDB (id , data)');
}

function onDeviceReady(){
 db= window.openDatabase("Database", "1.0", "Display Name", 4*1024*1024);
 db.transaction(populateDB, createERR, createSuccess);

}
function createERR(err){//error for create
alert("Create "+err.message);
}


function backCall(e){
 e.preventDefault();
$.mobile.changePage("#index");
}

 function domLoaded(){
 document.addEventListener("backbutton", backCall, false);
 document.addEventListener("deviceready", onDeviceReady, false);
}

