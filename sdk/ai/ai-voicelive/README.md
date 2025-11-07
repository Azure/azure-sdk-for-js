# Azure VoiceLive client library for JavaScript

Azure VoiceLive is a managed service that enables low-latency, high-quality speech-to-speech interactions for voice agents. The service consolidates speech recognition, generative AI, and text-to-speech functionalities into a single, unified interface, providing an end-to-end solution for creating seamless voice-driven experiences.

Use the client library to:

- Create real-time voice assistants and conversational agents
- Build speech-to-speech applications with minimal latency
- Integrate advanced conversational features like noise suppression and echo cancellation
- Leverage multiple AI models (GPT-4o, GPT-4o-mini, Phi) for different use cases
- Implement function calling and tool integration for dynamic responses
- Create avatar-enabled voice interactions with visual components

> Note: This package supports both browser and Node.js environments. WebSocket connections are used for real-time communication.

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/ai/ai-voicelive) | [Package (npm)](https://www.npmjs.com/package/@azure/ai-voicelive) | [API Reference Documentation](https://learn.microsoft.com/javascript/api/@azure/ai-voicelive?view=azure-node-preview) | [Product documentation](https://learn.microsoft.com/azure/ai-services/speech-service/voice-live-api) | [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/ai/ai-voicelive/samples)

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- Latest versions of Safari, Chrome, Edge and Firefox

### Prerequisites

- An [Azure subscription](https://azure.microsoft.com/free/)
- An [Azure AI Foundry resource](https://learn.microsoft.com/azure/ai-services/openai/how-to/create-resource) with Voice Live API access

### Install the package

Install the Azure VoiceLive client library using npm:

```bash
npm install @azure/ai-voicelive
```

### Install the identity library

VoiceLive clients authenticate using the Azure Identity Library. Install it as well:

```bash
npm install @azure/identity
```

### Configure TypeScript

TypeScript users need to have Node type definitions installed:

```bash
npm install @types/node
```

You also need to enable `compilerOptions.allowSyntheticDefaultImports` in your tsconfig.json. Note that if you have enabled `compilerOptions.esModuleInterop`, `allowSyntheticDefaultImports` is enabled by default.

### JavaScript Bundle

To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

## Key concepts

### VoiceLiveClient

The primary interface for establishing connections to the Azure VoiceLive service. Use this client to authenticate and create sessions for real-time voice interactions.

### VoiceLiveSession

Represents an active WebSocket connection for real-time voice communication. This class handles bidirectional communication, allowing you to send audio input and receive audio output, text transcriptions, and other events in real-time.

### Session Configuration

The service uses session configuration to control various aspects of voice interaction:

- **Turn Detection**: Configure how the service detects when users start and stop speaking
- **Audio Processing**: Enable noise suppression and echo cancellation  
- **Voice Selection**: Choose from standard Azure voices, high-definition voices, or custom voices
- **Model Selection**: Select the AI model (GPT-4o, GPT-4o-mini, Phi variants) that best fits your needs

### Models and Capabilities

The VoiceLive API supports multiple AI models with different capabilities:

| Model | Description | Use Case |
|-------|-------------|----------|
| `gpt-4o-realtime-preview` | GPT-4o with real-time audio processing | High-quality conversational AI |
| `gpt-4o-mini-realtime-preview` | Lightweight GPT-4o variant | Fast, efficient interactions |
| `phi4-mm-realtime` | Phi model with multimodal support | Cost-effective voice applications |

### Conversational Enhancements

The VoiceLive API provides Azure-specific enhancements:

- **Azure Semantic VAD**: Advanced voice activity detection that removes filler words
- **Noise Suppression**: Reduces environmental background noise
- **Echo Cancellation**: Removes echo from the model's own voice
- **End-of-Turn Detection**: Allows natural pauses without premature interruption

## Authenticating with Azure Active Directory

The VoiceLive service relies on Azure Active Directory to authenticate requests to its APIs. The [`@azure/identity`](https://www.npmjs.com/package/@azure/identity) package provides a variety of credential types that your application can use to do this. The [README for `@azure/identity`](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/README.md) provides more details and samples to get you started.

To interact with the Azure VoiceLive service, you need to create an instance of the `VoiceLiveClient` class, a **service endpoint** and a credential object. The examples shown in this document use a credential object named [`DefaultAzureCredential`][defaultazurecredential], which is appropriate for most scenarios, including local development and production environments. We recommend using a [managed identity][managed_identity] for authentication in production environments.

You can find more information on different ways of authenticating and their corresponding credential types in the [Azure Identity documentation][azure_identity].

Here's a quick example. First, import `DefaultAzureCredential` and `VoiceLiveClient`:

```ts snippet:ReadmeSampleCreateClient
import { DefaultAzureCredential } from "@azure/identity";
import { VoiceLiveClient } from "@azure/ai-voicelive";

const credential = new DefaultAzureCredential();

// Build the URL to reach your AI Foundry resource
const endpoint = "https://your-resource.cognitiveservices.azure.com";

// Create the VoiceLive client
const client = new VoiceLiveClient(endpoint, credential);
```

### Authentication with API Key

For development scenarios, you can also authenticate using an API key:

```ts snippet:ReadmeSampleCreateClientWithApiKey
import { AzureKeyCredential } from "@azure/core-auth";
import { VoiceLiveClient } from "@azure/ai-voicelive";

const endpoint = "https://your-resource.cognitiveservices.azure.com";
const credential = new AzureKeyCredential("your-api-key");

const client = new VoiceLiveClient(endpoint, credential);
```

## Examples

The following sections provide code snippets that cover some of the common tasks using Azure VoiceLive. The scenarios covered here consist of:

- [Creating a basic voice assistant](#creating-a-basic-voice-assistant)
- [Configuring session options](#configuring-session-options)
- [Handling real-time events](#handling-real-time-events)
- [Implementing function calling](#implementing-function-calling)

### Creating a basic voice assistant

This example shows how to create a simple voice assistant that can handle speech-to-speech interactions:

```ts snippet:ReadmeSampleBasicVoiceAssistant
import { DefaultAzureCredential } from "@azure/identity";
import { VoiceLiveClient } from "@azure/ai-voicelive";

const credential = new DefaultAzureCredential();
const endpoint = "https://your-resource.cognitiveservices.azure.com";

// Create the client
const client = new VoiceLiveClient(endpoint, credential);

// Connect to the service
await client.connect();

// Configure session for voice conversation
await client.sendEvent({
  type: "session.update",
  session: {
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
  }
});
```

### Configuring session options

You can customize various aspects of the voice interaction:

```ts snippet:ReadmeSampleAdvancedConfiguration
// Advanced session configuration
await client.sendEvent({
  type: "session.update", 
  session: {
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
  }
});
```

### Handling real-time events

The VoiceLive client provides event-driven communication for real-time interactions:

```ts snippet:ReadmeSampleEventHandling
// Set up event handlers
client.on('server.response.audio.delta', (event) => {
  // Handle incoming audio chunks
  const audioData = event.delta;
  // Play audio using Web Audio API or other audio system
  playAudioChunk(audioData);
});

client.on('server.response.text.delta', (event) => {
  // Handle incoming text deltas
  console.log('Assistant:', event.delta);
});

client.on('server.conversation.item.input_audio_transcription.completed', (event) => {
  // Handle user speech transcription
  console.log('User said:', event.transcript);
});

// Send audio data from microphone
function sendAudioChunk(audioBuffer: ArrayBuffer) {
  client.sendEvent({
    type: "input_audio_buffer.append",
    audio: audioBuffer
  });
}
```

### Implementing function calling

Enable your voice assistant to call external functions and tools:

```ts snippet:ReadmeSampleFunctionCalling
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

// Configure session with tools
await client.sendEvent({
  type: "session.update",
  session: {
    model: "gpt-4o-mini-realtime-preview",
    instructions: "You can help users with weather information. Use the get_weather function when needed.",
    tools: tools,
    tool_choice: "auto"
  }
});

// Handle function calls
client.on('server.response.function_call_arguments.done', async (event) => {
  if (event.name === 'get_weather') {
    const args = JSON.parse(event.arguments);
    const weatherData = await getWeatherData(args.location);
    
    // Send function result back
    await client.sendEvent({
      type: "conversation.item.create",
      item: {
        type: "function_call_output",
        call_id: event.call_id,
        output: JSON.stringify(weatherData)
      }
    });
    
    // Request response generation
    await client.sendEvent({
      type: "response.create"
    });
  }
});
```

## Troubleshooting

### Common errors and exceptions

**Authentication Errors**: If you receive authentication errors, verify that:
- Your Azure AI Foundry resource is correctly configured
- Your API key or credential has the necessary permissions
- The endpoint URL is correct and accessible

**WebSocket Connection Issues**: VoiceLive uses WebSocket connections. Ensure that:
- Your network allows WebSocket connections
- Firewall rules permit connections to `*.cognitiveservices.azure.com`
- Browser policies allow WebSocket and microphone access (for browser usage)

**Audio Issues**: For audio-related problems:
- Verify microphone permissions in the browser
- Check that audio formats (PCM16, PCM24) are supported
- Ensure proper audio context setup for playback

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of WebSocket messages and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts snippet:SetLogLevel
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Next steps

You can find more code samples through the following links:

- [VoiceLive Samples (JavaScript/TypeScript)](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-voicelive/samples)
- [VoiceLive Test Cases](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-voicelive/test)

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

[defaultazurecredential]: https://learn.microsoft.com/javascript/api/@azure/identity/defaultazurecredential?view=azure-node-latest
[managed_identity]: https://learn.microsoft.com/azure/active-directory/managed-identities-azure-resources/overview  
[azure_identity]: https://learn.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest
