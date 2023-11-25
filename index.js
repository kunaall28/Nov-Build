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
          <button type='button' class='btn btn-outline-primary mr-1.5' name=${id}>
              <i class='fas fa-pencil-alt name=${id}'></i>
          </button>
           <button type='button' class='btn btn-outline-danger mr-1.5' name=${id}>
              <i class='fas fa-trash-alt name=${id}'></i>
          </button>
      </div>
      <div class='card-body'>
          ${
            url &&
            `<img width='100%' src=${url} alt='Card Image' class='card-img-top md-3 rounded-lg' />`
          }
          <h4 class='card-title task__card__title'>${title}</h4>
          <p class='description trim-3-lines text-muted'>${description}</p>
          <div class='tags text-white d-flex flex-wrap'>
            <span class='badge bg-primary m-1'>${type}</span>
          </div>
      </div>
      <div class='card-footer'>
          <button type='button' class='btn btn-outline-primary float-right' data-bs-toggle="modal" data-bs-target="#showTask">Open Task</button>
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
             url &&
             //  `<img width='100%' src=${url} alt='Card Image' class='img-fluid place__holder__image mb-3' />`
             `<img width='100%' src=${url} alt='Card Image' class='img-fluid place__holder__image mb-3' />`
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
        // if (input.title === "" || input.tags === "" || input.taskDescription === "") {
        //   return alert("Please fill all the necessary fiels :-)");
        // }
      
        // taskContents.innerAdjacentHTML(
        taskContents.insertAdjacentHTML(
          "beforeend",
          htmlTaskContent({ ...input, id })
        );
        state.taskList.push({ ...input, id });
      
        updateLocalStorage();
      };
