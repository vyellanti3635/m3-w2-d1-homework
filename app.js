const { MongoClient } = require('mongodb');

var stats =[
    {
        'city': 'San Juan', 
        'zip': '00926', 
        'state': 'PR', 
        'income': '34781',
        'age': '44'
    },
    {
        'city': 'Corona', 
        'zip': '11368', 
        'state': 'NY', 
        'income': '50797',
        'age': '32'
    },
    {
        'city': 'Chicago', 
        'zip': '60629', 
        'state': 'IL', 
        'income': '42019',
        'age': '31'
    },
    {
        'city': 'El Paso', 
        'zip': '79936', 
        'state': 'TX', 
        'income': '54692',
        'age': '31'
    },
    {
        'city': 'Los Angeles', 
        'zip': '90011', 
        'state': 'CA', 
        'income': '36954',
        'age': '28'
    },
    {
        'city': 'Norwalk', 
        'zip': '90650', 
        'state': 'CA', 
        'income': '66453',
        'age': '35'
    }
]

const client = new MongoClient('mongodb://127.0.0.1:27017/statsdb');

client.connect()
  .then(() => {
    console.log('Connected to MongoDB');

    // 1) Create/select the database 'statsdb'
    const dbo = client.db('statsdb');
    console.log('statsdb selected/created');

    // 2) Create the collection 'uscensus'
    // dbo.createCollection('uscensus').then(function() {
    //     console.log('Collection created!');
    //     client.close()
    // });

    // 3) Insert the provided data into the 'uscensus' collection
    // dbo.collection('uscensus').insertMany(stats).then(function() {
    //   console.log(` ${stats.length} documents inserted`);
    //   client.close();
    // });

    // 4) Adding new record to the collection
    // const newData = [
    //       { city: 'Pacoima', zip: '91331', state: 'CA', income: '60360', age: '33' },
    //       { city: 'Ketchikan', zip: '99950', state: 'AK', income: '00000', age: '00' }
    //     ];
    // dbo.collection('uscensus').insertMany(newData).then(function() {
    //   console.log(`${newData.length} documents inserted`);
    //   client.close();
    // });

    // 5) Find out the zip code for Corona, NY. Output a message on the terminal
    // var query = { city: 'Corona', state: 'NY' };
    // dbo.collection('uscensus').find(query).toArray().then(items => {
    //     console.log(`Successfully found ${items.length} documents!`);
    //     console.log(`zip code for ${query.city}, ${query.state} is: ${items[0].zip}`);
    //     client.close();
    // });

    // 6) Find out the income for all cities in California. Example: var myquery = { address: /^S/ };
    // query all address that starts with ’S’. Output a message on the terminal.
    // var myquery = { state: 'CA' };
    // dbo.collection('uscensus').find(myquery).toArray().then(items => {
    //     console.log(`Successfully found ${items.length} documents!`);
    //     console.log(`Income for all cities in California:`);
    //     items.forEach(item => {
    //         console.log(`City: ${item.city}, Income: ${item.income}`);
    //     });
    //     client.close();
    // });

    // 7) Update the income and age for Alaska: 38910 and 46 respectively. Output a message on the terminal.
    // var myquery = { state: 'AK' };
    // var newvalues = { $set: { income: '38910', age: '46' } };
    // dbo.collection('uscensus').updateOne(myquery, newvalues).then(result => {
    //     console.log(`Successfully updated ${result.modifiedCount} document(s)!`);
    //     client.close();
    // });

    // 8) Sort records in ascending order by state. Note: 1 (ascending) -1 (descending). Output a message on the terminal and also the new sorted list.
    dbo.collection('uscensus').find().sort({ state: 1 }).toArray().then(items => {
        console.log(`Successfully sorted ${items.length} documents!`);
        console.log(`Sorted list by state:`);
        items.forEach(item => {
            console.log(`City: ${item.city}, State: ${item.state}`);
        });
        client.close();
    });
  })
  .then(() => {
    console.log('All tasks complete. Connection closed.');
  })
  .catch(error => console.log('Failed to connect', error));