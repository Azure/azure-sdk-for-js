// Main Voice Assistant implementation using Voice Live SDK
import { VoiceLiveClient, VoiceLiveSession } from '@azure/ai-voicelive';
import { AzureKeyCredential } from '@azure/core-auth';
import type { TokenCredential, KeyCredential } from '@azure/core-auth';
import { SimpleAudioCapture } from './audioCapture.js';

// Note: DefaultAzureCredential would come from @azure/identity package
// For this demo, we'll create a mock implementation
class MockDefaultAzureCredential implements TokenCredential {
  async getToken(): Promise<{ token: string; expiresOnTimestamp: number } | null> {
    console.warn('Mock DefaultAzureCredential used - implement proper Azure authentication for production');
    return {
      token: 'mock-token-for-demo',
      expiresOnTimestamp: Date.now() + 3600000 // 1 hour from now
    };
  }
}

export interface VoiceAssistantConfig {
  endpoint: string;
  apiKey?: string;
  useTokenCredential?: boolean;
  voice: string;
  instructions: string;
  debugMode?: boolean;
}

export interface VoiceAssistantCallbacks {
  onConnectionStatusChange: (status: string) => void;
  onAssistantStatusChange: (status: string) => void;
  onConversationMessage: (message: { role: string; content: string; timestamp: Date }) => void;
  onEventReceived: (event: { type: string; data: any; timestamp: Date }) => void;
  onError: (error: string) => void;
  onAudioLevel: (level: number) => void;
}

export class VoiceAssistant {
  private client?: VoiceLiveClient;
  private session?: VoiceLiveSession;
  private audioCapture: SimpleAudioCapture;
  private callbacks?: VoiceAssistantCallbacks;
  private isConnected = false;
  private isConversationActive = false;
  private currentResponseId?: string;
  private audioContext?: AudioContext;

  constructor() {
    this.audioCapture = new SimpleAudioCapture();
  }

  setCallbacks(callbacks: VoiceAssistantCallbacks): void {
    this.callbacks = callbacks;
  }

  async connect(config: VoiceAssistantConfig): Promise<void> {
    try {
      this.callbacks?.onConnectionStatusChange('connecting');
      
      // Create appropriate credential based on configuration
      const credential = this._createCredential(config);
      
      // Create client options for session
      const sessionOptions: any = {
        connectionTimeoutMs: 30000,
        autoReconnect: true,
        maxReconnectAttempts: 3,
        enableDebugLogging: config.debugMode !== false // Enable by default
      };

      console.log(`🔧 Creating Voice Live client with debug mode: ${sessionOptions.enableDebugLogging}`);
      console.log(`🔑 Using credential type: ${config.useTokenCredential ? 'TokenCredential' : 'API Key'}`);
      
      if (sessionOptions.enableDebugLogging) {
        console.log('🐛 Debug mode enabled - you will see detailed SDK logs');
        console.log('🔍 Check Network tab for WebSocket messages');
        console.log('📡 Watch Events panel for real-time SDK events');
      }

      // Create Voice Live client (now a session factory)
      this.client = new VoiceLiveClient(config.endpoint, credential, {
        apiVersion: '2025-10-01',
        defaultSessionOptions: sessionOptions
      });
      
      // Create and connect a session with model
      this.session = await this.client.startSession('gpt-4o', sessionOptions);
      
      // Setup event handlers on the session
      this.setupEventHandlers();
      
      // Configure session
      await this.configureSession(config);
      
      this.isConnected = true;
      this.callbacks?.onConnectionStatusChange('connected');
      
      console.log('Connected to Voice Live service via session');
      
    } catch (error) {
      this.callbacks?.onConnectionStatusChange('disconnected');
      this.callbacks?.onError(`Connection failed: ${error}`);
      throw error;
    }
  }

