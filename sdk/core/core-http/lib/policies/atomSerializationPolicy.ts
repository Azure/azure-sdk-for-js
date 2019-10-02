// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HttpOperationResponse } from "../httpOperationResponse";
import { WebResource } from "../webResource";
import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions
} from "./requestPolicy";
import { AtomXmlSerializer, XMLRequestInJSON } from "../atomXmlOperationSpec";
import { convertAtomXmlToJson } from "../util/xml";
import { RestError } from "../restError";
import * as utils from "../util/utils";
import { convertJsonToAtomXml } from "../util/xml";

/**
 * Create a new serialization RequestPolicyCreator that will serialize/deserialize
 * HTTP request bodies as they pass through the HTTP pipeline.
 */
export function atomSerializationPolicy(): RequestPolicyFactory {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new AtomSerializationPolicy(nextPolicy, options);
    }
  };
}

/**
 * A RequestPolicy that will
 *  - serialize HTTP requests with input in JSON to ATOM based XML requests, and
 *  - deserialize the ATOM based XML responses as they pass through the HTTP pipeline.
 */
export class AtomSerializationPolicy extends BaseRequestPolicy {
  constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions) {
    super(nextPolicy, options);
  }

  public async sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    if (
      request.atomXmlOperationSpec == undefined ||
      request.atomXmlOperationSpec.serializer == undefined
    ) {
      throw new Error(
        "Failed to send request in the AtomSerializationPolicy due to missing serializer."
      );
    }

    const serializer: AtomXmlSerializer = request.atomXmlOperationSpec.serializer;

    if (request.body) {
      const content: XMLRequestInJSON = serializer.serialize(JSON.parse(request.body));
      request.body = convertJsonToAtomXml(content);
    }

    const response: HttpOperationResponse = await this._nextPolicy.sendRequest(request);

    try {
      if (response.bodyAsText) {
        response.parsedBody = await convertAtomXmlToJson(response.bodyAsText);
      }
    } catch (err) {
      const error = new RestError(
        `ResponseNotInAtomXMLFormat - ${err.message}`,
        RestError.PARSE_ERROR
      );
      error.statusCode = response.status;
      error.request = utils.stripRequest(response.request);
      error.response = utils.stripResponse(response);
      throw error;
    }

    return await serializer.deserialize(response);
  }
}
