import type { BlobServiceClient } from "@azure/storage-blob";
import { ChangeFeed } from "./ChangeFeed.js";
import { SegmentFactory } from "./SegmentFactory.js";
import type { BlobChangeFeedListChangesOptions } from "./models/models.js";
export declare class ChangeFeedFactory {
    private readonly segmentFactory;
    private readonly maxTransferSize?;
    constructor(maxTransferSize?: number);
    constructor(segmentFactory: SegmentFactory);
    private static validateCursor;
    create(blobServiceClient: BlobServiceClient, continuationToken?: string, options?: BlobChangeFeedListChangesOptions): Promise<ChangeFeed>;
}
//# sourceMappingURL=ChangeFeedFactory.d.ts.map