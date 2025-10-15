/**
 * UI handling and DOM manipulations
 */
const UI = {
    /**
     * DOM element 
     */
    elements: {
        datePicker: document.getElementById('date-picker'),
        generateBtn: document.getElementById('generate-btn'),
        resultsSection: document.getElementById('results-section'),
        videosGrid: document.getElementById('videos-grid'),
        selectedDateDisplay: document.getElementById('selected-date-display'),
        lodingContainer: document.getElementById('loading-container'),
        noResults: document.getElementById('no-results'),
        backBtn: document.getElementById('back-btn'),
        filterBtns: document.querySelectorAll('.filter-btn'),
        timesection: document.querySelector('.time-machine-section')
    },

    /**
     * Initialize UI event listeners
     */
    init: function () {
        //set date picker linit
        const today = new Date();
        this.elements.datePicker.max = today.toISOString().split('T')[0];

        //set default date 
        today.setFullYear(today.getFullYear() - 10);
        this.elements.datePicker.value = today.toISOString().split('T')[0];

        //add event 
        this.elements.generateBtn.addEventListener('click', this.handleGenerateClick.bind(this));
    },

    /**
     * Handle generate button click
     */
    handleGenerateClick: function () {
        const dateValue = this.elements.datePicker.value;

        if (!dateValue) {
            console.log('please select a date');
            return;
        }

        const selectedDate = new Date(dateValue);

        this.showLoading();
        this.elements.selectedDateDisplay.textContent = this.formatDate(selectedDate);

        //call the function to fetch videos
        App.fetchVideosForDate(selectedDate);
    },

    formatDate: function (date) {
        const options = { month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    },

    showLoading: function () {
        this.elements.lodingContainer.style.display = 'flex';
        this.elements.resultsSection.style.display = 'flex';
        this.elements.timesection.style.display = 'none';
        this.elements.videosGrid.style.display = 'none';
    },

    hideLoading: function () {
        this.elements.lodingContainer.style.display = 'none';
        this.elements.videosGrid.style.display = 'grid';
    },

    displayVideos: function (videos) {
        this.hideLoading();
        this.elements.videosGrid.innerHTML = '';

        if (!videos || videos.length === 0) {
            this.elements.noResults.style.display = 'block';
        }

        this.elements.noResults.style.display = 'none';

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

        card.innerHTML = `
            <div class="video-thumbnail">
                <img src="${video.snippet.thumbnail.high.url}" 
                alt="${video.snippet.title}"> 
            </div>
            <div class="video-info">
                <h3 class="video-title">${video.snippet.title}</h3>
                <div class="video-meta">
                    <span class="video-channel">${video.snippet.channelTitle}</span>
                    <span class="video-views">${video.statistics.viewCount}</span>
                </div>
            </div>
        `;

        return card;
    }
}