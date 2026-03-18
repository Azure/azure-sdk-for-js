// Main Voice Assistant implementation using Voice Live SDK
import { 
  VoiceLiveClient, 
  VoiceLiveSession,
  type VoiceLiveSessionHandlers,
  type VoiceLiveSubscription,
  type ConnectedEventArgs,
  type DisconnectedEventArgs,
  type ErrorEventArgs,
  type ConnectionContext,
  type SessionContext
} from '@azure/ai-voicelive';
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
  onConversationMessageUpdate: (message: { role: string; content: string; timestamp: Date; messageId?: string; isStreaming?: boolean }) => void;
  onEventReceived: (event: { type: string; data: any; timestamp: Date }) => void;
  onError: (error: string) => void;
  onAudioLevel: (level: number) => void;
}

export class VoiceAssistant {
  private client?: VoiceLiveClient;
  private session?: VoiceLiveSession;
  private subscription?: VoiceLiveSubscription;
  private audioCapture: SimpleAudioCapture;
  private callbacks?: VoiceAssistantCallbacks;
  private isConnected = false;
  private isConversationActive = false;
  private currentResponseId?: string;
  private audioContext?: AudioContext;
  
  // Track ongoing text responses for proper conversation display
  private currentAssistantMessage = '';
  private messageStartTime?: Date;
  private currentAssistantMessageId?: string;
  
  // Track ongoing transcription for user speech
  private currentUserTranscription = '';
  private userSpeechStartTime?: Date;
  
