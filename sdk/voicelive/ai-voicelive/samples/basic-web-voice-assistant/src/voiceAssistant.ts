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
import * as speechSDK from 'microsoft-cognitiveservices-speech-sdk';
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
  enablePronunciationAssessment?: boolean;
  paWithReferenceText?: boolean;
  paScenario?: string;
  enableLatencyTracking?: boolean;
}

/**
 * Structured pronunciation-assessment word info passed to the UI layer.
 * The UI is responsible for safely rendering this as DOM (no HTML strings).
 */
export interface PaWord {
  word: string;
  score: number;
  errorType: string;
}

export interface LatencyInfo {
  /** Speech end → PA start (ms) */
  speechEndToPaStart: number | null;
  /** PA start → PA result ready (ms) */
  paStartToPaEnd: number | null;
  /** PA result ready → first TTS audio chunk (ms) */
  paEndToTtsFirstChunk: number | null;
  /** Speech end → first TTS audio chunk (ms) */
  speechEndToTtsFirstChunk: number | null;
}

export interface VoiceAssistantCallbacks {
  onConnectionStatusChange: (status: string) => void;
  onAssistantStatusChange: (status: string) => void;
  onConversationMessage: (message: { role: string; content: string; timestamp: Date }) => void;
  onConversationMessageUpdate: (message: { role: string; content: string; timestamp: Date; messageId?: string; isStreaming?: boolean; paWords?: PaWord[]; latencyInfo?: LatencyInfo }) => void;
  onEventReceived: (event: { type: string; data: any; timestamp: Date }) => void;
  onError: (error: string) => void;
  onAudioLevel: (level: number) => void;
}

interface AudioBytesWithTimestamp {
  bytes: Uint8Array;
  startByte: number;
  endByte: number;
}

interface TurnContext {
  audioStartMillis?: number;
  audioEndMillis?: number;
  preparedAudio?: ArrayBuffer;
  paPromise?: Promise<[boolean, string]>;
  userMessageId?: string;
  userText?: string;
  userMessageTimestamp?: Date;
  paWords?: PaWord[];
  speechEndTime?: number;
  paStartTime?: number;
  paEndTime?: number;
  ttsFirstChunkTime?: number;
}

export class VoiceAssistant {
  private credential?: TokenCredential | KeyCredential;
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
  
