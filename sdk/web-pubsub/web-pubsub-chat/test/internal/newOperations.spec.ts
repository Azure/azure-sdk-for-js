// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AzureKeyCredential,
  WebPubSubChatServiceClient,
  KnownChatTopicState,
  type ChatRoleInput,
  type ChatRoomInput,
  type ChatRoomMemberInput,
  type HumanChatUserInput,
  type ChatMessageInput,
  type ChatTopicInput,
  type ChatTopicUpdate,
} from "@azure/web-pubsub-chat";
import {
  createHttpHeaders,
  type HttpClient,
  type PipelineRequest,
} from "@azure/core-rest-pipeline";
import { assert, describe, expect, expectTypeOf, it } from "vitest";

const topic = {
  id: "topic",
  title: "Topic",
  createdAt: "2026-10-09T00:00:00Z",
  createdBy: "user",
  state: "Normal",
  conversationId: "c.room.topic",
  etag: '"one"',
};

function createClient(
  respond: (request: PipelineRequest) => { status?: number; body?: unknown },
  apiVersion?: string,
): WebPubSubChatServiceClient {
  const httpClient: HttpClient = {
    async sendRequest(request) {
      const { status = 200, body } = respond(request);
      return {
        request,
        status,
        headers: createHttpHeaders({ "content-type": "application/json" }),
        bodyAsText: body === undefined ? undefined : JSON.stringify(body),
      };
    },
  };
  return new WebPubSubChatServiceClient(
    "https://example.webpubsub.azure.com",
    new AzureKeyCredential("fake-key"),
    "hub",
    { httpClient, apiVersion, retryOptions: { maxRetries: 0 } },
  );
}

