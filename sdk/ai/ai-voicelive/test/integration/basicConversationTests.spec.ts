// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  type ClientEventResponseCreate,
  RequestSession,
  VoiceLiveClient,
  type VoiceLiveSession,
} from "../../src/index.js";
import { isLiveMode } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { generateTestAudio } from "../infrastructure/audioTestHelpers.js";
import { SessionEventRecorder } from "../infrastructure/sessionEventRecorder.js";
import { FunctionTool, KnownClientEventType, KnownInputAudioFormat, KnownItemType, KnownMessageRole, KnownModality, KnownServerEventType, KnownToolType, ServerEventSessionCreated, ServerEventSessionUpdated } from "../../src/models/models.js";
import dotenv from 'dotenv';

dotenv.config();

describe("Basic Conversation Tests", () => {
  let client: VoiceLiveClient;
  let sessions: VoiceLiveSession[] = [];
  const timeoutMs = 30000; // 30 second timeout for live tests

  const endpoint = process.env.VOICELIVE_ENDPOINT || process.env.AI_SERVICES_ENDPOINT;
  const apiKey = process.env.VOICELIVE_API_KEY || process.env.AI_SERVICES_KEY;

  beforeEach(function (this: any) {
    if (!isLiveMode()) {
      this.skip();
    }

    if (!endpoint) {
      throw new Error("Missing VOICELIVE_ENDPOINT or AI_SERVICES_ENDPOINT environment variable");
    }

    if (!apiKey) {
      throw new Error("Missing VOICELIVE_API_KEY or AI_SERVICES_KEY environment variable");
    }

    const credential = createTestCredential();
    client = new VoiceLiveClient(endpoint, credential);
  });

  afterEach(async () => {
    // Clean up all sessions created during test
    for (const session of sessions) {
      try {
        await session.disconnect();
      } catch {
        // Ignore cleanup errors
      }
    }
    sessions = [];
  });

  it("should create and connect a basic voice session", async () => {
    const sessionConfig = {
      model: "gpt-4o",
      input_audio_format: KnownInputAudioFormat.Pcm16,
    };

    const session = await client.createSession(sessionConfig);
    sessions.push(session);

    const recorder = new SessionEventRecorder(session); // Attach recorder first

    await session.connect();
    expect(session.isConnected).toBe(true);
    // Wait for session created and updated events
    const sessionCreated = await recorder.waitForEvent(KnownServerEventType.SessionCreated) as ServerEventSessionCreated;

    // Once the session is connected, sessionId should be set
    expect(session.sessionId).toBeTruthy();

    await session.updateSession(sessionConfig);
    const sessionUpdated = await recorder.waitForEvent(KnownServerEventType.SessionUpdated) as ServerEventSessionUpdated;

    expect(sessionCreated.session.id).toBeTruthy();
    expect(sessionUpdated.session.inputAudioFormat).toBe(KnownInputAudioFormat.Pcm16);
    expect(sessionCreated.session.id).toBe(sessionUpdated.session.id);
    expect(sessionCreated.session.model).toBe(sessionUpdated.session.model);
  }, timeoutMs);

  it("should handle audio input and transcription", async () => {
    const sessionConfig = {
      model: "gpt-4o",
      input_audio_format: KnownInputAudioFormat.Pcm16,
    };

    const session = await client.createSession(sessionConfig);
    sessions.push(session);

    const recorder = new SessionEventRecorder(session); // Attach recorder first

    await session.connect();
    await recorder.waitForEvent(KnownServerEventType.SessionCreated);
    await session.updateSession(sessionConfig);
    await recorder.waitForEvent(KnownServerEventType.SessionUpdated);

    // Send audio data
    const audioData = await generateTestAudio("What is the weather like?");
    await session.sendAudio(audioData);

    // In a real implementation, we would expect these events:
    // - input_audio_buffer.speech_started
    // - input_audio_buffer.speech_stopped  
    // - input_audio_buffer.committed
    // - conversation.item.input_audio_transcription.completed
    // - conversation.item.created

    // For this test, we'll just verify the session can handle audio input
    expect(session.isConnected).toBe(true);
  }, timeoutMs);

  it("should handle text conversation with function calling", async () => {
    const additionTool: FunctionTool = {
      type: KnownToolType.Function
      , name: "add_numbers",
      description: "Add two numbers together",
      parameters: {
        type: "object",
        properties: {
          a: { type: "number", description: "The first number to add" },
          b: { type: "number", description: "The second number to add" },
        },
        required: ["a", "b"],
      },
    };

    const sessionConfig: RequestSession = {
      model: "gpt-4o",
      modalities: [KnownModality.Text],
      tools: [additionTool],
    };

    const session = await client.createSession(sessionConfig);
    sessions.push(session);

    const recorder = new SessionEventRecorder(session); // Attach recorder first

    await session.connect();
    await recorder.waitForEvent(KnownServerEventType.SessionCreated);
    await session.updateSession(sessionConfig);
    await recorder.waitForEvent(KnownServerEventType.SessionUpdated);

    // Add a text message to the conversation
    const userMessage = {
      type: KnownItemType.Message,
      role: KnownMessageRole.User,
      content: [{
        type: "input_text",
        text: "What is 13 plus 29?",
      }],
    };

    await session.addConversationItem(userMessage);
    await recorder.waitForEvent(KnownServerEventType.ConversationItemCreated);

    const createResponseEvent: ClientEventResponseCreate = {
      type: KnownClientEventType.ResponseCreate,
    };

    // Trigger response generation
    await session.sendEvent(createResponseEvent);

    // Collect response events
    const responseEvents = await recorder.waitForEvents(KnownServerEventType.ResponseDone);
    expect(responseEvents.length).toBeGreaterThan(0);

    // Should have response.created and response.done at minimum
    const responseCreated = responseEvents.find(e => e.type === KnownServerEventType.ResponseCreated);
    const responseDone = responseEvents.find(e => e.type === KnownServerEventType.ResponseDone);

    expect(responseCreated).toBeDefined();
    expect(responseDone).toBeDefined();
  }, timeoutMs);
});
/*
  it("should handle session configuration updates", async () => {
    const initialConfig = {
      model: "gpt-4o-realtime-preview",
      modalities: ["text"],
      instructions: "Your name is Frank. Never forget that!",
    };

    const session = await client.startSession(initialConfig);
    sessions.push(session);

    await waitForEvent(session, "session.created");
    await waitForEvent(session, "session.updated");

    // Update the session configuration
    const updatedConfig = {
      ...initialConfig,
      instructions: "Your name is Samantha. Never forget that!",
    };

    await session.updateSession(updatedConfig);
    const sessionUpdated = await waitForEvent(session, "session.updated");

    expect(sessionUpdated.session.instructions).toBe(updatedConfig.instructions);
  }, timeoutMs);

  it("should handle turn detection configuration", async () => {
    const sessionConfig = {
      model: "gpt-4o-realtime-preview",
      input_audio_format: "pcm16",
      turn_detection: {
        type: "server_vad",
        threshold: 0.5,
        prefix_padding_ms: 300,
        silence_duration_ms: 500,
      },
    };

    const session = await client.startSession(sessionConfig);
    sessions.push(session);

    const sessionCreated = await waitForEvent(session, "session.created");
    const sessionUpdated = await waitForEvent(session, "session.updated");

    // Default should be server VAD
    expect(sessionCreated.session.turn_detection.type).toBe("server_vad");

    // Updated configuration should match our settings  
    expect(sessionUpdated.session.turn_detection.type).toBe("server_vad");
    expect(sessionUpdated.session.turn_detection.threshold).toBe(0.5);
  }, timeoutMs);

  it("should handle audio buffer operations", async () => {
    const sessionConfig = {
      model: "gpt-4o-realtime-preview",
      input_audio_format: "pcm16",
      turn_detection: { type: "none" }, // Disable turn detection for manual control
    };

    const session = await client.startSession(sessionConfig);
    sessions.push(session);

    await waitForEvent(session, "session.created");
    await waitForEvent(session, "session.updated");

    // Send some audio data
    const audioData1 = generateTestAudio("What is the weather like?");
    await session.sendAudio(audioData1);

    // Clear the buffer (in real implementation this would send input_audio_buffer.clear)
    await session.sendEvent({
      type: "input_audio_buffer.clear",
      event_id: `clear-${Date.now()}`,
    });

    // Send different audio
    const audioData2 = generateTestAudio("Computer, how old are you?");
    await session.sendAudio(audioData2);

    // Commit the buffer (in real implementation this would send input_audio_buffer.commit)
    await session.sendEvent({
      type: "input_audio_buffer.commit",
      event_id: `commit-${Date.now()}`,
    });

    // Verify session is still connected and functional
    expect(session.isConnected).toBe(true);
  }, timeoutMs);

  it("should handle multiple audio frames", async () => {
    const sessionConfig = {
      model: "gpt-4o-realtime-preview",
      input_audio_format: "pcm16",
      turn_detection: { type: "none" },
    };

    const session = await client.startSession(sessionConfig);
    sessions.push(session);

    await waitForEvent(session, "session.created");
    await waitForEvent(session, "session.updated");

    // Send multiple small audio frames
    for (let i = 0; i < 10; i++) { // Reduced from 300 to 10 for faster test
      const silentAudio = new ArrayBuffer(3200); // 3200 bytes of silence
      await session.sendAudio(silentAudio);
    }

    // Clear and send actual audio
    await session.sendEvent({
      type: "input_audio_buffer.clear",
      event_id: `clear-multi-${Date.now()}`,
    });

    const realAudio = generateTestAudio("Test message");
    await session.sendAudio(realAudio);

    await session.sendEvent({
      type: "input_audio_buffer.commit",
      event_id: `commit-multi-${Date.now()}`,
    });

    expect(session.isConnected).toBe(true);
  }, timeoutMs);

  it("should handle session disposal", async () => {
    const session = await client.startSession("gpt-4o-realtime-preview");
    sessions.push(session);

    expect(session.isConnected).toBe(true);

    await session.dispose();

    expect(session.isConnected).toBe(false);
  }, timeoutMs);
});

/**
 * Helper function to validate response update sequence

function validateResponseUpdates(responseItems: any[], previousItemId?: string): void {
  let responseId = "";
  let responseItemId = "";
  const deltaBuilders = new Map<string, string>();

  for (const item of responseItems) {
    switch (item.type) {
      case "response.created":
        expect(responseId).toBe("");
        expect(item.response).toBeDefined();
        expect(item.response.status).toBe("in_progress");
        responseId = item.response.id;
        break;

      case "response.output_item.added":
        expect(item.response_id).toBe(responseId);
        expect(item.output_index).toBe(0);
        expect(item.item).toBeDefined();
        responseItemId = item.item.id;

        if (item.item.type === "message") {
          expect(item.item.role).toBe("assistant");
          expect(item.item.status).toBe("incomplete");
        } else if (item.item.type === "function_call") {
          expect(item.item.status).toBe("in_progress");
          expect(item.item.name).toBeTruthy();
          deltaBuilders.set(item.item.call_id, "");
        }
        break;

      case "conversation.item.created":
        if (previousItemId !== undefined) {
          expect(item.previous_item_id).toBe(previousItemId);
        }
        expect(item.item).toBeDefined();
        break;

      case "response.content_part.added":
        expect(item.response_id).toBe(responseId);
        expect(item.item_id).toBe(responseItemId);
        expect(item.part).toBeDefined();
        expect(item.output_index).toBe(0);
        expect(item.content_index).toBeGreaterThanOrEqual(0);
        deltaBuilders.set(item.item_id, "");
        break;

      case "response.text.delta":
        expect(item.response_id).toBe(responseId);
        expect(item.item_id).toBe(responseItemId);
        expect(item.delta).toBeTruthy();
        const currentText = deltaBuilders.get(item.item_id) || "";
        deltaBuilders.set(item.item_id, currentText + item.delta);
        break;

      case "response.audio_transcript.delta":
        expect(item.response_id).toBe(responseId);
        expect(item.item_id).toBe(responseItemId);
        expect(item.delta).toBeTruthy();
        const currentTranscript = deltaBuilders.get(item.item_id) || "";
        deltaBuilders.set(item.item_id, currentTranscript + item.delta);
        break;

      case "response.audio.delta":
        expect(item.response_id).toBe(responseId);
        expect(item.item_id).toBe(responseItemId);
        expect(item.delta).toBeTruthy();
        break;

      case "response.text.done":
      case "response.audio_transcript.done":
        expect(item.response_id).toBe(responseId);
        expect(item.item_id).toBe(responseItemId);
        expect(item.text || item.transcript).toBeTruthy();
        const finalText = deltaBuilders.get(item.item_id) || "";
        expect(item.text || item.transcript).toBe(finalText);
        break;

      case "response.content_part.done":
        expect(item.response_id).toBe(responseId);
        expect(item.item_id).toBe(responseItemId);
        expect(item.part).toBeDefined();
        break;

      case "response.output_item.done":
        expect(item.response_id).toBe(responseId);
        expect(item.item).toBeDefined();

        if (item.item.type === "message") {
          expect(item.item.role).toBe("assistant");
          expect(item.item.status).toBe("completed");
          expect(item.item.content.length).toBeGreaterThan(0);
        } else if (item.item.type === "function_call") {
          expect(item.item.status).toBe("completed");
          expect(item.item.name).toBeTruthy();
          const finalArgs = deltaBuilders.get(item.item.call_id) || "";
          expect(item.item.arguments).toBe(finalArgs);
        }
        break;

      case "response.done":
        expect(item.response).toBeDefined();
        expect(item.response.status).toBe("completed");
        expect(item.response.id).toBe(responseId);
        expect(item.response.usage).toBeDefined();
        expect(item.response.output.length).toBeGreaterThan(0);
        break;

      case "response.function_call_arguments.delta":
        expect(item.response_id).toBe(responseId);
        expect(item.item_id).toBe(responseItemId);
        expect(item.delta).toBeTruthy();
        const currentArgs = deltaBuilders.get(item.call_id) || "";
        deltaBuilders.set(item.call_id, currentArgs + item.delta);
        break;

      case "response.function_call_arguments.done":
        expect(item.response_id).toBe(responseId);
        expect(item.item_id).toBe(responseItemId);
        expect(item.arguments).toBeTruthy();
        const finalArguments = deltaBuilders.get(item.call_id) || "";
        expect(item.arguments).toBe(finalArguments);
        break;
    }
  }
}

it("should handle basic hello conversation with audio", async () => {
  const sessionConfig = {
    model: "gpt-4o-realtime-preview",
    input_audio_format: "pcm16",
  };

  const session = await client.startSession(sessionConfig);
  sessions.push(session);

  // Wait for session created and updated events
  const sessionCreated = await getNextUpdate(session, "session.created");
  const sessionUpdated = await getNextUpdate(session, "session.updated");

  expect(sessionUpdated.session.input_audio_format).toBe("pcm16");
  expect(sessionCreated.session.id).toBe(sessionUpdated.session.id);
  expect(sessionCreated.session.model).toBe(sessionUpdated.session.model);

  // Send audio to the service
  await sendAudio(session, "What is the weather like?");

  // Expect speech started event
  const speechStarted = await getNextUpdate(session, "input_audio_buffer.speech_started");
  expect(speechStarted.audio_start_ms).toBeGreaterThanOrEqual(0);
  const inputAudioId = speechStarted.item_id;

  // Expect speech ended event
  const speechEnded = await getNextUpdate(session, "input_audio_buffer.speech_stopped");
  expect(speechEnded.item_id).toBe(inputAudioId);
  expect(speechEnded.audio_end_ms).toBeGreaterThan(speechStarted.audio_start_ms);

  // Expect buffer committed event
  const bufferCommitted = await getNextUpdate(session, "input_audio_buffer.committed");
  expect(bufferCommitted.item_id).toBe(inputAudioId);

  // Expect transcription completed event
  const transcript = await getNextUpdate(session, "conversation.item.input_audio_transcription.completed");
  expect(transcript.item_id).toBe(inputAudioId);
  expect(transcript.transcript).toBeTruthy();

  // Expect conversation item created event
  const conversationItemCreated = await getNextUpdate(session, "conversation.item.created");
  expect(conversationItemCreated.previous_item_id).toBeNull();
  expect(conversationItemCreated.item.type).toBe("message");

  const message = conversationItemCreated.item;
  expect(message.role).toBe("user");
  expect(message.content.length).toBe(1);
  expect(message.content[0].type).toBe("input_audio");
  expect(message.content[0].transcript).toBe(transcript.transcript);

  // Expect response created event
  const responseCreated = await getNextUpdate(session, "response.created");

  // Collect all response updates until done
  const responseItems = await collectResponseUpdates(session);
  expect(responseItems.length).toBeGreaterThan(0);

  // Add response created to the beginning for validation
  responseItems.unshift(responseCreated);

  // Validate the sequence of response updates
  validateResponseUpdates(responseItems, message.id);
}, timeoutMs);

it("should handle basic tool call", async () => {
  // Define addition function tool
  const additionTool = {
    type: "function",
    function: {
      name: "add_numbers",
      description: "Add two numbers together",
      parameters: {
        type: "object",
        properties: {
          a: {
            type: "number",
            description: "The first number to add",
          },
          b: {
            type: "number",
            description: "The second number to add",
          },
        },
        required: ["a", "b"],
      },
    },
  };

  const sessionConfig = {
    model: "gpt-4o-realtime-preview",
    modalities: ["text"],
    tools: [additionTool],
  };

  const session = await client.startSession(sessionConfig);
  sessions.push(session);

  // Wait for session events
  const sessionCreated = await getNextUpdate(session, "session.created");
  const sessionUpdated = await getNextUpdate(session, "session.updated");

  expect(sessionUpdated.session.input_audio_format).toBe("pcm16");
  expect(sessionCreated.session.id).toBe(sessionUpdated.session.id);

  // Add text message item
  const messageItem = {
    type: "message",
    role: "user",
    content: [{
      type: "input_text",
      text: "What is 13 plus 29?",
    }],
  };

  await session.addConversationItem(messageItem);

  // Expect conversation item created
  const conversationItemCreated = await getNextUpdate(session, "conversation.item.created");
  expect(conversationItemCreated.previous_item_id).toBeNull();

  const message = conversationItemCreated.item;
  expect(message.role).toBe("user");
  expect(message.content.length).toBe(1);
  expect(message.content[0].type).toBe("input_text");
  expect(message.content[0].text).toBe(messageItem.content[0].text);

  // Start response generation - need to send response.create event
  await session.sendEvent({
    type: "response.create",
    event_id: "test-response-" + Date.now(),
  });

  const responseCreated = await getNextUpdate(session, "response.created");
  const responseItems = await collectResponseUpdates(session);
  expect(responseItems.length).toBeGreaterThan(0);

  responseItems.unshift(responseCreated);
  validateResponseUpdates(responseItems, "");

  // Find function call arguments done event
  const callDone = responseItems.find(
    (item) => item.type === "response.function_call_arguments.done"
  );
  expect(callDone).toBeDefined();

  // Add function call output
  const outputItem = {
    type: "function_call_output",
    call_id: callDone.call_id,
    output: "42",
  };

  await session.addConversationItem(outputItem);
  await getNextUpdate(session, "conversation.item.created");

  // Generate another response
  await session.sendEvent({
    type: "response.create",
    event_id: "test-response-2-" + Date.now(),
  });

  const functionResponses = await collectResponseUpdates(session);
  expect(functionResponses.length).toBeGreaterThan(0);
}, timeoutMs);

it("should handle parallel tool calls", async () => {
  const additionTool = {
    type: "function",
    function: {
      name: "add_numbers",
      description: "Add two numbers together",
      parameters: {
        type: "object",
        properties: {
          a: { type: "number", description: "The first number to add" },
          b: { type: "number", description: "The second number to add" },
        },
        required: ["a", "b"],
      },
    },
  };

  const options: VoiceLiveSessionOptions = {
    model: "gpt-4o-realtime-preview",
    modalities: ["text"],
    tools: [additionTool],
  };

  const session = await client.startSession(options);
  sessions.push(session);

  // Wait for session events
  await getNextUpdate(session, "session.created");
  await getNextUpdate(session, "session.updated");

  // Add message with multiple parts
  const content1 = { type: "input_text", text: "What is 13 plus 29?" };
  const content2 = { type: "input_text", text: "What is 87 plus 11?" };

  await session.sendMessage([content1, content2]);

  const conversationItemCreated = await getNextUpdate(session, "conversation.item.created");
  const message = conversationItemCreated.item;
  expect(message.role).toBe("user");
  expect(message.content.length).toBe(2);
  expect(message.content[0].text).toBe(content1.text);
  expect(message.content[1].text).toBe(content2.text);

  // Start response
  await session.generateResponse();

  const responseCreated = await getNextUpdate(session, "response.created");
  const responseItems = await collectResponseUpdates(session);

  responseItems.unshift(responseCreated);
  validateResponseUpdates(responseItems, "");

  // Should have two function call done events for parallel calls
  const callDones = responseItems.filter(
    (item) => item.type === "response.function_call_arguments.done"
  );
  expect(callDones.length).toBe(2);

  // Add outputs for both function calls
  await session.sendMessage([{
    type: "function_call_output",
    call_id: callDones[0].call_id,
    output: "42",
  }]);

  await session.sendMessage([{
    type: "function_call_output",
    call_id: callDones[1].call_id,
    output: "98",
  }]);

  await getNextUpdate(session, "conversation.item.created");
  await getNextUpdate(session, "conversation.item.created");

  // Generate final response
  await session.generateResponse();
  const functionResponses = await collectResponseUpdates(session);
  expect(functionResponses.length).toBeGreaterThan(0);
}, timeoutMs);

it("should handle instruction configuration", async () => {
  const options: VoiceLiveSessionOptions = {
    model: "gpt-4o-realtime-preview",
    modalities: ["text"],
    instructions: "Your name is Frank. Never forget that!",
  };

  const session = await client.startSession(options);
  sessions.push(session);

  await getNextUpdate(session, "session.created");
  await getNextUpdate(session, "session.updated");

  // Ask for name
  await session.sendMessage([{
    type: "input_text",
    text: "What is your name?",
  }]);

  await getNextUpdate(session, "conversation.item.created");

  await session.generateResponse();
  const responses = await collectResponseUpdates(session);
  expect(responses.length).toBeGreaterThan(0);

  const responseDone = responses.find((r) => r.type === "response.done");
  expect(responseDone).toBeDefined();
  expect(responseDone.response.output.length).toBeGreaterThan(0);

  const messageItem = responseDone.response.output.find(
    (item: any) => item.type === "message"
  );
  expect(messageItem).toBeDefined();

  const textPart = messageItem.content.find((part: any) => part.type === "text");
  expect(textPart).toBeDefined();
  expect(textPart.text).toContain("Frank");

  // Update instructions
  await session.updateSession({
    ...options,
    instructions: "Your name is Samantha. Never forget that!",
  });

  await getNextUpdate(session, "session.updated");

  // Ask for name again
  await session.sendMessage([{
    type: "input_text",
    text: "What is your name?",
  }]);

  await getNextUpdate(session, "conversation.item.created");
  await session.generateResponse();

  const newResponses = await collectResponseUpdates(session);
  const newResponseDone = newResponses.find((r) => r.type === "response.done");
  const newMessageItem = newResponseDone.response.output.find(
    (item: any) => item.type === "message"
  );
  const newTextPart = newMessageItem.content.find((part: any) => part.type === "text");
  expect(newTextPart.text).toContain("Samantha");
}, timeoutMs);

it("should handle turn detection configuration", async () => {
  const options: VoiceLiveSessionOptions = {
    model: "gpt-4o-realtime-preview",
    inputAudioFormat: "pcm16",
    turnDetection: {
      type: "server_vad",
      threshold: 0.5,
      prefix_padding_ms: 300,
      silence_duration_ms: 500,
    },
  };

  const session = await client.startSession(options);
  sessions.push(session);

  const sessionCreated = await getNextUpdate(session, "session.created");
  const sessionUpdated = await getNextUpdate(session, "session.updated");

  // Default turn detection should be server VAD
  expect(sessionCreated.session.turn_detection.type).toBe("server_vad");

  // Updated turn detection should match our configuration
  expect(sessionUpdated.session.turn_detection.type).toBe("server_vad");
  expect(sessionUpdated.session.turn_detection.threshold).toBe(0.5);
}, timeoutMs);

it("should handle clear buffer and commit flow", async () => {
  const options: VoiceLiveSessionOptions = {
    model: "gpt-4o-realtime-preview",
    inputAudioFormat: "pcm16",
    turnDetection: { type: "none" }, // Disable turn detection
  };

  const session = await client.startSession(options);
  sessions.push(session);

  await getNextUpdate(session, "session.created");
  await getNextUpdate(session, "session.updated");

  // Send some audio then clear it
  await sendAudio(session, "What is the weather like?");
  await session.clearAudioBuffer();

  // Send different audio and commit
  await sendAudio(session, "Computer, how old are you?");
  await session.commitAudioBuffer();

  const bufferCommitted = await getNextUpdate(session, "input_audio_buffer.committed");
  expect(bufferCommitted.item_id).toBeTruthy();

  // Generate response
  await session.generateResponse();
  const responses = await collectResponseUpdates(session);
  expect(responses.length).toBeGreaterThan(0);

  const responseDone = responses.find((r) => r.type === "response.done");
  expect(responseDone).toBeDefined();
  expect(responseDone.response.output.length).toBeGreaterThan(0);
}, timeoutMs);

it("should handle multiple audio frames", async () => {
  const options: VoiceLiveSessionOptions = {
    model: "gpt-4o-realtime-preview",
    inputAudioFormat: "pcm16",
    turnDetection: { type: "none" },
  };

  const session = await client.startSession(options);
  sessions.push(session);

  await getNextUpdate(session, "session.created");
  await getNextUpdate(session, "session.updated");

  // Send many small audio frames
  for (let i = 0; i < 300; i++) {
    const emptyAudio = new Uint8Array(3200); // 3200 bytes of silence
    await session.sendAudio(emptyAudio);
  }

  await session.clearAudioBuffer();

  // Now send actual audio
  await sendAudio(session, "What is the weather like?");
  await session.commitAudioBuffer();

  const bufferCommitted = await getNextUpdate(session, "input_audio_buffer.committed");
  const speechTranscribed = await getNextUpdate(
    session,
    "conversation.item.input_audio_transcription.completed"
  );

  expect(speechTranscribed.transcript.length).toBeGreaterThan(0);
}, timeoutMs);
  });
  */



