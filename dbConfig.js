const { connect } = require("mongoose");
const dbName = "dunder_ipsums";
const dbURI = `mongodb://localhost/${dbName}`;

connect(dbURI);
