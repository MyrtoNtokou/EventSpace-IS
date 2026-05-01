let activeId = null;

function openRequest(id, name, type, date, time, phone, subD, subT, email, guests, hasKids) {
    activeId = id;
    
    // Εμφάνιση περιεχομένου
    document.getElementById('empty-state').classList.add('hidden');
    document.getElementById('details-content').classList.remove('hidden');

    // Βασικά Στοιχεία
    document.getElementById('det-name').innerText = name;
    document.getElementById('det-fullname').innerText = name; // Ονοματεπώνυμο στην επικοινωνία
    document.getElementById('det-type').innerText = type;
    document.getElementById('det-date').innerText = date;
    document.getElementById('det-time').innerText = time;
    document.getElementById('det-sub-time').innerText = "Υποβολή: " + subD + " " + subT;

    // Νέα Στοιχεία
    document.getElementById('det-phone').innerText = phone;
    document.getElementById('det-email').innerText = email;
    document.getElementById('det-guests').innerText = guests;
    document.getElementById('det-kids-service').checked = hasKids;

    // Highlight επιλεγμένης κάρτας
    document.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));
    document.getElementById(id).classList.add('selected');
}

function removeReq(event, id) {
    if(event) event.stopPropagation();
    document.getElementById(id).remove();
    if(activeId === id) {
        activeId = null;
        document.getElementById('details-content').classList.add('hidden');
        document.getElementById('empty-state').classList.remove('hidden');
    }
}

function handleFinalize(status) {
    if (!activeId) return;

    const message = status === 'accepted' 
        ? "Το αίτημα καταχωρήθηκε στο ημερολόγιο με επιτυχία!" 
        : "Το αίτημα διαγράφηκε από την λίστα.";

    // Εμφάνιση μηνύματος στον χρήστη
    alert(message);

    // Διαγραφή του αιτήματος από τη λίστα
    removeReq(null, activeId);
}