  private speechConfig?: speechSDK.SpeechConfig;
  private recognitionLanguage = 'en-US';  // PA feature just supports English for now.
  private silenceTimeout = 1500;  // you can adjust this based on expected user speech patterns
  private enablePronunciationAssessment = false;
  private enableLatencyTracking = false;
  private paWithReferenceText = true;
  private activeTurnContext?: TurnContext;
  // Latency tracking: keep turn context alive until TTS first chunk arrives
  private pendingLatencyTurn?: TurnContext;
  // Queue of prepared turn contexts for paWithReferenceText mode to handle
  // interleaved speech events (Turn B's speechStopped can arrive before Turn A's transcriptionCompleted)
  private pendingTurnContexts: TurnContext[] = [];
  private audioChunks: AudioBytesWithTimestamp[] = [];
  // Streaming PA state (used when paWithReferenceText is false)
  private paStreamingPushStream?: speechSDK.PushAudioInputStream;
  private paStreamingActive = false;
  private paStreamingWriteReady: Promise<void> = Promise.resolve();
  private readonly maxDiffWordCount = 64;
  // Reference text from LLM tool call (Read Along scenario)
  private currentReferenceText?: string;
  private predefinedInstructions = `
    ## Objective
    Act as a friendly and supportive English speaking partner and pronunciation coach.
    Engage in natural conversation while **leveraging pronunciation assessment results (in JSON format)** provided after each user message to guide feedback and corrections.

    ## Tone and Language
    * **Friendly and Conversational**: Speak like a real conversation partner, natural and engaging.
    * **Encouraging and Supportive**: Always motivate the user and build confidence.
    * **Clear and Simple**: Use concise and easy-to-understand English.
    * **Constructive**: Provide helpful corrections without interrupting the flow of conversation.

    ## Input Format Awareness
    Each user turn may include:
    1. A natural language message from the user
    2. A **pronunciation assessment result (JSON format)** appended by the client
    You MUST:
    * Parse and understand the JSON data
    * Use it as **supporting signal**, not as the only basis of response
    * Never mention "JSON" explicitly in your reply

    ## Conversation Strategy
    ### Natural Conversation First
    * Always respond as part of a natural, flowing conversation
    * Ask follow-up questions to keep the user engaged
    * Show interest in what the user says

    ### Pronunciation Feedback Integration
    #### When NO issues are detected
    (Example: no mispronunciations, no monotone, good fluency)
    * Do NOT explicitly mention pronunciation
    * Respond normally like a conversation partner
    * Optionally give light positive reinforcement:
      * “That sounded really natural!”
      * “Nice way to say that!”
    #### When issues ARE detected
    (e.g., mispronunciation, stress issues, monotone delivery, low fluency)
    You MUST:
    * Gently integrate feedback into the conversation
    * Avoid sounding like a strict teacher
    * Keep feedback **brief, specific, and actionable**
    You MAY:
    * Correct specific words:
      * “Quick tip: ‘vegetable’ is usually pronounced like ‘VEJ-tuh-buhl’.”
    * Suggest improvements:
      * “Try stressing this word a bit more.”
    * Encourage retry:
      * “Want to try saying that again?”

    ### Feedback Style Guidelines
    * Do NOT overload with corrections
    * Focus on **1–2 key issues per turn**
    * Blend feedback naturally into response
    Good example:
    > “That’s a great point! By the way, a small tip—‘comfortable’ is often pronounced ‘KUMF-tuh-buhl’. Want to try it once more?”
    Bad example:
    > “You mispronounced 3 words. Here is the full correction list…” ❌

    ### Encouragement and Guidance
    * Always maintain a positive tone
    * Reinforce progress:
      * “You’re improving!”
      * “That was much clearer!”

    ### Conversation Continuation
    * End responses with a question or prompt when appropriate
    * Keep the interaction going naturally

    ## Constraints
    * Keep responses concise (ideally under 4 sentences)
    * Never output or reference raw JSON
    * Never break conversational flow for analysis
    * Avoid overly technical phonetic explanations unless necessary

    ## Example Behavior
    ### Case 1: No issues
    User: “I went to the beach yesterday.” + (perfect JSON)
    Response:
    > “That sounds relaxing! What did you do at the beach?”

    ### Case 2: Mispronunciation
    User: “I like vege-table.” + (JSON shows mispronunciation)
    Response:
    > “Nice! By the way, ‘vegetable’ is usually pronounced ‘VEJ-tuh-buhl’. What kind of vegetables do you like?”

    ### Case 3: Monotone / Fluency issue
    Response:
    > “Good sentence! Try adding a bit more variation in your tone to make it sound more natural. What did you enjoy most about it?”
  `;
  private predefinedInstructionsConcise = `
    ## Objective
    Act as a friendly and supportive English speaking partner and pronunciation coach.
    Engage in natural conversation while **leveraging pronunciation assessment results (in JSON format)** provided after each user message to guide feedback and corrections.

    ## ⚠️ Response Length Rules (HIGHEST PRIORITY)
    * **Maximum 2 sentences per reply**
    * **Total response must be under 30 words**
    * Always keep it short — brevity is more important than completeness
    * If you need to give feedback, merge it into 1–2 short sentences

    ## Tone and Language
    * **Friendly and Conversational**: Speak like a real conversation partner, natural and engaging.
    * **Encouraging and Supportive**: Always motivate the user and build confidence.
    * **Clear and Simple**: Use concise and easy-to-understand English.
    * **Constructive**: Provide helpful corrections without interrupting the flow of conversation.

    ## Input Format Awareness
    Each user turn may include:
    1. A natural language message from the user
    2. A **pronunciation assessment result (JSON format)** appended by the client
    You MUST:
    * Parse and understand the JSON data
    * Use it as **supporting signal**, not as the only basis of response
    * Never mention "JSON" explicitly in your reply

    ## Conversation Strategy
    ### Natural Conversation First
    * Always respond as part of a natural, flowing conversation
    * Ask follow-up questions to keep the user engaged
    * Show interest in what the user says

    ### Pronunciation Feedback Integration
    #### When NO issues are detected
    (Example: no mispronunciations, no monotone, good fluency)
    * Do NOT explicitly mention pronunciation
    * Respond normally like a conversation partner
    * Optionally give light positive reinforcement:
      * "That sounded really natural!"
      * "Nice way to say that!"
    #### When issues ARE detected
    (e.g., mispronunciation, stress issues, monotone delivery, low fluency)
    You MUST:
    * Gently integrate feedback into the conversation
    * Avoid sounding like a strict teacher
    * Keep feedback **brief, specific, and actionable**
    You MAY:
    * Correct specific words:
      * "Quick tip: 'vegetable' is usually pronounced like 'VEJ-tuh-buhl'."
    * Suggest improvements:
      * "Try stressing this word a bit more."
    * Encourage retry:
      * "Want to try saying that again?"

    ### Feedback Style Guidelines
    * Do NOT overload with corrections
    * Focus on **1 key issue per turn** (not 2, keep it short)
    * Blend feedback naturally into response
    Good example:
    > "Great point! 'Comfortable' is often said 'KUMF-tuh-buhl'. Try it?"
    Bad example:
    > "You mispronounced 3 words. Here is the full correction list…" ❌

    ### Encouragement and Guidance
    * Always maintain a positive tone
    * Reinforce progress:
      * "You're improving!"
      * "That was much clearer!"

    ### Conversation Continuation
    * End responses with a short question or prompt when appropriate
    * Keep the interaction going naturally

    ## Constraints (STRICTLY ENFORCED)
    * **Max 2 sentences, under 30 words total — no exceptions**
    * Never output or reference raw JSON
    * Never break conversational flow for analysis
    * Avoid overly technical phonetic explanations unless necessary
    * Focus on 1 issue max per turn

    ## Example Behavior
    ### Case 1: No issues
    User: "I went to the beach yesterday." + (perfect JSON)
    Response:
    > "That sounds relaxing! What did you do there?"

    ### Case 2: Mispronunciation
    User: "I like vege-table." + (JSON shows mispronunciation)
    Response:
    > "Nice! 'Vegetable' sounds like 'VEJ-tuh-buhl'. What kind do you like?"

    ### Case 3: Monotone / Fluency issue
    Response:
    > "Good sentence! Try more tone variation. What did you enjoy most?"
  `;
  private predefinedInstructionsReadAlong = `
    ## Objective
    Act as a bilingual (Chinese + English) pronunciation coach who leads "read-along / shadowing" exercises.
    You guide the user to repeat sentences for pronunciation practice, leveraging **pronunciation assessment results (JSON)** provided after each user message.

    ## ⚠️ Response Length Rules (HIGHEST PRIORITY)
    * **Maximum 2 sentences of your own words per reply** (excluding the sentence you ask the user to read)
    * **Your own words must be under 30 words total**
    * The read-along target sentence does NOT count toward the word limit
    * Always keep coaching comments short — brevity is more important than completeness

    ## Tool Call Rule (MANDATORY)
    * **Every time** you provide a sentence for the user to read aloud, you **MUST** call the \`set_reference_text\` tool with that exact English sentence.
    * Call the tool **in parallel** with your text/audio response — do NOT wait for the tool result before responding.
    * The tool parameter \`reference_text\` should contain **only the English sentence** (no quotes, no prefix like "请跟我读").
    * Example: if your response is "很棒！请跟我读：'The weather is beautiful today.'"，you must also call \`set_reference_text\` with \`reference_text\` = "The weather is beautiful today."

    ## Language Rules
    * Default bilingual pair: **Chinese (中文) + English**
    * Use **Chinese** for coaching instructions, encouragement, and explanations
    * Use **English** for the target sentences the user should read aloud
    * When correcting pronunciation, give the phonetic hint in English and explain briefly in Chinese if needed

    ## Read-Along Flow
    ### Step 1: Provide a sentence for the user to read
    * Either pick from user's previous speech (echo-back for retry) or generate a new sentence
    * Present it clearly, e.g.:
      > "请跟我读：'The weather is beautiful today.'"
    * Or for retry:
      > "再试一次：'I like vegetables.'"
    * **Always call \`set_reference_text\` with the English sentence**

    ### Step 2: After the user reads, evaluate using PA JSON
    * Parse the pronunciation assessment JSON silently — never mention "JSON"
    * If pronunciation is good: give brief praise in Chinese + move to next sentence
    * If issues detected: give ONE short correction, then let the user retry or move on

    ### Sentence Selection Strategy
    * **Echo-back (re-read)**: When PA shows mispronunciation or low fluency on a previous sentence, ask the user to retry that sentence
    * **New sentence**: Provide a new, progressively appropriate sentence when the user did well
    * Keep sentences short and natural (5–15 words)
    * Gradually increase difficulty as the user improves

    ## Tone and Language
    * **Friendly and Conversational**: 像朋友一样轻松自然
    * **Encouraging and Supportive**: 多鼓励，少批评
    * **Clear and Simple**: 指令清晰，不啰嗦
    * **Constructive**: 纠正时温和具体

    ## Input Format Awareness
    Each user turn may include:
    1. The user's spoken message
    2. A **pronunciation assessment result (JSON)** appended by the client
    You MUST:
    * Parse and understand the JSON data
    * Use it as **supporting signal** for feedback
    * Never mention "JSON" explicitly in your reply

    ## Pronunciation Feedback Integration
    #### When NO issues are detected
    * 给予简短中文表扬 + 提供下一个句子 + **调用 set_reference_text**
    * Example: "很棒！发音很标准。请跟我读：'She sells seashells by the seashore.'"
    #### When issues ARE detected
    * 用中文简要说明问题 + 给出英文发音提示 + 让用户重试或继续 + **调用 set_reference_text**
    * Focus on **1 key issue per turn**
    * Error types to watch for:
      * **Mispronunciation**: 用户读错了某个词的发音 → 给出正确发音提示
      * **Insertion (多读)**: 用户多读了原文中没有的词 → 提醒用户不要加多余的词，指出多读了哪个词
      * **Omission (漏读)**: 用户漏掉了原文中的某个词 → 提醒用户注意漏掉了哪个词，不要跳过
    * Examples:
      * Mispronunciation: "不错！注意 'vegetable' 读作 'VEJ-tuh-buhl'。再试一次：'I like vegetable soup.'"
      * Insertion: "注意不要多读哦，原文没有 'very' 这个词。再试一次：'I like vegetable soup.'"
      * Omission: "注意不要漏词哦，你漏掉了 'vegetable'。再试一次：'I like vegetable soup.'"

    ## Constraints (STRICTLY ENFORCED)
    * **Your coaching words: max 2 sentences, under 30 words — no exceptions**
    * Always include a clear target sentence for the user to read (prefixed with 请跟我读/再试一次/Try this)
    * **Always call \`set_reference_text\` tool when providing a read-along sentence**
    * Never output or reference raw JSON
    * Focus on 1 pronunciation issue max per turn
    * Keep target sentences between 5–15 words

    ## Example Behavior
    ### Case 1: First turn (greeting + first sentence)
    Response:
    > "你好！我们来练习英语发音吧。请跟我读：'I went to the park yesterday.'"
    Tool call: set_reference_text({ reference_text: "I went to the park yesterday." })

    ### Case 2: Good pronunciation
    User reads: "I went to the park yesterday." + (good PA JSON)
    Response:
    > "非常好！发音很自然。请跟我读：'The children were playing in the garden.'"
    Tool call: set_reference_text({ reference_text: "The children were playing in the garden." })

    ### Case 3: Mispronunciation detected
    User reads: "I like vege-table." + (PA shows mispronunciation)
    Response:
    > "不错！'vegetable' 读作 'VEJ-tuh-buhl'。再试一次：'I like vegetable soup.'"
    Tool call: set_reference_text({ reference_text: "I like vegetable soup." })

    ### Case 4: Monotone / Fluency issue
    Response:
    > "说得好！试着加点语调变化。再读一遍：'What a beautiful day it is!'"
    Tool call: set_reference_text({ reference_text: "What a beautiful day it is!" })

    ### Case 5: Insertion (多读了词)
    User should read: "I went to the park." but says "I went to the big park."
    Response:
    > "注意不要多读哦，原文没有 'big'。再试一次：'I went to the park.'"
    Tool call: set_reference_text({ reference_text: "I went to the park." })

    ### Case 6: Omission (漏读了词)
    User should read: "The children were playing." but says "The children playing."
    Response:
    > "注意不要漏词，你漏掉了 'were'。再试一次：'The children were playing.'"
    Tool call: set_reference_text({ reference_text: "The children were playing." })
  `;
  private audioTimeline = { totalBytes: 0 };
  
