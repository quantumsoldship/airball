const players = [
    { name: "John Doe", location: "New York", score: 30, details: "John has played 5 games." },
    { name: "Jane Smith", location: "Los Angeles", score: 45, details: "Jane has played 6 games." },
    // Add more players as needed
];

function loadPlayers() {
    const playerList = document.getElementById("player-list");
    players.forEach(player => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><a href="#" onclick="showDetails('${player.name}')">${player.name}</a></td>
            <td>${player.location}</td>
            <td>${player.score}</td>
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

// Load players on page load
window.onload = loadPlayers;
