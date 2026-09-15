// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import ts from "typescript";

const conflict = Symbol("conflict");
const schemas = new Map();

function register(kinds, fields) {
  for (const kind of kinds) schemas.set(ts.SyntaxKind[kind], fields);
}

const namedDeclaration = {
  modifiers: "atomic",
  name: "atomic",
  typeParameters: "typeParameters",
};
register(["InterfaceDeclaration"], {
  ...namedDeclaration,
  heritageClauses: "atomic",
  members: "members",
});
register(["ClassDeclaration", "ClassExpression"], {
  ...namedDeclaration,
  heritageClauses: "atomic",
  members: "orderedMembers",
});
register(["TypeAliasDeclaration"], { ...namedDeclaration, type: "node" });
register(
  [
    "FunctionDeclaration",
    "FunctionExpression",
    "ArrowFunction",
    "MethodDeclaration",
    "MethodSignature",
    "GetAccessor",
    "SetAccessor",
    "Constructor",
    "FunctionType",
    "ConstructorType",
    "CallSignature",
    "ConstructSignature",
    "IndexSignature",
  ],
  {
    ...namedDeclaration,
    asteriskToken: "atomic",
    questionToken: "atomic",
    parameters: "parameters",
    type: "node",
    body: "node",
  },
);
register(["PropertyDeclaration", "PropertySignature", "Parameter", "VariableDeclaration"], {
  modifiers: "atomic",
  name: "atomic",
  dotDotDotToken: "atomic",
  questionToken: "atomic",
  exclamationToken: "atomic",
  type: "node",
  initializer: "node",
});
register(["TypeParameter"], {
  modifiers: "atomic",
  name: "atomic",
  constraint: "node",
  default: "node",
});
register(["TypeLiteral"], { members: "members" });
register(["ObjectLiteralExpression"], { properties: "orderedMembers" });
register(["PropertyAssignment"], { name: "atomic", initializer: "node" });
register(["ShorthandPropertyAssignment"], {
  name: "atomic",
  objectAssignmentInitializer: "node",
});
register(["SpreadAssignment"], { expression: "atomic" });
register(["Block"], { statements: "statements" });
register(["VariableStatement"], { modifiers: "atomic", declarationList: "node" });
register(["VariableDeclarationList"], { declarations: "declarations" });
register(
  [
    "ReturnStatement",
    "ThrowStatement",
    "ExpressionStatement",
    "AwaitExpression",
    "ParenthesizedExpression",
    "NonNullExpression",
  ],
  { expression: "node" },
);
register(["CallExpression", "NewExpression"], {
  expression: "atomic",
  questionDotToken: "atomic",
  typeArguments: "positional",
  arguments: "positional",
});
register(["PropertyAccessExpression"], {
  expression: "node",
  questionDotToken: "atomic",
  name: "atomic",
});
register(["ElementAccessExpression"], {
  expression: "node",
  questionDotToken: "atomic",
  argumentExpression: "node",
});
register(["AsExpression", "SatisfiesExpression", "TypeAssertionExpression"], {
  expression: "node",
  type: "node",
});
register(["ArrayLiteralExpression", "TupleType"], { elements: "positional" });
register(["TypeReference"], { typeName: "atomic", typeArguments: "positional" });
register(["ParenthesizedType"], { type: "node" });
register(["ArrayType"], { elementType: "node" });
register(["UnionType"], { types: "union" });
register(["BinaryExpression"], { left: "atomic", operatorToken: "atomic", right: "node" });
register(["ConditionalExpression"], {
  condition: "atomic",
  whenTrue: "node",
  whenFalse: "node",
});
register(["IfStatement"], {
  expression: "atomic",
  thenStatement: "node",
  elseStatement: "node",
});
register(["SwitchStatement"], { expression: "atomic", caseBlock: "node" });
register(["CaseBlock"], { clauses: "cases" });
register(["CaseClause", "DefaultClause"], { expression: "atomic", statements: "statements" });

/**
 * A syntax-only, in-memory merger. Callers own symbol normalization, package
 * policy, import reconciliation, type checking, and publishing the result.
 *
 * Null inputs represent absence. A null result with no diagnostics is a
 * deletion; any diagnostics mean that no result may be published.
 *
 * Only the schemas above are recursively merged. Runtime lists require an
 * unambiguous order, except disjoint named object additions made of literals
 * and plain data reads. Those retain their baseline insertion regions, then
 * prefer custom before incoming; any spreads must be existing unchanged
 * anchors. Positional lists also require unchanged arity. Union/type members
 * and terminal, literal switch cases allow independent additions. Union and
 * terminal-case presentation order cannot introduce a semantic conflict.
 * Concurrent call/assignment/branch edits require stable targets/conditions.
 * Overloads, dynamic computed names, fallthrough cases, and unknown concurrent
 * syntax changes deliberately require resolution by the caller.
 *
 * @typedef {{ file: string, declaration: string, member?: string, message: string }} Diagnostic
 */

