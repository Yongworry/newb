const mongoose = require("mongoose");

const OSchemaDefinition = {
    title: String, 
    artist: String,
};

const OSchemaOptions = { timeStamps: true };

const schema = new mongoose.Schema(OSchemaDefinition, OSchemaOptions);

const RankModel = mongoose.model("feed", schema);

module.exports = RankModel;