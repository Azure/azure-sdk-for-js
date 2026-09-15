// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "node:assert/strict";
import test from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";
import { canonicalize, mergeDeclaration } from "./ast-merge.mjs";

const context = { file: "models\\models.ts", declaration: "Example" };

function evaluate(text, globals) {
  const compiled = ts.transpileModule(text, {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS },
    reportDiagnostics: true,
  });
  assert.deepEqual(compiled.diagnostics, []);
  const sandbox = { exports: {}, ...globals };
  runInNewContext(compiled.outputText, sandbox, { timeout: 1000 });
  return sandbox.exports;
}

function merged(base, custom, incoming, expected) {
  const result = mergeDeclaration(base, custom, incoming, context);
  assert.deepEqual(result.diagnostics, []);
  assert.equal(typeof result.text, "string");
  if (expected !== undefined) assert.equal(canonicalize(result.text), canonicalize(expected));
  return result.text;
}

function rejected(base, custom, incoming, pattern) {
  const result = mergeDeclaration(base, custom, incoming, context);
  assert.equal(result.text, null);
  assert.ok(result.diagnostics.length > 0);
  for (const diagnostic of result.diagnostics) {
    assert.equal(diagnostic.file, context.file);
    assert.equal(diagnostic.declaration, context.declaration);
    assert.equal(typeof diagnostic.message, "string");
  }
  if (pattern) assert.match(result.diagnostics.map((d) => d.message).join("\n"), pattern);
  return result.diagnostics;
}

test("canonicalization ignores trivia and string quote style, not semantics", () => {
  assert.equal(
    canonicalize("export interface Example { /** old */ x: 'value'; }"),
    canonicalize('export   interface Example {\n// new\nx: "value";\n}'),
  );
  assert.notEqual(canonicalize("let x = 1;"), canonicalize("const x = 1;"));
  assert.notEqual(canonicalize("const x = a + b;"), canonicalize("const x = a - b;"));
  assert.notEqual(
    canonicalize("function f() { return x; }"),
    canonicalize("function f() { return\nx; }"),
  );
  assert.notEqual(canonicalize('const x = "a b";'), canonicalize('const x = "ab";'));
});

test("obvious three-way cases keep the changed side and custom formatting on agreement", () => {
  const base = "interface Example { x: string; }";
  const custom = "interface Example { x: string; headers?: Headers; }";
  const incoming = "interface Example { x: string; y?: string; }";
  assert.equal(merged(base, custom, base), custom);
  assert.equal(merged(base, base, incoming), incoming);
  assert.equal(merged(base, custom, custom), custom);
  assert.equal(
    merged('type Example = "a";', "type Example = 'b';", 'type Example = "b";'),
    "type Example = 'b';",
  );
});

test("absence supports genuine additions and deletions, but not ambiguous replacements", () => {
  const base = "interface Example { x: string; }";
  const changed = "interface Example { x: number; }";
  assert.equal(merged(null, base, null), base);
  assert.equal(merged(null, null, base), base);
  assert.equal(merged(null, base, base), base);
  for (const inputs of [
    [null, null, null],
    [base, null, base],
    [base, base, null],
    [base, null, null],
  ]) {
    assert.deepEqual(mergeDeclaration(...inputs), { text: null, diagnostics: [] });
  }
  rejected(null, base, changed, /Conflicting additions/);
  rejected(base, changed, null, /Deletion conflicts/);
  rejected(base, null, changed, /Deletion conflicts/);
});

test("malformed and multi-statement input is rejected even on an unchanged side", () => {
  for (const text of [
    "interface Example { x: ; }",
    "const x = ;",
    "/* unfinished",
    "",
    "const x = 1; const y = 2;",
  ]) {
    rejected(text, text, text, /malformed|exactly one/);
  }
  rejected(undefined, null, null, /expected one/);
  assert.throws(() => canonicalize("const x = ;"), SyntaxError);
  assert.throws(() => canonicalize(null), TypeError);
});

test("independent interface additions retain custom members and incoming requiredness/types", () => {
  const text = merged(
    "export interface Example { x?: string; }",
    "export interface Example { /** Kept documentation. */ x?: string; headers?: Headers; }",
    "export interface Example { x: number; y?: string; }",
    "export interface Example { x: number; headers?: Headers; y?: string; }",
  );
  assert.match(text, /Kept documentation/);
});

test("independent changes to a field's type and optional marker can merge", () => {
  merged(
    "interface Example { x: string; }",
    "interface Example { x: number; }",
    "interface Example { x?: string; }",
    "interface Example { x?: number; }",
  );
});

test("conflicting field changes report the field rather than discard either edit", () => {
  const diagnostics = rejected(
    "interface Example { x: string; }",
    "interface Example { x: number; custom: string; }",
    "interface Example { x: boolean; incoming: string; }",
    /Concurrent semantic changes/,
  );
  assert.ok(diagnostics.some((d) => d.member?.includes("x")));
  rejected(
    "interface Example {}",
    "interface Example { x: string; }",
    "interface Example { x: number; }",
    /Conflicting additions/,
  );
});

