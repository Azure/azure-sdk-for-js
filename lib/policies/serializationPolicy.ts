// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { HttpOperationResponse } from "../httpOperationResponse";
import { WebResource } from "../webResource";
import { BaseRequestPolicy, RequestPolicyCreator, RequestPolicy, RequestPolicyOptions } from "./requestPolicy";
import { Serializer, Mapper } from "../serializer";
import { OperationSpec } from "../msRest";
import * as utils from "../util/utils";

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

  public sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    let result: Promise<HttpOperationResponse>;
    try {
      this.serializeRequestBody(request);
      result = this._nextPolicy.sendRequest(request);
    } catch (error) {
      result = Promise.reject(error);
    }
    return result;
  }

  /**
   * Serialize the provided HTTP request's body based on the requestBodyMapper assigned to the HTTP
   * request.
   * @param {WebResource} request - The HTTP request that will have its body serialized.
   */
  public serializeRequestBody(request: WebResource): void {
    const operationSpec: OperationSpec | undefined = request.operationSpec;
    if (operationSpec) {
      const bodyMapper: Mapper | undefined = operationSpec.requestBodyMapper;
      if (bodyMapper) {
        try {
          if (request.body != undefined) {
            request.body = this._serializer.serialize(bodyMapper, request.body, "");
            if (operationSpec.isXML) {
              if (bodyMapper.type.name === "Sequence") {
                request.body = utils.stringifyXML(utils.prepareXMLRootList(request.body, bodyMapper.xmlElementName || bodyMapper.xmlName || bodyMapper.serializedName), { rootName: bodyMapper.xmlName || bodyMapper.serializedName });
              }
              else {
                request.body = utils.stringifyXML(request.body, { rootName: bodyMapper.xmlName || bodyMapper.serializedName });
              }
            } else {
              request.body = JSON.stringify(request.body);
            }
          }
        } catch (error) {
          throw new Error(`Error "${error.message}" occurred in serializing the payload - ${JSON.stringify(bodyMapper.serializedName, undefined, "  ")}.`);
        }
      }
    }
  }
}
