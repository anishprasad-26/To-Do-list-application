let input = document.querySelector("#inputBox");
let button = document.querySelector("#btn");
let ul = document.querySelector("#ulist");

let array = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask(){
    if(input.value !=""){
    let new_element=document.createElement("li");
    let checkbox=document.createElement("input");
    checkbox.type="checkbox";
    let newbtn=document.createElement("button");
    let span=document.createElement("span");
    span.innerText=input.value;
    array.unshift({task:input.value, completed:false});
    newbtn.innerText="delete";
    new_element.append(checkbox,span,newbtn);
    localStorage.setItem("tasks",JSON.stringify(array));
    ul.prepend(new_element);
    input.value="";
    }
}

ul.addEventListener("change",(evt)=>{
    if(evt.target.type==="checkbox"){
    if(evt.target.checked){
        let spanElement=evt.target.nextElementSibling;
        let index= Array.from(ul.children).indexOf(spanElement.parentElement);
        array[index].completed=true;
        localStorage.setItem("tasks",JSON.stringify(array));        
        spanElement.style.textDecoration="line-through";
    }else{
        let spanElement=evt.target.nextElementSibling;
        let index= Array.from(ul.children).indexOf(spanElement.parentElement);
        array[index].completed=false;
        localStorage.setItem("tasks",JSON.stringify(array));
        spanElement.style.textDecoration="none";
    }
    }
})
ul.addEventListener("click",(evt)=>{
    if(evt.target.innerText==="delete"){
    let delete_list=evt.target.parentElement;
    let index= Array.from(ul.children).indexOf(delete_list);
    array.splice(index,1);
    localStorage.setItem("tasks",JSON.stringify(array));
    delete_list.remove();
    }
})

button.addEventListener("click",addTask);

document.addEventListener("keydown",(evt)=>{
    if(evt.key=="Enter"){
        addTask();
    }
    
})

window.addEventListener("load",()=>{
    for(let i=array.length-1; i>=0; i--){
    let new_element=document.createElement("li");
    let checkbox=document.createElement("input");
    checkbox.type="checkbox";
    let newbtn=document.createElement("button");
    let span=document.createElement("span");
    newbtn.innerText="delete";
    span.innerText=array[i].task;
    if(array[i].completed===true){
        span.style.textDecoration="line-through";
        checkbox.checked=true;
    }
    new_element.append(checkbox,span,newbtn);
    ul.prepend(new_element);
    }
})