test("member deletion conflicts with customization in either direction", () => {
  const base = "interface Example { x: string; unchanged: number; }";
  const edited = "interface Example { x?: string; unchanged: number; }";
  const removed = "interface Example { unchanged: number; added: boolean; }";
  rejected(base, edited, removed, /Deletion conflicts/);
  rejected(base, removed, edited, /Deletion conflicts/);
});

test("unchanged members can be removed while custom-only members survive", () => {
  merged(
    "interface Example { removed: string; x: number; }",
    "interface Example { removed: string; x: number; custom: boolean; }",
    "interface Example { x: number; incoming: boolean; }",
    "interface Example { x: number; custom: boolean; incoming: boolean; }",
  );
});

test("send mapping gains optional input.y and body.y without losing headers or paging", () => {
  const base = `
    export function send(options: { x?: string; } = {}) {
      return client.post({ body: { x: options.x } });
    }
  `;
  const custom = `
    /** Preserve continuation headers. */
    export function send(options: { x?: string; headers?: Headers; pageSize?: number; } = {}) {
      return client.post({
        ...operationOptions(options),
        body: { x: options.x },
        headers: options.headers,
        queryParameters: { page_size: options.pageSize }
      });
    }
  `;
  const incoming = `
    export function send(options: { x?: string; y?: string; } = {}) {
      return client.post({ body: { x: options.x, y: options.y } });
    }
  `;
  const text = merged(
    base,
    custom,
    incoming,
    `
      export function send(options: { x?: string; headers?: Headers; pageSize?: number; y?: string; } = {}) {
        return client.post({
          ...operationOptions(options),
          body: { x: options.x, y: options.y },
          headers: options.headers,
          queryParameters: { page_size: options.pageSize }
        });
      }
    `,
  );
  assert.match(text, /Preserve continuation headers/);
  const { send } = evaluate(text, {
    client: { post: (request) => request },
    operationOptions: () => ({ requestId: "custom-request" }),
  });
  const request = send({ x: "x", y: "y", headers: { preview: "enabled" }, pageSize: 42 });
  assert.deepEqual(JSON.parse(JSON.stringify(request)), {
    requestId: "custom-request",
    body: { x: "x", y: "y" },
    headers: { preview: "enabled" },
    queryParameters: { page_size: 42 },
  });
});

test("nested request and return properties keep customized mappings", () => {
  merged(
    "function serialize(item: Input) { return { body: { x: item.x }, meta: { version: 1 } }; }",
    "function serialize(item: Input) { return { body: { x: customEncode(item.x) }, meta: { version: 1 }, headers: headers }; }",
    "function serialize(item: Input) { return { body: { x: item.x, y: item.y }, meta: { version: 2 } }; }",
    "function serialize(item: Input) { return { body: { x: customEncode(item.x), y: item.y }, meta: { version: 2 }, headers: headers }; }",
  );
});

test("conflicting nested request mappings do not return partial output", () => {
  rejected(
    "function send(options) { return client.post({ body: { x: options.x } }); }",
    "function send(options) { return client.post({ body: { x: encode(options.x) }, headers: headers }); }",
    "function send(options) { return client.post({ body: { x: convert(options.x), y: options.y } }); }",
    /Concurrent semantic changes/,
  );
});

test("stable local declarations, assignments, and returns merge independently", () => {
  merged(
    `function send(options) {
      const request = { x: options.x };
      request.body = { x: options.x };
      return request;
    }`,
    `function send(options) {
      const headers = customHeaders();
      const request = { x: options.x, headers: headers };
      request.body = { x: customEncode(options.x) };
      return request;
    }`,
    `function send(options) {
      const request = { x: options.x };
      request.body = { x: options.x, y: options.y };
      return request;
    }`,
    `function send(options) {
      const headers = customHeaders();
      const request = { x: options.x, headers: headers };
      request.body = { x: customEncode(options.x), y: options.y };
      return request;
    }`,
  );
});

test("method parameter type/default changes preserve custom poller behavior and return types", () => {
  const text = merged(
    `export class Example {
      start(options: OldOptions = { timeout: 30 }): Poller {
        return getLongRunningPoller(context, options);
      }
    }`,
    `export class Example {
      private headers = {};
      start(options: OldOptions = { timeout: 60 }): JobPoller {
        return getJobPoller(context, { ...options, pollHeaders: this.headers });
      }
    }`,
    `export class Example {
      start(options: NewOptions = { timeout: 30 }): Poller {
        return getLongRunningPoller(context, options);
      }
      cancel(): void { cancelJob(); }
    }`,
    `export class Example {
      private headers = {};
      start(options: NewOptions = { timeout: 60 }): JobPoller {
        return getJobPoller(context, { ...options, pollHeaders: this.headers });
      }
      cancel(): void { cancelJob(); }
    }`,
  );
  const { Example } = evaluate(text, {
    context: { endpoint: "offline" },
    getLongRunningPoller: () => assert.fail("The generated poller replaced custom behavior."),
    getJobPoller: (client, options) => ({ jobId: "preserved-id", client, options }),
  });
  const result = new Example().start();
  assert.equal(result.jobId, "preserved-id");
  assert.deepEqual(JSON.parse(JSON.stringify(result.options)), { timeout: 60, pollHeaders: {} });
});

