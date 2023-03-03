// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  RequestPolicy,
  RequestPolicyOptionsLike as RequestPolicyOptions,
  WebResourceLike as WebResource,
  CompatResponse as HttpOperationResponse,
  toHttpHeadersLike,
} from "@azure/core-http-compat";
import { BaseRequestPolicy } from "@azure/storage-blob";
import { isNode } from "@azure/core-util";
import { HeaderConstants } from "../utils/constants";
import { createHttpHeaders } from "@azure/core-rest-pipeline";

/**
 * TelemetryPolicy is a policy used to tag user-agent header for every requests.
 */
export class TelemetryPolicy extends BaseRequestPolicy {
  /**
   * Telemetry string.
   */
  public readonly telemetry: string;

  /**
   * Creates an instance of TelemetryPolicy.
   * @param nextPolicy -
   * @param options -
   * @param telemetry -
   */
  constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions, telemetry: string) {
    super(nextPolicy, options);
    this.telemetry = telemetry;
  }

  /**
   * Sends out request.
   *
   * @param request -
   */
  public async sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    if (isNode) {
      if (!request.headers) {
        request.headers = toHttpHeadersLike(createHttpHeaders());
      }
      if (!request.headers.get(HeaderConstants.USER_AGENT)) {
        request.headers.set(HeaderConstants.USER_AGENT, this.telemetry);
      }
    }

    return this._nextPolicy.sendRequest(request);
  }
}
