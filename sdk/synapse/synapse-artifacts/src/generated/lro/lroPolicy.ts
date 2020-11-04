import {
  RequestPolicy,
  RequestPolicyOptions,
  BaseRequestPolicy,
  HttpOperationResponse,
  WebResource
} from "@azure/core-http";
import { getLROData } from "./requestUtils";

export function lroPolicy() {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new LROPolicy(nextPolicy, options);
    }
  };
}

class LROPolicy extends BaseRequestPolicy {
  constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions) {
    super(nextPolicy, options);
  }

  public async sendRequest(
    webResource: WebResource
  ): Promise<HttpOperationResponse> {
    let result = await this._nextPolicy.sendRequest(webResource);

    if (webResource.shouldDeserialize !== undefined) {
      const _lroData = getLROData(result);
      result.parsedBody = { ...result.parsedBody, _lroData };
    }

    return result;
  }
}
