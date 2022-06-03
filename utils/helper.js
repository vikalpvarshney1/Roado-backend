const axios = require('axios')
require('dotenv').config()
const app_id = process.env.oxfordAppId
const app_key = process.env.oxfordAppKey
const fields = 'definitions,examples,pronunciations,etymologies,variantForms'
const strictMatch = "false";
oxfordBaseUrl = 'https://od-api.oxforddictionaries.com/api/v2/'

async function getWordDetail(word) {
    
    const options = {
        method: 'GET',
        url: oxfordBaseUrl + 'entries/en-us/' + word + '?fields=' + fields + '&strictMatch=' + strictMatch,
        headers: {
            'app_id': app_id,
            'app_key': app_key
        }
    };

    //empty object
    let wordObj = {}

    //error handling
    try {
        //response
        let {data} = await axios(options)
        console.log(data)
       
        wordObj.word = data.results[0].word
        wordObj.entries = [];
        // entries
        data.results[0].lexicalEntries.forEach(lexicalEntry => {
            wordObj.entries.push({
                partOfSpeech: lexicalEntry.lexicalCategory.text,
                origin: lexicalEntry.entries[0].etymologies,
                definitions: lexicalEntry.entries[0].senses[0].definitions,
                examples: lexicalEntry.entries[0].senses[0].examples && lexicalEntry.entries[0].senses[0].examples.map(example => example.text)
            })
        
        })
        console.log(wordObj)
        //return the word object
        return wordObj
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = getWordDetail;