const request =require('request')

const forecast=(longitude,latitude,callback) =>{
    const url='https://api.darksky.net/forecast/6fb3c4926ef0f8edbc002118439ee69d/'+ longitude + ',' + latitude 
    request({url:url,json:true},(error,response) =>{
       
          if (error)
          {
                callback('unable to connect to location services',undefined)
          }
          else if(response.body.error)
          {      
                callback('unable to find the location',undefined)

          }
          else{

                  callback(undefined,  ' It is currently ' + response.body.currently.temperature + ' degress out. There is a ' + response.body.currently.precipProbability+ '% chance of rain.')
                 
          }
    })
}

module.exports = forecast