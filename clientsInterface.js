const MONTHS = ['Ιανουάριος','Φεβρουάριος','Μάρτιος','Απρίλιος','Μάιος','Ιούνιος',
                'Ιούλιος','Αύγουστος','Σεπτέμβριος','Οκτώβριος','Νοέμβριος','Δεκέμβριος'];

const today = new Date();
let year = today.getFullYear();
let month = today.getMonth();
let selectedDate = null;  // αποθηκεύει την επιλεγμένη ημερομηνία

function generateAvailableDays(year, month) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => i + 1)
            .filter(() => Math.random() > 0.5);
}

//σελίδα φόρμας κράτησης
const FORM_URL = 'form.html';

function renderCalendar() {
  document.getElementById('calMonth').textContent = `${MONTHS[month]} ${year}`;
  const grid = document.getElementById('daysGrid');
  grid.innerHTML = '';

  const firstDay = new Date(year, month, 1).getDay();
  const offset = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const available = generateAvailableDays(year, month);

  for (let i = 0; i < offset; i++) {
    const el = document.createElement('div');
    el.className = 'day empty';
    grid.appendChild(el);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const el = document.createElement('div');
    el.textContent = d;

    const date = new Date(year, month, d);
    const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const isAvailable = !isPast && available.includes(d);

    if (isAvailable) {
      el.className = 'day available';
      el.onclick = () => selectDate(d, month, year, el);
    } else {
      el.className = 'day unavailable';
    }

    grid.appendChild(el);
  }
}

function selectDate(day, m, y, el) {
  // Καθαρισμός προηγούμενης επιλογής
  document.querySelectorAll('.day.selected').forEach(e => e.classList.remove('selected'));
  // Προσθήκη της νέας επιλογής
  el.classList.add('selected');
  selectedDate = { day, month: m, year: y };

  // Ενημέρωση του label και ενεργοποίηση του κουμπιού
  const label = document.getElementById('selectedDateLabel');
  label.textContent = `Επιλεγμένη ημερομηνία: ${day} ${MONTHS[m]} ${y}`;
  label.classList.remove('text-muted');
  label.classList.add('text-success', 'fw-bold');

  document.getElementById('continueBtn').disabled = false;
}

function goToForm() {
  if (!selectedDate) return;
  const dateStr = `${selectedDate.day} ${MONTHS[selectedDate.month]} ${selectedDate.year}`;
  window.open(`${FORM_URL}?date=${encodeURIComponent(dateStr)}`, '_blank');
}

function changeMonth(dir) {
  month += dir;
  if (month > 11) { month = 0; year++; }
  if (month < 0)  { month = 11; year--; }
  selectedDate = null;
  document.getElementById('continueBtn').disabled = true;
  const label = document.getElementById('selectedDateLabel');
  label.textContent = 'Επιλέξτε μια διαθέσιμη ημερομηνία';
  label.classList.add('text-muted');
  label.classList.remove('text-success', 'fw-bold');
  renderCalendar();
}

renderCalendar();