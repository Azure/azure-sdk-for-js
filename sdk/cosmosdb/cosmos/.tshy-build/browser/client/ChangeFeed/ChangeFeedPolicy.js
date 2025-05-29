/**
 * Represents the change feed policy configuration for a container in the Azure Cosmos DB service.
 */
export class ChangeFeedPolicy {
    constructor(retentionDuration) {
        this.retentionDuration = retentionDuration.getRetentionInMinutes();
    }
}
//# sourceMappingURL=ChangeFeedPolicy.js.map