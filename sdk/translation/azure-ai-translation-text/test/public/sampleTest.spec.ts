// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import * as TextTranslationFactory from "../../src/index";

describe("Sample Tests", () => {

  it("anonymous client - GET languages", async function () {
    let translationClient = TextTranslationFactory.default("https://api.cognitive.microsofttranslator.com");
    let langResponse = await translationClient.path("/languages").get();

    assert.equal("200", langResponse.status);
  });
});
