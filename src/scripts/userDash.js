import { userLoggedInformation } from '../scripts/requests.js'


function closeModal() {
    let closeBtn = document.querySelector('.ClosButton')



    closeBtn.addEventListener('click', () => {
        let identifier = closeBtn.getAttribute(['data-Close-modal'])

        let wrapper = document.querySelector(`.${identifier}`)
        wrapper.setAttribute('id', 'hidden')
    })


}

function open() {

    let wrapper = document.querySelector('.modal-wrapper')
    let openBtn = document.querySelector('.caneta')
    openBtn.addEventListener('click', () => [
        wrapper.removeAttribute('id')
    ])


}


async function renderTopInformation() {
    let topInformation = document.querySelector('.information-div')
    topInformation.innerHTML = ''
    let user = await userLoggedInformation()
    let { username, email, professional_level, kind_of_work } = user




    let h2 = document.createElement('h2')
    let divBelow = document.createElement('div')
    let pEmail = document.createElement('p')
    let pNivel = document.createElement('p')
    let pTipo = document.createElement('p')
    let button = document.createElement('button')
    let img = document.createElement('img')

    divBelow.classList.add('below')
    pEmail.classList.add('email')
    pNivel.classList.add('nivel')
    if (pNivel == null) {
        pNivel.innerText = ''
    }
    else {
        pNivel.innerText = `${kind_of_work}`
    }
    pTipo.classList.add('tipoDeTrabalho')
    img.classList.add('caneta')
    img.src = `../assets/caneta.svg`
    img.alt = 'caneta'

    h2.innerText = `${username}`
    pEmail.innerText = `${email}`
    pNivel.innerText = `${professional_level}`
    if (kind_of_work == null) {
        pTipo.innerText = ''
    }
    else {
        pTipo.innerText = `${kind_of_work}`
    }


    button.appendChild(img)
    divBelow.append(pEmail, pNivel, pTipo, button)
    topInformation.append(h2, divBelow)
    open()
    closeModal()

}

renderTopInformation()

function logOut() {
    let buttonLogOut = document.querySelector('.defaltbutton1')


    buttonLogOut.addEventListener('click', () => {
if(localStorage.getItem('user')){
    
}        window.location = "../../index.html"
    })
}

logOut()