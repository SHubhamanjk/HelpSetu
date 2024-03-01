document.getElementById("upload_location").addEventListener("click", function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        uploadLiveLocation(latitude, longitude);
      }, error => {
        console.error('Error getting location:', error);
        alert('Error getting location. Please try again.');
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
      alert('Geolocation is not supported by this browser.');
    }
  });

  function uploadLiveLocation(latitude, longitude) {
    const url = '/api/live-location';
    const data = { latitude, longitude };
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Live location uploaded successfully:', data);
      alert('Live location uploaded successfully.');
    })
    .catch(error => {
      console.error('Error uploading live location:', error);
      alert('Error uploading live location. Please try again.');
    });
  }