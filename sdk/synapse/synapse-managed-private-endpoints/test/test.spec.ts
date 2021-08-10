import { assert } from "chai";
import { ManagedPrivateEndpoint, ManagedPrivateEndpointsClient } from "../src";
import { createClient } from "./utils/recordedClient";

describe("Synapse Managed Private Endpoints", () => {
  let client: ManagedPrivateEndpointsClient;

  beforeEach(() => {
    client = createClient();
  });

  it("should list endpoints", async () => {
    const result = client.managedPrivateEndpoints.list("default");
    let endpoints: ManagedPrivateEndpoint[] = [];

    for await (const endpoint of result) {
      endpoints.push(endpoint);
    }

    console.log(endpoints);

    assert.isTrue(endpoints.length > 0);
  });
});
