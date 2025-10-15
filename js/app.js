/**
 * Main application manupulation logics
 */
const App = {

    //Store application data
    data: {
        videos: []
    },

    init: function () {
        console.log('initialize nostalgia tube....')
    },

    fetchVideosForDate: async function (date) {
        try {
            //to fetch videos use YoutubeAPI from api.js 
            const videos = await YouTubeAPI.searchVideoByDate(date);

            //store videos in app data
            this.data.videos = videos;

            //Display videos in UI
            UI.displayVideos(videos);

        } catch (error) {
            console.error('Error fetching videos:', error);
            UI.elements.noResults.style.display = 'block';
            UI.hideLoading();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    UI.init();
    App.init();
});