// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createProjectsClient, createRecorder } from "../utils/createClient.js";
import { afterEach, assert, beforeEach, it, describe } from "vitest";
import { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import type { AIProjectClient } from "../../../src/index.js";
import type OpenAI from "openai";

interface TestItem {
  id: string;
  type: string;
  role: string;
  content: TestItemInput[];
}

interface TestItemInput {
  text: string;
}

// OpenAI SDK tests don't work with test recorder
// Skip in playback mode (only run in live/record mode)
describe("conversationitems - basic", () => {
  let recorder: Recorder;
  let projectsClient: AIProjectClient;
  let openAIClient: OpenAI;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient();
    openAIClient = projectsClient.getOpenAIClient();
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it.skip("should create, list, get, and delete conversation items", async function () {
    // Create conversation
    const conversation = await openAIClient.conversations.create();

    assert.isNotNull(conversation);
    assert.isNotNull(conversation.id);
    console.log(`Created conversation, conversation ID: ${conversation.id}`);

    const responseItem: any = {
      type: "message",
      role: "user",
      content: [{ type: "input_text", text: "What is the capital of France?" }],
    };

    const itemList = await openAIClient.conversations.items.create(conversation.id, {
      items: [responseItem],
    });
    assert.isNotNull(itemList);
    assert.isNotNull(itemList.data);
    assert.isNotNull(itemList.data[0]);
    console.log(`Created conversation item, item ID: ${itemList.data[0].id}`);
    const firstItem = itemList.data[0] as TestItem;
    assert.isNotNull(firstItem);
    assert.equal(firstItem.type, responseItem.type);
    assert.isDefined(firstItem.role);
    assert.equal(firstItem.role, responseItem.role);
    assert.isNotNull(firstItem.content);
    assert.isDefined(firstItem.content);
    assert.isNotNull(firstItem.content[0]);
    const itemText = firstItem.content[0] as TestItemInput;
    assert.isNotNull(itemText.text);
    assert.equal(itemText.text, (responseItem.content[0] as TestItemInput).text);

    const listItems = await openAIClient.conversations.items.list(conversation.id);
    assert.isNotNull(listItems);
    assert.isNotNull(listItems.data);
    const firstListItem = listItems.data[0] as TestItem;
    assert.isNotNull(firstListItem);
    assert.equal(firstListItem.role, responseItem.role);
    assert.isNotNull(firstListItem.content);
    assert.isDefined(firstListItem.content);
    assert.isNotNull(firstListItem.content[0]);
    const listItemText = firstListItem.content[0] as TestItemInput;
    assert.isNotNull(listItemText.text);
    assert.equal(listItemText.text, (responseItem.content[0] as TestItemInput).text);

    const retrievedItem = await openAIClient.conversations.items.retrieve(firstItem.id as string, {
      conversation_id: conversation.id,
    });
    assert.isNotNull(retrievedItem);
    const retItem = retrievedItem as TestItem;
    assert.isNotNull(retItem);
    assert.equal(retItem.role, responseItem.role);
    assert.isNotNull(retItem.content);
    assert.isDefined(retItem.content);
    assert.isNotNull(retItem.content[0]);
    const retItemText = retItem.content[0] as TestItemInput;
    assert.isNotNull(retItemText.text);
    assert.equal(retItemText.text, (responseItem.content[0] as TestItemInput).text);

    const deletedItem = await openAIClient.conversations.items.delete(firstItem.id as string, {
      conversation_id: conversation.id,
    });
    assert.isNotNull(deletedItem);

    // Delete conversation
    const deleted = await openAIClient.conversations.delete(conversation.id);
    assert.isNotNull(deleted);
    console.log(`Deleted conversation, conversation ID: ${conversation.id}`);
  }, 20000);
});
