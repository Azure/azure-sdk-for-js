import nock from "nock";
import { Constants, ServiceClient } from "../../src/coreHttp";
import { AbortController } from "@azure/abort-controller";
import { assert } from "chai";

describe.only("Throttling rety policy", () => {
  let client: ServiceClient;

  beforeEach(function() {
    if (!nock.isActive()) {
      nock.activate();
    }
    nock("https://fakeservice.io:443")
      .persist()
      .put(/.*/g)
      .reply(
        Constants.HttpConstants.StatusCodes.TooManyRequests,
        {
          type: "https://fakeservice.io/errors/too-many-requests",
          title: "Resource utilization has surpassed the assigned quota",
          policy: "Total Requests",
          status: Constants.HttpConstants.StatusCodes.TooManyRequests
        },
        ["Retry-After", "10000"]
      );
    client = new ServiceClient();
  });

  afterEach(async function() {
    nock.restore();
    nock.cleanAll();
    nock.enableNetConnect();
  });

  it("Should not retry forever (honors the abort signal passed)", async () => {
    let errorWasThrown = false;
    try {
      await client.sendRequest({
        url: "https://fakeservice.io/ABCD",
        abortSignal: AbortController.timeout(100),
        method: "PUT"
      });
    } catch (error) {
      errorWasThrown = true;
      assert.equal((error as any).name, "AbortError", "Unexpected error thrown");
    }
    assert.equal(errorWasThrown, true, "Error was not thrown");
  });
});
