//promise version

function myDisplay(text){
    document.getElementById("textOne").innerHTML = text
}

// fetch("myFile.txt")
// .then((res)=>{
// return res.text()
// })
// .then((text)=>{
//     myDisplay(text)
// })

//async awaits version
async function getData(){
    let res = await fetch("myFile.txt")
    let text = await res.text()
    myDisplay(text)
}
getData()