test("incoming parameter defaults update while a custom body remains intact", () => {
  merged(
    "function start(options: Options = {}): Poller { return getLongRunningPoller(options); }",
    "function start(options: Options = {}): JobPoller { logStart(); return getJobPoller(options); }",
    'function start(options: Options = { apiVersion: "preview" }): Poller { return getLongRunningPoller(options); }',
    'function start(options: Options = { apiVersion: "preview" }): JobPoller { logStart(); return getJobPoller(options); }',
  );
});

test("conflicting parameter defaults fail even when other signature edits are independent", () => {
  rejected(
    "function send(retries: number = 1) { return retries; }",
    "function send(retries: number = 2): number { return retries; }",
    "function send(retries: number = 3) { return retries; }",
    /semantic changes/,
  );
});

test("named parameters can be inserted in different, unambiguous positions", () => {
  merged(
    "declare function send(first: string, last: string): void;",
    "declare function send(context: Context, first: string, last: string): void;",
    "declare function send(first: string, last: string, options?: Options): void;",
    "declare function send(context: Context, first: string, last: string, options?: Options): void;",
  );
});

test("competing parameter insertions are not arbitrarily ordered", () => {
  rejected(
    "declare function send(x: string): void;",
    "declare function send(x: string, headers?: Headers): void;",
    "declare function send(x: string, options?: Options): void;",
    /Ambiguous ordering/,
  );
});

test("function-valued properties and arrows merge signatures and request bodies", () => {
  merged(
    "const send = (options: { x?: string; } = {}) => client.post({ body: { x: options.x } });",
    "const send = (options: { x?: string; } = {}) => client.post({ body: { x: options.x }, headers: headers });",
    "const send = (options: { x?: string; y?: string; } = {}) => client.post({ body: { x: options.x, y: options.y } });",
    "const send = (options: { x?: string; y?: string; } = {}) => client.post({ body: { x: options.x, y: options.y }, headers: headers });",
  );
});

test("fixed-arity call arguments merge independently without reordering", () => {
  merged(
    "function send() { return client.post({ x: 1 }, { retry: 1 }); }",
    "function send() { return client.post({ x: 2 }, { retry: 1 }); }",
    "function send() { return client.post({ x: 1 }, { retry: 2 }); }",
    "function send() { return client.post({ x: 2 }, { retry: 2 }); }",
  );
});

test("call arity changes concurrent with other argument changes require resolution", () => {
  rejected(
    "function send() { return client.post(context, { x: 1 }); }",
    "function send() { return client.post(context, { x: 2 }); }",
    "function send() { return client.post(context, version, { x: 1 }); }",
    /fixed arity/,
  );
});

test("call target changes concurrent with argument edits are not guessed", () => {
  rejected(
    "function send() { return generatedSend({ x: 1 }); }",
    "function send() { return customizedSend({ x: 1 }); }",
    "function send() { return generatedSend({ x: 1, y: 2 }); }",
    /Unsupported concurrent semantic changes/,
  );
});

test("arrays retain positions and duplicate values instead of becoming sets", () => {
  merged(
    "const values = [1, 1];",
    "const values = [2, 1];",
    "const values = [1, 3];",
    "const values = [2, 3];",
  );
  rejected(
    "const values = [1];",
    "const values = [1, 2];",
    "const values = [1, 3];",
    /fixed arity/,
  );
  rejected(
    "const values = [1, 2];",
    "const values = [2, 1];",
    "const values = [3, 2];",
    /semantic changes/,
  );
});

test("spread arguments do not provide stable positional identities", () => {
  rejected(
    "const value = send(...args, { x: 1 }, { y: 1 });",
    "const value = send(...args, { x: 2 }, { y: 1 });",
    "const value = send(...args, { x: 1 }, { y: 2 });",
    /spread\/rest/,
  );
});

test("sparse arrays and named rest tuples cannot lose slots during concurrent merging", () => {
  rejected(
    "const values = [1, 2, ,];",
    "const values = [3, 2, ,];",
    "const values = [1, 4, ,];",
    /omitted elements/,
  );
  rejected(
    "type Values = [first: string, ...rest: number[]];",
    "type Values = [first: boolean, ...rest: number[]];",
    "type Values = [first: string, ...rest: string[]];",
    /spread\/rest/,
  );
  merged(
    "const values = [1, 2, ,];",
    "const values = [1, 2, ,];",
    "const values = [1, 4, ,];",
    "const values = [1, 4, ,];",
  );
});

test("runtime object additions in distinct gaps preserve both source orders", () => {
  const text = merged(
    "const request = { a: first(), b: last() };",
    "const request = { a: first(), headers: headers(), b: last() };",
    "const request = { a: first(), b: last(), body: body() };",
    "const request = { a: first(), headers: headers(), b: last(), body: body() };",
  );
  const calls = [];
  evaluate(
    text,
    Object.fromEntries(
      ["first", "headers", "last", "body"].map((name) => [name, () => calls.push(name)]),
    ),
  );
  assert.deepEqual(calls, ["first", "headers", "last", "body"]);
});

