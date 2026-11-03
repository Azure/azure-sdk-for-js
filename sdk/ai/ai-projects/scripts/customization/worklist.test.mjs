// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "node:assert/strict";
import { test } from "node:test";
import { key, lineDiff, renderWorklist } from "./worklist.mjs";

test("line diff shows only the changed lines with their context", () => {
  const before = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"].join("\n");
  const after = ["a", "b", "c", "d", "E", "f", "g", "h", "i", "j"].join("\n");
  assert.equal(lineDiff(before, after), "  c\n  d\n- e\n+ E\n  f\n  g");
  assert.equal(lineDiff("same", "same"), "");
  assert.equal(lineDiff(null, "new"), "+ new");
  assert.equal(lineDiff("old", undefined), "- old");
});

test("line diff marks the lines it omits between distant changes", () => {
  const lines = Array.from({ length: 12 }, (_, index) => `line ${index}`);
  const changed = lines.map((line, index) => (index === 0 || index === 11 ? `${line}!` : line));
  const diff = lineDiff(lines.join("\n"), changed.join("\n"));
  assert.match(diff, /^- line 0\n\+ line 0!\n {2}line 1\n {2}line 2\n {2}\.\.\.\n/);
  assert.match(diff, /\n- line 11\n\+ line 11!$/);
});

test("line diff declines inputs too large to compare cheaply", () => {
  const large = Array.from({ length: 2500 }, (_, index) => `line ${index}`).join("\n");
  assert.equal(lineDiff(large, `${large}\nextra`), undefined);
});

const entry = {
  file: "models/models.ts",
  declaration: "exampleDeserializer",
  diagnostics: [
    { message: "Deletion conflicts with a semantic change on the other side.", member: "tags" },
    { message: "Deletion conflicts with a semantic change on the other side.", member: "tags" },
  ],
  baseText: "const x = {\n  tags: item.tags,\n  name: item.name,\n};",
  customText: "const x = {\n  tags: item.tags ?? {},\n  name: item.name,\n};",
  incomingText: "const x = {\n  name: item.name,\n};",
};

test("worklist lists every entry with the emitter's change and the customization", () => {
  assert.equal(key(entry), "models/models.ts::exampleDeserializer");
  const text = renderWorklist([entry, { ...entry, declaration: "other" }], { baseline: "abc123" });
  assert.match(text, /^# Customization worklist/);
  assert.match(text, /against baseline `abc123` and could not merge 2 change\(s\)/);
  assert.match(text, /## 1\. `models\/models\.ts::exampleDeserializer`/);
  assert.match(text, /## 2\. `models\/models\.ts::other`/);
  // Identical diagnostics are reported once per entry.
  assert.equal(text.split("(at `tags`)").length - 1, 2);
  assert.match(
    text,
    /Emitter change[^\n]*:\n\n```diff\n {2}const x = \{\n- {3}tags: item\.tags,\n/,
  );
  assert.match(
    text,
    /Customization[^\n]*:\n\n```diff\n {2}const x = \{\n- {3}tags: item\.tags,\n\+ {3}tags: item\.tags \?\? \{\},/,
  );
});

test("worklist says when a side removed the declaration or changed nothing", () => {
  const text = renderWorklist([
    { ...entry, customText: null, incomingText: entry.baseText },
    {
      file: "api/a.ts",
      declaration: "added",
      diagnostics: [{ message: "Conflicting additions." }],
      baseText: null,
      customText: "const a = 1;",
      incomingText: "const a = 2;",
    },
  ]);
  assert.match(
    text,
    /Customization \(generated baseline → customized source\): the declaration was removed\./,
  );
  assert.match(text, /Emitter change \(generated baseline → new emission\): none\./);
  assert.match(text, /```diff\n\+ const a = 2;\n```/);
});

test("worklist does not claim a removal when an entry carries no declaration text", () => {
  const text = renderWorklist([
    {
      file: "classic/items/index.ts",
      declaration: "<file>",
      diagnostics: [{ message: "Unrecognized operations interface or factory." }],
    },
  ]);
  assert.match(text, /No declaration text is available for this entry\./);
  assert.doesNotMatch(text, /was removed/);
});

test("worklist lists the emitted additions a kept declaration is missing, once per declaration", () => {
  const text = renderWorklist([entry, { ...entry }, { ...entry, declaration: "other" }], {
    unapplied: [
      {
        file: entry.file,
        declaration: entry.declaration,
        member: "added",
        kind: "model or options member",
      },
      {
        file: entry.file,
        declaration: entry.declaration,
        member: "`odd`",
        kind: "union alternative",
      },
    ],
  });
  const heading = "Emitted additions not applied";
  assert.equal(text.split(heading).length - 1, 1);
  assert.match(text, /- `added` \(model or options member\)/);
  assert.match(text, /- `` `odd` `` \(union alternative\)/);
  // The additions belong to the first entry for the declaration, before the next entry.
  assert.ok(text.indexOf(heading) < text.indexOf("## 2."));
  assert.doesNotMatch(renderWorklist([entry]), /Emitted additions not applied/);
});
