// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export * from "./generated/ast.js";

import type {
  ModuleDeclarationNode,
  OutputDeclarationNode,
  ParameterDeclarationNode,
  ResourceDeclarationNode,
  VariableDeclarationNode,
} from "./generated/ast.js";

/** A declaration whose AST may contain expression and type dependencies. */
export type DeclarationNode =
  | ResourceDeclarationNode
  | ModuleDeclarationNode
  | OutputDeclarationNode
  | ParameterDeclarationNode
  | VariableDeclarationNode;

/** Maps emitted identifiers to AST declarations for reference lookup. */
export type AstDeclarationMap = ReadonlyMap<string, DeclarationNode>;
