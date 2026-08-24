// toggle user input button Id = btn
// create new user button Id = btn2
//edit user button Id = btn3
//delete user button Id = btn4

/**
 * input one id = inptId
 * input two id = inpt1
 * input three id = inpt2
 * input four id = inpt3
 */

$(document).ready(() => {
    // hide section 2
    $("#section2").hide()
    // hide section 3
    $("#section3").hide()

    //toggle between login and signup
    $("#sgn").click(()=>{
        $("#section2").show()
        $("#section1").hide()
    })
    $("#lgn").click(()=>{
        $("#section1").show()
        $("#section2").hide()
    })
    $("#form-section").hide()//hides inputs fields
    $("#btn").click(()=>{
        $("#form-section").toggle()//toggle inputs fields
    })
   
})


// clearing input fields

function clearField(){
    const input1 = document.getElementById("inpt1").value = ""
    const input2 = document.getElementById("inpt2").value = ""
    const input3 = document.getElementById("inpt3").value = ""

}

// populate table cells with data from the localstorage


function readData(){
    const table_data = document.getElementById("tableData")
    const rawData = localStorage.getItem("object"); 
    const userList = JSON.parse(rawData) || [];

   
    let elements = " "
    userList.map(record => {
        elements += `<tr>
        <td>${record.id}</td>
        <td>${record.name}</td>
        <td>${record.email}</td>
        <td>${record.telephone}</td>
        <td>
        <button onclick={editUser(${record.id})}
        style="
        cursor: pointer; 
        width: 5rem; 
        border-radius: 3px; 
        background-color: green; 
        color: white; 
        border: none; 
        padding: 5px;" 
        id="btn2">edit</button></td>
        <td><button onclick={deleteUser(${record.id})} style="cursor: pointer; width: 5rem; border-radius: 3px; background-color: red; color: white; border: none; padding: 5px;" id="btn4">delete</button></td> 
        </tr>`
    })
    table_data.innerHTML = elements
}


// creating a new user

function creatUser(){
const input1 = document.getElementById("inpt1").value
const input2 = document.getElementById("inpt2").value
const input3 = document.getElementById("inpt3").value

if(input1 === "" || input2 === "" || input3 === ""){
    alert("all input fields must be filled")
}else{
  
//creat user
    let dataList = JSON.parse(localStorage.getItem("object")) || [];
    
    //user id generated
    let nextId = 1; 
        if (dataList.length > 0) {
            // Find the highest ID currently in the list, then add 1
            const highestId = Math.max(...dataList.map(user => user.id));
            nextId = highestId + 1;
        }

    const user = {
        id: nextId,
        name: input1,
        email: input2,
        telephone: input3
    }

    dataList.push(user)

    localStorage.setItem("object", JSON.stringify(dataList))
    
   }

}


const btn2 = document.getElementById("btn2")

btn2.addEventListener("click", () => {
const currentEditId = document.getElementById("inptId").value;

    
if(currentEditId){
  
    saveUpdate(currentEditId)
    document.getElementById("inptId").value = "";
    document.getElementById("btn2").textContent = "Create";
}else{
    creatUser()
}
   
readData()
clearField()

})





let itemList = JSON.parse(localStorage.getItem("object")) || [];

function editUser(id) {
    // 1. Reveal your form section
    document.getElementById("form-section").style.display = "block";
    
    // 2. Extract database items
    
    // 3. Find target user. Convert 'id' to a Number if your IDs are numeric sequential!
    let obj = itemList.find(rec => rec.id === Number(id));
    
    if (!obj) return console.error("User not found!");

    // 4. Send the existing data values straight to your HTML fields
    document.getElementById("inptId").value = obj.id; // Crucial hidden tracking ID field!
    document.getElementById("inpt1").value = obj.name;
    document.getElementById("inpt2").value = obj.email;
    document.getElementById("inpt3").value = obj.telephone;
    
    // 5. Switch button text UI indicator
    document.getElementById("btn2").textContent = "Update";
}

//update function

function saveUpdate(editId) {
    // let itemList = JSON.parse(localStorage.getItem("object")) || [];
    
    // Find the structural position inside your database array
    const index = itemList.findIndex(rec => rec.id === Number(editId));
    
    if (index !== -1) {
        // Overwrite the old item with fresh data from the inputs while preserving structural object keys
        itemList[index] = {
            id: Number(editId),
            name: document.getElementById("inpt1").value,
            email: document.getElementById("inpt2").value,
            telephone: document.getElementById("inpt3").value
        };
        
        // Save the modified array directly back into LocalStorage database!
        localStorage.setItem("object", JSON.stringify(itemList));
    }
}

//delete function

function deleteUser(id){
    let listItem = JSON.parse(localStorage.getItem("object")) || [];
     listItem = listItem.filter(rec => rec.id !== Number(id))
     localStorage.setItem("object", JSON.stringify(listItem))
     readData()

}