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
};
let students = [];
getData();
let studentsFiltered = students;

// change fillter
let fillterSelected = "firstName";
const select = document.querySelector("#sort-options");
select.addEventListener("change", changefillter);
function changefillter(event) {
  const value = event.target.value;
  fillterSelected = value;
}

// fillter
const filterData = (event) => {
  if (event.target.value)
    studentsFiltered = students.filter((student) =>
      student[fillterSelected]
        .toString()
        .includes(event.target.value.toLowerCase())
    );
  console.log(studentsFiltered);
};
// search
document.addEventListener("input", filterData);
// table
function rowBuilder(data, table) {
  data.forEach((item) => {
    let tr = document.createElement("tr");
    tr.classList.add("row");
    for (value of Object.values(item)) {
      let td = document.createElement("td");

      td.innerHTML = value;
      tr.append(td);
    }
    table.append(tr);
  });
}
