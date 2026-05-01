const months = [
    "Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος",
    "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος",
    "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"
];

let currentDate = new Date();

function renderCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    document.getElementById("monthYear").innerText =
        months[month] + " " + year;

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const tbody = document.getElementById("calendarBody");
    tbody.innerHTML = "";

    let row = document.createElement("tr");

    for (let i = 0; i < firstDay; i++) {
        row.appendChild(document.createElement("td"));
    }

    for (let day = 1; day <= lastDate; day++) {
        if ((row.children.length) % 7 === 0) {
            tbody.appendChild(row);
            row = document.createElement("tr");
        }

        let cell = document.createElement("td");
        cell.innerText = day;

        const today = new Date();
        if (
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {
            cell.style.background = "#0056b3";
            cell.style.color = "white";
            cell.style.borderRadius = "50%";
        }

        row.appendChild(cell);
    }

    tbody.appendChild(row);
}

function changeMonth(step) {
    currentDate.setMonth(currentDate.getMonth() + step);
    renderCalendar(currentDate);
}

renderCalendar(currentDate);