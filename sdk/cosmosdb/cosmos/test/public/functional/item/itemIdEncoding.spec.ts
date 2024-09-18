// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import assert from "assert";
import { Suite } from "mocha";
import { Container, CosmosClient } from "../../../../src";
import {
  getTestContainer,
  removeAllDatabases,
  defaultClient,
  defaultComputeGatewayClient,
} from "../../common/TestHelpers";

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

const executeTestCase = async function (
  scenario: TestScenario,
  useComputeGateway: boolean = false,
) {
  const client: CosmosClient = useComputeGateway ? defaultComputeGatewayClient : defaultClient;
  const container: Container = await getTestContainer(scenario.name, client, {
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

const executeTestCaseOnComputeGateway = async function (scenario: TestScenario) {
  return executeTestCase(scenario, true);
};

describe("Id encoding", function (this: Suite) {
  this.timeout(process.env.MOCHA_TIMEOUT || 10000);
  beforeEach(async function () {
    await removeAllDatabases();
  });

  it("RGW_plainVanillaId", async function () {
    const scenario: TestScenario = {
      name: "RGW_PlainVanillaId",
      id: "Test",
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: 200,
      expectedReplaceStatusCode: 200,
      expectedDeleteStatusCode: 204,
    };

    await executeTestCase(scenario);
  });

  it("CGW_plainVanillaId", async function () {
    const scenario: TestScenario = {
      name: "CGW_PlainVanillaId",
      id: "Test",
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: 200,
      expectedReplaceStatusCode: 200,
      expectedDeleteStatusCode: 204,
    };

    await executeTestCaseOnComputeGateway(scenario);
  });

  it("RGW_ContainerIdWithUnicode鱀", async function () {
    const scenario: TestScenario = {
      name: "RGW_ContainerIdWithUnicode鱀",
      id: "Test",
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: 200,
      expectedReplaceStatusCode: 200,
      expectedDeleteStatusCode: 204,
    };

    await executeTestCase(scenario);
  });

  it("CGW_ContainerIdWithUnicode鱀", async function () {
    const scenario: TestScenario = {
      name: "CGW_ContainerIdWithUnicode鱀",
      id: "Test",
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: 200,
      expectedReplaceStatusCode: 200,
      expectedDeleteStatusCode: 204,
    };

    await executeTestCaseOnComputeGateway(scenario);
  });

  it("RGW_idWithWhitespaces", async function () {
    const scenario: TestScenario = {
      name: "RGW_IdWithWhitespaces",
      id: "This is a test",
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: 200,
      expectedReplaceStatusCode: 200,
      expectedDeleteStatusCode: 204,
    };

    await executeTestCase(scenario);
  });

  it("CGW_idWithWhitespaces", async function () {
    const scenario: TestScenario = {
      name: "CGW_IdWithWhitespaces",
      id: "This is a test",
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: 200,
      expectedReplaceStatusCode: 200,
      expectedDeleteStatusCode: 204,
    };

    await executeTestCaseOnComputeGateway(scenario);
  });

  it("RGW_idStartingWithWhitespace", async function () {
    const scenario: TestScenario = {
      name: "RGW_IdStartingWithWhitespace",
      id: " Test",
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: 200,
      expectedReplaceStatusCode: 200,
      expectedDeleteStatusCode: 204,
    };

    await executeTestCase(scenario);
  });

  it("CGW_idStartingWithWhitespace", async function () {
    const scenario: TestScenario = {
      name: "CGW_IdStartingWithWhitespace",
      id: " Test",
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: 200,
      expectedReplaceStatusCode: 200,
      expectedDeleteStatusCode: 204,
    };

    await executeTestCaseOnComputeGateway(scenario);
  });

  it("RGW_idStartingWithWhitespaces", async function () {
    const scenario: TestScenario = {
      name: "RGW_IdStartingWithWhitespaces",
      id: "   Test",
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: 200,
      expectedReplaceStatusCode: 200,
      expectedDeleteStatusCode: 204,
    };

    await executeTestCase(scenario);
  });

  it("CGW_idStartingWithWhitespaces", async function () {
    const scenario: TestScenario = {
      name: "CGW_IdStartingWithWhitespaces",
      id: "   Test",
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: 200,
      expectedReplaceStatusCode: 200,
      expectedDeleteStatusCode: 204,
    };

    await executeTestCaseOnComputeGateway(scenario);
  });

  it("RGW_idEndingWithWhitespace", async function () {
    const scenario: TestScenario = {
      name: "RGW_IdEndingWithWhitespace",
      id: "Test ",
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: 401,
      expectedReplaceStatusCode: 401,
      expectedDeleteStatusCode: 401,
    };

    await executeTestCase(scenario);
  });

  it("CGW_idEndingWithWhitespace", async function () {
    const scenario: TestScenario = {
      name: "CGW_IdEndingWithWhitespace",
      id: "Test ",
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: 200,
      expectedReplaceStatusCode: 200,
      expectedDeleteStatusCode: 204,
    };

    await executeTestCaseOnComputeGateway(scenario);
  });

  it("RGW_idEndingWithWhitespaces", async function () {
    const scenario: TestScenario = {
      name: "RGW_IdEndingWithWhitespaces",
      id: "Test   ",
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: 401,
      expectedReplaceStatusCode: 401,
      expectedDeleteStatusCode: 401,
    };

    await executeTestCase(scenario);
  });

  it("CGW_idEndingWithWhitespaces", async function () {
    const scenario: TestScenario = {
      name: "CGW_IdEndingWithWhitespaces",
      id: "Test   ",
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: 200,
      expectedReplaceStatusCode: 200,
      expectedDeleteStatusCode: 204,
    };

    await executeTestCaseOnComputeGateway(scenario);
  });

  it("RGW_idWithUnicodeCharacters", async function () {
    const scenario: TestScenario = {
      name: "RGW_IdWithUnicodeCharacters",
      id: "WithUnicode鱀",
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: 200,
      expectedReplaceStatusCode: 200,
      expectedDeleteStatusCode: 204,
    };

    await executeTestCase(scenario);
  });

  it("CGW_idWithUnicodeCharacters", async function () {
    const scenario: TestScenario = {
      name: "CGW_IdWithUnicodeCharacters",
      id: "WithUnicode鱀",
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: 200,
      expectedReplaceStatusCode: 200,
      expectedDeleteStatusCode: 204,
    };

    await executeTestCaseOnComputeGateway(scenario);
  });

  it("RGW_idWithAllowedSpecialCharacters", async function () {
    const scenario: TestScenario = {
      name: "RGW_IdWithAllowedSpecialCharacters",
      id: "WithAllowedSpecial,=.:~+-@()^${}[]!_Chars",
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: 200,
      expectedReplaceStatusCode: 200,
      expectedDeleteStatusCode: 204,
    };

    await executeTestCase(scenario);
  });

  it("CGW_idWithAllowedSpecialCharacters", async function () {
    const scenario: TestScenario = {
      name: "CGW_IdWithAllowedSpecialCharacters",
      id: "WithAllowedSpecial,=.:~+-@()^${}[]!_Chars",
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: 200,
      expectedReplaceStatusCode: 200,
      expectedDeleteStatusCode: 204,
    };

    await executeTestCaseOnComputeGateway(scenario);
  });

  it("RGW_idWithBase64EncodedIdCharacters", async function () {
    const base64EncodedId =
      "BQE1D3PdG4N4bzU9TKaCIM3qc0TVcZ2/Y3jnsRfwdHC1ombkX3F1dot/SG0/UTq9AbgdX3" +
      "kOWoP6qL6lJqWeKgV3zwWWPZO/t5X0ehJzv9LGkWld07LID2rhWhGT6huBM6Q=";
    const safeBase64EncodedId = base64EncodedId.replace(/\//g, "-");

    const scenario: TestScenario = {
      name: "RGW_IdWithBase64EncodedIdCharacters",
      id: safeBase64EncodedId,
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: 200,
      expectedReplaceStatusCode: 200,
      expectedDeleteStatusCode: 204,
    };

    await executeTestCase(scenario);
  });

  it("CGW_idWithBase64EncodedIdCharacters", async function () {
    const base64EncodedId =
      "BQE1D3PdG4N4bzU9TKaCIM3qc0TVcZ2/Y3jnsRfwdHC1ombkX3F1dot/SG0/UTq9AbgdX3" +
      "kOWoP6qL6lJqWeKgV3zwWWPZO/t5X0ehJzv9LGkWld07LID2rhWhGT6huBM6Q=";
    const safeBase64EncodedId = base64EncodedId.replace(/\//g, "-");

    const scenario: TestScenario = {
      name: "CGW_IdWithBase64EncodedIdCharacters",
      id: safeBase64EncodedId,
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: 200,
      expectedReplaceStatusCode: 200,
      expectedDeleteStatusCode: 204,
    };

    await executeTestCaseOnComputeGateway(scenario);
  });

  it("RGW_idEndingWithPercentEncodedWhitespace", async function () {
    const scenario: TestScenario = {
      name: "RGW_IdEndingWithPercentEncodedWhitespace",
      id: "IdEndingWithPercentEncodedWhitespace%20",
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: 401,
      expectedReplaceStatusCode: 401,
      expectedDeleteStatusCode: 401,
    };

    await executeTestCase(scenario);
  });

  it("CGW_idEndingWithPercentEncodedWhitespace", async function () {
    const scenario: TestScenario = {
      name: "CGW_IdEndingWithPercentEncodedWhitespace",
      id: "IdEndingWithPercentEncodedWhitespace%20",
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: 200,
      expectedReplaceStatusCode: 200,
      expectedDeleteStatusCode: 204,
    };

    await executeTestCaseOnComputeGateway(scenario);
  });

  it("RGW_idWithPercentEncodedSpecialChar", async function () {
    const scenario: TestScenario = {
      name: "RGW_IdWithPercentEncodedSpecialChar",
      id: "WithPercentEncodedSpecialChar%E9%B1%80",
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: 401,
      expectedReplaceStatusCode: 401,
      expectedDeleteStatusCode: 401,
    };

    await executeTestCase(scenario);
  });

  it("CGW_idWithPercentEncodedSpecialChar", async function () {
    const scenario: TestScenario = {
      name: "CGW_IdWithPercentEncodedSpecialChar",
      id: "WithPercentEncodedSpecialChar%E9%B1%80",
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: 200,
      expectedReplaceStatusCode: 200,
      expectedDeleteStatusCode: 204,
    };

    await executeTestCaseOnComputeGateway(scenario);
  });

  it("RGW_idWithDisallowedCharQuestionMark", async function () {
    const scenario: TestScenario = {
      name: "RGW_IdWithDisallowedCharQuestionMark",
      id: "Disallowed?Chars",
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: 200,
      expectedReplaceStatusCode: 200,
      expectedDeleteStatusCode: 204,
    };

    await executeTestCase(scenario);
  });

  it("CGW_idWithDisallowedCharQuestionMark", async function () {
    const scenario: TestScenario = {
      name: "CGW_IdWithDisallowedCharQuestionMark",
      id: "Disallowed?Chars",
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: 200,
      expectedReplaceStatusCode: 200,
      expectedDeleteStatusCode: 204,
    };

    await executeTestCaseOnComputeGateway(scenario);
  });

  it("RGW_idWithDisallowedCharForwardSlash", async function () {
    const scenario: TestScenario = {
      name: "RGW_IdWithDisallowedCharForwardSlash",
      id: "Disallowed/Chars",
      expectedCreateStatusCode: 400,
      expectedCreateErrorMessage: "Id contains illegal chars.",
    };

    await executeTestCase(scenario);
  });

  it("CGW_idWithDisallowedCharForwardSlash", async function () {
    const scenario: TestScenario = {
      name: "CGW_IdWithDisallowedCharForwardSlash",
      id: "Disallowed/Chars",
      expectedCreateStatusCode: 400,
      expectedCreateErrorMessage: "Id contains illegal chars.",
    };

    await executeTestCaseOnComputeGateway(scenario);
  });

  it("RGW_idWithDisallowedCharBackSlash", async function () {
    const scenario: TestScenario = {
      name: "RGW_IdWithDisallowedCharBackSlash",
      id: "Disallowed\\Chars",
      expectedCreateStatusCode: 400,
      expectedCreateErrorMessage: "Id contains illegal chars.",
    };

    await executeTestCase(scenario);
  });

  it("CGW_idWithDisallowedCharBackSlash", async function () {
    const scenario: TestScenario = {
      name: "CGW_IdWithDisallowedCharBackSlash",
      id: "Disallowed\\Chars",
      expectedCreateStatusCode: 400,
      expectedCreateErrorMessage: "Id contains illegal chars.",
    };

    await executeTestCaseOnComputeGateway(scenario);
  });

  it("RGW_idWithDisallowedCharPoundSign", async function () {
    const scenario: TestScenario = {
      name: "RGW_IdWithDisallowedCharPoundSign",
      id: "Disallowed#Chars",
      expectedCreateStatusCode: 400,
      expectedCreateErrorMessage: "Id contains illegal chars.",
    };

    await executeTestCase(scenario);
  });

  it("CGW_idWithDisallowedCharPoundSign", async function () {
    const scenario: TestScenario = {
      name: "CGW_IdWithDisallowedCharPoundSign",
      id: "Disallowed#Chars",
      expectedCreateStatusCode: 400,
      expectedCreateErrorMessage: "Id contains illegal chars.",
    };

    await executeTestCaseOnComputeGateway(scenario);
  });

  it("RGW_idWithCarriageReturn", async function () {
    const scenario: TestScenario = {
      name: "RGW_IdWithCarriageReturn",
      id: "With\rCarriageReturn",
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: undefined,
      expectedReplaceStatusCode: undefined,
      expectedDeleteStatusCode: undefined,
    };

    await executeTestCase(scenario);
  });

  it("CGW_idWithCarriageReturn", async function () {
    const scenario: TestScenario = {
      name: "CGW_IdWithCarriageReturn",
      id: "With\rCarriageReturn",
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: 200,
      expectedReplaceStatusCode: 200,
      expectedDeleteStatusCode: 204,
    };

    await executeTestCaseOnComputeGateway(scenario);
  });

  it("RGW_idWithTab", async function () {
    const scenario: TestScenario = {
      name: "RGW_IdWithTab",
      id: "With\tTab",
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: undefined,
      expectedReplaceStatusCode: undefined,
      expectedDeleteStatusCode: undefined,
    };

    await executeTestCase(scenario);
  });

  it("CGW_idWithTab", async function () {
    const scenario: TestScenario = {
      name: "CGW_IdWithTab",
      id: "With\tTab",
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: 200,
      expectedReplaceStatusCode: 200,
      expectedDeleteStatusCode: 204,
    };

    await executeTestCaseOnComputeGateway(scenario);
  });

  it("RGW_idWithLineFeed", async function () {
    const scenario: TestScenario = {
      name: "RGW_IdWithLineFeed",
      id: "With\nLineFeed",
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: undefined,
      expectedReplaceStatusCode: undefined,
      expectedDeleteStatusCode: undefined,
    };

    await executeTestCase(scenario);
  });

  it("CGW_idWithLineFeed", async function () {
    const scenario: TestScenario = {
      name: "CGW_IdWithLineFeed",
      id: "With\nLineFeed",
      expectedCreateStatusCode: 201,
      expectedReadStatusCode: 200,
      expectedReplaceStatusCode: 200,
      expectedDeleteStatusCode: 204,
    };

    await executeTestCaseOnComputeGateway(scenario);
  });
});
