// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { translateErrorForServiceBus } from "../src/util/errorTranslation";
import { translate as translateFromAmqpCommon } from "@azure/amqp-common";

import chai from "chai";
const assert = chai.assert;

describe.only("errorTranslation", () => {
  it("quotaexceedederror's are treated as retryable for ServiceBus", async () => {
    const amqpError = {
      condition: "amqp:resource-limit-exceeded",
      description: "max idle time exceeded"
    };

    const messagingError = translateErrorForServiceBus(amqpError);
    assert.isTrue(messagingError.retryable);

    const messagingErrorOrig = translateFromAmqpCommon(amqpError);
    assert.isFalse(messagingErrorOrig.retryable);

    // but otherwise they're the same
    messagingError.retryable = false;

    assert.equal(messagingError.name, messagingErrorOrig.name);
    assert.equal(messagingError.condition, messagingErrorOrig.condition);
  });
});
