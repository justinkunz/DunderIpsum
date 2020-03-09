const inq = require("inquirer");
const axios = require("axios");
require("dotenv").config();
const { BASE_URI, DB_ADD_ADMIN_KEY } = process.env;

/**
 * Script to add a quote
 */
const init = async () => {
  const currentChars = await API.currentChars();
  const answers = await inq.prompt([
    {
      message: "Quote to add to database",
      name: "quote"
    },
    {
      message: "NSFW or SFW",
      name: "NSFW",
      type: "list",
      choices: [
        { name: "SFW", value: false },
        { name: "NSFW", value: true }
      ]
    },
    {
      message: "Character",
      name: "character",
      type: "list",
      choices: [...currentChars.data, "New"]
    }
  ]);

  if (answers.character === "New") {
    let { newChar } = await inq.prompt([
      {
        message: "Please enter new Characters Name",
        name: "newChar"
      }
    ]);
    answers.character = newChar;
  }

  const posted = await API.postQuote(answers);

  console.log(posted.data);

  const { another } = await inq.prompt([
    {
      message: "Add another quote?",
      name: "another",
      type: "list",
      choices: [
        { name: "Yes", value: true },
        { name: "No", value: false }
      ]
    }
  ]);

  if (another) init();
  return;
};

const API = {
  currentChars: () => axios.get(`${BASE_URI}/api/characters`),
  postQuote: quote =>
    axios({
      url: `${BASE_URI}/api/new`,
      method: "POST",
      data: quote,
      headers: {
        Authorization: DB_ADD_ADMIN_KEY
      }
    })
};

init();
