import type { CosmosContainerChildResourceKind } from "../../common/constants.js";
import type { CosmosKeyType } from "../../common/constants.js";
export declare class SasTokenProperties {
    user: string;
    userTag: string;
    databaseName: string;
    containerName: string;
    resourceName: string;
    resourcePath: string;
    resourceKind: CosmosContainerChildResourceKind;
    partitionKeyValueRanges: string[];
    startTime: Date;
    expiryTime: Date;
    keyType: CosmosKeyType | number;
    controlPlaneReaderScope: number;
    controlPlaneWriterScope: number;
    dataPlaneReaderScope: number;
    dataPlaneWriterScope: number;
    cosmosContainerChildResourceKind: CosmosContainerChildResourceKind;
    cosmosKeyType: CosmosKeyType;
}
//# sourceMappingURL=SasTokenProperties.d.ts.map