/**
 * date manupulation and formating utility functions
 */

const DateUtils = {

    /**
     * Format a date obj to readable string
     * @param {Date} date - the date to format 
     * @returns {string} Formatted date string (October 2025)
     */
    formatDateForDisplay: function (date) {
        const options = { month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    },

    /**
     * Format a date for API queries
     * @param {Date} date - date for the format
     * @returns {string} - Formated date string
     */
    formatDateForQuery: function (date) {
        const options = { month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    },

    /**
     * Get the start and end dates for month
     * @param {Date} date - the date to get month range
     * @returns {Object} Object containing start and end dates
     */
    getMonthRange: function (date) {
        const year = date.getFullYear();
        const month = date.getMonth();

        //first day of month
        const startDate = new Date(year, month, 1);
        //first day of month
        const endDate = new Date(year, month + 1, 0);

        return { start: startDate, end: endDate };
    },

    /**
     * Formate a date in ISO format for API requests (yyyyMMdd)
     * @param {Date} date - The date to formate
     * @returns {string}
     */
    formatDateISO: function (date) {
        return date.toISOString();
    },

    /**
     * Validate a date
     * @param {Date} date - the date to validate
     * @returns {boolean} Whether the date is valid
     */
    isValidDate: function (date) {
        const youtubeStartDate = new Date('2005-02-14');
        const today = new Date();

        return date >= youtubeStartDate && date <= today;
    }

};