function parse(text) {
  const file = ts.createSourceFile(
    "declaration.ts",
    text,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
  const host = {
    getSourceFile: (name) => (name === file.fileName ? file : undefined),
    getDefaultLibFileName: () => "lib.d.ts",
    getCurrentDirectory: () => "",
    getCanonicalFileName: (name) => name,
    useCaseSensitiveFileNames: () => true,
    getNewLine: () => "\n",
    fileExists: (name) => name === file.fileName,
    readFile: (name) => (name === file.fileName ? text : undefined),
    writeFile: () => {
      throw new Error("The declaration merger cannot write files.");
    },
  };
  const program = ts.createProgram(
    [file.fileName],
    { noLib: true, noResolve: true, types: [], target: ts.ScriptTarget.Latest },
    host,
  );
  return { file, diagnostics: program.getSyntacticDiagnostics(file) };
}

function isDocumentation(node) {
  return node.kind >= ts.SyntaxKind.FirstJSDocNode && node.kind <= ts.SyntaxKind.LastJSDocNode;
}

function fingerprints() {
  const trees = new WeakMap();
  const keys = new WeakMap();
  function tree(value) {
    if (value === null) return null;
    if (trees.has(value)) return trees.get(value);
    let result;
    if (Array.isArray(value)) {
      result = ["list", ...value.map(tree)];
    } else {
      const children = value.getChildren(value.getSourceFile()).filter((n) => !isDocumentation(n));
      result = children.length
        ? [value.kind, ...children.map(tree)]
        : [
            value.kind,
            ts.isStringLiteral(value) || ts.isIdentifier(value)
              ? value.text
              : value.getText(value.getSourceFile()),
          ];
    }
    trees.set(value, result);
    return result;
  }
  return (value) => {
    if (value === null) return "null";
    if (!keys.has(value)) keys.set(value, JSON.stringify(tree(value)));
    return keys.get(value);
  };
}

/**
 * Return an AST/token fingerprint, ignoring comments, whitespace, and string
 * quote style, but retaining statement boundaries, operators, and literal data.
 * Parser errors throw SyntaxError; non-string input throws TypeError.
 *
 * @param {string} text
 * @returns {string}
 */
export function canonicalize(text) {
  if (typeof text !== "string") throw new TypeError("Expected TypeScript source text.");
  const { file, diagnostics } = parse(text);
  if (diagnostics.length) {
    throw new SyntaxError(
      diagnostics.map((d) => ts.flattenDiagnosticMessageText(d.messageText, "\n")).join("\n"),
    );
  }
  return fingerprints()(file);
}

function piece(node) {
  if (node === null) return null;
  const file = node.getSourceFile();
  return {
    kind: node.kind,
    leading: file.text.slice(node.pos, node.getStart(file)),
    text: node.getText(file),
  };
}

function choose(base, custom, incoming, key) {
  if (key(incoming) === key(base)) return { value: custom };
  if (key(custom) === key(base)) return { value: incoming };
  if (key(custom) === key(incoming)) return { value: custom };
  return undefined;
}

function applyTrivia(text, start, end, edits) {
  let result = text.slice(start, end);
  for (const edit of edits
    .filter((e) => e.start >= start && e.end <= end)
    .sort((a, b) => b.start - a.start)) {
    result = result.slice(0, edit.start - start) + edit.text + result.slice(edit.end - start);
  }
  return result;
}

function triviaEdits(base, custom, incoming, state, mode) {
  const edits = new Map();
  function visit(before, ours, theirs) {
    if (!before || !ours || !theirs || before.kind !== ours.kind || before.kind !== theirs.kind)
      return;
    if (piece(ours).leading.trim() !== piece(before).leading.trim()) {
      edits.set(theirs.pos, {
        start: theirs.pos,
        end: theirs.getStart(),
        text: piece(ours).leading,
      });
    }
    for (const [field, fieldMode] of Object.entries(schemas.get(before.kind) ?? {})) {
      if (fieldMode === "atomic") continue;
      const values = [before, ours, theirs].map((node) => node[field] ?? null);
      if (values.every(Array.isArray)) visitList(...values, fieldMode);
      else if (!values.some(Array.isArray)) visit(...values);
    }
  }
  function visitList(before, ours, theirs, listMode) {
    if (listMode === "positional") {
      if (before.length === ours.length && before.length === theirs.length) {
        before.forEach((node, index) => visit(node, ours[index], theirs[index]));
      }
      return;
    }
    const maps = [before, ours, theirs].map((nodes) => {
      const entries = nodes.map((node) => [listKey(node, listMode, state), node]);
      const map = new Map(entries);
      return !map.has(null) && map.size === nodes.length ? map : null;
    });
    // Comments must not create semantic conflicts. Only carry documentation
    // across identities that remain uniquely attributable.
    if (maps.some((map) => map === null)) return;
    for (const [key, node] of maps[0]) visit(node, maps[1].get(key), maps[2].get(key));
  }
  if (mode) visitList(base, custom, incoming, mode);
  else visit(base, custom, incoming);
  return [...edits.values()];
}

function selectedPiece(selected, base, custom, state) {
  const result = piece(selected);
  if (result && base && custom && piece(custom).leading.trim() !== piece(base).leading.trim()) {
    result.leading = piece(custom).leading;
  }
  if (result && base && custom && selected !== custom) {
    result.text = applyTrivia(
      selected.getSourceFile().text,
      selected.getStart(),
      selected.end,
      triviaEdits(base, custom, selected, state),
    );
  }
  return result;
}

function childPath(path, child) {
  return path ? `${path}.${child}` : child;
}

function staticName(name) {
  if (!name) return null;
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isPrivateIdentifier(name)) {
    return name.text;
  }
  if (ts.isNumericLiteral(name)) return String(Number(name.text));
  if (ts.isComputedPropertyName(name)) {
    const expression = name.expression;
    if (ts.isStringLiteral(expression) || ts.isNumericLiteral(expression)) {
      return staticName(expression);
    }
  }
  return null;
}

