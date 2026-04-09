import { VoiceLiveClient, VoiceLiveInstrumentor } from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { AzureKeyCredential } from "@azure/core-auth";
import { setLogLevel } from "@azure/logger";
import { describe, it, vi } from "vitest";

// Mock @opentelemetry/api so VoiceLiveInstrumentor can be constructed in CI (ESM)
const mockOtelApi = {
  trace: {
    getTracer: vi.fn().mockReturnValue({
      startSpan: vi.fn().mockReturnValue({
        setAttribute: vi.fn(), addEvent: vi.fn(), setStatus: vi.fn(),
        end: vi.fn(), isRecording: vi.fn().mockReturnValue(true),
      }),
    }),
    setSpan: vi.fn().mockReturnValue({}),
  },
  context: { active: vi.fn().mockReturnValue({}) },
  SpanKind: { CLIENT: 2 },
  SpanStatusCode: { ERROR: 2 },
  metrics: { getMeter: vi.fn().mockReturnValue({ createHistogram: vi.fn().mockReturnValue({ record: vi.fn() }) }) },
};
vi.mock("@opentelemetry/api", () => mockOtelApi);

// Ensure tryLoadOtel() can find the mock via globalThis.require (ESM environments)
const _snippetsOrigRequire = (globalThis as Record<string, unknown>)["require"] as
  | ((...args: unknown[]) => unknown)
  | undefined;
(globalThis as Record<string, unknown>)["require"] = (id: string) => {
  if (id === "@opentelemetry/api") return mockOtelApi;
  if (typeof _snippetsOrigRequire === "function") return _snippetsOrigRequire(id);
  throw new Error(`Cannot find module '${id}'`);
};

