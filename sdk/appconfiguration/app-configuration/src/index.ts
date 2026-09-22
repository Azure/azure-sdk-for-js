// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export { AppConfigurationClient } from "./appConfigurationClient.js";
export type { SimplePollerLike } from "./internal/lroShim.js";
export {
  featureFlagContentType,
  featureFlagPrefix,
  type FeatureFlagValue,
  isFeatureFlag,
  parseFeatureFlag,
} from "./featureFlag.js";
export * from "./models.js";
export {
  isSecretReference,
  parseSecretReference,
  secretReferenceContentType,
  type SecretReferenceValue,
} from "./secretReference.js";
export {
  isSnapshotReference,
  parseSnapshotReference,
  snapshotReferenceContentType,
  type SnapshotReferenceValue,
} from "./snapshotReference.js";
export { RestError, isRestError } from "@azure/core-rest-pipeline";
