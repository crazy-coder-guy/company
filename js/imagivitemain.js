
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById("location").innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    reverseGeocode(lat, lon);
}

function reverseGeocode(lat, lon) {
    const api_url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=5&addressdetails=1`;

    fetch(api_url)
        .then(response => response.json())
        .then(data => {
            const country = data.address.country || "Location unavailable";
            document.getElementById("location").innerHTML = country;
        })
        .catch(error => {
            document.getElementById("location").innerHTML = "Location unavailable.";
        });
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById("location").innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById("location").innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            document.getElementById("location").innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById("location").innerHTML = "An unknown error occurred.";
            break;
    }
}

// Call the function to get the user's location
getLocation();
