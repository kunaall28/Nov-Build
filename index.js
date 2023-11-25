// Example - 
// var state = {
//     taskList: [
//         {
//             imageUrl: "",
//             taskTitle: "",
//             tasktype: "",
//             taskDescription: ""
//         },
//         {
//             imageUrl: "",
//             taskTitle: "",
//             tasktype: "",
//             taskDescription: ""
//         },
//         {
//             imageUrl: "",
//             taskTitle: "",
//             tasktype: "",
//             taskDescription: ""
//         },
//         {
//             imageUrl: "",
//             taskTitle: "",
//             tasktype: "",
//             taskDescription: ""
//         },
//         {
//             imageUrl: "",
//             taskTitle: "",
//             tasktype: "",
//             taskDescription: ""
//         }
//     ],
// };

const state = {
        taskList: [],
      };

// DOM Operations
const taskModal = document.querySelector(".task__modal__body");
const taskContents = document.querySelector(".task__contents");

// console.log(taskContents);
// console.log(taskModal);

// Template for card
// element identifier key=${id}
const htmlTaskContent = ({ id, title, description, type, url }) => `
  <div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
    <div class='card shadow-sm task__card'>
      <div class='card-header d-flex justify-content-end task__card__header'>
          <button type='button' class='btn btn-outline-primary mr-2' name=${id} onclick="editTask.apply(this, arguments)">
              <i class='fas fa-pencil-alt name=${id}'></i>
          </button>
           <button type='button' class='btn btn-outline-danger mr-2' name=${id} onclick="deleteTask.apply(this, arguments)">
              <i class='fas fa-trash-alt name=${id}'></i>
          </button>
      </div>
      <div class='card-body'>
          ${
            // url &&
            // `<img width='100%' src=${url} alt='Card Image' class='card-img-top md-3 rounded-lg' />`
            url 
            ? `<img width='100%' src=${url} alt='Card Image' class='card-img-top md-3 rounded-lg' />`
            : `<img width='100%' src="https://png.pngtree.com/png-vector/20210609/ourmid/pngtree-mountain-network-placeholder-png-image_3423368.jpg" alt='Card Image' class='card-img-top md-3 rounded-lg' />`
          }
          <h4 class='card-title task__card__title'>${title}</h4>
          <p class='description trim-3-lines text-muted'>${description}</p>
          <div class='tags text-white d-flex flex-wrap'>
            <span class='badge bg-primary m-1'>${type}</span>
          </div>
      </div>
      <div class='card-footer'>
          <button type='button' class='btn btn-outline-primary float-right' data-bs-toggle="modal" data-bs-target="#showTask" onclick='openTask()' id=${id}>Open Task</button>
      </div>
    </div>
  </div>
`;

// Modal body on click of open task
const htmlModalContent = ({ id, title, description, url }) => {
        const date = new Date(parseInt(id));
        return `
        <div id=${id}>
           ${
            //  url &&
            //  `<img width='100%' src=${url} alt='Card Image' class='img-fluid place__holder__image mb-3' />`
            url 
            ? `<img width='100%' src=${url} alt='Card Image' class='card-img-top md-3 rounded-lg' />`
            : `<img width='100%' src="https://png.pngtree.com/png-vector/20210609/ourmid/pngtree-mountain-network-placeholder-png-image_3423368.jpg" alt='Card Image' class='card-img-top md-3 rounded-lg' />`
           }
           <strong class='text-muted text-sm'>Created on: ${date.toDateString()}</strong>
           <h2 class='my-3'>${title}</h2>
           <p class='text-muted'>${description}</p>
        </div>
        `;
      };

// We convert JSON to string for local storage
const updateLocalStorage = () => {
        localStorage.setItem(
          "task",
          JSON.stringify({
            tasks: state.taskList,
          })
        );
      };

// string to Json for rendering the cards on screen 
const loadInitialData = () => {
        const localStorageCopy = JSON.parse(localStorage.task);
      
        if (localStorageCopy) state.taskList = localStorageCopy.tasks;
      
        state.taskList.map((cardDate) => {
          taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardDate));
        });
      };

// Spread operator = ...
// const obj ={
//     name: "kunal",
//     age: 2
// }

// console.log(obj);
// output = {name: 'kunal' age: 2}

// console.log({obj});
// output = {obj: {-}}obj: {name: 'kunal' age: 2}[[Prototype]]: Object

// console.log({...obj});
// output = {name: 'kunal' age: 2}


// To Add a NEW key value pair using spread operator

// console.log({...obj, designation: "mentor"});
// output = {name: 'kunal' age: 2 designation: mentor}


// update
// console.log({...obj, designation: "Coach"});
// output = {name: 'kunal' age: 2 designation: Coach}



