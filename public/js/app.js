const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const weatherIcon = document.querySelector('#weather_icon')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    if(location) {
        
        messageOne.textContent = 'Loading...'
        messageTwo.textContent = ''

        fetch('/weather?address=' + location).then((response) => {
            response.json().then((data) => {
                if(data.error) {
                    messageOne.textContent = data.error
                } else {
                    weatherIcon.src = data.icon
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
                }
            })
        })
    }
})