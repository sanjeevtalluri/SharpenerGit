const posts = [];
let activityTime = null;

function updateLastUserActivityTime(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            activityTime = Date.now();
            resolve(activityTime);
        },1000)
    })
}


function createPost(post){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            posts.push(post);
            resolve(posts);
        })
    })
}

Promise.all([createPost({title:'post1'}),updateLastUserActivityTime()]).then((values)=>{
    console.log(values);
})