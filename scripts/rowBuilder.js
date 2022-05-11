export function rowBuilder(data, table) {
  data.forEach((item) => {
    let tr = document.createElement("tr");

    for (value of Object.values(item)) {
      let td = document.createElement("td");

      td.innerHTML = value;
      tr.append(td);
    }
    table.append(tr);
  });
}
