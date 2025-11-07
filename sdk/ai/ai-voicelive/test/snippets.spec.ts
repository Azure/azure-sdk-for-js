// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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
    // Connect to the service
    await client.connect();
    // @ts-preserve-whitespace
    // Configure session for voice conversation
    await client.updateSession({
      model: "gpt-4o-mini-realtime-preview",
      instructions: "You are a helpful AI assistant. Respond naturally and conversationally.",
      voice: {
        type: "azure_standard",
        name: "en-US-AvaNeural"
      },
      turn_detection: {
        type: "azure_semantic_vad",
        threshold: 0.5,
        prefix_padding: 300,
        silence_duration: 500
      },
      input_audio_format: "pcm16",
      output_audio_format: "pcm16",
      modalities: ["text", "audio"]
    });
  });

  it("ReadmeSampleAdvancedConfiguration", async () => {
    const credential = new DefaultAzureCredential();
    const endpoint = "https://your-resource.cognitiveservices.azure.com";
    const client = new VoiceLiveClient(endpoint, credential);
    await client.connect();
    // @ts-preserve-whitespace
    // Advanced session configuration
    await client.updateSession({
      model: "gpt-4o-realtime-preview",
      instructions: "You are a customer service representative. Be helpful and professional.",
      voice: {
        type: "azure_custom",
        name: "your-custom-voice-name",
        endpoint_id: "your-custom-voice-endpoint"
      },
      turn_detection: {
        type: "azure_semantic_vad_en",
        remove_filler_words: true,
        threshold: 0.6
      },
      // Enable noise suppression and echo cancellation
      audio_noise_reduction: {
        enabled: true
      },
      audio_echo_cancellation: {
        enabled: true
      }
    });
  });

  it("ReadmeSampleEventHandling", async () => {
    const credential = new DefaultAzureCredential();
    const endpoint = "https://your-resource.cognitiveservices.azure.com";
    const client = new VoiceLiveClient(endpoint, credential);
    await client.connect();
    // @ts-preserve-whitespace
    // Set up event handlers
    client.on('server.response.audio.delta', (event) => {
      // Handle incoming audio chunks
      const audioData = event.delta;
      // Play audio using Web Audio API or other audio system
      playAudioChunk(audioData);
    });
    // @ts-preserve-whitespace
    client.on('server.response.text.delta', (event) => {
      // Handle incoming text deltas
      console.log('Assistant:', event.delta);
    });
    // @ts-preserve-whitespace
    client.on('server.conversation.item.input_audio_transcription.completed', (event) => {
      // Handle user speech transcription
      console.log('User said:', event.transcript);
    });
    // @ts-preserve-whitespace
    // Send audio data from microphone
    function sendAudioChunk(audioBuffer: ArrayBuffer) {
      client.sendAudio(audioBuffer);
    }
  });

  it("ReadmeSampleFunctionCalling", async () => {
    const credential = new DefaultAzureCredential();
    const endpoint = "https://your-resource.cognitiveservices.azure.com";
    const client = new VoiceLiveClient(endpoint, credential);
    await client.connect();
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
    await client.updateSession({
      model: "gpt-4o-mini-realtime-preview",
      instructions: "You can help users with weather information. Use the get_weather function when needed.",
      tools: tools,
      tool_choice: "auto"
    });
    // @ts-preserve-whitespace
    // Handle function calls
    client.on('server.response.function_call_arguments.done', async (event) => {
      if (event.name === 'get_weather') {
        const args = JSON.parse(event.arguments);
        const weatherData = await getWeatherData(args.location);
        // @ts-preserve-whitespace
        // Send function result back
        await client.addConversationItem({
          type: "function_call_output",
          call_id: event.call_id,
          output: JSON.stringify(weatherData)
        });
        // @ts-preserve-whitespace
        // Request response generation
        await client.sendEvent({
          type: "response.create"
        });
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