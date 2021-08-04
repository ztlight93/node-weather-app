fetch('http://puzzle.mead.io/puzzle').then((res) => {
    res.json().then((data) => {
        console.log(data)
    })    

})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#p1')
const messageTwo = document.querySelector('#p2')

messageOne.textContent = 'Waiting...'
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    fetch('http://localhost:3000/weather?address=' + location).then((res) => {
    res.json().then((data) => {
        if (data.error){
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})
})