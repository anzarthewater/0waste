fetch('https://zerowaste-backend-wlls.onrender.com/api/hello')
  .then(res => res.json())
  .then(data => {
    document.getElementById('message').textContent = data.message;
  });

