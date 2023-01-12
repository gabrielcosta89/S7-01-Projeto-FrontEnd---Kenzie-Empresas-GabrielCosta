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

function showHideButtons(){
    let buttonClick=document.querySelector('.burguerButton')
    let divButtons=document.querySelector('.div-buttons')
    let img=document.querySelector('.burguerButton img')
    console.log(img)

    buttonClick.addEventListener('click',()=>{
        if(img.alt=='burguer'){
            img.src='../assets/menuClosed.svg'
            img.alt='closed'

            divButtons.removeAttribute('id','hidden')
     
        }
        else{
            img.src='../assets/menuOpen.svg'
            img.alt='burguer'
            divButtons.setAttribute('id','hidden')
        }
    })



}

showHideButtons()