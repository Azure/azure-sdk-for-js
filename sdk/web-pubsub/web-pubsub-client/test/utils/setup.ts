// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TestProject } from "vitest/node";
import { createTestCredential } from "@azure-tools/test-credential";
import { startWebPubSubServer } from "@azure-tools/web-pubsub-simulator";
import { WebPubSubServiceClient } from "@azure/web-pubsub";
import { getAvailablePort } from "./utils.js";
import { createWssProxy } from "./proxy/proxy.js";
import "dotenv/config";

declare module "vitest" {
  interface ProvidedContext {
    webPubSubClientUrl: string;
    simulatorAdminUrl: string;
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

export async function setup({ provide }: TestProject): Promise<() => void> {
  const hubName = "sample_chat";
  const groupName = "testGroup";
  const testMode = process.env.TEST_MODE?.toLowerCase();
  provide("testMode", testMode === "live" ? "live" : "mock");
  provide("groupName", groupName);
  if (testMode === "live") {
    const serviceClient = new WebPubSubServiceClient(
      assertEnvironmentVariable("WPS_ENDPOINT"),
      createTestCredential(),
      hubName,
    );
    const webPubSubClientUrl = (
      await serviceClient.getClientAccessToken({
        roles: [`webpubsub.joinLeaveGroup.${groupName}`, `webpubsub.sendToGroup.${groupName}`],
      })
    ).url;
    provide("webPubSubClientUrl", webPubSubClientUrl);

    const proxy = await createWssProxy(webPubSubClientUrl);
    await proxy.start();
    provide("proxyWssUrl", proxy.wssUrl);
    provide("proxyHttpsUrl", proxy.httpsUrl);
    return async () => {
      await proxy.stop();
    };
  } else {
    const port = await getAvailablePort();
    const server = await startWebPubSubServer({ port });
    provide("webPubSubClientUrl", server.webPubSubClientUrl);
    const proxy = await createWssProxy(server.webPubSubClientUrl);
    await proxy.start();
    provide("proxyWssUrl", proxy.wssUrl);
    provide("proxyHttpsUrl", proxy.httpsUrl);
    provide("simulatorAdminUrl", server.httpsUrl);
    return async () => {
      server.close();
      await proxy.stop();
    };
  }
}
