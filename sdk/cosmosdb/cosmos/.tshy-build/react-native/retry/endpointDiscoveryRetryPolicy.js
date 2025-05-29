import { isReadRequest } from "../common/helper.js";
/**
 * This class implements the retry policy for endpoint discovery.
 * @hidden
 */
export class EndpointDiscoveryRetryPolicy {
    /**
     * @param globalEndpointManager - The GlobalEndpointManager instance.
     */
    constructor(globalEndpointManager, operationType) {
        this.globalEndpointManager = globalEndpointManager;
        this.operationType = operationType;
        this.maxTries = EndpointDiscoveryRetryPolicy.maxTries;
        this.currentRetryAttemptCount = 0;
        this.retryAfterInMs = EndpointDiscoveryRetryPolicy.retryAfterInMs;
    }
    /**
     * Determines whether the request should be retried or not.
     * @param err - Error returned by the request.
     */
    async shouldRetry(err, diagnosticNode, retryContext, locationEndpoint) {
        if (!err) {
            return false;
        }
        if (!retryContext || !locationEndpoint) {
            return false;
        }
        if (!this.globalEndpointManager.enableEndpointDiscovery) {
            return false;
        }
        if (this.currentRetryAttemptCount >= this.maxTries) {
            return false;
        }
        this.currentRetryAttemptCount++;
        if (isReadRequest(this.operationType)) {
            await this.globalEndpointManager.markCurrentLocationUnavailableForRead(diagnosticNode, locationEndpoint);
        }
        else {
            await this.globalEndpointManager.markCurrentLocationUnavailableForWrite(diagnosticNode, locationEndpoint);
        }
        retryContext.retryCount = this.currentRetryAttemptCount;
        retryContext.clearSessionTokenNotAvailable = false;
        retryContext.retryRequestOnPreferredLocations = false;
        diagnosticNode.addData({ successfulRetryPolicy: "endpointDiscovery" });
        return true;
    }
}
EndpointDiscoveryRetryPolicy.maxTries = 120; // TODO: Constant?
EndpointDiscoveryRetryPolicy.retryAfterInMs = 1000;
//# sourceMappingURL=endpointDiscoveryRetryPolicy.js.map