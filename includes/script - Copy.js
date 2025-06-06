$(document).ready(function() {
//section 1

//create a JavaScript object that contains key/value pairs
var littleGuy = {color: "red", hobby: "skateboard", job: "emotional Support"};
$('#s1q1').text("hello, " + littleGuy.color + ' ' + littleGuy.job +" " + littleGuy.hobby);

//convert a JavaScript object to a string
var littleGuyString = JSON.stringify(littleGuy);
$('#s1q2').text(littleGuyString);

//Q3: convert a JSON encoded string to a JavaScript object//TAKE ANOTHER LOOK AT THIS

let parsedObj = JSON.parse('{"color":"red", "age": 1, "location":"skamtboard", "head":"empty"}');
$('#s1q3').text(parsedObj.color +", "+parsedObj.age +", "+ parsedObj.location + ", " + parsedObj.head);//use .age for finding key values
console.table(parsedObj);


//section 2

//1: create an ES6 asynchronous function

let asyncPractice = async () => {
    console.log("ES6 async called");
    $('#s2q1').text("ES6 async function called");
//2. use the await keyword to pause synchronous execution
    let wait = await "Waited so long for this data, it will overwrite anything outside of this await";
    $('#s2q2').text(wait);//this appears after other data
    console.log(wait);

}
console.log("This should be before the waited for data")
$('#s2q2').text("This should be before the waited for data");

asyncPractice();

//3. use fetch() to retrieve data from a URL
//4. convert JSON encoded data to a JavaScript object using built in .json() function of the response Promise object.

$('#catFacts').click(function() {
    console.log("AUHFD");

    const catFacts = async () => { 
    }
    fetch('https://catfact.ninja/fact')
        .then(response => response.json())
        .then((data) => {
    
            let objectify = JSON.stringify('data');
            let cats = data;
            console.log(cats);
            $('#s2q3').text(cats.fact); 
            JSON.parse(cats);
            $('#s2q4').text("cat fact brought to you by my working promise object pretty sure" + cats);
            
            console.table(cats);
    //5. to iterate over the decoded data using a for-of loop
            for (const fact of objectify) {
                console.log(fact);
                $('#s2q5').text(fact);
            }
    })

});

//6. attach a vanilla JS event listener to the window load event. done at line 1
$('#s2q6').text("this loads on window load");


//section 3
//1. selecting elements using the jQuery object (not document.querySelector())

$("#s3q1").text("This element has been targeted using the JQuery object. Hooray");

$(".clickEvent").click(function() {
    
    $("#s3q2").text("This text arrives when question is clicked");
})
$(".clickEvent").hover(function (){
     $(this).css('cursor','pointer');
})

var event = jQuery.Event("click");

jQuery("body").trigger(event);//IDK

$('#removeClass').click(function(){
    $('#removeClass').removeClass("bg-danger");
})

$('#addClass').click(function(){
    $('#addClass').removeClass("bg-primary");
})

$(".ifElse").hover(function() {

    console.log("hover");
    $(".ifElse").addClass("bg-warning");

    
})
    




























































































































})












