const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const discographyDataPath = path.join(__dirname, './data/discography.json');
const getData = () => {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  };

  const getMaxId = (data) => {
    if (data.length === 0) return 0;
    const ids = data.map(item => item.id);
    return Math.max(...ids);
};

// Helper function to read discography data
const readDiscographyData = () => {
    const discographyData = fs.readFileSync(discographyDataPath);
    return JSON.parse(discographyData);
};

// GET all discography entries
router.get('/', (req, res) => {
    const discography = readDiscographyData();
    res.json(discography);
});

router.post('/', (req, res) => {
    const data = getData();
    const newId = getMaxId(data) + 1;
    const newDataEntry = { ...req.body, id: newId };
    data.push(newDataEntry);
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    res.status(201).send(newDataEntry);
});
;
  
  router.put('/:id', (req, res) => {
    const data = getData();
    const index = data.findIndex(entry => entry.id === parseInt(req.params.id));
    if (index !== -1) {
      data[index] = { ...data[index], ...req.body };
      fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
      res.send(data[index]);
    } else {
      res.status(404).send({ message: 'Entry not found' });
    }
  });

  router.delete('/:id', (req, res) => {
    const data = getData();
    const newData = data.filter(entry => entry.id !== parseInt(req.params.id));
    fs.writeFileSync(dataFilePath, JSON.stringify(newData, null, 2));
    res.send({ message: 'Entry deleted' });
  });
  

// More routes (POST, PUT, DELETE) for managing discography
// ...

module.exports = router;