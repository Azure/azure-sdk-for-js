// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import { RemoteRenderingClient } from "../src/index.js";
import {
  ClientSecretCredential,
  DefaultAzureCredential,
  DeviceCodeCredential,
} from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";
import { randomUUID } from "node:crypto";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_KeyCredential", async () => {
    const accountDomain = "<account domain>";
    const accountId = "<account ID>";
    const accountKey = "<account key>";
    const serviceEndpoint = "<serviceEndpoint>";
    // @ts-preserve-whitespace
    const credential = new AzureKeyCredential(accountKey);
    const client = new RemoteRenderingClient(serviceEndpoint, accountId, accountDomain, credential);
  });

  it("ReadmeSampleCreateClient_DeviceCodeCredential", async () => {
    const accountDomain = "<account domain>";
    const accountId = "<account ID>";
    const serviceEndpoint = "<serviceEndpoint>";
    const tenantId = "<tenant ID>";
    const clientId = "<client ID>";
    // @ts-preserve-whitespace
    const userPromptCallback = (deviceCodeInfo) => {
      console.debug(deviceCodeInfo.message);
      console.log(deviceCodeInfo.message);
    };
    // @ts-preserve-whitespace
    const credential = new DeviceCodeCredential({
      tenantId,
      clientId,
      userPromptCallback,
      authorityHost: `https://login.microsoftonline.com/${tenantId}`,
    });
    // @ts-preserve-whitespace
    const client = new RemoteRenderingClient(serviceEndpoint, accountId, accountDomain, credential);
  });

  it("ReadmeSampleCreateClient_ClientSecretCredential", async () => {
    const accountDomain = "<account domain>";
    const accountId = "<account ID>";
    const serviceEndpoint = "<serviceEndpoint>";
    const tenantId = "<tenant ID>";
    const clientId = "<client ID>";
    const clientSecret = "<client secret>";
    // @ts-preserve-whitespace
    const credential = new ClientSecretCredential(tenantId, clientId, clientSecret, {
      authorityHost: `https://login.microsoftonline.com/${tenantId}`,
    });
    // @ts-preserve-whitespace
    const client = new RemoteRenderingClient(serviceEndpoint, accountId, accountDomain, credential);
  });

  it("ReadmeSampleCreateClient_DefaultAzureCredential", async () => {
    const accountDomain = "<account domain>";
    const accountId = "<account ID>";
    const serviceEndpoint = "<serviceEndpoint>";
    // @ts-preserve-whitespace
    const credential = new DefaultAzureCredential();
    const client = new RemoteRenderingClient(serviceEndpoint, accountId, accountDomain, credential);
  });

  it("ReadmeSampleCreateClient_AccessToken", async () => {
    const accountId = "<account ID>";
    const serviceEndpoint = "<serviceEndpoint>";
    // @ts-preserve-whitespace
    // getMixedRealityAccessTokenFromWebService is a hypothetical method that retrieves
    // a Mixed Reality access token from a web service. The web service would use the
    // MixedRealityStsClient and credentials to obtain an access token to be returned
    // to the client.
    async function getMixedRealityAccessTokenFromWebService() {
      return {
        token: "<access token>",
        expiresOnTimestamp: Date.now() + 24 * 60 * 60 * 1000,
      };
    }
    const accessToken = await getMixedRealityAccessTokenFromWebService();
    // @ts-preserve-whitespace
    const client = new RemoteRenderingClient(serviceEndpoint, accountId, accessToken);
  });

  it("ReadmeSampleConvertASimpleAsset", async () => {
    const accountDomain = "<account domain>";
    const accountId = "<account ID>";
    const serviceEndpoint = "<serviceEndpoint>";
    const storageAccountName = "<storageAccountName>";
    const blobContainerName = "<blobStorageName>";
    const storageContainerUrl = `https://${storageAccountName}.blob.core.windows.net/${blobContainerName}`;
    // @ts-preserve-whitespace
    const credential = new DefaultAzureCredential();
    const client = new RemoteRenderingClient(serviceEndpoint, accountId, accountDomain, credential);
    // @ts-preserve-whitespace
    const inputSettings = {
      storageContainerUrl,
      relativeInputAssetPath: "box.fbx",
    };
    const outputSettings = {
      storageContainerUrl,
    };
    const conversionSettings = { inputSettings, outputSettings };
    // @ts-preserve-whitespace
    // A randomly generated UUID is a good choice for a conversionId.
    const conversionId = randomUUID();
    // @ts-preserve-whitespace
    const conversionPoller = await client.beginConversion(conversionId, conversionSettings);
    // @ts-preserve-whitespace
    const conversion = await conversionPoller.pollUntilDone();
    // @ts-preserve-whitespace
    if (conversion.status === "Succeeded") {
      console.log(`Conversion succeeded: Output written to ${conversion.output?.outputAssetUrl}`);
    } else if (conversion.status === "Failed") {
      console.log(`Conversion failed: ${conversion.error.code} ${conversion.error.message}`);
    }
  });

  it("ReadmeSampleConvertAMoreComplexAsset", async () => {
    const accountDomain = "<account domain>";
    const accountId = "<account ID>";
    const serviceEndpoint = "<serviceEndpoint>";
    const storageAccountName = "<storageAccountName>";
    const blobContainerName = "<blobStorageName>";
    const storageAccountName2 = "<storageAccountName2>";
    const blobContainerName2 = "<blobStorageName2>";
    const inputStorageUrl = `https://${storageAccountName}.blob.core.windows.net/${blobContainerName}`;
    const outputStorageUrl = `https://${storageAccountName2}.blob.core.windows.net/${blobContainerName2}`;
    // @ts-preserve-whitespace
    const credential = new DefaultAzureCredential();
    const client = new RemoteRenderingClient(serviceEndpoint, accountId, accountDomain, credential);
    // @ts-preserve-whitespace
    const inputSettings = {
      storageContainerUrl: inputStorageUrl,
      blobPrefix: "Bicycle",
      relativeInputAssetPath: "bicycle.gltf",
    };
    const outputSettings = {
      storageContainerUrl: outputStorageUrl,
      blobPrefix: "ConvertedBicycle",
    };
    const conversionSettings = { inputSettings, outputSettings };
    // @ts-preserve-whitespace
    const conversionId = randomUUID();
    // @ts-preserve-whitespace
    const conversionPoller = await client.beginConversion(conversionId, conversionSettings);
    // @ts-preserve-whitespace
    const conversion = await conversionPoller.pollUntilDone();
    // @ts-preserve-whitespace
    if (conversion.status === "Succeeded") {
      console.log(`Conversion succeeded: Output written to ${conversion.output?.outputAssetUrl}`);
    } else if (conversion.status === "Failed") {
      console.log(`Conversion failed: ${conversion.error.code} ${conversion.error.message}`);
    }
  });

  it("ReadmeSampleListConversions", async () => {
    const accountDomain = "<account domain>";
    const accountId = "<account ID>";
    const serviceEndpoint = "<serviceEndpoint>";
    // @ts-preserve-whitespace
    const credential = new DefaultAzureCredential();
    const client = new RemoteRenderingClient(serviceEndpoint, accountId, accountDomain, credential);
    // @ts-preserve-whitespace
    for await (const conversion of client.listConversions()) {
      if (conversion.status === "Succeeded") {
        console.log(
          `Conversion ${conversion.conversionId} succeeded: Output written to ${conversion.output?.outputAssetUrl}`,
        );
      } else if (conversion.status === "Failed") {
        console.log(
          `Conversion ${conversion.conversionId} failed: ${conversion.error.code} ${conversion.error.message}`,
        );
      }
    }
  });

  it("ReadmeSampleCreateASession", async () => {
    const accountDomain = "<account domain>";
    const accountId = "<account ID>";
    const serviceEndpoint = "<serviceEndpoint>";
    // @ts-preserve-whitespace
    const credential = new DefaultAzureCredential();
    const client = new RemoteRenderingClient(serviceEndpoint, accountId, accountDomain, credential);
    // @ts-preserve-whitespace
    const sessionSettings = {
      maxLeaseTimeInMinutes: 4,
      size: "Standard",
    };
    // @ts-preserve-whitespace
    // A randomly generated UUID is a good choice for a conversionId.
    const sessionId = randomUUID();
    // @ts-preserve-whitespace
    const sessionPoller = await client.beginSession(sessionId, sessionSettings);
  });

  it("ReadmeSampleExtendLease", async () => {
    const accountDomain = "<account domain>";
    const accountId = "<account ID>";
    const serviceEndpoint = "<serviceEndpoint>";
    // @ts-preserve-whitespace
    const credential = new DefaultAzureCredential();
    const client = new RemoteRenderingClient(serviceEndpoint, accountId, accountDomain, credential);
    // @ts-preserve-whitespace
    const sessionId = "<session ID from previous step>";
    const currentSession = await client.getSession(sessionId);
    if (currentSession.status === "Ready") {
      if (
        currentSession.maxLeaseTimeInMinutes -
          (Date.now() - +currentSession.properties.createdOn) / 60000 <
        2
      ) {
        const newLeaseTime = currentSession.maxLeaseTimeInMinutes + 15;
        // @ts-preserve-whitespace
        await client.updateSession(sessionId, { maxLeaseTimeInMinutes: newLeaseTime });
      }
    }
  });

  it("ReadmeSampleListSessions", async () => {
    const accountDomain = "<account domain>";
    const accountId = "<account ID>";
    const serviceEndpoint = "<serviceEndpoint>";
    // @ts-preserve-whitespace
    const credential = new DefaultAzureCredential();
    const client = new RemoteRenderingClient(serviceEndpoint, accountId, accountDomain, credential);
    // @ts-preserve-whitespace
    for await (const session of client.listSessions()) {
      console.log(`Session ${session.sessionId} is ${session.status}`);
    }
  });

  it("ReadmeSampleStopASession", async () => {
    const accountDomain = "<account domain>";
    const accountId = "<account ID>";
    const serviceEndpoint = "<serviceEndpoint>";
    // @ts-preserve-whitespace
    const credential = new DefaultAzureCredential();
    const client = new RemoteRenderingClient(serviceEndpoint, accountId, accountDomain, credential);
    // @ts-preserve-whitespace
    const sessionId = "<session ID from previous step>";
    await client.endSession(sessionId);
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
