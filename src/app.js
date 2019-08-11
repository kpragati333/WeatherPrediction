const path= require('path')
const express = require('express')
const hbs = require('hbs')
const geocode =require('./utils/geocode')
const forecast =require('./utils/forecast')

// Define paths for express config
const app=express()
const publicDirectoryPath=path.join(__dirname,'../public')
const viewPath =path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')
// set handle bars engine views 

app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

// setup static directory to serve

app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>
{
    res.render('index',{
        title:'weather',
        name:'pragati mehra'
    })
})
 
app.get('/about',(req,res)=>
{
    res.render('about',{
        title:'about',
        name:'pragati mehra'
    })
})
app.get('/help',(req,res)=>
{
    res.render('help',{
        helpText: 'this is some helpful text',
        title:'help',
        name:'Pragati mehra'
    })
})
 app.get('/weather',(req,res) =>{
    if(!req.query.address){
        return res.send({
            error: 'you must provide a search term'
        })
   }
   else(
    geocode(req.query.address,(error,{ latitude ,longitude , location }={} )=>{
          if(error){
            return res.send({ error})
          }
          forecast( longitude,latitude,(error,forecastData)=>{
              if (error)
              {
                return res.send({ error:'error'})
              }  
               res.send({
                   location,
                   forecast:forecastData,
                   address:req.query.address

            })
              
          })
    })
   )

 })
 app.get('/products',(req,res) =>{
     if(!req.query.search){
          return res.send({
              error: 'you must provide a search term'
          })
     }
     
    
     console.log(req.query.search)

     res.send({
         products: []
     })
 })
 app.get('/help/*',(req, res) => {
    res.render('404',{
        msg:'404 page',
        title:'404',
        name:'Pragati mehra'
    })
 })
 app.get('*',(req, res) => {
    res.render('404',{
        msg:'404 page',
        title:'404',
        name:'Pragati mehra'
    })
 })
app.listen(3000,() => {

    console.log('server is up on port 3000')
})