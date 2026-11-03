// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createHash } from "node:crypto";
import ts from "typescript";
import { buildReview } from "./apiReview/buildReview.ts";
import { layoutReview } from "./apiReview/layoutReview.ts";
import type { Review } from "./apiReview/model.ts";
import { renderMarkdown } from "./apiReview/renderMarkdown.ts";

// generateApiReview runs in three steps, one file each under ./apiReview/:
// 1. buildReview reads the package's built declaration files into a Review (the API surface).
// 2. layoutReview turns the Review into a format-neutral document (Block[]).
// 3. renderMarkdown prints the document. Only this step knows the output format.
// ./apiReview/model.ts holds the data that flows between them.

// Bump when the api.md format changes. Baseline and target reviews must use the same parser.
const parserVersion = "1.0.0";

/**
 * The contents of api.metadata.yml. Only `apiMdSha256` identifies the reviewed API surface.
 */
export interface ApiReviewMetadata {
  apiMdSha256: string;
  packageVersion: string;
  parserVersion: string;
  typescriptVersion: string;
}

export async function generateApiReview(packageRoot: string): Promise<{
  apiMd: string;
  metadata: ApiReviewMetadata;
}> {
  const review = await buildReview(packageRoot);
  return {
    apiMd: renderMarkdown(layoutReview(review)),
    metadata: {
      apiMdSha256: hashApiMd(review),
      packageVersion: review.version,
      parserVersion,
      typescriptVersion: ts.version,
    },
  };
}

/**
 * Hashes api.md as rendered from a copy of the review in which dependencies keep only their
 * hashed version, so the Version specifier and Resolved version columns aren't hashed.
 */
function hashApiMd(review: Review): string {
  const hashInput: Review = {
    ...review,
    // [{ name: "tslib", specifier: "catalog:", resolved: "^2.8.1", hashed: "2", type: "runtime" }]
    //   -> [{ name: "tslib", hashed: "2", type: "runtime" }]
    dependencies: review.dependencies.map(({ name, hashed, type }) => ({ name, hashed, type })),
  };
  return createHash("sha256")
    .update(renderMarkdown(layoutReview(hashInput)))
    .digest("hex");
}
