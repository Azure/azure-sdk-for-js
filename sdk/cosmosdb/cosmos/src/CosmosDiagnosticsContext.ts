// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { v4 } from "uuid";
import { Constants } from "./common";
import { Location } from "./documents";
import { CosmosHeaders } from "./queryExecutionContext";
import {
  CosmosDiagnostics,
  FailedRequestAttemptDiagnostic,
  MetadataLookUpDiagnostic,
  MetadataLookUpType,
} from "./CosmosDiagnostics";

/**
 * @hidden
 * Internal class to hold CosmosDiagnostic information all through the lifecycle of a request.
 * This object gathers diagnostic information throughout Client operation which may span across multiple
 * Server call, retries etc.
 * Functions - recordFailedAttempt, recordMetaDataQuery, recordEndpointContactEvent are used to ingest
 * data into the context. At the end of operation, getDiagnostics() is used to
 * get final CosmosDiagnostic object.
 */
export class CosmosDiagnosticContext {
  private requestStartTimeUTCinMs: number;
  private requestEndTimeUTCinMs: number;
  private retryStartTimeUTCinMs: number;
  private headers: CosmosHeaders = {};
  private retryAttemptNumber: number;
  private failedAttempts: FailedRequestAttemptDiagnostic[] = [];
  private metadataLookups: MetadataLookUpDiagnostic[] = [];
  private requestPayloadLength: number;
  private responsePayloadLength: number;

  public locationEndpointsContacted: Map<string, Location> = new Map();

  public constructor() {
    this.requestStartTimeUTCinMs = getCurrentTimestampInMs();
    this.retryStartTimeUTCinMs = this.requestStartTimeUTCinMs;
  }

  public recordRequestPayload(payload: string): void {
    this.requestPayloadLength = payload.length;
  }

  public recordResponseStats(payload: string, headers: CosmosHeaders): void {
    this.responsePayloadLength = typeof payload === "string" ? payload.length : 0;
    this.headers = { ...this.headers, ...headers };
  }

  public recordFailedAttempt(statusCode: string): void {
    const attempt: FailedRequestAttemptDiagnostic = {
      id: v4(),
      attemptNumber: this.retryAttemptNumber,
      startTimeUTCInMs: this.retryStartTimeUTCinMs,
      endTimeUTCInMs: getCurrentTimestampInMs(),
      statusCode,
    };
    this.retryStartTimeUTCinMs = getCurrentTimestampInMs();
    this.retryAttemptNumber++;
    this.failedAttempts.push(attempt);
  }

  public recordMetaDataLookup(
    diagnostics: CosmosDiagnostics,
    metaDataType: MetadataLookUpType
  ): void {
    const metaDataRequest = {
      startTimeUTCInMs: diagnostics.clientSideRequestStatistics.requestStartTimeUTCInMs,
      endTimeUTCInMs: diagnostics.clientSideRequestStatistics.requestEndTimeUTCInMs,
      activityId: diagnostics.clientSideRequestStatistics.activityId,
      metaDataType,
      id: v4(),
    };
    this.metadataLookups.push(metaDataRequest);
  }

  //   public recordSerializationEvent() {}

  //   public recordResponse() {}

  public mergeDiagnostics(diagnostics: CosmosDiagnostics): void {
    diagnostics.clientSideRequestStatistics.locationEndpointsContacted.forEach((endpoint) =>
      this.locationEndpointsContacted.set(endpoint.databaseAccountEndpoint, endpoint)
    );
    diagnostics.clientSideRequestStatistics.metadataDiagnostics.metadataLookups.forEach((lookup) =>
      this.metadataLookups.push(lookup)
    );
    diagnostics.clientSideRequestStatistics.retryDiagnostics.failedAttempts.forEach((lookup) =>
      this.failedAttempts.push(lookup)
    );
  }

  public recordEndpointContactEvent(location: Location): void {
    this.locationEndpointsContacted.set(location.databaseAccountEndpoint, location);
  }

  public getDiagnostics(): CosmosDiagnostics {
    this.recordSessionEnd();
    return new CosmosDiagnostics(
      v4(),
      {
        activityId: this.getActivityId(),
        requestStartTimeUTCInMs: this.requestStartTimeUTCinMs,
        requestEndTimeUTCInMs: this.requestEndTimeUTCinMs,
        locationEndpointsContacted: [...this.locationEndpointsContacted.values()],
        metadataDiagnostics: {
          metadataLookups: [...this.metadataLookups],
        },
        retryDiagnostics: {
          failedAttempts: [...this.failedAttempts],
        },
        requestPayloadLengthInBytes: this.requestPayloadLength,
        responsePayloadLengthInBytes: this.responsePayloadLength,
      },
      this
    );
  }

  private recordSessionEnd() {
    this.requestEndTimeUTCinMs = getCurrentTimestampInMs();
  }

  private getActivityId(): string {
    return this.headers[Constants.HttpHeaders.ActivityId] as string;
  }
}

/**
 * @hidden
 * Utility function to get currentTime in UTC milliseconds.
 * @returns
 */
export function getCurrentTimestampInMs(): number {
  return Date.now();
}