function memberKey(node) {
  if (
    ts.isConstructorDeclaration(node) ||
    ts.isIndexSignatureDeclaration(node) ||
    ts.isCallSignatureDeclaration(node) ||
    ts.isConstructSignatureDeclaration(node) ||
    ts.isSpreadAssignment(node)
  ) {
    return JSON.stringify([node.kind]);
  }
  const name = staticName(node.name);
  if (name === null) return null;
  const scope = Boolean(node.modifiers?.some((m) => m.kind === ts.SyntaxKind.StaticKeyword));
  const accessor = ts.isGetAccessor(node) ? "get" : ts.isSetAccessor(node) ? "set" : "member";
  return JSON.stringify([scope, ts.isPrivateIdentifier(node.name), accessor, name]);
}

function bindingNames(name) {
  if (ts.isIdentifier(name)) return [name.text];
  return name.elements.flatMap((element) =>
    ts.isOmittedExpression(element) ? [] : bindingNames(element.name),
  );
}

function caseKey(node) {
  if (ts.isDefaultClause(node)) return "<default>";
  const expression = node.expression;
  if (ts.isStringLiteral(expression)) return JSON.stringify(["string", expression.text]);
  if (ts.isNumericLiteral(expression)) return `number ${Number(expression.text)}`;
  if (
    ts.isPrefixUnaryExpression(expression) &&
    ts.isNumericLiteral(expression.operand) &&
    [ts.SyntaxKind.PlusToken, ts.SyntaxKind.MinusToken].includes(expression.operator)
  ) {
    return `number ${Number(expression.operand.text) * (expression.operator === ts.SyntaxKind.MinusToken ? -1 : 1)}`;
  }
  if (
    [ts.SyntaxKind.TrueKeyword, ts.SyntaxKind.FalseKeyword, ts.SyntaxKind.NullKeyword].includes(
      expression.kind,
    )
  ) {
    return ts.SyntaxKind[expression.kind];
  }
  return null;
}

function inAssignmentPattern(node) {
  const parent = node.parent;
  if (!parent) return false;
  if (ts.isBinaryExpression(parent)) {
    return parent.left === node && parent.operatorToken.kind === ts.SyntaxKind.EqualsToken;
  }
  if (ts.isForInStatement(parent) || ts.isForOfStatement(parent)) {
    return parent.initializer === node;
  }
  if (
    ts.isObjectLiteralExpression(parent) ||
    ts.isArrayLiteralExpression(parent) ||
    (ts.isPropertyAssignment(parent) && parent.initializer === node) ||
    ((ts.isParenthesizedExpression(parent) ||
      ts.isSpreadAssignment(parent) ||
      ts.isSpreadElement(parent)) &&
      parent.expression === node)
  ) {
    return inAssignmentPattern(parent);
  }
  return false;
}

