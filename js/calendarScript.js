let currentDate = new Date();

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
        grid.innerHTML += `<div class="calendar-day empty"></div>`;
    }

    // 2. Οι μέρες του μήνα
    for (let day = 1; day <= daysInMonth; day++) {
        const today = new Date();
        const isToday = day === today.getDate() && 
                        currentDate.getMonth() === today.getMonth() && 
                        currentDate.getFullYear() === today.getFullYear();

        let todayClass = isToday ? 'today-circle' : '';
        let eventHtml = (day === 10) ? `<span class="event-tag">GreenPlanet Event</span>` : '';

        grid.innerHTML += `
            <div class="calendar-day" onclick="openEventModal(${day}, '${eventHtml ? 'GreenPlanet' : ''}')">
                <span class="day-number ${todayClass}">${day}</span>
                ${eventHtml}
            </div>`;
    }
}

function changeMonth(diff) {
    currentDate.setMonth(currentDate.getMonth() + diff);
    renderCalendar();
}

renderCalendar();

function goToToday() {
    // Επαναφέρει την ημερομηνία στο "τώρα"
    currentDate = new Date();
    // Ξανασχεδιάζει το ημερολόγιο για να δείξει τον τρέχοντα μήνα
    renderCalendar();
}

function openEventModal(day, existingEvent) {
    const modal = document.getElementById('eventModal');
    const form = document.getElementById('eventForm');
    
    modal.classList.remove('hidden');
    form.reset(); // Καθαρίζει όλα τα inputs και τα checkboxes
    
    document.getElementById('eventDate').value = `${day}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    
    if (existingEvent) {
        document.getElementById('modalTitle').innerText = "Στοιχεία: " + existingEvent;
        // Εδώ στο μέλλον θα φορτώνεις τα δεδομένα του GreenPlanet
    } else {
        document.getElementById('modalTitle').innerText = "Νέα Κράτηση";
    }
}

function closeModal() {
    document.getElementById('eventModal').classList.add('hidden');
}

// Κλείσιμο αν πατήσει έξω από το modal
window.onclick = function(event) {
    const modal = document.getElementById('eventModal');
    if (event.target == modal) closeModal();
}
