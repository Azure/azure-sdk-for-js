// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import { assert, packageJsonCheck } from "../framework/check.ts";
import { METADATA_KEY } from "../util/resolveProject.ts";
import { validateSampleConfiguration } from "../util/samples/configuration.ts";

/**
 * Validates the package's sample configuration against the documented
 * `SampleConfiguration` schema.
 *
 * The sample tooling reads this configuration to decide which samples to
 * generate and publish. Because it is read with plain property access, a
 * misspelled or mistyped property (for example `skipFolders` instead of
 * `skipFolder`) is silently ignored, which can cause the wrong samples to be
 * generated or published. This check surfaces such drift as an actionable
 * error.
 *
 * Both the current location (`"//metadata".sampleConfiguration`) and the
 * deprecated top-level `"//sampleConfiguration"` location are validated. Using
 * the deprecated location is intentionally tolerated here (a large number of
 * packages still use it); this check only validates the shape, it does not
 * enforce a migration.
 */
export const sampleConfiguration = packageJsonCheck({
  description: "sampleConfiguration must match the documented SampleConfiguration schema",
  check({ packageJson }) {
    const locations: Array<{ label: string; value: unknown }> = [];

    const metadataConfiguration = packageJson[METADATA_KEY]?.sampleConfiguration;
    if (metadataConfiguration !== undefined) {
      locations.push({
        label: `${METADATA_KEY}.sampleConfiguration`,
        value: metadataConfiguration,
      });
    }

    const legacyConfiguration = packageJson["//sampleConfiguration"];
    if (legacyConfiguration !== undefined) {
      locations.push({ label: "//sampleConfiguration", value: legacyConfiguration });
    }

    const details: string[] = [];
    for (const { label, value } of locations) {
      for (const problem of validateSampleConfiguration(value)) {
        const suffix = problem.path === "." ? "" : `.${problem.path}`;
        details.push(`${label}${suffix}: ${problem.message}`);
      }
    }

    assert(
      details.length === 0,
      "sample configuration does not match the expected schema",
      details.join("\n"),
    );
  },
});
