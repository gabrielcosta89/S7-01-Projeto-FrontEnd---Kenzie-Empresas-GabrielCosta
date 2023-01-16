

async function allSectors() {
    const sectors = await fetch('http://localhost:6278/companies', {
        method: 'GET'
    })
        .then(response => response.json())
        .then(response => response)
        .catch(err => console.error(err));

    return sectors
}

async function login(data) {

    const loginData = await fetch(`http://localhost:6278/auth/login`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .catch(err => console.log(err))

    return loginData
}

async function createUser(dataUser) {

    const userData = await fetch(`http://localhost:6278/auth/register`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(dataUser)
    })
        .then(res => res.json())
        .catch(err => console.log(err))

    return userData

}

function getUser() {
    const user = JSON.parse(localStorage.getItem('user'))
    return user
}

async function userLoggedInformation() {

    const user = getUser() || {}
    let { token } = user

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    };
    let rota = ''
    if (await validateUser()) {
        rota = 'http://localhost:6278/users'
    }
    else {
        rota = 'http://localhost:6278/users/profile'
    }

    let userInformation = fetch(rota, options)
        .then(response => response.json())
        .then(response => response)
        .catch(err => console.error(err));
    return userInformation
}
await userLoggedInformation()


async function validateUser() {
    const user = getUser() || {};
    let { token } = user

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    };

    let userType = await fetch('http://localhost:6278/auth/validate_user', options)

        .then(response => response.json())
        .then(response => response)
        .catch(err => console.error(err));

    let { is_admin } = userType
    return is_admin
}

async function uptadeUser(data) {

    const user = getUser() || {};
    let { token } = user

    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    };

    let update = await fetch('http://localhost:6278/users', options)
        .then(response => response.json())
        .then(response => response)
        .catch(err => console.error(err));
    return update
}

async function updateAnyUser(data, userId) {

    const user = getUser() || {};
    let { token } = user

    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    };

    await fetch(`http://localhost:6278/admin/update_user/${userId}`, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

async function deleteUser(id) {
    const user = getUser() || {};
    let { token } = user

    const options = {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        },
    };

    fetch(`http://localhost:6278/admin/delete_user/${id}`, options)
        .catch(err => console.error(err));
}


async function allDepartments() {

    const user = getUser() || {};
    let { token } = user

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    };

    let departments = await fetch('http://localhost:6278/departments', options)
        .then(response => response.json())
        .then(response => response)
        .catch(err => console.error(err));

    return departments
}

async function allCompanies() {

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let allCompanies = await fetch('http://localhost:6278/companies/', options)
        .then(response => response.json())
        .then(response => response)
        .catch(err => console.error(err));

    return allCompanies
}


async function departmentsOfCompany(companyId) {
    const user = getUser() || {};
    let { token } = user

    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    let departments = await fetch(`http://localhost:6278/departments/${companyId}`, options)
        .then(response => response.json())
        .then(response => response)
        .catch(err => console.error(err));

    return departments
}


async function excludeDepartment(departmentId) {
    const user = getUser() || {};
    let { token } = user

    const options = {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    await fetch(`http://localhost:6278/departments/${departmentId}`, options)
        .then(response => response.json())
        .then(response => response)
        .catch(err => console.error(err));
}

async function editDepartment(data,id){
    const user = getUser() || {};
    let { token } = user

    const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(data)
      };
      
     let newDp=  await fetch(`http://localhost:6278/departments/${id}`, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));

        return newDp
}

async function createDepartment(data){
    const user = getUser() || {};
    let { token } = user

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      };
      
     let updatedDepartment=await  fetch('http://localhost:6278/departments', options)
        .then(response => response.json())
        .then(response =>response)
        .catch(err => console.error(err));
       
    
}


export { login, createUser, userLoggedInformation, validateUser, uptadeUser, deleteUser, updateAnyUser, allDepartments, allCompanies, departmentsOfCompany, excludeDepartment,editDepartment,createDepartment }

export let AllSectors = await allSectors()
