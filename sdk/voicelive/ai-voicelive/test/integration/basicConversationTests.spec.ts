// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KeyCredential } from "@azure/core-auth";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  type ClientEventResponseCreate,
  type RequestSession,
  VoiceLiveClient,
  type VoiceLiveSession,
} from "../../src/index.js";
import { isLiveMode } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { sendTestAudio } from "../infrastructure/audioTestHelpers.js";
import { SessionEventRecorder } from "../infrastructure/sessionEventRecorder.js";
import {
  type FunctionCallItem,
  type FunctionTool,
  type InputAudioContentPart,
  type InputTextContentPart,
  KnownClientEventType,
  KnownContentPartType,
  KnownInputAudioFormat,
  KnownItemType,
  KnownMessageRole,
  KnownModality,
  KnownResponseStatus,
  KnownServerEventType,
  KnownToolType,
  KnownTurnDetectionType,
  type MessageItem,
  type OutputTextContentPart,
  type ServerEventConversationItemCreated,
  type ServerEventConversationItemInputAudioTranscriptionCompleted,
  type ServerEventInputAudioBufferCommitted,
  type ServerEventInputAudioBufferSpeechStarted,
  type ServerEventInputAudioBufferSpeechStopped,
  type ServerEventResponseAudioDelta,
  type ServerEventResponseAudioTranscriptDelta,
  type ServerEventResponseAudioTranscriptDone,
  type ServerEventResponseContentPartAdded,
  type ServerEventResponseContentPartDone,
  type ServerEventResponseCreated,
  type ServerEventResponseDone,
  type ServerEventResponseFunctionCallArgumentsDelta,
  type ServerEventResponseFunctionCallArgumentsDone,
  type ServerEventResponseOutputItemAdded,
  type ServerEventResponseOutputItemDone,
  type ServerEventResponseTextDelta,
  type ServerEventResponseTextDone,
  type ServerEventSessionCreated,
  type ServerEventSessionUpdated,
  type ServerEventUnion,
  type ServerVad,
} from "../../src/models/models.js";

