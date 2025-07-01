// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PartitionKeyRange } from "./client/Container/PartitionKeyRange.js";
import type { Resource } from "./client/Resource.js";
import { HTTPMethod, ResourceType } from "./common/constants.js";
import { parseLink } from "./common/helper.js";
import type { PartitionKey } from "./documents/index.js";
import { DatabaseAccount } from "./documents/index.js";
import type { SqlQuerySpec } from "./queryExecutionContext/index.js";
import { QueryIterator } from "./queryIterator.js";
import type { FeedOptions, RequestOptions, Response } from "./request/index.js";
import type { PartitionedQueryExecutionInfo } from "./request/ErrorResponse.js";
import { SessionContainer } from "./session/sessionContainer.js";
import type { SessionContext } from "./session/SessionContext.js";
import type { BulkOptions } from "./utils/batch.js";
import type { ClientConfigDiagnostic, CosmosDiagnostics } from "./CosmosDiagnostics.js";
import type { DiagnosticNodeInternal } from "./diagnostics/DiagnosticNodeInternal.js";
import type { DiagnosticWriter } from "./diagnostics/DiagnosticWriter.js";
import { LogDiagnosticWriter, NoOpDiagnosticWriter } from "./diagnostics/DiagnosticWriter.js";
import type { DiagnosticFormatter } from "./diagnostics/DiagnosticFormatter.js";
import { DefaultDiagnosticFormatter } from "./diagnostics/DiagnosticFormatter.js";
import { CosmosDbDiagnosticLevel } from "./diagnostics/CosmosDbDiagnosticLevel.js";
import type { RetryOptions } from "./retry/retryOptions.js";
import type { ClientContextInternal } from "./ClientContextInternal.js";

/**
 * @hidden
 * @hidden
 */
export class ClientContext {
  private readonly sessionContainer: SessionContainer;
  private diagnosticWriter: DiagnosticWriter;
  private diagnosticFormatter: DiagnosticFormatter;
  public partitionKeyDefinitionCache: { [containerUrl: string]: any }; // TODO: PartitionKeyDefinitionCache
  /** boolean flag to support operations with client-side encryption */
  public enableEncryption: boolean = false;
  private clientContextInternal: ClientContextInternal;
  public constructor(public diagnosticLevel: CosmosDbDiagnosticLevel) {
    this.sessionContainer = new SessionContainer();
    this.partitionKeyDefinitionCache = {};
    this.initializeDiagnosticSettings(diagnosticLevel);
  }

  /** @hidden */
  public async read<T>({
    path,
    resourceType,
    resourceId,
    options = {},
    partitionKey,
    diagnosticNode,
  }: {
    path: string;
    resourceType: ResourceType;
    resourceId: string;
    options?: RequestOptions;
    partitionKey?: PartitionKey;
    diagnosticNode: DiagnosticNodeInternal;
  }): Promise<Response<T & Resource>> {
    return this.clientContextInternal.read<T>({
      path,
      resourceType,
      resourceId,
      options,
      partitionKey,
      diagnosticNode,
    });
  }

  public async queryFeed<T>({
    path,
    resourceType,
    resourceId,
    resultFn,
    query,
    options,
    diagnosticNode,
    partitionKeyRangeId,
    partitionKey,
    startEpk,
    endEpk,
    correlatedActivityId,
  }: {
    path: string;
    resourceType: ResourceType;
    resourceId: string;
    resultFn: (result: { [key: string]: any }) => any[];
    query: SqlQuerySpec | string;
    options: FeedOptions;
    diagnosticNode: DiagnosticNodeInternal;
    partitionKeyRangeId?: string;
    partitionKey?: PartitionKey;
    startEpk?: string | undefined;
    endEpk?: string | undefined;
    correlatedActivityId?: string;
  }): Promise<Response<T & Resource>> {
    return this.clientContextInternal.queryFeed<T>({
      path,
      resourceType,
      resourceId,
      resultFn,
      query,
      options,
      diagnosticNode,
      partitionKeyRangeId,
      partitionKey,
      startEpk,
      endEpk,
      correlatedActivityId,
    });
  }

