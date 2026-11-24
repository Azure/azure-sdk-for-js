// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import ts from "typescript";

function dataGenerationValues(node, allowLegacy = false) {
  if (!node || !ts.isTypeAliasDeclaration(node) || node.name.text !== "DataGenerationJobType")
    return undefined;
  const expected = new Set(["simple_qna", "traces", "tool_use", "simulation_seed"]);
  const types = ts.isUnionTypeNode(node.type) ? node.type.types : [node.type];
  const values = types.map((type) =>
    ts.isLiteralTypeNode(type) && ts.isStringLiteral(type.literal) ? type.literal.text : undefined,
  );
  if (
    new Set(values).size !== values.length ||
    ![...expected].every((value) => values.includes(value)) ||
    !values.every(
      (value) =>
        expected.has(value) ||
        value === "conversations" ||
        (allowLegacy && value === "task_generation"),
    )
  )
    return undefined;
  return new Set(values);
}

/** The user-approved upstream values; other discriminator changes require review. */
export function isUpstreamDataGenerationType(node, allowLegacy = false) {
  return dataGenerationValues(node, allowLegacy) !== undefined;
}

export function matchesUpstreamDataGenerationType(output, incoming) {
  const actual = dataGenerationValues(output);
  const expected = dataGenerationValues(incoming);
  return Boolean(
    actual &&
    expected &&
    actual.size === expected.size &&
    [...actual].every((v) => expected.has(v)),
  );
}
