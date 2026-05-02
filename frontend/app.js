fetch('https://YOUR-BACKEND.onrender.com/api/hello')
  .then(res => res.json())
  .then(data => {
    document.getElementById('message').textContent = data.message;
  });