  constructor() {
    this.audioCapture = new SimpleAudioCapture();
  }

  setCallbacks(callbacks: VoiceAssistantCallbacks): void {
    this.callbacks = callbacks;
  }

  async connect(config: VoiceAssistantConfig): Promise<void> {
    try {
      this.enablePronunciationAssessment = config.enablePronunciationAssessment !== false;
      this.enableLatencyTracking = config.enableLatencyTracking === true;
      this.paWithReferenceText = config.paWithReferenceText !== false;

      this.callbacks?.onConnectionStatusChange('connecting');

      // Create appropriate credential based on configuration
      this.credential = this.createCredential(config);

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
      this.client = new VoiceLiveClient(config.endpoint, this.credential, {
        apiVersion: '2025-10-01',
        defaultSessionOptions: sessionOptions
      });

      // Create and connect a session with model
      this.session = await this.client.startSession('gpt-4.1', sessionOptions);
      
      // Setup handler-based event subscription (Azure SDK pattern)
      this.subscription = this.session.subscribe(this.createEventHandlers());

      // Configure session
      await this.configureSession(config);
      
      // Setup Speech config for PA (only when PA is enabled)
      if (this.enablePronunciationAssessment) {
        this.speechConfig = speechSDK.SpeechConfig.fromEndpoint(
          new URL(config.endpoint),
          this.credential
        );
        this.speechConfig.setProperty(
          speechSDK.PropertyId.Speech_SegmentationSilenceTimeoutMs,
          this.silenceTimeout.toString()
        );
        if (this.recognitionLanguage !== 'auto') {
          this.speechConfig.speechRecognitionLanguage = this.recognitionLanguage;
        }
      }
      
      this.isConnected = true;
      this.callbacks?.onConnectionStatusChange('connected');
      
      console.log('Connected to Voice Live service via session');
      
    } catch (error) {
      this.callbacks?.onConnectionStatusChange('disconnected');
      this.callbacks?.onError(`Connection failed: ${error}`);
      throw error;
    }
  }

