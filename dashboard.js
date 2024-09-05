document.addEventListener('DOMContentLoaded', function() {
    renderTrackedAuctions();
});

function renderTrackedAuctions() {
    const trackedAuctions = JSON.parse(localStorage.getItem('trackedAuctions') || '[]');
    const container = document.getElementById('trackedAuctionsContainer');
    
    if (trackedAuctions.length === 0) {
        container.innerHTML = '<p>You are not tracking any auctions.</p>';
        return;
    }

    container.innerHTML = trackedAuctions.map(auction => `
        <div class="tracked-auction" data-auction-id="${auction.id}">
            <img src="${auction.image}" alt="${auction.name}">
            <h3>${auction.name}</h3>
            <p>Current Price: ${auction.currentPrice}</p>
            <p>Time Left: ${auction.timeLeft}</p>
            <p>Leader: ${auction.leader}</p>
            <button class="btn untrack-auction" onclick="untrackAuction('${auction.id}')">Untrack Auction</button>
        </div>
    `).join('');
}

function untrackAuction(auctionId) {
    let trackedAuctions = JSON.parse(localStorage.getItem('trackedAuctions') || '[]');
    trackedAuctions = trackedAuctions.filter(auction => auction.id !== auctionId);
    localStorage.setItem('trackedAuctions', JSON.stringify(trackedAuctions));
    renderTrackedAuctions();
    notificationSystem.success('Auction untracked successfully!');
}