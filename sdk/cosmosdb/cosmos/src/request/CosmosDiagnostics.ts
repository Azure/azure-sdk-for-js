// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { v4 } from "uuid";
import { Constants } from "../common";
import { CosmosHeaders } from "../queryExecutionContext";

/**
 * Cosmos Diagnostic type. It contains diagnostic information during a client operation. ie. Item.read().
 * This `clientSideRequestStatistics` member all the diagnostic information related to client process. i.e
 * - metadata lookups.
 * - retries
 * - endpoints contacted.
 * - request, response payload stats.
 * Here all the server requests, apart from the final intended resource are considered as metadata calls.
 * i.e. for item.read(id), if the client makes server call to discover endpoints it would be considered
 * as metadata call.
 */
export interface CosmosDiagnostics {
  id: string;
  startTimeUTC: number;
  endTimeUTC: number;
  activityId: string;
  clientSideRequestStatistics: ClientSideRequestStatistics;
}

/**
 * This type contains diagnostic information regarding all metadata request to server during an CosmosDB client operation.
 */
export type MetadataDiagnostics = {
  metadataLookups: MetadataLookup[];
};

/**
 * This type captures diagnostic information regarding retries attempty during an CosmosDB client operation.
 */
export type RetryDiagnostics = {
  failedAttempts: FailedRequestAttempt[];
};

/**
 * This type contains diagnostic information regarding a single metadata request to server.
 */
export interface MetadataLookup {
  id: string;
  startTimeUTC: number;
  endTimeUTC: number;
  metaDataType: MetadataType;
  activityId: string;
}

/**
 * This type captures diagnostic information regarding a failed request to server api.
 */
export interface FailedRequestAttempt {
  id: string;
  attemptNumber: number;
  startTimeUTC: number;
  endTimeUTC: number;
  statusCode: string;
}

export enum MetadataType {
  CONTAINER_LOOK_UP,
  PARTITION_KEY_RANGE_LOOK_UP,
  SERVER_ADDRESS_LOOKUP,
  MASTER_ADDRESS_LOOK_UP,
  DATABASE_ACCOUNT_LOOKUP,
}

export type ClientSideRequestStatistics = {
  locationEndpointsContacted: string[];
  retryDiagnostics: RetryDiagnostics;
  metadataDiagnostics: MetadataDiagnostics;
  requestPayloadLength: number;
  responsePayloadLength: number;
};

// TODO: check about UTC timestamp.
export function getCurrentTimestamp(): number {
  return Date.now();
}

/**
 * Utility function to create an Empty CosmosDiagnostic object.
 * @returns
 */
export function getEmptyCosmosDiagnostics(): CosmosDiagnostics {
  return {
    id: v4(),
    activityId: "",
    endTimeUTC: 0,
    startTimeUTC: 0,
    clientSideRequestStatistics: {
      locationEndpointsContacted: [],
      retryDiagnostics: {
        failedAttempts: [],
      },
      metadataDiagnostics: {
        metadataLookups: [],
      },
      requestPayloadLength: 0,
      responsePayloadLength: 0,
    },
  };
}
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
  private failedAttempts: FailedRequestAttempt[] = [];
  private locationEndpointsContacted: Set<string> = new Set();
  private metadataLookups: MetadataLookup[] = [];
  private requestPayloadLength: number;
  private responsePayloadLength: number;
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
    const attempt: FailedRequestAttempt = {
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
      startTimeUTC: diagnostics.startTimeUTC,
      endTimeUTC: diagnostics.endTimeUTC,
      activityId: diagnostics.activityId,
      metaDataType,
      id: v4(),
    };
    this.metadataLookups.push(metaDataRequest);
  }

  //   public recordSerializationEvent() {}

  //   public recordResponse() {}

  public mergeDiagnostics(diagnostics: CosmosDiagnostics): void {
    diagnostics.clientSideRequestStatistics.locationEndpointsContacted.forEach((endpoint) =>
      this.locationEndpointsContacted.add(endpoint)
    );
    diagnostics.clientSideRequestStatistics.metadataDiagnostics.metadataLookups.forEach((lookup) =>
      this.metadataLookups.push(lookup)
    );
    diagnostics.clientSideRequestStatistics.retryDiagnostics.failedAttempts.forEach((lookup) =>
      this.failedAttempts.push(lookup)
    );
  }

  public recordEndpointContactEvent(location: string): void {
    this.locationEndpointsContacted.add(location);
  }

  public getDiagnostics(): CosmosDiagnostics {
    this.recordSessionEnd();
    return {
      id: v4(),
      activityId: this.getActivityId(),
      startTimeUTC: this.requestStartTimeUTC,
      endTimeUTC: this.requestEndTimeUTC,
      clientSideRequestStatistics: {
        locationEndpointsContacted: [...this.locationEndpointsContacted],
        metadataDiagnostics: {
          metadataLookups: [...this.metadataLookups],
        },
        retryDiagnostics: {
          failedAttempts: [...this.failedAttempts],
        },
        requestPayloadLength: this.requestPayloadLength,
        responsePayloadLength: this.responsePayloadLength,
      },
    };
  }

  private recordSessionEnd() {
    this.requestEndTimeUTC = getCurrentTimestamp();
  }

  private getActivityId(): string {
    return this.headers[Constants.HttpHeaders.ActivityId] as string;
  }
}
