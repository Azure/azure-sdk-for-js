// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { readFile, writeFile } from "node:fs/promises";
import { parse } from "yaml";

const source = parse(await readFile(new URL("../../tsp-location.yaml", import.meta.url), "utf8"));
if (!/^[a-f0-9]{40}$/.test(source.commit)) {
  throw new Error("Pin tsp-location.yaml to a full specification commit SHA.");
}
const apiVersion = "2026-10-01";
const root = `https://raw.githubusercontent.com/${source.repo}/${source.commit}/`;
const specUrl = `${root}${source.directory}/stable/${apiVersion}/openapi.json`;
const documents = new Map();
const references = new Map();
const definitions = {};

async function document(url) {
  if (!url.startsWith(root)) {
    throw new Error("Schema references must remain in the pinned specification repository.");
  }
  if (!documents.has(url)) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Specification download failed: HTTP ${response.status}`);
    documents.set(url, await response.json());
  }
  return documents.get(url);
}

async function bundle(value, documentUrl) {
  if (Array.isArray(value)) return Promise.all(value.map((item) => bundle(item, documentUrl)));
  if (value === null || typeof value !== "object") return value;
  const result = {};
  for (const [key, item] of Object.entries(value)) {
    if (key !== "$ref") {
      result[key] = await bundle(item, documentUrl);
      continue;
    }
    const url = new URL(item, documentUrl);
    const pointer = url.hash.slice(1);
    url.hash = "";
    const reference = `${url.href}#${pointer}`;
    if (!references.has(reference)) {
      const name = `${references.size}_${pointer.split("/").at(-1)}`;
      references.set(reference, name);
      let definition = await document(url.href);
      for (const part of pointer.slice(1).split("/")) {
        definition = definition[part.replaceAll("~1", "/").replaceAll("~0", "~")];
      }
      if (!definition) throw new Error("Unresolved specification reference.");
      definitions[name] = await bundle(definition, url.href);
    }
    result[key] = `#/definitions/${references.get(reference)}`;
  }
  return result;
}

const spec = await document(specUrl);
if (spec.swagger !== "2.0" || spec.info.version !== apiVersion) {
  throw new Error("Unexpected specification format or API version.");
}
const paths = {};
for (const [path, methods] of Object.entries(spec.paths)) {
  paths[path] = {};
  for (const [method, operation] of Object.entries(methods)) {
    if (!operation.operationId) continue;
    paths[path][method] = {
      operationId: operation.operationId,
      responses: await bundle(operation.responses, specUrl),
      longRunning: operation["x-ms-long-running-operation"] === true,
    };
  }
}
await writeFile(
  new URL("../responseSpec.json", import.meta.url),
  JSON.stringify(
    {
      source: { repository: source.repo, commit: source.commit, url: specUrl },
      apiVersion,
      paths,
      definitions,
    },
    null,
    2,
  ) + "\n",
);
console.log(`Refreshed responseSpec.json from ${source.commit}.`);
