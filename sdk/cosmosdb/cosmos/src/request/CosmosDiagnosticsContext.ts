import { v4 } from "uuid";
import { Constants } from "../common";
import { Location } from "../documents";
import { CosmosHeaders } from "../queryExecutionContext";
import {
  CosmosDiagnostics,
  FailedRequestAttemptDiagnostic,
  MetadataLookupDiagnostic,
  MetadataType,
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
  private requestStartTimeUTC: number;
  private requestEndTimeUTC: number;
  private retryStartTimeUTC: number;
  private headers: CosmosHeaders = {};
  private retryAttempNumber: number;
  private failedAttempts: FailedRequestAttemptDiagnostic[] = [];
  private metadataLookups: MetadataLookupDiagnostic[] = [];
  private requestPayloadLength: number;
  private responsePayloadLength: number;

  public locationEndpointsContacted: Map<string, Location> = new Map();

  public constructor() {
    this.requestStartTimeUTC = getCurrentTimestamp();
    this.retryStartTimeUTC = this.requestStartTimeUTC;
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
      attemptNumber: this.retryAttempNumber,
      startTimeUTC: this.retryStartTimeUTC,
      endTimeUTC: getCurrentTimestamp(),
      statusCode,
    };
    this.retryStartTimeUTC = getCurrentTimestamp();
    this.retryAttempNumber++;
    this.failedAttempts.push(attempt);
  }

  public recordMetaDataLookup(diagnostics: CosmosDiagnostics, metaDataType: MetadataType): void {
    const metaDataRequest = {
      startTimeUTC: diagnostics.clientSideRequestStatistics.requestStartTimeUTC,
      endTimeUTC: diagnostics.clientSideRequestStatistics.requestEndTimeUTC,
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
        requestStartTimeUTC: this.requestStartTimeUTC,
        requestEndTimeUTC: this.requestEndTimeUTC,
        locationEndpointsContacted: [...this.locationEndpointsContacted.values()],
        metadataDiagnostics: {
          metadataLookups: [...this.metadataLookups],
        },
        retryDiagnostics: {
          failedAttempts: [...this.failedAttempts],
        },
        requestPayloadLength: this.requestPayloadLength,
        responsePayloadLength: this.responsePayloadLength,
      },
      this
    );
  }

  private recordSessionEnd() {
    this.requestEndTimeUTC = getCurrentTimestamp();
  }

  private getActivityId(): string {
    return this.headers[Constants.HttpHeaders.ActivityId] as string;
  }
}

export function getCurrentTimestamp(): number {
  return Date.now();
}
