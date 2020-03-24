import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyOptions,
  WebResource,
  HttpOperationResponse
} from "@azure/core-http";
import * as url from "url";

export class PerfStressPolicy extends BaseRequestPolicy {
  private host: string;
  private port?: string;
  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions,
    host: string,
    port?: string
  ) {
    super(nextPolicy, options);
    this.host = host;
    this.port = port;
  }

  public sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    const parsedUrl = url.parse(request.url);
    if (parsedUrl.host && !request.headers.get("Host")) {
      request.headers.set("Host", parsedUrl.host);
    }
    parsedUrl.host = this.host;
    if (this.port) {
      parsedUrl.port = this.port;
    }
    request.url = url.format(parsedUrl);
    return this._nextPolicy.sendRequest(request);
  }
}
