let B_name = document.getElementById("siteName") ; 
let B_url = document.getElementById("siteURL") ;  
let store = [] ;  

// check if There is Tasks In Local Storage 
if(localStorage.getItem("tasks")){
    store = JSON.parse(localStorage.getItem("tasks"));  
    display();
}

// check  if There is url  vaild or  not  
function isValidUrl(url) {
    const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!$&'()*+,;=]+$/;
    return urlRegex.test(url);
}


// Cleaning the  input form 
function clear()
{
    B_name.value = "" ; 
    B_url.value = "" ;   
}

// show books list  
function display()
{
    let box ="" ; 
    for(let i = 0 ; i<store.length ; i++)
    {
        box +=  `<tr>
                        <td>${i+1}</td>
                        <td>${store[i].bookName}</td>
                        <td><a class="visit" href=${store[i].webUrl}  target="_blank"> <i class="fa-solid fa-eye"></i> Visit</a></td>
                        <td><button class="delete" onclick="Delete(${i})"><i class="fa-solid fa-trash"></i>Delete</button></td>
                    </tr>` ; 
    }
    document.getElementById("tableBody").innerHTML =  box ; 
}

//delete one book for list 
function Delete(index) {
    store.splice(index,1); 
    display();
    window.localStorage.setItem("tasks", JSON.stringify(store)); // save in  localstorage  
}

//delete all 
function DeleteAll(){
    store = [] ; 
    window.localStorage.setItem("tasks", JSON.stringify(store)); // save in  localstorage 
    display();  
}

// add to  list 
function add(){
    
    if(isValidUrl(B_url.value) && B_name.value !== ""){
        let object = {
            bookName: B_name.value.toUpperCase() ,  
            webUrl: B_url.value , 
        }; 
        store.push(object); 
    }
    else{
        Swal.fire({
            icon: "error",
            title: "Oops",
            text:"Site Name or Url is not valid , try again"
        });
    } 
    clear() ; 
    display(); 
    window.localStorage.setItem("tasks", JSON.stringify(store));  // save in  localstorage
}

// is the  book  already available ? 
function find(){
    let  flag  =  store.every((i)=> i.bookName !== B_name.value.toUpperCase()) ;   
    if(flag)
    {
        add(); 
    }
    else
    {
        Swal.fire({
            title: "Existing",
            text: "Already available",
            icon: "question"
        });
    }
}