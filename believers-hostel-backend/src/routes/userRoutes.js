const express = require('express');
const router = express.Router();

// Temporary response
router.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Get all users - coming soon' 
  });
});

router.get('/:id', (req, res) => {
  res.json({ 
    success: true, 
    message: `Get user ${req.params.id} - coming soon` 
  });
});

router.put('/:id', (req, res) => {
  res.json({ 
    success: true, 
    message: `Update user ${req.params.id} - coming soon` 
  });
});

router.delete('/:id', (req, res) => {
  res.json({ 
    success: true, 
    message: `Delete user ${req.params.id} - coming soon` 
  });
});

module.exports = router;
