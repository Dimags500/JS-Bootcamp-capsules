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
  const students = responseArr.map((response) => response.data);
  return students;
};
const students = getData();
let studentsFiltered = students;
studentsFiltered = students.filter((student) => student.age > 18);
studentsFiltered = studentsFiltered.filter((student) =>
  student.name.includes("")
);
