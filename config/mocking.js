module.exports = function() {
    function getRandom(max) {
        return Math.floor(Math.random() * max);
    }

    const timestamp = 1588680000;
    let readings = [];
    const clients = 10;
    
    for(let i = 0; i < 24; i++) {
        for(let j = 0; j < clients; j++) {
            
            readings.push({
                clientId : j,
                timestamp : timestamp + 3600 * i,
                value : getRandom(100)
            });
        }
    }
    return readings;
};
