// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { ServiceBusMessage } from "../../../src/index.js";
import { TestMessage } from "../../public/utils/testUtils.js";
import { fromRheaMessage, toRheaMessage } from "../../../src/serviceBusMessage.js";
import { Message as RheaMessage } from "rhea-promise";
import { Constants } from "@azure/core-amqp";
import { describe, it, assert } from "vitest";

const should = chai.should();
chai.use(chaiAsPromised);

describe("Message translations", () => {
  describe("expiresAtUtc is not invalid on received message", function (): void {
    async function verifyExpiresAtUtc(
      transformMessage?: (msg: ServiceBusMessage) => ServiceBusMessage,
    ): Promise<void> {
      let testMessage = TestMessage.getSample();
      if (transformMessage) testMessage = transformMessage(testMessage);

      const rheaMsg: RheaMessage = {
        ...toRheaMessage(testMessage, { encode: (body) => body }),
        message_annotations: { [Constants.enqueuedTime]: Date.now().valueOf() },
      };
      const expiresAtUtc = fromRheaMessage(rheaMsg, { skipParsingBodyAsJson: false }).expiresAtUtc;
      should.not.equal(expiresAtUtc?.toString(), "Invalid Date", "expiresAtUtc is Invalid Date");
    }

    it("ttl defined on sent message", async function (): Promise<void> {
      await verifyExpiresAtUtc();
    });

    it("ttl undefined on sent message", async function (): Promise<void> {
      await verifyExpiresAtUtc((msg: ServiceBusMessage) => {
        return { ...msg, timeToLive: undefined };
      });
    });
  });
});