function validateTree(root, side, state) {
  function unique(names, path, label) {
    const seen = new Set();
    for (const name of names) {
      if (seen.has(name)) {
        state.fail(childPath(path, name), `${side}: duplicate ${label} "${name}".`);
      }
      seen.add(name);
    }
  }
  function declarations(statements) {
    return statements.flatMap((statement) => {
      if (ts.isVariableStatement(statement)) {
        return statement.declarationList.declarations.flatMap((d) => bindingNames(d.name));
      }
      return statement.name && ts.isIdentifier(statement.name) ? [statement.name.text] : [];
    });
  }
  function visit(node, path) {
    let members = ts.isObjectLiteralExpression(node)
      ? node.properties
      : ts.isInterfaceDeclaration(node) ||
          ts.isTypeLiteralNode(node) ||
          ts.isClassLike(node) ||
          ts.isEnumDeclaration(node)
        ? node.members
        : undefined;
    if (ts.isClassLike(node)) {
      const constructors = node.members.filter(ts.isConstructorDeclaration);
      if (constructors.length > 1) state.fail(path, `${side}: duplicate constructor declarations.`);
      const parameterProperties = constructors.flatMap((constructor) =>
        constructor.parameters.filter((parameter) =>
          parameter.modifiers?.some((modifier) =>
            [
              ts.SyntaxKind.PublicKeyword,
              ts.SyntaxKind.PrivateKeyword,
              ts.SyntaxKind.ProtectedKeyword,
              ts.SyntaxKind.ReadonlyKeyword,
            ].includes(modifier.kind),
          ),
        ),
      );
      members = [...members, ...parameterProperties];
    }
    if (members) {
      const seen = new Map();
      for (const member of members) {
        const name = staticName(member.name);
        if (name === null) continue;
        const scope = member.modifiers?.some((m) => m.kind === ts.SyntaxKind.StaticKeyword)
          ? "static "
          : "";
        const label = `${scope}${name}`;
        const key = JSON.stringify([scope, ts.isPrivateIdentifier(member.name), name]);
        const previous = seen.get(key) ?? [];
        const complementaryAccessor =
          previous.length === 1 &&
          ((ts.isGetAccessor(previous[0]) && ts.isSetAccessor(member)) ||
            (ts.isSetAccessor(previous[0]) && ts.isGetAccessor(member)));
        if (previous.length && !complementaryAccessor) {
          state.fail(childPath(path, label), `${side}: duplicate named member "${label}".`);
        }
        seen.set(key, [...previous, member]);
      }
    }
    if (node.typeParameters) {
      unique(
        node.typeParameters.map((p) => p.name.text),
        path,
        "type parameter",
      );
      let defaultSeen = false;
      for (const parameter of node.typeParameters) {
        if (defaultSeen && !parameter.default) {
          state.fail(path, `${side}: required type parameter follows a defaulted type parameter.`);
        }
        defaultSeen ||= Boolean(parameter.default);
      }
    }
    if (ts.isFunctionLike(node)) {
      const names = node.parameters.flatMap((p) => bindingNames(p.name));
      unique(names, path, "parameter");
      if (node.body && ts.isBlock(node.body)) {
        const lexical = node.body.statements.filter(
          (statement) =>
            ts.isClassDeclaration(statement) ||
            (ts.isVariableStatement(statement) &&
              (statement.declarationList.flags & ts.NodeFlags.BlockScoped) !== 0),
        );
        unique([...names, ...declarations(lexical)], path, "parameter/local binding");
      }
      let optionalSeen = false;
      for (const [index, parameter] of node.parameters.entries()) {
        if (
          (parameter.questionToken && parameter.initializer) ||
          (parameter.dotDotDotToken &&
            (index !== node.parameters.length - 1 ||
              parameter.questionToken ||
              parameter.initializer))
        ) {
          state.fail(path, `${side}: invalid optional, defaulted, or rest parameter combination.`);
        }
        if (
          optionalSeen &&
          !parameter.questionToken &&
          !parameter.initializer &&
          !parameter.dotDotDotToken
        ) {
          state.fail(path, `${side}: required parameter follows an optional parameter.`);
        }
        optionalSeen ||= Boolean(parameter.questionToken);
      }
    }
    if (ts.isVariableDeclarationList(node)) {
      unique(
        node.declarations.flatMap((d) => bindingNames(d.name)),
        path,
        "binding",
      );
    }
    if (ts.isBlock(node)) unique(declarations(node.statements), path, "declaration");
    if (ts.isCaseBlock(node)) {
      unique(
        node.clauses.map(caseKey).filter((key) => key !== null),
        path,
        "switch case",
      );
      unique(
        declarations(node.clauses.flatMap((clause) => [...clause.statements])),
        path,
        "declaration",
      );
    }
    if (
      ts.isPropertySignature(node) &&
      node.getChildren().some((child) => child.kind === ts.SyntaxKind.EqualsToken)
    ) {
      state.fail(path, `${side}: malformed TypeScript: a type member cannot have an initializer.`);
    }
    if (
      ts.isShorthandPropertyAssignment(node) &&
      node.objectAssignmentInitializer &&
      !inAssignmentPattern(node)
    ) {
      state.fail(
        path,
        `${side}: malformed TypeScript: property defaults require an assignment pattern.`,
      );
    }
    if (
      (ts.isPropertyAssignment(node) || ts.isShorthandPropertyAssignment(node)) &&
      node
        .getChildren()
        .some((child) =>
          [ts.SyntaxKind.QuestionToken, ts.SyntaxKind.ExclamationToken].includes(child.kind),
        )
    ) {
      state.fail(
        path,
        `${side}: malformed TypeScript: an object property cannot be optional or definite.`,
      );
    }
    ts.forEachChild(node, (child) => {
      const name = child.name ? staticName(child.name) : null;
      visit(child, name === null ? path : childPath(path, name));
    });
  }
  visit(root, "");
}

function listPiece(nodes, owner, edits = []) {
  if (nodes === null) return null;
  const text = owner.getSourceFile().text;
  const position = nodes.pos ?? nodes[0].pos;
  const end = nodes.end ?? nodes.at(-1).end;
  const start = nodes.length ? nodes[0].getStart(owner.getSourceFile()) : position;
  return {
    leading: applyTrivia(text, position, start, edits),
    text: applyTrivia(text, start, end, edits),
  };
}

