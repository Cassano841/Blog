const postsList = document.querySelector(".posts-list");
const addPost = document.querySelector(".add-post-form");
const titleValue = document.getElementById("title-value");
const contentValue = document.getElementById("content-value");

let output = "";

const url = "http://localhost:5000/api/posts";

const renderPosts = (posts) => {
    posts.forEach((posts) => {
    output += `
              <div class="card mt-4 col-md-6-ligt">
              <div class="card-body" data-id=${posts._id}>
                  <h5 class="card-title">${posts.title}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">Descrição: ${posts.content}</h6>
                  <h6 class="card-subtitle mb-2 text-muted">Data de Publicação: ${posts.date}</h6>
                  <a href="#" class="card-link" id="edit-name" data-bs-toggle="modal" data-bs-target="#exampleModal"
                  data-bs-whatever="@mdo">Edit</a>
                  <a href="#" class="card-link" id="delete-name">Delete</a>
              </div>
          </div>
              `;
  });
  postsList.innerHTML += output;
};
fetch(url)
  .then((res) => res.json())
  .then((data) => renderPosts(data));


postsList.addEventListener("click", (e) => {
  e.preventDefault();
  let editButtonPressed = e.target.id == "edit-name";
  let deleteButtonPressed = e.target.id == "delete-name";

  let id = e.target.parentElement.dataset.id;

  // DELETE
  if (deleteButtonPressed) {
    fetch(`${url}/${id}`, {
        method: 'DELETE'
    })
      .then((res) => res.json())
      .then(() => location.reload());
  }
  // EDIT
  if (editButtonPressed) {
    fetch(`${url}/${id}`, {
        method: 'PATCH'
    })
      .then((res) => res.json())
      .then(() => location.reload());
  }
});

//POST
addPost.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(titleValue.value);
  console.log(contentValue.value);
  console.log("Foi!");
  location.reload();
  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      title: titleValue.value,
      content: contentValue.value
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const dataArray = [];
      dataArray.push(data);
      //renderNames(dataArray);
    });
});