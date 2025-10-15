/**
 * UI handling and DOM manipulations
 */
const UI = {
    /**
     * DOM elements 
     */
    elements: {
        datePicker: document.getElementById('date-picker'),
        generateBtn: document.getElementById('generate-btn'),
        resultsSection: document.getElementById('results-section'),
        videosGrid: document.getElementById('videos-grid'),
        selectedDateDisplay: document.getElementById('selected-date-display'),
        loadingContainer: document.getElementById('loading-container'),
        noResults: document.getElementById('no-results'),
        backBtn: document.getElementById('back-btn'),
        filterBtns: document.querySelectorAll('.filter-btn'),
        timeSection: document.querySelector('.time-machine-section'),
        videoModal: document.getElementById('videoModal'),
        videoContainer: document.getElementById('video-container'),
        closeModalBtn: document.getElementById('close-modal-btn')
    },

    /**
     * Initialize UI event listeners
     */
    init: function () {
        // Set date picker limit
        const today = new Date();
        this.elements.datePicker.max = today.toISOString().split('T')[0];

        // Set default date 
        today.setFullYear(today.getFullYear() - 10);
        this.elements.datePicker.value = today.toISOString().split('T')[0];

        // Add events 
        this.elements.generateBtn.addEventListener('click', this.handleGenerateClick.bind(this));
        this.elements.backBtn.addEventListener('click', this.handleBackClick.bind(this));

        // Filter btn events
        this.elements.filterBtns.forEach(btn => {
            btn.addEventListener('click', this.handleFilterClick.bind(this));
        });

        if (this.elements.closeModalBtn) {
            this.elements.closeModalBtn.addEventListener('click', this.closeVideoModal.bind(this));
        }
    },

    /**
     * Handle generate button click
     */
    handleGenerateClick: function () {
        const dateValue = this.elements.datePicker.value;

        if (!dateValue) {
            alert('Please select a date');
            return;
        }

        const selectedDate = new Date(dateValue);

        this.showLoading();
        this.elements.selectedDateDisplay.textContent = this.formatDate(selectedDate);

        // Call the function to fetch videos
        App.fetchVideosForDate(selectedDate);
    },

    formatDate: function (date) {
        const options = { month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    },

    showLoading: function () {
        this.elements.resultsSection.classList.remove('hidden');
        this.elements.timeSection.classList.add('hidden');
        this.elements.loadingContainer.classList.remove('hidden');
        this.elements.videosGrid.classList.add('hidden');
        this.elements.noResults.classList.add('hidden');
    },

    hideLoading: function () {
        this.elements.loadingContainer.classList.add('hidden');
        this.elements.videosGrid.classList.remove('hidden');
    },

    displayVideos: function (videos) {
        this.hideLoading();
        this.elements.videosGrid.innerHTML = '';

        if (!videos || videos.length === 0) {
            this.elements.noResults.classList.remove('hidden');
            return;
        }

        this.elements.noResults.classList.add('hidden');

        videos.forEach(video => {
            const videoCard = this.createVideoCard(video);
            this.elements.videosGrid.appendChild(videoCard);
        });
    },

    createVideoCard: function (video) {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.dataset.videoId = video.id;
        card.dataset.category = video.category || 'all';

        const viewCount = video.statistics ?
            parseInt(video.statistics.viewCount) : 0;
        const formattedViews = this.formatViewCount(viewCount);

        card.innerHTML = `
            <div class="video-thumbnail">
                <img src="${video.snippet.thumbnails.high.url}" 
                alt="${video.snippet.title}"> 
            </div>
            <div class="video-info">
                <h3 class="video-title">${video.snippet.title}</h3>
                <div class="video-meta">
                    <span class="video-channel">${video.snippet.channelTitle}</span>
                    <span class="video-views">👁️ ${formattedViews}</span>
                </div>
            </div>
        `;

        // Add click event to play video
        card.addEventListener('click', () => {
            this.openVideoModal(video.id);
        });

        return card;
    },

    formatViewCount: function (count) {
        if (count >= 1000000) {
            return Math.floor(count / 1000000) + 'M';
        } else if (count >= 1000) {
            return Math.floor(count / 1000) + 'K';
        } else {
            return count.toString();
        }
    },

    openVideoModal: function (videoId) {
        if (!this.elements.videoModal) {
            console.error('Video modal element not found');
            return;
        }

        this.elements.videoContainer.innerHTML = `
            <iframe
                width="100%" height="100%"
                src="https://www.youtube.com/embed/${videoId}?autoplay=1"
                title="NostalgiaTube Player"
                frameborder="0"
                allow="autoplay; clipboard-write; encrypted-media;
                picture-in-picture"
                allowfullscreen
            >
            </iframe>
        `;
        this.elements.videoModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    },

    closeVideoModal: function () {
        if (!this.elements.videoModal) {
            console.error('Video modal element not found');
            return;
        }

        this.elements.videoModal.classList.add('hidden');
        this.elements.videoContainer.innerHTML = '';
        document.body.style.overflow = ''; // Restore scrolling
    },

    handleFilterClick: function (event) {
        const filterBtn = event.target;
        const filter = filterBtn.dataset.filter;

        this.elements.filterBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        filterBtn.classList.add('active');

        this.filterVideos(filter);
    },

    filterVideos: function (filter) {
        const videoCards = this.elements.videosGrid.querySelectorAll('.video-card');

        videoCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    },

    handleBackClick: function () {
        this.elements.resultsSection.classList.add('hidden');
        this.elements.timeSection.classList.remove('hidden');
        this.elements.videosGrid.innerHTML = '';
        this.resetFilters();
    },

    resetFilters: function () {
        this.elements.filterBtns.forEach(btn => { // Fixed reference here
            btn.classList.remove('active');
            if (btn.dataset.filter === 'all') {
                btn.classList.add('active');
            }
        });
    }
};