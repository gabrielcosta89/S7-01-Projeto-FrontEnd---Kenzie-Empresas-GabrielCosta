
import { userLoggedInformation, deleteUser, updateAnyUser, allDepartments, allCompanies, departmentsOfCompany, excludeDepartment, editDepartment, createDepartment } from '../scripts/requests.js'



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
    openModalEditser()
}

async function openModalEditser() {
    let buttonOpenModal = document.querySelectorAll('.editUserPen')
    buttonOpenModal.forEach((button) => {
        button.addEventListener('click', (event) => {
            showModalEditUser(event.target.dataset.userIdEdition)

            editUser(event.target.dataset.userIdEdition)

        })
    })

}


async function editUser(id) {
    let showModalhERE = document.querySelector('.showModalhERE')
    let buttonEdituser = document.querySelector('.buttonEdituser')
    let selectKind = document.querySelector('#selectKindOfWork')
    let selectLevel = document.querySelector('#selectProfessionalLevel')
    let bodySend = []
    let hi = buttonEdituser.addEventListener('click', async (event) => {
        event.preventDefault()
        if (selectKind.value == 'none' || selectLevel.value == 'none') {
            alert('Preencha todos os campos')
        }
        else {
            let item = {
                kind_of_work: selectKind.value,
                professional_level: selectLevel.value,
            }
            bodySend.push(item)

            await updateAnyUser(bodySend[0], id)
            renderUsers()
            showModalhERE.innerHTML = ''
        }

    })


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
    canetaImg.dataset.userIdEdition = uuid


    li.classList.add('user-card')
    positionP.classList.add('position')
    companyNameP.classList.add('companyName')
    divWrapper.classList.add('wrapper')
    divIcon.classList.add('icons1')
    trashImg.classList.add('trashDeleteUser')

    canetaImg.src = `../assets/caneta.svg`
    canetaImg.alt = `purple caneta`
    canetaImg.classList.add('editUserPen')
    trashImg.src = `../assets/trash.svg`
    trashImg.alt = `trash`
    trashImg.setAttribute('id', `${uuid}`)
    trashImg.dataset.nameUser = `${username}`
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
            buttonTrashDeleteUser(event.target.id, event.target.dataset.nameUser)

        })
    })

}

function showModalEditUser(uuid) {
    let divShowModal = document.querySelector('.showModalhERE')
    divShowModal.innerText = ''


    let modal_edit_wrapper = document.createElement('div')
    let modal_edit_user = document.createElement('div')
    let titleH2 = document.createElement('h2')
    let editUserCloseButton = document.createElement('button')
    editUserCloseButton.addEventListener('click', () => {
        divShowModal.innerText = ''
    })
    let closeBtImg = document.createElement('img')
    let editUserForm = document.createElement('form')
    let selectKind = document.createElement('select')
    let optionSelectModality = document.createElement('option')
    let optionHomeOffice = document.createElement('option')
    let optionPresencial = document.createElement('option')
    let optionHibrido = document.createElement('option')
    let selectLevel = document.createElement('select')
    let optionSelectLevel = document.createElement('option')
    let optionJunior = document.createElement('option')
    let optionPleno = document.createElement('option')
    let optionSenior = document.createElement('option')
    let buttonEditUser = document.createElement('button')
    buttonEditUser.setAttribute('id', `${uuid}`)

    modal_edit_wrapper.classList.add('modal-edit-wrapper')
    modal_edit_user.classList.add('modal-edit-user')
    editUserCloseButton.classList.add('editUserCloseButton')
    editUserCloseButton.setAttribute('id', 'editUserCloseButton')
    closeBtImg.src = '../assets/closeButton.svg'
    closeBtImg.alt = 'Close button'
    editUserForm.classList.add('editUserForm')
    selectKind.setAttribute('id', 'selectKindOfWork')
    selectKind.required = true
    optionSelectModality.value = "none"
    optionHomeOffice.value = "home office"
    optionPresencial.value = "presencial"
    optionHibrido.value = "hibrido"
    selectLevel.setAttribute('id', 'selectProfessionalLevel')
    selectLevel.required = true
    optionSelectLevel.value = 'none'
    optionJunior.value = 'júnior'
    optionPleno.value = 'pleno'
    optionSenior.value = 'sênior'
    buttonEditUser.setAttribute('class', 'defaltbutton2 buttonEdituser')



    titleH2.innerText = "Editar Usuário"
    optionSelectModality.innerText = "Selectionar modalidade de trabalho"
    optionHomeOffice.innerText = "Home office"
    optionPresencial.innerText = "Presencial"
    optionHibrido.innerText = "Hibrido"
    optionSelectLevel.innerText = "Selecionar nível profissional"
    optionJunior.innerText = "Júnior"
    optionPleno.innerText = "Pleno"
    optionSenior.innerText = "Sênior"
    buttonEditUser.innerText = "Editar"


    editUserCloseButton.appendChild(closeBtImg)
    selectKind.append(optionSelectModality, optionHomeOffice, optionPresencial, optionHibrido,)
    selectLevel.append(optionSelectLevel, optionJunior, optionPleno, optionSenior)
    editUserForm.append(selectKind, selectLevel, buttonEditUser)
    modal_edit_user.append(titleH2, editUserCloseButton, editUserForm)
    modal_edit_wrapper.appendChild(modal_edit_user)
    divShowModal.appendChild(modal_edit_wrapper)


}

