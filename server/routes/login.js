const express = require('express');
const router = express.Router();


const loginDB = require('../db/login');

const loginDBInst = loginDB.getInst();

router.post('/login', async(req,res) => {
    const {code} = req.body;
    const dbRes = await loginDBInst.login(code);
    try{
        return res.status(200).json( dbRes.data );
    }   catch(e) {
        return res.status(500).json({error:e});
    }
});

module.exports = router;