describe("snippets", () => {
  it("ReadmeSampleCreateClient", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    // Build the URL to reach your AI Foundry resource
    const endpoint = "https://your-resource.cognitiveservices.azure.com";
    // @ts-preserve-whitespace
    // Create the VoiceLive client
    const client = new VoiceLiveClient(endpoint, credential);
  });

  it("ReadmeSampleCreateClientWithApiKey", async () => {
    const endpoint = "https://your-resource.cognitiveservices.azure.com";
    const credential = new AzureKeyCredential("your-api-key");
    // @ts-preserve-whitespace
    const client = new VoiceLiveClient(endpoint, credential);
  });

  it("ReadmeSampleBasicVoiceAssistant", async () => {
    const credential = new DefaultAzureCredential();
    const endpoint = "https://your-resource.cognitiveservices.azure.com";
    // @ts-preserve-whitespace
    // Create the client
    const client = new VoiceLiveClient(endpoint, credential);
    // @ts-preserve-whitespace
    // Create and connect a session
    const session = await client.startSession("gpt-4o-mini-realtime-preview");
    // @ts-preserve-whitespace
    // Configure session for voice conversation
    await session.updateSession({
      modalities: ["text", "audio"],
      instructions: "You are a helpful AI assistant. Respond naturally and conversationally.",
      voice: {
        type: "azure-standard",
        name: "en-US-AvaNeural",
      },
      turnDetection: {
        type: "server_vad",
        threshold: 0.5,
        prefixPaddingMs: 300,
        silenceDurationMs: 500,
      },
      inputAudioFormat: "pcm16",
      outputAudioFormat: "pcm16",
    });
  });

  it("ReadmeSampleAdvancedConfiguration", async () => {
    const credential = new DefaultAzureCredential();
    const endpoint = "https://your-resource.cognitiveservices.azure.com";
    const client = new VoiceLiveClient(endpoint, credential);
    const session = await client.startSession("gpt-4o-realtime-preview");
    // @ts-preserve-whitespace
    // Advanced session configuration
    await session.updateSession({
      modalities: ["audio", "text"],
      instructions: "You are a customer service representative. Be helpful and professional.",
      voice: {
        type: "azure-custom",
        name: "your-custom-voice-name",
        endpointId: "your-custom-voice-endpoint",
      },
      turnDetection: {
        type: "server_vad",
        threshold: 0.6,
        prefixPaddingMs: 200,
        silenceDurationMs: 300,
      },
      inputAudioFormat: "pcm16",
      outputAudioFormat: "pcm16",
    });
  });

  it("ReadmeSampleEventHandling", async () => {
    const credential = new DefaultAzureCredential();
    const endpoint = "https://your-resource.cognitiveservices.azure.com";
    const client = new VoiceLiveClient(endpoint, credential);
    const session = await client.startSession("gpt-4o-mini-realtime-preview");
    // @ts-preserve-whitespace
    // Set up event handlers using subscription pattern
    const subscription = session.subscribe({
      onResponseAudioDelta: async (event, context) => {
        // Handle incoming audio chunks
        const audioData = event.delta;
        // Play audio using Web Audio API or other audio system
        playAudioChunk(audioData);
      },
      // @ts-preserve-whitespace
      onResponseTextDelta: async (event, context) => {
        // Handle incoming text deltas
        console.log("Assistant:", event.delta);
      },
      // @ts-preserve-whitespace
      onInputAudioTranscriptionCompleted: async (event, context) => {
        // Handle user speech transcription
        console.log("User said:", event.transcript);
      },
    });
    // @ts-preserve-whitespace
    // Send audio data from microphone
    function sendAudioChunk(audioBuffer: ArrayBuffer) {
      session.sendAudio(audioBuffer);
    }
  });

  it("ReadmeSampleFunctionCalling", async () => {
    const credential = new DefaultAzureCredential();
    const endpoint = "https://your-resource.cognitiveservices.azure.com";
    const client = new VoiceLiveClient(endpoint, credential);
    const session = await client.startSession("gpt-4o-mini-realtime-preview");
    // @ts-preserve-whitespace
    // Define available functions
    const tools = [
      {
        type: "function",
        name: "get_weather",
        description: "Get current weather for a location",
        parameters: {
          type: "object",
          properties: {
            location: {
              type: "string",
              description: "The city and state or country",
            },
          },
          required: ["location"],
        },
      },
    ];
    // @ts-preserve-whitespace
    // Configure session with tools
    await session.updateSession({
      modalities: ["audio", "text"],
      instructions:
        "You can help users with weather information. Use the get_weather function when needed.",
      tools: tools,
      toolChoice: "auto",
    });
    // @ts-preserve-whitespace
    // Handle function calls
    const subscription = session.subscribe({
      onResponseFunctionCallArgumentsDone: async (event, context) => {
        if (event.name === "get_weather") {
          const args = JSON.parse(event.arguments);
          const weatherData = await getWeatherData(args.location);
          // @ts-preserve-whitespace
          // Send function result back
          await session.addConversationItem({
            type: "function_call_output",
            callId: event.callId,
            output: JSON.stringify(weatherData),
          });
          // @ts-preserve-whitespace
          // Request response generation
          await session.sendEvent({
            type: "response.create",
          });
        }
      },
    });
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });

  it("ReadmeSampleModelModeSession", async () => {
    const credential = new DefaultAzureCredential();
    const endpoint = "https://your-resource.cognitiveservices.azure.com";
    const client = new VoiceLiveClient(endpoint, credential);
    // @ts-preserve-whitespace
    // Model mode - LLM is the main actor
    const session = await client.startSession("gpt-4o-realtime-preview");
  });

  it("ReadmeSampleAgentModeSession", async () => {
    const credential = new DefaultAzureCredential();
    const endpoint = "https://your-resource.cognitiveservices.azure.com";
    const client = new VoiceLiveClient(endpoint, credential);
    // @ts-preserve-whitespace
    // Agent mode - Foundry agent is the main actor
    const session = await client.startSession({
      agent: {
        agentName: "my-agent",
        projectName: "my-foundry-project",
      },
    });
  });

  it("CreateSessionModelTarget", async () => {
    const credential = new DefaultAzureCredential();
    const endpoint = "https://your-resource.cognitiveservices.azure.com";
    const client = new VoiceLiveClient(endpoint, credential);
    // @ts-preserve-whitespace
    const session = client.createSession({ model: "gpt-4o-realtime-preview" });
  });

  it("CreateSessionAgentTarget", async () => {
    const credential = new DefaultAzureCredential();
    const endpoint = "https://your-resource.cognitiveservices.azure.com";
    const client = new VoiceLiveClient(endpoint, credential);
    // @ts-preserve-whitespace
    const session = client.createSession({
      agent: { agentName: "my-agent", projectName: "my-project" },
    });
  });

  it("StartSessionModelTarget", async () => {
    const credential = new DefaultAzureCredential();
    const endpoint = "https://your-resource.cognitiveservices.azure.com";
    const client = new VoiceLiveClient(endpoint, credential);
    // @ts-preserve-whitespace
    const session = await client.startSession({ model: "gpt-4o-realtime-preview" });
  });

  it("StartSessionAgentTarget", async () => {
    const credential = new DefaultAzureCredential();
    const endpoint = "https://your-resource.cognitiveservices.azure.com";
    const client = new VoiceLiveClient(endpoint, credential);
    // @ts-preserve-whitespace
    const session = await client.startSession({
      agent: { agentName: "my-agent", projectName: "my-project" },
    });
  });

  it("ReadmeSampleAgentVoiceAssistant", async () => {
    const credential = new DefaultAzureCredential();
    const endpoint = "https://your-resource.cognitiveservices.azure.com";
    // @ts-preserve-whitespace
    // Create the client
    const client = new VoiceLiveClient(endpoint, credential);
    // @ts-preserve-whitespace
    // Create and connect a session with an agent as the main actor
    const session = await client.startSession({
      agent: {
        agentName: "your-agent-name",
        projectName: "your-foundry-project",
      },
    });
    // @ts-preserve-whitespace
    // Subscribe to events - audio settings can still be configured
    const subscription = session.subscribe({
      onResponseAudioDelta: async (event, context) => {
        // Handle audio from the agent
        playAudioChunk(event.delta);
      },
      onResponseTextDelta: async (event, context) => {
        console.log("Agent:", event.delta);
      },
    });
    // @ts-preserve-whitespace
    // Send audio data from microphone
    function sendAudioChunk(audioBuffer: ArrayBuffer) {
      session.sendAudio(audioBuffer);
    }
  });

  it("ReadmeSampleEnableTelemetry", async () => {
    // Enable OpenTelemetry tracing for VoiceLive
    // Requires: npm install @opentelemetry/api @opentelemetry/sdk-trace-node
    // @ts-preserve-whitespace
    // Set environment variable to opt in to tracing
    // AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING=true
    // @ts-preserve-whitespace
    const instrumentor = new VoiceLiveInstrumentor();
    instrumentor.instrument();
    // @ts-preserve-whitespace
    const credential = new DefaultAzureCredential();
    const endpoint = "https://your-resource.cognitiveservices.azure.com";
    const client = new VoiceLiveClient(endpoint, credential);
    // @ts-preserve-whitespace
    // All sessions created after instrument() will emit OpenTelemetry spans
    const session = await client.startSession("gpt-4o-realtime-preview");
    // @ts-preserve-whitespace
    await session.updateSession({
      modalities: ["audio", "text"],
      instructions: "You are a helpful assistant.",
    });
    // @ts-preserve-whitespace
    // ... use the session normally — spans are emitted automatically
    // @ts-preserve-whitespace
    // When done, disconnect and uninstrument
    await session.disconnect();
    instrumentor.uninstrument();
  });

  it("ReadmeSampleTelemetryWithContentRecording", async () => {
    // Enable content recording to capture message payloads in traces
    // @ts-preserve-whitespace
    const instrumentor = new VoiceLiveInstrumentor();
    instrumentor.instrument({ enableContentRecording: true });
    // @ts-preserve-whitespace
    const credential = new DefaultAzureCredential();
    const endpoint = "https://your-resource.cognitiveservices.azure.com";
    const client = new VoiceLiveClient(endpoint, credential);
    const session = await client.startSession("gpt-4o-realtime-preview");
    // @ts-preserve-whitespace
    // Traces will now include event payloads (system instructions, tool calls, etc.)
    await session.updateSession({
      modalities: ["audio", "text"],
      instructions: "You are a customer support assistant.",
      tools: [
        {
          type: "function",
          name: "lookup_order",
          description: "Look up an order by ID",
          parameters: {
            type: "object",
            properties: { orderId: { type: "string" } },
            required: ["orderId"],
          },
        },
      ],
    });
    // @ts-preserve-whitespace
    await session.disconnect();
    instrumentor.uninstrument();
  });

  it("ReadmeSampleTelemetryWithContentRecordingEnvVar", async () => {
    // Content recording can also be enabled via environment variable:
    // OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT=true
    // @ts-preserve-whitespace
    const instrumentor = new VoiceLiveInstrumentor();
    instrumentor.instrument(); // reads the env var automatically
  });
});

// Helper functions for compilation (would be implemented in real usage)
function playAudioChunk(audioData: any): void {
  // Implementation would use Web Audio API
}

async function getWeatherData(location: string): Promise<any> {
  // Implementation would call weather service
  return { location, temperature: "75°F", condition: "sunny" };
}
