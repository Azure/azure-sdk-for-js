// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
// <disable>JS1001.SyntaxError</disable>

(function () {
    "use strict";
    require('dotenv').config();
    const express = require('express')
    const cors = require('cors');
    const { OpenAIClient } = require("@azure/openai");
    const { ClientSecretCredential } = require("@azure/identity");

    const app = express()
    app.use(express.static('public'))
    app.use(cors());

    const clientId = process.env.AZURE_CLIENT_ID;
    const tenantId  = process.env.AZURE_TENANT_ID;
    const clientSecret = process.env.AZURE_CLIENT_SECRET;
    const endpoint = process.env.AZURE_AOAI_ENDPOINT;
    const deploymentId = process.env.AZURE_AOAI_DEPLOYMENT_ID;
    const maxTokens = 128;
    
    const clientCred = new ClientSecretCredential(
      tenantId,
      clientId,
      clientSecret,
      {});
    const client = new OpenAIClient(new URL(endpoint), clientCred);
      

    app.get('/api/streaming-chat', async function(req, res) {
      const message = req.query.message;
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
        'Connection': 'keep-alive'
      });
      res.flushHeaders(); // flush the headers to establish SSE with client
      const messages = [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Can you help me?" },
        { role: "assistant", content: "Of course! What can I do for you?" },
        { role: "user", content: message },
      ];
      await chat(res, messages);
      res.on('close', () => {
        console.log('client closed connection');
        res.end();
      });
    });

    async function chat(res, messages) {
      const events = await client.listChatCompletions(deploymentId, messages, { maxTokens });
      for await (const event of events) {
        for (const choice of event.choices) {
          const delta = choice.delta?.content;
          if (delta !== undefined) {
            const message = `event: message\ndata: ${JSON.stringify({text: delta, sender: "assistant"})}\n\n`;
            console.log(message);
            res.write(message);
          }
        }
      }
      res.write(`event: end\ndata: stream\n\n`);
    }

    app.listen(3001, () => {
      console.log('Express server is running on localhost:3001');
    });
}());
// </disable>
