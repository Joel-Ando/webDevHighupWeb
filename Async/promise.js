const post = [
    {title: "post one", body: "this is post one"},
    {title: "post two", body: "this is post two"}
]

function getPost(){
    setTimeout(() => {
        let output= " ";
        post.forEach((post, index) => {
            output += `<li>${post.title}</li>`
        });
        document.body.innerHTML = output
    }, 1000);
}

function createPost(post, callback){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
         post.push(post);

         const error = false;

         if(!error){
            resolve()
         }else{
            reject("something went wrong")
         }
        }, 2000)

    })
}

createPost({title: "post three", body: "this is post three"}).then(getPost).catch(err => console.log(err))