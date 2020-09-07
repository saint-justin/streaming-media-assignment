const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const client2 = fs.readFileSync(`${__dirname}/../client/client2.html`);
const client3 = fs.readFileSync(`${__dirname}/../client/client3.html`);

const getClient = (req, res, page) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(page);
  res.end();
};

const getIndex = (req, res) => {
  getClient(req, res, index);
};

const getClient2 = (req, res) => {
  getClient(req, res, client2);
};

const getClient3 = (req, res) => {
  getClient(req, res, client3);
};

module.exports = {
  getIndex,
  getClient2,
  getClient3,
};
