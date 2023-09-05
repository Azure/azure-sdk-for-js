// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CosmosDiagnosticContext } from "./CosmosDiagnosticsContext";
import { RequestContext } from "../request";
import { v4 } from "uuid";
import {
  DiagnosticNode,
  MetadataLookUpType,
  CosmosDiagnostics,
  getRootNode,
  ClientConfigDiagnostic,
} from "../CosmosDiagnostics";
import { getCurrentTimestampInMs } from "../utils/time";
import { getDiagnosticLevel } from "./index";
import { CosmosDbDiagnosticLevel } from "./CosmosDbDiagnosticLevel";
import { CosmosHeaders } from "../queryExecutionContext/CosmosHeaders";
import { HttpHeaders, PipelineResponse } from "@azure/core-rest-pipeline";
import { Constants, OperationType, ResourceType } from "../common";
import { allowTracing } from "./diagnosticLevelComparator";

/**
 * @hidden
 * This is Internal Representation for DiagnosticNode. It contains useful helper functions to collect
 * diagnostic information throughout the lifetime of Diagnostic session.
 * The functions toDiagnosticNode() & toDiagnostic() are given to convert it to public facing counterpart.
 */
export class DiagnosticNodeInternal implements DiagnosticNode {
  id: string;
  nodeType: DiagnosticNodeType;
  parent: DiagnosticNodeInternal;
  children: DiagnosticNodeInternal[];
  data: Partial<DiagnosticDataValue>;
  startTimeUTCInMs: number;
  durationInMs: number;
  diagnosticCtx: CosmosDiagnosticContext;
  constructor(
    type: DiagnosticNodeType,
    parent: DiagnosticNodeInternal,
    data: Partial<DiagnosticDataValue> = {},
    startTimeUTCInMs: number = getCurrentTimestampInMs(),
    ctx: CosmosDiagnosticContext = new CosmosDiagnosticContext()
  ) {
    this.id = v4();
    this.nodeType = type;
    this.startTimeUTCInMs = startTimeUTCInMs;
    this.data = data;
    this.children = [];
    this.durationInMs = 0;
    this.parent = parent;
    this.diagnosticCtx = ctx;
  }

  private addLog(msg: string): void {
    if (!this.data.log) {
      this.data.log = [];
    }
    this.data.log.push(msg);
  }

  private sanitizeHeaders(headers?: CosmosHeaders | HttpHeaders): CosmosHeaders | HttpHeaders {
    return headers;
  }

  /**
   * Updated durationInMs for node, based on endTimeUTCInMs provided.
   */
  public updateTimestamp(endTimeUTCInMs: number = getCurrentTimestampInMs()): void {
    this.durationInMs = endTimeUTCInMs - this.startTimeUTCInMs;
  }

  public recordSuccessfulNetworkCall(
    startTimeUTCInMs: number,
    requestContext: RequestContext,
    pipelineResponse: PipelineResponse,
    substatus: number,
    url: string
  ): void {
    const responseHeaders = pipelineResponse.headers.toJSON();
    const gatewayRequest = {
      activityId: responseHeaders[Constants.HttpHeaders.ActivityId],
      startTimeUTCInMs,
      durationInMs: getCurrentTimestampInMs() - startTimeUTCInMs,
      statusCode: pipelineResponse.status,
      subStatusCode: substatus,
      requestPayloadLengthInBytes: calculateRequestPayloadLength(requestContext),
      responsePayloadLengthInBytes: calculateResponsePayloadLength(pipelineResponse),
      operationType: requestContext.operationType,
      resourceType: requestContext.resourceType,
      partitionKeyRangeId: requestContext.partitionKeyRangeId,
    };
    let requestData: any = {
      OperationType: gatewayRequest.operationType,
      resourceType: gatewayRequest.resourceType,
      requestPayloadLengthInBytes: gatewayRequest.requestPayloadLengthInBytes,
    };
    this.addData({
      requestPayloadLengthInBytes: gatewayRequest.requestPayloadLengthInBytes,
      responsePayloadLengthInBytes: gatewayRequest.responsePayloadLengthInBytes,
      startTimeUTCInMs: gatewayRequest.startTimeUTCInMs,
      durationInMs: gatewayRequest.durationInMs,
    });

    if (allowTracing(CosmosDbDiagnosticLevel.debugUnsafe)) {
      requestData = {
        ...requestData,
        headers: this.sanitizeHeaders(requestContext.headers),
        requstBody: requestContext.body,
        responseBody: pipelineResponse.bodyAsText,
        url: url,
      };
      this.addData({
        requestData,
      });
    }
    this.diagnosticCtx.recordNetworkCall(gatewayRequest);
  }

  public recordFailedNetworkCall(
    startTimeUTCInMs: number,
    requestContext: RequestContext,
    retryAttemptNumber: number,
    statusCode: number,
    substatusCode: number,
    responseHeaders: CosmosHeaders
  ): void {
    this.addData({ failedAttempty: true });
    this.diagnosticCtx.recordFailedAttempt(
      {
        activityId: responseHeaders[Constants.HttpHeaders.ActivityId] as string,
        startTimeUTCInMs,
        durationInMs: getCurrentTimestampInMs() - startTimeUTCInMs,
        statusCode,
        subStatusCode: substatusCode,
        requestPayloadLengthInBytes: calculateRequestPayloadLength(requestContext),
        responsePayloadLengthInBytes: 0,
        operationType: requestContext.operationType,
        resourceType: requestContext.resourceType,
      },
      retryAttemptNumber
    );
  }

