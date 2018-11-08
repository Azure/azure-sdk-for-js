import * as Models from "./generated/models";

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
