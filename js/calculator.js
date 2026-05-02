document.getElementById('eventDate').addEventListener('input', function (e) {
    let v = e.target.value.replace(/\D/g, '').slice(0, 8);

    if (v.length >= 1 && parseInt(v[0]) > 3) {
        v = "";
    }
    if (v.length >= 2) {
        let day = parseInt(v.slice(0, 2));
        if (day > 31 || day === 0) {
            v = v.slice(0, 1);
        }
    }

    if (v.length >= 3 && parseInt(v[2]) > 1) {
        v = v.slice(0, 2);
    }
    if (v.length >= 4) {
        let month = parseInt(v.slice(2, 4));
        if (month > 12 || month === 0) {
            v = v.slice(0, 3);
        }
    }

    if (v.length >= 5) {
        v = v.slice(0, 2) + '/' + v.slice(2, 4) + '/' + v.slice(4);
    } else if (v.length >= 3) {
        v = v.slice(0, 2) + '/' + v.slice(2);
    }
    
    e.target.value = v;
});

function formatTime(id) {
    const element = document.getElementById(id);
    if (element) {
        element.addEventListener('input', function (e) {
            let cursorColor = e.target.selectionStart;
            let rawValue = e.target.value.replace(/\D/g, '');
            let v = rawValue.slice(0, 4);

            if (v.length >= 1 && parseInt(v[0]) > 2) {
                v = "";
            }

            if (v.length >= 2) {
                let hours = parseInt(v.slice(0, 2));
                if (hours > 23) {
                    v = v.slice(0, 1);
                }
            }

            if (v.length >= 3 && parseInt(v[2]) > 5) {
                v = v.slice(0, 2);
            }

            if (v.length >= 3) {
                v = v.slice(0, 2) + ':' + v.slice(2);
            }
            
            e.target.value = v;
        });
    }
}
formatTime('startTime');
formatTime('endTime');


function calculateOffer() {
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    const orgType = document.getElementById('orgType').value;
    const resultField = document.getElementById('finalAmount');

    if (!startTime || !endTime) {
        alert("Παρακαλώ συμπληρώστε την ώρα έναρξης και λήξης.");
        return;
    }

    function timeToDecimal(time) {
        const [hours, minutes] = time.split(':').map(Number);
        return hours + (minutes / 60);
    }

    const start = timeToDecimal(startTime);
    const end = timeToDecimal(endTime);

    let duration = end - start;
    if (duration < 0) duration += 24; 

    if (duration === 0) {
        alert("Η ώρα λήξης δεν μπορεί να είναι ίδια με την ώρα έναρξης.");
        return;
    }

    let hourlyRate = 120;

    if (orgType === "ΜΚΟ") {
        hourlyRate = 100;
    } else if (orgType === "Corporate") {
        hourlyRate = 150;
    }

    const totalAmount = duration * hourlyRate;
    resultField.value = totalAmount.toFixed(2) + " €";
}

const eventData = {
    "Event 1": {
        date: "15/06/2024",
        start: "10:00",
        end: "14:00",
        org: "Corporate",
        community: true,
        miny: false
    },
    "Event 2": {
        date: "20/07/2024",
        start: "18:00",
        end: "21:00",
        org: "ΜΚΟ",
        community: false,
        miny: true
    }
};

document.getElementById('eventSelect').addEventListener('change', function() {
    const selectedEvent = this.value;
    const data = eventData[selectedEvent];

    if (data) {
        document.getElementById('eventDate').value = data.date;
        document.getElementById('startTime').value = data.start;
        document.getElementById('endTime').value = data.end;
        document.getElementById('orgType').value = data.org;
        document.getElementById('communityPartner').checked = data.community;
        document.getElementById('minyHub').checked = data.miny;
        document.getElementById('finalAmount').value = "";
    }
    
    if (data) {
        document.getElementById('eventDate').value = data.date;
        document.getElementById('startTime').value = data.start;
        document.getElementById('endTime').value = data.end;
        document.getElementById('orgType').value = data.org;
        document.getElementById('communityPartner').checked = data.community;
        document.getElementById('minyHub').checked = data.miny;
    }
});