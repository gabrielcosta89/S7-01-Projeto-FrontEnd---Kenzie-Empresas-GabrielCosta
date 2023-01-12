import { AllSectors } from '../scripts/requests.js'

function navigatepages() {
    let cadastroBt = document.querySelector('#cadastron-button')
    let loginBt = document.querySelector('#login-button')

    cadastroBt.addEventListener('click', () => {
        window.location = "../src/pages/register.html"
    })

    loginBt.addEventListener('click', () => {
        window.location = "../src/pages/login.html"
    })

}
navigatepages()


function renderSectors(array) {
    let list = document.querySelector('.list')
    list.innerText = ''
    array.forEach((element) => {
        // let { sectors } = element
        let card = createCard(element)
        list.appendChild(card)

    })

}

function createCard({ name, opening_hours, sectors }) {
    let li = document.createElement('li')
    let h2 = document.createElement('h2')
    let p = document.createElement('p')
    let label = document.createElement('label')

    li.classList.add('list--item')

    h2.innerText = `${name}`
    p.innerText = `${opening_hours} horas`
    label.innerText = `${sectors.description}`

    li.append(h2, p, label)

    return li

}

function createSelectOptions() {
    let selectOption = document.querySelector('select')
    // selectOption.innerText = ''
    let sectors = []

    AllSectors.forEach((element) => {
        if (!sectors.includes(element.sectors.description)) {
            sectors.push(element.sectors.description)
        }
    })

    sectors.forEach((sector) => {
        let option=document.createElement('option')
        option.value=sector
        option.innerText=`${sector}`

        selectOption.appendChild(option)
    })

}
createSelectOptions()
function selectSector() {
    let select = document.querySelector('select')

    renderSectors(AllSectors)

    select.addEventListener('change', () => {
        if (select.value == 'todos') {
            renderSectors(AllSectors)
        }
        else {
            let filteredResult = AllSectors.filter((element) => {
                let { sectors } = element
                if (sectors.description == select.value) {
                    return element
                }
            })

            renderSectors(filteredResult)
        }

    })

}

selectSector()

function showHideButtons(){
    let buttonClick=document.querySelector('.burguerButton')
    let divButtons=document.querySelector('.div-buttons')
    let img=document.querySelector('.burguerButton img')
    console.log(img)

    buttonClick.addEventListener('click',()=>{
        if(img.alt=='burguer'){
            img.src='./src/assets/menuClosed.svg'
            img.alt='closed'

            divButtons.removeAttribute('id','hidden')
     
        }
        else{
            img.src='./src/assets/menuOpen.svg'
            img.alt='burguer'
            divButtons.setAttribute('id','hidden')
        }
    })



}

showHideButtons()