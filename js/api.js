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
            console.error('Error searching videos:', error);
            throw error;
        }
    },

    /**
     * Get detailed information about specific videos
     * @param {Array} videoIds - Array of video Ids
     */
    getVideoDetails: async function (videoIds) {
        try {
            if (!videoIds.length) return [];

            //Build URL with parameters
            const url = new URL(`${this.BASE_URL}/videos`);
            url.searchParams.append('part', 'snippet,statistics,contentDetails');
            url.searchParams.append('id', videoIds.join(','));
            url.searchParams.append('key', this.API_KEY);

            const response = await fetch(url);
            const data = await response.json();

            if (data.error) {
                throw new Error(data.error.message);
            }
            return data.items || [];

        } catch (error) {
            console.error('Error getting video details:', error);
            throw error;
        }
    },

    // generateQueriesForDate: async function (date) {
    //     return {
    //         music: `top songs `
    //     }
    //  },

    /**
     * Search for videos across multiple categories for a 
     * specific date
     * @param {Date} date - the date to search
     */
    searchVideoByDate: async function (date) {
        try {
            const dateRange = date;
            const queries = date;

            const searchPromises = Object.entries(queries)
                .map(async ([category, query]) => {
                    const results = await this.searchVideos
                        (query, dateRange.start, dateRange.end);

                    const videoIds = results.map(item => item.id.videoId);

                    //get detailed information about videos
                    let videoDetails = [];
                    if (videoIds.length > 0) {
                        videoDetails = await this.getVideoDetails(videoIds);
                    }

                    //add category to each video
                    return videoDetails.map(video => ({
                        ...video,
                        category
                    }));
                });
            const results = await Promise.all(searchPromises);

            return results;
        } catch (error) {
            console.error('Error searching videos by date:', error);
            throw error;
        }
    }
}