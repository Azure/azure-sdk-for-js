import { EventHubConsumerClientFacade } from "../src/eventHubConsumerClientFacade";
import { TokenCredential } from '@azure/identity';
import * as assert from "assert";

describe("EventHubConsumerClientFacade", () => {
  it("identity token or connection string credentials", () => {
    const fakeCredential: TokenCredential = {
      getToken: async (scope, options) => {
        return null;
      }
    };
 
    assert.ok(EventHubConsumerClientFacade["isHostAndTokenCredential"]({
      host: "hello", 
      credential: fakeCredential,
      eventHubName: ""
    }));
    
    assert.ok(!EventHubConsumerClientFacade["isHostAndTokenCredential"]({ 
      connectionString: "hello"
    }));
    
    assert.ok(!EventHubConsumerClientFacade["isHostAndTokenCredential"]({ 
      connectionString: "hello", 
      eventHubName: "" 
    }));
  });
});