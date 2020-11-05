// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineOptions } from "@azure/core-http";

export * from "./generated/models";
// /**
//  * Represents an object with a non-enumerable _response property which provides
//  */
// export type WithResponse<T> = T & { _response: HttpResponse };
export interface ArtifactsClientOptions extends PipelineOptions {
  /**
   * Api Version
   */
  apiVersion?: string;
  /**
   * Overrides client endpoint.
   */
  endpoint?: string;
}

export interface ListPageSettings {
  /**
   * A token used for retrieving the next page of results when the server
   * enforces pagination.
   */
  continuationToken?: string;
}
