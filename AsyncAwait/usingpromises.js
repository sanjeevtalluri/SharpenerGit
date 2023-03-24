console.log('person1 : shows ticket');
console.log('person2 : shows ticket');
const wifePromiseToBringTickets = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('ticket');
    },3000)
});

const getPopcorn = wifePromiseToBringTickets.then((result)=>{
    console.log('Wife : Here are tickets');
    console.log('Husband : We should go in');
    console.log('Wife : I am hungry');
    return new Promise((resolve,reject)=>{
        resolve(`${result} popcorn`);
    })
})

const getButter = getPopcorn.then((result)=>{
    console.log('Husband : I got popcorn');
    console.log('Wife : I need butter on my popcorn');
    return new Promise((resolve,reject)=>{
        resolve(`${result} butter`)
    })
})

const getColdDrinks = getPopcorn.then((result)=>{
    console.log('Husband : I got butter');
    console.log('Wife : I also need colddrink');
    return new Promise((resolve,reject)=>{
        resolve(`${result} colddrink`)
    })
})

getColdDrinks.then((result)=>{
    console.log(result);
})
console.log('person4 : shows ticket');
console.log('person5 : shows ticket');