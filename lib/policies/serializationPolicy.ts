// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { HttpOperationResponse } from "../httpOperationResponse";
import { WebResource } from "../webResource";
import { BaseRequestPolicy, RequestPolicyCreator, RequestPolicy, RequestPolicyOptions } from "./requestPolicy";
import { Serializer, Mapper } from "../serializer";

/**
 * Create a new serialization RequestPolicyCreator that will serialized HTTP request bodies as they
 * pass through the HTTP pipeline.
 */
export function serializationPolicy(serializer: Serializer): RequestPolicyCreator {
  return (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
    return new SerializationPolicy(nextPolicy, options, serializer);
  };
}

/**
 * A RequestPolicy that will serialize HTTP request bodies as they pass through the HTTP pipeline.
 */
export class SerializationPolicy extends BaseRequestPolicy {
  constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions, private readonly _serializer: Serializer) {
    super(nextPolicy, options);
  }

  public async sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    this.serializeRequestBody(request);
    return await this._nextPolicy.sendRequest(request);
  }

  /**
   * Serialize the provided HTTP request's body based on the requestBodyMapper assigned to the HTTP
   * request.
   * @param {WebResource} request - The HTTP request that will have its body serialized.
   */
  public serializeRequestBody(request: WebResource): void {
    const requestBodyMapper: Mapper | undefined = request.operationSpec && request.operationSpec.requestBodyMapper;
    if (requestBodyMapper) {
      request.body = this._serializer.serialize(requestBodyMapper, request.body, "");
    }
  }
}
