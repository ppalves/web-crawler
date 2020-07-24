
const request = require('request-promise');
const cheerio = require('cheerio');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: 'out3.csv',
  header: [
    {id: 'number', title: 'Number'},
    {id: 'text', title: 'Text'},
  ]
});

function urlSpotted(i){
    return "https://spottedsunicamp.herokuapp.com/spotted/list_spotteds/?page=" + i
}

async function lala(){
    data = []
    for (let i = 2001; i <= 5649; i++) {
        url = urlSpotted(i)
        await request(url)
        .then(body=>{
            let $ = cheerio.load(body);
            $('.ui.divided.items .item').each((index, element) => {
                let text = $(element).find('.description').text().trim();
                let number = $(element).find('.header').text().trim();
                json = {number: number, text: text}
                data.push(json)  
            })
            // console.log(data);
                
        })  
    }
    
    csvWriter.writeRecords(data)
}


lala()










