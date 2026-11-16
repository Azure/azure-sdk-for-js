// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

function parseFilePath(path: string): { root: string; segments: string[] } {
  const normalized = path.replace(/\\/g, "/");
  const root = normalized.match(/^(?:[A-Za-z]:)?\//)?.[0] ?? "";
  const segments: string[] = [];
  for (const segment of normalized.slice(root.length).split("/")) {
    if (segment === "" || segment === ".") continue;
    if (segment === "..") {
      if (segments.length > 0 && segments.at(-1) !== "..") {
        segments.pop();
      } else if (root === "") {
        segments.push(segment);
      }
    } else {
      segments.push(segment);
    }
  }
  return { root, segments };
}

export function joinFilePath(directory: string, fileName: string): string {
  const { root, segments } = parseFilePath(
    directory === "" ? fileName : `${directory}/${fileName}`,
  );
  return root + segments.join("/");
}

export function relativeImportPath(from: string, to: string): string {
  const source = parseFilePath(from);
  const target = parseFilePath(to);
  if (source.root !== target.root) {
    throw new Error(`Cannot reference file "${to}" from "${from}" across different path roots.`);
  }
  source.segments.pop();
  let commonSegments = 0;
  while (
    commonSegments < source.segments.length &&
    source.segments[commonSegments] === target.segments[commonSegments]
  ) {
    commonSegments++;
  }
  const relative = [
    ...source.segments.slice(commonSegments).map(() => ".."),
    ...target.segments.slice(commonSegments),
  ].join("/");
  return relative === ".." || relative.startsWith("../") ? relative : `./${relative}`;
}
