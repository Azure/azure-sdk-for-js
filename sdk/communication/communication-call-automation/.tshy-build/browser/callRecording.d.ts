import type { CallAutomationApiClientOptionalParams } from "./generated/src/models/index.js";
import type { RecordingStateResult } from "./models/responses.js";
import type { StartRecordingOptions, StopRecordingOptions, PauseRecordingOptions, GetRecordingPropertiesOptions, ResumeRecordingOptions, DeleteRecordingOptions, DownloadRecordingOptions } from "./models/options.js";
import type { KeyCredential, TokenCredential } from "@azure/core-auth";
/**
 * CallRecording class represents call recording related APIs.
 */
export declare class CallRecording {
    private readonly callRecordingImpl;
    private readonly contentDownloader;
    private readonly callAutomationApiClient;
    constructor(endpoint: string, credential: KeyCredential | TokenCredential, options?: CallAutomationApiClientOptionalParams);
    /**
     * Starts a call recording with the specified options.
     * @param startCallRecordingRequest - options to start the call recording
     * @param options - Operation options.
     */
    start(options: StartRecordingOptions): Promise<RecordingStateResult>;
    /**
     * Returns call recording properties.
     * @param recordingId - The recordingId associated with the recording.
     * @param options - Additional request options contains getRecordingProperties api options.
     */
    getState(recordingId: string, options?: GetRecordingPropertiesOptions): Promise<RecordingStateResult>;
    /**
     * Stops a call recording.
     * @param recordingId - The recordingId associated with the recording.
     * @param options - Additional request options contains stopRecording api options.
     */
    stop(recordingId: string, options?: StopRecordingOptions): Promise<void>;
    /**
     * Pauses a call recording.
     * @param recordingId - The recordingId associated with the recording.
     * @param options - Additional request options contains pauseRecording api options.
     */
    pause(recordingId: string, options?: PauseRecordingOptions): Promise<void>;
    /**
     * Resumes a call recording.
     * @param recordingId - The recordingId associated with the recording.
     * @param options - Additional request options contains resumeRecording api options.
     */
    resume(recordingId: string, options?: ResumeRecordingOptions): Promise<void>;
    /**
     * Deletes a recording.
     * @param recordingLocationUrl - The recording location url. Required.
     * @param options - Additional request options contains deleteRecording api options.
     */
    delete(recordingLocationUrl: string, options?: DeleteRecordingOptions): Promise<void>;
    /**
     * Returns a stream with a call recording.
     * @param sourceLocationUrl - The source location url. Required.
     * @param options - Additional request options contains downloadRecording api options.
     */
    downloadStreaming(sourceLocationUrl: string, options?: DownloadRecordingOptions): Promise<NodeJS.ReadableStream>;
    /**
     * Downloads a call recording file to the specified stream.
     * @param sourceLocationUrl - The source location url. Required.
     * @param destinationStream - The destination stream. Required.
     * @param options - Additional request options contains downloadRecording api options.
     */
    downloadToStream(sourceLocationUrl: string, destinationStream: NodeJS.WritableStream, options?: DownloadRecordingOptions): Promise<void>;
    /**
     * Downloads a call recording file to the specified path.
     * @param sourceLocationUrl - The source location url. Required.
     * @param destinationPath - The destination path. Required.
     * @param options - Additional request options contains downloadRecording api options.
     */
    downloadToPath(sourceLocationUrl: string, destinationPath: string, options?: DownloadRecordingOptions): Promise<void>;
}
//# sourceMappingURL=callRecording.d.ts.map