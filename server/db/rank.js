const RankModel = require('../models/rank');


class RankDB {
    static _inst_;
    static getInst = () => {
        if ( !RankDB._inst_ ) RankDB._inst_ = new RankDB();
        return RankDB._inst_;
    }

    constructor() {console.log("RankDB Init Completed")};

    showSong = async ( ) => {
        try {
            const res = await RankModel.find();
            return { success: true, data: res };
        } catch(e) {
            console.log( `rankDB show Error: ${e}`);
            return { success: false, data: `DB Error - ${e}`};
        } 
    }

    searchSong = async ( search, mode ) => {
        try {
            let OSearchFilter = {};
            if (search !== ""){
                if (mode === "title"){
                    OSearchFilter = {title:search};
                }   else {
                    OSearchFilter = {artist:search};
                }
                
            }
            const res = await RankModel.find(OSearchFilter).exec();
            return { success: true, songData: res };
        } catch(e) {
            console.log( `rankDB search Error: ${e}`);
            return { success: false, songData: `DB Error - ${e}`};
        } 
    }

    insertSong = async( song ) => {
        const { artist, title } = song;
        try {
            const OFindFilter = { title: title, artist: artist };
            const isDuplicated = await RankModel.findOne(OFindFilter);
            if (isDuplicated !== null) {
                console.log("Existing Song!");
            }   else {
                const newSong = new RankModel({title,artist});
                const res = await newSong.save();
            }
            return true;
        }   catch(e) {
            console.log(`RankDB Insert Error: ${e}`);
            return false;
        }
    }

    deleteSong = async(song) => {
        const { artist, title } = song;
        try {
            const OFindFilter = { title: title, artist: artist };
            const isDeleted = await RankModel.deleteOne(OFindFilter);
            if (isDeleted) {
                console.log("ranDB Deletion complete!");
                return true;
            }   else {
                console.log("rankDB Deletion Error");
                return false;
            }
        }   catch(e) {
            console.log(`rankDB Deletion Error: ${e}`);
            return false;
        }
    }
}

module.exports = RankDB;
