const express = require('express')
const forecast = require('./utils/forecast.js')
const app =express()
const path = require('path')
const hbs = require('hbs')
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname,'../public')))
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


// app.get('',(req,res)=>{

//     res.send('<h1>Hello express!</h1>')

// })

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather app',
        name:'Tejas'
    })
})


app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Tejas'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Tejas'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide a search term'
        })
    }

    forecast(req.query.address,(error,data)=>{
        if(error){
            return res.send({error})
        }

        res.send({
            forecast:data,
            
            location:req.query.address

        })
    })
    // res.json({
    //     temperature: '32C',
    //     humidity: 50,
    //     address:req.query.address
    // })
})

app.get('/products',(req,res)=>{

    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'Error page',
        name:'Tejas',
        errorMessage:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Tejas',
        errorMessage:'Page not found'
    })
})


app.listen(port,() => {
    console.log('server is running on port'+port)
})