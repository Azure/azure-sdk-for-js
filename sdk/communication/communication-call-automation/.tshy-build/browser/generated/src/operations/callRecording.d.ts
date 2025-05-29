import { CallRecording } from "../operationsInterfaces/index.js";
import { CallAutomationApiClient } from "../callAutomationApiClient.js";
import { StartCallRecordingRequest, CallRecordingStartRecordingOptionalParams, CallRecordingStartRecordingResponse, CallRecordingGetRecordingPropertiesOptionalParams, CallRecordingGetRecordingPropertiesResponse, CallRecordingStopRecordingOptionalParams, CallRecordingPauseRecordingOptionalParams, CallRecordingResumeRecordingOptionalParams, CallRecordingGetRecordingResultOptionalParams, CallRecordingGetRecordingResultResponse } from "../models/index.js";
/** Class containing CallRecording operations. */
export declare class CallRecordingImpl implements CallRecording {
    private readonly client;
    /**
     * Initialize a new instance of the class CallRecording class.
     * @param client Reference to the service client
     */
    constructor(client: CallAutomationApiClient);
    /**
     * Start recording the call.
     * @param startCallRecording The request body of start call recording request.
     * @param options The options parameters.
     */
    startRecording(startCallRecording: StartCallRecordingRequest, options?: CallRecordingStartRecordingOptionalParams): Promise<CallRecordingStartRecordingResponse>;
    /**
     * Get call recording properties.
     * @param recordingId The recording id.
     * @param options The options parameters.
     */
    getRecordingProperties(recordingId: string, options?: CallRecordingGetRecordingPropertiesOptionalParams): Promise<CallRecordingGetRecordingPropertiesResponse>;
    /**
     * Stop recording the call.
     * @param recordingId The recording id.
     * @param options The options parameters.
     */
    stopRecording(recordingId: string, options?: CallRecordingStopRecordingOptionalParams): Promise<void>;
    /**
     * Pause recording the call.
     * @param recordingId The recording id.
     * @param options The options parameters.
     */
    pauseRecording(recordingId: string, options?: CallRecordingPauseRecordingOptionalParams): Promise<void>;
    /**
     * Resume recording the call.
     * @param recordingId The recording id.
     * @param options The options parameters.
     */
    resumeRecording(recordingId: string, options?: CallRecordingResumeRecordingOptionalParams): Promise<void>;
    /**
     * Get recording result. This includes the download URLs for the recording chunks.
     * @param recordingId The recording id.
     * @param options The options parameters.
     */
    getRecordingResult(recordingId: string, options?: CallRecordingGetRecordingResultOptionalParams): Promise<CallRecordingGetRecordingResultResponse>;
}
//# sourceMappingURL=callRecording.d.ts.map