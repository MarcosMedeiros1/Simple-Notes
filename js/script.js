const UL = document.querySelector("ul");
const BTN_NEW = document.querySelector("#btn_new");
const BTN_SAVE = document.querySelector("#btn_save");
const BTN_CANCEL = document.querySelector("#btn_cancel");
const INPUT_AREA = document.querySelector("#input_area");

let notes = document.querySelectorAll(".note-item");
let btnDelete = document.querySelectorAll(".btn-delete");

const ELEMENTS = [BTN_NEW, BTN_SAVE, BTN_CANCEL, INPUT_AREA];

const toggleVisibility = () => {
  ELEMENTS.forEach((item) => {
    item.classList.toggle("visible");
    INPUT_AREA.focus();
  });
  INPUT_AREA.value = "";
};

const saveNote = () => {
  const NOTE_CONTAINER = document.createElement("div");
  const NOTE_ITEM = document.createElement("textarea");
  const BTN_WRAPPER = document.createElement("div");
  const BTN_DELETE = document.createElement("button");
  const BTN_EDIT = document.createElement("button");

  NOTE_CONTAINER.setAttribute("class", "note-container");
  NOTE_ITEM.setAttribute("class", "note-item");

  BTN_WRAPPER.setAttribute("class", "edit-delete-wrapper");
  BTN_DELETE.setAttribute("class", "btn-delete material-icons-round");
  BTN_DELETE.setAttribute("title", "Double click to delete note");
  BTN_DELETE.innerHTML = "delete";

  BTN_EDIT.setAttribute("class", "btn-edit material-icons-round");
  BTN_EDIT.setAttribute("title", "Click to edit note");
  BTN_EDIT.innerHTML = "edit";

  BTN_WRAPPER.append(BTN_DELETE, BTN_EDIT);

  NOTE_ITEM.readOnly = true;
  NOTE_ITEM.innerHTML = INPUT_AREA.value.trim();
  NOTE_CONTAINER.append(NOTE_ITEM, BTN_WRAPPER);
  UL.prepend(NOTE_CONTAINER);

  notes = document.querySelectorAll(".note-item");
  btnDelete = document.querySelectorAll(".btn-delete");
  invokeFuncs();
};

// Buttons actions
BTN_NEW.onclick = () => {
  toggleVisibility();
};

BTN_CANCEL.onclick = () => {
  toggleVisibility();
};

BTN_SAVE.onclick = () => {
  INPUT_AREA.value.trim() === "" ? false : saveNote();
  toggleVisibility();
  INPUT_AREA.style.height = "auto";
};

// Resize texarea while typing
INPUT_AREA.addEventListener(
  "input",
  () => {
    INPUT_AREA.style.height = "auto";
    INPUT_AREA.style.height = INPUT_AREA.scrollHeight + "px";
  },
  false,
);

// Grow and shrink notes size on click
const expandNote = () => {
  return notes.forEach((element) => {
    element.onclick = () => {
      if (element.offsetHeight !== element.scrollHeight) {
        element.style.height = element.scrollHeight + "px";
      } else {
        element.style.height = "45px";
      }
    };
  });
};

const deleteNote = () => {
  return btnDelete.forEach((element) => {
    element.ondblclick = () => {
      element.parentNode.parentNode.remove();
    };
  });
};

// Invoke
const invokeFuncs = () => {
  expandNote();
  deleteNote();
};
invokeFuncs();
