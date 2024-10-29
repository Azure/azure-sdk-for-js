import { Transcription } from "openai/resources/audio/transcriptions.mjs";

export type AudioResultFormat = "json" | "verbose_json" | "text" | "srt" | "vtt";

/** Audio transcription task type */
/** "transcribe", "translate" */
export type AudioTranscriptionTask = string;

/** Transcription response. */
export interface AudioResultVerboseJson extends Transcription {
  /** Audio transcription task. */
  task: AudioTranscriptionTask;
  /** Language detected in the source audio file. */
  language: string;
  /** Duration. */
  duration: number;
  /** Segments. */
  segments: AudioSegment[];
}

/** Transcription segment. */
export interface AudioSegment {
  /** Segment identifier. */
  id: number;
  /** Segment start offset. */
  start: number;
  /** Segment end offset. */
  end: number;
  /** Segment text. */
  text: string;
  /** Temperature. */
  temperature: number;
  /** Average log probability. */
  avg_logprob: number;
  /** Compression ratio. */
  compression_ratio: number;
  /** Probability of 'no speech'. */
  no_speech_prob: number;
  /** Tokens in this segment */
  tokens: number[];
  /** Seek offset of the segment */
  seek: number;
}
