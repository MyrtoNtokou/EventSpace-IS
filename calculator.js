// Μορφοποίηση Ημερομηνίας ΗΗ/ΜΜ/ΕΕΕΕ
document.getElementById('eventDate').addEventListener('input', function (e) {
    let v = e.target.value.replace(/\D/g, '').slice(0, 8);
    if (v.length >= 5) v = v.slice(0, 2) + '/' + v.slice(2, 4) + '/' + v.slice(4);
    else if (v.length >= 3) v = v.slice(0, 2) + '/' + v.slice(2);
    e.target.value = v;
});

// Μορφοποίηση Ώρας 00:00
function formatTime(id) {
    const element = document.getElementById(id);
    if (element) {
        element.addEventListener('input', function (e) {
            let v = e.target.value.replace(/\D/g, '').slice(0, 4);
            if (v.length >= 3) v = v.slice(0, 2) + ':' + v.slice(2);
            e.target.value = v;
        });
    }
}

formatTime('startTime');
formatTime('endTime');

// Λειτουργία κουμπιού
function calculateOffer() {
    const event = document.getElementById('eventSelect').value;
    if(!event) {
        alert("Παρακαλώ επιλέξτε μια εκδήλωση πρώτα!");
        return;
    }
    console.log("Έναρξη υπολογισμού για: " + event);
    alert("Η διαδικασία υπολογισμού ξεκίνησε επιτυχώς!");
}