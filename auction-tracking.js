// Function to toggle tracking of an auction
function toggleTrackedAuction(auctionId, auctionName, currentPrice, image, timeLeft, leader) {
    let trackedAuctions = JSON.parse(localStorage.getItem('trackedAuctions') || '[]');
    const index = trackedAuctions.findIndex(auction => auction.id === auctionId);
    
    if (index === -1 && auctionId && auctionName && currentPrice && image && timeLeft && leader) {
        // Track the auction
        trackedAuctions.push({ 
            id: auctionId, 
            name: auctionName, 
            currentPrice: currentPrice,
            image: image,
            timeLeft: timeLeft,
            leader: leader
        });
        showConfirmation(`Auction "${auctionName}" has been tracked.`);
    } else if (index !== -1) {
        // Untrack the auction
        trackedAuctions.splice(index, 1);
        showConfirmation(`Auction "${auctionName}" has been untracked.`);
    }
    
    localStorage.setItem('trackedAuctions', JSON.stringify(trackedAuctions));
    updateTrackButtons();
    if (typeof renderTrackedAuctions === 'function') {
        renderTrackedAuctions();
    }
}

// Function to update track buttons across all pages
function updateTrackButtons() {
    const trackButtons = document.querySelectorAll('.btn-track');
    const trackedAuctions = JSON.parse(localStorage.getItem('trackedAuctions') || '[]');
    
    trackButtons.forEach(button => {
        const auctionId = button.getAttribute('data-auction-id');
        const isTracked = trackedAuctions.some(auction => auction.id === auctionId);
        button.textContent = isTracked ? 'Untrack Auction' : 'Track Auction';
        button.classList.toggle('btn-untrack', isTracked);
        button.classList.toggle('btn-track', !isTracked);
    });
}

// Function to show confirmation message
function showConfirmation(message) {
    const confirmationElement = document.createElement('div');
    confirmationElement.className = 'confirmation-message';
    confirmationElement.textContent = message;
    document.body.appendChild(confirmationElement);
    setTimeout(() => {
        confirmationElement.remove();
    }, 3000);
}

// Initialize tracking functionality
document.addEventListener('DOMContentLoaded', function() {
    const trackButtons = document.querySelectorAll('.btn-track');
    
    trackButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const auctionId = this.getAttribute('data-auction-id');
            const auctionItem = this.closest('.auction-item');
            const auctionName = auctionItem.querySelector('h3').textContent;
            const currentPrice = auctionItem.querySelector('.price').textContent;
            const image = auctionItem.querySelector('img').src;
            const timeLeft = auctionItem.querySelector('.time-left').textContent;
            const leader = auctionItem.querySelector('.leader').textContent.replace('Leader: ', '');
            
            toggleTrackedAuction(auctionId, auctionName, currentPrice, image, timeLeft, leader);
        });
    });

    updateTrackButtons();
});
