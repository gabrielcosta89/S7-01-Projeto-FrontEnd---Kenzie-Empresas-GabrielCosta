function navigatepages() {
    let homeBt = document.querySelector('#Home-button')
    let signUpBt = document.querySelector('#cadastro-button')
    let cadastroBt = document.querySelector('#cadastroBt')

    homeBt.addEventListener('click', () => {
        window.location = "../../index.html"
    })

    signUpBt.addEventListener('click', () => {

        window.location = "/src/pages/register.html"
    })

    cadastroBt.addEventListener('click', () => {

        window.location = "/src/pages/register.html"
    })

}

navigatepages() 