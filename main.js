// Chrome://extensions/

let myLinks = []

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
let ulEl = document.getElementById("ul-el")
// developing delete button
const deleteBtn = document.getElementById("delete-btn")
const savetBtn = document.getElementById("tab-btn")

// saving Links
const linksfromLocalStorage = JSON.parse(localStorage.getItem("myLinks"))
if(linksfromLocalStorage){

    myLinks = linksfromLocalStorage
    render(myLinks)
}

savetBtn.addEventListener("click",function(){
    // Grabing the url of the currenttab
    chrome.tabs.query({ active: true, currentWindow: true}, function(tabs) {
        myLinks.push(tabs[0].url)
        localStorage.setItem("myLinks",JSON.stringify(myLinks))
        render(myLinks)
    })
    
})

// rendering links

function render(links){
    let listItems = ""
    for (let i = 0; i < links.length; i++){

         listItems += `
         <li>
            <a target = "_blank" href='${links[i]}'>
                ${links[i]}
            </a>
        </li>`
    }
    ulEl.innerHTML = listItems
}


// Evenet listner for delete button
deleteBtn.addEventListener("dblclick", function(){

   
    // clear input feild
    inputEl.value = ""
    // setting local storage eqaul to null
    localStorage.clear()
    myLinks = []
    render(myLinks)

})

inputBtn.addEventListener("click", function(){

    myLinks.push(inputEl.value)
    // clear out the input feild
    inputEl.value = ""
    // setting item for local storage
    localStorage.setItem("myLinks",JSON.stringify(myLinks))
    // calling renderLeads function
    render(myLinks)
})

