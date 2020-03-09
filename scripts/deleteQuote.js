const inq = require("inquirer");
const axios = require("axios");
require("dotenv").config();
const { BASE_URI, DB_ADD_ADMIN_KEY } = process.env;

console.log({ DB_ADD_ADMIN_KEY, BASE_URI });
const init = async () => {
  const allQuotes = await API.findAll();

  const quotes = allQuotes.data.map(q => {
    const { quote, character, _id } = q;
    return {
      name: `${character} - ${quote}`,
      value: _id
    };
  });

  const { deleteId } = await inq.prompt([
    {
      message: "Select a question to delete",
      name: "deleteId",
      type: "list",
      choices: quotes
    }
  ]);

  const deleteResponse = await API.delete(deleteId);

  console.log(deleteResponse.data);

  const { another } = await inq.prompt([
    {
      message: "Delete another quote?",
      type: "list",
      name: "another",
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
  findAll: () => axios.get(`${BASE_URI}/api/all`),
  delete: _id =>
    axios({
      url: `${BASE_URI}/api/ipsum`,
      method: "DELETE",
      headers: {
        Authorization: DB_ADD_ADMIN_KEY
      },
      data: { _id }
    })
};

init();
