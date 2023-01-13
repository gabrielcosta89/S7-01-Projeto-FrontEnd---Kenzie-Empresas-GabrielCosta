import { createUser } from './requests.js'

function navigatepages() {
    let homeBt = document.querySelector('#Home-button')
    let returnBt = document.querySelector('#returnBt')
    let loginBt = document.querySelector('#login-button')

    homeBt.addEventListener('click', () => {
        window.location = "../../index.html"
    })
    returnBt.addEventListener('click', () => {
        window.location = "../../index.html"
    })

    loginBt.addEventListener('click', () => {
        window.location = "/src/pages/login.html"
    })

}

navigatepages()

function showHideButtons() {
    let buttonClick = document.querySelector('.burguerButton')
    let divButtons = document.querySelector('.div-buttons')
    let img = document.querySelector('.burguerButton img')
    buttonClick.addEventListener('click', () => {
        if (img.alt == 'burguer') {
            img.src = '../assets/menuClosed.svg'
            img.alt = 'closed'

            divButtons.removeAttribute('id', 'hidden')

        }
        else {
            img.src = '../assets/menuOpen.svg'
            img.alt = 'burguer'
            divButtons.setAttribute('id', 'hidden')
        }
    })



}

showHideButtons()

function userForm() {

    let inputs = document.querySelectorAll('form>input')
    let button = document.querySelector('form>button')
    let select = document.querySelector('form>select')
    let user = {
        username: 'kezinho',
        password: 1234,
        email: 'kenzinho@mail.com',
        professional_level: 'sênior'
    }

    button.addEventListener('click', async (event) => {
        event.preventDefault()
        inputs.forEach(input => {
            user[input.name] = input.value
            user.professional_level = select.value
        })
        let usersCreated = await createUser(user)
        if (usersCreated.error) {
            alert(usersCreated.error)
        }
        else {
            localStorage.setItem('createUser', JSON.stringify(usersCreated))
            window.location = "/src/pages/login.html"
        }




    })




}

userForm()