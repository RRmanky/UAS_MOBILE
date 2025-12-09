document.addEventListener('DOMContentLoaded', function() {
    const apiUrlInput = document.getElementById('apiUrl');
    const createForm = document.getElementById('createForm');
    const getAllBtn = document.getElementById('getAllBtn');
    const getStatsBtn = document.getElementById('getStatsBtn');
    const getByIdBtn = document.getElementById('getByIdBtn');
    const updateBtn = document.getElementById('updateBtn');
    const eventIdInput = document.getElementById('eventId');
    const updateIdInput = document.getElementById('updateId');
    const responseSection = document.getElementById('responseSection');
    const responseOutput = document.getElementById('responseOutput');

    const apiUrl = () => apiUrlInput.value;

    // Fungsi untuk tampilkan response
    function showResponse(data, status = 'success') {
        responseOutput.textContent = JSON.stringify(data, null, 2);
        responseSection.style.display = 'block';
        responseSection.className = `response-section ${status}`;
    }

    // Fungsi untuk hide response
    function hideResponse() {
        responseSection.style.display = 'none';
    }

    // Create Event (POST)
    createForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = {
            name: document.getElementById('eventName').value,
            date: document.getElementById('eventDate').value,
            time: document.getElementById('eventTime').value,
            location: document.getElementById('eventLocation').value,
            description: document.getElementById('eventDesc').value
        };

        try {
            const response = await fetch(apiUrl(), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            showResponse(data, response.ok ? 'success' : 'error');
            if (response.ok) createForm.reset();
        } catch (error) {
            showResponse({ error: error.message }, 'error');
        }
    });

    // Get All Events (GET)
    getAllBtn.addEventListener('click', async () => {
        try {
            const response = await fetch(apiUrl());
            const data = await response.json();
            showResponse(data);
        } catch (error) {
            showResponse({ error: error.message }, 'error');
        }
    });

    // Get Statistics (GET /stats)
    getStatsBtn.addEventListener('click', async () => {
        try {
            const response = await fetch(`${apiUrl()}?action=stats`); // Asumsi endpoint stats
            const data = await response.json();
            showResponse(data);
        } catch (error) {
            showResponse({ error: error.message }, 'error');
        }
    });

    // Get by ID (GET ?id=)
    getByIdBtn.addEventListener('click', async () => {
        const id = eventIdInput.value;
        if (!id) return alert('Enter Event ID');
        try {
            const response = await fetch(`${apiUrl()}?id=${id}`);
            const data = await response.json();
            showResponse(data);
        } catch (error) {
            showResponse({ error: error.message }, 'error');
        }
    });

    // Update Event (PUT)
    updateBtn.addEventListener('click', async () => {
        const id = updateIdInput.value;
        if (!id) return alert('Enter Event ID');
        // Ambil data dari form create (bisa di-modify untuk update form terpisah)
        const formData = {
            name: document.getElementById('eventName').value,
            date: document.getElementById('eventDate').value,
            time: document.getElementById('eventTime').value,
            location: document.getElementById('eventLocation').value,
            description: document.getElementById('eventDesc').value
        };

        try {
            const response = await fetch(`${apiUrl()}?id=${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            showResponse(data, response.ok ? 'success' : 'error');
        } catch (error) {
            showResponse({ error: error.message }, 'error');
        }
    });
});
