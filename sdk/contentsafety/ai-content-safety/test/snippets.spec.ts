// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  BlocklistClient,
  ContentProvenanceClient,
  ContentSafetyClient,
  restorePoller,
} from "../src/index.js";
import { DefaultAzureCredential, InteractiveBrowserCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClients_Node", async () => {
    const credential = new DefaultAzureCredential();
    const contentSafetyClient = new ContentSafetyClient("<endpoint>", credential);
    const contentProvenanceClient = new ContentProvenanceClient("<endpoint>", credential);
    const blocklistClient = new BlocklistClient("<endpoint>", credential);
  });

  it("ReadmeSampleCreateContentSafetyClient_Browser", async () => {
    const credential = new InteractiveBrowserCredential({
      tenantId: "<YOUR_TENANT_ID>",
      clientId: "<YOUR_CLIENT_ID>",
    });
    const client = new ContentSafetyClient("<endpoint>", credential);
  });

  it("ReadmeSampleUnifiedModerate", async () => {
    const client = new ContentSafetyClient("<endpoint>", new DefaultAzureCredential());

    async function moderateInput(): Promise<void> {
      const input = { content: "Text to evaluate", role: "user" as const };
      const result = await client.unifiedModerate(
        {
          spec: "agent-hooks/0.1",
          interceptionPoint: "input",
          timestamp: new Date(),
          sequence: 1,
          agent: { id: "<agent-id>", framework: "custom" },
          session: { id: "<session-id>" },
          input,
          target: input,
        },
        { policyId: "<policy-id>" },
      );
      console.log(result.decision);
    }

    void moderateInput;
  });

  it("ReadmeSampleDetectProvenance", async () => {
    const client = new ContentProvenanceClient("<endpoint>", new DefaultAzureCredential());

    async function detectProvenance(): Promise<void> {
      const poller = client.detect({ content: { uri: "<media-blob-uri>" } });
      const result = await poller.pollUntilDone();
      console.log(result.outcome);
    }

    void detectProvenance;
  });

  it("ReadmeSampleRestoreProvenancePoller", async () => {
    const client = new ContentProvenanceClient("<endpoint>", new DefaultAzureCredential());

    async function resumeDetection(serializedState: string): Promise<void> {
      const poller = restorePoller(client, serializedState, client.detect.bind(client));
      const result = await poller.pollUntilDone();
      console.log(result.outcome);
    }

    void resumeDetection;
  });

  it("ReadmeSampleUpdateBlocklist", async () => {
    const client = new BlocklistClient("<endpoint>", new DefaultAzureCredential());

    async function updateBlocklist(): Promise<void> {
      const result = await client.createOrUpdateTextBlocklist("<blocklist-name>", {
        description: "Blocklist description",
      });
      console.log(result.blocklistName);
    }

    void updateBlocklist;
  });

  it("ReadmeSampleListBlocklistItemPages", async () => {
    const client = new BlocklistClient("<endpoint>", new DefaultAzureCredential());

    async function listBlocklistItemPages(): Promise<void> {
      const pages = client.listTextBlocklistItems("<blocklist-name>").byPage({ maxPageSize: 20 });
      for await (const page of pages) {
        for (const item of page) {
          console.log(item.blocklistItemId, item.text);
        }
      }
    }

    void listBlocklistItemPages;
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