// Splice only public AST field ranges. Printing nodes from different source
// files together can misattribute literal text and comments to the wrong file.
function layout(node, fields, state, path) {
  const slots = [];
  const shape = [];
  const file = node.getSourceFile();
  const start = node.getStart(file);
  for (const child of node.getChildren(file).filter((n) => !isDocumentation(n))) {
    const field = Object.keys(fields).find((name) => {
      const value = node[name];
      return (
        value === child ||
        (Array.isArray(value) &&
          child.kind === ts.SyntaxKind.SyntaxList &&
          value.pos === child.pos &&
          value.end === child.end)
      );
    });
    if (field) {
      const isList = Array.isArray(node[field]);
      const slotStart = isList ? child.pos : child.getStart(file);
      slots.push({
        field,
        start: Math.max(start, slotStart),
        end: child.end,
        includeLeading: isList && slotStart >= start,
      });
      shape.push(["slot", field]);
    } else {
      shape.push(["syntax", state.key(child)]);
    }
  }
  if (
    Object.keys(fields).some(
      (field) => node[field] != null && slots.filter((slot) => slot.field === field).length !== 1,
    )
  ) {
    return state.fail(path, "Unsupported AST layout; a merge field has no unique source range.");
  }
  return { node, slots, key: JSON.stringify(shape) };
}

function render(template, parts, custom, state, path) {
  if (
    [...parts].some(
      ([field, value]) => (value !== null) !== template.slots.some((slot) => slot.field === field),
    )
  ) {
    return state.fail(path, "Concurrent syntax changes cannot represent every merged field.");
  }
  const file = template.node.getSourceFile();
  let position = template.node.getStart(file);
  let text = "";
  for (const slot of template.slots) {
    const value = parts.get(slot.field);
    text += file.text.slice(position, slot.start);
    text += (slot.includeLeading ? value.leading : "") + value.text;
    position = slot.end;
  }
  text += file.text.slice(position, template.node.end);
  return { ...piece(custom), text };
}

function listKey(node, mode, state) {
  if (mode === "members" || mode === "orderedMembers") return memberKey(node);
  if (mode === "parameters" || mode === "typeParameters" || mode === "declarations") {
    return ts.isIdentifier(node.name) ? node.name.text : null;
  }
  if (mode === "union") {
    if (ts.isTypeReferenceNode(node)) return `reference ${state.key(node.typeName)}`;
    if (ts.isLiteralTypeNode(node)) return `literal ${state.key(node.literal)}`;
    return `type ${ts.SyntaxKind[node.kind]}`;
  }
  if (mode === "cases") {
    return caseKey(node);
  }
  if (ts.isVariableStatement(node)) {
    const name = node.declarationList.declarations[0].name;
    return ts.isIdentifier(name) ? `variable ${name.text}` : null;
  }
  if (
    ts.isExpressionStatement(node) &&
    ts.isBinaryExpression(node.expression) &&
    node.expression.operatorToken.kind === ts.SyntaxKind.EqualsToken
  ) {
    return `assignment ${state.key(node.expression.left)}`;
  }
  // Unnamed statements must be unique by kind; never align them by index or a
  // content hash that would disguise an edit as an unrelated deletion/addition.
  return `statement ${ts.SyntaxKind[node.kind]}`;
}

function hasStableSpreads(base, custom, incoming, state) {
  const spreads = [base, custom, incoming].map((nodes) => nodes.filter(ts.isSpreadAssignment));
  return (
    spreads[0].length > 0 && spreads.every((nodes) => state.key(nodes) === state.key(spreads[0]))
  );
}

function indexList(nodes, mode, state, path, spreadAnchors = false) {
  const result = new Map();
  let spreadIndex = 0;
  for (const node of nodes) {
    // Ordinal spread identities are safe only for an unchanged spread sequence.
    const key =
      spreadAnchors && ts.isSpreadAssignment(node)
        ? JSON.stringify(["spread", spreadIndex++])
        : listKey(node, mode, state);
    if (key === null || result.has(key)) {
      return state.fail(path, "List elements do not have unique, stable identities.");
    }
    result.set(key, node);
  }
  return result;
}

function insertionPriorities(before, maps) {
  const positions = new Map([...before.keys()].map((key, index) => [key, index + 1]));
  const result = new Map();
  for (const map of maps) {
    let position = 0;
    for (const key of map.keys()) {
      if (positions.has(key)) position = positions.get(key);
      else if (!result.has(key)) result.set(key, position);
    }
  }
  return result;
}

