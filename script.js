const postsList = document.querySelector(".posts-list");
const addPost = document.querySelector(".add-post-form");
const titleValue = document.getElementById("title-value");
const contentValue = document.getElementById("content-value");
const randomImage = document.querySelector("#random-image");

var accessKeyUnsplash = "FRHUmnXJJ5Lshbluof29v6b9omBuvKtzrOE01t2naJs";

let output = "";

const urlServer = "http://localhost:5000/api/posts";
const urlUnsplash = `https://api.unsplash.com/photos/random/?client_id=${accessKeyUnsplash}`;
//const urlUnsplash = `https://api.unsplash.com/photos?query=night/?client_id=${accessKeyUnsplash}`;

const renderPosts = (posts) => {
  posts.forEach((posts) => {
    output += `<div>
              <div class="card mt-4 col-md-6-ligt">
              <div class="card-header">
              <div class="card-body" data-id=${posts._id}>
                  <span id="conteudo"><h5 class="card-title">${posts.title}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">Descrição: ${posts.content}</h6>
                  <h6 class="card-subtitle mb-2 text-muted">Data de Publicação: ${posts.date}</h6>
                  </span>
                  <!-- <button class="btn btn-primary" id="acessar-post" data-bs-toggle="modal" data-bs-target="#exampleModal"
                  data-bs-whatever="@mdo">Acessar</button> -->
                  <button class="btn btn-success" id="edit-name">Edit</button>
                  <button class="btn btn-warning" id="delete-name">Delete</button>
              </div>
          </div>
          </div>
              `;
  });
  postsList.innerHTML += output;
};

// GET URL IMAGES

fetch(urlUnsplash)
  .then((res) => res.json())
  .then((data) => randomPhoto(data));

const randomPhoto = (photo) => {
  console.log(photo)
  output += `
    <div>
    <img src=${photo.urls.small} alt="imagem aleatoria">
    </div>
  `
  //randomImage.innerHTML += output;
};

// GET URL INFOS
fetch(urlServer)
  .then((res) => res.json())
  .then((data) => renderPosts(data))

// CRUD //
postsList.addEventListener("click", (e) => {
  e.preventDefault();
  let editButtonPressed = e.target.id == "edit-name";
  let deleteButtonPressed = e.target.id == "delete-name";
  //let acessButtonPressed = e.target.id == "acessar-post";

  let id = e.target.parentElement.dataset.id;

  // DELETE
  if (deleteButtonPressed) {
    fetch(`${urlServer}/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => location.reload());
  }
  // EDIT
  if (editButtonPressed) {
    fetch(`${urlServer}/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then(() => location.reload());
  }
  /*
  // GET ID
  if (acessButtonPressed) {
    fetch(`${urlServer}/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      //.then(() => location.reload());
  }
  */
});

//POST
addPost.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(titleValue.value);
  console.log(contentValue.value);
  console.log("Foi!");
  location.reload();
  fetch(urlServer, {
    method: "POST",
    body: JSON.stringify({
      title: titleValue.value,
      content: contentValue.value,
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
