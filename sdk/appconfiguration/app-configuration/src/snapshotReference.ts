// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConfigurationSetting, ConfigurationSettingParam } from "./models.js";
import type { JsonSnapshotReferenceValue } from "./internal/jsonModels.js";
import { logger } from "./logger.js";

/**
 * content-type for the snapshot reference.
 */
export const snapshotReferenceContentType =
  'application/json; profile="https://azconfig.io/mime-profiles/snapshot-ref"; charset=utf-8';

/**
 * Necessary fields for updating or creating a new snapshot reference.
 */
export interface SnapshotReferenceValue {
  /**
   * snapshot name.
   */
  snapshotName: string;
}

/**
 * @internal
 */
export const SnapshotReferenceHelper = {
  /**
   * Takes the SnapshotReference (JSON) and returns a ConfigurationSetting (with the props encoded in the value).
   */
  toConfigurationSettingParam: (
    snapshotReference: ConfigurationSettingParam<SnapshotReferenceValue>,
  ): ConfigurationSettingParam => {
    logger.info("Encoding SnapshotReference value in a ConfigurationSetting:", snapshotReference);
    if (!snapshotReference.value) {
      logger.error(`SnapshotReference has an unexpected value`, snapshotReference);
      throw new TypeError(`SnapshotReference has an unexpected value - ${snapshotReference.value}`);
    }

    const jsonSnapshotReferenceValue: JsonSnapshotReferenceValue = {
      snapshot_name: snapshotReference.value.snapshotName,
    };

    const configSetting = {
      ...snapshotReference,
      value: JSON.stringify(jsonSnapshotReferenceValue),
    };
    return configSetting;
  },
};

/**
 * Takes the ConfigurationSetting as input and returns the ConfigurationSetting<SnapshotReferenceValue> by parsing the value string.
 */
export function parseSnapshotReference(
  setting: ConfigurationSetting,
): ConfigurationSetting<SnapshotReferenceValue> {
  logger.info(
    "[parseSnapshotReference] Parsing the value to return the SnapshotReferenceValue",
    setting,
  );
  if (!isSnapshotReference(setting)) {
    logger.error("Invalid SnapshotReference input", setting);
    throw TypeError(
      `Setting with key ${setting.key} is not a valid SnapshotReference, make sure to have the correct content-type and a valid non-null value.`,
    );
  }

  const jsonSnapshotReferenceValue = JSON.parse(setting.value) as JsonSnapshotReferenceValue;

  const snapshotReference: ConfigurationSetting<SnapshotReferenceValue> = {
    ...setting,
    value: { snapshotName: jsonSnapshotReferenceValue.snapshot_name },
  };
  return snapshotReference;
}

/**
 * Lets you know if the ConfigurationSetting is a snapshot reference.
 *
 * [Checks if the content type is snapshotReferenceContentType `"application/json; profile=\"https://azconfig.io/mime-profiles/snapshot-ref\"; charset=utf-8"`]
 */
export function isSnapshotReference(
  setting: ConfigurationSetting,
): setting is ConfigurationSetting & Required<Pick<ConfigurationSetting, "value">> {
  return (
    setting &&
    setting.contentType === snapshotReferenceContentType &&
    typeof setting.value === "string"
  );
}
