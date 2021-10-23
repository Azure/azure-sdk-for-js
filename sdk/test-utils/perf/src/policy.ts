import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyOptions,
  WebResource,
  HttpOperationResponse
} from "@azure/core-http";
import * as url from "url";

/**
 * A core-http policy that changes the host and the port of
 * any targeted URL. The original host is kept as a header
 * on the outgoing request.
 */
export class PerfPolicy extends BaseRequestPolicy {
  private host: string;
  private port?: string | null;

  /**
   * It receives the common parameters sent to any core-http policy, plus the host and the port.
   * @param nextPolicy Next policy in the chain of policies. Used by BaseRequestPolicy.
   * @param options The available RequestPolicyOptions. Used by BaseRequestPolicy.
   * @param host What will overwrite the original request's host.
   * @param port What will overwrite the original request's port.
   */
  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions,
    host: string,
    port?: string | null
  ) {
    super(nextPolicy, options);
    this.host = host;
    this.port = port;
  }

  /**
   * When a request is sent through our clients, the host and the port will be replaced with the originally given ones.
   * @param request The HTTP request.
   */
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
