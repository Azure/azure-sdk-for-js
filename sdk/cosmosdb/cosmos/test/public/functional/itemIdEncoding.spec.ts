// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import assert from "assert";
import { Suite } from "mocha";
import { Container } from "../../../src";
import { getTestContainer, removeAllDatabases } from "../common/TestHelpers";

interface ItemPayload {
  id?: string;
  pk?: string;
}

interface TestScenario {
  name: string;
  id: string;
  expectedCreateStatusCode: number;
  expectedReadStatusCode?: number;
  expectedReplaceStatusCode?: number;
  expectedDeleteStatusCode?: number;
  expectedCreateErrorMessage?: string;
}

const createPayload = function (id: string): ItemPayload {
  return {
    id: id,
    pk: id,
  };
};

const executeTestCase = async function (scenario: TestScenario) {
  const container: Container = await getTestContainer(scenario.name, undefined, {
    partitionKey: {
      paths: ["/pk"],
      version: undefined,
    },
    throughput: 25100,
  });

  try {
    const response = await container.items.create(createPayload(scenario.id));
    assert.strictEqual(response.statusCode, scenario.expectedCreateStatusCode);
    assert.strictEqual(response.item.id, scenario.id);
    if (response.resource) {
      assert.strictEqual(response.resource.id, scenario.id);
      assert.strictEqual(response.resource.pk, scenario.id);
    } else {
      assert.fail("response.resource should not be null");
    }
  } catch (err: any) {
    if (err && err.code) {
      if (err.code === "ERR_ASSERTION") {
        throw err;
      }

      console.log("ERROR: " + err.code + " - " + err.message + " - " + err.stack);
      assert.strictEqual(err.code, scenario.expectedCreateStatusCode);
    } else {
      assert.strictEqual(400, scenario.expectedCreateStatusCode);
      if (err) {
        assert.strictEqual(err.message, scenario.expectedCreateErrorMessage);
      }
    }
    return;
  }

  try {
    const response = await container.item(scenario.id, scenario.id).read<ItemPayload>();
    assert.strictEqual(response.statusCode, scenario.expectedReadStatusCode);
    assert.strictEqual(response.item.id, scenario.id);
    if (response.resource) {
      assert.strictEqual(response.resource.id, scenario.id);
      assert.strictEqual(response.resource.pk, scenario.id);
    } else {
      assert.fail("response.resource should not be null");
    }
  } catch (err: any) {
    console.log("ERROR: " + err.code + " - " + err.message + " - " + err.stack);
    assert.strictEqual(err.code, scenario.expectedReadStatusCode);
  }

  try {
    const response = await container
      .item(scenario.id, scenario.id)
      .replace<ItemPayload>(createPayload(scenario.id));
    assert.strictEqual(response.statusCode, scenario.expectedReplaceStatusCode);
    assert.strictEqual(response.item.id, scenario.id);
    if (response.resource) {
      assert.strictEqual(response.resource.id, scenario.id);
      assert.strictEqual(response.resource.pk, scenario.id);
    } else {
      assert.fail("response.resource should not be null");
    }
  } catch (err: any) {
    console.log("ERROR: " + err.code + " - " + err.message + " - " + err.stack);
    assert.strictEqual(err.code, scenario.expectedReplaceStatusCode);
  }

  try {
    const response = await container.item(scenario.id, scenario.id).delete();
    assert.strictEqual(response.statusCode, scenario.expectedDeleteStatusCode);
  } catch (err: any) {
    console.log("ERROR: " + err.code + " - " + err.message + " - " + err.stack);
    assert.strictEqual(err.code, scenario.expectedDeleteStatusCode);
  }
};

