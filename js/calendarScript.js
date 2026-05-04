let currentDate = new Date();

const myEvents = {
    10: "GreenPlanet",
    25: "BrightStep AE",
    15: "GlobalTech",
    5: "EcoVibe Org",
    12: "SolarSystems Ltd",
    20: "Urban Design Co"
};

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
        
        let fakeEventDays = [5, 10, 12, 15, 18, 20, 25];
        let hasEvent = fakeEventDays.includes(day);
 
        let eventTitle = myEvents[day] || ""; 

        let yellowDays = [5, 12, 20];
        let colorClass = yellowDays.includes(day) ? 'event-tag event-yellow' : 'event-tag';

        let eventHtml = eventTitle ? `<span class="${colorClass}">${eventTitle}</span>` : '';

        grid.innerHTML += `
            <div class="calendar-day" onclick="openEventModal(${day}, '${eventTitle}')">
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
    const footer = modal.querySelector('.modal-footer');
    const submitBtn = form.querySelector('.btn-primary'); // Το κουμπί Αποθήκευση
    
    modal.classList.remove('hidden');
    form.reset(); 
    
    // Θέτουμε την ημερομηνία
    document.getElementById('eventDate').value = `${day}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    
    const oldExtraBtn = document.getElementById('extraYellowBtn');
    if (oldExtraBtn) oldExtraBtn.remove();

    if (existingEvent) {
        document.getElementById('modalTitle').innerText = "Στοιχεία Εκδήλωσης";
        
        // Γεμίζουμε με ψεύτικα στοιχεία αναπαράστασης
        document.getElementById('providerName').value = existingEvent;
        document.getElementById('providerType').value = "mko";
        document.getElementById('timeFrom').value = "10:00 - 14:00";
        document.getElementById('peopleCount').value = "45";
        document.getElementById('contactName').value = "Μαρία Παπαδοπούλου";
        document.getElementById('contactPhone').value = "2101234567";
        document.getElementById('contactEmail').value = "info@eventspace.gr";
        
        // Επιλογή τυχαίων checkboxes/radios για την αναπαράσταση
        document.getElementById('childCare').checked = true;
        form.querySelector('input[name="layout"][value="theatrical"]').checked = true;
        form.querySelectorAll('.details-column input[type="checkbox"]')[1].checked = true;

        const yellowDays = [5, 12, 20];
        if (yellowDays.includes(day)) {
            const extraBtn = document.createElement('button');
            extraBtn.type = 'button';
            extraBtn.id = 'extraYellowBtn';
            extraBtn.className = 'btn-extra';
            extraBtn.innerText = 'Οριστικοποίηση';
            extraBtn.onclick = () => alert('Το στάδιο της προσφοράρς έχει ολοκληρωθεί.');
            
            footer.insertBefore(extraBtn, footer.firstChild);
        }

        toggleFields(form, false);
        submitBtn.style.display = 'inline-block'; // Κρύβουμε το κουμπί αποθήκευσης
    } else {
        document.getElementById('modalTitle').innerText = "Νέα Κράτηση";
        
        // Ξεκλειδώνουμε τα πεδία για τη νέα κράτηση
        toggleFields(form, false);
        submitBtn.style.display = 'inline-block'; // Εμφανίζουμε το κουμπί
    }
}

// Βοηθητική συνάρτηση για κλείδωμα/ξεκλείδωμα πεδίων
function toggleFields(form, isReadOnly) {
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        if (input.id !== 'eventDate') { // Η ημερομηνία είναι πάντα readonly στο modal σας
            input.disabled = isReadOnly;
        }
    });
}

function closeModal() {
    document.getElementById('eventModal').classList.add('hidden');
}

// Κλείσιμο αν πατήσει έξω από το modal
window.onclick = function(event) {
    const modal = document.getElementById('eventModal');
    if (event.target == modal) closeModal();
}

