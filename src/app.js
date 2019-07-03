
const path=require('path')
const express=require('express')
const hbs=require('hbs');
const app=express();
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

//console.log(__dirname);
//console.log(__filename);
const publicDirectoryPath=(path.join(__dirname,'../public'));
const viewsPath=path.join(__dirname,'../templates/views');
const partialsPath=path.join(__dirname,'../templates/partials');

app.set('views',viewsPath);
app.set('view engine','hbs');
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));


app.get('',(req,res)=>{
    res.render('index',{
        title:'WEATHER',
        name:'Ripunjai Rai'
    });
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        message:'This is a duumy help message',
        name:'Ripunjai Rai'
    });

})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Ripunjai Rai'
    });
})
    app.get('/weather', (req, res) => {
        if (!req.query.address) {
            return res.send({
                error: 'You must provide an address!'
            })
        }
    
        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error })
            }
    
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                }
    
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
        })
    })
    
            

app.get('/products',(req,res)=>{
    
    geocode(req.query.address,(error,data)=>{


    if(!(req.query.address)){
        
        return res.send({
             error:geocode.error
         });
     }
     //console.log(req.query.search)
     res.send({
        Longitude:data.longitude,
        Lattitude:data.latitude
     })
    })

})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Ripunjai Rai',
        error:'help article not found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Ripunjai Rai',
        error:'My 404 Page'
    })
})

app.listen(3000,()=>{
    console.log('listening on port no 3000')
})