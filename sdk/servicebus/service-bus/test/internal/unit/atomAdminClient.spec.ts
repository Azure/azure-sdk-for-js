// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe, expect, it } from "vitest";
import type { TokenCredential } from "@azure/core-auth";
import { AzureNamedKeyCredential } from "@azure/core-auth";
import type { PipelinePolicy, PipelineRequest } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { ServiceBusAdministrationClient } from "../../../src/serviceBusAtomManagementClient.js";
import type { ServiceBusAdministrationClientOptions } from "../../../src/serviceBusAtomManagementClient.js";

const fakeNamespace = "mynamespace.servicebus.windows.net";

/** Hands back a token without a network call, so the pipeline can be exercised offline. */
const fakeCredential: TokenCredential = {
  getToken: async () => ({ token: "fake-token", expiresOnTimestamp: Date.now() + 3600 * 1000 }),
};

/**
 * A topic runtime ATOM entry as the service returns it. The element names are spelled out
 * literally here rather than taken from `Constants`, so a rename of either constant breaks
 * these tests instead of moving both sides together.
 */
function topicRuntimeEntry(
  name: string,
  filterCountElements = "<SqlFilterCount>7</SqlFilterCount><CorrelationFilterCount>9</CorrelationFilterCount>",
): string {
  return `<entry xmlns="http://www.w3.org/2005/Atom">
  <id>https://mynamespace.servicebus.windows.net/${name}?api-version=2024-05</id>
  <title type="text">${name}</title>
  <published>2026-01-01T00:00:00Z</published>
  <updated>2026-01-02T00:00:00Z</updated>
  <author><name>mynamespace</name></author>
  <link rel="self" href="../${name}?api-version=2024-05"/>
  <content type="application/xml">
    <TopicDescription xmlns="http://schemas.microsoft.com/netservices/2010/10/servicebus/connect" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
      <SizeInBytes>0</SizeInBytes>
      <SubscriptionCount>2</SubscriptionCount>
      ${filterCountElements}
      <CountDetails xmlns:d2p1="http://schemas.microsoft.com/netservices/2011/06/servicebus">
        <d2p1:ActiveMessageCount>0</d2p1:ActiveMessageCount>
        <d2p1:DeadLetterMessageCount>0</d2p1:DeadLetterMessageCount>
        <d2p1:ScheduledMessageCount>0</d2p1:ScheduledMessageCount>
        <d2p1:TransferMessageCount>0</d2p1:TransferMessageCount>
        <d2p1:TransferDeadLetterMessageCount>0</d2p1:TransferDeadLetterMessageCount>
      </CountDetails>
      <CreatedAt>2026-01-01T00:00:00Z</CreatedAt>
      <UpdatedAt>2026-01-02T00:00:00Z</UpdatedAt>
      <AccessedAt>2026-01-03T00:00:00Z</AccessedAt>
    </TopicDescription>
  </content>
</entry>`;
}

function topicRuntimeFeed(...entries: string[]): string {
  return `<feed xmlns="http://www.w3.org/2005/Atom">
  <title type="text">Topics</title>
  <id>https://mynamespace.servicebus.windows.net/$Resources/Topics?api-version=2024-05</id>
  <updated>2026-01-02T00:00:00Z</updated>
  ${entries.join("\n")}
</feed>`;
}

/**
 * Builds a client whose pipeline ends in a policy that answers with `body` instead of
 * reaching the network, and records the URL of every request that got that far.
 */
function clientWithFakeTransport(
  body: string,
  options?: ServiceBusAdministrationClientOptions,
): { client: ServiceBusAdministrationClient; requestUrls: string[] } {
  const requestUrls: string[] = [];
  const client = new ServiceBusAdministrationClient(fakeNamespace, fakeCredential, options);
  const fakeTransport: PipelinePolicy = {
    name: "fakeTransportPolicy",
    sendRequest: async (request: PipelineRequest) => {
      requestUrls.push(request.url);
      return {
        request,
        status: 200,
        headers: createHttpHeaders({
          "content-type": "application/atom+xml;type=entry;charset=utf-8",
        }),
        bodyAsText: body,
      };
    },
  };
  // "Sign" is the last pipeline phase, so the policy sees the request as it would go out.
  client.pipeline.addPolicy(fakeTransport, { phase: "Sign" });
  return { client, requestUrls };
}

