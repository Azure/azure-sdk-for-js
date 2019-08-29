import * as Models from "./generated/src/models";
import { EncryptionAlgorithmAES25 } from "./utils/constants";

export interface IMetadata {
  [propertyName: string]: string;
}

export interface IContainerAccessConditions {
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
  leaseAccessConditions?: Models.LeaseAccessConditions;
}

export interface IBlobAccessConditions {
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
  leaseAccessConditions?: Models.LeaseAccessConditions;
}

export interface IPageBlobAccessConditions extends IBlobAccessConditions {
  sequenceNumberAccessConditions?: Models.SequenceNumberAccessConditions;
}

export interface IAppendBlobAccessConditions extends IBlobAccessConditions {
  appendPositionAccessConditions?: Models.AppendPositionAccessConditions;
}

export function ensureCpkIfSpecified(cpk: Models.CpkInfo | undefined, isHttps: boolean) {
  if (cpk && !isHttps) {
    throw new RangeError("Customer-provided encryption key must be used over HTTPS.")
  }

  if (cpk && !cpk.xMsEncryptionAlgorithm) {
    cpk.xMsEncryptionAlgorithm = EncryptionAlgorithmAES25;
  }
}