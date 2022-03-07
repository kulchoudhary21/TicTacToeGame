const show = async () => {
  const response = await fetch("http://127.0.0.1:5000/results");
  const records = await response.json();
  let table = document.getElementById("myTable");
  let i = 1;
  if (!(records == null)) {
    for (let j = Object.values(records).length - 1; j >= 0; j--) {
      let row = table.insertRow();
      const cell = row.insertCell();
      cell.innerHTML = i;
      for (let item in Object.values(records)[j]) {
        const cell = row.insertCell();
        cell.innerHTML = Object.values(records)[j][item];
      }
      i++;
    }
  }
};
show();