  private _createCredential(config: VoiceAssistantConfig): TokenCredential | KeyCredential {
    if (config.useTokenCredential) {
      // Use Azure Default Credential (for production scenarios)
      console.log('🔑 Using Azure Default Credential (token-based authentication)');
      return new MockDefaultAzureCredential();
    } else {
      // Use API Key (for development/simple scenarios)
      if (!config.apiKey) {
        throw new Error('API key is required when not using token credential');
      }
      console.log('🗝️ Using API Key authentication');
      return new AzureKeyCredential(config.apiKey);
    }
  }

  async disconnect(): Promise<void> {
    try {
      this.stopConversation();
      
      if (this.session && this.isConnected) {
        await this.session.disconnect();
        await this.session.dispose();
        this.session = undefined;
      }
      
      this.isConnected = false;
      this.callbacks?.onConnectionStatusChange('disconnected');
      
      console.log('Disconnected from Voice Live service');
      
    } catch (error) {
      this.callbacks?.onError(`Disconnect failed: ${error}`);
    }
  }

  async startConversation(): Promise<void> {
    if (!this.session || !this.isConnected) {
      throw new Error('Not connected to Voice Live service');
    }

    try {
      // Initialize audio capture
      await this.audioCapture.initialize();
      
      // Setup audio context for playback
      this.audioContext = new AudioContext();
      
      // Start audio capture
      this.audioCapture.startCapture(
        (level) => this.callbacks?.onAudioLevel(level),
        (audioData) => this.sendAudioData(audioData)
      );
      
      this.isConversationActive = true;
      this.callbacks?.onAssistantStatusChange('listening');
      
      this.callbacks?.onConversationMessage({
        role: 'system',
        content: 'Conversation started. Start speaking!',
        timestamp: new Date()
      });
      
      console.log('Conversation started');
      
    } catch (error) {
      this.callbacks?.onError(`Failed to start conversation: ${error}`);
      throw error;
    }
  }

  stopConversation(): void {
    try {
      this.audioCapture.stopCapture();
      
      if (this.audioContext) {
        this.audioContext.close();
        this.audioContext = undefined;
      }
      
      this.isConversationActive = false;
      this.callbacks?.onAssistantStatusChange('idle');
      this.callbacks?.onAudioLevel(0);
      
      this.callbacks?.onConversationMessage({
        role: 'system',
        content: 'Conversation stopped.',
        timestamp: new Date()
      });
      
      console.log('Conversation stopped');
      
    } catch (error) {
      this.callbacks?.onError(`Failed to stop conversation: ${error}`);
    }
  }

  cleanup(): void {
    this.stopConversation();
    this.audioCapture.cleanup();
  }

  // Getters for status
  get connectionStatus(): string {
    return this.isConnected ? 'connected' : 'disconnected';
  }

  get conversationStatus(): string {
    return this.isConversationActive ? 'active' : 'inactive';
  }

  private async configureSession(config: VoiceAssistantConfig): Promise<void> {
    if (!this.session) return;

    try {
      // Update session configuration using convenience methods
      await this.session.updateSession({
        modalities: ['audio', 'text'],
        instructions: config.instructions,
        voice: config.voice,
        inputAudioFormat: 'pcm16',
        outputAudioFormat: 'pcm16',
        turnDetection: {
          type: 'server_vad',
          threshold: 0.5,
          prefixPaddingMs: 300,
          silenceDurationMs: 500
        }
      });
      
      console.log('Session configured successfully');
      
    } catch (error) {
      console.error('Failed to configure session:', error);
      throw error;
    }
  }

