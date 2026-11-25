// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FetchFunctionCallback } from "../../../../src/queryExecutionContext/index.js";
import { EncryptionItemQueryIterator } from "../../../../src/encryption/EncryptionItemQueryIterator.js";
import type { FeedOptions } from "../../../../src/request/index.js";
import { createDummyDiagnosticNode } from "../../../public/common/TestHelpers.js";
import { getEmptyCosmosDiagnostics } from "../../../../src/utils/diagnostics.js";
import { describe, it, assert } from "vitest";

describe("EncryptionItemQueryIterator", () => {
  it("propagates the encryption container RID to the context-owned options", async () => {
    const observedOptions: FeedOptions[] = [];
    const fetchFunction: FetchFunctionCallback = async (_diagnosticNode, options) => {
      observedOptions.push(options);
      return {
        code: 200,
        headers: {},
        result: [],
        substatus: 0,
        diagnostics: getEmptyCosmosDiagnostics(),
      };
    };

    const options: FeedOptions = {};
    const container = {
      _rid: "container-rid",
      url: "dbs/database/colls/container",
      checkAndInitializeEncryption: async () => undefined,
    } as any;
    const clientContext = {
      diagnosticLevel: undefined,
      partitionKeyRangeCache: undefined,
    } as any;
    const iterator = new EncryptionItemQueryIterator(
      clientContext,
      "SELECT * FROM c",
      options,
      fetchFunction,
      container,
    );

    await iterator.init(createDummyDiagnosticNode());
    await (iterator as any).queryExecutionContext.fetchMore(createDummyDiagnosticNode());

    assert.equal(observedOptions.length, 1);
    assert.equal(observedOptions[0].containerRid, "container-rid");
    assert.equal(options.containerRid, undefined);
  });
});
