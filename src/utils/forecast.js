const request=require('request');


const forecast=(latitude,longitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/4b92368bd94e8f7992493d0526ccbec7/'+latitude+','+longitude;



    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!',undefined)
        } else if (response.body.error) {
            callback('Unable to find location',undefined);
        } else {
            callback(undefined,{
                summary: response.body.daily.data[0].summary,
                temperature:response.body.currently.temperature,
                rainProbability:response.body.currently.precipProbability 
            })  
        }
    })
    

}

module.exports=forecast;