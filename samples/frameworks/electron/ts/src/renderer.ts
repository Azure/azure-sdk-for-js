import { ipcRenderer } from "electron";
import { UIManager } from "./UIManager";

import { IPC_MESSAGES } from "./Constants";
import { BlobServiceClient } from "@azure/storage-blob";
import { ServiceBusClient } from "@azure/service-bus";
import { AuthorizationCodeCredential } from "@azure/identity";
import { msalConfig } from "./AuthProvider";
import * as logger from "@azure/logger";
import { getEnvironmentVariable } from "./utils";
import dotenv from "dotenv";

dotenv.config();

const uiManager = new UIManager();

let authCredential: AuthorizationCodeCredential;
logger.setLogLevel("verbose");

// Event handlers implementation
const onLoginSuccess = (_e: Electron.IpcRendererEvent, authCode: string) => {
  authCredential = new AuthorizationCodeCredential(
    msalConfig.tenantId,
    msalConfig.clientId,
    authCode,
    msalConfig.redirectUri
  );
  uiManager.showLoggedIn();
};

const onFetchBlobClick = async () => {
  uiManager.showBlobContents("Fetch blob...");
  if (!authCredential) {
    throw new Error("Auth service never completed!");
  }
  const blobUri = getEnvironmentVariable("BLOB_URI");
  let client = new BlobServiceClient(blobUri, authCredential);
  let container = client.getContainerClient("todos");
  let blob = container.getBlobClient("todo.txt");
  let bits = await blob.downloadToBuffer();
  uiManager.showBlobContents(bits.toString());
};

const onServiceBusClick = async () => {
  uiManager.showServicebusMessage("Sending...");
  if (!authCredential) {
    throw new Error("Auth service never completed!");
  }

  let serviceBusNamespace = getEnvironmentVariable("SERVICE_BUS_NAMESPACE");
  let serviceBusQueue = getEnvironmentVariable("SERVICE_BUS_QUEUE");
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
  console.log(messages);
  uiManager.showServicebusMessage(messages.map((m) => m.body).join("<br />"));
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