// when we edit or update we need to save the changes
const handleSubmit = (event) => {
        // console.log("event triggerd");
        const id = `${Date.now()}`;
        const input = {
          url: document.getElementById("imageUrl").value,
          title: document.getElementById("taskTitle").value,
          type: document.getElementById("tags").value,
          description: document.getElementById("taskDescription").value,
        };

        if (input.title === "" || input.tags === "" || input.taskDescription === "") {
          return alert("Please fill all the necessary fiels!!!");
        }
      
        // taskContents.innerAdjacentHTML(
        taskContents.insertAdjacentHTML(
          "beforeend",
          htmlTaskContent({ ...input, id })
        );
        state.taskList.push({ ...input, id });
      
        updateLocalStorage();
      };

// Open Task method
const openTask = (e) => {
  // Instead of below stmt we can write onclick='openTask.apply(this,arguments)' in Open Task button
  if (!e) e = window.event;

  const getTask = state.taskList.find(({id}) => id === e.target.id);
  taskModal.innerHTML = htmlModalContent(getTask)
};

// Delete task
const deleteTask = (e) => {
  // Instead of below stmt we can write onclick='deleteTask.apply(this,arguments)' in Open Task button
  if(!e) e = window.event;

  const targetId = e.target.getAttribute("name");
  // console.log(targetId);
  const type = e.target.tagName;
  // console.log(type);
  const removeTask = state.taskList.filter(({id}) => id !== targetId); 
  // console.log(removeTask);
  updateLocalStorage();

  // these .parentnode is use to remove the card from UI like from all superior div tags
  if(type === "BUTTON"){
    // console.log(e.target.parentNode.parentNode.parentNode.parentNode)
    return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
      e.target.parentNode.parentNode.parentNode
    );
  }
  return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
    e.target.parentNode.parentNode.parentNode.parentNode)
};

// Edit Task
const editTask = (e) => {
  if (!e) e = window.event;

  const targetId = e.target.id;
  const type = e.target.tagName;

  let parentNode;
  let taskTitle;
  let taskDescription;
  let taskType;
  let submitButton;

  if(type === "BUTTON"){
    parentNode = e.target.parentNode.parentNode;
  } else {
    parentNode = e.target.parentNode.parentNode.parentNode;
  }

  // taskTitle = parentNode.childNodes[3];
  // console.log(taskTitle);

  taskTitle = parentNode.childNodes[3].childNodes[3];
  taskDescription = parentNode.childNodes[3].childNodes[5];
  taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];
  submitButton = parentNode.childNodes[5].childNodes[1];
  // console.log(taskTitle,taskDescription,taskType,submitButton);

  taskTitle.setAttribute("contenteditable", "true");
  taskDescription.setAttribute("contenteditable", "true");
  taskType.setAttribute("contenteditable", "true");

  submitButton.setAttribute('onclick',"saveEdit.apply(this, arguments)");
  // data-bs-toggle="modal" data-bs-target="#showTask"
  submitButton.removeAttribute("data-bs-toggle");
  submitButton.removeAttribute("data-bs-target");
  submitButton.innerHTML = "Save Changes";
};

// To Save the Edited Changes
const saveEdit = (e) => {
  if (!e) e = window.event;

  const targetId = e.target.id;
  const parentnode = e.target.parentNode.parentNode;
  // console.log(parentnode.childNodes)

  const taskTitle = parentnode.childNodes[3].childNodes[3];
  const taskDescription = parentnode.childNodes[3].childNodes[5];
  const taskType = parentnode.childNodes[3].childNodes[7].childNodes[1];
  const submitButton = parentnode.childNodes[5].childNodes[1];

  const updateData = {
    taskTitle: taskTitle.innerHTML,
    taskDescription: taskDescription.innerHTML,
    taskType: taskType.innerHTML,
  };

  let stateCopy = state.taskList;

  stateCopy = stateCopy.map((task) => 
    task.id === targetId 
      ? {
          id: task.id,
          title: updateData.taskTitle,
          description: updateData.taskDescription,
          type: updateData.taskType,
          url: task.url,
        }
      : task  
  );
  state.taskList = stateCopy;
  updateLocalStorage();

  taskTitle.setAttribute("contenteditable", "false");
  taskDescription.setAttribute("contenteditable", "false");
  taskType.setAttribute("contenteditable", "false");

  submitButton.setAttribute('onclick', "openTask.apply(this, arguments)");
  submitButton.setAttribute("data-bs-toggle","modal");
  submitButton.setAttribute("data-bs-target","#showTask");
  submitButton.innerHTML = "Open Task";
};

// Search Task
const searchTask = (e) => {
  if(!e) e = window.event;

  while(taskContents.firstChild){
    taskContents.removeChild(taskContents.firstChild);
  }

  const resultData = state.taskList.filter(({ title }) => 
    title.toLowerCase().includes(e.target.value.toLowerCase())
  );

  // console.log(resultData);
  resultData.map((cardData) => 
    taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardData))
  );
};