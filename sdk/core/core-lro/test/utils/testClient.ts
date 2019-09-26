import { ServiceClientCredentials, ServiceClientOptions, TokenCredential, RequestOptionsBase } from "@azure/core-http";
import { TestServiceClient } from "./testServiceClient";
import { TestPoller } from "./testPoller";
import { TestNonCancellablePoller } from "./testNonCancellablePoller";

export class TestClient extends TestServiceClient {
  constructor(credentials: TokenCredential | ServiceClientCredentials, options?: ServiceClientOptions) {
    super(credentials, options);
  }

  public async startLRO(manual?: boolean, intervalInMs?: number, options?: RequestOptionsBase): Promise<TestPoller> {
    return new TestPoller(
      this,
      manual,
      intervalInMs,
      options,
    );
  } 

  public async startNonCancellableLRO(manual?: boolean, intervalInMs?: number, options?: RequestOptionsBase): Promise<TestNonCancellablePoller> {
    return new TestNonCancellablePoller(
      this,
      manual,
      intervalInMs,
      options,
    );
  }
}
