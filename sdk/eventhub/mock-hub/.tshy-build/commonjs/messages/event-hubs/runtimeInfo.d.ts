import rhea from "rhea";
/**
 * Checks whether the provided message is requesting the EventHub's runtime info.
 * @param entityPath - The path the client sent the request to.
 * Expected to be `$management` if the message is requesting runtime info.
 * @param message - The message sent by the client.
 */
export declare function isHubRuntimeInfo(entityPath: string, message: rhea.Message): boolean;
export interface GenerateHubRuntimeInfoResponseOptions {
    correlationId?: string;
    partitions: string[];
    targetLinkName?: string;
    createdOn: Date;
    eventHubName: string;
}
/**
 * Generates a message containing the EventHub's runtime info.
 */
export declare function generateHubRuntimeInfoResponse({ correlationId, partitions, targetLinkName, createdOn, eventHubName, }: GenerateHubRuntimeInfoResponseOptions): rhea.Message;
//# sourceMappingURL=runtimeInfo.d.ts.map