  public recordEndpointResolution(location: string): void {
    this.addData({ selectedLocation: location });
    this.diagnosticCtx.recordEndpointResolution(location);
  }

  public addData(
    data: Partial<DiagnosticDataValue>,
    msg?: string,
    level: CosmosDbDiagnosticLevel = getDiagnosticLevel()
  ): void {
    if (level !== CosmosDbDiagnosticLevel.info) {
      this.data = { ...this.data, ...data };
      if (msg) {
        this.addLog(msg);
      }
    }
  }

  /**
   * Merge given DiagnosticNodeInternal's context to current node's DiagnosticContext, Treating GatewayRequests of
   * given DiagnosticContext, as metadata requests. Given DiagnosticNodeInternal becomes a child of this node.
   */
  public addChildNode(
    child: DiagnosticNodeInternal,
    metadataType?: MetadataLookUpType
  ): DiagnosticNodeInternal {
    this.diagnosticCtx.mergeDiagnostics(child.diagnosticCtx, metadataType);
    child.parent = this;
    this.children.push(child);
    return child;
  }

  public initializeChildNode(
    type: DiagnosticNodeType,
    level: CosmosDbDiagnosticLevel,
    data: Partial<DiagnosticDataValue> = {}
  ): DiagnosticNodeInternal {
    if (allowTracing(level)) {
      const child = new DiagnosticNodeInternal(
        type,
        this,
        data,
        getCurrentTimestampInMs(),
        this.diagnosticCtx
      );
      this.children.push(child);
      return child;
    } else {
      return this;
    }
  }

  public recordQueryResult(resources: unknown, level: CosmosDbDiagnosticLevel): void {
    if (allowTracing(level)) {
      const previousCount = this.data.queryRecordsRead ?? 0;
      if (Array.isArray(resources)) {
        this.data.queryRecordsRead = previousCount + resources.length;
      }
    }
  }

  // Currently Unused
  public getParent(): DiagnosticNodeInternal {
    return this.parent;
  }

  // Convert DiagnosticNodeInternal (internal representation) to DiagnosticNode (public, sanitized representation)
  public toDiagnosticNode(): DiagnosticNode {
    return {
      id: this.id,
      nodeType: this.nodeType,
      children: this.children.map((child) => child.toDiagnosticNode()),
      data: this.data,
      startTimeUTCInMs: this.startTimeUTCInMs,
      durationInMs: this.durationInMs,
    };
  }

  // Convert to CosmosDiagnostics
  public toDiagnostic(clientConfig?: ClientConfigDiagnostic): CosmosDiagnostics {
    const rootNode = getRootNode(this);
    const cosmosDiagnostic = new CosmosDiagnostics(
      this.diagnosticCtx.getClientSideStats(),
      rootNode.toDiagnosticNode(),
      clientConfig
    );
    return cosmosDiagnostic;
  }
}

/**
 * @hidden
 */
export type DiagnosticDataValue = {
  selectedLocation: string;
  activityId: string;
  requestAttempNumber: number;
  requestPayloadLengthInBytes: number;
  responsePayloadLengthInBytes: number;
  responseStatus: number;
  readFromCache: boolean;
  operationType: OperationType;
  metadatOperationType: MetadataLookUpType;
  resourceType: ResourceType;
  failedAttempty: boolean;
  successfulRetryPolicy: string;
  partitionKeyRangeId: string;
  stateful: boolean;
  queryRecordsRead: number;
  queryMethodIdentifier: string;
  log: string[];
  failure: boolean;
  startTimeUTCInMs: number;
  durationInMs: number;
  requestData: Partial<{
    requestPayloadLengthInBytes: number;
    responsePayloadLengthInBytes: number;
    operationType: OperationType;
    resourceType: ResourceType;
    headers: CosmosHeaders;
    requstBody: any;
    responseBody: any;
    url: string;
  }>;
};

/**
 * @hidden
 */
export enum DiagnosticNodeType {
  CLIENT_REQUEST_NODE = "CLIENT_REQUEST_NODE", // Top most node representing client operations.
  METADATA_REQUEST_NODE = "METADATA_REQUEST_NODE", // Node representing a metadata request.
  HTTP_REQUEST = "HTTP_REQUEST", // Node representing REST call to backend services.
  BATCH_REQUEST = "BATCH_REQUEST", // Node representing batch request.
  PARALLEL_QUERY_NODE = "PARALLEL_QUERY_NODE", // Node representing parallel query execution.
  DEFAULT_QUERY_NODE = "DEFAULT_QUERY_NODE", // Node representing default query execution.
  QUERY_REPAIR_NODE = "QUERY_REPAIR_NODE", // Node representing query repair.
  BACKGROUND_REFRESH_THREAD = "BACKGROUND_REFRESH_THREAD", // Node representing background refresh.
  REQUEST_ATTEMPTS = "REQUEST_ATTEMPTS", // Node representing request attempts.
}
function calculateResponsePayloadLength(response: PipelineResponse) {
  return response?.bodyAsText?.length || 0;
}

function calculateRequestPayloadLength(requestContext: RequestContext) {
  return requestContext.body ? requestContext.body.length : 0;
}
