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



//real time validating input field password
function confirmPass(){
    let password = document.getElementById("inptFld2").value
    let repeatPassword = document.getElementById("inptFld3").value
    let conFirm = document.getElementById("confirm")
    
    if(repeatPassword === password){
        conFirm.textContent ="password match"
        conFirm.style.display = "block"
        conFirm.style.color = "green"
    }else{
        conFirm.textContent ="password do not match"
        conFirm.style.display = "block"
        conFirm.style.color = "red"
    }
}

// SIGNUP LOGIC
let signUp = document.getElementById("signup")

signUp.addEventListener("click", ()=>{
    let name = document.getElementById("inptFld").value
    let email = document.getElementById("inptFld1").value
    let repeatPass = document.getElementById("inptFld3").value

    if(name === "" || email === "" || repeatPass === ""){
         alert("all input fields must be filled")
    }else{
   
            let signUplist = JSON.parse(localStorage.getItem("user")) || []; 
           
            let nextId = 1; 
                if (signUplist.length > 0) { 
                    // Find the highest ID currently in the list, then add 1 
                    const highestId = Math.max(...signUplist.map(user => user.id)); 
                    nextId = highestId + 1; 
                } 

            const users = { 
                id: nextId, 
                name: name, 
                email: email, 
                password: repeatPass 
            };


        // 1. Check if the name already exists in the array
        const nameExists = signUplist.some(user => user.name === users.name);

        // 2. Check if the email already exists in the array
        const emailExists = signUplist.some(user => user.email === users.email);

        // 3. Run validation logic
        if (nameExists) { 
            alert("name already taken"); 
            return
        } else if (emailExists) { 
            alert("email already taken"); 
            return
        } else { 
            alert("everything good");
            // 4. Save the new user to the list and update localStorage
            signUplist.push(users)
            localStorage.setItem("user", JSON.stringify(signUplist))
            document.getElementById("section2").style.display = "block"
            document.getElementById("section1").style.display = "none"

        }
  
                document.getElementById("inptFld").value = ""
                document.getElementById("inptFld1").value = ""
                document.getElementById("inptFld2").value = ""
                document.getElementById("inptFld3").value = ""
            
        }
})  


//LOGIN LOGIC

let login = document.getElementById("login")

login.addEventListener("click", ()=>{
    let inpEmail = document.getElementById("eml").value
    let inpPass = document.getElementById("pas").value

    if(inpEmail === "" || inpPass === ""){
        alert("all inputField must be filled")
    }else{
        let logInlist = JSON.parse(localStorage.getItem("user")) || []; 

         const users = { 
                email: inpEmail, 
                password: inpPass
            };


         
            

          // 2. Check if the email already exists in the array
             const passExists = logInlist.some(user => user.email === users.email && user.password === users.password);

            if(passExists){
                const userFound = logInlist.find(user => 
        user.email === users.email && user.password === users.password
    );
                document.getElementById("HD").innerHTML = `Welcome ${userFound.name}`
                document.getElementById("section3").style.display = "block"
                document.getElementById("section2").style.display = "none"
            }else{
                alert("wrong cridentials")
                return
            }

    }

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