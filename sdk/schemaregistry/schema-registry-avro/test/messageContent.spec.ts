// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AssertEqualKeys } from "./utils/utils";
import { MessageContent as EHMessageContent } from "@azure/event-hubs";
import { MessageContent } from "../src/models";
import { assert } from "chai";

describe("MessageContent types are identically the same", function () {
  it("Event Hubs", function () {
    const areEqual: AssertEqualKeys<MessageContent, EHMessageContent> = true;
    assert.isTrue(
      areEqual,
      "MessageContent should have the same shape as @azure/event-hubs's MessageContent."
    );
  });
});
