"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeFeedPolicy = void 0;
/**
 * Represents the change feed policy configuration for a container in the Azure Cosmos DB service.
 */
class ChangeFeedPolicy {
    constructor(retentionDuration) {
        this.retentionDuration = retentionDuration.getRetentionInMinutes();
    }
}
exports.ChangeFeedPolicy = ChangeFeedPolicy;
//# sourceMappingURL=ChangeFeedPolicy.js.map