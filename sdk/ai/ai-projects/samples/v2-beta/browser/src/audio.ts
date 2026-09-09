// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const targetSampleRate = 24_000;

export class MicrophoneCapture {
  private context?: AudioContext;
  private stream?: MediaStream;
  private processor?: ScriptProcessorNode;
  private source?: MediaStreamAudioSourceNode;
  private silentOutput?: GainNode;

  public async start(
    onAudio: (audio: Uint8Array) => void,
    onLevel: (level: number) => void,
  ): Promise<void> {
    if (this.processor) {
      return;
    }

    this.stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        channelCount: 1,
        sampleRate: targetSampleRate,
        echoCancellation: true,
        noiseSuppression: true,
      },
    });
    this.context = createCaptureAudioContext();
    await this.context.resume();
    this.source = this.context.createMediaStreamSource(this.stream);
    this.processor = this.context.createScriptProcessor(4096, 1, 1);
    this.silentOutput = this.context.createGain();
    this.silentOutput.gain.value = 0;

    this.processor.onaudioprocess = (event) => {
      const input = event.inputBuffer.getChannelData(0);
      onLevel(calculateLevel(input));
      const resampled = resample(input, this.context!.sampleRate, targetSampleRate);
      onAudio(toPcm16(resampled));
    };

    this.source.connect(this.processor);
    this.processor.connect(this.silentOutput);
    this.silentOutput.connect(this.context.destination);
  }

  public async stop(): Promise<void> {
    this.processor?.disconnect();
    this.source?.disconnect();
    this.silentOutput?.disconnect();
    this.stream?.getTracks().forEach((track) => track.stop());
    await this.context?.close();
    this.processor = undefined;
    this.source = undefined;
    this.silentOutput = undefined;
    this.stream = undefined;
    this.context = undefined;
  }

  public get active(): boolean {
    return this.processor !== undefined;
  }
}

export class PcmAudioPlayer {
  private context?: AudioContext;
  private currentSource?: AudioBufferSourceNode;
  private readonly queue: AudioBuffer[] = [];

  public constructor(private sampleRate = targetSampleRate) {}

  public setSampleRate(sampleRate: number): void {
    this.sampleRate = sampleRate;
  }

  public async enqueue(bytes: Uint8Array): Promise<void> {
    if (bytes.byteLength < 2) {
      return;
    }
    this.context ??= new AudioContext();
    await this.context.resume();
    const samples = pcm16ToFloat(bytes);
    const audioBuffer = this.context.createBuffer(1, samples.length, this.sampleRate);
    audioBuffer.copyToChannel(samples, 0);
    this.queue.push(audioBuffer);
    this.playNext();
  }

  private playNext(): void {
    if (!this.context || this.currentSource || this.queue.length === 0) {
      return;
    }

    const audioBuffer = this.queue.shift()!;
    const source = this.context.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(this.context.destination);
    this.currentSource = source;
    source.addEventListener(
      "ended",
      () => {
        if (this.currentSource !== source) {
          return;
        }
        this.currentSource = undefined;
        this.playNext();
      },
      { once: true },
    );
    source.start();
  }

  public stop(): void {
    this.queue.length = 0;
    const source = this.currentSource;
    this.currentSource = undefined;
    if (source) {
      try {
        source.stop();
      } catch {
        // The source may already have ended.
      }
    }
  }

  public async dispose(): Promise<void> {
    this.stop();
    await this.context?.close();
    this.context = undefined;
  }
}

function createCaptureAudioContext(): AudioContext {
  try {
    return new AudioContext({ sampleRate: targetSampleRate });
  } catch {
    return new AudioContext();
  }
}

function calculateLevel(samples: Float32Array): number {
  let sum = 0;
  for (const sample of samples) {
    sum += sample * sample;
  }
  return Math.min(1, Math.sqrt(sum / samples.length) * 4);
}

function resample(input: Float32Array, sourceRate: number, destinationRate: number): Float32Array {
  if (sourceRate === destinationRate) {
    return input.slice();
  }
  const ratio = sourceRate / destinationRate;
  const output = new Float32Array(Math.round(input.length / ratio));
  for (let index = 0; index < output.length; index++) {
    const sourceIndex = index * ratio;
    const lower = Math.floor(sourceIndex);
    const upper = Math.min(lower + 1, input.length - 1);
    const weight = sourceIndex - lower;
    output[index] = input[lower] * (1 - weight) + input[upper] * weight;
  }
  return output;
}

function toPcm16(samples: Float32Array): Uint8Array {
  const output = new Uint8Array(samples.length * 2);
  const view = new DataView(output.buffer);
  for (let index = 0; index < samples.length; index++) {
    const sample = Math.max(-1, Math.min(1, samples[index]));
    view.setInt16(index * 2, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
  }
  return output;
}

function pcm16ToFloat(bytes: Uint8Array): Float32Array<ArrayBuffer> {
  const sampleCount = Math.floor(bytes.byteLength / 2);
  const samples = new Float32Array(sampleCount);
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  for (let index = 0; index < sampleCount; index++) {
    samples[index] = view.getInt16(index * 2, true) / 0x8000;
  }
  return samples;
}
