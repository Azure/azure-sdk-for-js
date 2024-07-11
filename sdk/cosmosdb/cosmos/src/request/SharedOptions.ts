// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="dom" />
import { PriorityLevel } from "../documents/PriorityLevel";
import { CosmosHeaders } from "../index";

/**
 * Options that can be specified for a requested issued to the Azure Cosmos DB servers.=
 */
export interface SharedOptions {
  /** Enables/disables getting document container quota related stats for document container read requests. */
  sessionToken?: string;
  /** (Advanced use case) Initial headers to start with when sending requests to Cosmos */
  initialHeaders?: CosmosHeaders;
  /**
   * abortSignal to pass to all underlying network requests created by this method call. See https://developer.mozilla.org/en-US/docs/Web/API/AbortController
   * @example Cancel a read request
   * ```typescript
   * const controller = new AbortController()
   * const {result: item} = await items.query('SELECT * from c', { abortSignal: controller.signal});
   * controller.abort()
   * ```
   */
  abortSignal?: AbortSignal;
  /**
   * Sets the staleness value associated with the request in the Azure CosmosDB service. For requests where the {@link
   * com.azure.cosmos.ConsistencyLevel} is {@link com.azure.cosmos.ConsistencyLevel#EVENTUAL}  or {@link com.azure.cosmos.ConsistencyLevel#SESSION}, responses from the
   * integrated cache are guaranteed to be no staler than value indicated by this maxIntegratedCacheStaleness. When the
   * consistency level is not set, this property is ignored.
   *
   * <p>Default value is null</p>
   *
   * <p>Cache Staleness is supported in milliseconds granularity. Anything smaller than milliseconds will be ignored.</p>
   */
  maxIntegratedCacheStalenessInMs?: number;

  /**
   * Priority Level (Low/High) for each request.
   * Low priority requests are always throttled before any high priority requests.
   *
   * <p>Default value is null. By default all requests are of High priority</p>
   */
  priorityLevel?: PriorityLevel;
}
