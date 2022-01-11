// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { createSynonymMapFromFile } from "../../../src";
import { SynonymMap } from "../../../src/serviceModels";

describe("synonymmap", () => {
  it("create synonymmap from file(node)", async function () {
    const synonymMap: SynonymMap = await createSynonymMapFromFile(
      "my-synonym-map-1",
      "./test/internal/synonymMap.txt"
    );
    assert.equal(synonymMap.name, "my-synonym-map-1");
    assert.equal(synonymMap.synonyms.length, 2);
    assert.equal(synonymMap.synonyms[0], "United States, United States of America => USA");
    assert.equal(synonymMap.synonyms[1], "Washington, Wash. => WA");
  });
});
