console.log('person1 : shows ticket');
console.log('person2 : shows ticket');
const preMovie = async () => {
    const wifePromiseToBringTickets = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('ticket');
        }, 3000)
    });

    const getPopcorn = new Promise((resolve, reject) => {
        resolve('popcorn');
    });

    const getButter = new Promise((resolve, reject) => {
        resolve(`butter`)
    })

    const getColdDrinks = new Promise((resolve, reject) => {
        resolve(`colddrink`)
    })


    const ticket = await wifePromiseToBringTickets;
    console.log(`Wife : Here are tickets ${ticket}`);
    console.log('Husband : We should go in');
    console.log('Wife : I am hungry');

    const popcorn = await getPopcorn;
    console.log(`Husband : I got ${popcorn}`);
    console.log('Wife : I need butter on my popcorn');

    const butter = await getButter;
    console.log(`Husband : I got ${butter}`);
    console.log('Wife : I also need colddrink');

    const colddrink = await getColdDrinks;

    console.log(`Husband : I got ${colddrink}`);

    return ticket;
}


preMovie().then((result) => {
    console.log(result);
})
console.log('person4 : shows ticket');
console.log('person5 : shows ticket');