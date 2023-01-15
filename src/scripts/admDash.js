
import { userLoggedInformation } from '../scripts/requests.js'
import { deleteUser } from '../scripts/requests.js'


function logOut() {
    let buttonLogOut = document.querySelector('.container1 .defaltbutton1')


    buttonLogOut.addEventListener('click', () => {
        if (localStorage.getItem('user')) {

        } window.location = "../../index.html"
    })
}


async function renderUsers() {

    let userList = document.querySelector('.user-list')
    userList.innerText = ''

    let allUsers = await userLoggedInformation()

    allUsers.forEach((user) => {
        let userCard = createUserCard(user)

        userList.appendChild(userCard)
    })

    openModalDelete()
}

function createUserCard(person) {

    let { username, professional_level
        , department_uuid, uuid
    } = person

    let li = document.createElement('li')
    let usernameh2 = document.createElement('h2')
    let positionP = document.createElement('p')
    let companyNameP = document.createElement('p')
    let divWrapper = document.createElement('div')
    let divIcon = document.createElement('div')
    let canetaImg = document.createElement('img')
    let trashImg = document.createElement('img')

    li.classList.add('user-card')
    positionP.classList.add('position')
    companyNameP.classList.add('companyName')
    divWrapper.classList.add('wrapper')
    divIcon.classList.add('icons1')
    trashImg.classList.add('trashDeleteUser')

    canetaImg.src = `../assets/caneta.svg`
    canetaImg.alt = `purple caneta`
    trashImg.src = `../assets/trash.svg`
    trashImg.alt = `trash`
    trashImg.setAttribute('id', `${uuid}`)
    trashImg.dataset.nameUser=`${username}`
    usernameh2.innerText = `${username}`
    positionP.innerText = `${professional_level}`
    companyNameP.innerText = `Company name`


    divIcon.append(canetaImg, trashImg)
    divWrapper.appendChild(divIcon)
    li.append(usernameh2, positionP, companyNameP, divWrapper)

    return li


}

async function openModalDelete() {
    let trashButtons = document.querySelectorAll('.trashDeleteUser')

    trashButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            buttonTrashDeleteUser(event.target.id,event.target.dataset.nameUser)

        })
    })

}

async function buttonTrashDeleteUser(id,username) {
    let divShowModal = document.querySelector('.showModalhERE')
    divShowModal.innerText = ''


    let divModalDeleteWrapper = document.createElement('div')
    let modalDeleteUser = document.createElement('div')
    let h2 = document.createElement('h2')
    let closeButton = document.createElement('button')

    closeButton.addEventListener('click', () => {
        divShowModal.innerText = ''
    })
    let imgButtonClose = document.createElement('img')
    let deleteButton = document.createElement('button')
    deleteButton.dataset.userid = `${id}`
    deleteButton.addEventListener('click', async (event) => {
        await deleteUser(event.target.dataset.userid)
        divShowModal.innerText = ''
        renderUsers()

    })

    divModalDeleteWrapper.classList.add('modal-delete-wrapper')
    modalDeleteUser.classList.add('modal-delete-user')
    closeButton.classList.add('closeButtonDeleteUser')
    imgButtonClose.src = '../assets/closeButton.svg'
    imgButtonClose.alt = "close button"
    deleteButton.setAttribute('class', 'defaltbutton3 deleteButton')



    h2.innerHTML = ` Realmente deseja remover o usuário ${username}?`
    deleteButton.innerText = 'Deletar'


    closeButton.appendChild(imgButtonClose)
    modalDeleteUser.append(h2, closeButton, deleteButton)
    divModalDeleteWrapper.appendChild(modalDeleteUser)
    divShowModal.appendChild(divModalDeleteWrapper)
}

openModalDelete()

renderUsers()
logOut()