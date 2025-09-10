

$(document).ready(function() {


console.log("before fetch");
fetch("https://d80t87hm.usw2.devtunnels.ms:3000/posts")//json FETCH from laptop
            
                .then((response) => response.json())
                .then((json) => {

                  stringData = JSON.stringify(json);
                  parseData = JSON.parse(stringData);

                          $("#rightColumn").on("click", "#deleteTask", function(){

                          $(this).parent().parent().remove();
                          uniqueKey = $(this).children().text();

                            $.each(json, function(idx, obj) {
                              console.log(obj.title + ' ' + uniqueKey);

                              titleString = JSON.stringify(obj.title)
                              if (titleString === uniqueKey) {
                                console.log(obj.id);
                                console.log("Match!" + uniqueKey)
                                const nameChange = {
                                  title: "DELETED"
                                }

                                    // fetch("https://0xq922d3.usw2.devtunnels.ms:3000/posts/" + obj.id, {//this will delete the data, leaving here for learning
                                    //   method: "DELETE",
                                      
                                    //     })
                                    //     .then(res => res.text())
                                    //     .then(res => console.log(res))

                                    fetch("https://d80t87hm.usw2.devtunnels.ms:3000/posts/" + obj.id, {//this changes the "randomNum" to "DELETED" so it no longer loads
                                      method: "PUT",
                                      body: JSON.stringify(nameChange)
                                      
                                        })
                                        .then(res => res.text())
                                        .then(res => console.log(res))
                                    

                                                      }//end of if statement
                                              }) //end of each statement
                      })//end of click on delete button function   

                  $.each(json, function(idx, obj) {//loop looks at all the saved tasks and adds all the valid ones to the task list
                    console.log(obj.id)
                    
                    
                  if ($.isNumeric(obj.title)) {//this loop adds all the tasks
                        $("#rightColumn").append(`<div class="card sortable-item"">
                          <div class="card-body" id="taskCard">
                            <h5 class="card-title"  id="taskName">`+ obj.id +`</h5>
                            <h6 class="card-title" id="dueDate">DUE: `+ obj.dueDate +`</h6>
                            <p class="card-text" id="deleteTask">DELETE<label style="display: none;">`+ obj.title +`</label></p>
                          </div>`);
                      } else if (obj.title === "DELETED") {//this code just displays how many tasks are DELETED
                        completed = $("#completedNumber").text();//code doesnt account for other reasons i deleted them but shhh
                        completed = Number(completed);
                        completed = completed + 1;
                        $("#completedNumber").text(completed);
                        console.log(completed);

                      }
                    
                  

                      
                    
                  })
                  console.table(parseData);
                  console.log



                }           
              );

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

$("#addClass").click(function() {//task adder both to site and JSON
    console.log("click happening");
    let taskName = prompt("Enter Task Name");//name of the task
    taskName = taskName.toUpperCase();
    let dueDate = prompt("Enter due date - format: Day/Date/Time");
    


    if (taskName === null) {
        return;
    } else {
        let randomNum = Math.floor(100000000000 + Math.random() * 900000000000);//random number for key name
        console.log(randomNum);
        console.log(taskName);
        if (localStorage.getItem(randomNum) === null) {//if there is no key by that number it adds a task
    
            localStorage.setItem(randomNum, taskName);

            
    console.log("pressed");

            fetch("https://d80t87hm.usw2.devtunnels.ms:3000/posts",//json POST to laptop
            {
                method: "POST",
                body: JSON
                .stringify
                ({
                  
                  "id": taskName,
                  "title": randomNum,
                  "dueDate": dueDate,
                  "author": "Cam"

                }),
                headers: {
                  "Content-type": "application/json",
                },
              })
                .then((response) => response.json())
                .then((json) => console.log(json));     
        
    
            // $("#taskName").text(taskName);
    
            $("#rightColumn").append(`<div class="card"">
                <div class="card-body" id="taskCard">
                  <h5 class="card-title" id="taskName">`+ taskName +`</h5>
                  <h6 class="card-title" id="dueDate">DUE: `+ dueDate +`</h6>
                  <p class="card-text" id="deleteTask">DELETE<label style="display: none;">`+ randomNum +`</label></p>
                </div>`);

                
    
          } else {
            console.log("Key already exists");
          }

          
    }

    
})



$("#taskName").click(function() {
    let taskName = prompt("Enter Task Name");
    $("#taskName").text(taskName);
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
//code for textfield formatting currently useless


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

toggleNotes = () => {
  $("#class1").toggle();
  $("#class2").toggle();

}

$("#class1Click, #class1Click2").on("click", function() {
  $("#class1").show();
  $("#class2").hide();
  $("#class3").hide();
  $("#class4").hide();
  $("#class5").hide();

  $("#notesHolder").css("background-color", "rgb(87, 25, 25)");
  $("#syllabusHolder").css("background-color", "rgb(87, 25, 25)");

  // $(".ui-accordion-header.ui-state-active").css("background-color", "rgb(116, 13, 13)");
  // $(".middleColumn").css("background-color", "rgb(116, 13, 13)");

  $("#syllabus1").show();
  $("#syllabus2").hide();
  $("#syllabus3").hide();
  $("#syllabus4").hide();
  $("#syllabus5").hide();
})

$("#class2Click, #class2Click2").on("click", function() {
  $("#class1").hide();
  $("#class2").show();
  $("#class3").hide();
  $("#class4").hide();
  $("#class5").hide();

  $("#notesHolder").css("background-color", "rgb(58, 20, 83)");
  $("#syllabusHolder").css("background-color", "rgb(58, 20, 83)");

  // $(".ui-accordion-header.ui-state-active").css("background-color", "rgb(192, 83, 176)");
  // $(".middleColumn").css("background-color", "rgb(192, 83, 176)");

  $("#syllabus1").hide();
  $("#syllabus2").show();
  $("#syllabus3").hide();
  $("#syllabus4").hide();
  $("#syllabus5").hide();

})

$("#class3Click, #class3Click2").on("click", function() {
  $("#class1").hide();
  $("#class2").hide();
  $("#class3").show();
  $("#class4").hide();
  $("#class5").hide();

  $("#notesHolder").css("background-color", "rgb(21, 72, 30)");
  $("#syllabusHolder").css("background-color", "rgb(21, 72, 30)");

  // $(".ui-accordion-header.ui-state-active").css("background-color", "rgb(59, 132, 149)");
  // $(".middleColumn").css("background-color", "rgb(59, 132, 149)");

  $("#syllabus1").hide();
  $("#syllabus2").hide();
  $("#syllabus3").show();
  $("#syllabus4").hide();
  $("#syllabus5").hide();

})

$("#class4Click, #class4Click2").on("click", function() {
  $("#class1").hide();
  $("#class2").hide();
  $("#class3").hide();
  $("#class4").show();
  $("#class5").hide();

  $("#notesHolder").css("background-color", "rgb(24, 35, 87)");
  $("#syllabusHolder").css("background-color", "rgb(24, 35, 87)");

  // $(".ui-accordion-header.ui-state-active").css("background-color", "rgb(3, 101, 139)");
  // $(".middleColumn").css("background-color", "rgb(3, 101, 139)");

  $("#syllabus1").hide();
  $("#syllabus2").hide();
  $("#syllabus3").hide();
  $("#syllabus4").show();
  $("#syllabus5").hide();

})

$("#class5Click, #class5Click2").on("click", function() {
  $("#class1").hide();
  $("#class2").hide();
  $("#class3").hide();
  $("#class4").hide();
  $("#class5").show();

  $("#notesHolder").css("background-color", "rgb(109, 69, 37)");
  $("#syllabusHolder").css("background-color", "rgb(109, 69, 37)");
  // $(".ui-accordion-header.ui-state-active").css("background-color", "rgb(176, 129, 11)");
  // $(".middleColumn").css("background-color", "rgb(176, 129, 11)");

  $("#syllabus1").hide();
  $("#syllabus2").hide();
  $("#syllabus3").hide();
  $("#syllabus4").hide();
  $("#syllabus5").show();

})

// $("#gradeSubmit1").submit(function(e) {

// e.preventDefault();
  

//   val1 = $("#desc1").val();
//   val2 = $("#desc2").val();
//   val3 = $("#desc3").val();
//   val4 = $("#desc4").val();
//   val5 = $("#desc5").val();

//   $("#desc1Total").text(val1);
//   $("#desc2Total").text(val2);
//   $("#desc3Total").text(val3);
//   $("#desc4Total").text(val4);
//   $("#desc5Total").text(val5);

//   $("#desc1").addClass(val1);
//   $("#desc2").addClass(val2);
//   $("#desc3").addClass(val3);
//   $("#desc4").addClass(val4);
//   $("#desc5").addClass(val5);

// currentGrade = parseInt(val1) + parseInt(val2) + parseInt(val3) + parseInt(val4) + parseInt(val5);

//   $("#currentGrade").text(currentGrade);

//  const monthNames = ["January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December"
//   ];
//    var d = new Date();
//   var strDate = (monthNames[d.getMonth()]) + " / " + d.getDate();
//   var time = d.toLocaleTimeString();
//   var dAndt = (strDate +` / `+ time);
//   console.log(dAndt);

//   // $("#lastUpdated").text(`Last Updated: `+dAndt);

// })




$("#link, .linkD2l, .linkMyCamosun, .linkGitHub").on("mouseenter", function() {
    $(this).css('cursor','pointer');
    $(this).css("border-color","rgb(174, 115, 26)");
    $(this).css("font-color","rgb(174, 115, 26)")
    $(this).css("box-shadow","4px 4px black");
})

$("#link, .linkD2l, .linkMyCamosun, .linkGitHub").on("mouseleave", function() {
    $(this).css('cursor','pointer');
    $(this).css("border-color","white");
    $(this).css("box-shadow","0px 0px");

})

$(".smallButton").on("mouseenter", function() {
    $(this).css('cursor','pointer');
    $(this).css("border-color","rgb(174, 115, 26)");
    $(this).css("font-color","rgb(174, 115, 26)")
    $(this).css("box-shadow","4px 4px black");
})

$(".smallButton").on("mouseleave", function() {
    $(this).css('cursor','pointer');
    $(this).css("border-color","white");
    $(this).css("box-shadow","0px 0px");

})

$(".card").on("mouseenter", function() {
    $(this).css("border-color","rgb(174, 115, 26)");
})

$(".card").on("mouseleave", function() {
  $(this).css("margin-top","5px");
})

$(".linkD2l").on("click", function() {//reuseable code for all the top links
  window.open("https://online.camosun.ca/d2l/home");
})

$(".linkMyCamosun").on("click", function() {//reuseable code for all the top links
  window.open("https://colss-prod.ec.camosun.ca/Student/?hideProxyDialog=false");
})

$(".linkGitHub").on("click", function() {//reuseable code for all the top links
  window.open("https://github.com/CHUMAB");
})

$(".linkTest").on("click", function() {//reuseable code for all the top links
  window.open("https://colss-prod.ec.camosun.ca/Student/?hideProxyDialog=false");
})




})



