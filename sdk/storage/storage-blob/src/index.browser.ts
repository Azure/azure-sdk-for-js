// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RestError } from "@azure/core-http";

export * from "./BlobServiceClient";
export * from "./Clients";
export * from "./ContainerClient";
export * from "./BlobLeaseClient";
export * from "./BlobBatch";
export * from "./BlobBatchClient";
export * from "./BatchResponse";
export * from "./StorageBrowserPolicyFactory";
export * from "./credentials/AnonymousCredential";
export * from "./credentials/Credential";
export { SasIPRange } from "./sas/SasIPRange";
export { Range } from "./Range";
export {
  BlockBlobTier,
  PremiumPageBlobTier,
  Tags,
  TagConditions,
  ContainerRequestConditions,
  ModificationConditions,
  MatchConditions
} from "./models";
export * from "./Pipeline";
export * from "./policies/AnonymousCredentialPolicy";
export * from "./policies/CredentialPolicy";
export * from "./StorageRetryPolicyFactory";
export { CommonOptions } from "./StorageClient";
export * from "./generatedModels";
export { RestError };
export {
  PageBlobGetPageRangesDiffResponse,
  PageBlobGetPageRangesResponse,
  PageList
} from "./PageBlobRangeResponse";
export { logger } from "./log";

export function configureFallback(
  domParser: { new (): DOMParser },
  xmlSerializer: { new (): XMLSerializer },
  document: Document,
  node: { new (): Node }
) {
  if (!self) {
    throw new Error(
      "configureFallback should be used when providing DOM polyfills in a browser environment. Self is not defined - check if you're accidentally running this in node."
    );
  }
  Object.assign(self, { DOMParser: domParser, XMLSerializer: xmlSerializer, Node: node, document });
}
