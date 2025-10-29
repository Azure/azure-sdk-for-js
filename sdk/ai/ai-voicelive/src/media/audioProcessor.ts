// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export interface AudioFormat {
  sampleRate: number;
  channels: number;
  bitDepth: number;
  encoding: 'pcm' | 'opus' | 'aac';
}

export interface AudioChunk {
  data: ArrayBuffer;
  format: AudioFormat;
  timestamp: number;
  duration: number;
}

export interface AudioProcessingOptions {
  /** Target audio format */
  targetFormat?: AudioFormat;
  /** Enable noise reduction */
  noiseReduction?: boolean;
  /** Enable echo cancellation */
  echoCancellation?: boolean;
  /** Audio gain adjustment */
  gain?: number;
}

/**
 * Handles audio processing for Voice Live including format conversion and audio enhancements
 */
export class AudioProcessor {
  private readonly _defaultFormat: AudioFormat = {
    sampleRate: 24000,
    channels: 1,
    bitDepth: 16,
    encoding: 'pcm'
  };

  /**
   * Process incoming audio data
   */
  processIncomingAudio(
    data: ArrayBuffer, 
    format: AudioFormat,
    options: AudioProcessingOptions = {}
  ): AudioChunk {
    let processedData = data;

    // Apply audio processing
    if (options.noiseReduction) {
      processedData = this._applyNoiseReduction(processedData, format);
    }

    if (options.echoCancellation) {
      processedData = this._applyEchoCancellation(processedData, format);
    }

    if (options.gain && options.gain !== 1.0) {
      processedData = this._applyGain(processedData, format, options.gain);
    }

    // Convert format if needed
    if (options.targetFormat && !this._formatsEqual(format, options.targetFormat)) {
      const converted = this._convertAudioFormat(processedData, format, options.targetFormat);
      return {
        data: converted.data,
        format: converted.format,
        timestamp: Date.now(),
        duration: this._calculateDuration(converted.data, converted.format)
      };
    }

    return {
      data: processedData,
      format,
      timestamp: Date.now(),
      duration: this._calculateDuration(processedData, format)
    };
  }

  /**
   * Convert audio to base64 for transmission
   */
  audioToBase64(chunk: AudioChunk): string {
    const bytes = new Uint8Array(chunk.data);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  /**
   * Convert base64 to audio chunk
   */
  base64ToAudio(base64: string, format: AudioFormat): AudioChunk {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    return {
      data: bytes.buffer,
      format,
      timestamp: Date.now(),
      duration: this._calculateDuration(bytes.buffer, format)
    };
  }

  /**
   * Get the default audio format for Voice Live
   */
  get defaultFormat(): AudioFormat {
    return { ...this._defaultFormat };
  }

  private _applyNoiseReduction(data: ArrayBuffer, _format: AudioFormat): ArrayBuffer {
    // Placeholder for noise reduction algorithm
    // In practice, this would use WebAudio API or audio processing libraries
    return data;
  }

  private _applyEchoCancellation(data: ArrayBuffer, _format: AudioFormat): ArrayBuffer {
    // Placeholder for echo cancellation
    return data;
  }

  private _applyGain(data: ArrayBuffer, format: AudioFormat, gain: number): ArrayBuffer {
    if (format.encoding !== 'pcm') {
      return data; // Can only apply gain to PCM data directly
    }

    const view = new Int16Array(data);
    const processed = new Int16Array(view.length);
    
    for (let i = 0; i < view.length; i++) {
      processed[i] = Math.max(-32768, Math.min(32767, view[i] * gain));
    }
    
    return processed.buffer;
  }

  private _convertAudioFormat(
    data: ArrayBuffer, 
    _fromFormat: AudioFormat, 
    toFormat: AudioFormat
  ): { data: ArrayBuffer; format: AudioFormat } {
    // Placeholder for audio format conversion
    // In practice, this would use audio encoding/decoding libraries
    return { data, format: toFormat };
  }

  private _formatsEqual(a: AudioFormat, b: AudioFormat): boolean {
    return a.sampleRate === b.sampleRate &&
           a.channels === b.channels &&
           a.bitDepth === b.bitDepth &&
           a.encoding === b.encoding;
  }

  private _calculateDuration(data: ArrayBuffer, format: AudioFormat): number {
    const bytesPerSample = format.bitDepth / 8;
    const totalSamples = data.byteLength / (bytesPerSample * format.channels);
    return totalSamples / format.sampleRate * 1000; // Duration in milliseconds
  }
}