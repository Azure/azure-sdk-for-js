import { ServiceClientCredentials, ServiceClientOptions, TokenCredential, RequestOptionsBase } from "@azure/core-http";
import { TestServiceClient } from "./testServiceClient";
import { TestPoller } from "./testPoller";
import { TestNonCancellablePoller } from "./testNonCancellablePoller";

interface StartLROOptions {
  manual?: boolean;
  intervalInMs?: number;
  requestOptions?: RequestOptionsBase;
}

export class TestClient extends TestServiceClient {
  constructor(credentials: TokenCredential | ServiceClientCredentials, options?: ServiceClientOptions) {
    super(credentials, options);
  }

  public async startLRO(options: StartLROOptions = {}): Promise<TestPoller> {
    return new TestPoller(
      this,
      options.manual,
      options.intervalInMs,
      options.requestOptions
    );
  } 

  public async startNonCancellableLRO(options: StartLROOptions = {}): Promise<TestNonCancellablePoller> {
    return new TestNonCancellablePoller(
      this,
      options.manual,
      options.intervalInMs,
      options.requestOptions
    );
  }
}
