import { HttpMethods, PipelineRequest } from "@azure/core-rest-pipeline";
/**
 * Adds the recording id headers to the requests that are sent to the proxy tool.
 * These are required to appropriately save the recordings in the record mode and picking them up in playback.
 */
export declare function createRecordingRequest(url: string, sessionFile?: string, recordingId?: string, method?: HttpMethods, assetsJson?: string): PipelineRequest;
//# sourceMappingURL=createRecordingRequest.d.ts.map