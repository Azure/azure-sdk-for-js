// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Multi-version test harness.
 *
 * Runs each `describe` block once per configured service api version and lets
 * individual blocks opt out of specific versions. Provides:
 *
 * - {@link forEachServiceVersion} — runs a `describe` block once per api
 *   version;
 * - {@link previewOnly} / {@link gaOnly} — options passed to
 *   `forEachServiceVersion` to skip irrelevant versions;
 * - {@link runningOnRecordedVersion} — playback-mode guard so only the
 *   recording version replays.
 */

import { describe } from "vitest";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import {
  RECORDING_SERVICE_API_VERSION,
  TEST_SERVICE_API_VERSIONS,
  getTestModelProfile,
  type TestModelProfile,
} from "./serviceVersions.js";
import { KnownVersions } from "../../src/index.js";

/** Arguments passed to the {@link forEachServiceVersion} body. */
export interface ServiceVersionTestContext {
  /** The api version (`"2025-11-01"` or `"2026-06-01-preview"`) for this run. */
  readonly apiVersion: string;
  /** Version-aware LLM deployment profile. */
  readonly modelProfile: TestModelProfile;
  /** True when this run matches {@link RECORDING_SERVICE_API_VERSION}. */
  readonly isRecordingVersion: boolean;
}

/** Options controlling {@link forEachServiceVersion} execution. */
export interface ForEachServiceVersionOptions {
  /**
   * Only run against the preview api version. Mirrors
   * preview-only service-version scoping on preview-only features
   * (in-page classification, signature detection, chunking, etc.).
   */
  readonly previewOnly?: boolean;
  /**
   * Only run against the GA api version. Mirrors
   * GA-only service-version scoping for tests that assert a behavior
   * removed on the preview surface.
   */
  readonly gaOnly?: boolean;
  /**
   * Skip the preview api-version cell in playback mode. Use for suites whose
   * preview recording is a self-skip placeholder (empty envelope) because the
   * required env vars weren't set on the recording machine — for example
   * `grantCopyAuth` needs a second Content Understanding resource which most
   * developers don't provision locally. The preview cell still runs in `live`
   * and `record` modes so a maintainer with the right setup can refresh the
   * recording later without touching this flag.
   */
  readonly skipPreviewInPlayback?: boolean;
}

/** True in every mode now that preview recordings exist alongside GA. */
function shouldRunVersion(_apiVersion: string): boolean {
  // Both `RECORDING_SERVICE_API_VERSION` (GA) and the preview version have
  // recordings under the `assets.json` tag. Every api-version cell should
  // run in every mode:
  //   - playback : each cell replays its own recording folder
  //                (`sample_X/...` vs `sample_X_apiversioneq20260601preview/...`).
  //   - record   : refresh both versions' folders (or filter by
  //                `-t "apiVersion=<v>"` to record just one side).
  //   - live     : exercise the real service against every version.
  return true;
}

function applyVersionFilter(
  apiVersion: string,
  opts: ForEachServiceVersionOptions,
): boolean {
  if (opts.previewOnly && apiVersion !== KnownVersions.V20260601Preview) {
    return false;
  }
  if (opts.gaOnly && apiVersion !== KnownVersions.V20251101) {
    return false;
  }
  if (
    opts.skipPreviewInPlayback &&
    apiVersion === KnownVersions.V20260601Preview &&
    isPlaybackMode()
  ) {
    return false;
  }
  return true;
}

/**
 * Version that owns the caller-provided suite name (no `(apiVersion=...)` suffix).
 * All other versions in the matrix get suffixed suite names so live-mode reports
 * (and any refreshed recordings) stay unambiguous.
 *
 * - Multi-version suites: primary = {@link RECORDING_SERVICE_API_VERSION}.
 * - `previewOnly` suites: primary = preview (the only active cell).
 * - `gaOnly` suites: primary = GA (same as recording version, but named
 *   explicitly for symmetry).
 */
function primaryVersionFor(opts: ForEachServiceVersionOptions): string {
  if (opts.previewOnly) return KnownVersions.V20260601Preview;
  if (opts.gaOnly) return KnownVersions.V20251101;
  return RECORDING_SERVICE_API_VERSION;
}

/**
 * Runs `body` inside a top-level `describe` block once per api version in
 * {@link TEST_SERVICE_API_VERSIONS}. Suites are named
 * `"<name> (apiVersion=<v>)"` so vitest reports and recording lookups stay
 * unambiguous.
 *
 * @example Multi-version sample suite
 * ```ts
 * forEachServiceVersion("Sample: listAnalyzers", ({ apiVersion }) => {
 *   it("lists analyzers", async () => {
 *     const client = createClient(recorder, apiVersion);
 *     // ...
 *   });
 * });
 * ```
 *
 * @example Preview-only marker
 * ```ts
 * forEachServiceVersion(
 *   "Sample: classifyInPageSegments",
 *   { previewOnly: true },
 *   ({ apiVersion }) => { ... },
 * );
 * ```
 */
export function forEachServiceVersion(
  name: string,
  body: (ctx: ServiceVersionTestContext) => void,
): void;
export function forEachServiceVersion(
  name: string,
  options: ForEachServiceVersionOptions,
  body: (ctx: ServiceVersionTestContext) => void,
): void;
export function forEachServiceVersion(
  name: string,
  optionsOrBody:
    | ForEachServiceVersionOptions
    | ((ctx: ServiceVersionTestContext) => void),
  maybeBody?: (ctx: ServiceVersionTestContext) => void,
): void {
  const options = typeof optionsOrBody === "function" ? {} : optionsOrBody;
  const body = typeof optionsOrBody === "function" ? optionsOrBody : maybeBody!;

  const primaryVersion = primaryVersionFor(options);

  for (const apiVersion of TEST_SERVICE_API_VERSIONS) {
    const ctx: ServiceVersionTestContext = {
      apiVersion,
      modelProfile: getTestModelProfile(apiVersion),
      isRecordingVersion: apiVersion === RECORDING_SERVICE_API_VERSION,
    };

    const passesFilter = applyVersionFilter(apiVersion, options);
    const passesRecordingGuard = shouldRunVersion(apiVersion);

    // Primary cell reuses the caller's original suite name so playback keeps
    // finding the same recording file; secondary cells get an
    // `(apiVersion=...)` suffix so live-mode reports stay unambiguous.
    const suiteName =
      apiVersion === primaryVersion ? name : `${name} (apiVersion=${apiVersion})`;

    if (!passesFilter || !passesRecordingGuard) {
      describe.skip(suiteName, () => {
        body(ctx);
      });
      continue;
    }

    describe(suiteName, () => {
      body(ctx);
    });
  }
}

/**
 * True when the current test is on the {@link RECORDING_SERVICE_API_VERSION}
 * cell and should own the recorded HTTP interactions. Handy for assertions
 * that only make sense against the GA baseline (e.g. cross-referencing GA
 * recording fixtures).
 */
export function runningOnRecordedVersion(apiVersion: string): boolean {
  return apiVersion === RECORDING_SERVICE_API_VERSION;
}

/** Convenience shorthand for `{ previewOnly: true }`. */
export const previewOnly: ForEachServiceVersionOptions = { previewOnly: true };

/** Convenience shorthand for `{ gaOnly: true }`. */
export const gaOnly: ForEachServiceVersionOptions = { gaOnly: true };
