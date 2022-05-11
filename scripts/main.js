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
// change fillter
let fillterSelected = "firstName";
const select = document.querySelector("#sort-options");
select.addEventListener("change", changefillter);
function changefillter(event) {
  const value = event.target.value;
  fillterSelected = value;
  studentsFiltered = students;
  rowBuilder(students, document.getElementById("data-table"));
}

// fillter
const filterData = (event) => {
  if (event.target.value !== "" && event.target.value)
    studentsFiltered = students.filter((student) =>
      student[fillterSelected]
        .toString()
        .includes(event.target.value.toLowerCase())
    );
  else studentsFiltered = students;
  rowBuilder(studentsFiltered, document.getElementById("data-table"));
};
// search
document.addEventListener("input", filterData);
// table
function rowBuilder(data, table) {
  table.innerText = "";
  table.append(header);
  data.forEach((item) => {
    let tr = document.createElement("tr");
    tr.classList.add("row");
    for (value of Object.values(item)) {
      let td = document.createElement("td");

      td.innerText = value;
      tr.append(td);
    }
    table.append(tr);
  });
}
