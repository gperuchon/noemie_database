/* globals firebase */

var Config = {
  apiKey: "AIzaSyDDE7IMvsvBYhgA0LAln4OIcUs7sYU5-e8",
  authDomain: "gorgeous-six-triceratops.firebaseapp.com",
  databaseURL: "https://gorgeous-six-triceratops.firebaseio.com",
  projectId: "gorgeous-six-triceratops",
  storageBucket: "gorgeous-six-triceratops.appspot.com",
 // messagingSenderId: "895258773278",
  appId: "1:895258773278:web:d091a7d007977eb880eb0f",
 // measurementId: "G-BTSW0PV7PP"
};
// Initialize Firebase
firebase.initializeApp(Config);
firebase.analytics();

// now that firebase is initialized, we can access our DataBase:
var db = firebase.database();

// let's add data
// first we create a Reference in our database:
var testRef = db.ref("test");
// then we can set a value to this Reference:
testRef.set("Hello Firebase");
// or delete a Reference by overwriting its value to "null":
testRef.set(null);

// we can also pass JS Object:
var lovecraftRef = db.ref("lovecraft");
lovecraftRef.set({
  name: "H. P. Lovecraft",
  birthDate: "20/08/1890",
  dateOfDeath: "15/03/1937"
});

// we can also update a part of our Reference:
lovecraftRef.update({ name: "Howard Phillips Lovecraft" });
// instead of creating a new Reference: db.ref( "lovecraft/name" ).set( "Howard Phillips Lovecraft" );

// let's create a Reference
var randomRef = db.ref( "random" );

// then we set an arbitrary value to this Reference
randomRef.set( 50 );

// to retrieve our data, we can use the "Reference.on()" method
randomRef.on( "value", function( snapshot ) {
  // "snapshot" is a Snapshot of the data at the Reference
  // to get the data we need to call "snapshot.val()"
  var data = snapshot.val();
  console.log( data );
  $( "h2.noe" ).text( data ); // and we can use jQuery to modify HTML elements
} );
// the "Reference.on()" method takes 2 arguments:
// - an event type, here: "value" to get the value
// - a callback function to execute, this functions will also be called everytime this Reference is updated with new value


// To illustrate "on value" update:
$( "html" ).click( function(){
  randomRef.set( Math.floor(Math.random()* 100 )); // a random value between 0 and 100
} );
// using jQuery we add a function to execute everytime someone clicks on the page (it could be us or someone else, the data is shared among users)
// this function updates the data at the "random" Reference in our database
// and since we've been using randomRef.on( "value", ... ) its callback function set the new value in our "h1" element:
// on each click on our page, we update the value of our reference in our database
// this triggers a "value" event for our reference, that calls our callback function with a snapshot of the data