test("effectful object additions and class additions retain strict ordering", () => {
  rejected(
    "const request = { x: getX() };",
    "const request = { x: getX(), headers: getHeaders() };",
    "const request = { x: getX(), body: getBody() };",
    /Ambiguous ordering/,
  );
  rejected(
    "class Example { x = getX(); }",
    "class Example { x = getX(); headers = getHeaders(); }",
    "class Example { x = getX(); body = getBody(); }",
    /Ambiguous ordering/,
  );
});

test("plain converter additions preserve insertion regions when incoming wire fields replace old ones", () => {
  const text = merged(
    "export function serialize(item) { return { old_name: item.old_name }; }",
    "export function serialize(item) { return { old_name: item.old_name, custom: item.custom }; }",
    "export function serialize(item) { return { connection_name: item.connection_name, source: item.source }; }",
    "export function serialize(item) { return { connection_name: item.connection_name, source: item.source, custom: item.custom }; }",
  );
  assert.doesNotMatch(text, /old_name/);
  const item = { connection_name: "connection", source: "source", custom: "kept" };
  const actual = evaluate(text).serialize(item);
  assert.equal(JSON.stringify(actual), JSON.stringify(item));
});

test("new converter fields preserve a custom passthrough even when the baseline field calls a helper", () => {
  const text = merged(
    `export function deserialize(item) {
      return { code: item.code, message: item.message, additionalInfo: Object.fromEntries(Object.entries(item.additionalInfo)) };
    }`,
    `export function deserialize(item) {
      return { code: item.code, message: item.message, additionalInfo: item.additionalInfo, custom: item.custom };
    }`,
    `export function deserialize(item) {
      return { code: item.code, message: item.message, additionalInfo: Object.fromEntries(Object.entries(item.additionalInfo)), new_info: item.new_info };
    }`,
    `export function deserialize(item) {
      return { code: item.code, message: item.message, additionalInfo: item.additionalInfo, custom: item.custom, new_info: item.new_info };
    }`,
  );
  const item = {
    code: "failure",
    message: "message",
    additionalInfo: [{ nested: { value: "preserved" } }],
    custom: "custom",
    new_info: "incoming",
  };
  const actual = evaluate(text).deserialize(item);
  assert.equal(actual.additionalInfo, item.additionalInfo);
  assert.equal(JSON.stringify(actual), JSON.stringify(item));
  assert.doesNotMatch(text, /Object\.fromEntries/);
});

test("plain data mapping ties support literals, static reads, type wrappers, and nested containers", () => {
  for (const expression of [
    "item.value",
    "item?.value",
    'item["wire_value"]',
    "item?.[0]",
    "(item.value)",
    "item.value as string",
    "item.value satisfies string",
    "<string>item.value",
    "item.value!",
    "'literal'",
    "`literal`",
    "-1",
    "17n",
    "false",
    "null",
    "undefined",
    "[item.value, true, null]",
    "{ nested: item.value }",
    "{ item }",
  ]) {
    merged(
      "const result = {};",
      "const result = { custom: item.custom };",
      `const result = { incoming: ${expression} };`,
      `const result = { custom: item.custom, incoming: ${expression} };`,
    );
  }
  merged(
    "const result = { value: item.value };",
    "const result = { value: item.value, custom };",
    "const result = { value: item.value, incoming };",
    "const result = { value: item.value, custom, incoming };",
  );
});

test("potential effects and dynamic reads do not qualify for object insertion ties", () => {
  for (const expression of [
    "convert(item.value)",
    "new Value(item.value)",
    "item.value++",
    "(item.value = 1)",
    "item.getValue().field",
    "item[lookup()]",
    "item[key]",
    "item.value + 1",
    "`${item.value}`",
    "[...item.values]",
    "{ ...item.values }",
    "{ value: convert(item.value) }",
    "[convert(item.value)]",
    "await convert(item.value)",
    "delete item.value",
    "() => item.value",
    "{ get value() { return item.value; } }",
  ]) {
    for (const spread of ["", ", ...overrides"]) {
      const source = (addition) =>
        `async function serialize(item, key, overrides) { return { base: item.base${addition}${spread} }; }`;
      rejected(
        source(""),
        source(", custom: item.custom"),
        source(`, incoming: ${expression}`),
        /Ambiguous ordering/,
      );
    }
  }
});

test("a pending effectful addition cannot hide behind a passive frontier property", () => {
  rejected(
    "function serialize(item) { return { base: item.base }; }",
    "function serialize(item) { return { base: item.base, custom: item.custom }; }",
    "function serialize(item) { return { base: item.base, incoming: item.incoming, effect: mutate(item) }; }",
    /Ambiguous ordering/,
  );
  rejected(
    "function serialize(item) { return { old: item.old }; }",
    "function serialize(item) { return { old: item.old, custom: item.custom, effect: mutate(item) }; }",
    "function serialize(item) { return { incoming: item.incoming }; }",
    /Ambiguous ordering/,
  );
});

