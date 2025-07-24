// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Container, CosmosClient } from "../../../../src/index.js";
import { skipTestForSignOff } from "../../common/_testConfig.js";
import {
  getTestContainer,
  removeAllDatabases,
  getDefaultClient,
  getDefaultComputeGatewayClient,
} from "../../common/TestHelpers.js";
import { describe, it, assert, beforeEach } from "vitest";

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
): Promise<void> {
  const client: CosmosClient = useComputeGateway
    ? getDefaultComputeGatewayClient()
    : getDefaultClient();
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

const executeTestCaseOnComputeGateway = async function (scenario: TestScenario): Promise<void> {
  return executeTestCase(scenario, true);
};

describe("Id encoding", { timeout: 10000 }, () => {
  beforeEach(async () => {
    await removeAllDatabases();
  });

  it("RGW_plainVanillaId", async () => {
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

  it.skipIf(skipTestForSignOff)(
    "CGW_plainVanillaId",
    async () => {
      const scenario: TestScenario = {
        name: "CGW_PlainVanillaId",
        id: "Test",
        expectedCreateStatusCode: 201,
        expectedReadStatusCode: 200,
        expectedReplaceStatusCode: 200,
        expectedDeleteStatusCode: 204,
      };

      await executeTestCaseOnComputeGateway(scenario);
    },
    15000,
  );

  it("RGW_ContainerIdWithUnicode鱀", async () => {
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

  it.skipIf(skipTestForSignOff)("CGW_ContainerIdWithUnicode鱀", async () => {
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

  it("RGW_idWithWhitespaces", async () => {
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

  it.skipIf(skipTestForSignOff)("CGW_idWithWhitespaces", async () => {
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

  it("RGW_idStartingWithWhitespace", async () => {
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

  it.skipIf(skipTestForSignOff)("CGW_idStartingWithWhitespace", async () => {
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

  it("RGW_idStartingWithWhitespaces", async () => {
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

  it.skipIf(skipTestForSignOff)("CGW_idStartingWithWhitespaces", async () => {
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

  it("RGW_idEndingWithWhitespace", async () => {
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

  it.skipIf(skipTestForSignOff)("CGW_idEndingWithWhitespace", async () => {
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

  it("RGW_idEndingWithWhitespaces", async () => {
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

  it.skipIf(skipTestForSignOff)("CGW_idEndingWithWhitespaces", async () => {
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

  it("RGW_idWithUnicodeCharacters", async () => {
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

  it.skipIf(skipTestForSignOff)("CGW_idWithUnicodeCharacters", async () => {
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

  it("RGW_idWithAllowedSpecialCharacters", async () => {
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

  it("CGW_idWithAllowedSpecialCharacters", async () => {
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

  it("RGW_idWithBase64EncodedIdCharacters", async () => {
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

  it.skipIf(skipTestForSignOff)("CGW_idWithBase64EncodedIdCharacters", async () => {
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

  it("RGW_idEndingWithPercentEncodedWhitespace", async () => {
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

  it.skipIf(skipTestForSignOff)("CGW_idEndingWithPercentEncodedWhitespace", async () => {
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

  it("RGW_idWithPercentEncodedSpecialChar", async () => {
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

  it.skipIf(skipTestForSignOff)("CGW_idWithPercentEncodedSpecialChar", async () => {
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

  it("RGW_idWithDisallowedCharQuestionMark", async () => {
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

  it.skipIf(skipTestForSignOff)("CGW_idWithDisallowedCharQuestionMark", async () => {
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

  it("RGW_idWithDisallowedCharForwardSlash", async () => {
    const scenario: TestScenario = {
      name: "RGW_IdWithDisallowedCharForwardSlash",
      id: "Disallowed/Chars",
      expectedCreateStatusCode: 400,
      expectedCreateErrorMessage: "Id contains illegal chars.",
    };

    await executeTestCase(scenario);
  });

  it.skipIf(skipTestForSignOff)("CGW_idWithDisallowedCharForwardSlash", async () => {
    const scenario: TestScenario = {
      name: "CGW_IdWithDisallowedCharForwardSlash",
      id: "Disallowed/Chars",
      expectedCreateStatusCode: 400,
      expectedCreateErrorMessage: "Id contains illegal chars.",
    };

    await executeTestCaseOnComputeGateway(scenario);
  });

  it("RGW_idWithDisallowedCharBackSlash", async () => {
    const scenario: TestScenario = {
      name: "RGW_IdWithDisallowedCharBackSlash",
      id: "Disallowed\\Chars",
      expectedCreateStatusCode: 400,
      expectedCreateErrorMessage: "Id contains illegal chars.",
    };

    await executeTestCase(scenario);
  });

  it.skipIf(skipTestForSignOff)("CGW_idWithDisallowedCharBackSlash", async () => {
    const scenario: TestScenario = {
      name: "CGW_IdWithDisallowedCharBackSlash",
      id: "Disallowed\\Chars",
      expectedCreateStatusCode: 400,
      expectedCreateErrorMessage: "Id contains illegal chars.",
    };

    await executeTestCaseOnComputeGateway(scenario);
  });

  it("RGW_idWithDisallowedCharPoundSign", async () => {
    const scenario: TestScenario = {
      name: "RGW_IdWithDisallowedCharPoundSign",
      id: "Disallowed#Chars",
      expectedCreateStatusCode: 400,
      expectedCreateErrorMessage: "Id contains illegal chars.",
    };

    await executeTestCase(scenario);
  });

  it.skipIf(skipTestForSignOff)("CGW_idWithDisallowedCharPoundSign", async () => {
    const scenario: TestScenario = {
      name: "CGW_IdWithDisallowedCharPoundSign",
      id: "Disallowed#Chars",
      expectedCreateStatusCode: 400,
      expectedCreateErrorMessage: "Id contains illegal chars.",
    };

    await executeTestCaseOnComputeGateway(scenario);
  });

  it("RGW_idWithCarriageReturn", async () => {
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

  it.skipIf(skipTestForSignOff)("CGW_idWithCarriageReturn", async () => {
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

  it("RGW_idWithTab", async () => {
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

  it.skipIf(skipTestForSignOff)("CGW_idWithTab", async () => {
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

  it("RGW_idWithLineFeed", async () => {
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

  it.skipIf(skipTestForSignOff)("CGW_idWithLineFeed", async () => {
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
