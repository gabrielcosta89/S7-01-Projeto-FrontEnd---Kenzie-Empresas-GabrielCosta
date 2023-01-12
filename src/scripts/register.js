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