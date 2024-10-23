const players = [
    { name: "John Doe", location: "New York", score: 30, details: "John has played 5 games." },
    { name: "Jane Smith", location: "Los Angeles", score: 45, details: "Jane has played 6 games." },
];

function loadPlayers() {
    const playerList = document.getElementById("player-list");
    playerList.innerHTML = ''; // Clear existing players
    players.forEach((player, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><a href="#" onclick="showDetails('${player.name}')">${player.name}</a></td>
            <td>${player.location}</td>
            <td>${player.score}</td>
            <td>
                <button onclick="editPlayer(${index})">Edit</button>
                <button onclick="deletePlayer(${index})">Delete</button>
            </td>
        `;
        playerList.appendChild(row);
    });
}

function showDetails(name) {
    const player = players.find(p => p.name === name);
    const detailsContent = document.getElementById("details-content");
    detailsContent.innerHTML = `Name: ${player.name}<br>Location: ${player.location}<br>Score: ${player.score}<br>Details: ${player.details}`;
    document.getElementById("player-details").style.display = "block";
}

function closeDetails() {
    document.getElementById("player-details").style.display = "none";
}

function openControlPanel() {
    document.getElementById("control-panel").style.display = "block";
}

function checkPassword() {
    const password = document.getElementById("password").value;
    if (password === 'airball.game.1234') {
        document.getElementById("admin-controls").style.display = "block";
    } else {
        alert("Incorrect password!");
    }
}

function exitControl() {
    document.getElementById("control-panel").style.display = "none";
}

function addPlayer() {
    const name = document.getElementById("name").value;
    const location = document.getElementById("location").value;
    const score = parseInt(document.getElementById("score").value);
    if (name && location && !isNaN(score)) {
        players.push({ name, location, score, details: "" });
        loadPlayers();
        clearInputFields();
    } else {
        alert("Please fill all fields correctly.");
    }
}

function clearInputFields() {
    document.getElementById("name").value = '';
    document.getElementById("location").value = '';
    document.getElementById("score").value = '';
}

function editPlayer(index) {
    const player = players[index];
    document.getElementById("name").value = player.name;
    document.getElementById("location").value = player.location;
    document.getElementById("score").value = player.score;
    deletePlayer(index);
}

function deletePlayer(index) {
    players.splice(index, 1);
    loadPlayers();
}

function uploadCSV() {
    const fileInput = document.getElementById("file-input");
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const text = e.target.result;
            const rows = text.split("\n").slice(1); // Skip header
            rows.forEach(row => {
                const [name, location, score] = row.split(",");
                if (name && location && score) {
                    players.push({ name, location, score: parseInt(score), details: "" });
                }
            });
            loadPlayers();
        };
        reader.readAsText(file);
    } else {
        alert("Please select a CSV file.");
    }
}

// Load players on page load
window.onload = loadPlayers;
