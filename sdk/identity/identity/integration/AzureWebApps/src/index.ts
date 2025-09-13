// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import express from "express";
import { ManagedIdentityCredential } from "@azure/identity";
import { BlobServiceClient } from "@azure/storage-blob";
import dotenv from "dotenv";
// Initialize the environment
dotenv.config();
const app = express();

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Ok");
});

app.get("/sync", async (req: express.Request, res: express.Response) => {
  let systemSuccessMessage = "";
  try {
    const account1 = process.env.IDENTITY_STORAGE_NAME_1;
    const credentialSystemAssigned = new ManagedIdentityCredential();
    const client1 = new BlobServiceClient(
      `https://${account1}.blob.core.windows.net`,
      credentialSystemAssigned,
    );
    let iter = client1.listContainers();
    let i = 0;
    console.log("Client with system assigned identity");
    let containerItem = await iter.next();
    while (!containerItem.done) {
      console.log(`Container ${i++}: ${containerItem.value.name}`);
      containerItem = await iter.next();
    }
    console.log("Client with system assigned identity");
    console.log("Properties of the 1st client =", iter);
    systemSuccessMessage =
      "Successfully acquired token with system-assigned ManagedIdentityCredential";
    console.log(systemSuccessMessage);
  } catch (e) {
    console.error(e);
  }
  try {
    const accountUserAssigned = process.env.IDENTITY_STORAGE_NAME_USER_ASSIGNED;
    const credentialUserAssigned = new ManagedIdentityCredential({
      clientId: process.env.IDENTITY_USER_DEFINED_CLIENT_ID,
    });
    const clientUserAssigned = new BlobServiceClient(
      `https://${accountUserAssigned}.blob.core.windows.net`,
      credentialUserAssigned,
    );
    let iter = clientUserAssigned.listContainers();
    let i = 0;
    console.log("Client with user assigned identity");
    let containerItem = await iter.next();
    while (!containerItem.done) {
      console.log(`Container ${i++}: ${containerItem.value.name}`);
      containerItem = await iter.next();
    }
    res.status(200).send("Successfully acquired tokens with async ManagedIdentityCredential");
  } catch (e) {
    console.error(e);
    res.status(500).send(`${e} \n ${systemSuccessMessage}`);
  }
});

app.listen(8080, () => {
  console.log(`Authorization code redirect server listening on port 8080`);
});
