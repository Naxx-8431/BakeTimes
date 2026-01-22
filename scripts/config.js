const CONFIG = {
    // API_BASE_URL: 'http://localhost:5000' // Local Development
    API_BASE_URL: 'https://baketimes.onrender.com' // Production (Update this after backend deployment)
};

// Auto-detect environment (optional, but good for hybrid setups)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    CONFIG.API_BASE_URL = 'http://localhost:5000';
}
