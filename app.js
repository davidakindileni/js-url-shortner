let urlDatabase = [];

const input = document.getElementById("longUrl");
const button = document.getElementById("shortenBtn");
const list = document.getElementById("urlList");

button.addEventListener("click", function () {
  if (input.value.trim() !== "") {
    const li = document.createElement("li");
    const deleteButton = document.createElement("button");
    deleteButton.id = "delItemBtn";
    li.textContent = input.value;
    deleteButton.textContent = "X";
    li.append(deleteButton);
    list.appendChild(li);
    deleteButton.addEventListener("click", function () {
      list.removeChild(li);
      input.focus();
    });
    input.value = "";
    input.focus();
  } else {
  }
});

// checked