function mergeOrder(maps, live, allowTie, state, path, priorities, orderIndependent = false) {
  const edges = new Map([...live].map((key) => [key, new Set()]));
  const indegree = new Map([...live].map((key) => [key, 0]));
  for (const map of maps) {
    const keys = [...map.keys()].filter((key) => live.has(key));
    for (let index = 1; index < keys.length; index++) {
      const before = keys[index - 1];
      const after = keys[index];
      if (!edges.get(before).has(after)) {
        edges.get(before).add(after);
        indegree.set(after, indegree.get(after) + 1);
      }
    }
  }
  const order = [];
  const pending = new Set([...maps[0].keys(), ...maps[1].keys()].filter((key) => live.has(key)));
  while (pending.size) {
    const ready = [...pending].filter((key) => indegree.get(key) === 0);
    if (!ready.length && orderIndependent) {
      // Content was merged by identity already. Contradictory presentation
      // orders are harmless for unions and validated terminal literal cases.
      const preferred = [...new Set(maps.flatMap((map) => [...map.keys()]))].filter((key) =>
        live.has(key),
      );
      return [
        ...preferred.filter((key) => key !== "<default>"),
        ...preferred.filter((key) => key === "<default>"),
      ];
    }
    if (!ready.length || (ready.length > 1 && !allowTie(ready, pending))) {
      return state.fail(
        path,
        "Ambiguous ordering: concurrent insertions or reordering require resolution.",
      );
    }
    // Deleted baseline members still anchor where custom additions originated.
    const next = ready.reduce((first, key) =>
      (priorities.get(key) ?? 0) < (priorities.get(first) ?? 0) ? key : first,
    );
    order.push(next);
    pending.delete(next);
    for (const after of edges.get(next)) indegree.set(after, indegree.get(after) - 1);
  }
  return order;
}

function isDataMappingValue(node) {
  switch (node.kind) {
    case ts.SyntaxKind.Identifier:
    case ts.SyntaxKind.ThisKeyword:
    case ts.SyntaxKind.StringLiteral:
    case ts.SyntaxKind.NumericLiteral:
    case ts.SyntaxKind.BigIntLiteral:
    case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
    case ts.SyntaxKind.TrueKeyword:
    case ts.SyntaxKind.FalseKeyword:
    case ts.SyntaxKind.NullKeyword:
      return true;
    case ts.SyntaxKind.PropertyAccessExpression:
      return isDataMappingValue(node.expression);
    case ts.SyntaxKind.ElementAccessExpression:
      return (
        isDataMappingValue(node.expression) &&
        (ts.isStringLiteral(node.argumentExpression) ||
          ts.isNumericLiteral(node.argumentExpression))
      );
    case ts.SyntaxKind.ParenthesizedExpression:
    case ts.SyntaxKind.AsExpression:
    case ts.SyntaxKind.SatisfiesExpression:
    case ts.SyntaxKind.TypeAssertionExpression:
    case ts.SyntaxKind.NonNullExpression:
      return isDataMappingValue(node.expression);
    case ts.SyntaxKind.PrefixUnaryExpression:
      return (
        ts.isNumericLiteral(node.operand) &&
        [ts.SyntaxKind.PlusToken, ts.SyntaxKind.MinusToken].includes(node.operator)
      );
    case ts.SyntaxKind.ArrayLiteralExpression:
      return node.elements.every(isDataMappingValue);
    case ts.SyntaxKind.ObjectLiteralExpression:
      return node.properties.every(isDataMappingProperty);
    default:
      return false;
  }
}

function isDataMappingProperty(node) {
  const name = node.name;
  if (!name || !(ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name))) {
    return false;
  }
  if (ts.isShorthandPropertyAssignment(node)) return !node.objectAssignmentInitializer;
  return (
    ts.isPropertyAssignment(node) &&
    staticName(name) !== "__proto__" &&
    isDataMappingValue(node.initializer)
  );
}

function canTieObjectAdditions(ready, pending, [before, ours, theirs]) {
  if ([...before.keys()].some((key) => !ours.has(key) && !theirs.has(key))) {
    return false;
  }
  // A call behind a ready property can still affect reads on the other side.
  // Existing/shared members are already ordered by both source sequences.
  for (const key of pending) {
    if (
      !before.has(key) &&
      (!ours.has(key) || !theirs.has(key)) &&
      !isDataMappingProperty(ours.get(key) ?? theirs.get(key))
    ) {
      return false;
    }
  }
  const names = [];
  for (const key of ready) {
    const node = ours.get(key) ?? theirs.get(key);
    if (before.has(key) || !isDataMappingProperty(node)) {
      return false;
    }
    names.push(staticName(node.name));
  }
  // The graph still enforces every spread boundary and each side's ordering.
  // Only plain mappings qualify; no purity assumptions are made about calls.
  return new Set(names).size === names.length;
}

const terminatedKinds = new Set(
  [
    "PropertyDeclaration",
    "PropertySignature",
    "MethodSignature",
    "IndexSignature",
    "CallSignature",
    "ConstructSignature",
    "VariableStatement",
    "ExpressionStatement",
    "ReturnStatement",
    "ThrowStatement",
    "BreakStatement",
    "ContinueStatement",
  ].map((kind) => ts.SyntaxKind[kind]),
);

function joinPieces(pieces, mode) {
  const separator =
    mode === "union"
      ? " | "
      : mode === "statements" || mode === "members" || mode === "cases"
        ? "\n"
        : ",\n";
  const text = pieces.map((value, index) => {
    const terminate = terminatedKinds.has(value.kind) && !value.text.trimEnd().endsWith(";");
    return (index ? value.leading : "") + value.text + (terminate ? ";" : "");
  });
  return { leading: pieces[0]?.leading ?? "", text: text.join(separator) };
}