test("an existing effectful prefix remains ordered before independent plain additions", () => {
  const text = merged(
    "export function serialize(item) { return { base: record(item.value) }; }",
    "export function serialize(item) { return { base: record(item.value), custom: item.custom }; }",
    "export function serialize(item) { return { base: record(item.value), incoming: item.incoming }; }",
    "export function serialize(item) { return { base: record(item.value), custom: item.custom, incoming: item.incoming }; }",
  );
  const calls = [];
  const { serialize } = evaluate(text, {
    record: (value) => {
      calls.push(value);
      return value;
    },
  });
  const actual = serialize({ value: "recorded", custom: "custom", incoming: "incoming" });
  assert.deepEqual(calls, ["recorded"]);
  assert.equal(
    JSON.stringify(actual),
    JSON.stringify({ base: "recorded", custom: "custom", incoming: "incoming" }),
  );
});

test("disjoint request headers merge custom-first before the existing final spread", () => {
  const base = `export function send(options) {
    return client.get({ headers: { accept: "application/json", ...options.requestOptions?.headers } });
  }`;
  const custom = `export function send(options) {
    return client.get({ headers: { accept: "application/json", "x-custom": "retained", ...options.requestOptions?.headers } });
  }`;
  const incoming = `export function send(options) {
    return client.get({ headers: { accept: "application/json", "x-extra": options.extra, ...options.requestOptions?.headers } });
  }`;
  const text = merged(
    base,
    custom,
    incoming,
    `export function send(options) {
      return client.get({ headers: {
        accept: "application/json",
        "x-custom": "retained",
        "x-extra": options.extra,
        ...options.requestOptions?.headers
      } });
    }`,
  );
  assert.equal(mergeDeclaration(base, custom, incoming, context).text, text);
  const { send } = evaluate(text, { client: { get: (request) => request.headers } });
  const withoutOverrides = send({ extra: "incoming" });
  assert.deepEqual(JSON.parse(JSON.stringify(withoutOverrides)), {
    accept: "application/json",
    "x-custom": "retained",
    "x-extra": "incoming",
  });
  assert.deepEqual(Object.keys(withoutOverrides), ["accept", "x-custom", "x-extra"]);
  const headers = {
    accept: "custom/content-type",
    "x-custom": "caller-custom",
    "x-extra": "caller-extra",
    "x-caller": "preserved",
  };
  assert.deepEqual(
    JSON.parse(JSON.stringify(send({ extra: "incoming", requestOptions: { headers } }))),
    headers,
  );
});

test("named additions on either side of an existing spread retain precedence boundaries", () => {
  const text = merged(
    "export const headers = { head: 1, ...overrides, tail: 2 };",
    "export const headers = { head: 1, beforeCustom: 3, ...overrides, afterCustom: 4, tail: 2 };",
    "export const headers = { head: 1, beforeIncoming: 5, ...overrides, afterIncoming: 6, tail: 2 };",
    "export const headers = { head: 1, beforeCustom: 3, beforeIncoming: 5, ...overrides, afterCustom: 4, afterIncoming: 6, tail: 2 };",
  );
  const { headers } = evaluate(text, {
    overrides: {
      beforeCustom: "spread",
      beforeIncoming: "spread",
      afterCustom: "spread",
      afterIncoming: "spread",
    },
  });
  assert.deepEqual(JSON.parse(JSON.stringify(headers)), {
    head: 1,
    beforeCustom: "spread",
    beforeIncoming: "spread",
    afterCustom: 4,
    afterIncoming: 6,
    tail: 2,
  });
});

test("multiple unchanged spread anchors preserve distinct insertion regions", () => {
  merged(
    "const headers = { ...defaults, accept: 'json', ...overrides };",
    "const headers = { before: customBefore, ...defaults, accept: 'json', customMiddle: 1, ...overrides, customAfter: 2 };",
    'const headers = { beforeIncoming: incomingBefore, ...defaults, accept: "json", incomingMiddle: 3, ...overrides, incomingAfter: 4 };',
    "const headers = { before: customBefore, beforeIncoming: incomingBefore, ...defaults, accept: 'json', customMiddle: 1, incomingMiddle: 3, ...overrides, customAfter: 2, incomingAfter: 4 };",
  );
  merged(
    "const headers = { ...nextHeaders(), ...nextHeaders() };",
    "const headers = { ...nextHeaders(), custom: 1, ...nextHeaders() };",
    "const headers = { ...nextHeaders(), incoming: 2, ...nextHeaders() };",
    "const headers = { ...nextHeaders(), custom: 1, incoming: 2, ...nextHeaders() };",
  );
});

test("anchored additions still reject conflicts and computed or non-disjoint keys", () => {
  rejected(
    "const headers = { ...overrides };",
    "const headers = { shared: 'custom', ...overrides };",
    "const headers = { shared: 'incoming', ...overrides };",
    /Conflicting additions/,
  );
  rejected(
    "const headers = { accept: 'json', ...overrides };",
    "const headers = { accept: 'custom', custom: 1, ...overrides };",
    "const headers = { accept: 'incoming', incoming: 2, ...overrides };",
    /semantic changes/,
  );
  for (const custom of [
    "const headers = { [key]: 'custom', ...overrides };",
    "const headers = { ['custom']: 'custom', ...overrides };",
    "const headers = { '__proto__': prototype, ...overrides };",
  ]) {
    rejected(
      "const headers = { ...overrides };",
      custom,
      "const headers = { incoming: 2, ...overrides };",
      /stable identities|Ambiguous ordering/,
    );
  }
  rejected(
    "const headers = { ...overrides };",
    "const headers = { get value() { return 1; }, ...overrides };",
    "const headers = { set value(input) {}, ...overrides };",
    /Ambiguous ordering/,
  );
});

