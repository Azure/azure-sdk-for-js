import type { PartitionKey } from "../../documents/index.js";
import type { FeedRange } from "./FeedRange.js";
/**
 * @hidden
 * Class which specifies the ChangeFeedIterator to start reading changes from this moment in time.
 */
export declare class ChangeFeedStartFromNow {
    cfResource?: PartitionKey | FeedRange;
    constructor(cfResource?: PartitionKey | FeedRange);
    getCfResource(): PartitionKey | FeedRange | undefined;
}
//# sourceMappingURL=ChangeFeedStartFromNow.d.ts.map