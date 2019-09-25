import { ServiceClientCredentials, ServiceClientOptions, TokenCredential, RequestOptionsBase } from "@azure/core-http";
import { FakeServiceClient } from "./fakeServiceClient";
import { FakePoller } from "./fakePoller";
import { FakeNonCancellablePoller } from "./fakeNonCancellablePoller";

export class FakeClient extends FakeServiceClient {
  constructor(credentials: TokenCredential | ServiceClientCredentials, options?: ServiceClientOptions) {
    super(credentials, options);
  }

  public async startLRO(manual?: boolean, intervalInMs?: number, options?: RequestOptionsBase): Promise<FakePoller> {
    return new FakePoller(
      this,
      options,
      intervalInMs,
      manual,
    );
  } 

  public async startNonCancellableLRO(manual?: boolean, intervalInMs?: number, options?: RequestOptionsBase): Promise<FakeNonCancellablePoller> {
    return new FakeNonCancellablePoller(
      this,
      options,
      intervalInMs,
      manual,
    );
  }
}