describe("Id encoding", function (this: Suite) {
  this.timeout(process.env.MOCHA_TIMEOUT || 10000);
  beforeEach(async function () {
    await removeAllDatabases();
  });

  it("plainVanillaId", async function () {
    const scenario: TestScenario = {
      name: "PlainVanillaId",
      id: "Test",
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: 200,
      expectedReplaceStatusCode: 200,
      expectedDeleteStatusCode: 204,
    };

    await executeTestCase(scenario);
  });

  it("ContainerIdWithUnicode鱀", async function () {
    const scenario: TestScenario = {
      name: "ContainerIdWithUnicode鱀",
      id: "Test",
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: 200,
      expectedReplaceStatusCode: 200,
      expectedDeleteStatusCode: 204,
    };

    await executeTestCase(scenario);
  });

  it("idWithWhitespaces", async function () {
    const scenario: TestScenario = {
      name: "IdWithWhitespaces",
      id: "This is a test",
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: 200,
      expectedReplaceStatusCode: 200,
      expectedDeleteStatusCode: 204,
    };

    await executeTestCase(scenario);
  });

  it("idStartingWithWhitespace", async function () {
    const scenario: TestScenario = {
      name: "IdStartingWithWhitespace",
      id: " Test",
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: 200,
      expectedReplaceStatusCode: 200,
      expectedDeleteStatusCode: 204,
    };

    await executeTestCase(scenario);
  });

  it("idStartingWithWhitespaces", async function () {
    const scenario: TestScenario = {
      name: "IdStartingWithWhitespaces",
      id: "   Test",
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: 200,
      expectedReplaceStatusCode: 200,
      expectedDeleteStatusCode: 204,
    };

    await executeTestCase(scenario);
  });

  it("idEndingWithWhitespace", async function () {
    const scenario: TestScenario = {
      name: "IdEndingWithWhitespace",
      id: "Test ",
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: 200,
      expectedReplaceStatusCode: 200,
      expectedDeleteStatusCode: 204,
    };

    await executeTestCase(scenario);
  });

  it("idEndingWithWhitespaces", async function () {
    const scenario: TestScenario = {
      name: "IdEndingWithWhitespaces",
      id: "Test   ",
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: 200,
      expectedReplaceStatusCode: 200,
      expectedDeleteStatusCode: 204,
    };

    await executeTestCase(scenario);
  });

  it("idWithUnicodeCharacters", async function () {
    const scenario: TestScenario = {
      name: "IdWithUnicodeCharacters",
      id: "WithUnicode鱀",
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: 200,
      expectedReplaceStatusCode: 200,
      expectedDeleteStatusCode: 204,
    };

    await executeTestCase(scenario);
  });

  it("idWithAllowedSpecialCharacters", async function () {
    const scenario: TestScenario = {
      name: "IdWithAllowedSpecialCharacters",
      id: "WithAllowedSpecial,=.:~+-@()^${}[]!_Chars",
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: 200,
      expectedReplaceStatusCode: 200,
      expectedDeleteStatusCode: 204,
    };

    await executeTestCase(scenario);
  });

  it("idWithBase64EncodedIdCharacters", async function () {
    const base64EncodedId =
      "BQE1D3PdG4N4bzU9TKaCIM3qc0TVcZ2/Y3jnsRfwdHC1ombkX3F1dot/SG0/UTq9AbgdX3" +
      "kOWoP6qL6lJqWeKgV3zwWWPZO/t5X0ehJzv9LGkWld07LID2rhWhGT6huBM6Q=";
    const safeBase64EncodedId = base64EncodedId.replace(/\//g, "-");

    const scenario: TestScenario = {
      name: "IdWithBase64EncodedIdCharacters",
      id: safeBase64EncodedId,
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: 200,
      expectedReplaceStatusCode: 200,
      expectedDeleteStatusCode: 204,
    };

    await executeTestCase(scenario);
  });

  it("idEndingWithPercentEncodedWhitespace", async function () {
    const scenario: TestScenario = {
      name: "IdEndingWithPercentEncodedWhitespace",
      id: "IdEndingWithPercentEncodedWhitespace%20",
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: 200,
      expectedReplaceStatusCode: 200,
      expectedDeleteStatusCode: 204,
    };

    await executeTestCase(scenario);
  });

  it("idWithPercentEncodedSpecialChar", async function () {
    const scenario: TestScenario = {
      name: "IdWithPercentEncodedSpecialChar",
      id: "WithPercentEncodedSpecialChar%E9%B1%80",
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: 200,
      expectedReplaceStatusCode: 200,
      expectedDeleteStatusCode: 204,
    };

    await executeTestCase(scenario);
  });

  it("idWithDisallowedCharQuestionMark", async function () {
    const scenario: TestScenario = {
      name: "IdWithDisallowedCharQuestionMark",
      id: "Disallowed?Chars",
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: 200,
      expectedReplaceStatusCode: 200,
      expectedDeleteStatusCode: 204,
    };

    await executeTestCase(scenario);
  });

  it("idWithDisallowedCharForwardSlash", async function () {
    const scenario: TestScenario = {
      name: "IdWithDisallowedCharForwardSlash",
      id: "Disallowed/Chars",
      expectedCreateStatusCode: 400,
      expectedCreateErrorMessage: "Id contains illegal chars.",
    };

    await executeTestCase(scenario);
  });

  it("idWithDisallowedCharBackSlash", async function () {
    const scenario: TestScenario = {
      name: "IdWithDisallowedCharBackSlash",
      id: "Disallowed\\Chars",
      expectedCreateStatusCode: 400,
      expectedCreateErrorMessage: "Id contains illegal chars.",
    };

    await executeTestCase(scenario);
  });

  it("idWithDisallowedCharPoundSign", async function () {
    const scenario: TestScenario = {
      name: "IdWithDisallowedCharPoundSign",
      id: "Disallowed#Chars",
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: 200,
      expectedReplaceStatusCode: 200,
      expectedDeleteStatusCode: 204,
    };

    await executeTestCase(scenario);
  });

  it("idWithCarriageReturn", async function () {
    const scenario: TestScenario = {
      name: "IdWithCarriageReturn",
      id: "With\rCarriageReturn",
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: 200,
      expectedReplaceStatusCode: 200,
      expectedDeleteStatusCode: 204,
    };

    await executeTestCase(scenario);
  });

  it("idWithTab", async function () {
    const scenario: TestScenario = {
      name: "IdWithTab",
      id: "With\tTab",
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: 200,
      expectedReplaceStatusCode: 200,
      expectedDeleteStatusCode: 204,
    };

    await executeTestCase(scenario);
  });

  it("idWithLineFeed", async function () {
    const scenario: TestScenario = {
      name: "IdWithLineFeed",
      id: "With\nLineFeed",
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: 200,
      expectedReplaceStatusCode: 200,
      expectedDeleteStatusCode: 204,
    };

    await executeTestCase(scenario);
  });
});
