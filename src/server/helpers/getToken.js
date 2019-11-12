const fetch = require('cross-fetch');

const secret =
  'NjEwNWRmODYyZTY1NDYxMTg5ZjIwMTUxNDE0NWQyZjM6ZmQwN2EyMjBlZDUzNDdkNzlhNzMzMWU2OGZiMTVjMGI=';

async function getToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${secret}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    mode: 'cors',
    body: 'grant_type=client_credentials',
  });
  return response.json();
}

module.exports = getToken;
