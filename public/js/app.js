console.log('Client side javascript file is loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent= 'From Javascript'
weatherForm.addEventListener('submit',(e)=>{

    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    console.log('testing')
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{

        if(data.error){
            messageOne.textContent=data.error
        }

        else{
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast.desc+'. It is currently '+data.forecast.temp+' degrees out and feels like '+data.forecast.feelslike+'. Humidity is '+data.forecast.humidity+'%'
             
        }

    })
}).catch((err)=>{
    console.log(err)
})
})