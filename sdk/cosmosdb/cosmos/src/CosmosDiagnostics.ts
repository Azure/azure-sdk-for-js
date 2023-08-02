// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CosmosDiagnosticContext, getCurrentTimestampInMs } from "./CosmosDiagnosticsContext";
import { RequestContext, Response } from "./request";
import { DiagnosticLevel, OperationType, ResourceType } from "./common";
import { getDiagnosticLevel } from "./diagnostics";
import { ClientContext } from "./ClientContext";

/**
 * This is a Cosmos Diagnostic type that holds diagnostic information during client operations. ie. Item.read().
 * The `clientSideRequestStatistics` member contains diagnostic information on operations happening in client process. ie.e
 * - metadata lookups.
 * - retries
 * - endpoints contacted.
 * - request, response payload stats.
 * Here all the server requests, apart from the final intended resource are considered as metadata calls.
 * i.e. for item.read(id), if the client makes server call to discover endpoints it would be considered
 * as metadata call.
 */
export class CosmosDiagnostics {
  public readonly clientSideRequestStatistics: ClientSideRequestStatistics;
  public readonly diagnosticNode: DiagnosticNode;

  /**
   * @internal
   */
  constructor(
    clientSideRequestStatistics: ClientSideRequestStatistics,
    diagnosticNode: DiagnosticNode
  ) {
    this.clientSideRequestStatistics = clientSideRequestStatistics;
    this.diagnosticNode = diagnosticNode;
  }
}

/**
 * This is a collection type for all client side diagnostic information.
 */
export type ClientSideRequestStatistics = {
  /**
   * This is the UTC timestamp for start of client operation.
   */
  requestStartTimeUTCInMs: number;
  /**
   * This is the duration in Milli seconds taken by client operation.
   */
  requestDurationInMs: number;
  /**
   * This is the activityId for request, made to server for fetching the requested resource. (As opposed to other potential meta data requests)
   */
  activityId: string;
  /**
   * This is the list of Location Endpoints contacted during the client operation.
   */
  locationEndpointsContacted: string[];
  /**
   * This field captures diagnostic information for retries happened during client operation.
   */
  retryDiagnostics: RetryDiagnostics;
  /**
   * This field captures diagnostic information for meta data lookups happened during client operation.
   */
  metadataDiagnostics: MetadataLookUpDiagnostics;
  /**
   * This is the payload length, in bytes made to server for the client operation requested. (This doesn't include payloads for meta data requests)
   */
  requestPayloadLengthInBytes: number;
  /**
   * This is the payload length, in bytes recieved from server for the client operation requested. (This doesn't include payloads for meta data responses)
   */
  responsePayloadLengthInBytes: number;

  gatewayStatistics?: GatewayStatistics;

  totalRequestPayloadLengthInBytes: number;
  totalResponsePayloadLengthInBytes: number;
};

// export function prepareClientOperationData(resourceType: ResourceType, operationType: OperationType): Partial<DiagnosticDataValue> {
//   return {
//     operationType,
//     resourceType
//   }
// }

function getRootNode(node: DiagnosticNodeInternal): DiagnosticNodeInternal {
  node.updateDuration();
  if (node.parent) return getRootNode(node.parent);
  else return node;
}

export class DiagnosticNodeInternal implements DiagnosticNode {
  type: DiagnosticNodeType;
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
    this.type = type;
    this.startTimeUTCInMs = startTimeUTCInMs;
    this.data = data;
    this.children = [];
    this.durationInMs = 0;
    this.parent = parent;
    this.diagnosticCtx = ctx;
  }

  public updateDuration(endTimeUTCInMs: number = getCurrentTimestampInMs()) {
    this.durationInMs = endTimeUTCInMs - this.startTimeUTCInMs;
  }

  public addData(
    data: Partial<DiagnosticDataValue>,
    msg?: string,
    level: DiagnosticLevel = getDiagnosticLevel()
  ) {
    if (level !== DiagnosticLevel.silent) {
      this.data = { ...this.data, ...data };
      this.updateDuration();
      this.addLog(msg);
    }
  }

  public addLog(msg: string) {
    if (!this.data.log) {
      this.data.log = [];
    }
    this.data.log.push(msg);
  }

  public addChildNode(child: DiagnosticNodeInternal): DiagnosticNodeInternal {
    this.diagnosticCtx.mergeDiagnostics(child.diagnosticCtx);
    this.children.push(child);
    return child;
  }

  public initializeChildNode(
    type: DiagnosticNodeType,
    data: Partial<DiagnosticDataValue> = {}
  ): DiagnosticNodeInternal {
    const child = new DiagnosticNodeInternal(
      type,
      this,
      data,
      getCurrentTimestampInMs(),
      this.diagnosticCtx
    );
    this.children.push(child);
    return child;
  }

  public recordGatewayStatistics(request: RequestContext, response: Response<any>) {
    this.diagnosticCtx.recordGatewayStatistics(request, this, response);
  }

  public recordQueryResult(resources: any) {
    const previousCount = this.data.queryRecordsRead ?? 0;
    if (Array.isArray(resources)) {
      this.data.queryRecordsRead = previousCount + resources.length;
    }
  }

  public recordEndpointResolution(location: string): void {
    this.addData({ selectedLocation: location });
    this.diagnosticCtx.recordEndpointResolution(location);
  }

  public recordFailedAttempt(
    retryAttemptNumber: number,
    statusCode: number,
    substatusCode: number
  ): void {
    this.addData({ failedAttempty: true });
    this.diagnosticCtx.recordFailedAttempt(this, retryAttemptNumber, statusCode, substatusCode);
  }

  public recordMetaDataLookup(activityId: string, metaDataType: MetadataLookUpType): void {
    this.diagnosticCtx.recordMetaDataLookup(activityId, this.startTimeUTCInMs, metaDataType);
  }

  public mergeContext(ctx: CosmosDiagnosticContext) {
    this.diagnosticCtx.mergeDiagnostics(ctx);
  }

  public getParent(): DiagnosticNodeInternal {
    return this.parent;
  }

  public toDiagnosticNode(): DiagnosticNode {
    return {
      type: this.type,
      children: this.children.map((child) => child.toDiagnosticNode()),
      data: this.data,
      startTimeUTCInMs: this.startTimeUTCInMs,
      durationInMs: this.durationInMs,
    };
  }

  public toDiagnostic(clientctx?: ClientContext): CosmosDiagnostics {
    const rootNode = getRootNode(this);
    const cosmosDiagnostic = new CosmosDiagnostics(
      this.diagnosticCtx.getClientSideStats(),
      rootNode.toDiagnosticNode()
    );
    if (clientctx) clientctx.recoredDiagnostics(cosmosDiagnostic);
    return cosmosDiagnostic;
  }
}

