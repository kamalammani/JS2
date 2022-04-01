// array for maintaining employee datas
let arr = new Array();

//Handles Edit
let selectedRow = -1;
showData();

//Handles Error 
let comment = document.getElementById("error handler");
function onFormSubmit(){
    if(validate()){
       //New Entry
       comment.innerHTML = "";  
       if(selectedRow == -1){
           addData();
           setData();
           let table = document.getElementById("employeeList");
           var rowCount = table.rows.length;
           for (var i = rowCount - 1; i > 0; i--) {
           table.deleteRow(i);
           }
           comment.innerHTML = "Data Added";
         }
      else{
          //Edit Entry
          updateRow(selectedRow);
          let table = document.getElementById("employeeList");
          var rowCount = table.rows.length;
          for (var i = rowCount - 1; i > 0; i--) {
           table.deleteRow(i);
           }
          comment.innerHTML = "Data Edited";
        }
       showData();
       resetForm();
   }
}

// validates the form data
function validate(){
    isValid = true;
    let ename = document.getElementById("EnameID").value;
    let address = document.getElementById("addressID").value;
    let empid = document.getElementById("empID").value;
    let designation = document.getElementById("DesignationID").value;
    let message = document.getElementById("error handler");
 
    try{
        if((ename != null)&&(ename != "")&&(address != null)&&(address != "")&&(empid != null)&&(empid != "")&&(designation != null)&&(designation != "")){
           if(!isNaN(empid)){
               if(checkDuplicate(empid)){
                     isValid = true;
                   }
                else{
                      resetForm();
                      isValid = false;
                      throw "This Employee ID already exists";
                     }
                  }
                 else{
                         resetForm();
                         isValid = false;
                         throw "Employee ID Should be in Integer Format";
                     } 
             }
          else
             {
                resetForm();
                isValid = false; 
                throw "Details Should not be empty";
             }
          
     }
    catch(err){ 
         message.innerHTML = err;
     }

     return isValid;
}

// validates duplicates
function checkDuplicate(empid){
  getData();
  isDuplicate = true;

  for(let x=1;x<arr.length;x++){
        if(x!=selectedRow){
        if(empid == arr[x].empid){
               isDuplicate = false;
            }
        }
    }
 
  return isDuplicate; 
}


// Get data in local Storage
function getData(){
    let str = localStorage.getItem("localdata");
    if(str != null)
      {
         arr = JSON.parse(str);
      }
}

// Pushing elements in array
function addData(){
   getData();
   arr.push({
     ename:document.getElementById("EnameID").value,
     address:document.getElementById("addressID").value,
     empid:document.getElementById("empID").value,
     designation:document.getElementById("DesignationID").value
    });
   
}

// Setting data in local storage
function setData(){
   localStorage.setItem("localdata",JSON.stringify(arr));
}

// Displays data with edit and delete
function showData(){
    getData();
    let table = document.getElementById("employeeList"); 
    for(let i=0;i<arr.length;i++){
           var newRow = table.insertRow();
           cell1 = newRow.insertCell();
           cell1.innerHTML = arr[i].ename;
           cell2 = newRow.insertCell();
           cell2.innerHTML = arr[i].address;
           cell3 = newRow.insertCell();
           cell3.innerHTML = arr[i].empid;
           cell4 = newRow.insertCell();
           cell4.innerHTML = arr[i].designation;
           cell4 = newRow.insertCell();
           cell4.innerHTML = `<a href="javascript:void(0)" onclick="onEdit(${i})">Edit</a>&nbsp;<a href="javascript:void(0)" onclick="onDelete(${i})">Delete</a>`;
      }
}

//Updates the data
function updateRow(selectedRow){
    getData();
    arr[selectedRow].ename =  document.getElementById("EnameID").value;
    arr[selectedRow].address = document.getElementById("addressID").value;
    arr[selectedRow].empid = document.getElementById("empID").value;
    arr[selectedRow].designation = document.getElementById("DesignationID").value;
    setData();
}


// Edits the data
function onEdit(i) {
    comment.innerHTML = "";
    selectedRow = i;
    getData();
    document.getElementById("EnameID").value = arr[selectedRow].ename;
    document.getElementById("addressID").value = arr[selectedRow].address;
    document.getElementById("empID").value = arr[selectedRow].empid;
    document.getElementById("DesignationID").value = arr[selectedRow].designation;
}

//Resets the whole form 
function resetForm() {
   document.getElementById("formID").reset();
   selectedRow = -1;
}


//delete entry
function onDelete(i){
    
    comment.innerHTML = "";
    if (confirm('Are you sure to delete this record ?')) {
        getData();
        arr.splice(i,1);
        setData();
        let table = document.getElementById("employeeList");
        var rowCount = table.rows.length;
        for (var i = rowCount - 1; i > 0; i--) {
            table.deleteRow(i);
        }
        showData();
        resetForm();
    }
}

//Displays data without edit and delete option
function showData1(){
     let msg = document.getElementById("error handler");
     msg.innerHTML = "Kindly go to default page (Refresh) for Edit";
     let table = document.getElementById("employeeList");
       var rowCount = table.rows.length;
       for (var i = rowCount - 1; i > 0; i--) {
       table.deleteRow(i);
       }
     showData2();
}


function showData2(){
    getData();
    let table = document.getElementById("employeeList");
    for(let i=0;i<arr.length;i++){
           var newRow = table.insertRow();
           cell1 = newRow.insertCell();
           cell1.innerHTML = arr[i].ename;
           cell2 = newRow.insertCell();
           cell2.innerHTML = arr[i].address;
           cell3 = newRow.insertCell();
           cell3.innerHTML = arr[i].empid;
           cell4 = newRow.insertCell();
           cell4.innerHTML = arr[i].designation;
      }
 
}
