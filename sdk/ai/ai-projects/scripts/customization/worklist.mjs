// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const maxDiffCells = 4_000_000;

/**
 * @typedef {object} RetainedChange
 * @property {string} [file]
 * @property {string} [declaration]
 * @property {{ message: string, member?: string }[]} diagnostics
 * @property {string | null} [baseText]
 * @property {string | null} [customText]
 * @property {string | null} [incomingText]
 */

function diffOperations(before, after) {
  const lengths = Array.from(
    { length: before.length + 1 },
    () => new Uint32Array(after.length + 1),
  );
  for (let left = before.length - 1; left >= 0; left--) {
    for (let right = after.length - 1; right >= 0; right--) {
      lengths[left][right] =
        before[left] === after[right]
          ? lengths[left + 1][right + 1] + 1
          : Math.max(lengths[left + 1][right], lengths[left][right + 1]);
    }
  }
  const operations = [];
  let left = 0;
  let right = 0;
  while (left < before.length && right < after.length) {
    if (before[left] === after[right]) {
      operations.push([" ", before[left++]]);
      right++;
    } else if (lengths[left + 1][right] >= lengths[left][right + 1]) {
      operations.push(["-", before[left++]]);
    } else {
      operations.push(["+", after[right++]]);
    }
  }
  while (left < before.length) operations.push(["-", before[left++]]);
  while (right < after.length) operations.push(["+", after[right++]]);
  return operations;
}

/**
 * A line diff that keeps two lines of context around each change. Returns
 * `undefined` when the inputs are too large to compare cheaply.
 *
 * @param {string | null | undefined} before
 * @param {string | null | undefined} after
 * @returns {string | undefined}
 */
export function lineDiff(before, after) {
  const lines = (text) => (text ? text.split(/\r?\n/) : []);
  const [from, to] = [lines(before), lines(after)];
  if ((from.length + 1) * (to.length + 1) > maxDiffCells) return undefined;
  const operations = diffOperations(from, to);
  const context = 2;
  const keep = operations.map(
    ([tag], index) =>
      operations
        .slice(Math.max(0, index - context), index + context + 1)
        .some(([nearby]) => nearby !== " ") || tag !== " ",
  );
  const output = [];
  let skipping = false;
  operations.forEach(([tag, text], index) => {
    if (!keep[index]) {
      skipping = true;
      return;
    }
    if (skipping && output.length) output.push("  ...");
    skipping = false;
    output.push(`${tag} ${text}`);
  });
  return output.join("\n");
}

function fenced(language, text) {
  const fence = "`".repeat(
    Math.max(3, ...[...text.matchAll(/`+/g)].map((run) => run[0].length + 1)),
  );
  return `${fence}${language}\n${text}\n${fence}`;
}

function change(heading, before, after) {
  if (before === after) return `${heading}: none.`;
  if (after === null || after === undefined) return `${heading}: the declaration was removed.`;
  const diff = lineDiff(before, after);
  if (diff === undefined) return `${heading}: too large to compare; read both versions in source.`;
  return `${heading}:\n\n${fenced("diff", diff)}`;
}

/**
 * Render the changes a recovery run kept as customized code. The result is a
 * Markdown work queue: every entry still needs an explicit disposition.
 *
 * `unapplied` lists emitted additions the guards found missing from a kept
 * declaration; each is rendered under the entry for that declaration.
 *
 * @param {RetainedChange[]} entries
 * @param {{ baseline?: string, unapplied?: { file: string, declaration: string, member?: string, kind: string }[] }} [context]
 * @returns {string}
 */
export function renderWorklist(entries, context = {}) {
  const additions = new Map();
  for (const addition of context.unapplied ?? []) {
    const list = additions.get(key(addition)) ?? [];
    list.push(addition);
    additions.set(key(addition), list);
  }
  const listed = new Set();
  const sections = entries.map((entry, index) => {
    const reasons = [...new Set(entry.diagnostics.map(describe))];
    const unknown = [entry.baseText, entry.customText, entry.incomingText].every(
      (text) => text === undefined,
    );
    // Two entries can share a declaration (for example overloads); list its additions once.
    const missing = listed.has(key(entry)) ? [] : (additions.get(key(entry)) ?? []);
    listed.add(key(entry));
    return [
      `## ${index + 1}. \`${key(entry)}\``,
      "",
      "Not merged because:",
      "",
      ...reasons.map((reason) => `- ${reason}`),
      "",
      ...(unknown
        ? [
            "No declaration text is available for this entry. Compare the file in the committed baseline, `src/`, and the new emission.",
          ]
        : [
            change(
              "Emitter change (generated baseline → new emission)",
              entry.baseText ?? "",
              entry.incomingText ?? null,
            ),
            "",
            change(
              "Customization (generated baseline → customized source)",
              entry.baseText ?? "",
              entry.customText ?? null,
            ),
          ]),
      ...(missing.length
        ? [
            "",
            "Emitted additions not applied (new in the emission, absent from the kept declaration):",
            "",
            ...missing.map(
              (addition) =>
                `- ${addition.member === undefined ? "(unnamed)" : code(addition.member)} (${addition.kind})`,
            ),
          ]
        : []),
    ].join("\n");
  });
  return [
    "# Customization worklist",
    "",
    `The resolver ran in recovery mode${context.baseline ? ` against baseline \`${context.baseline}\`` : ""} and could not merge ${entries.length} change(s). For each entry below it **kept the customized code and did not apply the emitted change**.`,
    "",
    "Give every entry an explicit disposition before the regeneration is finished: adopt the emitted change, keep the customized code, or combine them by hand. Edit `src/`, never `generated/`, and record each disposition in the pull request description. This file is scratch output; `node scripts/customize.mjs --recover --dry-run` rebuilds it without touching `src/`.",
    "",
    ...sections.flatMap((section) => [section, ""]),
  ].join("\n");
}

/** @param {RetainedChange} entry */
export function key(entry) {
  return `${entry.file ?? "<unknown>"}::${entry.declaration ?? "<declaration>"}`;
}

function code(text) {
  const fence = "`".repeat(
    Math.max(1, ...[...text.matchAll(/`+/g)].map((run) => run[0].length + 1)),
  );
  return `${fence}${/^`|`$/.test(text) ? ` ${text} ` : text}${fence}`;
}

function describe(diagnostic) {
  return diagnostic.member
    ? `${diagnostic.message} (at \`${diagnostic.member}\`)`
    : diagnostic.message;
}