function safeCases(nodes) {
  return nodes.every((node) => {
    const last = node.statements.at(-1);
    return (
      caseKey(node) !== null &&
      last &&
      (ts.isReturnStatement(last) ||
        ts.isThrowStatement(last) ||
        (ts.isBreakStatement(last) && !last.label))
    );
  });
}

function mergeList(base, custom, incoming, owners, mode, path, state) {
  const selected = choose(base, custom, incoming, state.key);
  if (selected) {
    const edits =
      selected.value === incoming && base && custom && incoming
        ? triviaEdits(base, custom, incoming, state, mode)
        : [];
    return listPiece(selected.value, selected.value === custom ? owners[1] : owners[2], edits);
  }
  if (base === null || custom === null || incoming === null) {
    return state.fail(path, "Conflicting addition/deletion of an AST list.");
  }
  if (mode === "positional") {
    if (
      base.length !== custom.length ||
      base.length !== incoming.length ||
      [...base, ...custom, ...incoming].some(
        (node) =>
          ts.isSpreadElement(node) ||
          ts.isRestTypeNode(node) ||
          ts.isOmittedExpression(node) ||
          (ts.isNamedTupleMember(node) && node.dotDotDotToken),
      )
    ) {
      return state.fail(
        path,
        "Concurrent positional edits require fixed arity and no spread/rest or omitted elements.",
      );
    }
    const pieces = base.map((node, index) =>
      mergeNode(node, custom[index], incoming[index], childPath(path, String(index)), state),
    );
    return pieces.includes(conflict) ? conflict : joinPieces(pieces, mode);
  }
  if (mode === "cases" && ![base, custom, incoming].every(safeCases)) {
    return state.fail(path, "Concurrent switch edits require literal cases with no fallthrough.");
  }
  const objectMembers = mode === "orderedMembers" && ts.isObjectLiteralExpression(owners[1]);
  const spreadAnchors = objectMembers && hasStableSpreads(base, custom, incoming, state);
  const maps = [base, custom, incoming].map((nodes) =>
    indexList(nodes, mode, state, path, spreadAnchors),
  );
  if (maps.includes(conflict)) return conflict;
  const [before, ours, theirs] = maps;
  if (
    (mode === "union" || mode === "cases" || mode === "statements") &&
    [...before.keys()].some((key) => !ours.has(key) && !theirs.has(key)) &&
    [...ours.keys(), ...theirs.keys()].some((key) => !before.has(key))
  ) {
    return state.fail(
      path,
      "Ambiguous replacement: both sides removed a baseline element and added new elements.",
    );
  }
  const merged = new Map();
  for (const key of new Set([...before.keys(), ...ours.keys(), ...theirs.keys()])) {
    const node = ours.get(key) ?? theirs.get(key) ?? before.get(key);
    const label =
      mode === "members" || mode === "orderedMembers"
        ? (staticName(node.name) ?? ts.SyntaxKind[node.kind])
        : key;
    const value = mergeNode(
      before.get(key) ?? null,
      ours.get(key) ?? null,
      theirs.get(key) ?? null,
      childPath(path, label),
      state,
    );
    if (value === conflict) return conflict;
    if (value !== null) merged.set(key, value);
  }
  if (mode === "union" && !merged.size) {
    return state.fail(path, "Independent deletions would leave an empty union.");
  }
  const unordered = mode === "members" || mode === "union" || mode === "cases";
  const fixedSpreadBoundaries =
    spreadAnchors || ![base, custom, incoming].some((nodes) => nodes.some(ts.isSpreadAssignment));
  const allowTie = (ready, pending) =>
    unordered ||
    (objectMembers && fixedSpreadBoundaries && canTieObjectAdditions(ready, pending, maps));
  const priorities = objectMembers ? insertionPriorities(before, [ours, theirs]) : new Map();
  const order = mergeOrder(
    [ours, theirs],
    new Set(merged.keys()),
    allowTie,
    state,
    path,
    priorities,
    mode === "union" || mode === "cases",
  );
  if (order === conflict) return conflict;
  const delimiterMode =
    mode === "orderedMembers" && !ts.isObjectLiteralExpression(owners[1]) ? "members" : mode;
  return joinPieces(
    order.map((key) => merged.get(key)),
    delimiterMode,
  );
}

function safeConcurrentNode(base, custom, incoming, state) {
  const same = (field) =>
    state.key(base[field] ?? null) === state.key(custom[field] ?? null) &&
    state.key(base[field] ?? null) === state.key(incoming[field] ?? null);
  if (ts.isBinaryExpression(base)) {
    return (
      [base, custom, incoming].every(
        (node) => node.operatorToken.kind === ts.SyntaxKind.EqualsToken,
      ) && same("left")
    );
  }
  if (ts.isConditionalExpression(base)) return same("condition");
  if (ts.isIfStatement(base) || ts.isSwitchStatement(base)) return same("expression");
  if (ts.isCallExpression(base) || ts.isNewExpression(base)) {
    return same("expression") && same("questionDotToken");
  }
  if (ts.isPropertyAccessExpression(base)) return same("name") && same("questionDotToken");
  if (ts.isElementAccessExpression(base))
    return same("argumentExpression") && same("questionDotToken");
  return true;
}

