/**
 * API handling for Toutube Data API v3
 */

const YouTubeAPI = {
    API_KEY: 'AIzaSyBVPl-f4v77kLXko-_6YTEgh7waib_41As',

    BASE_URL: 'https://www.googleapis.com/youtube/v3',

    /**
     * Search for videos based on query and date range
     * @param {string} query - the search query
     * @param {Date} publishedAfter - start date for search
     * @param {Date} publishedBefore - End date for search
     */
    searchVideos: async function (query, publishedAfter, publishedBefore) {
        try {
            const afterDate = publishedAfter;
            const beforeDate = publishedBefore;

            //Build URL with query parameters
            const url = new URL(`${this.BASE_URL}/search`);
            url.searchParams.append('part', 'snippet');
            url.searchParams.append('maxResult', '10');
            url.searchParams.append('q', query);
            url.searchParams.append('type', 'video');
            url.searchParams.append('publishedAfter', afterDate);
            url.searchParams.append('publishedBefore', beforeDate);
            url.searchParams.append('key', this.API_KEY);

            //Fetch data from API
            const response = await fetch(url);
            const data = await response.json();

            if (data.error) {
                throw new Error(data.error.message);
            }
            return data.items || [];
        } catch (error) {
            console.error('Error searching videos:',error);
            throw error;
        }
    },

    getVideoDetails: async function,

    generateQueriesForDate:,

    searchVideoByDate:
    }