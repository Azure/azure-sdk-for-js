// Basic example of the new VoiceLive Client/Session architecture
import { VoiceLiveClient, VoiceLiveSession } from '@azure/ai-voicelive';
import { AzureKeyCredential } from '@azure/core-auth';

async function basicClientSessionExample() {
  // 1. Create client (session factory)
  const client = new VoiceLiveClient(
    'https://your-voicelive-endpoint.com',
    new AzureKeyCredential('your-api-key'),
    {
      apiVersion: '2025-10-01',
      defaultSessionOptions: {
        autoReconnect: true,
        enableDebugLogging: true
      }
    }
  );

  // 2. Create and connect a session with model
  const session = await client.startSession('gpt-4o-realtime-preview', {
    connectionTimeoutMs: 30000,
    maxReconnectAttempts: 3
  });

  try {
    // 3. Configure the session
    await session.updateSession({
      model: 'gpt-4o-realtime-preview',
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

    // 4. Set up event handlers
    session.events.on('server.response.text.delta', (event) => {
      console.log('Received text:', event.delta);
    });

    session.events.on('server.response.audio.delta', (event) => {
      console.log('Received audio chunk:', event.delta.length, 'bytes');
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

    // 7. Wait for specific events
    const response = await session.waitForEvent('server.response.done', undefined, 30000);
    console.log('Response completed:', response);

  } finally {
    // 8. Always dispose the session
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
  const chatSession = await client.startSession('gpt-4o-realtime-preview');
  const audioSession = await client.startSession('gpt-4o-realtime-preview');

  try {
    // Configure each session differently
    await chatSession.updateSession({
      model: 'gpt-4o-realtime-preview',
      modalities: ['text'],
      instructions: 'You are a text-only chat assistant.'
    });

    await audioSession.updateSession({
      model: 'gpt-4o-realtime-preview',
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

  const session = await client.startSession('gpt-4o-realtime-preview');

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