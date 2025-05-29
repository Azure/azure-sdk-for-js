import type { CallAutomationApiClient } from "./generated/src/callAutomationApiClient.js";
import type { PipelineResponse } from "@azure/core-rest-pipeline";
import type { DeleteRecordingOptions, DownloadRecordingOptions } from "./models/options.js";
/** Class containing ContentDownloading operations. */
export declare class ContentDownloaderImpl {
    private readonly client;
    /**
     * Initialize a new instance of the class ContentDownloader class.
     * @param client - Reference to the service client
     */
    constructor(client: CallAutomationApiClient);
    private addCustomSignUrlPolicy;
    /**
     * Deletes a recording.
     * @param deleteLocationUrl - The recording location url. Required.
     */
    deleteRecording(deleteLocationUrl: string, options: DeleteRecordingOptions): Promise<void>;
    /**
     * Returns a stream with a call recording.
     * @param sourceLocationUrl - The source location url. Required.
     * @param options - Additional request options contains downloadRecording options.
     */
    download(sourceLocationUrl: string, options: DownloadRecordingOptions): Promise<PipelineResponse>;
}
//# sourceMappingURL=contentDownloader.d.ts.map