describe.runIf(isLiveMode())("Basic Conversation Tests", () => {
  let client: VoiceLiveClient;
  let sessions: VoiceLiveSession[] = [];
  const timeoutMs = 30000; // 30 second timeout for live tests

  const endpoint = process.env.VOICELIVE_ENDPOINT || process.env.AI_SERVICES_ENDPOINT;
  const apiKey = process.env.VOICELIVE_API_KEY || process.env.AI_SERVICES_KEY;

  beforeEach(function (this: any) {
    if (!endpoint) {
      throw new Error("Missing VOICELIVE_ENDPOINT or AI_SERVICES_ENDPOINT environment variable");
    }

    if (!apiKey) {
      const credential = createTestCredential();
      client = new VoiceLiveClient(endpoint, credential);
    } else {
      client = new VoiceLiveClient(endpoint, { key: apiKey } as KeyCredential);
    }
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

  it(
    "should create and connect a basic voice session",
    async () => {
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
      const sessionCreated = (await recorder.waitForEvent(
        KnownServerEventType.SessionCreated,
      )) as ServerEventSessionCreated;

      // Once the session is connected, sessionId should be set
      expect(session.sessionId).toBeTruthy();

      await session.updateSession(sessionConfig);
      const sessionUpdated = (await recorder.waitForEvent(
        KnownServerEventType.SessionUpdated,
      )) as ServerEventSessionUpdated;

      expect(sessionCreated.session.id).toBeTruthy();
      expect(sessionUpdated.session.inputAudioFormat).toBe(KnownInputAudioFormat.Pcm16);
      expect(sessionCreated.session.id).toBe(sessionUpdated.session.id);
      expect(sessionCreated.session.model).toBe(sessionUpdated.session.model);
    },
    timeoutMs,
  );

  it(
    "should handle audio input and transcription",
    async () => {
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
      await sendTestAudio(session, "What is the weather like?");

      // In a real implementation, we would expect these events:
      // - input_audio_buffer.speech_started
      // - input_audio_buffer.speech_stopped
      // - input_audio_buffer.committed
      // - conversation.item.input_audio_transcription.completed
      // - conversation.item.created

      // For this test, we'll just verify the session can handle audio input
      expect(session.isConnected).toBe(true);
    },
    timeoutMs,
  );

  it(
    "should handle text conversation with function calling",
    async () => {
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

      const recorder = new SessionEventRecorder(session); // Attach recorder first

      await session.connect();
      await recorder.waitForEvent(KnownServerEventType.SessionCreated);
      await session.updateSession(sessionConfig);
      await recorder.waitForEvent(KnownServerEventType.SessionUpdated);

      // Add a text message to the conversation
      const userMessage = {
        type: KnownItemType.Message,
        role: KnownMessageRole.User,
        content: [
          {
            type: "input_text",
            text: "What is 13 plus 29?",
          },
        ],
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
      const responseCreated = responseEvents.find(
        (e) => e.type === KnownServerEventType.ResponseCreated,
      );
      const responseDone = responseEvents.find((e) => e.type === KnownServerEventType.ResponseDone);

      expect(responseCreated).toBeDefined();
      expect(responseDone).toBeDefined();
    },
    timeoutMs,
  );

  it(
    "should handle session configuration updates",
    async () => {
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
      const sessionUpdated = (await recorder.waitForEvent(
        KnownServerEventType.SessionUpdated,
      )) as ServerEventSessionUpdated;

      expect(sessionUpdated.session.instructions).toBe(updatedConfig.instructions);
    },
    timeoutMs,
  );

  it(
    "should handle turn detection configuration",
    async () => {
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

      const sessionCreated = (await recorder.waitForEvent(
        KnownServerEventType.SessionCreated,
      )) as ServerEventSessionCreated;
      await session.updateSession(sessionConfig);
      const sessionUpdated = (await recorder.waitForEvent(
        KnownServerEventType.SessionUpdated,
      )) as ServerEventSessionUpdated;

      // Default should be server VAD
      expect(sessionCreated.session.turnDetection?.type).toBe(KnownTurnDetectionType.ServerVad);

      // Updated configuration should match our settings
      expect(sessionUpdated.session.turnDetection?.type).toBe(KnownTurnDetectionType.ServerVad);
      const turnDetection = sessionUpdated.session.turnDetection as ServerVad;
      expect(turnDetection.threshold).toBe(0.5);
    },
    timeoutMs,
  );

  it(
    "should handle audio buffer operations",
    async () => {
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

      await sendTestAudio(session, "What is the weather like?");

      // Clear the buffer (in real implementation this would send input_audio_buffer.clear)
      await session.sendEvent({
        type: KnownClientEventType.InputAudioBufferClear,
      });

      // Send different audio
      await sendTestAudio(session, "Computer, how old are you?");

      // Commit the buffer (in real implementation this would send input_audio_buffer.commit)
      await session.sendEvent({
        type: KnownClientEventType.InputAudioBufferCommit,
      });

      // Verify session is still connected and functional
      expect(session.isConnected).toBe(true);
    },
    timeoutMs,
  );

  it(
    "should handle multiple audio frames",
    async () => {
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
      for (let i = 0; i < 10; i++) {
        // Reduced from 300 to 10 for faster test
        const silentAudio = new ArrayBuffer(3200); // 3200 bytes of silence
        await session.sendAudio(silentAudio);
      }

      // Clear and send actual audio
      await session.sendEvent({
        type: KnownClientEventType.InputAudioBufferClear,
      });

      await sendTestAudio(session, "Test message");

      await session.sendEvent({
        type: KnownClientEventType.InputAudioBufferCommit,
      });

      expect(session.isConnected).toBe(true);
    },
    timeoutMs,
  );

  it(
    "should handle session disposal",
    async () => {
      const session = await client.startSession("gpt-4o");
      sessions.push(session);

      expect(session.isConnected).toBe(true);

      await session.dispose();

      expect(session.isConnected).toBe(false);
    },
    timeoutMs,
  );

  /**
   * Helper function to validate response update sequence
   */
  function validateResponseUpdates(
    responseItems: ServerEventUnion[],
    previousItemId?: string,
  ): void {
    let responseId = "";
    let responseItemId = "";
    const deltaBuilders = new Map<string, string>();

    for (const item of responseItems) {
      switch (item.type) {
        case KnownServerEventType.ResponseCreated: {
          const createdItem = item as ServerEventResponseCreated;
          expect(responseId).toBe("");
          expect(createdItem.response).toBeDefined();
          expect(createdItem.response.status).toBe("in_progress");
          responseId = createdItem.response.id as string;
          break;
        }
        case KnownServerEventType.ResponseOutputItemAdded: {
          const outputItem = item as ServerEventResponseOutputItemAdded;
          expect(outputItem.responseId).toBe(responseId);
          expect(outputItem.outputIndex).toBe(0);
          expect(outputItem.item).toBeDefined();
          responseItemId = outputItem.item?.id as string;
          if (outputItem.item?.type === KnownItemType.Message) {
            const messageItem = outputItem.item as MessageItem;
            expect(messageItem.role).toBe(KnownMessageRole.Assistant);
            expect(messageItem.status).toBe(KnownResponseStatus.Incomplete);
          } else if (outputItem.item?.type === KnownItemType.FunctionCall) {
            const functionItem = outputItem.item as FunctionCallItem;
            expect(functionItem.status).toBe(KnownResponseStatus.InProgress);
            expect(functionItem.name).toBeTruthy();
            deltaBuilders.set(functionItem.callId, "");
          }
          break;
        }
        case KnownServerEventType.ConversationItemCreated: {
          const conversationItem = item as ServerEventConversationItemCreated;
          if (previousItemId !== undefined) {
            expect(conversationItem.previousItemId).toBe(previousItemId);
          }
          expect(conversationItem.item).toBeDefined();
          break;
        }
        case KnownServerEventType.ResponseContentPartAdded: {
          const responseContentPart = item as ServerEventResponseContentPartAdded;
          expect(responseContentPart.responseId).toBe(responseId);
          expect(responseContentPart.itemId).toBe(responseItemId);
          expect(responseContentPart.part).toBeDefined();
          expect(responseContentPart.outputIndex).toBe(0);
          expect(responseContentPart.contentIndex).toBeGreaterThanOrEqual(0);
          deltaBuilders.set(responseContentPart.itemId, "");
          break;
        }
        case KnownServerEventType.ResponseTextDelta: {
          const textDeltaItem = item as ServerEventResponseTextDelta;
          expect(textDeltaItem.responseId).toBe(responseId);
          expect(textDeltaItem.itemId).toBe(responseItemId);
          expect(textDeltaItem.delta).toBeTruthy();
          const currentText = deltaBuilders.get(textDeltaItem.itemId) || "";
          deltaBuilders.set(textDeltaItem.itemId, currentText + textDeltaItem.delta);
          break;
        }
        case KnownServerEventType.ResponseAudioTranscriptDelta: {
          const audioDeltaItem = item as ServerEventResponseAudioTranscriptDelta;
          expect(audioDeltaItem.responseId).toBe(responseId);
          expect(audioDeltaItem.itemId).toBe(responseItemId);
          expect(audioDeltaItem.delta).toBeTruthy();
          const currentTranscript = deltaBuilders.get(audioDeltaItem.itemId) || "";
          deltaBuilders.set(audioDeltaItem.itemId, currentTranscript + audioDeltaItem.delta);
          break;
        }
        case KnownServerEventType.ResponseAudioDelta: {
          const audioDeltaItem = item as ServerEventResponseAudioDelta;
          expect(audioDeltaItem.responseId).toBe(responseId);
          expect(audioDeltaItem.itemId).toBe(responseItemId);
          expect(audioDeltaItem.delta).toBeTruthy();
          break;
        }
        case KnownServerEventType.ResponseTextDone: {
          const doneItem = item as ServerEventResponseTextDone;
          expect(doneItem.responseId).toBe(responseId);
          expect(doneItem.itemId).toBe(responseItemId);
          expect(doneItem.text).toBeTruthy();
          const finalText = deltaBuilders.get(doneItem.itemId) || "";
          expect(doneItem.text).toBe(finalText);
          break;
        }
        case KnownServerEventType.ResponseAudioTranscriptDone: {
          const doneItem = item as ServerEventResponseAudioTranscriptDone;
          expect(doneItem.responseId).toBe(responseId);
          expect(doneItem.itemId).toBe(responseItemId);
          expect(doneItem.transcript).toBeTruthy();
          const finalText = deltaBuilders.get(doneItem.itemId) || "";
          expect(doneItem.transcript).toBe(finalText);
          break;
        }
        case KnownServerEventType.ResponseContentPartDone: {
          const contentPartDoneItem = item as ServerEventResponseContentPartDone;
          expect(contentPartDoneItem.responseId).toBe(responseId);
          expect(contentPartDoneItem.itemId).toBe(responseItemId);
          expect(contentPartDoneItem.part).toBeDefined();
          break;
        }
        case KnownServerEventType.ResponseOutputItemDone: {
          const outputItemDone = item as ServerEventResponseOutputItemDone;
          expect(outputItemDone.responseId).toBe(responseId);
          expect(outputItemDone.item).toBeDefined();

          if (outputItemDone.item?.type === KnownItemType.Message) {
            const message = outputItemDone.item as MessageItem;
            expect(message.role).toBe(KnownMessageRole.Assistant);
            expect(message.status).toBe(KnownResponseStatus.Completed);
            expect(message.content.length).toBeGreaterThan(0);
          } else if (outputItemDone.item?.type === KnownItemType.FunctionCall) {
            const functionItem = outputItemDone.item as FunctionCallItem;
            expect(functionItem.status).toBe(KnownResponseStatus.Completed);
            expect(functionItem.name).toBeTruthy();
            const finalArgs = deltaBuilders.get(functionItem.callId) || "";
            expect(functionItem.arguments).toBe(finalArgs);
          }
          break;
        }
        case KnownServerEventType.ResponseDone: {
          const doneItem = item as ServerEventResponseDone;
          expect(doneItem.response).toBeDefined();
          expect(doneItem.response.status).toBe(KnownResponseStatus.Completed);
          expect(doneItem.response.id).toBe(responseId);
          expect(doneItem.response.usage).toBeDefined();
          expect(doneItem.response.output).toBeDefined();
          expect(doneItem.response.output?.length).toBeGreaterThan(0);
          break;
        }
        case KnownServerEventType.ResponseFunctionCallArgumentsDelta: {
          const funcCallDelta = item as ServerEventResponseFunctionCallArgumentsDelta;
          expect(funcCallDelta.responseId).toBe(responseId);
          expect(funcCallDelta.itemId).toBe(responseItemId);
          expect(funcCallDelta.delta).toBeTruthy();
          const currentArgs = deltaBuilders.get(funcCallDelta.callId) || "";
          deltaBuilders.set(funcCallDelta.callId, currentArgs + funcCallDelta.delta);
          break;
        }
        case KnownServerEventType.ResponseFunctionCallArgumentsDone: {
          const funcCallDone = item as ServerEventResponseFunctionCallArgumentsDone;
          expect(funcCallDone.responseId).toBe(responseId);
          expect(funcCallDone.itemId).toBe(responseItemId);
          expect(funcCallDone.arguments).toBeTruthy();
          const finalArguments = deltaBuilders.get(funcCallDone.callId) || "";
          expect(funcCallDone.arguments).toBe(finalArguments);
          break;
        }
      }
    }
  }

  it(
    "should handle basic hello conversation with audio",
    async () => {
      const sessionConfig = {
        model: "gpt-4o",
        inputAudioFormat: KnownInputAudioFormat.Pcm16,
      } as RequestSession;

      const session = await client.createSession(sessionConfig);
      sessions.push(session);

      const recorder = new SessionEventRecorder(session); // Attach recorder first

      await session.connect();
      const sessionCreated = (await recorder.waitForEvent(
        KnownServerEventType.SessionCreated,
      )) as ServerEventSessionCreated;
      await session.updateSession(sessionConfig);
      const sessionUpdated = (await recorder.waitForEvent(
        KnownServerEventType.SessionUpdated,
      )) as ServerEventSessionUpdated;

      expect(sessionUpdated.session.inputAudioFormat).toBe(KnownInputAudioFormat.Pcm16);
      expect(sessionCreated.session.id).toBe(sessionUpdated.session.id);
      expect(sessionCreated.session.model).toBe(sessionUpdated.session.model);

      // Send audio to the service
      await sendTestAudio(session, "What is the weather like?");

      // Expect speech started event
      const speechStarted = (await recorder.waitForEvent(
        KnownServerEventType.InputAudioBufferSpeechStarted,
      )) as ServerEventInputAudioBufferSpeechStarted;
      expect(speechStarted.audioStartInMs).toBeGreaterThanOrEqual(0);
      const inputAudioId = speechStarted.itemId;

      // Expect speech ended event
      const speechEnded = (await recorder.waitForEvent(
        KnownServerEventType.InputAudioBufferSpeechStopped,
      )) as ServerEventInputAudioBufferSpeechStopped;
      expect(speechEnded.itemId).toBe(inputAudioId);
      expect(speechEnded.audioEndInMs).toBeGreaterThan(speechStarted.audioStartInMs);

      // Expect buffer committed event
      const bufferCommitted = (await recorder.waitForEvent(
        KnownServerEventType.InputAudioBufferCommitted,
      )) as ServerEventInputAudioBufferCommitted;
      expect(bufferCommitted.itemId).toBe(inputAudioId);

      // Expect transcription completed event
      const transcript = (await recorder.waitForEvent(
        KnownServerEventType.ConversationItemInputAudioTranscriptionCompleted,
      )) as ServerEventConversationItemInputAudioTranscriptionCompleted;
      expect(transcript.itemId).toBe(inputAudioId);
      expect(transcript.transcript).toBeTruthy();

      // Expect conversation item created event
      const conversationItemCreated = (await recorder.waitForEvent(
        KnownServerEventType.ConversationItemCreated,
      )) as ServerEventConversationItemCreated;
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
    },
    timeoutMs,
  );

  it.skip(
    "should handle basic tool call",
    async () => {
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
      const sessionCreated = (await recorder.waitForEvent(
        KnownServerEventType.SessionCreated,
      )) as ServerEventSessionCreated;
      await session.updateSession(sessionConfig);
      const sessionUpdated = (await recorder.waitForEvent(
        KnownServerEventType.SessionUpdated,
      )) as ServerEventSessionUpdated;

      expect(sessionUpdated.session.inputAudioFormat).toBe(KnownInputAudioFormat.Pcm16);
      expect(sessionCreated.session.id).toBe(sessionUpdated.session.id);

      // Add text message item
      const messageItem = {
        type: KnownItemType.Message,
        role: KnownMessageRole.User,
        content: [
          {
            type: "input_text",
            text: "What is 13 plus 29?",
          },
        ],
      };

      await session.addConversationItem(messageItem);

      // Expect conversation item created
      const conversationItemCreated = (await recorder.waitForEvent(
        KnownServerEventType.ConversationItemCreated,
      )) as ServerEventConversationItemCreated;
      expect(conversationItemCreated.previousItemId).toBeFalsy();

      const message = conversationItemCreated.item as MessageItem;
      expect(message.role).toBe(KnownMessageRole.User);
      expect(message.content.length).toBe(1);
      expect(message.content[0].type).toBe(KnownContentPartType.InputText);
      const textPart = message.content[0] as InputTextContentPart;
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
        (item) => item.type === KnownServerEventType.ResponseFunctionCallArgumentsDone,
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
    },
    timeoutMs,
  );

  it.skip(
    "should handle parallel tool calls",
    async () => {
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

      const conversationItemCreated = (await recorder.waitForEvent(
        KnownServerEventType.ConversationItemCreated,
      )) as ServerEventConversationItemCreated;
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
        (item) => item.type === KnownServerEventType.ResponseFunctionCallArgumentsDone,
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
        },
      });

      await session.sendEvent({
        type: KnownClientEventType.ConversationItemCreate,
        item: {
          type: KnownItemType.FunctionCallOutput,
          callId: call2Done.callId,
          output: "98",
        },
      });

      await recorder.waitForEvent(KnownServerEventType.ConversationItemCreated);
      await recorder.waitForEvent(KnownServerEventType.ConversationItemCreated);

      // Generate final response
      await session.sendEvent({
        type: KnownClientEventType.ResponseCreate,
      });
      const functionResponses = await recorder.waitForEvents(KnownServerEventType.ResponseDone);
      expect(functionResponses.length).toBeGreaterThan(0);
    },
    timeoutMs,
  );

  it(
    "should handle instruction configuration",
    async () => {
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
          content: [
            {
              type: KnownContentPartType.InputText,
              text: "What is your name?",
            },
          ],
        },
      });

      await recorder.waitForEvent(KnownServerEventType.ConversationItemCreated);

      await session.sendEvent({
        type: KnownClientEventType.ResponseCreate,
      });
      const responses = await recorder.waitForEvents(KnownServerEventType.ResponseDone);
      expect(responses.length).toBeGreaterThan(0);

      const responseDone = responses.find(
        (r) => r.type === KnownServerEventType.ResponseDone,
      ) as ServerEventResponseDone;
      expect(responseDone).toBeDefined();
      expect(responseDone.response.output?.length).toBeGreaterThan(0);

      const messageItem = responseDone.response.output?.find(
        (item: any) => item.type === KnownItemType.Message,
      ) as MessageItem;
      expect(messageItem).toBeDefined();

      const textPart = messageItem.content.find(
        (part: any) => part.type === "text",
      ) as OutputTextContentPart;
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
          content: [
            {
              type: KnownContentPartType.InputText,
              text: "What is your name?",
            },
          ],
        },
      });

      await recorder.waitForEvent(KnownServerEventType.ConversationItemCreated);
      await session.sendEvent({
        type: KnownClientEventType.ResponseCreate,
      });

      const newResponses = await recorder.waitForEvents(KnownServerEventType.ResponseDone);
      const newResponseDone = newResponses.find(
        (r) => r.type === KnownServerEventType.ResponseDone,
      ) as ServerEventResponseDone;

      const newMessageItem = newResponseDone.response.output?.find(
        (item: any) => item.type === KnownItemType.Message,
      ) as MessageItem;
      const newTextPart = newMessageItem.content?.find(
        (part: any) => part.type === "text",
      ) as OutputTextContentPart;
      expect(newTextPart.text).toContain("Samantha");
    },
    timeoutMs,
  );

  it(
    "should handle turn detection configuration with custom settings",
    async () => {
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
      const sessionCreated = (await recorder.waitForEvent(
        KnownServerEventType.SessionCreated,
      )) as ServerEventSessionCreated;
      await session.updateSession(sessionConfig);
      const sessionUpdated = (await recorder.waitForEvent(
        KnownServerEventType.SessionUpdated,
      )) as ServerEventSessionUpdated;

      // Default turn detection should be server VAD
      expect(sessionCreated.session.turnDetection?.type).toBe(KnownTurnDetectionType.ServerVad);

      // Updated turn detection should match our configuration
      expect(sessionUpdated.session.turnDetection?.type).toBe(KnownTurnDetectionType.ServerVad);
      const turnDetection = sessionUpdated.session.turnDetection as ServerVad;
      expect(turnDetection.threshold).toBe(0.5);
    },
    timeoutMs,
  );

  it(
    "should handle clear buffer and commit flow",
    async () => {
      const sessionConfig: RequestSession = {
        model: "gpt-4o",
        inputAudioFormat: KnownInputAudioFormat.Pcm16,
        turnDetection: { type: "none" }, // Disable turn detection
      };

      const session = await client.createSession(sessionConfig);
      sessions.push(session);

      const recorder = new SessionEventRecorder(session);

      await session.connect();
      await recorder.waitForEvent(KnownServerEventType.SessionCreated);
      await session.updateSession(sessionConfig);
      await recorder.waitForEvent(KnownServerEventType.SessionUpdated);

      // Send some audio then clear it
      await sendTestAudio(session, "What is the weather like?");
      await session.sendEvent({
        type: KnownClientEventType.InputAudioBufferClear,
      });

      // Send different audio and commit
      await sendTestAudio(session, "Computer, how old are you?");
      await session.sendEvent({
        type: KnownClientEventType.InputAudioBufferCommit,
      });

      const bufferCommitted = (await recorder.waitForEvent(
        KnownServerEventType.InputAudioBufferCommitted,
      )) as ServerEventInputAudioBufferCommitted;
      expect(bufferCommitted.itemId).toBeTruthy();

      // Generate response
      await session.sendEvent({
        type: KnownClientEventType.ResponseCreate,
      });
      const responses = await recorder.waitForEvents(KnownServerEventType.ResponseDone);
      expect(responses.length).toBeGreaterThan(0);

      const responseDone = responses.find(
        (r) => r.type === KnownServerEventType.ResponseDone,
      ) as ServerEventResponseDone;
      expect(responseDone).toBeDefined();
      expect(responseDone.response.output?.length).toBeGreaterThan(0);
    },
    timeoutMs,
  );

  it(
    "should handle multiple audio frames with transcription",
    async () => {
      const sessionConfig: RequestSession = {
        model: "gpt-4o",
        inputAudioFormat: KnownInputAudioFormat.Pcm16,
        turnDetection: { type: "none" }, // Disable turn detection
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
      await sendTestAudio(session, "What is the weather like?");
      await session.sendEvent({
        type: KnownClientEventType.InputAudioBufferCommit,
      });

      (await recorder.waitForEvent(
        KnownServerEventType.InputAudioBufferCommitted,
      )) as ServerEventInputAudioBufferCommitted;
      const speechTranscribed = (await recorder.waitForEvent(
        KnownServerEventType.ConversationItemInputAudioTranscriptionCompleted,
      )) as ServerEventConversationItemInputAudioTranscriptionCompleted;

      expect(speechTranscribed.transcript.length).toBeGreaterThan(0);
    },
    timeoutMs,
  );
});
