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
import { CosmosDbDiagnosticLevel } from "./CosmosDbDiagnosticLevel";
import { CosmosHeaders } from "../queryExecutionContext/CosmosHeaders";
import { HttpHeaders, PipelineResponse } from "@azure/core-rest-pipeline";
import { Constants, OperationType, ResourceType, prepareURL } from "../common";
import { allowTracing } from "./diagnosticLevelComparator";

/**
 * @hidden
 * This is Internal Representation for DiagnosticNode. It contains useful helper functions to collect
 * diagnostic information throughout the lifetime of Diagnostic session.
 * The functions toDiagnosticNode() & toDiagnostic() are given to convert it to public facing counterpart.
 */
export class DiagnosticNodeInternal implements DiagnosticNode {
  public id: string;
  public nodeType: DiagnosticNodeType;
  public parent: DiagnosticNodeInternal;
  public children: DiagnosticNodeInternal[];
  public data: Partial<DiagnosticDataValue>;
  public startTimeUTCInMs: number;
  public durationInMs: number;
  public diagnosticLevel: CosmosDbDiagnosticLevel;
  private diagnosticCtx: CosmosDiagnosticContext;

  /**
   * @internal
   */
  constructor(
    diagnosticLevel: CosmosDbDiagnosticLevel,
    type: DiagnosticNodeType,
    parent: DiagnosticNodeInternal,
    data: Partial<DiagnosticDataValue> = {},
    startTimeUTCInMs: number = getCurrentTimestampInMs(),
    ctx: CosmosDiagnosticContext = new CosmosDiagnosticContext(),
  ) {
    this.id = v4();
    this.nodeType = type;
    this.startTimeUTCInMs = startTimeUTCInMs;
    this.data = data;
    this.children = [];
    this.durationInMs = 0;
    this.parent = parent;
    this.diagnosticCtx = ctx;
    this.diagnosticLevel = diagnosticLevel;
  }

  /**
   * @internal
   */
  private addLog(msg: string): void {
    if (!this.data.log) {
      this.data.log = [];
    }
    this.data.log.push(msg);
  }

  /**
   * @internal
   */
  private sanitizeHeaders(headers?: CosmosHeaders | HttpHeaders): CosmosHeaders | HttpHeaders {
    return headers;
  }

  /**
   * Updated durationInMs for node, based on endTimeUTCInMs provided.
   * @internal
   */
  public updateTimestamp(endTimeUTCInMs: number = getCurrentTimestampInMs()): void {
    this.durationInMs = endTimeUTCInMs - this.startTimeUTCInMs;
  }

  /**
   * @internal
   */
  public recordSuccessfulNetworkCall(
    startTimeUTCInMs: number,
    requestContext: RequestContext,
    pipelineResponse: PipelineResponse,
    substatus: number,
    url: string,
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

    if (allowTracing(CosmosDbDiagnosticLevel.debugUnsafe, this.diagnosticLevel)) {
      requestData = {
        ...requestData,
        headers: this.sanitizeHeaders(requestContext.headers),
        requestBody: requestContext.body,
        responseBody: pipelineResponse.bodyAsText,
        url: url,
      };
    }
    this.addData({
      requestPayloadLengthInBytes: gatewayRequest.requestPayloadLengthInBytes,
      responsePayloadLengthInBytes: gatewayRequest.responsePayloadLengthInBytes,
      startTimeUTCInMs: gatewayRequest.startTimeUTCInMs,
      durationInMs: gatewayRequest.durationInMs,
      requestData,
    });
    this.diagnosticCtx.recordNetworkCall(gatewayRequest);
  }

