// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TokenCredential } from "@azure/service-bus";
import { ServiceBusClient } from "@azure/service-bus";
import { describe, it } from "vitest";
import { expect } from "../../public/utils/chai.js";

describe("ServiceBusClient unit tests", function (): void {
  describe("ServiceBusClient constructor", function (): void {
    it("respects customEndpointAddress when using connection string", () => {
      const client = new ServiceBusClient(
        "Endpoint=sb://test.servicebus.windows.net;SharedAccessKeyName=b;SharedAccessKey=c;EntityPath=my-event-hub-name",
        { customEndpointAddress: "sb://foo.private.bar:111" },
      );
      expect(client).toBeInstanceOf(ServiceBusClient);
      client["_connectionContext"].config.host.should.equal("foo.private.bar");
      client["_connectionContext"].config.amqpHostname!.should.equal("test.servicebus.windows.net");
      client["_connectionContext"].config.port!.should.equal(111);
    });

    it("respects customEndpointAddress when using credentials", () => {
      const dummyCredential: TokenCredential = {
        getToken: async () => {
          return {
            token: "boo",
            expiresOnTimestamp: 12324,
          };
        },
      };
      const client = new ServiceBusClient("test.servicebus.windows.net", dummyCredential, {
        customEndpointAddress: "sb://foo.private.bar:111",
      });

      expect(client).toBeInstanceOf(ServiceBusClient);
      client["_connectionContext"].config.host.should.equal("foo.private.bar");
      client["_connectionContext"].config.amqpHostname!.should.equal("test.servicebus.windows.net");
      client["_connectionContext"].config.port!.should.equal(111);
    });
  });
});
