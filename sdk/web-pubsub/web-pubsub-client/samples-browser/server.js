const express = require('express');
const { WebPubSubServiceClient } = require('@azure/web-pubsub');
require('dotenv').config({ path: './sample.env' })

const app = express();
const hubName = 'sample_chat';
const port = 8080;

let connectionString = process.env.WPS_CONNECTION_STRING;
let serviceClient = new WebPubSubServiceClient(connectionString, hubName);

app.get('/negotiate', async (req, res) => {
  let id = req.query.id;
  if (!id) {
    res.status(400).send('missing user id');
    return;
  }
  let token = await serviceClient.getClientAccessToken({ userId: id, roles: ["webpubsub.joinLeaveGroup", "webpubsub.sendToGroup"] });
  res.json({
    url: token.url
  });
});

app.use(express.static('dist'));
app.listen(port, () => console.log(`Event handler listening at http://localhost:${port}/negotiate`));