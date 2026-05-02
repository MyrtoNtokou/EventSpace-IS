//Επιλέξαμε να μη βάλουμε περαιτέρω περιορισμούς αναφορικά με το Login των χρηστών, καθώς η εργασία μας θα παρουσιαστεί στο φοιτητικό
// συνέδριο και λόγω του περιορισμένου χρόνου του session θα θέλαμε να τη δουν οσο το δυνατόν περισσότερα άτομα απρόσκοπτα, χωρίς να εισάγουν
//σωστά διαπιστευτήρια.

function checkLogin() {
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();

    if (user === "" || pass === "") {
        alert("Παρακαλώ συμπληρώστε και το Username και το Password!");
    } else {
        window.location.href = "homepage.html";
    }
}