describe("new operation requests", () => {
  it("accepts write inputs without any read-only response properties", async () => {
    expectTypeOf<keyof ChatRoleInput>().toEqualTypeOf<"permissions">();
    expectTypeOf<keyof ChatRoomInput>().toEqualTypeOf<"title">();
    expectTypeOf<keyof ChatRoomMemberInput>().toEqualTypeOf<"roleName">();
    expectTypeOf<keyof HumanChatUserInput>().toEqualTypeOf<"kind" | "nickname" | "roleName">();
    expectTypeOf<keyof ChatMessageInput>().toEqualTypeOf<"createdBy" | "content">();
    expectTypeOf<keyof ChatTopicInput>().toEqualTypeOf<"title">();
    expectTypeOf<keyof ChatTopicUpdate>().toEqualTypeOf<"title" | "state">();

    const requests: PipelineRequest[] = [];
    const client = createClient((request) => {
      requests.push(request);
      return {
        body: {
          ...topic,
          name: "user.role",
          permissions: [],
          defaultConversation: "c.room.default",
          userId: "user",
          kind: "Human",
          nickname: "User",
          roleName: "user.normal",
          content: { text: "Message" },
        },
      };
    });
    await client.createOrReplaceRole("user.role", { permissions: [] });
    await client.createOrReplaceRoom("room", { title: "Room" });
    await client.createOrReplaceRoomMember("room", "user", { roleName: "room.member" });
    await client.createOrReplaceUser("user", {
      kind: "Human",
      nickname: "User",
      roleName: "user.normal",
    });
    const message = await client.updateMessage("c.room.default", "1", {
      createdBy: "user",
      content: { text: "Message" },
    });
    const created = await client.createOrReplaceTopic("room", "topic", { title: "Topic" });
    await client.updateTopic("room", "topic", { title: "Updated" });
    await client.updateTopic("room", "topic", { state: KnownChatTopicState.Archived });
    assert.deepEqual(
      requests.map((request) => JSON.parse(String(request.body))),
      [
        { permissions: [] },
        { title: "Room" },
        { roleName: "room.member" },
        { kind: "Human", nickname: "User", roleName: "user.normal" },
        { createdBy: "user", content: { text: "Message" } },
        { title: "Topic" },
        { title: "Updated" },
        { state: "Archived" },
      ],
    );
    assert.instanceOf(message.createdAt, Date);
    assert.instanceOf(created.createdAt, Date);
    assert.equal(created.createdBy, topic.createdBy);
    assert.equal(created.conversationId, topic.conversationId);
  });

  it("omits read-only properties when response objects are reused in write requests", async () => {
    const requests: PipelineRequest[] = [];
    const client = createClient((request) => {
      requests.push(request);
      return {
        body: {
          ...topic,
          name: "user.role",
          permissions: [],
          defaultConversation: "c.room.default",
          userId: "user",
          kind: "Human",
          nickname: "User",
          roleName: "user.normal",
          content: { text: "Message" },
        },
      };
    });
    const etag = '"one"';
    await client.createOrReplaceRole("user.role", {
      ...{ name: "user.role", etag },
      permissions: [],
    });
    await client.createOrReplaceRoom("room", {
      ...{ id: "room", defaultConversation: "c.room.default", etag },
      title: "Room",
    });
    await client.createOrReplaceRoomMember("room", "user", {
      ...{ userId: "user", etag },
      roleName: "room.member",
    });
    await client.createOrReplaceUser("user", {
      ...{ id: "user", etag },
      kind: "Human",
      nickname: "User",
      roleName: "user.normal",
    });
    await client.updateMessage("c.room.default", "1", {
      ...{ id: "1", createdAt: new Date(), etag },
      createdBy: "user",
      content: { text: "Message" },
    });
    const response = { ...topic, createdAt: new Date(topic.createdAt) };
    await client.createOrReplaceTopic("room", "topic", response);
    await client.updateTopic("room", "topic", response);
    assert.deepEqual(
      requests.map((request) => JSON.parse(String(request.body))),
      [
        { permissions: [] },
        { title: "Room" },
        { roleName: "room.member" },
        { kind: "Human", nickname: "User", roleName: "user.normal" },
        { createdBy: "user", content: { text: "Message" } },
        { title: "Topic" },
        { title: "Topic", state: "Normal" },
      ],
    );
  });

  it("uses the new version by default for old and new operations and supports override", async () => {
    for (const apiVersion of [undefined, "2026-02-01-preview"]) {
      const urls: URL[] = [];
      const client = createClient((request) => {
        urls.push(new URL(request.url));
        return { body: { ...topic, title: "Room", defaultConversation: "c.room.default" } };
      }, apiVersion);
      await client.getRoom("room");
      await client.getTopic("room", "topic");
      assert.lengthOf(urls, 2);
      for (const url of urls) {
        assert.equal(url.searchParams.get("api-version"), apiVersion ?? "2026-08-01-preview");
      }
    }
  });

  it("serializes create and partial update bodies and conditional headers", async () => {
    const requests: PipelineRequest[] = [];
    const client = createClient((request) => {
      requests.push(request);
      return { status: request.method === "DELETE" ? 204 : 200, body: topic };
    });
    const created = await client.createOrReplaceTopic(
      "room",
      "topic",
      { title: "Topic" },
      { ifNoneMatch: "*" },
    );
    assert.instanceOf(created.createdAt, Date);
    assert.equal(requests[0].body, '{"title":"Topic"}');
    assert.equal(requests[0].headers.get("if-none-match"), "*");
    await client.updateTopic(
      "room",
      "topic",
      { state: KnownChatTopicState.Archived },
      { ifMatch: created.etag },
    );
    assert.equal(requests[1].body, '{"state":"Archived"}');
    assert.equal(requests[1].headers.get("content-type"), "application/merge-patch+json");
    assert.equal(requests[1].headers.get("if-match"), created.etag);
    await client.deleteTopic("room", "topic", { ifMatch: created.etag });
    assert.equal(requests[2].method, "DELETE");
    assert.equal(requests[2].headers.get("if-match"), created.etag);
  });

  it("paginates all new lists and preserves the API version on continuation links", async () => {
    const paths = [
      "/api/hubs/hub/chat/rooms",
      "/api/hubs/hub/chat/users",
      "/api/hubs/hub/chat/users/user/rooms",
      "/api/hubs/hub/chat/rooms/room/topics",
    ];
    const requests: PipelineRequest[] = [];
    const client = createClient((request) => {
      requests.push(request);
      const url = new URL(request.url);
      const value = url.pathname.endsWith("topics")
        ? topic
        : url.pathname.endsWith("users")
          ? { id: "user", kind: "Human", nickname: "User", roleName: "user.normal", etag: '"one"' }
          : { id: "room", title: "Room", defaultConversation: "c.room.default", etag: '"one"' };
      return {
        body: {
          value: [value],
          ...(url.searchParams.has("continuationToken")
            ? {}
            : { nextLink: `${url.origin}${url.pathname}?continuationToken=next&maxpagesize=1` }),
        },
      };
    });
    const iterators = [
      client.listRooms({ maxPageSize: 1 }),
      client.listUsers({ maxPageSize: 1 }),
      client.listRoomsForUser("user", { maxPageSize: 1 }),
      client.listTopics("room", { maxPageSize: 1 }),
    ];
    for (const [index, iterator] of iterators.entries()) {
      const first = await iterator.byPage().next();
      assert.lengthOf(first.value, 1);
      assert.isString(first.value.continuationToken);
      const next = await iterator
        .byPage({ continuationToken: first.value.continuationToken })
        .next();
      assert.lengthOf(next.value, 1);
      assert.equal(new URL(requests[index * 2].url).pathname, paths[index]);
    }
    for (const request of requests) {
      const url = new URL(request.url);
      assert.equal(url.searchParams.get("api-version"), "2026-08-01-preview");
      assert.equal(url.searchParams.get("maxpagesize"), "1");
    }
  });

  it("returns empty pages for all new lists", async () => {
    const client = createClient(() => ({ body: { value: [] } }));
    for (const iterator of [
      client.listRooms(),
      client.listUsers(),
      client.listRoomsForUser("user"),
      client.listTopics("room"),
    ]) {
      const page = await iterator.byPage().next();
      assert.lengthOf(page.value, 0);
      assert.isUndefined(page.value.continuationToken);
    }
  });

  it("sends corrected listRoomsForUser query parameters with encoded user IDs", async () => {
    let requestUrl: URL | undefined;
    const client = createClient((request) => {
      requestUrl = new URL(request.url);
      return { body: { value: [] } };
    });
    await client
      .listRoomsForUser("user with spaces", {
        maxPageSize: 2,
        continuationToken: "token+/=",
      })
      .next();
    assert.equal(requestUrl?.pathname, "/api/hubs/hub/chat/users/user%20with%20spaces/rooms");
    assert.equal(requestUrl?.searchParams.get("maxpagesize"), "2");
    assert.equal(requestUrl?.searchParams.get("continuationToken"), "token+/=");
    assert.equal(requestUrl?.searchParams.get("api-version"), "2026-08-01-preview");
  });

  it("surfaces service errors for every new operation", async () => {
    const client = createClient(() => ({
      status: 404,
      body: { error: { code: "NotFound", message: "Missing" } },
    }));
    for (const operation of [
      () => client.getTopic("room", "topic"),
      () => client.createOrReplaceTopic("room", "topic", { title: "Topic" }),
      () => client.updateTopic("room", "topic", { title: "Updated" }),
      () => client.deleteTopic("room", "topic"),
      () => client.listRooms().next(),
      () => client.listUsers().next(),
      () => client.listRoomsForUser("user").next(),
      () => client.listTopics("room").next(),
    ]) {
      await expect(operation()).rejects.toMatchObject({ statusCode: 404, code: "NotFound" });
    }
  });

  it("forwards cancellation for every new operation", async () => {
    const controller = new AbortController();
    const options = { abortSignal: controller.signal };
    let calls = 0;
    const client = createClient((request) => {
      calls++;
      assert.strictEqual(request.abortSignal, controller.signal);
      return { body: topic };
    });
    await client.getTopic("room", "topic", options);
    controller.abort();
    const operations = [
      () => client.getTopic("room", "topic", options),
      () => client.createOrReplaceTopic("room", "topic", { title: "Topic" }, options),
      () => client.updateTopic("room", "topic", { title: "Updated" }, options),
      () => client.deleteTopic("room", "topic", options),
      () => client.listRooms(options).next(),
      () => client.listUsers(options).next(),
      () => client.listRoomsForUser("user", options).next(),
      () => client.listTopics("room", options).next(),
    ];
    for (const operation of operations) {
      await expect(operation()).rejects.toMatchObject({ name: "AbortError" });
    }
    assert.equal(calls, 9);
  });

  it("forwards request options and cancellation between list pages", async () => {
    for (const list of [
      (
        client: WebPubSubChatServiceClient,
        options: { abortSignal: AbortSignal; requestOptions: { headers: Record<string, string> } },
      ) => client.listRooms(options),
      (
        client: WebPubSubChatServiceClient,
        options: { abortSignal: AbortSignal; requestOptions: { headers: Record<string, string> } },
      ) => client.listUsers(options),
      (
        client: WebPubSubChatServiceClient,
        options: { abortSignal: AbortSignal; requestOptions: { headers: Record<string, string> } },
      ) => client.listRoomsForUser("user", options),
      (
        client: WebPubSubChatServiceClient,
        options: { abortSignal: AbortSignal; requestOptions: { headers: Record<string, string> } },
      ) => client.listTopics("room", options),
    ]) {
      const controller = new AbortController();
      let calls = 0;
      const client = createClient((request) => {
        calls++;
        assert.strictEqual(request.abortSignal, controller.signal);
        assert.equal(request.headers.get("x-test-header"), "value");
        const url = new URL(request.url);
        return {
          body: { value: [], nextLink: `${url.origin}${url.pathname}?continuationToken=next` },
        };
      });
      const pages = list(client, {
        abortSignal: controller.signal,
        requestOptions: { headers: { "x-test-header": "value" } },
      }).byPage();
      await pages.next();
      await pages.next();
      assert.equal(calls, 2);
      controller.abort();
      await expect(pages.next()).rejects.toMatchObject({ name: "AbortError" });
    }
  });
});
