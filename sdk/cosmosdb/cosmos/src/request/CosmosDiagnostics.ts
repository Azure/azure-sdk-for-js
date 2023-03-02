// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { v4 } from "uuid";
import { Constants } from "../common";
import { CosmosHeaders } from "../queryExecutionContext";

export interface CosmosDiagnostics {
  id: string;
  startTimeUTC: number;
  endTimeUTC: number;
  activityId: string;
  clientSideRequestStatistics: ClientSideRequestStatistics;
}

export interface FailedAttempt {
  id: string;
  attemptNumber: number;
  startTimeUTC: number;
  endTimeUTC: number;
  statusCode: string;
}

export type MetadataDiagnostics = {
  metadataLookups: MetadataLookup[];
};

export type RetryDiagnostics = {
  failedAttempts: FailedAttempt[];
};

export interface MetadataLookup {
  id: string;
  startTimeUTC: number;
  endTimeUTC: number;
  metaDataType: MetadataType;
  activityId: string;
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
  totalPayloadSizeInBytes: number;
};

// TODO: check about UTC timestamp.
export function getCurrentTimestamp(): number {
  return Date.now();
}

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
      totalPayloadSizeInBytes: 0,
    },
  };
}

export class CosmosDiagnosticContext {
  private requestStartTimeUTC: number;
  private requestEndTimeUTC: number;
  private retryStartTimeUTC: number;
  private headers: CosmosHeaders = {};
  private retryAttempNumber: number;
  private failedAttempts: FailedAttempt[] = [];
  private locationEndpointsContacted: Set<string> = new Set();
  private metadataLookups: MetadataLookup[] = [];
  public constructor() {
    this.requestStartTimeUTC = getCurrentTimestamp();
    this.retryStartTimeUTC = this.requestStartTimeUTC;
  }

  public ingestHeaders(headers: CosmosHeaders): void {
    this.headers = { ...this.headers, headers };
  }

  public recordFailedAttempt(statusCode: string): void {
    const attempt: FailedAttempt = {
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

  public recordMetaDataQuery(diagnostics: CosmosDiagnostics, metaDataType: MetadataType): void {
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
        totalPayloadSizeInBytes: 0,
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