  private setupEventHandlers(): void {
    if (!this.session) return;

    // Now use session.events instead of client.events
    const events = this.session.events;

    // Add debug logging for all events when debug mode is on
    const logEvent = (eventName: string, data: any) => {
      console.log(`🔔 SDK Event: ${eventName}`, data);
    };

    // Connection events
    events.on('connected', (args) => {
      logEvent('connected', args);
      this.callbacks?.onEventReceived({
        type: 'connected',
        data: args,
        timestamp: new Date()
      });
    });

    events.on('disconnected', (args) => {
      logEvent('disconnected', args);
      this.isConnected = false;
      this.callbacks?.onConnectionStatusChange('disconnected');
      this.callbacks?.onEventReceived({
        type: 'disconnected',
        data: args,
        timestamp: new Date()
      });
    });

    events.on('error', (args) => {
      logEvent('error', args);
      this.callbacks?.onError(`Service error: ${args.error.message}`);
      this.callbacks?.onEventReceived({
        type: 'error',
        data: args,
        timestamp: new Date()
      });
    });

    // Response events - demonstrate streaming
    events.on('server.response.created', (event) => {
      logEvent('server.response.created', event);
      this.currentResponseId = event.response.id;
      this.callbacks?.onAssistantStatusChange('thinking');
      this.callbacks?.onEventReceived({
        type: 'response.created',
        data: event,
        timestamp: new Date()
      });
    });

    events.on('server.response.done', (event) => {
      logEvent('server.response.done', event);
      this.callbacks?.onAssistantStatusChange('listening');
      this.callbacks?.onEventReceived({
        type: 'response.done',
        data: event,
        timestamp: new Date()
      });
    });

    // Text streaming - demonstrate real-time text updates
    this.setupTextStreaming();

    // Audio streaming - demonstrate real-time audio playback
    this.setupAudioStreaming();

    // Input audio events
    events.on('server.input_audio_buffer.speech_started', (event) => {
      logEvent('server.input_audio_buffer.speech_started', event);
      this.callbacks?.onAssistantStatusChange('listening (speech detected)');
      this.callbacks?.onEventReceived({
        type: 'speech.started',
        data: event,
        timestamp: new Date()
      });
    });

    events.on('server.input_audio_buffer.speech_stopped', (event) => {
      logEvent('server.input_audio_buffer.speech_stopped', event);
      this.callbacks?.onAssistantStatusChange('processing');
      this.callbacks?.onEventReceived({
        type: 'speech.stopped',
        data: event,
        timestamp: new Date()
      });
    });
  }

  private async setupTextStreaming(): Promise<void> {
    if (!this.session) return;

    try {
      // Now use session.asyncIterators instead of client.asyncIterators
      const textStream = this.session.asyncIterators.streamText({
        bufferChunks: true,
        chunkTimeoutMs: 100
      });

      // Process text stream asynchronously
      (async () => {
        let currentMessage = '';
        
        for await (const textChunk of textStream) {
          currentMessage += textChunk;
          
          // Update conversation with streaming text
          this.callbacks?.onConversationMessage({
            role: 'assistant',
            content: currentMessage,
            timestamp: new Date()
          });
        }
      })().catch(error => {
        console.error('Text streaming error:', error);
      });

    } catch (error) {
      console.error('Failed to setup text streaming:', error);
    }
  }

  private async setupAudioStreaming(): Promise<void> {
    if (!this.session) return;

    try {
      // Now use session.streaming instead of client.streaming
      const audioStream = this.session.streaming.createAudioStream();

      // Process audio stream asynchronously
      (async () => {
        for await (const audioChunk of audioStream) {
          await this.playAudioChunk(audioChunk.data);
        }
      })().catch(error => {
        console.error('Audio streaming error:', error);
      });

    } catch (error) {
      console.error('Failed to setup audio streaming:', error);
    }
  }

  private async sendAudioData(audioData: ArrayBuffer): Promise<void> {
    if (!this.session || !this.isConversationActive) return;

    try {
      // Convert ArrayBuffer to Uint8Array for sending
      const audioBytes = new Uint8Array(audioData);
      await this.session.sendAudio(audioBytes);
      
    } catch (error) {
      console.error('Failed to send audio data:', error);
    }
  }

  private async playAudioChunk(audioData: ArrayBuffer): Promise<void> {
    if (!this.audioContext) return;

    try {
      // Decode and play audio using Web Audio API
      const audioBuffer = await this.audioContext.decodeAudioData(audioData.slice(0));
      const source = this.audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(this.audioContext.destination);
      source.start();
      
      this.callbacks?.onAssistantStatusChange('speaking');
      
    } catch (error) {
      // Audio might be in a format we can't directly play
      // For demo purposes, we'll just log it
      console.log('Received audio chunk:', audioData.byteLength, 'bytes');
    }
  }
}