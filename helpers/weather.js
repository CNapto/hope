const request=require('request');
let weatherdata=(lat,lon)=>{
return new Promise((resolve,reject)=>{
    request(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${process.env.Weather_key}`
    ,(err,response,body)=>{

    if(err)
        return reject(err);
    resolve(JSON.parse(body));
    


    });

})
}
module.exports=weatherdata;