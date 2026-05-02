function updateDashboardDate() {
    const dateElement = document.getElementById('current-date-display');
    if (!dateElement) return;

    const now = new Date();
    
    // Επιλογές για τη μορφοποίηση (π.χ. 2 Μαΐου 2024)
    const options = { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    };

    // Μετατροπή σε ελληνική μορφή
    const formattedDate = now.toLocaleDateString('el-GR', options);
    
    dateElement.innerText = formattedDate;
}

// Εκτέλεση της συνάρτησης όταν φορτώσει η σελίδα
document.addEventListener('DOMContentLoaded', updateDashboardDate);