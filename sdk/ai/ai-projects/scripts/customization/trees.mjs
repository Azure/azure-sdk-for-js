// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import path from "node:path";

export function readTree(root) {
  const result = new Map();
  function visit(directory, prefix) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
      const absolute = path.join(directory, entry.name);
      if (entry.isSymbolicLink())
        throw new Error(`Symbolic links are not supported in customization trees: ${absolute}`);
      if (entry.isDirectory()) visit(absolute, relative);
      else if (/\.(?:ts|mts|cts)$/.test(entry.name))
        result.set(relative, readFileSync(absolute, "utf8"));
    }
  }
  visit(root, "");
  return result;
}

export function readBaseline(packageRoot, ref = "HEAD") {
  const options = { cwd: packageRoot, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 };
  const repository = execFileSync("git", ["rev-parse", "--show-toplevel"], options).trim();
  const commit = execFileSync(
    "git",
    ["rev-parse", "--verify", "--end-of-options", `${ref}^{commit}`],
    options,
  ).trim();
  const relative = path.relative(repository, packageRoot).split(path.sep).join("/");
  const prefix = relative ? `${relative}/` : "";
  const names = execFileSync(
    "git",
    ["ls-tree", "-r", "-z", "--name-only", commit, "--", `${prefix}generated`, `${prefix}src`],
    { ...options, cwd: repository },
  )
    .split("\0")
    .filter((name) => /\.(?:ts|mts|cts)$/.test(name));
  if (!names.length || names.some((name) => /[\r\n]/.test(name))) {
    throw new Error("A valid committed generated/src baseline is required.");
  }
  const buffer = execFileSync("git", ["cat-file", "--batch"], {
    cwd: repository,
    input: names.map((name) => `${commit}:${name}\n`).join(""),
    maxBuffer: 64 * 1024 * 1024,
  });
  const generated = new Map();
  const source = new Map();
  let offset = 0;
  for (const name of names) {
    const end = buffer.indexOf(10, offset);
    const match = /^([0-9a-f]+) blob (\d+)$/.exec(buffer.subarray(offset, end).toString("utf8"));
    if (!match) throw new Error(`Could not read committed file ${name}`);
    const length = Number(match[2]);
    offset = end + 1;
    const text = buffer.subarray(offset, offset + length).toString("utf8");
    offset += length + 1;
    if (name.startsWith(`${prefix}generated/`))
      generated.set(name.slice(`${prefix}generated/`.length), text);
    else source.set(name.slice(`${prefix}src/`.length), text);
  }
  if (!generated.size || !source.size)
    throw new Error("Both committed generated/ and src/ are required.");
  return { commit, generated, source };
}

export function changedFiles(before, after) {
  return [...new Set([...before.keys(), ...after.keys()])].filter(
    (file) => before.get(file) !== after.get(file),
  );
}

export function writeTree(root, previous, next) {
  const absoluteRoot = path.resolve(root);
  function destination(file) {
    if (file.split("/").some((part) => !part || part === "." || part === "..")) {
      throw new Error(`Unsafe customization path: ${file}`);
    }
    const absolute = path.resolve(absoluteRoot, ...file.split("/"));
    if (!absolute.startsWith(absoluteRoot + path.sep))
      throw new Error(`Path escaped src/: ${file}`);
    return absolute;
  }
  const destinations = new Map(
    [...new Set([...previous.keys(), ...next.keys()])].map((file) => [file, destination(file)]),
  );
  for (const [file, text] of next) {
    if (previous.get(file) === text) continue;
    const absolute = destinations.get(file);
    mkdirSync(path.dirname(absolute), { recursive: true });
    writeFileSync(absolute, text, "utf8");
  }
  for (const file of previous.keys()) {
    if (!next.has(file)) unlinkSync(destinations.get(file));
  }
}
