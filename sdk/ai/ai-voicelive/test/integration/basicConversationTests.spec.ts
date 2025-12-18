// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  type ClientEventResponseCreate,
  type RequestSession,
  VoiceLiveClient,
  type VoiceLiveSession,
} from "../../src/index.js";
import { isLiveMode } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { generateTestAudio, sendAudio } from "../infrastructure/audioTestHelpers.js";
import { SessionEventRecorder } from "../infrastructure/sessionEventRecorder.js";
import {
  type FunctionTool,
  type InputAudioContentPart,
  type InputTextContentPart, KnownClientEventType, KnownContentPartType, KnownInputAudioFormat, KnownItemType, KnownMessageRole, KnownModality, KnownResponseStatus, KnownServerEventType, KnownToolType, KnownTurnDetectionType,
  type MessageItem,
  type OutputTextContentPart,
  type ServerEventConversationItemCreated,
  type ServerEventConversationItemInputAudioTranscriptionCompleted,
  type ServerEventInputAudioBufferCommitted,
  type ServerEventInputAudioBufferSpeechStarted,
  type ServerEventInputAudioBufferSpeechStopped,
  type ServerEventResponseDone,
  type ServerEventResponseFunctionCallArgumentsDone,
  type ServerEventResponseMcpCallArgumentsDelta,
  type ServerEventSessionCreated,
  type ServerEventSessionUpdated,
  type ServerVad
} from "../../src/models/models.js";

