import rhea from "rhea";
/**
 * Checks whether the provided message is requesting the partition info from the Event Hub.
 * @param entityPath - The path the client sent the request to.
 * Expected to be `$management` if the message is requesting runtime info.
 * @param message - The message sent by the client.
 */
export declare function isPartitionInfo(entityPath: string, message: rhea.Message): boolean;
export interface GeneratePartitionInfoResponseOptions {
    correlationId?: string;
    eventHubName: string;
    targetLinkName?: string;
    beginningSequenceNumber: number;
    lastEnqueuedSequenceNumber: number;
    lastEnqueuedOffset: string;
    lastEnqueuedTimeUtc: Date;
    isPartitionEmpty: boolean;
    partitionId: string;
}
/**
 * Generates a message containing the EventHub's specified partition info.
 */
export declare function generatePartitionInfoResponse({ eventHubName, correlationId, targetLinkName, beginningSequenceNumber, lastEnqueuedSequenceNumber, lastEnqueuedOffset, lastEnqueuedTimeUtc, isPartitionEmpty, partitionId, }: GeneratePartitionInfoResponseOptions): rhea.Message;
export interface GenerateBadPartitionInfoResponseOptions {
    correlationId?: string;
    targetLinkName?: string;
}
export declare function generateBadPartitionInfoResponse({ correlationId, targetLinkName, }: GenerateBadPartitionInfoResponseOptions): rhea.Message;
//# sourceMappingURL=partitionInfo.d.ts.map