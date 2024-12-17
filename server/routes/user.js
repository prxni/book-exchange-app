const express = require('express');
const router = express.Router();

const { authenticate,} = require('../utils')
const User = require('../models/user')

router.get('/',authenticate, (req, res) => {
    const id = res.user.id
    User.findById(id)
    .then(result => {
        res.status(200).json({ id, username: result.username, name: result.name })
    })
    .catch(err => res.status(400).json(err))
});

module.exports = router;
