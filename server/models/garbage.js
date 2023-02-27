const mongoose = require("mongoose");

const OSchemaDefinition = {
    title: String, 
    artist: String,
};

const OSchemaOptions = { timeStamps: true };

const schema = new mongoose.Schema(OSchemaDefinition, OSchemaOptions);

const GarbageModel = mongoose.model("garbage", schema);

module.exports = GarbageModel;