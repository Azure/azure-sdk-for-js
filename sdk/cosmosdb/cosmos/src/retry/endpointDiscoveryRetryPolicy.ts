// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
import { OperationType, ResourceType } from "../common/index.js";
import { isReadRequest } from "../common/helper.js";
import type { GlobalEndpointManager } from "../globalEndpointManager.js";
import type { ErrorResponse, RequestContext } from "../request/index.js";
import type { RetryContext } from "./RetryContext.js";
import type { RetryPolicy } from "./RetryPolicy.js";
import { GlobalPartitionEndpointManager } from "../globalPartitionEndpointManager.js";

/**
 * This class implements the retry policy for endpoint discovery.
 * @hidden
 */
export class EndpointDiscoveryRetryPolicy implements RetryPolicy {
  /** Current retry attempt count. */
  public currentRetryAttemptCount: number;
  /** Retry interval in milliseconds. */
  public retryAfterInMs: number;

  /** Max number of retry attempts to perform. */
  private maxTries: number;
  private static readonly maxTries = 120; // TODO: Constant?
  private static readonly retryAfterInMs = 1000;

  /**
   * @param globalEndpointManager - The GlobalEndpointManager instance.
   */
  constructor(
    private globalEndpointManager: GlobalEndpointManager,
    private resourceType: ResourceType,
    private operationType: OperationType,
    private globalPartitionEndpointManager?: GlobalPartitionEndpointManager,
  ) {
    this.maxTries = EndpointDiscoveryRetryPolicy.maxTries;
    this.currentRetryAttemptCount = 0;
    this.retryAfterInMs = EndpointDiscoveryRetryPolicy.retryAfterInMs;
  }

  /**
   * Determines whether the request should be retried or not.
   * @param err - Error returned by the request.
   */
  public async shouldRetry(
    err: ErrorResponse,
    diagnosticNode: DiagnosticNodeInternal,
    retryContext?: RetryContext,
    locationEndpoint?: string,
    requestContext?: RequestContext,
  ): Promise<boolean | [boolean, string]> {
    if (!err) {
      return false;
    }

    if (!retryContext || !locationEndpoint) {
      return false;
    }

    if (!this.globalEndpointManager.enableEndpointDiscovery) {
      return false;
    }

    if (this.globalPartitionEndpointManager) {
      const didFailover = await this.globalPartitionEndpointManager.tryPartitionLevelFailover(
        requestContext,
        diagnosticNode,
      );
      if (didFailover) {
        return true;
      }
    }

    if (this.currentRetryAttemptCount >= this.maxTries) {
      return false;
    }

    this.currentRetryAttemptCount++;
    retryContext.retryCount = this.currentRetryAttemptCount;
    retryContext.clearSessionTokenNotAvailable = false;
    retryContext.retryRequestOnPreferredLocations = false;
    diagnosticNode.addData({ successfulRetryPolicy: "endpointDiscovery" });

    // check if this is a readDatabaseAccount call
    // If yes, then simply return true (avoid recursive call triggered for readDatabaseAccount)
    if (this.resourceType === ResourceType.none && this.operationType === OperationType.Read) {
      return true;
    }

    if (isReadRequest(this.operationType)) {
      await this.globalEndpointManager.markCurrentLocationUnavailableForRead(
        diagnosticNode,
        locationEndpoint,
      );
    } else {
      await this.globalEndpointManager.markCurrentLocationUnavailableForWrite(
        diagnosticNode,
        locationEndpoint,
      );
    }
    return true;
  }
}
