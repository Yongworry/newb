const mongoose = require("mongoose");

const OSchemaDefinition = {
    code: String, 
    name: String,
};

const OSchemaOptions = { timeStamps: true };

const schema = new mongoose.Schema(OSchemaDefinition, OSchemaOptions);

const LoginModel = mongoose.model("login", schema);

module.exports = LoginModel;