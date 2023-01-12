function navigatepages() {
    let homeBt = document.querySelector('#Home-button')
    let returnBt = document.querySelector('#returnBt')
    let loginBt=document.querySelector('#login-button')

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