// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Constants, DiagnosticLevel } from "./common";
import { CosmosHeaders } from "./queryExecutionContext";
import {
  ClientSideRequestStatistics,
  CosmosDiagnostics,
  DiagnosticDataValue,
  DiagnosticNodeInternal,
  DiagnosticNodeType,
  FailedRequestAttemptDiagnostic,
  GatewayStatistics,
  MetadataLookUpDiagnostic,
  MetadataLookUpType,
} from "./CosmosDiagnostics";
import { getDiagnosticLevel } from "./diagnostics";
import { RequestContext, Response } from "./request";
import { ClientContext } from "./ClientContext";

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
  private headers: CosmosHeaders = {};
  private failedAttempts: FailedRequestAttemptDiagnostic[] = [];
  private metadataLookups: MetadataLookUpDiagnostic[] = [];
  private requestPayloadLength: number;
  private responsePayloadLength: number;
  private totalRequestPayloadLengthInBytes: number;
  private totalResponsePayloadLengthInBytes: number;
  private gaterwayStatistics?: GatewayStatistics;
  public locationEndpointsContacted: Set<string> = new Set();

  public constructor() {
    this.requestStartTimeUTCinMs = getCurrentTimestampInMs();
  }

  public recordRequestPayload(payload: string): void {
    this.requestPayloadLength = payload.length;
  }

  public recordResponseStats(payload: string, headers: CosmosHeaders): void {
    this.responsePayloadLength = typeof payload === "string" ? payload.length : 0;
    this.headers = { ...this.headers, ...headers };
  }

  public recordFailedAttempt(
    diagnosticNode: DiagnosticNodeInternal,
    retryAttemptNumber: number,
    statusCode: number,
    substatusCode: number
  ): void {
    const attempt: FailedRequestAttemptDiagnostic = {
      attemptNumber: retryAttemptNumber,
      startTimeUTCInMs: diagnosticNode.startTimeUTCInMs,
      durationInMs: getCurrentTimestampInMs() - diagnosticNode.startTimeUTCInMs,
      statusCode,
      substatusCode,
    };
    this.failedAttempts.push(attempt);
  }

  public recordGatewayStatistics(
    request: RequestContext,
    diagnosticNode: DiagnosticNodeInternal,
    response: Response<any>
  ) {
    this.gaterwayStatistics = {
      operationType: request.operationType,
      resourceType: request.resourceType,
      statusCode: response.code,
      subStatusCode: response.substatus,
      requestCharge: Number(response.headers[Constants.HttpHeaders.RequestCharge]) || 0,
      startTimeUTCInMs: diagnosticNode.startTimeUTCInMs,
      durationInMs: diagnosticNode.durationInMs,
      partitionKeyRangeId: request.partitionKeyRangeId,
    };
  }

  public recordMetaDataLookup(
    activityId: string,
    startTimeUTCInMs: number,
    metaDataType: MetadataLookUpType
  ): void {
    const metaDataRequest = {
      startTimeUTCInMs,
      durationInMs: getCurrentTimestampInMs() - startTimeUTCInMs,
      activityId,
      metaDataType,
    };
    this.metadataLookups.push(metaDataRequest);
  }

  //   public recordSerializationEvent() {}

  //   public recordResponse() {}

  public mergeDiagnostics(diagnostics: CosmosDiagnosticContext): void {
    diagnostics.locationEndpointsContacted.forEach((endpoint) =>
      this.locationEndpointsContacted.add(endpoint)
    );
    diagnostics.metadataLookups.forEach((lookup) => this.metadataLookups.push(lookup));
    diagnostics.failedAttempts.forEach((lookup) => this.failedAttempts.push(lookup));
  }

  public getClientSideStats(
    endTimeUTCInMs: number = getCurrentTimestampInMs()
  ): ClientSideRequestStatistics {
    return {
      activityId: this.getActivityId(),
      requestStartTimeUTCInMs: this.requestStartTimeUTCinMs,
      requestDurationInMs: endTimeUTCInMs - this.requestStartTimeUTCinMs,
      totalRequestPayloadLengthInBytes: this.totalRequestPayloadLengthInBytes,
      totalResponsePayloadLengthInBytes: this.totalResponsePayloadLengthInBytes,
      locationEndpointsContacted: [...this.locationEndpointsContacted.values()],
      metadataDiagnostics: {
        metadataLookups: [...this.metadataLookups],
      },
      retryDiagnostics: {
        failedAttempts: [...this.failedAttempts],
      },
      gatewayStatistics: this.gaterwayStatistics,
      requestPayloadLengthInBytes: this.requestPayloadLength,
      responsePayloadLengthInBytes: this.responsePayloadLength,
    };
  }

  public recordEndpointResolution(location: string): void {
    this.locationEndpointsContacted.add(location);
  }

  public reset(): void {
    this.requestStartTimeUTCinMs = getCurrentTimestampInMs();
    this.headers = {};
    this.failedAttempts = [];
    this.metadataLookups = [];
    this.requestPayloadLength = 0;
    this.responsePayloadLength = 0;
    this.locationEndpointsContacted = new Set();
    this.totalRequestPayloadLengthInBytes = 0;
    this.totalResponsePayloadLengthInBytes = 0;
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

export async function withTracing<
  Callback extends (node: DiagnosticNodeInternal) => ReturnType<Callback>
>(
  callback: Callback,
  node: DiagnosticNodeInternal,
  type: DiagnosticNodeType,
  data: Partial<DiagnosticDataValue> = {}
): Promise<ReturnType<Callback>> {
  let childNode;
  if (getDiagnosticLevel() === DiagnosticLevel.silent) {
    childNode = node;
  } else {
    childNode = node.initializeChildNode(type, data);
  }
  const response = await callback(childNode);
  childNode.updateDuration();
  return response;
}

export async function startTracing<
  Callback extends (node: DiagnosticNodeInternal) => ReturnType<Callback>
>(
  callback: Callback,
  clientContext: ClientContext,
  type: DiagnosticNodeType = DiagnosticNodeType.CLIENT_REQUEST_NODE
): Promise<ReturnType<Callback>> {
  const diagnosticNode = new DiagnosticNodeInternal(type, null);
  const response: any = await callback(diagnosticNode);
  const diagnostic: CosmosDiagnostics = response.diagnostic;
  clientContext.recoredDiagnostics(diagnostic);
  return response;
}