  public async getQueryPlan(
    path: string,
    resourceType: ResourceType,
    resourceId: string,
    query: SqlQuerySpec | string,
    options: FeedOptions = {},
    diagnosticNode: DiagnosticNodeInternal,
    correlatedActivityId?: string,
  ): Promise<Response<PartitionedQueryExecutionInfo>> {
    return this.clientContextInternal.getQueryPlan(
      path,
      resourceType,
      resourceId,
      query,
      options,
      diagnosticNode,
      correlatedActivityId,
    );
  }

  public queryPartitionKeyRanges(
    collectionLink: string,
    query?: string | SqlQuerySpec,
    options?: FeedOptions,
  ): QueryIterator<PartitionKeyRange> {
    return this.clientContextInternal.queryPartitionKeyRanges(collectionLink, query, options);
  }

  public async delete<T>({
    path,
    resourceType,
    resourceId,
    options = {},
    partitionKey,
    method = HTTPMethod.delete,
    diagnosticNode,
  }: {
    path: string;
    resourceType: ResourceType;
    resourceId: string;
    options?: RequestOptions;
    partitionKey?: PartitionKey;
    method?: HTTPMethod;
    diagnosticNode: DiagnosticNodeInternal;
  }): Promise<Response<T & Resource>> {
    return this.clientContextInternal.delete<T>({
      path,
      resourceType,
      resourceId,
      options,
      partitionKey,
      method,
      diagnosticNode,
    });
  }

  public async patch<T>({
    body,
    path,
    resourceType,
    resourceId,
    options = {},
    partitionKey,
    diagnosticNode,
  }: {
    body: any;
    path: string;
    resourceType: ResourceType;
    resourceId: string;
    options?: RequestOptions;
    partitionKey?: PartitionKey;
    diagnosticNode: DiagnosticNodeInternal;
  }): Promise<Response<T & Resource>> {
    return this.clientContextInternal.patch<T>({
      body,
      path,
      resourceType,
      resourceId,
      options,
      partitionKey,
      diagnosticNode,
    });
  }

  public async create<T, U = T>({
    body,
    path,
    resourceType,
    resourceId,
    diagnosticNode,
    options = {},
    partitionKey,
  }: {
    body: T;
    path: string;
    resourceType: ResourceType;
    resourceId: string;
    diagnosticNode: DiagnosticNodeInternal;
    options?: RequestOptions;
    partitionKey?: PartitionKey;
  }): Promise<Response<T & U & Resource>> {
    return this.clientContextInternal.create<T, U>({
      body,
      path,
      resourceType,
      resourceId,
      diagnosticNode,
      options,
      partitionKey,
    });
  }

  public async replace<T>({
    body,
    path,
    resourceType,
    resourceId,
    options = {},
    partitionKey,
    diagnosticNode,
  }: {
    body: any;
    path: string;
    resourceType: ResourceType;
    resourceId: string;
    options?: RequestOptions;
    partitionKey?: PartitionKey;
    diagnosticNode: DiagnosticNodeInternal;
  }): Promise<Response<T & Resource>> {
    return this.clientContextInternal.replace<T>({
      body,
      path,
      resourceType,
      resourceId,
      options,
      partitionKey,
      diagnosticNode,
    });
  }

  public async upsert<T, U = T>({
    body,
    path,
    resourceType,
    resourceId,
    options = {},
    partitionKey,
    diagnosticNode,
  }: {
    body: T;
    path: string;
    resourceType: ResourceType;
    resourceId: string;
    options?: RequestOptions;
    partitionKey?: PartitionKey;
    diagnosticNode: DiagnosticNodeInternal;
  }): Promise<Response<T & U & Resource>> {
    return this.clientContextInternal.upsert<T, U>({
      body,
      path,
      resourceType,
      resourceId,
      options,
      partitionKey,
      diagnosticNode,
    });
  }

