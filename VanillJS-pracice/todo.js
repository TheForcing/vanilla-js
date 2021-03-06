const toDoForm= document.querySelector(".js-toDoForm"),
toDoInput = toDoForm.querySelector("input"),
toDoList = document.querySelector(".js-toDoList");
const TODOS_LS = `toDos`;

let toDos = [];
function filterFn(toDo){
    return toDo.id === 1 
}
function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
   
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();

}
function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if( loadedToDos !== null){
        const prasedToDos = JSON.parse(loadedToDos);
        prasedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        }
        );
    }
}


function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}
function paintToDo(text){
     const li = document.createElement("li");
     const delBtn = document.createElement("button");
     delBtn.innerHTML="❌";
     delBtn.addEventListener("click", deleteToDo);
     const span = document.createElement("span");
     const newId = toDos.length + 1;

     span.innerText= text
      li.appendChild(span);
      li.appendChild(delBtn);
      li.id = newId;
      toDoList.appendChild(li);
      const todoObj = {
          text: text, 
          id: newId

      };

      toDos.push(todoObj);
      saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue= toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="";
}

function init () {
   loadToDos();
   toDoForm.addEventListener("submit", handleSubmit)
}

init();