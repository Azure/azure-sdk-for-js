// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Constants } from "../common/index.js";
import type {
  ClientSideRequestStatistics,
  EncryptionDiagnostics,
  FailedRequestAttemptDiagnostic,
  GatewayStatistics,
  MetadataLookUpDiagnostic,
  MetadataLookUpType,
} from "../CosmosDiagnostics.js";
import { getCurrentTimestampInMs } from "../utils/time.js";
/**
 * @hidden
 * Internal class to hold CosmosDiagnostic aggregate information all through the lifecycle of a request.
 * This object gathers diagnostic information throughout Client operation which may span across multiple
 * Server call, retries etc.
 * Functions - recordFailedAttempt, recordMetaDataQuery, recordEndpointContactEvent are used to ingest
 * data into the context. At the end of operation, getDiagnostics() is used to
 * get final CosmosDiagnostic object.
 */
export class CosmosDiagnosticContext {
  private requestStartTimeUTCinMs: number;
  private failedAttempts: FailedRequestAttemptDiagnostic[] = [];
  private metadataLookups: MetadataLookUpDiagnostic[] = [];
  private gatewayStatistics: GatewayStatistics[] = [];
  public locationEndpointsContacted: Set<string> = new Set();
  encryptionDiagnostics: EncryptionDiagnostics;

  public constructor() {
    this.requestStartTimeUTCinMs = getCurrentTimestampInMs();
  }

  public recordFailedAttempt(
    gatewayStatistics: GatewayStatistics,
    retryAttemptNumber: number,
  ): void {
    const attempt: FailedRequestAttemptDiagnostic = {
      attemptNumber: retryAttemptNumber,
      startTimeUTCInMs: gatewayStatistics.startTimeUTCInMs,
      durationInMs: gatewayStatistics.durationInMs,
      statusCode: gatewayStatistics.statusCode,
      substatusCode: gatewayStatistics.subStatusCode,
      requestPayloadLengthInBytes: gatewayStatistics.requestPayloadLengthInBytes,
      responsePayloadLengthInBytes: gatewayStatistics.responsePayloadLengthInBytes,
      activityId: gatewayStatistics.activityId,
      operationType: gatewayStatistics.operationType,
      resourceType: gatewayStatistics.resourceType,
    };
    this.failedAttempts.push(attempt);
  }

  public recordNetworkCall(gatewayStatistics: GatewayStatistics): void {
    this.gatewayStatistics.push(gatewayStatistics);
  }

  public recordEncryptionDiagnostics(encryptionDiagnostics: EncryptionDiagnostics): void {
    const { encryptContent, decryptContent } = encryptionDiagnostics;
    const encryptionDuration = encryptContent[Constants.Encryption.DiagnosticsDuration] ?? 0;
    const decryptionDuration = decryptContent[Constants.Encryption.DiagnosticsDuration] ?? 0;

    encryptionDiagnostics.processingDurationInMs = encryptionDuration + decryptionDuration;
    this.encryptionDiagnostics = encryptionDiagnostics;
  }

  /**
   * Merge given DiagnosticContext to current node's DiagnosticContext, Treating GatewayRequests of
   * given DiagnosticContext, as metadata requests.
   */
  public mergeDiagnostics(
    childDiagnostics: CosmosDiagnosticContext,
    metadataType: MetadataLookUpType,
  ): void {
    // Copy Location endpoints contacted.
    childDiagnostics.locationEndpointsContacted.forEach((endpoint) =>
      this.locationEndpointsContacted.add(endpoint),
    );

    // Copy child nodes's GatewayStatistics to parent's metadata lookups.
    childDiagnostics.gatewayStatistics.forEach((gateway) =>
      this.metadataLookups.push({
        activityId: gateway.activityId,
        requestPayloadLengthInBytes: gateway.requestPayloadLengthInBytes,
        responsePayloadLengthInBytes: gateway.responsePayloadLengthInBytes,
        startTimeUTCInMs: gateway.startTimeUTCInMs,
        operationType: gateway.operationType,
        resourceType: gateway.resourceType,
        durationInMs: gateway.durationInMs,
        metaDataType: metadataType,
      }),
    );
  }

  /**
   * Merge given DiagnosticContext to current node's DiagnosticContext for bulk
   */
  public mergeBulkDiagnostics(childDiagnostics: CosmosDiagnosticContext): void {
    // Copy Location endpoints contacted.
    childDiagnostics.locationEndpointsContacted.forEach((endpoint) =>
      this.locationEndpointsContacted.add(endpoint),
    );

    // Copy child nodes's GatewayStatistics to parent's gateway statistics.
    childDiagnostics.gatewayStatistics.forEach((gateway) => this.gatewayStatistics.push(gateway));
    // merge metadata lookups and failed attempts
    childDiagnostics.metadataLookups.forEach((lookup) => this.metadataLookups.push(lookup));
    childDiagnostics.failedAttempts.forEach((lookup) => this.failedAttempts.push(lookup));

    if (!this.encryptionDiagnostics) {
      this.encryptionDiagnostics = childDiagnostics.encryptionDiagnostics;
    } else if (childDiagnostics.encryptionDiagnostics) {
      this.encryptionDiagnostics.decryptContent =
        childDiagnostics.encryptionDiagnostics.decryptContent;
      this.encryptionDiagnostics.processingDurationInMs =
        (this.encryptionDiagnostics.processingDurationInMs || 0) +
        (childDiagnostics.encryptionDiagnostics.processingDurationInMs || 0);
    }
  }

  public getClientSideStats(
    endTimeUTCInMs: number = getCurrentTimestampInMs(),
  ): ClientSideRequestStatistics {
    return {
      requestStartTimeUTCInMs: this.requestStartTimeUTCinMs,
      requestDurationInMs: endTimeUTCInMs - this.requestStartTimeUTCinMs,
      totalRequestPayloadLengthInBytes: this.getTotalRequestPayloadLength(),
      totalResponsePayloadLengthInBytes: this.getTotalResponsePayloadLength(),
      locationEndpointsContacted: [...this.locationEndpointsContacted.values()],
      metadataDiagnostics: {
        metadataLookups: [...this.metadataLookups],
      },
      retryDiagnostics: {
        failedAttempts: [...this.failedAttempts],
      },
      gatewayStatistics: this.gatewayStatistics,
      encryptionDiagnostics: this.encryptionDiagnostics,
    };
  }

  public getTotalRequestPayloadLength(): number {
    let totalRequestPayloadLength = 0;
    this.gatewayStatistics.forEach(
      (req) => (totalRequestPayloadLength += req.requestPayloadLengthInBytes),
    );
    this.metadataLookups.forEach(
      (req) => (totalRequestPayloadLength += req.requestPayloadLengthInBytes),
    );
    this.failedAttempts.forEach(
      (req) => (totalRequestPayloadLength += req.requestPayloadLengthInBytes),
    );
    return totalRequestPayloadLength;
  }

  public getTotalResponsePayloadLength(): number {
    let totalResponsePayloadLength = 0;
    this.gatewayStatistics.forEach(
      (req) => (totalResponsePayloadLength += req.responsePayloadLengthInBytes),
    );
    this.metadataLookups.forEach(
      (req) => (totalResponsePayloadLength += req.responsePayloadLengthInBytes),
    );
    this.failedAttempts.forEach(
      (req) => (totalResponsePayloadLength += req.responsePayloadLengthInBytes),
    );
    return totalResponsePayloadLength;
  }

  public recordEndpointResolution(location: string): void {
    this.locationEndpointsContacted.add(location);
  }
}
