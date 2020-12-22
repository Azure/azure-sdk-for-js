/*
  Copyright (c) Microsoft Corporation.
  Licensed under the MIT license.

  This sample demonstrates how we can integrate with
  various Azure SDKs in an electron application.
*/
import { ipcRenderer } from "electron";
import { UIManager } from "./UIManager";

import { IPC_MESSAGES, MSAL_CONFIG } from "./Constants";
import { ServiceBusClient } from "@azure/service-bus";
import { AuthorizationCodeCredential } from "@azure/identity";
import { getEnvironmentVariable } from "./utils";
import dotenv from "dotenv";
import { BlobHandler } from "./blobHandler";

dotenv.config();

const uiManager = new UIManager();
let blobHandler: BlobHandler | undefined;
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
  blobHandler = new BlobHandler(authCredential);
  uiManager.showLoggedIn();
};

// Handle the Upload Blob click event by creating a new Blob and
// uploading it to Azure Blob Storage
const onUploadBlobClick = async () => {
  let blobName = getEnvironmentVariable("BLOB_NAME");
  await blobHandler.uploadFile(blobName, `File uploaded at ${new Date()}`);
  uiManager.showBlobContents("Uploaded!");
};

// Handle the Fetch Blob click event by fetching a given Blob.
const onFetchBlobClick = async () => {
  uiManager.showBlobContents("Fetch blob...");
  let blobName = getEnvironmentVariable("BLOB_NAME");
  const text = await blobHandler.downloadFileContents(blobName);
  uiManager.showBlobContents(text || "No blob has been uploaded!");
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

document.querySelector("#upload-blob").addEventListener("click", onUploadBlobClick);

document.querySelector("#fetch-blob").addEventListener("click", onFetchBlobClick);

document.querySelector("#send-sb-message").addEventListener("click", onServiceBusClick);

// Main process message subscribers
ipcRenderer.on(IPC_MESSAGES.LOGIN_SUCCESS, onLoginSuccess);
