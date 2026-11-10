// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import ts from "typescript";

/** Reviewed upstream values (#46941 and #47368); other changes require review. */
export function isUpstreamDataGenerationType(node, allowLegacy = false) {
  if (!node || !ts.isTypeAliasDeclaration(node) || node.name.text !== "DataGenerationJobType")
    return false;
  const expected = new Set(["simple_qna", "traces", "tool_use", "simulation_seed"]);
  const types = ts.isUnionTypeNode(node.type) ? node.type.types : [node.type];
  const values = types.map((type) =>
    ts.isLiteralTypeNode(type) && ts.isStringLiteral(type.literal) ? type.literal.text : undefined,
  );
  return (
    [...expected].every((value) => values.includes(value)) &&
    values.every(
      (value) =>
        expected.has(value) ||
        value === "conversations" ||
        (allowLegacy && value === "task_generation"),
    ) &&
    new Set(values).size === values.length
  );
}
