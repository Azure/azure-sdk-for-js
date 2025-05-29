import type { ContainerDefinition } from "./ContainerDefinition.js";
import type { PartitionKeyDefinition } from "../../documents/index.js";
import type { VerboseOmit } from "../../utils/types.js";
export interface ContainerRequest extends VerboseOmit<ContainerDefinition, "partitionKey"> {
    throughput?: number;
    maxThroughput?: number;
    autoUpgradePolicy?: {
        throughputPolicy: {
            incrementPercent: number;
        };
    };
    partitionKey?: string | PartitionKeyDefinition;
}
//# sourceMappingURL=ContainerRequest.d.ts.map