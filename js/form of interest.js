const today = new Date().toISOString().split('T')[0];
document.getElementById('eventDate').setAttribute('min', today);

const timeFrom = document.getElementById('timeFrom');
const timeTo = document.getElementById('timeTo');

function validateTimes() {
    if (timeFrom.value && timeTo.value && timeFrom.value >= timeTo.value) {
        timeTo.setCustomValidity('Η ώρα λήξης πρέπει να είναι μετά την ώρα έναρξης.');
    } else {
        timeTo.setCustomValidity('');
    }
}

timeFrom.addEventListener('change', validateTimes);
timeTo.addEventListener('change', validateTimes);

document.getElementById('eventForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    alert('Το αίτημά σας στάλθηκε με επιτυχία!');
});