test("new or changed spreads cannot justify ambiguous named-member ordering", () => {
  rejected(
    "const headers = { accept: 'json' };",
    "const headers = { accept: 'json', custom: 1, ...overrides };",
    "const headers = { accept: 'json', incoming: 2, ...overrides };",
    /Ambiguous ordering/,
  );
  rejected(
    "const headers = { accept: 'json', ...overrides };",
    "const headers = { accept: 'json', custom: 1, ...differentOverrides };",
    "const headers = { accept: 'json', incoming: 2, ...overrides };",
    /Ambiguous ordering/,
  );
  rejected(
    "const headers = { ...overrides };",
    "const headers = { ...customOverrides, ...overrides };",
    "const headers = { incoming: 2, ...overrides };",
    /stable identities/,
  );
  rejected(
    "const headers = { ...defaults, ...overrides };",
    "const headers = { ...overrides, custom: 1, ...defaults };",
    "const headers = { ...defaults, incoming: 2, ...overrides };",
    /stable identities|Ambiguous ordering/,
  );
});

test("spread anchors do not resolve contradictory precedence or competing member replacements", () => {
  rejected(
    "const headers = { accept: 'json', ...overrides };",
    "const headers = { ...overrides, accept: 'json', custom: 1 };",
    "const headers = { accept: 'json', incoming: 2, ...overrides };",
    /Ambiguous ordering/,
  );
  rejected(
    "const headers = { old: 'value', ...overrides };",
    "const headers = { custom: 'value', ...overrides };",
    "const headers = { incoming: 'value', ...overrides };",
    /Ambiguous ordering/,
  );
});

test("independent statement insertions preserve order; same-gap insertions fail", () => {
  merged(
    "function send() { const x = 1; return x; }",
    "function send() { const headers = getHeaders(); const x = 1; return x; }",
    "function send() { const x = 1; const body = getBody(); return x; }",
    "function send() { const headers = getHeaders(); const x = 1; const body = getBody(); return x; }",
  );
  rejected(
    "function send() { return result; }",
    "function send() { const headers = getHeaders(); return result; }",
    "function send() { const body = getBody(); return result; }",
    /Ambiguous ordering/,
  );
});

test("type unions preserve customization and apply independent additions/removals", () => {
  merged(
    "type Example = A | B;",
    "type Example = A | B | Custom;",
    "type Example = A | Incoming;",
    "type Example = A | Custom | Incoming;",
  );
});

test("union constituent edits retain identity instead of widening conflicting replacements", () => {
  rejected(
    "type Example = Box<string> | Other;",
    "type Example = Box<number> | Other;",
    "type Example = Box<boolean> | Other;",
    /semantic changes/,
  );
  rejected(
    'type Example = { kind: "item"; x: string; } | undefined;',
    'type Example = { kind: "item"; x: number; } | undefined;',
    'type Example = { kind: "item"; x: boolean; } | undefined;',
    /semantic changes/,
  );
  rejected(
    "type Example = A | Other;",
    "type Example = Custom | Other;",
    "type Example = Incoming | Other;",
    /Ambiguous replacement/,
  );
});

test("non-unique union constituent identities fail conservatively", () => {
  rejected(
    "type Example = Box<string> | Box<number>;",
    "type Example = Box<string> | Box<number> | Custom;",
    "type Example = Box<string> | Box<number> | Incoming;",
    /unique, stable identities/,
  );
});

test("terminal literal switch cases can be added independently", () => {
  merged(
    'function read(item) { switch (item.kind) { case "a": return item.a; default: return item; } }',
    'function read(item) { switch (item.kind) { case "a": return item.a; case "custom": return customRead(item); default: return item; } }',
    'function read(item) { switch (item.kind) { case "a": return item.a; case "b": return item.b; default: return item; } }',
    'function read(item) { switch (item.kind) { case "a": return item.a; case "custom": return customRead(item); case "b": return item.b; default: return item; } }',
  );
});

test("an incoming switch case preserves a custom fallback", () => {
  merged(
    'function read(item) { switch (item.kind) { case "a": return item.a; default: return item; } }',
    'function read(item) { switch (item.kind) { case "a": return item.a; default: return customRead(item); } }',
    'function read(item) { switch (item.kind) { case "a": return item.a; case "b": return item.b; default: return item; } }',
    'function read(item) { switch (item.kind) { case "a": return item.a; case "b": return item.b; default: return customRead(item); } }',
  );
});

