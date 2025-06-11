

$(document).ready(function() {

  // $(function() {
  //   $("#accordion").accordion();
  // });





console.log(localStorage.getItem("task"));

var savedTasks = {...localStorage};

console.table(savedTasks);

for (var i = 0; i < localStorage.length; i++){

    const key = localStorage.key(i);
    const value = localStorage.getItem(key)

    if ($.isNumeric(key)) {
      $("#rightColumn").append(`<div class="card" style="width: 18rem;">
        <div class="card-body" id="taskCard">
          <h5 class="card-title"  id="taskName">`+ value +`</h5>
          <p class="card-text `+ key +`" id="deleteTask">DELETE<label style="display: none;">`+ key +`</label></p>
        </div>`);
    } else {

      $("#week"+ value +"").append(

        `<div id="note" class="col-2"><h5>`+ key +`</h5><p> overview text will go here </p></div>`
      
       );
 
    }


}





// makeCollapsibles();
$("#addClass").on("mouseenter", function() {
    $(this).css("background-color","green");
    $(this).css('cursor','pointer');
});

$("#addClass").on("mouseleave", function() {
    $(this).css("background-color","rgb(12, 47, 47)");
});

$("#rightColumn").on("mouseenter", "#deleteTask", function() {
    $(this).css("background-color","red");
    $(this).css('cursor','pointer');
});

$("#rightColumn").on("mouseleave", "#deleteTask", function() {
    $(this).css("background-color","rgb(85, 11, 11)");
});

$("body").on("mouseenter", "p#deleteTask", function() {
  $(this).css("background-color","red");
  $(this).css('cursor','pointer');
});

$("body").on("mouseleave", "p#deleteTask", function() {
  $(this).css("background-color","rgb(85, 11, 11)");
});

$(".card").on("mouseenter", function() {
    $(this).css('cursor','pointer');
});

$(".card").on("mouseleave", function() {
    
});

$("#addClass").click(function() {
    console.log("click happening");
    let taskName = prompt("Enter Task Name");//name of the task
    taskName = taskName.toUpperCase();


    if (taskName === null) {
        return;
    } else {
        let randomNum = Math.floor(100000000000 + Math.random() * 900000000000);//random number for key name
        console.log(randomNum);
        console.log(taskName);
        if (localStorage.getItem(randomNum) === null) {//if there is no key by that number it adds a task
    
            localStorage.setItem(randomNum, taskName);
    
            // $("#taskName").text(taskName);
    
            $("#rightColumn").append(`<div class="card" style="width: 18rem;">
                <div class="card-body" id="taskCard">
                  <h5 class="card-title"  id="taskName">`+ taskName +`</h5>
                  <p class="card-text" id="deleteTask">DELETE<label style="display: none;">`+ randomNum +`</label></p>
                </div>`);
    
          } else {
            console.log("Key already exists");
          }
    let req = new XMLHttpRequest();

          req.open("POST", "https://turquoise-jeniffer-59.tiiny.site/json/SaveData", true);
          console.log(1);
          req.setRequestHeader('Content-Type', 'application/json');
          req.send('{"sample": "Hello World"}');

    }

    
})



$("#taskName").click(function() {
    let taskName = prompt("Enter Task Name");
    $("#taskName").text(taskName);
})


$("#rightColumn").on("click", "#deleteTask", function(){

    $(this).parent().parent().remove();
    uniqueKey = $(this).children().text();
    console.log(uniqueKey);
    localStorage.removeItem(uniqueKey);
})

$("body").on("click", "p#deleteTask", function(){

  $(this).parent().remove();
  uniqueKey = $(this).children().text();
  console.log(uniqueKey);
  localStorage.removeItem(uniqueKey);
})


$("#notesAdd1").on("click", function() {
  console.log("notes1");
})

$("#noteSubmit").on("click", function() {
  var noteName = $("#notesName").val();
  var week = $("#week option:selected").text();

  // const monthNames = ["January", "February", "March", "April", "May", "June",
  //   "July", "August", "September", "October", "November", "December"
  // ];

  console.log(noteName + week);

  // var d = new Date();
  // var strDate = (monthNames[d.getMonth()]) + " / " + d.getDate();
  // var time = d.toLocaleTimeString();
  // var dAndt = (strDate +` / `+ time);

  // $("#notes1Storage").append(`<button type="button" class="collapsible">`+dAndt+`</button>
  //       <div class="content" id="noteContent">
  //       <h4>`+strDate+`</h4>` +`<br>`+ `<p>`+note+`</p>` + 
  //       `<p class="card-text `+ dAndt +` " id="deleteTask">DELETE<label style="display: none;">`+ dAndt +`</label></p>`+ `<br>
  //       </div>`);


 localStorage.setItem(noteName, week);

// console.log("ba ba ba");

})

$("#noteSubmit").on("click", function() {
 
noteName = $("#notesName").val();
overview = $("#contentOverview").val();
fullNote = $(".textField").val();
console.log(fullNote)
$("#week2").append(

  `<div id="note" class="col-2"><h5>`+ noteName +`</h5><p>`+ overview +`</p></div>`

 );
console.table($("#noteForm").serializeArray());
 

 $("#notePaste").text($(".textField").val());

})





$("body").on("mouseenter", "#note", function(){
  $(this).css("background-color","rgb(28, 89, 158)");
    $(this).css('cursor','pointer');
})

$("body").on("mouseleave", "#note", function(){
  $(this).css("background-color","orangered");
})

$("body").on("click", "#note", function() {
 // $("#notesPage").toggle();
})


const editing = document.getElementsByClassName('textField');

// editing.addEventListener('keydown', function (event) {
//       console.log("typing");
//       if (event.key === 'Enter') {
//       }
// })

$(".textField").on("keydown", function(event) {
  if (event.keyCode == 13) {

    const editing = document.getElementById('editor');

    var looksLikeBullet = (text, caretPos) => {
      let line = text.substring(0, caretPos).split(/\r?\n|\r/).pop();
      let numberedListRegex = /^[ \t]*(\d+\.\s*).*/gim;
      let bulletRegex = /^([ \t]*[\*\-\+]\s*).*/gim;

      if (bulletRegex.test(line)) {
          return {
              bullet: line.replace(bulletRegex, '$1')
          };
        } else if (numberedListRegex.test(line)) {
          return {
              bullet: line
                      .replace(numberedListRegex, "$1")
                      .replace(/\d+/, (number) => +number + 1)
                      
          }
      }
      return false;
          
    
    }



    let bullet = looksLikeBullet(editing.value, editing.selectionStart);
    if (bullet) {
        // Prevent the newline from being added:
      event.preventDefault();
      // Store the text after the cursor, so it can be added to the next line:
      let addition = editing.value.substring(editing.selectionStart);
      // Remove the text after the cursor:
      editing.value = editing.value.substring(0, editing.selectionStart);
      // Insert the bullet in the textarea
      editing.value += ('\n' + bullet.bullet + addition);

    }

    

  }
})









const list = document.querySelector('.sortable-list');
  let draggingItem = null;

  list.addEventListener('dragstart', (e) => {
    draggingItem = e.target;
    e.target.classList.add('dragging');
  });

  list.addEventListener('dragend', (e) => {
    e.target.classList.remove('dragging');
    document.querySelectorAll('.sortable-item').forEach(item => item.classList.remove('over'));
    draggingItem = null;
  });

  list.addEventListener('dragover', (e) => {
    e.preventDefault();
    const draggingOverItem = getDragAfterElement(list, e.clientY);

    // Remove .over from all items
    document.querySelectorAll('.sortable-item').forEach(item => item.classList.remove('over'));

    if (draggingOverItem) {
      draggingOverItem.classList.add('over'); // Add .over to the hovered item
      list.insertBefore(draggingItem, draggingOverItem);
    } else {
      list.appendChild(draggingItem); // Append to the end if no item below
    }
  });

  function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.sortable-item:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }
})