describe("ServiceBusAtomAdminClient", () => {
  it("use HTTPS by default", () => {
    const connectionString = "Endpoint=sb://mynamespace.servicebus.windows.net;";
    const adminClient = new ServiceBusAdministrationClient(connectionString);
    assert.equal(adminClient["useTls"], true);
  });

  it("use HTTP when connect to emulator", () => {
    const connectionString = "Endpoint=sb://192.168.y.z;UseDevelopmentEmulator=true;";
    const adminClient = new ServiceBusAdministrationClient(connectionString);
    assert.equal(adminClient["useTls"], false);
  });

  describe("emulator transport through public operations", () => {
    const endpoint = "localhost:5300";
    const base =
      `Endpoint=sb://${endpoint};` + "SharedAccessKeyName=test;SharedAccessKey=test-key;";
    const operations: Array<
      [string, (client: ServiceBusAdministrationClient) => Promise<unknown>]
    > = [
      ["put", (client) => client.createQueue("my-queue")],
      ["get", (client) => client.getQueue("my-queue")],
      ["list", (client) => client.listQueues().next()],
      ["delete", (client) => client.deleteQueue("my-queue")],
    ];

    async function assertTransport(
      client: ServiceBusAdministrationClient,
      operation: (client: ServiceBusAdministrationClient) => Promise<unknown>,
      useHttp: boolean,
      useSas: boolean,
    ): Promise<void> {
      const requests: PipelineRequest[] = [];
      const stopped = new Error("Stopped before the network");
      client.pipeline.addPolicy(
        {
          name: "observeTransport",
          async sendRequest(request) {
            requests.push(request);
            throw stopped;
          },
        },
        { afterPhase: "Sign" },
      );

      await expect(operation(client)).rejects.toBe(stopped);

      assert.lengthOf(requests, 1);
      const request = requests[0];
      const url = new URL(request.url);
      assert.equal(url.protocol, useHttp ? "http:" : "https:");
      assert.equal(url.host, endpoint);
      assert.equal(url.searchParams.get("api-version"), "2024-05");
      assert.equal(request.allowInsecureConnection, useHttp);
      if (useSas) {
        const authorization = request.headers.get("authorization");
        assert.isDefined(authorization);
        const fields = new URLSearchParams(authorization!.replace(/^SharedAccessSignature /, ""));
        assert.equal(fields.get("sr"), request.url.toLowerCase());
      }
    }

    for (const [label, flag, useHttp] of [
      ["absent", "", false],
      ["true", "UseDevelopmentEmulator=true;", true],
      ["false", "UseDevelopmentEmulator=false;", false],
      ["trimmed true", "UseDevelopmentEmulator= true ;", true],
      ["True", "UseDevelopmentEmulator=True;", false],
      ["TRUE", "UseDevelopmentEmulator=TRUE;", false],
      ["FALSE", "UseDevelopmentEmulator=FALSE;", false],
      ["invalid value", "UseDevelopmentEmulator=invalid;", false],
      ["numeric value", "UseDevelopmentEmulator=1;", false],
      ["empty", "UseDevelopmentEmulator=;", false],
      ["different key casing", "usedevelopmentemulator=true;", false],
      ["last value false", "UseDevelopmentEmulator=true;UseDevelopmentEmulator=false;", false],
      ["last value true", "UseDevelopmentEmulator=false;UseDevelopmentEmulator=true;", true],
    ] as const) {
      for (const [name, operation] of operations) {
        it(`${name} uses ${useHttp ? "HTTP" : "HTTPS"} for ${label}`, async () => {
          await assertTransport(
            new ServiceBusAdministrationClient(base + flag, {
              retryOptions: { maxRetries: 0 },
            }),
            operation,
            useHttp,
            true,
          );
        });
      }
    }

    for (const [name, operation] of operations) {
      it(`${name} keeps HTTPS with a named key credential`, async () => {
        await assertTransport(
          new ServiceBusAdministrationClient(
            endpoint,
            new AzureNamedKeyCredential("test", "test-key"),
          ),
          operation,
          false,
          true,
        );
      });

      it(`${name} keeps HTTPS with a token credential`, async () => {
        await assertTransport(
          new ServiceBusAdministrationClient(endpoint, fakeCredential),
          operation,
          false,
          false,
        );
      });
    }

    it("rejects a flag without an assignment", () => {
      assert.throws(
        () => new ServiceBusAdministrationClient(base + "UseDevelopmentEmulator;"),
        /Connection string malformed: each part.*assignment/,
      );
    });
  });

  describe("topic runtime properties over a fake transport", () => {
    it("sends api-version 2024-05 by default and reads the filter-count elements", async () => {
      const { client, requestUrls } = clientWithFakeTransport(topicRuntimeEntry("my-topic"));

      const properties = await client.getTopicRuntimeProperties("my-topic");

      assert.equal(requestUrls.length, 1);
      assert.equal(
        new URL(requestUrls[0]).searchParams.get("api-version"),
        "2024-05",
        "A default client must request the api-version that serves the filter counts",
      );
      assert.equal(properties.name, "my-topic");
      assert.equal(properties.subscriptionCount, 2);
      assert.equal(properties.sqlFilterCount, 7);
      assert.equal(properties.correlationFilterCount, 9);
    });

    it("sends the api-version the caller pins", async () => {
      const { client, requestUrls } = clientWithFakeTransport(topicRuntimeEntry("my-topic"), {
        serviceVersion: "2017-04",
      });

      await client.getTopicRuntimeProperties("my-topic");

      assert.equal(
        new URL(requestUrls[0]).searchParams.get("api-version"),
        "2017-04",
        "An explicit serviceVersion must reach the request URL",
      );
    });

    it("leaves the filter counts undefined when the service omits the elements", async () => {
      // A service version older than 2024-05 omits the elements entirely.
      const { client } = clientWithFakeTransport(topicRuntimeEntry("my-topic", ""), {
        serviceVersion: "2021-05",
      });

      const properties = await client.getTopicRuntimeProperties("my-topic");

      assert.equal(properties.subscriptionCount, 2);
      assert.equal(properties.sqlFilterCount, undefined);
      assert.equal(properties.correlationFilterCount, undefined);
    });

    it("reads the filter-count elements for every topic in a list response", async () => {
      const { client, requestUrls } = clientWithFakeTransport(
        topicRuntimeFeed(
          topicRuntimeEntry("topic-a"),
          topicRuntimeEntry(
            "topic-b",
            "<SqlFilterCount>1</SqlFilterCount><CorrelationFilterCount>0</CorrelationFilterCount>",
          ),
        ),
      );

      const topics = [];
      for await (const topic of client.listTopicsRuntimeProperties()) {
        topics.push(topic);
      }

      assert.equal(
        new URL(requestUrls[0]).searchParams.get("api-version"),
        "2024-05",
        "A default client must request the api-version that serves the filter counts",
      );
      assert.deepEqual(
        topics.map((topic) => [topic.name, topic.sqlFilterCount, topic.correlationFilterCount]),
        [
          ["topic-a", 7, 9],
          ["topic-b", 1, 0],
        ],
      );
    });
  });
});