test("fallthrough and nonliteral switch cases need explicit resolution", () => {
  rejected(
    'function read(item) { switch (item.kind) { case "a": case "b": return item; default: return item; } }',
    'function read(item) { switch (item.kind) { case "a": case "b": return item; default: return customRead(item); } }',
    'function read(item) { switch (item.kind) { case "a": case "b": return item; case "c": return item.c; default: return item; } }',
    /no fallthrough/,
  );
  rejected(
    "function read(item) { switch (item.kind) { case getKind(): return item; default: return item; } }",
    "function read(item) { switch (item.kind) { case getKind(): return item; default: return customRead(item); } }",
    'function read(item) { switch (item.kind) { case getKind(): return item; case "b": return item.b; default: return item; } }',
    /literal cases/,
  );
});

test("conditional request branches merge only while their condition is stable", () => {
  merged(
    "function serialize(item) { return item ? { x: item.x } : undefined; }",
    "function serialize(item) { return item ? { x: customEncode(item.x) } : undefined; }",
    "function serialize(item) { return item ? { x: item.x, y: item.y } : undefined; }",
    "function serialize(item) { return item ? { x: customEncode(item.x), y: item.y } : undefined; }",
  );
  rejected(
    "function serialize(item) { return item ? { x: item.x } : undefined; }",
    "function serialize(item) { return enabled ? { x: item.x } : undefined; }",
    "function serialize(item) { return item ? { x: item.x, y: item.y } : undefined; }",
    /Unsupported concurrent semantic changes/,
  );
});

test("unknown concurrent loop/body changes are diagnostics, not a selected conflict side", () => {
  rejected(
    "function send() { while (ready) { sendOne(); } }",
    "function send() { while (ready) { customSend(); } }",
    "function send() { while (ready) { sendOne(); sendTwo(); } }",
    /Unsupported concurrent semantic changes/,
  );
  rejected(
    "function send() { return value + 1; }",
    "function send() { return customized + 1; }",
    "function send() { return value + 2; }",
    /Unsupported concurrent semantic changes/,
  );
});

test("duplicate members and identifiers are guarded even for obvious three-way cases", () => {
  const invalid = [
    "interface Example { x: string; x: number; }",
    'interface Example { x: string; "x": number; }',
    "interface Example { 1: string; '1': number; }",
    'const value = { x: 1, ["x"]: 2 };',
    "class Example { x = 1; x = 2; }",
    "class Example { run(): void; run(): void {} }",
    "interface Example<T, T> { x: T; }",
    "function send(x: string, x: number) {}",
    "function send({ a: x, b: x }) {}",
    "const x = 1, x = 2;",
    "function send() { const x = 1; const x = 2; }",
    "function read(x) { switch (x) { case \"a\": return 1; case 'a': return 2; } }",
  ];
  for (const text of invalid) rejected(text, text, text, /duplicate/);
});

test("separate class scopes, paired accessors, and nested bindings are not duplicates", () => {
  for (const text of [
    "class Example { x = 1; static x = 2; }",
    "class Example { get x() { return 1; } set x(value: number) {} }",
    "class Example { #x = 1; '#x' = 2; }",
    "function send(x) { { const x = 2; } return x; }",
  ]) {
    assert.equal(merged(text, text, text), text);
  }
});

test("computed names without a static identity do not participate in concurrent merging", () => {
  rejected(
    "const value = { [key]: 1, x: 1 };",
    "const value = { [key]: 1, x: 2 };",
    "const value = { [key]: 1, x: 1, y: 3 };",
    /unique, stable identities/,
  );
});

test("newly combined invalid parameter shapes are rejected before returning output", () => {
  rejected(
    "function send(x: number) { return x; }",
    "function send(x?: number) { return x; }",
    "function send(x: number = 1) { return x; }",
    /syntax|optional/,
  );
  for (const text of [
    "function send(x?: number, y: number) {}",
    "function send(...x: number[], y: number) {}",
    "function send(x?: number = 1) {}",
    "interface Example<T = string, U> {}",
  ]) {
    rejected(text, text, text, /parameter/);
  }
});

test("canonicalization retains regular expression and tagged-template literal data", () => {
  assert.notEqual(canonicalize("const pattern = /a b/;"), canonicalize("const pattern = /ab/;"));
  assert.notEqual(
    canonicalize("const value = String.raw`a\\n`;"),
    canonicalize("const value = String.raw`a\n`;"),
  );
  assert.equal(canonicalize('const value = "a\'b";'), canonicalize("const value = 'a\\'b';"));
  assert.notEqual(canonicalize('const value = "/* text */";'), canonicalize('const value = "";'));
});

test("a singleton type can grow into a union on both sides", () => {
  merged(
    "type Example = Base;",
    "type Example = Base | Custom;",
    "type Example = Base | Incoming;",
    "type Example = Base | Custom | Incoming;",
  );
  merged(
    'type Example = "base";',
    'type Example = "base" | "custom";',
    'type Example = "base" | "incoming";',
    'type Example = "base" | "custom" | "incoming";',
  );
});

test("union narrowing to a singleton is supported, but an empty result is rejected", () => {
  merged(
    "type Example = A | B | C;",
    "type Example = A | B | C | Custom;",
    "type Example = A;",
    "type Example = A | Custom;",
  );
  rejected("type Example = A | B;", "type Example = A;", "type Example = B;", /empty union/);
});

