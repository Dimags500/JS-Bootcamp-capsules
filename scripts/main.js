// gets data from api and turn it into an array
const getData = async () => {
  const response = await axios.get(
    "https://capsules-asb6.herokuapp.com/api/teacher/toam"
  );
  const studentIDs = response.data;

  const responseArr = await Promise.all(
    studentIDs.map((student) =>
      axios.get(`https://capsules-asb6.herokuapp.com/api/user/${student.id}`)
    )
  );
  students = responseArr.map((response) => response.data);
  rowBuilder(students, document.getElementById("data-table"));
};
let students = [];
getData();
let studentsFiltered = students;
// change fillter
let filterSelected = "firstName";
let searchKeywords = "";
const select = document.querySelector("#sort-options");
//
function changefilter(event) {
  const value = event.target.value;
  filterSelected = value;
  updateTable();
}
select.addEventListener("change", changefilter);
// fillter
const filterData = (event) => {
  searchKeywords = event.target.value;
  updateTable();
};
const input = document.querySelector("#search-input");
input.addEventListener("input", filterData);
const updateTable = () => {
  if (searchKeywords !== "")
    studentsFiltered = students.filter((student) =>
      student[filterSelected].toString().includes(searchKeywords.toLowerCase())
    );
  else studentsFiltered = students;
  rowBuilder(studentsFiltered, document.getElementById("data-table"));
};
// header
const header = document.createElement("tr");
const createHeader = () => {
  const headerKeys = [
    "ID",
    "Gender",
    "First Name",
    "Last Name",
    "Hobby",
    "City",
    "Age",
    "Capsule",
  ];
  headerKeys.forEach((key) => {
    const th = document.createElement("th");
    th.innerText = key;
    header.append(th);
  });
};
createHeader();

// table
function rowBuilder(data, table) {
  table.innerText = "";
  table.append(header);
  data.forEach((item) => {
    // buttons
    const btnObjs = [
      { class: "edit-btn", callback: editRow, text: "Edit" },
      { class: "delete-btn", callback: deleteRow, text: "Delete" },
      { class: "cancel-btn", callback: cancelEdit, text: "Cancel" },
      { class: "confirm-btn", callback: confirmEdit, text: "Confirm" },
    ];
    // tablebuilding
    let tr = document.createElement("tr");
    tr.classList.add("row");
    for (value of Object.values(item)) {
      let td = document.createElement("td");

      td.innerText = value;
      tr.append(td);
    }
    btnObjs.forEach((btn) => {
      const button = document.createElement("button");
      button.classList.add(btn.class);
      button.innerText = btn.text;
      button.addEventListener("click", btn.callback);
      tr.append(button);
    });
    table.append(tr);
  });
}
function editRow(event) {
  const rowchildren = event.target.parentElement.children;
  for (let i = 1; i < 8; i++) {
    rowchildren[i].setAttribute("contenteditable", true);
  }
}
function deleteRow(event) {
  const parent = event.target.parentElement;
  const id = parent.children[0].innerText;
  students = students.filter((student) => student.id !== id);
  updateTable();
}
function cancelEdit(event) {
  const rowchildren = event.target.parentElement.children;
  for (let i = 1; i < 8; i++) {
    rowchildren[i].setAttribute("contenteditable", false);
  }
  updateTable();
}
function confirmEdit(event) {
  const rowchildren = event.target.parentElement.children;
  let ID = rowchildren[0];
  for (let i = 1; i < 8; i++) {
    rowchildren[i].setAttribute("contenteditable", false);
  }
}
