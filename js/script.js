function toggleLogoutMenu(event) {
    event.stopPropagation(); // Εμποδίζει το κλείσιμο αμέσως μόλις ανοίξει
    const popover = document.getElementById('logout-popover');
    popover.classList.toggle('hidden');
}

function handleLogout() {
    // Ανακατεύθυνση στη σελίδα login
    window.location.href = "../index.html"; 
}

// Κλείσιμο του μενού αν κάνεις κλικ οπουδήποτε αλλού στην οθόνη
document.addEventListener('click', function(event) {
    const popover = document.getElementById('logout-popover');
    const container = document.querySelector('.user-menu-container');
    
    if (popover && !container.contains(event.target)) {
        popover.classList.add('hidden');
    }
});