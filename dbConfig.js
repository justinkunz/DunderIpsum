const { MONGOD_URI } = process.env;

const { connect } = require("mongoose");
const dbName = "dunder_ipsums";
const dbURI = MONGOD_URI || `mongodb://localhost/${dbName}`;

connect(dbURI);
