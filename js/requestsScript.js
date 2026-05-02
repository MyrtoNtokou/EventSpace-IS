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
    document.getElementById('det-kids-service').disabled = true; // Κλειδώνει το τικ[cite: 5]

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
    // 1. Εντοπίζουμε την κάρτα που είναι επιλεγμένη (έχει την κλάση .selected)
    const selectedCard = document.querySelector('.card.selected');
    
    if (!selectedCard) {
        alert("Παρακαλώ επιλέξτε πρώτα ένα αίτημα.");
        return;
    }

    // 2. Εμφάνιση μηνύματος ανάλογα με το status
    if (status === 'accepted') {
        alert("Το αίτημα εγκρίθηκε επιτυχώς!");
    } else if (status === 'rejected') {
        alert("Το αίτημα απορρίφθηκε.");
    }

    // 3. Εφέ εξασθένισης και αφαίρεση από τη λίστα
    selectedCard.style.transition = "all 0.4s ease";
    selectedCard.style.opacity = "0";
    selectedCard.style.transform = "translateX(-20px)";

    // Περιμένουμε να τελειώσει το εφέ (400ms) και μετά το αφαιρούμε τελείως
    setTimeout(() => {
        selectedCard.remove();
        
        // 4. Επαναφέρουμε το δεξί πάνελ στην αρχική "κενή" κατάσταση
        document.getElementById('details-content').classList.add('hidden');
        document.getElementById('empty-state').classList.remove('hidden');
        
        // Προαιρετικά: Έλεγχος αν η λίστα έμεινε άδεια
        const remainingCards = document.querySelectorAll('.card');
        if (remainingCards.length === 0) {
            document.getElementById('request-list').innerHTML = 
                '<p style="text-align:center; padding:20px; opacity:0.5;">Δεν υπάρχουν άλλα αιτήματα.</p>';
        }
    }, 400);
}