  /**
   * @internal
   */
  public recordFailedNetworkCall(
    startTimeUTCInMs: number,
    requestContext: RequestContext,
    retryAttemptNumber: number,
    statusCode: number,
    substatusCode: number,
    responseHeaders: CosmosHeaders,
  ): void {
    this.addData({ failedAttempty: true });
    const requestPayloadLengthInBytes = calculateRequestPayloadLength(requestContext);
    this.diagnosticCtx.recordFailedAttempt(
      {
        activityId: responseHeaders[Constants.HttpHeaders.ActivityId] as string,
        startTimeUTCInMs,
        durationInMs: getCurrentTimestampInMs() - startTimeUTCInMs,
        statusCode,
        subStatusCode: substatusCode,
        requestPayloadLengthInBytes,
        responsePayloadLengthInBytes: 0,
        operationType: requestContext.operationType,
        resourceType: requestContext.resourceType,
      },
      retryAttemptNumber,
    );
    let requestData: any = {
      OperationType: requestContext.operationType,
      resourceType: requestContext.resourceType,
      requestPayloadLengthInBytes,
    };
    if (allowTracing(CosmosDbDiagnosticLevel.debugUnsafe, this.diagnosticLevel)) {
      requestData = {
        ...requestData,
        headers: this.sanitizeHeaders(requestContext.headers),
        requestBody: requestContext.body,
        url: prepareURL(requestContext.endpoint, requestContext.path),
      };
    }
    this.addData({
      failedAttempty: true,
      requestData,
    });
  }

  /**
   * @internal
   */
  public recordEndpointResolution(location: string): void {
    this.addData({ selectedLocation: location });
    this.diagnosticCtx.recordEndpointResolution(location);
  }

  /**
   * @internal
   */
  public addData(
    data: Partial<DiagnosticDataValue>,
    msg?: string,
    level: CosmosDbDiagnosticLevel = this.diagnosticLevel,
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
   * @internal
   */
  public addChildNode(
    child: DiagnosticNodeInternal,
    level: CosmosDbDiagnosticLevel,
    metadataType?: MetadataLookUpType,
  ): DiagnosticNodeInternal {
    this.diagnosticCtx.mergeDiagnostics(child.diagnosticCtx, metadataType);
    if (allowTracing(level, this.diagnosticLevel)) {
      child.parent = this;
      this.children.push(child);
    }
    return child;
  }

  /**
   * @internal
   */
  public initializeChildNode(
    type: DiagnosticNodeType,
    level: CosmosDbDiagnosticLevel,
    data: Partial<DiagnosticDataValue> = {},
  ): DiagnosticNodeInternal {
    if (allowTracing(level, this.diagnosticLevel)) {
      const child = new DiagnosticNodeInternal(
        this.diagnosticLevel,
        type,
        this,
        data,
        getCurrentTimestampInMs(),
        this.diagnosticCtx,
      );
      this.children.push(child);
      return child;
    } else {
      return this;
    }
  }

  /**
   * @internal
   */
  public recordQueryResult(resources: unknown, level: CosmosDbDiagnosticLevel): void {
    if (allowTracing(level, this.diagnosticLevel)) {
      const previousCount = this.data.queryRecordsRead ?? 0;
      if (Array.isArray(resources)) {
        this.data.queryRecordsRead = previousCount + resources.length;
      }
    }
  }

  /**
   * Convert DiagnosticNodeInternal (internal representation) to DiagnosticNode (public, sanitized representation)
   * @internal
   */
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

  /**
   * Convert to CosmosDiagnostics
   * @internal
   */
  public toDiagnostic(clientConfigDiagnostic: ClientConfigDiagnostic): CosmosDiagnostics {
    const rootNode = getRootNode(this);
    const diagnostiNode = allowTracing(CosmosDbDiagnosticLevel.debug, this.diagnosticLevel)
      ? rootNode.toDiagnosticNode()
      : undefined;
    const clientConfig = allowTracing(CosmosDbDiagnosticLevel.debug, this.diagnosticLevel)
      ? clientConfigDiagnostic
      : undefined;
    const cosmosDiagnostic = new CosmosDiagnostics(
      this.diagnosticCtx.getClientSideStats(),
      diagnostiNode,
      clientConfig,
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
    requestBody: any;
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
