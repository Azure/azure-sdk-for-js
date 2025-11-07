import { VoiceLiveClient } from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { AzureKeyCredential } from "@azure/core-auth";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

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
        name: "en-US-AvaNeural"
      },
      turnDetection: {
        type: "server_vad",
        threshold: 0.5,
        prefixPaddingMs: 300,
        silenceDurationMs: 500
      },
      inputAudioFormat: "pcm16",
      outputAudioFormat: "pcm16"
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
        endpointId: "your-custom-voice-endpoint"
      },
      turnDetection: {
        type: "server_vad",
        threshold: 0.6,
        prefixPaddingMs: 200,
        silenceDurationMs: 300
      },
      inputAudioFormat: "pcm16",
      outputAudioFormat: "pcm16"
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
      processResponseAudioDelta: async (event, context) => {
        // Handle incoming audio chunks
        const audioData = event.delta;
        // Play audio using Web Audio API or other audio system
        playAudioChunk(audioData);
      },
      // @ts-preserve-whitespace
      processResponseTextDelta: async (event, context) => {
        // Handle incoming text deltas
        console.log('Assistant:', event.delta);
      },
      // @ts-preserve-whitespace
      processInputAudioTranscriptionCompleted: async (event, context) => {
        // Handle user speech transcription
        console.log('User said:', event.transcript);
      }
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
    const tools = [{
      type: "function",
      name: "get_weather",
      description: "Get current weather for a location",
      parameters: {
        type: "object",
        properties: {
          location: {
            type: "string",
            description: "The city and state or country"
          }
        },
        required: ["location"]
      }
    }];
    // @ts-preserve-whitespace
    // Configure session with tools
    await session.updateSession({
      modalities: ["audio", "text"],
      instructions: "You can help users with weather information. Use the get_weather function when needed.",
      tools: tools,
      toolChoice: "auto"
    });
    // @ts-preserve-whitespace
    // Handle function calls
    const subscription = session.subscribe({
      processResponseFunctionCallArgumentsDone: async (event, context) => {
        if (event.name === 'get_weather') {
          const args = JSON.parse(event.arguments);
          const weatherData = await getWeatherData(args.location);
          // @ts-preserve-whitespace
          // Send function result back
          await session.addConversationItem({
            type: "function_call_output",
            callId: event.callId,
            output: JSON.stringify(weatherData)
          });
          // @ts-preserve-whitespace
          // Request response generation
          await session.sendEvent({
            type: "response.create"
          });
        }
      }
    });
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
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