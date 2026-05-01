let activeId = null;

function openRequest(id, companyName, type, date, time, phone, subDate, subTime, email, guests, kids, contactPerson, description) {
    // 1. Εμφάνιση του δεξιού πλαισίου
    document.getElementById('empty-state').classList.add('hidden');
    document.getElementById('details-content').classList.remove('hidden');

    // 2. Ενημέρωση των στοιχείων Φορέα
    document.getElementById('det-name').innerText = companyName; // Το όνομα της εταιρείας πάνω-πάνω
    document.getElementById('det-type').innerText = type;
    document.getElementById('det-sub-time').innerText = "Υποβολή: " + subDate + " " + subTime;

    // 3. Ημερομηνία & Ώρα
    document.getElementById('det-date').innerText = date;
    document.getElementById('det-time').innerText = time;

    // 4. Άτομα & Checkbox
    document.getElementById('det-guests').innerText = guests;
    document.getElementById('det-kids-service').checked = kids;

    // 5. Περιεχόμενο (Οι δύο προτάσεις)
    document.getElementById('det-content').innerText = description; // Εδώ μπαίνει το μεγάλο κείμενο[cite: 3]

    // 6. Στοιχεία Επικοινωνίας (Το όνομα του ανθρώπου)
    document.getElementById('det-fullname').innerText = contactPerson; // Το ονοματεπώνυμο υπευθύνου[cite: 3]
    document.getElementById('det-phone').innerText = phone;
    document.getElementById('det-email').innerText = email;

    // 7. Διαχείριση "Selected" κλάσης στις κάρτες
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