export type DiagnosticDataValue = {
  selectedLocation: string;
  activityId: string;
  requestAttempNumber: number;
  requestPayloadSize: number;
  responsePayloadSize: number;
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
};

export interface DiagnosticNode {
  type: DiagnosticNodeType;
  children: DiagnosticNode[];
  data: Partial<DiagnosticDataValue>;
  startTimeUTCInMs: number;
  durationInMs: number;
}

export enum DiagnosticNodeType {
  CLIENT_REQUEST_NODE = "CLIENT_REQUEST_NODE", //Top most node representing client operations.
  METADATA_REQUEST_NODE = "METADATA_REQUEST_NODE", //Node representing a metadata request.
  HTTP_REQUEST = "HTTP_REQUEST",
  BATCH_REQUEST = "BATCH_REQUEST",
  PARALLEL_QUERY_NODE = "PARALLEL_QUERY_NODE",
  DEFAULT_QUERY_NODE = "DEFAULT_QUERY_NODE",
  QUERY_REPAIR_NODE = "QUERY_REPAIR_NODE",
  BACKGROUND_REFRESH_THREAD = "BACKGROUND_REFRESH_THREAD",
  REQUEST_ATTEMPTS = "REQUEST_ATTEMPTS",
}

export function markNodeFinished(
  node: DiagnosticNodeInternal,
  endTimeUTCInMs: number = getCurrentTimestampInMs()
) {
  node.durationInMs = endTimeUTCInMs - node.startTimeUTCInMs;
}

/**
 * This type contains diagnostic information regarding all metadata request to server during an CosmosDB client operation.
 */
export type MetadataLookUpDiagnostics = {
  metadataLookups: MetadataLookUpDiagnostic[];
};

/**
 * This type captures diagnostic information regarding retries attempt during an CosmosDB client operation.
 */
export type RetryDiagnostics = {
  failedAttempts: FailedRequestAttemptDiagnostic[];
};

export type GatewayStatistics = {
  sessionToken?: string;
  operationType?: OperationType;
  resourceType?: ResourceType;
  statusCode?: number;
  subStatusCode?: number;
  requestCharge?: number;
  startTimeUTCInMs: number;
  durationInMs: number;
  partitionKeyRangeId?: string;
  exceptionMessage?: string;
  exceptionResponseHeaders?: String;
};

/**
 * This type contains diagnostic information regarding a single metadata request to server.
 */
export interface MetadataLookUpDiagnostic {
  startTimeUTCInMs: number;
  durationInMs: number;
  metaDataType: MetadataLookUpType;
  activityId: string;
}

/**
 * This type captures diagnostic information regarding a failed request to server api.
 */
export interface FailedRequestAttemptDiagnostic {
  attemptNumber: number;
  startTimeUTCInMs: number;
  durationInMs: number;
  statusCode: number;
  substatusCode?: number;
}

/**
 * This is enum for Type of Metadata lookups possible.
 */

export enum MetadataLookUpType {
  PartitionKeyRangeLookUp = "PARTITION_KEY_RANGE_LOOK_UP",
  ServiceEndpointResolution = "SERVICE_ENDPOINT_RESOLUTION",
  DatabaseAccountLookUp = "DATABASE_ACCOUNT_LOOK_UP",
  QueryDataCall = "QUERY_DATA_CALL",
}

/**
 * @hidden
 * Utility function to create an Empty CosmosDiagnostic object.
 * @returns
 */
export function getEmptyCosmosDiagnostics(): CosmosDiagnostics {
  return new CosmosDiagnostics(
    {
      activityId: "",
      requestDurationInMs: 0,
      requestStartTimeUTCInMs: getCurrentTimestampInMs(),
      totalRequestPayloadLengthInBytes: 0,
      totalResponsePayloadLengthInBytes: 0,
      locationEndpointsContacted: [],
      retryDiagnostics: {
        failedAttempts: [],
      },
      metadataDiagnostics: {
        metadataLookups: [],
      },
      requestPayloadLengthInBytes: 0,
      responsePayloadLengthInBytes: 0,
    },
    {
      type: DiagnosticNodeType.CLIENT_REQUEST_NODE,
      children: [],
      data: {},
      startTimeUTCInMs: getCurrentTimestampInMs(),
      durationInMs: 0,
    }
  );
}

export function addMetadataChildNode(
  node: DiagnosticNodeInternal,
  metadatOperationType: MetadataLookUpType
): DiagnosticNodeInternal {
  return node.initializeChildNode(DiagnosticNodeType.METADATA_REQUEST_NODE, {
    metadatOperationType,
  });
}