  // Audio playback queue management
  private audioQueue: AudioBuffer[] = [];
  private isPlayingAudio = false;
  private nextAudioStartTime = 0;
  private currentAudioSources: AudioBufferSourceNode[] = [];

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
        connectionTimeoutInMs: 30000,
        enableDebugLogging: config.debugMode !== false // Enable by default
      };

      console.log(`🔧 Creating Voice Live client with debug mode: ${sessionOptions.enableDebugLogging}`);
      console.log(`🔑 Using credential type: ${config.useTokenCredential ? 'TokenCredential' : 'API Key'}`);
      console.log('⚡ Using fail-fast connection policy - any disconnection will terminate session');
      
      if (sessionOptions.enableDebugLogging) {
        console.log('🐛 Debug mode enabled - you will see detailed SDK logs');
        console.log('🔍 Check Network tab for WebSocket messages');
        console.log('📡 Watch Events panel for real-time SDK events');
      }

      // Create Voice Live client
      this.client = new VoiceLiveClient(config.endpoint, credential, {
        apiVersion: '2025-10-01',
        defaultSessionOptions: sessionOptions
      });
      
      // Create and connect a session with model
      this.session = await this.client.startSession('gpt-4o', sessionOptions);
      
      // Setup handler-based event subscription (Azure SDK pattern)
      this.subscription = this.session.subscribe(this.createEventHandlers());
      
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
      
      // Close subscription first
      if (this.subscription) {
        await this.subscription.close();
        this.subscription = undefined;
      }
      
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

  private createEventHandlers(): VoiceLiveSessionHandlers {
    return {
      onConnected: async (args: ConnectedEventArgs, context: ConnectionContext) => {
        console.log('🔔 Connected:', args);
        this.callbacks?.onEventReceived({
          type: 'connected',
          data: args,
          timestamp: new Date()
        });
      },

      onDisconnected: async (args: DisconnectedEventArgs, context: ConnectionContext) => {
        console.log('🔔 Disconnected:', args);
        this.isConnected = false;
        this.callbacks?.onConnectionStatusChange('disconnected');
        this.callbacks?.onEventReceived({
          type: 'disconnected',
          data: args,
          timestamp: new Date()
        });
      },

      onError: async (args: ErrorEventArgs, context: ConnectionContext) => {
        console.log('🔔 Error:', args);
        this.callbacks?.onError(`Service error: ${args.error.message}`);
        this.callbacks?.onEventReceived({
          type: 'error',
          data: args,
          timestamp: new Date()
        });
      },

      onResponseCreated: async (event, context: SessionContext) => {
        console.log('🔔 Response Created:', event);
        
        // If this is a new response while another is in progress, it's likely due to barge-in
        if (this.currentResponseId && this.currentResponseId !== event.response.id) {
          console.log('🛑 New response started - previous response interrupted (likely barge-in)');
          this.clearAudioQueue();
        }
        
        this.currentResponseId = event.response.id;
        this.currentAssistantMessage = ''; // Reset for new response
        this.messageStartTime = new Date();
        this.currentAssistantMessageId = `response_${event.response.id}_${Date.now()}`;
        
        // Clear any previous audio queue when starting new response
        this.clearAudioQueue();
        
        // Add initial empty message that we'll update as deltas come in
        this.callbacks?.onConversationMessageUpdate({
          role: 'assistant',
          content: '', // Start empty
          timestamp: this.messageStartTime,
          messageId: this.currentAssistantMessageId,
          isStreaming: true
        });
        
        this.callbacks?.onAssistantStatusChange('thinking');
        this.callbacks?.onEventReceived({
          type: 'response.created',
          data: event,
          timestamp: new Date()
        });
      },

      onResponseDone: async (event, context: SessionContext) => {
        console.log('🔔 Response Done:', event);
        console.log('🔔 Final accumulated message:', this.currentAssistantMessage);
        
        // Finalize the streaming message
        if (this.currentAssistantMessageId && this.currentAssistantMessage.trim()) {
          this.callbacks?.onConversationMessageUpdate({
            role: 'assistant',
            content: this.currentAssistantMessage.trim(),
            timestamp: this.messageStartTime || new Date(),
            messageId: this.currentAssistantMessageId,
            isStreaming: false // Mark as complete
          });
        }
        
        // Reset for next response
        this.currentAssistantMessage = '';
        this.messageStartTime = undefined;
        this.currentAssistantMessageId = undefined;
        
        this.callbacks?.onAssistantStatusChange('listening');
        this.callbacks?.onEventReceived({
          type: 'response.done',
          data: event,
          timestamp: new Date()
        });
      },

      onInputAudioBufferSpeechStarted: async (event, context: SessionContext) => {
        console.log('🔔 Speech Started:', event);
        this.currentUserTranscription = ''; // Reset transcription
        this.userSpeechStartTime = new Date();
        
        // BARGE-IN: If audio is currently playing, stop it immediately
        if (this.isPlayingAudio) {
          console.log('🛑 BARGE-IN: User started speaking during agent response - stopping audio playback');
          this.clearAudioQueue();
          this.callbacks?.onAssistantStatusChange('interrupted');
          
          // Add barge-in indicator to conversation
          this.callbacks?.onConversationMessageUpdate({
            role: 'system',
            content: '[Conversation interrupted by user]',
            timestamp: new Date(),
            messageId: 'barge_in_' + Date.now(),
            isStreaming: false
          });
        }
        
        this.callbacks?.onAssistantStatusChange('listening (speech detected)');
        this.callbacks?.onEventReceived({
          type: 'speech.started',
          data: event,
          timestamp: new Date()
        });
      },

      onInputAudioBufferSpeechStopped: async (event, context: SessionContext) => {
        console.log('🔔 Speech Stopped:', event);
        this.callbacks?.onAssistantStatusChange('processing');
        
        // Don't add a message here - wait for transcription
        // The transcription handlers will add the actual user message
        
        this.callbacks?.onEventReceived({
          type: 'speech.stopped',
          data: event,
          timestamp: new Date()
        });
      },

      // Handle actual text responses from the assistant
      onResponseTextDelta: async (event, context: SessionContext) => {
        console.log('🔔 Response Text Delta:', event.delta);
        console.log('🔔 Current message so far:', this.currentAssistantMessage);
        
        // Accumulate text deltas for complete response
        this.currentAssistantMessage += event.delta;
        
        // Stream the update to the conversation UI in real-time
        if (this.currentAssistantMessageId) {
          this.callbacks?.onConversationMessageUpdate({
            role: 'assistant',
            content: this.currentAssistantMessage,
            timestamp: this.messageStartTime || new Date(),
            messageId: this.currentAssistantMessageId,
            isStreaming: true
          });
        }
        
        console.log('🔔 Updated message:', this.currentAssistantMessage);
      },

      // Handle audio transcript (what the assistant said as text)
      onResponseAudioTranscriptDelta: async (event, context: SessionContext) => {
        console.log('🔔 Audio Transcript Delta:', event.delta);
        console.log('🔔 Current transcript so far:', this.currentAssistantMessage);
        
        // Accumulate audio transcript deltas
        this.currentAssistantMessage += event.delta;
        
        // Stream the transcript update to the conversation UI in real-time
        if (this.currentAssistantMessageId) {
          this.callbacks?.onConversationMessageUpdate({
            role: 'assistant',
            content: this.currentAssistantMessage,
            timestamp: this.messageStartTime || new Date(),
            messageId: this.currentAssistantMessageId,
            isStreaming: true
          });
        }
        
        console.log('🔔 Updated transcript:', this.currentAssistantMessage);
      },

      // Handle user transcription deltas
      onConversationItemInputAudioTranscriptionDelta: async (event, context: SessionContext) => {
        console.log('🔔 User Transcription Delta:', event.delta);
        this.currentUserTranscription += event.delta;
      },

      // Handle completed user transcription
      onConversationItemInputAudioTranscriptionCompleted: async (event, context: SessionContext) => {
        console.log('🔔 User Transcription Completed:', event.transcript);
        
        // Add the complete user transcription to conversation
        this.callbacks?.onConversationMessage({
          role: 'user',
          content: event.transcript || this.currentUserTranscription || '[Audio input]',
          timestamp: this.userSpeechStartTime || new Date()
        });
        
        // Reset transcription tracking
        this.currentUserTranscription = '';
        this.userSpeechStartTime = undefined;
      },

      // Handle failed user transcription
      onConversationItemInputAudioTranscriptionFailed: async (event, context: SessionContext) => {
        console.log('🔔 User Transcription Failed:', event);
        
        // Add failed transcription indicator
        this.callbacks?.onConversationMessage({
          role: 'user',
          content: '[Audio input - transcription unavailable]',
          timestamp: this.userSpeechStartTime || new Date()
        });
        
        // Reset transcription tracking
        this.currentUserTranscription = '';
        this.userSpeechStartTime = undefined;
      },

      onResponseAudioDelta: async (event, context: SessionContext) => {
        console.log('🔔 Audio Received:', event.delta?.byteLength, 'bytes');
        
        // Add debugging for audio format
        if (event.delta && event.delta.byteLength > 0) {
          console.log('🔊 Audio chunk details:', {
            byteLength: event.delta.byteLength,
            samples: event.delta.byteLength / 2,
            durationMs: (event.delta.byteLength / 2 / 24000) * 1000
          });
          
          // Handle streaming audio
          const audioBuffer = new ArrayBuffer(event.delta.byteLength);
          const view = new Uint8Array(audioBuffer);
          view.set(event.delta);
          await this.playAudioChunk(audioBuffer);
        } else {
          console.warn('🔊 Empty or invalid audio chunk received');
        }
      },

      // Catch-all for any server events not handled specifically
      onServerEvent: async (event, context: SessionContext) => {
        console.log('🔔 Server Event:', event.type, event);
        
        // Just log all events for debugging - specific handlers above handle the processing
        this.callbacks?.onEventReceived({
          type: event.type,
          data: event,
          timestamp: new Date()
        });
      }
    };
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
        content: 'Conversation started. Start speaking to the assistant!',
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
      // Clear any playing audio first
      this.clearAudioQueue();
      
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
      // Create proper voice object based on the voice name
      const voice = this.createVoiceObject(config.voice);

      // Update session configuration using convenience methods
      await this.session.updateSession({
        modalities: ['audio', 'text'],
        instructions: config.instructions,
        voice: voice, // Now using proper voice object
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

  private createVoiceObject(voiceName: string): any {
    // Check if it's an OpenAI voice (simple names like 'alloy', 'echo', etc.)
    const openAIVoices = ['alloy', 'echo', 'shimmer', 'ash', 'ballad', 'coral', 'sage', 'verse'];
    
    if (openAIVoices.includes(voiceName.toLowerCase())) {
      return {
        type: 'openai',
        name: voiceName.toLowerCase()
      };
    }
    
    // Assume it's an Azure voice (contains locale patterns like en-US)
    return {
      type: 'azure-standard',
      name: voiceName
    };
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
    if (!this.audioContext) {
      console.warn('AudioContext not available for audio playback');
      return;
    }

    try {
      // VoiceLive sends raw PCM16 data, not encoded audio
      const sampleRate = 24000; // VoiceLive default output sample rate
      const numberOfChannels = 1; // Mono audio
      const byteLength = audioData.byteLength;
      const numberOfSamples = byteLength / 2; // 16-bit = 2 bytes per sample
      
      if (numberOfSamples === 0) {
        console.warn('Empty audio chunk received');
        return;
      }
      
      // Create AudioBuffer for the PCM data
      const audioBuffer = this.audioContext.createBuffer(
        numberOfChannels,
        numberOfSamples,
        sampleRate
      );
      
      // Convert Int16 PCM data to Float32 for Web Audio API
      const pcm16Data = new Int16Array(audioData);
      const float32Data = audioBuffer.getChannelData(0);
      
      for (let i = 0; i < numberOfSamples; i++) {
        // Convert from Int16 (-32768 to 32767) to Float32 (-1.0 to 1.0)
        float32Data[i] = pcm16Data[i] / 32768.0;
      }
      
      // Add to audio queue instead of playing immediately
      this.audioQueue.push(audioBuffer);
      
      console.log(`🔊 Queued audio chunk: ${numberOfSamples} samples, ${byteLength} bytes (queue length: ${this.audioQueue.length})`);
      
      // Start playing if not already playing
      if (!this.isPlayingAudio) {
        this.startAudioPlayback();
      }
      
    } catch (error) {
      console.error('Failed to process audio chunk:', error);
    }
  }

  private startAudioPlayback(): void {
    if (!this.audioContext || this.isPlayingAudio || this.audioQueue.length === 0) {
      return;
    }

    this.isPlayingAudio = true;
    this.nextAudioStartTime = this.audioContext.currentTime;
    this.callbacks?.onAssistantStatusChange('speaking');
    
    console.log('🔊 Starting sequential audio playback');
    this.playNextAudioChunk();
  }

  private playNextAudioChunk(): void {
    if (!this.audioContext || this.audioQueue.length === 0) {
      this.isPlayingAudio = false;
      this.callbacks?.onAssistantStatusChange('listening');
      console.log('🔊 Audio playback completed');
      return;
    }

    const audioBuffer = this.audioQueue.shift()!;
    const source = this.audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(this.audioContext.destination);
    
    // Track this source for potential barge-in interruption
    this.currentAudioSources.push(source);
    
    // Schedule this chunk to start exactly when the previous one ends
    source.start(this.nextAudioStartTime);
    
    // Calculate when this chunk will end
    const chunkDuration = audioBuffer.length / audioBuffer.sampleRate;
    this.nextAudioStartTime += chunkDuration;
    
    console.log(`🔊 Playing chunk (duration: ${(chunkDuration * 1000).toFixed(1)}ms, queue remaining: ${this.audioQueue.length})`);
    
    // Schedule the next chunk to play when this one ends
    source.onended = () => {
      // Remove this source from tracking
      const index = this.currentAudioSources.indexOf(source);
      if (index > -1) {
        this.currentAudioSources.splice(index, 1);
      }
      this.playNextAudioChunk();
    };
  }

  private clearAudioQueue(): void {
    // Stop all currently playing audio sources immediately
    this.currentAudioSources.forEach(source => {
      try {
        source.stop();
      } catch (error) {
        // Source might already be stopped, ignore the error
      }
    });
    this.currentAudioSources = [];
    
    // Clear the queue
    this.audioQueue = [];
    
    // Reset playback state
    this.isPlayingAudio = false;
    
    // Reset timing for next playback
    if (this.audioContext) {
      this.nextAudioStartTime = this.audioContext.currentTime;
    }
    
    console.log('🛑 Audio queue cleared and all sources stopped (barge-in or response change)');
  }
}