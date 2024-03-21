// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ManagedIdentityCredential } from "@azure/identity";
import { BlobServiceClient } from "@azure/storage-blob";
import * as dotenv from "dotenv";
// Initialize the environment
dotenv.config();

async function main(): Promise<void> {
    let systemSuccessMessage = "";
    try{
      const account1 = process.env.IDENTITY_STORAGE_NAME_1;
      const account2 = process.env.IDENTITY_STORAGE_NAME_2;
      const credentialSystemAssigned = new ManagedIdentityCredential();
      const credentialUserAssigned = new ManagedIdentityCredential({clientId: process.env.IDENTITY_USER_DEFINED_IDENTITY_CLIENT_ID})
      const client1 = new BlobServiceClient(`https://${account1}.blob.core.windows.net`, credentialSystemAssigned);
      const client2 = new BlobServiceClient(`https://${account2}.blob.core.windows.net`, credentialUserAssigned);
      let iter = client1.listContainers();
      
     let i = 1;
     console.log("Client with system assigned identity");
     let containerItem = await iter.next();
      while (!containerItem.done) {
        console.log(`Container ${i++}: ${containerItem.value.name}`);
        containerItem = await iter.next();
      }   
      systemSuccessMessage = "Successfully acquired token with system-assigned ManagedIdentityCredential"
      console.log("Client with user assigned identity")
      iter = client2.listContainers();
      i = 1;
      containerItem = await iter.next();
       while (!containerItem.done) {
         console.log(`Container ${i++}: ${containerItem.value.name}`);
         containerItem = await iter.next();
       }
       console.log("Successfully acquired tokens with async ManagedIdentityCredential")
    }
    catch(e){
      console.error(`${e} \n ${systemSuccessMessage}`);
    }
  }
  
  main().catch((err) => {
    console.log("error code: ", err.code);
    console.log("error message: ", err.message);
    console.log("error stack: ", err.stack);
  });
