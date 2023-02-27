const express = require('express');
const router = express.Router();


const RankDB = require('../db/rank');
const GarbageDB = require('../db/garbage');



const rankDBInst = RankDB.getInst();
const garbageDBInst = GarbageDB.getInst();

router.get('/getSong', async(req,res) => {
    const dbRes = await rankDBInst.showSong();
    try{
        if (dbRes.success) return res.status(200).json( dbRes.data );
        else return res.status(500).json({error: dbRes.data});
    }   catch(e) {
        return res.status(500).json({error:e});
    }
});


router.get('/searchSong', async(req,res) => {
    const requestSearch = (req.query.search);
    const requestMode = (req.query.mode);
    const dbRes = await rankDBInst.searchSong(requestSearch, requestMode);
    try{
        if (dbRes.success) return res.status(200).json( dbRes.songData );
        else return res.status(500).json({error: dbRes.songData});
    }   catch(e) {
        return res.status(500).json({error:e});
    }
});


router.post('/addSong', async(req, res) => {
    try {
        const {artist, title} = req.body;
        const addResult = await rankDBInst.insertSong({artist, title});
        if (addResult) return res.status(200).json({ isAdded: true });
        else return res.status(500).json({error:dbRes.data});
    }   catch(e) {
        return res.status(500).json({error:e});
    }
});

router.post('/deleteSong', async(req, res) => {
    try {
        const {artist, title} = req.body;
        const deleteResult = await rankDBInst.deleteSong({artist, title});
        if (deleteResult) return res.status(200).json({ isDeleted: true });
        else return res.status(500).json({error:dbRes.data});
    }   catch(e) {
        return res.status(500).json({error:e});
    }
});


//여기부터 휴지통
router.get('/getGarbage', async(req,res) => {
    const dbRes = await garbageDBInst.showGarbage();
    try{
        if (dbRes.success) return res.status(200).json( dbRes.data );
        else return res.status(500).json({error: dbRes.data});
    }   catch(e) {
        return res.status(500).json({error:e});
    }
});

router.get('/searchGarbage', async(req,res) => {
    const requestSearch = (req.query.search);
    const requestMode = (req.query.mode);
    const dbRes = await garbageDBInst.searchGarbage(requestSearch, requestMode);
    try{
        if (dbRes.success) return res.status(200).json( dbRes.songData );
        else return res.status(500).json({error: dbRes.songdata});
    }   catch(e) {
        return res.status(500).json({error:e});
    }
});

router.post('/deleteGarbage', async(req, res) => {
    try {
        const {artist, title} = req.body;
        const deleteResult = await garbageDBInst.deleteGarbage({artist, title});
        if (deleteResult) return res.status(200).json({ isDeleted: true });
        else return res.status(500).json({error:dbRes.data});
    }   catch(e) {
        return res.status(500).json({error:e});
    }
});

router.post('/gotoGarbage', async(req, res) => {
    try {
        const {artist, title} = req.body;
        const deleteResult = await rankDBInst.deleteSong({artist, title});
        const addResult = await garbageDBInst.insertGarbage({artist, title});
        if (deleteResult && addResult) return res.status(200).json({ isTransfered: true });
        else return res.status(500).json({error:dbRes.data});
    }   catch(e) {
        return res.status(500).json({error:e});
    }
});

router.post('/recoverSong', async(req, res) => {
    try {
        const {artist, title} = req.body;
        const deleteResult = await garbageDBInst.deleteGarbage({artist, title});
        const addResult = await rankDBInst.insertSong({artist, title});
        if (deleteResult && addResult) return res.status(200).json({ isTransfered: true });
        else return res.status(500).json({error:dbRes.data});
    }   catch(e) {
        return res.status(500).json({error:e});
    }
});



module.exports = router;