// Basic example of the new VoiceLive Client/Session architecture
import { VoiceLiveClient, VoiceLiveSession } from '@azure/ai-voicelive';
import { AzureKeyCredential } from '@azure/core-auth';

// Basic example of the new VoiceLive Azure SDK Handler Pattern
import { 
  VoiceLiveClient, 
  VoiceLiveSession,
  type VoiceLiveSessionHandlers 
} from '@azure/ai-voicelive';
import { AzureKeyCredential } from '@azure/core-auth';

async function basicHandlerPatternExample() {
  // 1. Create client (session factory)
  const client = new VoiceLiveClient(
    'https://your-voicelive-endpoint.com',
    new AzureKeyCredential('your-api-key'),
    {
      apiVersion: '2025-10-01',
      defaultSessionOptions: {
        enableDebugLogging: true
      }
    }
  );

  // 2. Create and connect a session with model
  const session = await client.startSession('gpt-realtime', {
    connectionTimeoutInMs: 30000
  });

  try {
    // 3. Setup Azure SDK handler-based event subscription
    const subscription = session.subscribe({
      onConnected: async (args, context) => {
        console.log('🟢 Connected to session:', context.sessionId);
      },

      processError: async (error, context) => {
        console.log('🔴 Session error:', error.error.message);
      },

      processResponseCreated: async (event, context) => {
        console.log('🤔 Assistant started thinking...');
      },

      processResponseDone: async (event, context) => {
        console.log('✅ Assistant finished response');
      },

      processTextReceived: async (event, context) => {
        console.log('📝 Text received:', event.delta);
      },

      processAudioReceived: async (event, context) => {
        console.log('🔊 Audio received:', event.delta.byteLength, 'bytes');
        // Handle real-time audio streaming
      },

      processSpeechStarted: async (event, context) => {
        console.log('🎤 Speech detected');
      },

      processSpeechStopped: async (event, context) => {
        console.log('⏸️ Speech stopped');
      }
    });

    // 4. Configure the session
    await session.updateSession({
      model: 'gpt-realtime',
      modalities: ['audio', 'text'],
      instructions: 'You are a helpful assistant.',
      voice: {
        type: 'openai',
        name: 'alloy'
      },
      inputAudioFormat: 'pcm16',
      outputAudioFormat: 'pcm16',
      turnDetection: {
        type: 'server_vad',
        threshold: 0.5
      }
    });

    // 5. Send audio data
    const audioData = new Uint8Array(1024); // Your audio data
    await session.sendAudio(audioData);

    // 6. Send text message
    await session.addConversationItem({
      type: 'message',
      role: 'user',
      content: [{
        type: 'input_text',
        text: 'Hello, how are you?'
      }]
    });

    // 7. Wait for some interaction...
    await new Promise(resolve => setTimeout(resolve, 5000));

    // 8. Clean up subscription
    await subscription.close();

  } finally {
    // 9. Always dispose the session
    await session.dispose();
  }
}

async function multipleSessionsExample() {
  // One client can create multiple sessions
  const client = new VoiceLiveClient(
    'https://your-voicelive-endpoint.com',
    new AzureKeyCredential('your-api-key')
  );

  // Create multiple sessions for different purposes
  const chatSession = await client.startSession('gpt-realtime');
  const audioSession = await client.startSession('gpt-realtime');

  try {
    // Configure each session differently
    await chatSession.updateSession({
      model: 'gpt-realtime',
      modalities: ['text'],
      instructions: 'You are a text-only chat assistant.'
    });

    await audioSession.updateSession({
      model: 'gpt-realtime',
      modalities: ['audio'],
      instructions: 'You are a voice-only assistant.',
      voice: {
        type: 'openai',
        name: 'echo'
      }
    });

    // Use sessions independently
    await chatSession.addConversationItem({
      type: 'message',
      role: 'user',
      content: [{ type: 'input_text', text: 'Hello from chat!' }]
    });

    const audioData = new Uint8Array(1024);
    await audioSession.sendAudio(audioData);

  } finally {
    // Clean up all sessions
    await Promise.all([
      chatSession.dispose(),
      audioSession.dispose()
    ]);
  }
}

async function streamingExample() {
  const client = new VoiceLiveClient(
    'https://your-voicelive-endpoint.com',
    new AzureKeyCredential('your-api-key')
  );

  const session = await client.startSession('gpt-realtime');

  try {
    // Set up streaming
    const textStream = session.asyncIterators.streamText();
    const audioStream = session.streaming.createAudioStream();

    // Process streams concurrently
    const textProcessor = (async () => {
      for await (const textChunk of textStream) {
        console.log('Text chunk:', textChunk);
      }
    })();

    const audioProcessor = (async () => {
      for await (const audioChunk of audioStream) {
        console.log('Audio chunk:', audioChunk.data.byteLength, 'bytes');
      }
    })();

    // Send some input
    await session.addConversationItem({
      type: 'message',
      role: 'user',
      content: [{ type: 'input_text', text: 'Tell me a story!' }]
    });

    // Wait for processing to complete
    await Promise.race([textProcessor, audioProcessor]);

  } finally {
    await session.dispose();
  }
}

// Export for use in samples
export {
  basicClientSessionExample,
  multipleSessionsExample,
  streamingExample
};