test("comment-only customization survives incoming member and signature additions", () => {
  const text = merged(
    "interface Example { x: string; }",
    "interface Example { /** Keep custom docs. */ x: string; }",
    "interface Example { x: string; y?: number; }",
    "interface Example { x: string; y?: number; }",
  );
  assert.match(text, /Keep custom docs/);
  const operation = merged(
    "function send(options: Options) { return client.post({ body: { x: options.x } }); }",
    "function send(/** Keep parameter docs. */ options: Options) { return client.post({ body: { x: customEncode(options.x) } }); }",
    "function send(options: NewOptions) { return client.post({ body: { x: options.x, y: options.y } }); }",
    "function send(options: NewOptions) { return client.post({ body: { x: customEncode(options.x), y: options.y } }); }",
  );
  assert.match(operation, /Keep parameter docs/);
});

test("comments do not obscure deletion conflicts or literal field edits", () => {
  rejected(
    "interface Example { x: string; }",
    "interface Example { /** Important. */ x: number; }",
    "interface Example {}",
    /Deletion conflicts/,
  );
  merged(
    'interface Example { "wire-name": string; }',
    "interface Example { /** Custom. */ 'wire-name': string; headers?: Headers; }",
    'interface Example { "wire-name": number; y?: string; }',
    'interface Example { "wire-name": number; headers?: Headers; y?: string; }',
  );
});

test("member identity includes static/private/accessor namespaces without string-prefix collisions", () => {
  for (const text of [
    'class Example { static x = 1; "static x" = 2; }',
    'class Example { #x = 1; "private #x" = 2; }',
    'class Example { get x() { return 1; } "get x" = 2; }',
    'class Example { constructor() {} "<constructor>" = 1; }',
  ]) {
    assert.equal(merged(text, text, text), text);
  }
  rejected(
    "class Example { static x = 1; }",
    'class Example { "static x" = 1; }',
    "class Example { static x = 2; }",
    /Deletion conflicts/,
  );
});

test("duplicate bindings across parameters, constructors, enums, and switch cases are rejected", () => {
  for (const text of [
    "function send(x) { const x = 1; }",
    "class Example { constructor(public x: number) {} x = 1; }",
    "class Example { constructor() {} constructor() {} }",
    "enum Example { A = 1, A = 2 }",
    'function send(x) { switch (x) { case "a": const y = 1; return y; case "b": const y = 2; return y; } }',
    "function read(x) { switch (x) { case 1: return 1; case 0x1: return 2; } }",
    "function read(x) { switch (x) { case 0: return 1; case -0: return 2; } }",
  ]) {
    rejected(text, text, text, /duplicate/);
  }
});

test("a merged switch cannot introduce duplicate lexical bindings", () => {
  rejected(
    "function read(x) { switch (x) { default: return x; } }",
    'function read(x) { switch (x) { case "custom": const result = 1; return result; default: return x; } }',
    'function read(x) { switch (x) { case "incoming": const result = 2; return result; default: return x; } }',
    /merged result: duplicate/,
  );
});

test("parser-recovered invalid property syntax is rejected, not silently emitted", () => {
  for (const text of [
    "interface Example { x: string = 1; }",
    "type Example = { x = 1; };",
    "const value = { x = 1 };",
    "const value = { x?: 1 };",
    "const value = { x!: 1 };",
  ]) {
    rejected(text, text, text, /malformed/);
  }
  for (const text of [
    "({ x = 1 } = source);",
    "({ nested: { x = 1 } } = source);",
    "const { x = 1 } = source;",
    "function f(x) { var x; return x; }",
  ]) {
    assert.equal(merged(text, text, text), text);
  }
});

test("deletion versus a changed assignment target is not interpreted as an unrelated addition", () => {
  rejected(
    "function send() { request.body = { x: 1 }; return request; }",
    "function send() { alternate.body = { x: 1 }; return request; }",
    "function send() { return request; }",
    /Ambiguous replacement/,
  );
});

test("all scalar member three-way combinations follow the same conflict rules", () => {
  const types = [null, "string", "number", "boolean"];
  const source = (type) => `interface Example { ${type === null ? "" : `x: ${type};`} }`;
  for (const base of types) {
    for (const custom of types) {
      for (const incoming of types) {
        if (incoming === base)
          merged(source(base), source(custom), source(incoming), source(custom));
        else if (custom === base)
          merged(source(base), source(custom), source(incoming), source(incoming));
        else if (custom === incoming)
          merged(source(base), source(custom), source(incoming), source(custom));
        else rejected(source(base), source(custom), source(incoming));
      }
    }
  }
});

test("merging is deterministic and applying the same incoming baseline is idempotent", () => {
  const base = "interface Example { x: string; }";
  const custom = "interface Example { x: string; headers?: Headers; }";
  const incoming = "interface Example { x: number; y?: string; }";
  const result = mergeDeclaration(base, custom, incoming, context);
  assert.deepEqual(result.diagnostics, []);
  assert.deepEqual(mergeDeclaration(base, custom, incoming, context), result);
  assert.deepEqual(mergeDeclaration(incoming, result.text, incoming, context), result);
});
