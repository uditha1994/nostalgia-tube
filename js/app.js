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
        this.elements.selectedDateDisplay.textContent = selectedDate
    },

    showLoading: function () {
        this.elements.lodingContainer.style.display = 'flex';
        this.elements.noResults.style.display = 'flex';
        this.elements.timesection.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    UI.init();
});