  public async execute<T>({
    sprocLink,
    params,
    options = {},
    partitionKey,
    diagnosticNode,
  }: {
    sprocLink: string;
    params?: any[];
    options?: RequestOptions;
    partitionKey?: PartitionKey;
    diagnosticNode: DiagnosticNodeInternal;
  }): Promise<Response<T>> {
    return this.clientContextInternal.execute<T>({
      sprocLink,
      params,
      options,
      partitionKey,
      diagnosticNode,
    });
  }

  /**
   * Gets the Database account information.
   * @param options - `urlConnection` in the options is the endpoint url whose database account needs to be retrieved.
   * If not present, current client's url will be used.
   */
  public async getDatabaseAccount(
    diagnosticNode: DiagnosticNodeInternal,
    options: RequestOptions = {},
  ): Promise<Response<DatabaseAccount>> {
    return this.clientContextInternal.getDatabaseAccount(diagnosticNode, options);
  }

  public getWriteEndpoint(diagnosticNode: DiagnosticNodeInternal): Promise<string> {
    return this.clientContextInternal.getWriteEndpoint(diagnosticNode);
  }

  public getReadEndpoint(diagnosticNode: DiagnosticNodeInternal): Promise<string> {
    return this.clientContextInternal.getReadEndpoint(diagnosticNode);
  }

  public getWriteEndpoints(): Promise<readonly string[]> {
    return this.clientContextInternal.getWriteEndpoints();
  }

  public getReadEndpoints(): Promise<readonly string[]> {
    return this.clientContextInternal.getReadEndpoints();
  }

  public async batch<T>({
    body,
    path,
    partitionKey,
    resourceId,
    options = {},
    diagnosticNode,
  }: {
    body: T;
    path: string;
    partitionKey: PartitionKey;
    resourceId: string;
    options?: RequestOptions;
    diagnosticNode: DiagnosticNodeInternal;
  }): Promise<Response<any>> {
    return this.clientContextInternal.batch<T>({
      body,
      path,
      partitionKey,
      resourceId,
      options,
      diagnosticNode,
    });
  }

  public async bulk<T>({
    body,
    path,
    partitionKeyRangeId,
    resourceId,
    bulkOptions = {},
    options = {},
    diagnosticNode,
  }: {
    body: T;
    path: string;
    partitionKeyRangeId: string;
    resourceId: string;
    bulkOptions?: BulkOptions;
    options?: RequestOptions;
    diagnosticNode: DiagnosticNodeInternal;
  }): Promise<Response<any>> {
    return this.clientContextInternal.bulk<T>({
      body,
      path,
      partitionKeyRangeId,
      resourceId,
      bulkOptions,
      options,
      diagnosticNode,
    });
  }

  public clearSessionToken(path: string): void {
    const request = this.getSessionParams(path);
    this.sessionContainer.remove(request);
  }

  public recordDiagnostics(diagnostic: CosmosDiagnostics): void {
    const formatted = this.diagnosticFormatter.format(diagnostic);
    this.diagnosticWriter.write(formatted);
  }

  public initializeDiagnosticSettings(diagnosticLevel: CosmosDbDiagnosticLevel): void {
    this.diagnosticFormatter = new DefaultDiagnosticFormatter();
    switch (diagnosticLevel) {
      case CosmosDbDiagnosticLevel.info:
        this.diagnosticWriter = new NoOpDiagnosticWriter();
        break;
      default:
        this.diagnosticWriter = new LogDiagnosticWriter();
    }
  }

  // TODO: move
  private getSessionParams(resourceLink: string): SessionContext {
    const resourceId: string = null;
    let resourceAddress: string = null;
    const parserOutput = parseLink(resourceLink);

    resourceAddress = parserOutput.objectBody.self;

    const resourceType = parserOutput.type;
    return {
      resourceId,
      resourceAddress,
      resourceType,
      isNameBased: true,
    };
  }

  public getClientConfig(): ClientConfigDiagnostic {
    return this.clientContextInternal.getClientConfig();
  }

  /**
   * @internal
   */
  public refreshUserAgent(hostFramework: string): void {
    return this.clientContextInternal.refreshUserAgent(hostFramework);
  }

  /**
   * @internal
   */
  public getRetryOptions(): RetryOptions {
    return this.clientContextInternal.getRetryOptions();
  }
}
