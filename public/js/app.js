const weatherForm = document.querySelector('form')
 const search=document.querySelector('input')
 const msgOne= document.querySelector('#message-1')
 const msgTwo= document.querySelector('#message-2')

 weatherForm.addEventListener('submit',(e)=>{
     e.preventDefault()

     const location=search.value

 
 msgOne.textContent='Loading...'
 msgTwo.textContent= ' '
 fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
           if(data.error){
               msgOne.textContent=data.error
           }
           else{
             msgOne.textContent= data.location
             msgTwo.textContent= data.forecast

           }
    })
})
 })