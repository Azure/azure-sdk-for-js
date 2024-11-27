// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal";
import type { OperationType } from "../common";
import { isReadRequest } from "../common/helper";
import type { GlobalEndpointManager } from "../globalEndpointManager";
import type { ErrorResponse } from "../request";
import type { RetryContext } from "./RetryContext";
import type { RetryPolicy } from "./RetryPolicy";

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
    private operationType: OperationType,
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

    if (this.currentRetryAttemptCount >= this.maxTries) {
      return false;
    }

    this.currentRetryAttemptCount++;

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

    retryContext.retryCount = this.currentRetryAttemptCount;
    retryContext.clearSessionTokenNotAvailable = false;
    retryContext.retryRequestOnPreferredLocations = false;
    diagnosticNode.addData({ successfulRetryPolicy: "endpointDiscovery" });
    return true;
  }
}