  private createCredential(config: VoiceAssistantConfig): TokenCredential | KeyCredential {
    if (config.useTokenCredential) {
      // Use Azure Default Credential (for production scenarios)
      console.log('🔑 Using Azure Default Credential (token-based authentication)');
      return new MockDefaultAzureCredential();
    }
    // Use API Key (for development/simple scenarios)
    if (!config.apiKey) {
      throw new Error('API key is required when not using token credential');
    }
    console.log('🗝️ Using API Key authentication');
    return new AzureKeyCredential(config.apiKey);
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

      this.audioTimeline.totalBytes = 0;
      this.audioChunks = [];
      this.pendingTurnContexts = [];
      this.paStreamingActive = false;
      this.paStreamingPushStream = undefined;
      this.paStreamingWriteReady = Promise.resolve();

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

        // Create per-turn context with audio start timestamp for ALL modes.
        // This ensures each turn owns its own audio range and avoids cross-turn interference.
        this.activeTurnContext = { audioStartMillis: event.audioStartInMs };
        
        // Start streaming PA immediately for non-reference-text mode
        if (this.enablePronunciationAssessment && !this.paWithReferenceText) {
          // Record PA start time for latency tracking (streaming mode starts PA at speech start)
          if (this.enableLatencyTracking) {
            this.activeTurnContext.paStartTime = performance.now();
          }
          // Consume currentReferenceText (Read Along scenario) for this turn, then clear it
          const refText = this.currentReferenceText;
          this.currentReferenceText = undefined;
          console.log('📖 Reference text for read-along:', refText);
          this.startStreamingPA(this.activeTurnContext, refText);
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

        // Update the existing turn context with audio end timestamp and speech end time.
        // TurnContext was created at speechStarted — no need to overwrite it here.
        if (this.activeTurnContext) {
          this.activeTurnContext.audioEndMillis = event.audioEndInMs;
          if (this.enableLatencyTracking) {
            this.activeTurnContext.speechEndTime = performance.now();
          }
        }

        // Streaming PA mode: close the push stream
        if (this.paStreamingActive && this.paStreamingPushStream) {
          const stream = this.paStreamingPushStream;
          this.paStreamingWriteReady = this.paStreamingWriteReady.then(() => {
            stream.close();
          });
        }

        this.callbacks?.onEventReceived({
          type: 'speech.stopped',
          data: event,
          timestamp: new Date()
        });
      },

      onInputAudioBufferCommitted: async (event, context: SessionContext) => {
        // In streaming PA mode, audio is pushed directly to the recognizer
        if (this.paStreamingActive) return;

        // Extract and prepare audio for PA using per-turn timestamps
        if (this.enablePronunciationAssessment && this.activeTurnContext && !this.activeTurnContext.preparedAudio) {
          const { audioStartMillis, audioEndMillis } = this.activeTurnContext;
          if (audioStartMillis != null && audioEndMillis != null) {
            this.activeTurnContext.preparedAudio = this.extractAndPrepareAudio(audioStartMillis, audioEndMillis);
          }
        }

        // Enqueue the prepared turn context so that a subsequent turn's events
        // cannot interfere before transcriptionCompleted arrives (which is async).
        if (this.enablePronunciationAssessment && this.activeTurnContext) {
          this.pendingTurnContexts.push(this.activeTurnContext);
          this.activeTurnContext = undefined;
        }
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

        const userText = event.transcript || this.currentUserTranscription || '[Audio input]';
        const userMsgTimestamp = this.userSpeechStartTime || new Date();
        const userMsgId = `user_${Date.now()}`;
        // In paWithReferenceText mode, dequeue the prepared turn context (FIFO)
        // to correctly match audio data with its transcription, even when turns interleave.
        const turnCtx: TurnContext = (this.enablePronunciationAssessment && this.paWithReferenceText && this.pendingTurnContexts.length > 0)
          ? this.pendingTurnContexts.shift()!
          : (this.activeTurnContext || {});
        turnCtx.userText = userText;
        turnCtx.userMessageTimestamp = userMsgTimestamp;
        turnCtx.userMessageId = userMsgId;
        this.activeTurnContext = turnCtx;
        
        // Add the complete user transcription to conversation
        this.callbacks?.onConversationMessageUpdate({
          role: 'user',
          content: userText,
          timestamp: userMsgTimestamp,
          messageId: userMsgId,
          isStreaming: false
        });

        if (!this.enablePronunciationAssessment) {
          this.publishTurnMessage(turnCtx);

          // Save turn context for TTS first chunk latency tracking
          if (this.enableLatencyTracking) {
            this.pendingLatencyTurn = turnCtx;
          }

          this.session?.sendEvent({
            type: 'response.create'
          });

          // Reset transcription tracking
          this.currentUserTranscription = '';
          this.userSpeechStartTime = undefined;
          this.activeTurnContext = undefined;
          return;
        }

        if (this.enableLatencyTracking && !turnCtx.paStartTime) {
          turnCtx.paStartTime = performance.now();
        }
        const [isSuccess, paResult] = this.paWithReferenceText
          ? await this.runPAForTurn(turnCtx, event.transcript || this.currentUserTranscription || '', true)
          : await (turnCtx.paPromise || this.runPAForTurn(turnCtx, '', false));
        if (this.enableLatencyTracking) {
          turnCtx.paEndTime = performance.now();
        }
        console.log('📝 PA Result:', paResult);

        // Parse PA result and collect structured per-word info.
        // Avoid building any HTML string here — the UI layer renders DOM safely.
        if (isSuccess && paResult) {
          try {
            const paArr = JSON.parse(paResult);
            if (Array.isArray(paArr) && paArr.length > 0) {
              const nBest = paArr[0]?.NBest?.[0];
              const words: any[] = nBest?.Words || [];
              if (words.length > 0) {
                turnCtx.paWords = words.map((w: any): PaWord => ({
                  word: typeof w.Word === 'string' ? w.Word : String(w.Word ?? ''),
                  score: w.PronunciationAssessment?.AccuracyScore ?? 100,
                  errorType: w.PronunciationAssessment?.ErrorType || 'None'
                }));
              }
            }
          } catch (e) {
            console.warn('Failed to parse PA result for display:', e);
          }
        }
        
        this.publishTurnMessage(turnCtx);

        // Save turn context for TTS first chunk latency tracking
        if (this.enableLatencyTracking) {
          this.pendingLatencyTurn = turnCtx;
        }
        
        this.session?.sendEvent({
          type: 'response.create',
          additionalInstructions: `This is the pronunciation assessment result for above user speech: '${paResult}'`
        });

        this.currentUserTranscription = '';
        this.userSpeechStartTime = undefined;
        this.activeTurnContext = undefined;
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

        // Discard the corresponding queued turn context (if any)
        if (this.enablePronunciationAssessment && this.paWithReferenceText && this.pendingTurnContexts.length > 0) {
          this.pendingTurnContexts.shift();
        }

        // Reset transcription tracking
        this.currentUserTranscription = '';
        this.userSpeechStartTime = undefined;
        this.activeTurnContext = undefined;
      },

      onResponseAudioDelta: async (event, context: SessionContext) => {
        console.log('🔔 Audio Received:', event.delta?.byteLength, 'bytes');

        // Capture TTS first chunk time for latency tracking
        if (this.enableLatencyTracking && this.pendingLatencyTurn && event.delta && event.delta.byteLength > 0) {
          const turn = this.pendingLatencyTurn;
          turn.ttsFirstChunkTime = performance.now();
          this.pendingLatencyTurn = undefined;

          const latencyInfo = this.buildLatencyInfo(turn);
          if (turn.userMessageId) {
            this.callbacks?.onConversationMessageUpdate({
              role: 'user',
              content: turn.userText || '',
              timestamp: turn.userMessageTimestamp || new Date(),
              messageId: turn.userMessageId,
              isStreaming: false,
              paWords: turn.paWords,
              latencyInfo
            });
          }
        }
        
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

      // Handle function call completion (e.g., set_reference_text from Read Along scenario)
      onResponseFunctionCallArgumentsDone: async (event, context: SessionContext) => {
        if (event.name === 'set_reference_text') {
          try {
            const args = JSON.parse(event.arguments);
            const referenceText = args.reference_text;
            if (referenceText) {
              this.currentReferenceText = referenceText;

              this.callbacks?.onEventReceived({
                type: 'set_reference_text',
                data: { referenceText },
                timestamp: new Date()
              });
            }
          } catch (e) {
            console.warn('Failed to parse set_reference_text arguments:', e);
          }
        }

        // Must send function_call_output to close the function call in conversation context,
        // otherwise subsequent response.create calls may fail or behave unexpectedly.
        this.session?.sendEvent({
          type: 'conversation.item.create',
          item: {
            type: 'function_call_output',
            callId: event.callId,
            output: '{"success":true}'
          }
        });
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

      // When PA is enabled, let LLM speak first to initiate the conversation
      if (this.enablePronunciationAssessment) {
        this.session?.sendEvent({
          type: 'response.create',
          additionalInstructions: 'Greet the user warmly in 1–2 short sentences and invite them to start speaking English. Keep it brief and encouraging.'
        });
      }

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

  getScenarioInstructions(scenario: string): string {
    switch (scenario) {
      case 'concise':
        return this.predefinedInstructionsConcise;
      case 'readAlong':
        return this.predefinedInstructionsReadAlong;
      case 'conversation':
      default:
        return this.predefinedInstructions;
    }
  }

  private async configureSession(config: VoiceAssistantConfig): Promise<void> {
    if (!this.session) return;

    // Create proper voice object based on the voice name
    const voice = this.createVoiceObject(config.voice);

    const sessionConfig: any = {
      modalities: ['audio', 'text'],
      instructions: config.instructions,
      voice,
      inputAudioFormat: 'pcm16',
      outputAudioFormat: 'pcm16',
      inputAudioTranscription: this.enablePronunciationAssessment
        ? {
            // "azure-speech" | "mai-transcribe-1" | "gpt-4o-transcribe" | "gpt-4o-mini-transcribe" | "gpt-4o-transcribe-diarize"
            model: "azure-speech",
            // Language cannot be configured for mai-transcribe-1 model
            language: this.recognitionLanguage
          }
        : undefined,
      turnDetection: {
        type: 'server_vad',
        threshold: 0.5,
        prefixPaddingInMs: 1000,
        silenceDurationInMs: this.silenceTimeout,
        createResponse: false
      }
    };

    // Only register set_reference_text tool when PA is enabled and Read Along scenario is selected
    if (this.enablePronunciationAssessment && config.paScenario === 'readAlong') {
      sessionConfig.tools = [
        {
          type: 'function' as const,
          name: 'set_reference_text',
          description: 'Set the reference text (English sentence) for pronunciation assessment when leading read-along exercises. Call this every time you provide a sentence for the user to read aloud.',
          parameters: {
            type: 'object',
            properties: {
              reference_text: {
                type: 'string',
                description: 'The English sentence for the user to read aloud. Should contain only the sentence text without quotes or prefixes.'
              }
            },
            required: ['reference_text']
          }
        }
      ];
    }

    await this.session.updateSession(sessionConfig);
    console.log('Session configured successfully');
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
      // Only cache audio when pronunciation assessment is enabled
      if (this.enablePronunciationAssessment) {
        this.cacheAudioChunks(audioBytes);
      }
      await this.session.sendAudio(audioBytes);

      // Push to streaming PA if active
      if (this.paStreamingActive && this.paStreamingPushStream) {
        const stream = this.paStreamingPushStream;
        this.paStreamingWriteReady = this.paStreamingWriteReady.then(() => {
          if (audioBytes.byteLength > 0 && this.paStreamingActive) {
            stream.write(audioBytes.buffer.slice(audioBytes.byteOffset, audioBytes.byteOffset + audioBytes.byteLength));
          }
        });
      }
      
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
    for (const source of this.currentAudioSources) {
      try {
        source.stop();
      } catch {
        // Source might already be stopped, ignore the error
      }
    }
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

  private async runPAForTurn(
    turnCtx: TurnContext,
    referenceText: string,
    useReferenceText: boolean
  ): Promise<[boolean, string]> {
    const audio = turnCtx.preparedAudio;
    const result = await this.startPAWithStream(referenceText, audio, useReferenceText);
    turnCtx.preparedAudio = undefined;
    turnCtx.paPromise = undefined;
    return result;
  }

  /**
   * Start streaming PA: create push stream + recognizer at speech-start time,
   * push cached audio immediately and feed new chunks as they arrive.
   * The push stream is closed when speech stops.
   */
  private startStreamingPA(turnCtx: TurnContext, referenceText?: string): void {
    if (!this.speechConfig) {
      console.error('PA streaming: SpeechConfig not initialized');
      return;
    }

    const useRef = !!referenceText;
    if (useRef) {
      console.log('📖 Streaming PA with reference text:', referenceText);
    }

    // Create push stream with 24kHz PCM16 mono format (matching Voice Live input)
    const inputSampleRate = this.audioCapture.currentSampleRate || 24000;
    const pushStream = speechSDK.AudioInputStream.createPushStream(
      speechSDK.AudioStreamFormat.getWaveFormatPCM(inputSampleRate, 16, 1)
    );
    this.paStreamingPushStream = pushStream;
    this.paStreamingActive = true;
    this.paStreamingWriteReady = Promise.resolve();

    // Push already-cached audio (from audioStartMillis to now) first
    this.paStreamingWriteReady = this.pushCachedAudioToStream(pushStream, turnCtx.audioStartMillis!);

    // Set up recognizer
    const audioConfig = speechSDK.AudioConfig.fromStreamInput(pushStream);
    let reco: speechSDK.SpeechRecognizer;
    try {
      reco = new speechSDK.SpeechRecognizer(this.speechConfig, audioConfig);
    } catch (e) {
      console.error('Error setting up streaming PA recognizer:', e);
      this.paStreamingActive = false;
      this.paStreamingPushStream = undefined;
      return;
    }

    const paConfig = new speechSDK.PronunciationAssessmentConfig(
      useRef ? referenceText! : '',
      speechSDK.PronunciationAssessmentGradingSystem.HundredMark,
      speechSDK.PronunciationAssessmentGranularity.Phoneme,
      useRef
    );
    paConfig.enableProsodyAssessment = true;
    paConfig.applyTo(reco);

    const PAResults: string[] = [];

    turnCtx.paPromise = new Promise<[boolean, string]>((resolve) => {
      let finished = false;
      const safeResolve = (result: [boolean, string]) => {
        if (finished) return;
        finished = true;
        this.paStreamingActive = false;
        this.paStreamingPushStream = undefined;
        resolve(result);
      };

      reco.recognized = (_s, e) => {
        const json = e.result.properties.getProperty(
          speechSDK.PropertyId.SpeechServiceResponse_JsonResult
        );
        if (json) PAResults.push(json);
      };

      reco.sessionStopped = () => {
        reco.stopContinuousRecognitionAsync();
        reco.close();
        if (referenceText) {
          this.markErrorTypesByDiff(PAResults, referenceText);
        }
        safeResolve([true, `[${PAResults.join(',')}]`]);
      };

      reco.canceled = (_s, e) => {
        reco.stopContinuousRecognitionAsync();
        reco.close();
        if (e.errorCode !== speechSDK.CancellationErrorCode.NoError) {
          console.error(`PA streaming canceled: ${e.errorDetails}`);
          safeResolve([false, '']);
        } else {
          // EndOfStream or other non-error cancellation — resolve with partial results
          if (referenceText) {
            this.markErrorTypesByDiff(PAResults, referenceText);
          }
          safeResolve([true, `[${PAResults.join(',')}]`]);
        }
      };

      reco.startContinuousRecognitionAsync();
    });
  }

  /**
   * Push cached audio chunks (from audioStartMillis to current position)
   * to the streaming PA push stream.
   */
  private async pushCachedAudioToStream(pushStream: speechSDK.PushAudioInputStream, audioStartMillis: number): Promise<void> {
    const bytesPerMs = (this.audioCapture.currentSampleRate || 24000) * 2 / 1000;
    const startByte = Math.floor(audioStartMillis * bytesPerMs);

    for (const c of this.audioChunks) {
      if (c.endByte <= startByte) continue;
      const sliceStart = Math.max(startByte, c.startByte) - c.startByte;
      const chunk = c.bytes.slice(sliceStart);
      if (chunk.byteLength > 0) {
        pushStream.write(chunk.buffer.slice(chunk.byteOffset, chunk.byteOffset + chunk.byteLength));
      }
    }
  }

  private startPAWithStream(referenceText: string, audioChunksToAssess: ArrayBuffer | undefined, useReferenceText: boolean): Promise<[boolean, string]> {
    return new Promise((resolve) => {
      let finished = false;
      const safeResolve = (result: [boolean, string]) => {
        if (finished) return;
        finished = true;
        resolve(result);
      };

      if (!this.speechConfig) {
        console.error('Pronunciation assessment failed: SpeechConfig not initialized.');
        this.callbacks?.onConversationMessageUpdate({
          role: 'error',
          content: 'Pronunciation assessment failed: SpeechConfig not initialized.',
          timestamp: new Date(),
          isStreaming: false
        });
        safeResolve([false, '']);
        return;
      }
      
      if (!audioChunksToAssess || audioChunksToAssess.byteLength === 0) {
        console.warn('No audio chunks available for pronunciation assessment.');
        this.callbacks?.onConversationMessageUpdate({
          role: 'error',
          content: 'No audio chunks available for pronunciation assessment.',
          timestamp: new Date(),
          isStreaming: false
        });
        safeResolve([false, '']);
        return;
      }

      const inputSampleRate = this.audioCapture.currentSampleRate || 24000;
      const pushStream = speechSDK.AudioInputStream.createPushStream(
        speechSDK.AudioStreamFormat.getWaveFormatPCM(inputSampleRate, 16, 1)
      );
      pushStream.write(audioChunksToAssess);
      pushStream.close();

      const audioConfig = speechSDK.AudioConfig.fromStreamInput(pushStream);
      
      let reco: speechSDK.SpeechRecognizer;
      try {
        reco = new speechSDK.SpeechRecognizer(this.speechConfig, audioConfig);
      } catch (e) {
        const msg = 'Error setting up pronunciation assessment:' + e;
        console.error(msg);
        this.callbacks?.onConversationMessageUpdate({
          role: 'error',
          content: msg,
          timestamp: new Date(),
          isStreaming: false
        });
        safeResolve([false, '']);
        return;
      }

      const paConfig = new speechSDK.PronunciationAssessmentConfig(
        useReferenceText ? referenceText : '',
        speechSDK.PronunciationAssessmentGradingSystem.HundredMark,
        speechSDK.PronunciationAssessmentGranularity.Phoneme,
        useReferenceText
      );
      paConfig.enableProsodyAssessment = true;
      paConfig.applyTo(reco);

      const PAResults: string[] = [];

      reco.recognized = (_s, e) => {
        const json = e.result.properties.getProperty(
            speechSDK.PropertyId.SpeechServiceResponse_JsonResult
          );
        if (json) {
          PAResults.push(json);
        }
      };

      reco.sessionStopped = () => {
        reco.stopContinuousRecognitionAsync();
        reco.close();
        if (useReferenceText && referenceText) {
          this.markErrorTypesByDiff(PAResults, referenceText);
        }
        safeResolve([true, `[${PAResults.join(',')}]`]);
      };

      reco.canceled = (_s, e) => {
        reco.stopContinuousRecognitionAsync();
        reco.close();
        if (e.errorCode !== speechSDK.CancellationErrorCode.NoError) {
          console.error(`PA Canceled: ${e.errorDetails}`);
          safeResolve([false, '']);
        } else {
          // EndOfStream or other non-error cancellation — resolve with partial results
          if (useReferenceText && referenceText) {
            this.markErrorTypesByDiff(PAResults, referenceText);
          }
          safeResolve([true, `[${PAResults.join(',')}]`]);
        }
      };

      reco.startContinuousRecognitionAsync();
    });
  }

  private cacheAudioChunks(chunk: Uint8Array): void {
    // Caching is guarded by enablePronunciationAssessment at the call site (sendAudioData).
    // Old chunks are trimmed by extractAndPrepareAudio after each turn.
    const start = this.audioTimeline.totalBytes;
    const end = start + chunk.byteLength;

    this.audioChunks.push({
      bytes: chunk,
      startByte: start,
      endByte: end,
    });

    this.audioTimeline.totalBytes = end;
  }

  /**
   * Extract audio from the shared chunk cache for the given time range,
   * merge into a single ArrayBuffer, and trim old chunks.
   * Combines the old extractValidAudio + preparePAAudio into one step,
   * eliminating the intermediate audioChunksToAssess buffer.
   */
  private extractAndPrepareAudio(startMillis: number, endMillis: number): ArrayBuffer | undefined {
    if (endMillis < startMillis) {
      console.warn('Invalid audio timestamps for extraction.');
      return undefined;
    }

    const bytesPerMs = this.audioCapture.currentSampleRate! * 2 / 1000;
    const startByte = Math.floor(startMillis * bytesPerMs);
    const endByte   = Math.ceil(endMillis * bytesPerMs);

    const slices: Uint8Array[] = [];
    let totalBytes = 0;

    for (const c of this.audioChunks) {
      if (c.endByte <= startByte) continue;
      if (c.startByte >= endByte) break;

      const sliceStart = Math.max(startByte, c.startByte) - c.startByte;
      const sliceEnd   = Math.min(endByte, c.endByte) - c.startByte;
      const slice = c.bytes.slice(sliceStart, sliceEnd);
      slices.push(slice);
      totalBytes += slice.byteLength;
    }

    // Trim chunks that are fully before this extraction range
    this.audioChunks = this.audioChunks.filter(c => c.endByte > endByte);

    if (totalBytes === 0) return undefined;

    const buffer = new ArrayBuffer(totalBytes);
    const view = new Uint8Array(buffer);
    let offset = 0;
    for (const s of slices) {
      view.set(s, offset);
      offset += s.byteLength;
    }
    return buffer;
  }

  /**
   * Use SequenceMatcher to compare reference words with recognized words,
   * and mark error types: Insertion (extra words spoken) and Omission (words missed).
   */
  private markErrorTypesByDiff(PAResults: string[], referenceText: string): void {
    if (!referenceText || PAResults.length === 0) return;

    const referenceWords = referenceText.trim().split(/\s+/).filter(w => w.length > 0);
    if (referenceWords.length === 0) return;

    const normalize = (w: string) => w.toLowerCase().replace(/[^\w]/g, '');
    const refWordsNorm = referenceWords.map(normalize);

    // Collect all recognized words across all PA result segments
    const parsedResults: any[] = [];
    const allRecognizedWords: any[] = [];

    for (const json of PAResults) {
      try {
        const result = JSON.parse(json);
        parsedResults.push(result);
        const words = result?.NBest?.[0]?.Words || [];
        allRecognizedWords.push(...words);
      } catch {
        parsedResults.push(null);
      }
    }

    if (
      referenceWords.length > this.maxDiffWordCount ||
      allRecognizedWords.length > this.maxDiffWordCount
    ) {
      console.warn(
        `Skipping pronunciation diff: word count exceeds limit (${this.maxDiffWordCount}).`,
      );
      return;
    }

    if (allRecognizedWords.length === 0 && refWordsNorm.length > 0) {
      // All reference words are omissions
      const omissionWords = referenceWords.map(w => ({
        Word: w,
        PronunciationAssessment: { AccuracyScore: 0, ErrorType: 'Omission' }
      }));
      if (parsedResults[0]?.NBest?.[0]) {
        parsedResults[0].NBest[0].Words = omissionWords;
        PAResults[0] = JSON.stringify(parsedResults[0]);
      }
      return;
    }

    const recoWordsNorm = allRecognizedWords.map((w: any) => normalize(w.Word));

    const opcodes = this.diffOpcodes(refWordsNorm, recoWordsNorm);

    const newWords: any[] = [];
    for (const [tag, i1, i2, j1, j2] of opcodes) {
      switch (tag) {
        case 'equal':
          for (let j = j1; j < j2; j++) {
            newWords.push(allRecognizedWords[j]);
          }
          break;
        case 'delete':
          // Reference words not spoken → Omission
          for (let ri = i1; ri < i2; ri++) {
            newWords.push({
              Word: referenceWords[ri],
              PronunciationAssessment: { AccuracyScore: 0, ErrorType: 'Omission' }
            });
          }
          break;
        case 'insert':
          // Recognized words not in reference → Insertion
          for (let j = j1; j < j2; j++) {
            const w = { ...allRecognizedWords[j] };
            w.PronunciationAssessment = { ...w.PronunciationAssessment, ErrorType: 'Insertion' };
            newWords.push(w);
          }
          break;
        case 'replace':
          // Reference words → Omission
          for (let ri = i1; ri < i2; ri++) {
            newWords.push({
              Word: referenceWords[ri],
              PronunciationAssessment: { AccuracyScore: 0, ErrorType: 'Omission' }
            });
          }
          // Recognized words → Insertion
          for (let j = j1; j < j2; j++) {
            const w = { ...allRecognizedWords[j] };
            w.PronunciationAssessment = { ...w.PronunciationAssessment, ErrorType: 'Insertion' };
            newWords.push(w);
          }
          break;
      }
    }

    // Merge all words into the first PA result
    if (parsedResults[0]?.NBest?.[0]) {
      parsedResults[0].NBest[0].Words = newWords;
      PAResults.length = 0;
      PAResults.push(JSON.stringify(parsedResults[0]));
    }
  }

  /**
   * Compute diff opcodes (like Python's difflib.SequenceMatcher.get_opcodes)
   * using LCS (Longest Common Subsequence) dynamic programming.
   * Returns an array of [tag, i1, i2, j1, j2] tuples.
   */
  private diffOpcodes(a: string[], b: string[]): [string, number, number, number, number][] {
    const m = a.length;
    const n = b.length;

    // Build LCS table
    const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        dp[i][j] = a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1] + 1
          : Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }

    // Backtrack to find matching pairs
    const matches: [number, number][] = [];
    let i = m, j = n;
    while (i > 0 && j > 0) {
      if (a[i - 1] === b[j - 1]) {
        matches.push([i - 1, j - 1]);
        i--;
        j--;
      } else if (dp[i - 1][j] >= dp[i][j - 1]) {
        i--;
      } else {
        j--;
      }
    }
    matches.reverse();

    // Convert matching pairs into opcodes
    const opcodes: [string, number, number, number, number][] = [];
    let ai = 0, bj = 0;

    for (const [mi, mj] of matches) {
      if (ai < mi || bj < mj) {
        if (ai < mi && bj < mj) {
          opcodes.push(['replace', ai, mi, bj, mj]);
        } else if (ai < mi) {
          opcodes.push(['delete', ai, mi, bj, bj]);
        } else {
          opcodes.push(['insert', ai, ai, bj, mj]);
        }
      }
      opcodes.push(['equal', mi, mi + 1, mj, mj + 1]);
      ai = mi + 1;
      bj = mj + 1;
    }

    if (ai < m || bj < n) {
      if (ai < m && bj < n) {
        opcodes.push(['replace', ai, m, bj, n]);
      } else if (ai < m) {
        opcodes.push(['delete', ai, m, bj, bj]);
      } else {
        opcodes.push(['insert', ai, ai, bj, n]);
      }
    }

    return opcodes;
  }

  private publishTurnMessage(ctx: TurnContext): void {
    if (!ctx.userMessageId || !ctx.userText || !ctx.userMessageTimestamp) {
      return;
    }
    const latencyInfo = this.enableLatencyTracking ? this.buildLatencyInfo(ctx) : undefined;
    this.callbacks?.onConversationMessageUpdate({
      role: 'user',
      content: ctx.userText,
      timestamp: ctx.userMessageTimestamp,
      messageId: ctx.userMessageId,
      isStreaming: false,
      paWords: ctx.paWords,
      latencyInfo
    });
  }

  /**
   * Build latency info from a completed TurnContext.
   */
  private buildLatencyInfo(turn: TurnContext): LatencyInfo | undefined {
    if (!this.enableLatencyTracking) return undefined;
    const s = turn.speechEndTime ?? null;
    const paStart = turn.paStartTime ?? null;
    const paEnd = turn.paEndTime ?? null;
    const tts = turn.ttsFirstChunkTime ?? null;
    return {
      speechEndToPaStart: s && paStart ? paStart - s : null,
      paStartToPaEnd: paStart && paEnd ? paEnd - paStart : null,
      paEndToTtsFirstChunk: paEnd && tts ? tts - paEnd : null,
      speechEndToTtsFirstChunk: s && tts ? tts - s : null
    };
  }
}
