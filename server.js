const path = require('path');
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);

// Render .html files from the public folder upon request.
app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 3000;;

server.listen(port, () => console.log(`server listening on port ${port}`));