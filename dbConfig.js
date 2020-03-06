const { connect } = require("mongoose");
const dbURI = process.env.MONGODB_URI;

connect(dbURI);
