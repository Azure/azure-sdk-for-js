// Simple audio capture using Web Audio API for Voice Live sample
export interface AudioCaptureOptions {
  sampleRate: number;
  channelCount: number;
}

export interface AudioLevelCallback {
  (level: number): void;
}

export interface AudioDataCallback {
  (audioData: ArrayBuffer): void;
}

export class SimpleAudioCapture {
  private audioContext?: AudioContext;
  private mediaStream?: MediaStream;
  private analyserNode?: AnalyserNode;
  private scriptProcessor?: ScriptProcessorNode;
  private isCapturing = false;
  private levelCallback?: AudioLevelCallback;
  private dataCallback?: AudioDataCallback;

  // Voice Live requires 24kHz PCM16 mono
  private readonly targetSampleRate = 24000;
  private readonly targetChannels = 1;

  constructor() {
    // Initialize will be called when user activates
  }

  async initialize(): Promise<void> {
    try {
      // Request microphone access
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: this.targetChannels,
          sampleRate: this.targetSampleRate,
          echoCancellation: true,
          noiseSuppression: true
        }
      });

      // Create audio context
      this.audioContext = new AudioContext({ sampleRate: this.targetSampleRate });
      
      // Create nodes
      const source = this.audioContext.createMediaStreamSource(this.mediaStream);
      this.analyserNode = this.audioContext.createAnalyser();
      this.analyserNode.fftSize = 256;
      
      // Create script processor for audio data
      this.scriptProcessor = this.audioContext.createScriptProcessor(4096, 1, 1);
      
      // Connect the nodes
      source.connect(this.analyserNode);
      this.analyserNode.connect(this.scriptProcessor);
      this.scriptProcessor.connect(this.audioContext.destination);
      
      // Setup audio processing
      this.scriptProcessor.onaudioprocess = (event) => {
        if (!this.isCapturing) return;
        
        const inputBuffer = event.inputBuffer;
        const inputData = inputBuffer.getChannelData(0);
        
        // Calculate audio level for visualization
        this.updateAudioLevel(inputData);
        
        // Convert to the format needed by Voice Live (PCM16)
        const pcm16Data = this.convertToPCM16(inputData);
        
        // Send audio data
        if (this.dataCallback) {
          // Ensure we have an ArrayBuffer, not SharedArrayBuffer
          let buffer: ArrayBuffer;
          if (pcm16Data.buffer instanceof ArrayBuffer) {
            buffer = pcm16Data.buffer.slice(pcm16Data.byteOffset, pcm16Data.byteOffset + pcm16Data.byteLength);
          } else {
            // Convert SharedArrayBuffer to ArrayBuffer
            const tempArray = new Uint8Array(pcm16Data);
            buffer = tempArray.buffer.slice(tempArray.byteOffset, tempArray.byteOffset + tempArray.byteLength);
          }
          this.dataCallback(buffer);
        }
      };

      console.log('Audio capture initialized successfully');
    } catch (error) {
      console.error('Failed to initialize audio capture:', error);
      throw error;
    }
  }

  startCapture(
    levelCallback?: AudioLevelCallback,
    dataCallback?: AudioDataCallback
  ): void {
    if (!this.audioContext || !this.scriptProcessor) {
      throw new Error('Audio capture not initialized');
    }

    this.levelCallback = levelCallback;
    this.dataCallback = dataCallback;
    this.isCapturing = true;
    
    // Resume audio context if suspended
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    
    console.log('Audio capture started');
  }

  stopCapture(): void {
    this.isCapturing = false;
    this.levelCallback = undefined;
    this.dataCallback = undefined;
    console.log('Audio capture stopped');
  }

  cleanup(): void {
    this.stopCapture();
    
    if (this.scriptProcessor) {
      this.scriptProcessor.disconnect();
      this.scriptProcessor = undefined;
    }
    
    if (this.analyserNode) {
      this.analyserNode.disconnect();
      this.analyserNode = undefined;
    }
    
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = undefined;
    }
    
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = undefined;
    }
    
    console.log('Audio capture cleaned up');
  }

  private updateAudioLevel(audioData: Float32Array): void {
    if (!this.levelCallback) return;
    
    // Calculate RMS level
    let sum = 0;
    for (let i = 0; i < audioData.length; i++) {
      sum += audioData[i] * audioData[i];
    }
    const rms = Math.sqrt(sum / audioData.length);
    
    // Convert to percentage and smooth
    const level = Math.min(100, rms * 100 * 5); // Amplify for better visualization
    this.levelCallback(level);
  }

  private convertToPCM16(floatData: Float32Array): Int16Array {
    const pcm16 = new Int16Array(floatData.length);
    
    for (let i = 0; i < floatData.length; i++) {
      // Convert float (-1 to 1) to int16 (-32768 to 32767)
      const sample = Math.max(-1, Math.min(1, floatData[i]));
      pcm16[i] = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
    }
    
    return pcm16;
  }

  get isInitialized(): boolean {
    return !!this.audioContext && !!this.mediaStream;
  }

  get isActive(): boolean {
    return this.isCapturing;
  }
}