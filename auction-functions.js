auction-functions.js

// Global object to store tracked auctions
let trackedAuctions = JSON.parse(localStorage.getItem('trackedAuctions')) || {};

// Toggle tracking status of an auction
function toggleTrackedAuction(auctionId, auctionData) {
    try {
        if (trackedAuctions[auctionId]) {
            delete trackedAuctions[auctionId];
            showConfirmation(`Auction "${auctionData.name}" has been untracked.`);
        } else {
            trackedAuctions[auctionId] = auctionData;
            showConfirmation(`Auction "${auctionData.name}" has been tracked.`);
        }
        localStorage.setItem('trackedAuctions', JSON.stringify(trackedAuctions));
        updateTrackedAuctionsUI();
        return !!trackedAuctions[auctionId];
    } catch (error) {
        console.error('Error toggling tracked auction:', error);
        showConfirmation('An error occurred. Please try again.', 'error');
        return false;
    }
}

// Update the UI elements based on tracked auctions
function updateTrackedAuctionsUI() {
    const buttons = document.querySelectorAll('.track-auction, .btn-track');
    buttons.forEach(button => {
        const auctionId = button.getAttribute('data-auction-id');
        const isTracked = !!trackedAuctions[auctionId];
        button.textContent = isTracked ? 'Untrack Auction' : 'Track Auction';
        button.classList.toggle('tracked', isTracked);
        button.classList.toggle('btn-untrack', isTracked);
        button.classList.toggle('btn-track', !isTracked);
    });
}

// Show a confirmation message
function showConfirmation(message, type = 'success') {
    const existingConfirmation = document.querySelector('.confirmation-message');
    if (existingConfirmation) {
        existingConfirmation.remove();
    }

    const confirmationElement = document.createElement('div');
    confirmationElement.className = `confirmation-message ${type}`;
    confirmationElement.textContent = message;
    document.body.appendChild(confirmationElement);

    setTimeout(() => confirmationElement.remove(), 3000);
}

// Initialize tracking functionality
function initializeTracking() {
    updateTrackedAuctionsUI();
    
    document.addEventListener('click', function(e) {
        if (e.target.matches('.track-auction, .btn-track')) {
            e.preventDefault();
            const auctionItem = e.target.closest('.auction-item');
            const auctionId = e.target.getAttribute('data-auction-id');
            const auctionData = {
                name: auctionItem.querySelector('h3').textContent,
                currentPrice: auctionItem.querySelector('.price, .current-price').textContent,
                image: auctionItem.querySelector('img').src,
                timeLeft: auctionItem.querySelector('.time-left, .countdown').textContent,
                leader: auctionItem.querySelector('.leader, .leader-name').textContent.replace('Leader: ', '')
            };
            toggleTrackedAuction(auctionId, auctionData);
        }
    });
}

// Expose necessary functions to the global scope
window.toggleTrackedAuction = toggleTrackedAuction;
window.updateTrackedAuctionsUI = updateTrackedAuctionsUI;
window.initializeTracking = initializeTracking;

// Initialize when the DOM is ready
document.addEventListener('DOMContentLoaded', initializeTracking);
