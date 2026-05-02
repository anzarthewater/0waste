fetch('https://zerowaste-backend-wlls.onrender.com')
  .then(res => res.json())
  .then(data => {
    document.getElementById('message').textContent = data.message;
  });

