// Examples of the VoiceLive Client/Session architecture using the
// Azure SDK handler subscription pattern.
//
// NOTE: this file is documentation/snippet material only — it is not
// included in the sample's tsconfig (`tsconfig.json` only compiles
// `src/**/*`) and is not bundled by Vite.

import {
  VoiceLiveClient,
  type VoiceLiveSessionHandlers,
  type UserMessageItem,
} from '@azure/ai-voicelive';
import { AzureKeyCredential } from '@azure/core-auth';

async function basicHandlerPatternExample(): Promise<void> {
  // 1. Create client (session factory). `apiVersion` defaults to the latest
  // known version, so it's usually omitted; override only to pin a specific version.
  const client = new VoiceLiveClient(
    'https://your-voicelive-endpoint.com',
    new AzureKeyCredential('your-api-key'),
  );

  // 2. Create and connect a session with a model
  const session = await client.startSession('gpt-realtime', {
    connectionTimeoutInMs: 30000,
  });

  try {
    // 3. Set up Azure SDK handler-based event subscription
    const handlers: VoiceLiveSessionHandlers = {
      onConnected: async (_args, context) => {
        console.log('🟢 Connected to session:', context.sessionId);
      },

      onError: async (args) => {
        console.log('🔴 Session error:', args.error.message);
      },

      onResponseCreated: async () => {
        console.log('🤔 Assistant started thinking...');
      },

      onResponseDone: async () => {
        console.log('✅ Assistant finished response');
      },

      onResponseTextDelta: async (event) => {
        console.log('📝 Text delta:', event.delta);
      },

      onResponseAudioDelta: async (event) => {
        console.log('🔊 Audio delta:', event.delta.byteLength, 'bytes');
        // Handle real-time audio streaming here
      },

      onInputAudioBufferSpeechStarted: async () => {
        console.log('🎤 Speech detected');
      },

      onInputAudioBufferSpeechStopped: async () => {
        console.log('⏸️ Speech stopped');
      },
    };

    const subscription = session.subscribe(handlers);

    // 4. Configure the session
    await session.updateSession({
      modalities: ['audio', 'text'],
      instructions: 'You are a helpful assistant.',
      voice: {
        type: 'openai',
        name: 'alloy',
      },
      inputAudioFormat: 'pcm16',
      outputAudioFormat: 'pcm16',
      turnDetection: {
        type: 'server_vad',
        threshold: 0.5,
      },
    });

    // 5. Send audio data
    const audioData = new Uint8Array(1024); // Your PCM16 audio data
    await session.sendAudio(audioData);

    // 6. Send a text message
    const userMessage: UserMessageItem = {
      type: 'message',
      role: 'user',
      content: [
        {
          type: 'input_text',
          text: 'Hello, how are you?',
        },
      ],
    };
    await session.addConversationItem(userMessage);

    // Ask the model to produce a response for the new item
    await session.sendEvent({ type: 'response.create' });

    // 7. Wait for some interaction...
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // 8. Clean up subscription
    await subscription.close();
  } finally {
    // 9. Always dispose the session
    await session.dispose();
  }
}

async function multipleSessionsExample(): Promise<void> {
  // One client can create multiple sessions
  const client = new VoiceLiveClient(
    'https://your-voicelive-endpoint.com',
    new AzureKeyCredential('your-api-key'),
  );

  // Create multiple sessions for different purposes
  const chatSession = await client.startSession('gpt-realtime');
  const audioSession = await client.startSession('gpt-realtime');

  try {
    // Configure each session differently
    await chatSession.updateSession({
      modalities: ['text'],
      instructions: 'You are a text-only chat assistant.',
    });

    await audioSession.updateSession({
      modalities: ['audio'],
      instructions: 'You are a voice-only assistant.',
      voice: {
        type: 'openai',
        name: 'echo',
      },
    });

    // Use sessions independently
    const chatMessage: UserMessageItem = {
      type: 'message',
      role: 'user',
      content: [{ type: 'input_text', text: 'Hello from chat!' }],
    };
    await chatSession.addConversationItem(chatMessage);
    await chatSession.sendEvent({ type: 'response.create' });

    const audioData = new Uint8Array(1024);
    await audioSession.sendAudio(audioData);
  } finally {
    // Clean up all sessions
    await Promise.all([chatSession.dispose(), audioSession.dispose()]);
  }
}

async function deltaStreamingExample(): Promise<void> {
  // The current SDK exposes streaming via handler deltas (no separate
  // async-iterator surface). Subscribe to `onResponseTextDelta` /
  // `onResponseAudioDelta` to consume tokens and audio as they arrive.
  const client = new VoiceLiveClient(
    'https://your-voicelive-endpoint.com',
    new AzureKeyCredential('your-api-key'),
  );

  const session = await client.startSession('gpt-realtime');

  try {
    const collectedText: string[] = [];

    const subscription = session.subscribe({
      onResponseTextDelta: async (event) => {
        collectedText.push(event.delta);
        console.log('Text chunk:', event.delta);
      },
      onResponseAudioDelta: async (event) => {
        console.log('Audio chunk:', event.delta.byteLength, 'bytes');
      },
      onResponseDone: async () => {
        console.log('Final text:', collectedText.join(''));
      },
    });

    // Send some input
    const prompt: UserMessageItem = {
      type: 'message',
      role: 'user',
      content: [{ type: 'input_text', text: 'Tell me a story!' }],
    };
    await session.addConversationItem(prompt);
    await session.sendEvent({ type: 'response.create' });

    // Wait for the response to complete
    await new Promise((resolve) => setTimeout(resolve, 10000));

    await subscription.close();
  } finally {
    await session.dispose();
  }
}

// Export for use in samples
export { basicHandlerPatternExample, multipleSessionsExample, deltaStreamingExample };