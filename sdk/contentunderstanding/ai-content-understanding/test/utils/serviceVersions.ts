// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Version-aware test model profile.
 *
 * Each service api version resolves to a set of default LLM deployments (completion,
 * mini completion, embedding) appropriate for that version. Env vars
 * (`CU_TEST_COMPLETION_MODEL`, `CU_TEST_COMPLETION_MINI_MODEL`) still take precedence
 * for local overrides.
 *
 * On the GA `2025-11-01` surface the analyzer schema expects `gpt-4.1`;
 * on the preview `2026-06-01-preview` surface the schema was rev'd to
 * `gpt-5.2`. Both versions share `text-embedding-3-large` for embeddings.
 */

import { EnvVarKeys } from "./constants.js";
import { KnownVersions } from "../../src/index.js";

/** Deployment/model triple used to fill `analyzer.modelDeployments`. */
export interface TestModelProfile {
  /** Chat completion model name (e.g. `"gpt-4.1"` or `"gpt-5.2"`). */
  readonly completionModel: string;
  /** Mini/small chat completion model name. */
  readonly miniCompletionModel: string;
  /** Embedding model name. */
  readonly embeddingModel: string;
  /**
   * Whether the profile includes the prebuilt-analyzer alias deployments
   * (`prebuilt-analyzer-completion` etc.). Preview-only surface feature.
   */
  readonly includesPrebuiltAliases: boolean;
}

/** GA profile — `gpt-4.1` / `gpt-4.1-mini` / `text-embedding-3-large`. */
const gaProfile: TestModelProfile = {
  completionModel: process.env[EnvVarKeys.TEST_COMPLETION_MODEL] ?? "gpt-4.1",
  miniCompletionModel: process.env[EnvVarKeys.TEST_COMPLETION_MINI_MODEL] ?? "gpt-4.1-mini",
  embeddingModel: "text-embedding-3-large",
  includesPrebuiltAliases: false,
};

/** Preview profile — `gpt-5.2` / `gpt-5.2` / `text-embedding-3-large`. */
const previewProfile: TestModelProfile = {
  completionModel: process.env[EnvVarKeys.TEST_COMPLETION_MODEL] ?? "gpt-5.2",
  miniCompletionModel: process.env[EnvVarKeys.TEST_COMPLETION_MINI_MODEL] ?? "gpt-5.2",
  embeddingModel: "text-embedding-3-large",
  includesPrebuiltAliases: true,
};

/**
 * Resolve the {@link TestModelProfile} for a given service version.
 *
 * @param apiVersion One of {@link KnownVersions}.
 * @throws When an unrecognized api version is passed.
 */
export function getTestModelProfile(apiVersion: string): TestModelProfile {
  switch (apiVersion) {
    case KnownVersions.V20251101:
      return gaProfile;
    case KnownVersions.V20260601Preview:
      return previewProfile;
    default:
      throw new Error(
        `Unsupported service api version for TestModelProfile: ${apiVersion}. ` +
          `Add a profile in test/utils/serviceVersions.ts.`,
      );
  }
}

/**
 * All service api versions the test matrix runs against.
 *
 * The order determines the default execution order in `forEachServiceVersion`;
 * the first entry doubles as the recording version.
 */
export const TEST_SERVICE_API_VERSIONS = [
  KnownVersions.V20251101,
  KnownVersions.V20260601Preview,
] as const;

/**
 * Version whose HTTP interactions are recorded. In playback mode only tests
 * pinned to this version run; other versions are skipped. In live mode all versions run.
 */
export const RECORDING_SERVICE_API_VERSION: string = KnownVersions.V20251101;
