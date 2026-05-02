let currentDate = new Date(2026, 4, 1); // Μάιος 2026

function renderCalendar() {
    const grid = document.getElementById('calendarGrid');
    const monthDisplay = document.getElementById('monthDisplay');
    grid.innerHTML = '';

    const monthNames = ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"];
    monthDisplay.innerText = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

    // Βρίσκουμε την πρώτη μέρα του μήνα
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    // Προσαρμογή γιατί το getDay() ξεκινάει από Κυριακή (0)
    let startOffset = firstDay === 0 ? 6 : firstDay - 1;

    // 1. Κενά για τις μέρες του προηγούμενου μήνα
    for (let i = 0; i < startOffset; i++) {
        grid.innerHTML += `<div class="col calendar-day" style="opacity:0.2"></div>`;
    }

    // 2. Οι μέρες του μήνα
    for (let day = 1; day <= daysInMonth; day++) {
        let eventHtml = (day === 10) ? `<span class="event-tag">GreenPlanet Event</span>` : '';
        grid.innerHTML += `
            <div class="col calendar-day" style="flex: 0 0 14.28%;">
                <span class="day-number">${day}</span>
                ${eventHtml}
            </div>`;
    }
}

function changeMonth(diff) {
    currentDate.setMonth(currentDate.getMonth() + diff);
    renderCalendar();
}

renderCalendar();σ