import https from 'https';

const SUPABASE_URL = 'https://oawszfvwgpzpreublqag.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hd3N6ZnZ3Z3B6cHJldWJscWFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4OTQwNjIsImV4cCI6MjA4MzQ3MDA2Mn0.1gMvzfB1ZnUxti6CyWmBav9DX6vlVKuGZ9DjWOZn3eo';

const options = {
  hostname: 'oawszfvwgpzpreublqag.supabase.co',
  path: '/rest/v1/?apikey=' + SUPABASE_KEY,
  method: 'GET',
  headers: {
    'apikey': SUPABASE_KEY,
    'Authorization': 'Bearer ' + SUPABASE_KEY
  }
};

https.get(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log(data);
  });
}).on('error', (err) => {
  console.error(err);
});
