const GarbageModel = require('../models/garbage');

class GarbageDB {
    static _inst_;
    static getInst = () => {
        if ( !GarbageDB._inst_ ) GarbageDB._inst_ = new GarbageDB();
        return GarbageDB._inst_;
    }

    constructor() {console.log("GarbageDB Init Completed")};


    showGarbage = async () => {
        try {
            const res = await GarbageModel.find();
            return { success:true, data: res };
        } catch(e) {
            console.log( `garbageDB show Error: ${e}`);
            return { success: false, data: `garbageDB Error - ${e}`};
        } 
    }

    searchGarbage = async ( search, mode ) => {
        try {
            let OSearchFilter = {};
            if (search !== ""){
                if (mode === "title"){
                    OSearchFilter = {title:search};
                }   else {
                    OSearchFilter = {artist:search};
                }
                
            }
            const res = await GarbageModel.find(OSearchFilter).exec();
            return { success: true, songData: res };
        } catch(e) {
            console.log( `garbageDB show Error: ${e}`);
            return { success: false, songData: `garbageDB Error - ${e}`};
        } 
    }
    

    insertGarbage = async( song ) => {
        const { artist, title } = song;
        try {
            const OFindFilter = { title: title, artist: artist };
            const isDuplicated = await GarbageModel.findOne(OFindFilter);
            if (isDuplicated !== null) {
                console.log("Existing Song!");
            }   else {
                const newSong = new GarbageModel({title,artist});
                const res = await newSong.save();
            }
            return true;
        }   catch(e) {
            console.log(`GarbageDB Insert Error: ${e}`);
            return false;
        }
    }

    deleteGarbage = async(song) => {
        const { artist, title } = song;
        try {
            const OFindFilter = { title: title, artist: artist };
            const isDeleted = await GarbageModel.deleteOne(OFindFilter);
            if (isDeleted) {
                console.log("garbageDB Deletion complete!");
                return true;
            }   else {
                console.log("garbageDB Deletion Error");
                return false;
            }
        }   catch(e) {
            console.log(`garbageDB Deletion Error: ${e}`);
            return false;
        }
    }
}

module.exports = GarbageDB;