function mergeNode(base, custom, incoming, path, state) {
  const selected = choose(base, custom, incoming, state.key);
  if (selected) return selectedPiece(selected.value, base, custom, state);
  if (base === null) return state.fail(path, "Conflicting additions with no common baseline.");
  if (custom === null || incoming === null) {
    return state.fail(path, "Deletion conflicts with a semantic change on the other side.");
  }
  if (
    [base, custom, incoming].some(ts.isUnionTypeNode) &&
    [base, custom, incoming].every(ts.isTypeNode)
  ) {
    const lists = [base, custom, incoming].map((node) =>
      ts.isUnionTypeNode(node) ? node.types : [node],
    );
    const result = mergeList(...lists, [base, custom, incoming], "union", path, state);
    return result === conflict ? conflict : { ...piece(custom), text: result.text };
  }
  if (base.kind !== custom.kind || base.kind !== incoming.kind) {
    return state.fail(path, "Concurrent semantic changes have different syntax kinds.");
  }
  const fields = schemas.get(base.kind);
  if (!fields || !safeConcurrentNode(base, custom, incoming, state)) {
    return state.fail(
      path,
      `Unsupported concurrent semantic changes to ${ts.SyntaxKind[base.kind]}.`,
    );
  }
  const templates = [base, custom, incoming].map((node) => layout(node, fields, state, path));
  if (templates.includes(conflict)) return conflict;
  const template = choose(...templates, (value) => value.key);
  if (!template) {
    return state.fail(path, "Concurrent changes to declaration syntax outside mergeable fields.");
  }
  const parts = new Map();
  for (const [field, mode] of Object.entries(fields)) {
    const values = [base, custom, incoming].map((node) => node[field] ?? null);
    const fieldPath = ["members", "properties", "declarations", "clauses"].includes(field)
      ? path
      : childPath(path, field);
    let value;
    if (mode === "node" || (mode === "atomic" && !values.some(Array.isArray))) {
      const chosen = choose(...values, state.key);
      value =
        mode === "node"
          ? mergeNode(...values, fieldPath, state)
          : chosen
            ? selectedPiece(chosen.value, values[0], values[1], state)
            : state.fail(fieldPath, "Both sides changed an atomic syntax field.");
    } else if (mode === "atomic") {
      const chosen = choose(...values, state.key);
      value = chosen
        ? listPiece(chosen.value, chosen.value === values[1] ? custom : incoming)
        : state.fail(fieldPath, "Both sides changed an atomic syntax list.");
    } else {
      value = mergeList(...values, [base, custom, incoming], mode, fieldPath, state);
    }
    if (value === conflict) return conflict;
    parts.set(field, value);
  }
  return render(template.value, parts, custom, state, path);
}

/**
 * Merge one top-level TypeScript declaration or statement from each side.
 * Exported functions never read or write project files.
 *
 * @param {string | null} baseText
 * @param {string | null} customText
 * @param {string | null} incomingText
 * @param {{ file?: string, declaration?: string }} [context]
 * @returns {{ text: string | null, diagnostics: Diagnostic[] }}
 */
export function mergeDeclaration(baseText, customText, incomingText, context = {}) {
  /** @type {Diagnostic[]} */
  const diagnostics = [];
  const state = {
    key: fingerprints(),
    fail(member, message) {
      diagnostics.push({
        file: context.file ?? "<unknown>",
        declaration: context.declaration ?? "<declaration>",
        ...(member ? { member } : {}),
        message,
      });
      return conflict;
    },
  };
  function input(text, side) {
    if (text === null) return null;
    if (typeof text !== "string") {
      state.fail("", `${side}: expected one TypeScript declaration/statement or null.`);
      return null;
    }
    const { file, diagnostics: errors } = parse(text);
    for (const error of errors) {
      state.fail(
        "",
        `${side}: malformed TypeScript: ${ts.flattenDiagnosticMessageText(error.messageText, "\n")}`,
      );
    }
    if (!errors.length && file.statements.length !== 1) {
      state.fail("", `${side}: expected exactly one top-level declaration or statement.`);
    }
    if (!errors.length && file.statements.length === 1) {
      validateTree(file.statements[0], side, state);
    }
    return file.statements[0] ?? null;
  }
  const base = input(baseText, "base");
  const custom = input(customText, "custom");
  const incoming = input(incomingText, "incoming");
  if (diagnostics.length) return { text: null, diagnostics };

  const result = mergeNode(base, custom, incoming, "", state);
  if (result === conflict || diagnostics.length) return { text: null, diagnostics };
  if (result === null) return { text: null, diagnostics };

  const selected = choose(base, custom, incoming, state.key);
  const origin = selected?.value ?? custom;
  const text = result.leading + result.text + origin.getSourceFile().text.slice(origin.end);
  const verified = input(text, "merged result");
  if (!diagnostics.length && selected && state.key(verified) !== state.key(selected.value)) {
    state.fail("", "Rendering changed the syntax of the selected declaration.");
  }
  return { text: diagnostics.length ? null : text, diagnostics };
}
