// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DeclarableBodyNode, ObjectValue, ResourceDeclarationNode } from "./index.js";

/** Transforms a resource's object body while preserving conditions and loops. */
export function updateResourceBody(
  body: DeclarableBodyNode,
  transform: (value: ObjectValue) => ObjectValue,
): DeclarableBodyNode {
  switch (body.kind) {
    case "object":
      return transform(body);
    case "if-condition":
    case "for-expression": {
      if (
        body.body.kind !== "object" &&
        body.body.kind !== "if-condition" &&
        body.body.kind !== "for-expression"
      ) {
        throw new Error(`Invalid resource body "${body.body.kind}".`);
      }
      return { ...body, body: updateResourceBody(body.body, transform) };
    }
  }
}

/** Gets the object body beneath a resource's condition and loop wrappers. */
export function getResourceBody(body: DeclarableBodyNode): ObjectValue {
  if (body.kind === "object") return body;
  if (
    body.body.kind !== "object" &&
    body.body.kind !== "if-condition" &&
    body.body.kind !== "for-expression"
  ) {
    throw new Error(`Invalid resource body "${body.body.kind}".`);
  }
  return getResourceBody(body.body);
}

/** Removes the scope field without changing other resource declaration data. */
export function removeResourceScope(resource: ResourceDeclarationNode): ResourceDeclarationNode {
  return {
    ...resource,
    value: updateResourceBody(resource.value, (body) => {
      const { scope: _scope, ...rest } = body.value;
      return { ...body, value: rest };
    }),
  };
}

/** Gets the parent declaration identifier, including indexed parent accesses. */
export function getResourceArmParentIdentifier(
  resource: ResourceDeclarationNode,
): string | undefined {
  const parent = getResourceBody(resource.value).value.parent;
  if (parent === undefined) return undefined;
  if (parent.kind === "identifier") return parent.id;
  if (parent.kind === "array-access" && parent.base.kind === "identifier") {
    return parent.base.id;
  }
  throw new Error(`Unsupported ARM parent expression for "${resource.bicepIdentifier}".`);
}
