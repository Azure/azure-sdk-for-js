import { StatusCodes } from "../common/statusCodes.js";
import { HTTPMethod, isReadRequest } from "../common/index.js";
import { Constants } from "../common/constants.js";
import { TimeoutErrorCode } from "../request/TimeoutError.js";
/**
 * This class TimeoutFailoverRetryPolicy handles retries for read operations
 * (including data plane,metadata, and query plan) in case of request timeouts
 * (TimeoutError) or service unavailability (503 status code) by performing failover
 * and retrying on other regions.
 * @hidden
 */
export class TimeoutFailoverRetryPolicy {
    constructor(globalEndpointManager, headers, methodType, resourceType, operationType, enableEndPointDiscovery) {
        this.globalEndpointManager = globalEndpointManager;
        this.headers = headers;
        this.methodType = methodType;
        this.resourceType = resourceType;
        this.operationType = operationType;
        this.enableEndPointDiscovery = enableEndPointDiscovery;
        this.maxRetryAttemptCount = 120;
        this.maxServiceUnavailableRetryCount = 1;
        this.retryAfterInMs = 0;
        this.failoverRetryCount = 0;
    }
    /**
     * Checks if a timeout request is valid for the timeout failover retry policy.
     * A valid request should be a data plane, metadata, or query plan request.
     * @returns
     */
    isValidRequestForTimeoutError() {
        const isQuery = Constants.HttpHeaders.IsQuery in this.headers;
        const isQueryPlan = Constants.HttpHeaders.IsQueryPlan in this.headers;
        if (this.methodType === HTTPMethod.get || isQuery || isQueryPlan) {
            return true;
        }
        return false;
    }
    async shouldRetry(err, diagnosticNode, retryContext, locationEndpoint) {
        if (!err) {
            return false;
        }
        if (!retryContext || !locationEndpoint) {
            return false;
        }
        // Check if the error is a timeout error (TimeoutErrorCode) and if it is not a valid HTTP network timeout request
        if (err.code === TimeoutErrorCode && !this.isValidRequestForTimeoutError()) {
            return false;
        }
        if (!this.enableEndPointDiscovery) {
            return false;
        }
        if (err.code === StatusCodes.ServiceUnavailable &&
            this.failoverRetryCount >= this.maxServiceUnavailableRetryCount) {
            return false;
        }
        if (this.failoverRetryCount >= this.maxRetryAttemptCount) {
            return false;
        }
        const canUseMultipleWriteLocations = this.globalEndpointManager.canUseMultipleWriteLocations(this.resourceType, this.operationType);
        const readRequest = isReadRequest(this.operationType);
        if (!canUseMultipleWriteLocations && !readRequest) {
            // Write requests on single master cannot be retried, no other regions available
            return false;
        }
        this.failoverRetryCount++;
        // Setting the retryLocationIndex to the next available location for retry.
        // The retryLocationIndex is determined based on the failoverRetryCount, starting from zero.
        retryContext.retryLocationServerIndex = await this.findEndpointIndex(this.failoverRetryCount);
        diagnosticNode.addData({ successfulRetryPolicy: "timeout-failover" });
        return true;
    }
    /**
     * Determines index of endpoint to be used for retry based upon failoverRetryCount and avalable locations
     * @param failoverRetryCount - count of failovers
     * @returns
     */
    async findEndpointIndex(failoverRetryCount) {
        // count of preferred locations specified by user
        const preferredLocationsCount = this.globalEndpointManager.preferredLocationsCount;
        const readRequest = isReadRequest(this.operationType);
        let endpointIndex = 0;
        // If preferredLocationsCount is not zero, it indicates that the user has specified preferred locations.
        if (preferredLocationsCount !== 0) {
            // The endpointIndex is set based on the preferred location and the failover retry count.
            endpointIndex = failoverRetryCount % preferredLocationsCount;
        }
        else {
            // In the absence of preferred locations, the endpoint selection is based on the failover count and the number of available locations.
            if (readRequest) {
                const getReadEndpoints = await this.globalEndpointManager.getReadEndpoints();
                if (getReadEndpoints && getReadEndpoints.length > 0) {
                    endpointIndex = failoverRetryCount % getReadEndpoints.length;
                }
            }
            else {
                const getWriteEndpoints = await this.globalEndpointManager.getWriteEndpoints();
                if (getWriteEndpoints && getWriteEndpoints.length > 0) {
                    endpointIndex = failoverRetryCount % getWriteEndpoints.length;
                }
            }
        }
        return endpointIndex;
    }
}
//# sourceMappingURL=timeoutFailoverRetryPolicy.js.map