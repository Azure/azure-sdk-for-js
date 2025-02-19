// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TestProject } from "vitest/node";
import { createTestCredential } from "@azure-tools/test-credential";
import { startWebPubSubServer, type WebPubSubServer } from "@azure-tools/web-pubsub-simulator";
import { WebPubSubServiceClient } from "@azure/web-pubsub";
import { getAvailablePort } from "./utils.js";
import { createWssProxy } from "./proxy/proxy.js";
import https from "node:https";
import "dotenv/config";

declare module "vitest" {
  interface ProvidedContext {
    serviceWssUrl: string;
    serviceHttpsUrl: string;
    testMode: "live" | "mock";
    proxyWssUrl: string;
    proxyHttpsUrl: string;
    groupName: string;
  }
}

function assertEnvironmentVariable(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined.`);
  }
  return value;
}

let server: WebPubSubServer;
async function getMockServerUrl(): Promise<string> {
  if (!server) {
    const port = await getAvailablePort();
    server = await startWebPubSubServer({ port });
  }
  return server.httpsUrl;
}

export async function setup({ provide }: TestProject): Promise<() => void> {
  const hubName = "sample_chat";
  const groupName = "testGroup";
  const testMode = process.env.TEST_MODE?.toLowerCase();
  const serviceHttpsUrl =
    testMode === "live" ? assertEnvironmentVariable("WPS_ENDPOINT") : await getMockServerUrl();
  const serviceClient = new WebPubSubServiceClient(
    serviceHttpsUrl,
    createTestCredential(),
    hubName,
    {
      agent: new https.Agent({ rejectUnauthorized: testMode === "live" }),
    },
  );
  const serviceWssUrl = (
    await serviceClient.getClientAccessToken({
      roles: [`webpubsub.joinLeaveGroup.${groupName}`, `webpubsub.sendToGroup.${groupName}`],
    })
  ).url;
  const proxy = await createWssProxy(serviceWssUrl);
  await proxy.start();

  provide("serviceHttpsUrl", serviceHttpsUrl);
  provide("serviceWssUrl", serviceWssUrl);
  provide("proxyHttpsUrl", proxy.httpsUrl);
  provide("proxyWssUrl", proxy.wssUrl);
  provide("testMode", testMode === "live" ? "live" : "mock");
  provide("groupName", groupName);
  return async () => {
    server?.close();
    await proxy.stop();
  };
}
