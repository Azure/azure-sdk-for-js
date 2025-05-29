import type { PollOperation, PollOperationState } from "@azure/core-lro";
import { Poller } from "@azure/core-lro";
import type { BlobClient, BlobStartCopyFromURLOptions, BlobBeginCopyFromURLResponse } from "../Clients.js";
/**
 * Defines the operations from a {@link BlobClient} that are needed for the poller
 * returned by {@link BlobClient.beginCopyFromURL} to work.
 */
export type CopyPollerBlobClient = Pick<BlobClient, "abortCopyFromURL" | "getProperties"> & {
    startCopyFromURL(copySource: string, options?: BlobStartCopyFromURLOptions): Promise<BlobBeginCopyFromURLResponse>;
};
/**
 * The state used by the poller returned from {@link BlobClient.beginCopyFromURL}.
 *
 * This state is passed into the user-specified `onProgress` callback
 * whenever copy progress is detected.
 */
export interface BlobBeginCopyFromUrlPollState extends PollOperationState<BlobBeginCopyFromURLResponse> {
    /**
     * The instance of {@link BlobClient} that was used when calling {@link BlobClient.beginCopyFromURL}.
     */
    readonly blobClient: CopyPollerBlobClient;
    /**
     * The copyId that identifies the in-progress blob copy.
     */
    copyId?: string;
    /**
     * the progress of the blob copy as reported by the service.
     */
    copyProgress?: string;
    /**
     * The source URL provided in {@link BlobClient.beginCopyFromURL}.
     */
    copySource: string;
    /**
     * The options that were passed to the initial {@link BlobClient.beginCopyFromURL} call.
     * This is exposed for the poller and should not be modified directly.
     */
    readonly startCopyFromURLOptions?: BlobStartCopyFromURLOptions;
}
/**
 * The PollOperation responsible for:
 *  - performing the initial startCopyFromURL
 *  - checking the copy status via getProperties
 *  - cancellation via abortCopyFromURL
 * @hidden
 */
export interface BlobBeginCopyFromURLPollOperation extends PollOperation<BlobBeginCopyFromUrlPollState, BlobBeginCopyFromURLResponse> {
}
/**
 * The set of options used to configure the poller.
 * This is an internal interface populated by {@link BlobClient.beginCopyFromURL}.
 *
 * @hidden
 */
export interface BlobBeginCopyFromUrlPollerOptions {
    blobClient: CopyPollerBlobClient;
    copySource: string;
    intervalInMs?: number;
    onProgress?: (state: BlobBeginCopyFromUrlPollState) => void;
    resumeFrom?: string;
    startCopyFromURLOptions?: BlobStartCopyFromURLOptions;
}
/**
 * This is the poller returned by {@link BlobClient.beginCopyFromURL}.
 * This can not be instantiated directly outside of this package.
 *
 * @hidden
 */
export declare class BlobBeginCopyFromUrlPoller extends Poller<BlobBeginCopyFromUrlPollState, BlobBeginCopyFromURLResponse> {
    intervalInMs: number;
    constructor(options: BlobBeginCopyFromUrlPollerOptions);
    delay(): Promise<void>;
}
//# sourceMappingURL=BlobStartCopyFromUrlPoller.d.ts.map