/*
  Copyright (c) Microsoft Corporation.
  Licensed under the MIT license.

  This sample demonstrates how we can integrate with
  various Azure SDKs in an electron application.
*/
import { ipcRenderer } from "electron";
import { UIManager } from "./UIManager";

import { IPC_MESSAGES, MSAL_CONFIG } from "./Constants";
import { BlobServiceClient } from "@azure/storage-blob";
import { ServiceBusClient } from "@azure/service-bus";
import { AuthorizationCodeCredential } from "@azure/identity";
import { getEnvironmentVariable } from "./utils";
import dotenv from "dotenv";

dotenv.config();

const uiManager = new UIManager();

let authCredential: AuthorizationCodeCredential;

// The main process will publish an authorization code to be used with the
// AuthorizationCodeCredential to authenticate with various Azure services.
// The renderer process will receive this code and construct an AuthorizationCodeCredential
// object to be used when making service calls.
// For more information about the AuthorizationCodeCredential and the authorization
// code flow please see https://docs.microsoft.com/en-us/javascript/api/@azure/identity/authorizationcodecredential
const onLoginSuccess = (_e: Electron.IpcRendererEvent, authCode: string) => {
  authCredential = new AuthorizationCodeCredential(
    MSAL_CONFIG.tenantId,
    MSAL_CONFIG.clientId,
    authCode,
    MSAL_CONFIG.redirectUri
  );
  uiManager.showLoggedIn();
};

// Handle the Fetch Blob click event by creating a new Azure Blob Storage
// client and fetching a given Blob.
const onFetchBlobClick = async () => {
  uiManager.showBlobContents("Fetch blob...");
  if (!authCredential) {
    throw new Error("Auth service never completed!");
  }
  const blobUri = getEnvironmentVariable("BLOB_URI");
  const blobContainer = getEnvironmentVariable("BLOB_CONTAINER");
  const blobName = getEnvironmentVariable("BLOB_NAME");

  // We can pass our existing AuthorizationCodeCredential to have
  // the BlobServiceClient automatically convert it to tokens when
  // making requests.
  let client = new BlobServiceClient(blobUri, authCredential);
  let container = client.getContainerClient(blobContainer);
  let blob = container.getBlobClient(blobName);
  let bits = await blob.downloadToBuffer();
  uiManager.showBlobContents(bits.toString());
};

// Handle the Send Service Bus Message click event by creating a new
// producer and consumer for Azure Service Bus, publishing a message
// and then fetching it to be displayed in the UI
const onServiceBusClick = async () => {
  if (!authCredential) {
    throw new Error("Auth service never completed!");
  }
  let serviceBusNamespace = getEnvironmentVariable("SERVICE_BUS_NAMESPACE");
  let serviceBusQueue = getEnvironmentVariable("SERVICE_BUS_QUEUE");

  uiManager.showServicebusMessage("Sending...");

  // We can reuse our existing AuthorizationCodeCredential to have
  // the ServiceBusClient automatically convert it to tokens when
  // making requests.
  let client = new ServiceBusClient(serviceBusNamespace, authCredential);

  let sender = client.createSender(serviceBusQueue);
  await sender.sendMessages({
    body: `Hello, world! ${new Date()}`
  });

  uiManager.showServicebusMessage("Checking for messages...");

  let receiver = client.createReceiver(serviceBusQueue, {
    receiveMode: "receiveAndDelete"
  });

  let messages = await receiver.receiveMessages(1);

  uiManager.showServicebusMessage(messages.map((m) => m.body).join("<br />"));

  sender.close();
  receiver.close();
};

// UI event handlers
document.querySelector("#sign-in").addEventListener("click", () => {
  ipcRenderer.send(IPC_MESSAGES.LOGIN);
});

document.querySelector("#sign-out").addEventListener("click", () => {
  ipcRenderer.send(IPC_MESSAGES.LOGOUT);
  uiManager.showLoggedOut();
});

document.querySelector("#fetch-blob").addEventListener("click", onFetchBlobClick);

document.querySelector("#send-sb-message").addEventListener("click", onServiceBusClick);

// Main process message subscribers
ipcRenderer.on(IPC_MESSAGES.LOGIN_SUCCESS, onLoginSuccess);