async function buttonTrashDeleteUser(id, username) {
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


async function renderAllDepartments(data) {

    let base = 0
    if (data) {
        base = data
    }
    else {
        base = await allDepartments()
    }

    let departmentList = document.querySelector('.department-list')
    departmentList.innerText = ""
    let allDepartment = base
    allDepartment.forEach((department) => {
        let departmentName = departmentCard(department)
        departmentList.appendChild(departmentName)
    })


    renderModalExcludeDepartment()
    renderModalEditDepartment()

}

function departmentCard(data) {
    let { name, description, companies, uuid } = data

    let li = document.createElement('li')
    let h2 = document.createElement('h2')
    let dPname = document.createElement('li')
    let cpName = document.createElement('li')
    let divWrapper = document.createElement('div')
    let icons = document.createElement('div')
    let imgEye = document.createElement('img')
    imgEye.dataset.view = `${uuid}`
    let imgLapis = document.createElement('img')
    imgLapis.dataset.editDp = `${uuid}`
    let imgTrash = document.createElement('img')
    imgTrash.setAttribute('id', `${uuid}`)

    li.classList.add('department-card')
    dPname.classList.add('dpName')
    cpName.classList.add('cpName')
    divWrapper.classList.add('wrapper')
    icons.classList.add('icons')
    imgEye.src = "../assets/eye.svg"
    imgEye.alt = "eye"
    imgLapis.src = "../assets/lapisPreto.svg"
    imgLapis.alt = "lapis"
    imgLapis.classList.add('lapisPreto')
    imgTrash.src = "../assets/trash.svg"
    imgTrash.alt = "trash"
    imgTrash.classList.add('lixo')


    h2.innerText = `${name}`
    dPname.innerText = `${description}`
    cpName.innerText = `${companies.name}`

    icons.append(imgEye, imgLapis, imgTrash)
    divWrapper.appendChild(icons)
    li.append(h2, dPname, cpName, divWrapper)
    return li
}

async function renderSelectedOptions() {
    let select = document.querySelector(".selectCompany")


    let companies = await allCompanies()
    companies.forEach((company) => {
        let companyName = createSelect(company)
        select.appendChild(companyName)
    })

    renderSelectedAfterClick()

}

function createSelect(data) {
    let { name, uuid } = data
    let option = document.createElement('option')
    option.innerText = `${name}`
    option.value = `${uuid}`

    return option
}

async function renderSelectedAfterClick() {
    let select = document.querySelectorAll('.selectCompany')

    select.forEach((option) => {
        option.addEventListener('change', async (event) => {
            if (event.target.value == 'todos') {
                renderAllDepartments()
            }
            else {
                renderAllDepartments(await departmentsOfCompany(event.target.value))


            }


        })
    })


}

function renderModalExcludeDepartment() {
    let trashImg = document.querySelectorAll('.lixo')

    trashImg.forEach((element) => {
        element.addEventListener('click', (event) => {

            showDepartmentExcluder(event.target.id)
        })
    })
}

async function showDepartmentExcluder(id) {

    let showModalhERE = document.querySelector('.showModalhERE')
    showModalhERE.innerHTML = ''


    let divModalWrapper = document.createElement('div')
    let divModal = document.createElement('div')
    let h2 = document.createElement('h2')
    let buttonCloseModal = document.createElement('button')
    let imgClose = document.createElement('img')
    imgClose.addEventListener('click', () => {
        showModalhERE.innerHTML = ''
    })
    let buttonDelete = document.createElement('button')
    buttonDelete.dataset.dpId = `${id}`

    divModalWrapper.classList.add('modal-exclude-department-wrapper')
    divModal.classList.add('modal-exclude-department')
    buttonCloseModal.classList.add('closeButtonDeleteUser')
    imgClose.src = "../assets/closeButton.svg"
    imgClose.alt = "close button"
    buttonDelete.setAttribute('class', 'defaltbutton3 deleteButton')
    buttonDelete.addEventListener('click', async (event) => {
        await excludeDepartment(event.target.dataset.dpId)
        renderAllDepartments()
        showModalhERE.innerHTML = ''
    })
    h2.innerText = 'Realmente deseja deletar o Departamento NOME e demitir seus funcionários?'
    buttonDelete.innerText = 'Deletar'


    buttonCloseModal.appendChild(imgClose)
    divModal.append(h2, buttonCloseModal, buttonDelete)
    divModalWrapper.appendChild(divModal)
    showModalhERE.appendChild(divModalWrapper)
}

function renderModalEditDepartment() {
    let lapis = document.querySelectorAll('.lapisPreto')

    lapis.forEach((element) => {
        element.addEventListener('click', (event) => {

            DepartmentEditor(event.target.dataset.editDp)
        })
    })

}


function DepartmentEditor(idDP) {
    let showModalhERE = document.querySelector('.showModalhERE')
    showModalhERE.innerHTML = ''


    let divModalWrapper = document.createElement('div')
    let divModal = document.createElement('div')
    let h2 = document.createElement('h2')
    let buttonClose = document.createElement('button')
    buttonClose.addEventListener('click', () => {
        showModalhERE.innerHTML = ''
    })
    let img = document.createElement('img')
    let textarea = document.createElement('textArea')
    let buttonEdit = document.createElement('button')
    buttonEdit.dataset.editBt = `${idDP}`
    divModalWrapper.classList.add('modal-edit-department-wrapper')
    divModal.classList.add('modal-edit-department')
    buttonClose.classList.add('closeDpEdit')
    img.src = "../assets/closeButton.svg"
    img.alt = "close button"

    textarea.cols = "30"
    textarea.rows = "3"
    textarea.placeholder = "Valores anteriores da descrição"
    buttonEdit.setAttribute('class', 'defaltbutton2 editDpButton')
    buttonEdit.addEventListener('click', async (event) => {
        let send = {
            description: textarea.value
        }
        await editDepartment(send, buttonEdit.dataset.editBt)
        renderAllDepartments()
        showModalhERE.innerHTML = ''

    })

    h2.innerText = "Editar Departamento"
    buttonEdit.innerText = "Salvar alterações"

    buttonClose.appendChild(img)
    divModal.append(h2, buttonClose, textarea, buttonEdit)
    divModalWrapper.appendChild(divModal)
    showModalhERE.appendChild(divModalWrapper)


}

function renderModalCreateDepartment() {
    let createButton = document.querySelector('.createButton')

    createButton.addEventListener('click', () => {
        departmentCreator()
    })

}

async function departmentCreator() {
    let showModalhERE = document.querySelector('.showModalhERE')
    showModalhERE.innerHTML = ''
    let companies = await allCompanies()
    console.log(companies)

    let modalWrapper = document.createElement('div')
    let modal = document.createElement('div')
    let h2 = document.createElement('h2')
    let buttonClose = document.createElement('button')
    buttonClose.addEventListener('click', () => {
        showModalhERE.innerHTML = ''
    })

    let imgClose = document.createElement('img')
    let form = document.createElement('form')
    form.classList.add('createForm')
    let inputName = document.createElement('input')
    let inputDescription = document.createElement('input')
    let select = document.createElement('select')
    companies.forEach((company) => {
        let { name, uuid } = company
        let option = document.createElement('option')
        option.innerText = `${name}`
        option.value = `${uuid}`

        select.appendChild(option)
    })
    select.insertAdjacentHTML("afterbegin", "<option value=''>Selecionar empresa</option>")

    let buttonCreate = document.createElement('button')

    modalWrapper.classList.add('modal-create-department-wrapper')
    modal.classList.add('modal-create-department')
    buttonClose.classList.add('closeBtDepartment')
    imgClose.src = "../assets/closeButton.svg"
    imgClose.alt = "close button"
    inputName.setAttribute('id', 'nameDepartment')
    inputName.name = "name"
    inputName.placeholder = "Nome do departamento"
    inputName.required = true
    inputDescription.setAttribute('id', 'DescriptionDp')
    inputDescription.name = "description"
    inputDescription.placeholder = "Descrição"
    inputDescription.required = true
    select.required = true
    buttonCreate.setAttribute('class', 'defaltbutton2 createDepartmentBt')
    buttonCreate.addEventListener('click', async (event) => {
        let update = {
            "name": `${inputName.value}`,
            "description": `${inputDescription.value}`,
            "company_uuid": `${select.value}`
        }

        await createDepartment(update)
        renderAllDepartments()
    })
    h2.innerText = 'Criar Departamento'
    buttonCreate.innerText = 'Criar departamento'


    buttonClose.appendChild(imgClose)
    form.append(inputName, inputDescription, select, buttonCreate)
    modal.append(h2, buttonClose, form)
    modalWrapper.appendChild(modal)
    showModalhERE.appendChild(modalWrapper)
}




renderModalCreateDepartment()
renderSelectedOptions()
renderAllDepartments()
openModalDelete()
renderUsers()
logOut()