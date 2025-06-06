$(document).ready(function() {
//section 1

//create a JavaScript object that contains key/value pairs
var beer = {color: "hazy", type: "Mango", role: "emotional Support"}
$('#s1q1').text("my beer is: " + beer.color + " tastes like " + beer.type + " and provides " + beer.role)
//convert a JavaScript object to a string
var beerString = JSON.stringify(beer);
$('#s1q2').text("I have converted my beer data to a string: "+beerString);

//Q3: convert a JSON encoded string to a JavaScript object
var beerObject = JSON.parse(beerString);
$('#s1q3').text(beerObject.color);


//section 2

//1: create an ES6 asynchronous function
let asyncPractice = async () => {
    console.log('Calling Async function ES6 style');
    $('#s2q1').text("This text brought to you by an ES6 asycrounous function");
 //2. use the await keyword to pause synchronous execution
    let waiting = await "This text was waited for, pretty cool";
    $('#s2q2').text(waiting);

}
asyncPractice();




//3. use fetch() to retrieve data from a URL

//4. convert JSON encoded data to a JavaScript object using built in .json() function of the response Promise object.
$('#catFacts').click(function(){//it is not catfacts but this makes both files work so idk live with it future cam
    fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    .then(data => {

        console.table(data);//boring data but oh well
        console.log(data);

        $('#s2q3').text(data.userId + data.id + data.title + data.completed);
        let strung = JSON.stringify(data);
        let jsObject = JSON.parse(strung);

        $('#s2q4').text(jsObject.userId);

        for (const [key, value] of Object.entries(data)) {
            $('#s2q6').text(key + ", " + value);
        }

    })
})

    //5. to iterate over the decoded data using a for-of loop


//6. attach a vanilla JS event listener to the window load event. done at line 1



//section 3
//1. selecting elements using the jQuery object (not document.querySelector())




    




















})












