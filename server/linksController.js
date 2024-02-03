const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const linksDataPath = path.join(__dirname, './data/links.json');
const getData = () => {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  };
// Helper function to read links data
const readLinksData = () => {
    const linksData = fs.readFileSync(linksDataPath);
    return JSON.parse(linksData);
};

// GET all links
router.get('/', (req, res) => {
    const links = readLinksData();
    res.json(links);
});

// More routes (POST, PUT, DELETE) for managing links
// ...

module.exports = router;