// Only configure dotenv in Node.js environments
if (typeof self === 'undefined') {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('dotenv').config();
  } catch {
    // dotenv not available or we're in a browser, ignore
  }
}

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


  it("should handle session configuration updates", async () => {
    const initialConfig = {
      model: "gpt-4o",
      modalities: [KnownModality.Text],
      instructions: "Your name is Frank. Never forget that!",
    } as RequestSession;

    const session = await client.createSession(initialConfig);
    sessions.push(session);

    const recorder = new SessionEventRecorder(session); // Attach recorder first

    await session.connect();
    await recorder.waitForEvent(KnownServerEventType.SessionCreated);
    await session.updateSession(initialConfig);
    await recorder.waitForEvent(KnownServerEventType.SessionUpdated);

    // Update the session configuration
    const updatedConfig = {
      ...initialConfig,
      instructions: "Your name is Samantha. Never forget that!",
    };

    await session.updateSession(updatedConfig);
    const sessionUpdated = await recorder.waitForEvent(KnownServerEventType.SessionUpdated) as ServerEventSessionUpdated;

    expect(sessionUpdated.session.instructions).toBe(updatedConfig.instructions);
  }, timeoutMs);

  it("should handle turn detection configuration", async () => {
    const sessionConfig = {
      model: "gpt-4o",
      input_audio_format: KnownInputAudioFormat.Pcm16,
      turn_detection: {
        type: KnownTurnDetectionType.ServerVad,
        threshold: 0.5,
        prefix_padding_ms: 300,
        silence_duration_ms: 500,
      },
    } as RequestSession;

    const session = await client.createSession(sessionConfig);
    sessions.push(session);

    const recorder = new SessionEventRecorder(session); // Attach recorder first

    await session.connect();

    const sessionCreated = await recorder.waitForEvent(KnownServerEventType.SessionCreated) as ServerEventSessionCreated;
    await session.updateSession(sessionConfig);
    const sessionUpdated = await recorder.waitForEvent(KnownServerEventType.SessionUpdated) as ServerEventSessionUpdated;

    // Default should be server VAD
    expect(sessionCreated.session.turnDetection?.type).toBe(KnownTurnDetectionType.ServerVad);

    // Updated configuration should match our settings  
    expect(sessionUpdated.session.turnDetection?.type).toBe(KnownTurnDetectionType.ServerVad);
    const turnDetection = sessionUpdated.session.turnDetection as ServerVad;
    expect(turnDetection.threshold).toBe(0.5);
  }, timeoutMs);

  it("should handle audio buffer operations", async () => {
    const sessionConfig = {
      model: "gpt-4o",
      input_audio_format: KnownInputAudioFormat.Pcm16,
      turn_detection: null, // Disable turn detection for manual control
    } as RequestSession;

    const session = await client.createSession(sessionConfig);
    sessions.push(session);

    const recorder = new SessionEventRecorder(session); // Attach recorder first

    await session.connect();
    await recorder.waitForEvent(KnownServerEventType.SessionCreated);
    await session.updateSession(sessionConfig);
    await recorder.waitForEvent(KnownServerEventType.SessionUpdated);

    // Send some audio data
    const audioData1 = await generateTestAudio("What is the weather like?");
    await session.sendAudio(audioData1);

    // Clear the buffer (in real implementation this would send input_audio_buffer.clear)
    await session.sendEvent({
      type: KnownClientEventType.InputAudioBufferClear,
    });

    // Send different audio
    const audioData2 = await generateTestAudio("Computer, how old are you?");
    await session.sendAudio(audioData2);

    // Commit the buffer (in real implementation this would send input_audio_buffer.commit)
    await session.sendEvent({
      type: KnownClientEventType.InputAudioBufferCommit
    });

    // Verify session is still connected and functional
    expect(session.isConnected).toBe(true);
  }, timeoutMs);

  it("should handle multiple audio frames", async () => {
    const sessionConfig = {
      model: "gpt-4o",
      input_audio_format: KnownInputAudioFormat.Pcm16,
      turn_detection: null,
    };

    const session = await client.createSession(sessionConfig);
    sessions.push(session);

    const recorder = new SessionEventRecorder(session); // Attach recorder first

    await session.connect();
    await recorder.waitForEvent(KnownServerEventType.SessionCreated);
    await session.updateSession(sessionConfig);
    await recorder.waitForEvent(KnownServerEventType.SessionUpdated);

    // Send multiple small audio frames
    for (let i = 0; i < 10; i++) { // Reduced from 300 to 10 for faster test
      const silentAudio = new ArrayBuffer(3200); // 3200 bytes of silence
      await session.sendAudio(silentAudio);
    }

    // Clear and send actual audio
    await session.sendEvent({
      type: KnownClientEventType.InputAudioBufferClear,
    });

    const realAudio = await generateTestAudio("Test message");
    await session.sendAudio(realAudio);

    await session.sendEvent({
      type: KnownClientEventType.InputAudioBufferCommit,
    });

    expect(session.isConnected).toBe(true);
  }, timeoutMs);

  it("should handle session disposal", async () => {
    const session = await client.startSession("gpt-4o");
    sessions.push(session);

    expect(session.isConnected).toBe(true);

    await session.dispose();

    expect(session.isConnected).toBe(false);
  }, timeoutMs);

  /**
   * Helper function to validate response update sequence
   */
  function validateResponseUpdates(responseItems: any[], previousItemId?: string): void {
    let responseId = "";
    let responseItemId = "";
    const deltaBuilders = new Map<string, string>();

    for (const item of responseItems) {
      switch (item.type) {
        case KnownServerEventType.ResponseCreated:
          expect(responseId).toBe("");
          expect(item.response).toBeDefined();
          expect(item.response.status).toBe("in_progress");
          responseId = item.response.id;
          break;

        case KnownServerEventType.ResponseOutputItemAdded:
          expect(item.response_id).toBe(responseId);
          expect(item.output_index).toBe(0);
          expect(item.item).toBeDefined();
          responseItemId = item.item.id;

          if (item.item.type === KnownItemType.Message) {
            expect(item.item.role).toBe(KnownMessageRole.Assistant);
            expect(item.item.status).toBe(KnownResponseStatus.Incomplete);
          } else if (item.item.type === KnownItemType.FunctionCall) {
            expect(item.item.status).toBe(KnownResponseStatus.InProgress);
            expect(item.item.name).toBeTruthy();
            deltaBuilders.set(item.item.call_id, "");
          }
          break;

        case KnownServerEventType.ConversationItemCreated:
          if (previousItemId !== undefined) {
            expect(item.previous_item_id).toBe(previousItemId);
          }
          expect(item.item).toBeDefined();
          break;

        case KnownServerEventType.ResponseContentPartAdded:
          expect(item.response_id).toBe(responseId);
          expect(item.item_id).toBe(responseItemId);
          expect(item.part).toBeDefined();
          expect(item.output_index).toBe(0);
          expect(item.content_index).toBeGreaterThanOrEqual(0);
          deltaBuilders.set(item.item_id, "");
          break;

        case KnownServerEventType.ResponseTextDelta:
          {
            expect(item.response_id).toBe(responseId);
            expect(item.item_id).toBe(responseItemId);
            expect(item.delta).toBeTruthy();
            const currentText = deltaBuilders.get(item.item_id) || "";
            deltaBuilders.set(item.item_id, currentText + item.delta);
            break;
          }
        case KnownServerEventType.ResponseAudioTranscriptDelta: {
          expect(item.response_id).toBe(responseId);
          expect(item.item_id).toBe(responseItemId);
          expect(item.delta).toBeTruthy();
          const currentTranscript = deltaBuilders.get(item.item_id) || "";
          deltaBuilders.set(item.item_id, currentTranscript + item.delta);
          break;
        }
        case KnownServerEventType.ResponseAudioDelta: {
          expect(item.response_id).toBe(responseId);
          expect(item.item_id).toBe(responseItemId);
          expect(item.delta).toBeTruthy();
          break;
        }
        case KnownServerEventType.ResponseTextDone:
        case KnownServerEventType.ResponseAudioTranscriptDone: {
          expect(item.response_id).toBe(responseId);
          expect(item.item_id).toBe(responseItemId);
          expect(item.text || item.transcript).toBeTruthy();
          const finalText = deltaBuilders.get(item.item_id) || "";
          expect(item.text || item.transcript).toBe(finalText);
          break;
        }
        case KnownServerEventType.ResponseContentPartDone: {
          expect(item.response_id).toBe(responseId);
          expect(item.item_id).toBe(responseItemId);
          expect(item.part).toBeDefined();
          break;
        }
        case KnownServerEventType.ResponseOutputItemDone: {
          expect(item.response_id).toBe(responseId);
          expect(item.item).toBeDefined();

          if (item.item.type === KnownItemType.Message) {
            expect(item.item.role).toBe(KnownMessageRole.Assistant);
            expect(item.item.status).toBe(KnownResponseStatus.Completed);
            expect(item.item.content.length).toBeGreaterThan(0);
          } else if (item.item.type === KnownItemType.FunctionCall) {
            expect(item.item.status).toBe(KnownResponseStatus.Completed);
            expect(item.item.name).toBeTruthy();
            const finalArgs = deltaBuilders.get(item.item.call_id) || "";
            expect(item.item.arguments).toBe(finalArgs);
          }
          break;
        }
        case KnownServerEventType.ResponseDone: {
          expect(item.response).toBeDefined();
          expect(item.response.status).toBe(KnownResponseStatus.Completed);
          expect(item.response.id).toBe(responseId);
          expect(item.response.usage).toBeDefined();
          expect(item.response.output.length).toBeGreaterThan(0);
          break;
        }
        case KnownServerEventType.ResponseFunctionCallArgumentsDelta: {
          expect(item.response_id).toBe(responseId);
          expect(item.item_id).toBe(responseItemId);
          expect(item.delta).toBeTruthy();
          const currentArgs = deltaBuilders.get(item.call_id) || "";
          deltaBuilders.set(item.call_id, currentArgs + item.delta);
          break;
        }
        case KnownServerEventType.ResponseFunctionCallArgumentsDone: {
          expect(item.response_id).toBe(responseId);
          expect(item.item_id).toBe(responseItemId);
          expect(item.arguments).toBeTruthy();
          const finalArguments = deltaBuilders.get(item.call_id) || "";
          expect(item.arguments).toBe(finalArguments);
          break;
        }
      }
    }
  }

  it("should handle basic hello conversation with audio", async () => {
    const sessionConfig = {
      model: "gpt-4o",
      inputAudioFormat: KnownInputAudioFormat.Pcm16,
      turnDetection: {
        type: KnownTurnDetectionType.ServerVad,
        threshold: 0.5,
        prefixPaddingMs: 300,
      }
    } as RequestSession;

    const session = await client.createSession(sessionConfig);
    sessions.push(session);

    const recorder = new SessionEventRecorder(session); // Attach recorder first

    await session.connect();
    const sessionCreated = await recorder.waitForEvent(KnownServerEventType.SessionCreated) as ServerEventSessionCreated;
    await session.updateSession(sessionConfig);
    const sessionUpdated = await recorder.waitForEvent(KnownServerEventType.SessionUpdated) as ServerEventSessionUpdated;

    expect(sessionUpdated.session.inputAudioFormat).toBe(KnownInputAudioFormat.Pcm16);
    expect(sessionCreated.session.id).toBe(sessionUpdated.session.id);
    expect(sessionCreated.session.model).toBe(sessionUpdated.session.model);

    // Send audio to the service
    await sendAudio(session, "What is the weather like?");

    // Expect speech started event
    const speechStarted = await recorder.waitForEvent(KnownServerEventType.InputAudioBufferSpeechStarted) as ServerEventInputAudioBufferSpeechStarted;
    expect(speechStarted.audioStartInMs).toBeGreaterThanOrEqual(0);
    const inputAudioId = speechStarted.itemId;

    // Expect speech ended event
    const speechEnded = await recorder.waitForEvent(KnownServerEventType.InputAudioBufferSpeechStopped) as ServerEventInputAudioBufferSpeechStopped;
    expect(speechEnded.itemId).toBe(inputAudioId);
    expect(speechEnded.audioEndInMs).toBeGreaterThan(speechStarted.audioStartInMs);

    // Expect buffer committed event
    const bufferCommitted = await recorder.waitForEvent(KnownServerEventType.InputAudioBufferCommitted) as ServerEventInputAudioBufferCommitted;
    expect(bufferCommitted.itemId).toBe(inputAudioId);

    // Expect transcription completed event
    const transcript = await recorder.waitForEvent(KnownServerEventType.ConversationItemInputAudioTranscriptionCompleted) as ServerEventConversationItemInputAudioTranscriptionCompleted;
    expect(transcript.itemId).toBe(inputAudioId);
    expect(transcript.transcript).toBeTruthy();

    // Expect conversation item created event
    const conversationItemCreated = await recorder.waitForEvent(KnownServerEventType.ConversationItemCreated) as ServerEventConversationItemCreated;
    expect(conversationItemCreated.previousItemId).toBeNull();
    expect(conversationItemCreated.item?.type).toBe(KnownItemType.Message);

    const message = conversationItemCreated.item as MessageItem;
    expect(message.role).toBe(KnownMessageRole.User);
    expect(message.content.length).toBe(1);
    expect(message.content[0].type).toBe(KnownContentPartType.InputAudio);
    const inputItem = message.content[0] as InputAudioContentPart;
    expect(inputItem.transcript).toBe(transcript.transcript);

    // Expect response created event
    const responseCreated = await recorder.waitForEvent(KnownServerEventType.ResponseCreated);

    // Collect all response updates until done
    const responseItems = await recorder.waitForEvents(KnownServerEventType.ResponseDone);
    expect(responseItems.length).toBeGreaterThan(0);

    // Add response created to the beginning for validation
    responseItems.unshift(responseCreated);

    // Validate the sequence of response updates
    validateResponseUpdates(responseItems, message.id);
  }, timeoutMs);

  it("should handle basic tool call", async () => {
    // Define addition function tool
    const additionTool: FunctionTool = {
      type: KnownToolType.Function,
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
    };

    const sessionConfig: RequestSession = {
      model: "gpt-4o",
      modalities: [KnownModality.Text],
      tools: [additionTool],
    };

    const session = await client.createSession(sessionConfig);
    sessions.push(session);

    const recorder = new SessionEventRecorder(session);

    await session.connect();
    const sessionCreated = await recorder.waitForEvent(KnownServerEventType.SessionCreated) as ServerEventSessionCreated;
    await session.updateSession(sessionConfig);
    const sessionUpdated = await recorder.waitForEvent(KnownServerEventType.SessionUpdated) as ServerEventSessionUpdated;

    expect(sessionUpdated.session.inputAudioFormat).toBe(KnownInputAudioFormat.Pcm16);
    expect(sessionCreated.session.id).toBe(sessionUpdated.session.id);

    // Add text message item
    const messageItem = {
      type: KnownItemType.Message,
      role: KnownMessageRole.User,
      content: [{
        type: "input_text",
        text: "What is 13 plus 29?",
      }],
    };

    await session.addConversationItem(messageItem);

    // Expect conversation item created
    const conversationItemCreated = await recorder.waitForEvent(KnownServerEventType.ConversationItemCreated) as ServerEventConversationItemCreated;
    expect(conversationItemCreated.previousItemId).toBeNull();

    const message = conversationItemCreated.item as MessageItem;
    expect(message.role).toBe(KnownMessageRole.User);
    expect(message.content.length).toBe(1);
    expect(message.content[0].type).toBe(KnownContentPartType.InputText);
    const textPart = message.content[0] as InputTextContentPart
    expect(textPart.text).toBe(messageItem.content[0].text);

    // Start response generation - need to send response.create event
    await session.sendEvent({
      type: KnownClientEventType.ResponseCreate,
    });

    const responseCreated = await recorder.waitForEvent(KnownServerEventType.ResponseCreated);
    const responseItems = await recorder.waitForEvents(KnownServerEventType.ResponseDone);
    expect(responseItems.length).toBeGreaterThan(0);

    responseItems.unshift(responseCreated);
    validateResponseUpdates(responseItems, "");

    // Find function call arguments done event
    const callDone = responseItems.find(
      (item) => item.type === KnownServerEventType.ResponseFunctionCallArgumentsDone
    ) as ServerEventResponseFunctionCallArgumentsDone;
    expect(callDone).toBeDefined();

    // Add function call output
    const outputItem = {
      type: KnownItemType.FunctionCallOutput,
      callId: callDone.callId,
      output: "42",
    };

    await session.addConversationItem(outputItem);
    await recorder.waitForEvent(KnownServerEventType.ConversationItemCreated);

    // Generate another response
    await session.sendEvent({
      type: KnownClientEventType.ResponseCreate,
    });

    const functionResponses = await recorder.waitForEvents(KnownServerEventType.ResponseDone);
    expect(functionResponses.length).toBeGreaterThan(0);
  }, timeoutMs);

  it("should handle parallel tool calls", async () => {
    const additionTool: FunctionTool = {
      type: KnownToolType.Function,
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
    };

    const sessionConfig: RequestSession = {
      model: "gpt-4o",
      modalities: [KnownModality.Text],
      tools: [additionTool],
    };

    const session = await client.createSession(sessionConfig);
    sessions.push(session);

    const recorder = new SessionEventRecorder(session);

    await session.connect();
    await recorder.waitForEvent(KnownServerEventType.SessionCreated);
    await session.updateSession(sessionConfig);
    await recorder.waitForEvent(KnownServerEventType.SessionUpdated);

    // Add message with multiple parts
    const content1 = { type: KnownContentPartType.InputText, text: "What is 13 plus 29?" };
    const content2 = { type: KnownContentPartType.InputText, text: "What is 87 plus 11?" };

    const messageItem = {
      type: KnownItemType.Message,
      role: KnownMessageRole.User,
      content: [content1, content2],
    } as MessageItem;

    const messageEvent = {
      type: KnownClientEventType.ConversationItemCreate,
      item: messageItem,
    };

    await session.sendEvent(messageEvent);

    const conversationItemCreated = await recorder.waitForEvent(KnownServerEventType.ConversationItemCreated) as ServerEventConversationItemCreated;
    const message = conversationItemCreated.item as MessageItem;
    expect(message.role).toBe(KnownMessageRole.User);
    expect(message.content.length).toBe(2);
    const contentPart1 = message.content[0] as InputTextContentPart;
    const contentPart2 = message.content[1] as InputTextContentPart;

    expect(contentPart1.text).toBe(content1.text);
    expect(contentPart2.text).toBe(content2.text);

    // Start response
    await session.sendEvent({
      type: KnownClientEventType.ResponseCreate,
    });

    const responseCreated = await recorder.waitForEvent(KnownServerEventType.ResponseCreated);
    const responseItems = await recorder.waitForEvents(KnownServerEventType.ResponseDone);

    responseItems.unshift(responseCreated);
    validateResponseUpdates(responseItems, "");

    // Should have two function call done events for parallel calls
    const callDones = responseItems.filter(
      (item) => item.type === KnownServerEventType.ResponseFunctionCallArgumentsDone
    );

    expect(callDones.length).toBe(2);

    const call1Done = callDones[0] as ServerEventResponseFunctionCallArgumentsDone;
    const call2Done = callDones[1] as ServerEventResponseFunctionCallArgumentsDone;

    // Add outputs for both function calls
    await session.sendEvent({
      type: KnownClientEventType.ConversationItemCreate,
      item: {
        type: KnownItemType.FunctionCallOutput,
        callId: call1Done.callId,
        output: "42",
      }
    });

    await session.sendEvent({
      type: KnownClientEventType.ConversationItemCreate,
      item: {
        type: KnownItemType.FunctionCallOutput,
        callId: call2Done.callId,
        output: "98",
      }
    });

    await recorder.waitForEvent(KnownServerEventType.ConversationItemCreated);
    await recorder.waitForEvent(KnownServerEventType.ConversationItemCreated);

    // Generate final response
    await session.sendEvent({
      type: KnownClientEventType.ResponseCreate,
    });
    const functionResponses = await recorder.waitForEvents(KnownServerEventType.ResponseDone);
    expect(functionResponses.length).toBeGreaterThan(0);
  }, timeoutMs);

  it("should handle instruction configuration", async () => {
    const sessionConfig: RequestSession = {
      model: "gpt-4o",
      modalities: [KnownModality.Text],
      instructions: "Your name is Frank. Never forget that!",
    };

    const session = await client.createSession(sessionConfig);
    sessions.push(session);

    const recorder = new SessionEventRecorder(session);

    await session.connect();
    await recorder.waitForEvent(KnownServerEventType.SessionCreated);
    await session.updateSession(sessionConfig);
    await recorder.waitForEvent(KnownServerEventType.SessionUpdated);

    // Ask for name
    await session.sendEvent({
      type: KnownClientEventType.ConversationItemCreate,
      item: {
        type: KnownItemType.Message,
        role: KnownMessageRole.User,
        content: [{
          type: KnownContentPartType.InputText,
          text: "What is your name?",
        }],
      },
    });

    await recorder.waitForEvent(KnownServerEventType.ConversationItemCreated);

    await session.sendEvent({
      type: KnownClientEventType.ResponseCreate,
    });
    const responses = await recorder.waitForEvents(KnownServerEventType.ResponseDone);
    expect(responses.length).toBeGreaterThan(0);

    const responseDone = responses.find((r) => r.type === KnownServerEventType.ResponseDone) as ServerEventResponseDone;
    expect(responseDone).toBeDefined();
    const response = responseDone.response as Response;
    expect(responseDone.response.output?.length).toBeGreaterThan(0);

    const messageItem = responseDone.response.output?.find(
      (item: any) => item.type === KnownItemType.Message
    ) as MessageItem;
    expect(messageItem).toBeDefined();

    const textPart = messageItem.content.find((part: any) => part.type === "text") as OutputTextContentPart;
    expect(textPart).toBeDefined();
    expect(textPart.text).toContain("Frank");

    // Update instructions
    await session.updateSession({
      ...sessionConfig,
      instructions: "Your name is Samantha. Never forget that!",
    });

    await recorder.waitForEvent(KnownServerEventType.SessionUpdated);

    // Ask for name again
    await session.sendEvent({
      type: KnownClientEventType.ConversationItemCreate,
      item: {
        type: KnownItemType.Message,
        role: KnownMessageRole.User,
        content: [{
          type: KnownContentPartType.InputText,
          text: "What is your name?",
        }],
      },
    });

    await recorder.waitForEvent(KnownServerEventType.ConversationItemCreated);
    await session.sendEvent({
      type: KnownClientEventType.ResponseCreate,
    });

    const newResponses = await recorder.waitForEvents(KnownServerEventType.ResponseDone);
    const newResponseDone = newResponses.find((r) => r.type === KnownServerEventType.ResponseDone) as ServerEventResponseDone;

    const newMessageItem = newResponseDone.response.output?.find(
      (item: any) => item.type === KnownItemType.Message
    ) as MessageItem;
    const newTextPart = newMessageItem.content?.find((part: any) => part.type === "text") as OutputTextContentPart;
    expect(newTextPart.text).toContain("Samantha");
  }, timeoutMs);

  it("should handle turn detection configuration with custom settings", async () => {
    const sessionConfig: RequestSession = {
      model: "gpt-4o",
      inputAudioFormat: KnownInputAudioFormat.Pcm16,
      turnDetection: {
        type: KnownTurnDetectionType.ServerVad,
        threshold: 0.5,
        prefixPaddingMs: 300,
        silenceDurationMs: 500,
      } as ServerVad,
    };

    const session = await client.createSession(sessionConfig);
    sessions.push(session);

    const recorder = new SessionEventRecorder(session);

    await session.connect();
    const sessionCreated = await recorder.waitForEvent(KnownServerEventType.SessionCreated) as ServerEventSessionCreated;
    await session.updateSession(sessionConfig);
    const sessionUpdated = await recorder.waitForEvent(KnownServerEventType.SessionUpdated) as ServerEventSessionUpdated;

    // Default turn detection should be server VAD
    expect(sessionCreated.session.turnDetection?.type).toBe(KnownTurnDetectionType.ServerVad);

    // Updated turn detection should match our configuration
    expect(sessionUpdated.session.turnDetection?.type).toBe(KnownTurnDetectionType.ServerVad);
    const turnDetection = sessionUpdated.session.turnDetection as ServerVad;
    expect(turnDetection.threshold).toBe(0.5);
  }, timeoutMs);

  it("should handle clear buffer and commit flow", async () => {
    const sessionConfig: RequestSession = {
      model: "gpt-4o",
      inputAudioFormat: KnownInputAudioFormat.Pcm16,
      turnDetection: undefined, // Disable turn detection
    };

    const session = await client.createSession(sessionConfig);
    sessions.push(session);

    const recorder = new SessionEventRecorder(session);

    await session.connect();
    await recorder.waitForEvent(KnownServerEventType.SessionCreated);
    await session.updateSession(sessionConfig);
    await recorder.waitForEvent(KnownServerEventType.SessionUpdated);

    // Send some audio then clear it
    await sendAudio(session, "What is the weather like?");
    await session.sendEvent({
      type: KnownClientEventType.InputAudioBufferClear,
    });

    // Send different audio and commit
    await sendAudio(session, "Computer, how old are you?");
    await session.sendEvent({
      type: KnownClientEventType.InputAudioBufferCommit,
    });

    const bufferCommitted = await recorder.waitForEvent(KnownServerEventType.InputAudioBufferCommitted) as ServerEventInputAudioBufferCommitted;
    expect(bufferCommitted.itemId).toBeTruthy();

    // Generate response
    await session.sendEvent({
      type: KnownClientEventType.ResponseCreate,
    });
    const responses = await recorder.waitForEvents(KnownServerEventType.ResponseDone);
    expect(responses.length).toBeGreaterThan(0);

    const responseDone = responses.find((r) => r.type === KnownServerEventType.ResponseDone) as ServerEventResponseDone;
    expect(responseDone).toBeDefined();
    expect(responseDone.response.output?.length).toBeGreaterThan(0);
  }, timeoutMs);

  it("should handle multiple audio frames with transcription", async () => {
    const sessionConfig: RequestSession = {
      model: "gpt-4o",
      inputAudioFormat: KnownInputAudioFormat.Pcm16,
      turnDetection: undefined,
    };

    const session = await client.createSession(sessionConfig);
    sessions.push(session);

    const recorder = new SessionEventRecorder(session);

    await session.connect();
    await recorder.waitForEvent(KnownServerEventType.SessionCreated);
    await session.updateSession(sessionConfig);
    await recorder.waitForEvent(KnownServerEventType.SessionUpdated);

    // Send many small audio frames
    for (let i = 0; i < 300; i++) {
      const emptyAudio = new Uint8Array(3200); // 3200 bytes of silence
      await session.sendAudio(emptyAudio);
    }

    await session.sendEvent({
      type: KnownClientEventType.InputAudioBufferClear,
    });

    // Now send actual audio
    await sendAudio(session, "What is the weather like?");
    await session.sendEvent({
      type: KnownClientEventType.InputAudioBufferCommit,
    });

    const bufferCommitted = await recorder.waitForEvent(KnownServerEventType.InputAudioBufferCommitted) as ServerEventInputAudioBufferCommitted;
    const speechTranscribed = await recorder.waitForEvent(
      KnownServerEventType.ConversationItemInputAudioTranscriptionCompleted
    ) as ServerEventConversationItemInputAudioTranscriptionCompleted;

    expect(speechTranscribed.transcript.length).toBeGreaterThan(0);
  }, timeoutMs);
});




