const weatherForm=document.querySelector('form');
const search=document.querySelector('input');
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

//messageOne.textContent='Javascript'

weatherForm.addEventListener('submit',(e)=>{

    e.preventDefault();
    //console.log('dummy');
    const location=search.value;
    messageOne.textContent='Loading...'
    messageTwo.textContent=''
    
    fetch('/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent='error:'+error;
        } else {
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast.temperature+`   
                                 `+data.forecast.summary
        }
    })
})

})