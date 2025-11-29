// About Section Scripts
document.addEventListener('DOMContentLoaded', () => {
    // Initialize timeline animations when the page loads
    initializeTimelineAnimations();
});

function initializeTimelineAnimations() {
    // Add animation to timeline items when they come into view
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems.length > 0) {
        // Simple animation on load
        timelineItems.forEach((item, index) => {
            // Add a staggered animation effect
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 300 * index);
        });
    }
}

// Function to handle timeline interactions
function setupTimelineInteractions() {
    const timelineContents = document.querySelectorAll('.timeline-content');
    
    timelineContents.forEach(content => {
        content.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
        
        content.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Call the interaction setup function
setupTimelineInteractions();