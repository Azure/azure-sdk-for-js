import type { ClientContext } from "../../ClientContext.js";
import type { PartitionKeyRangeCache } from "../../routing/index.js";
import type { ChangeFeedIteratorOptions } from "./ChangeFeedIteratorOptions.js";
import type { Container } from "../Container/index.js";
export declare function buildChangeFeedIterator(cfOptions: ChangeFeedIteratorOptions, clientContext: ClientContext, container: Container, partitionKeyRangeCache: PartitionKeyRangeCache): Promise<any>;
//# sourceMappingURL=buildChangeFeedIterator.d.ts.map