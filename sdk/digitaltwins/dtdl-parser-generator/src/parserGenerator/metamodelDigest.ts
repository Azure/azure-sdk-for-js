// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-undef */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// TODO: Replace this when PartitionRestrictions is implemented
type PartitionRestrictions = any;

export type Context = { [term: string]: string };

export interface StringRestriction {
  maxLength?: number;
  pattern?: string;
}

export type VersionedIdentifierRestriction = { [dtdlVersion: number]: StringRestriction };

export type ClassIdentifierRestriction = { [className: string]: VersionedIdentifierRestriction };

export type IdentifierRestriction = VersionedIdentifierRestriction | ClassIdentifierRestriction;

export interface StandardElementDigest {
  id: string;
  name: string;
  description: string;
}

export interface PropertyVersionDigest {
  idRequired: boolean;
  defaultLanguage?: string;
  allowed: boolean;
  class?: string;
  versions?: number[];
  maxCount?: number;
  minCount?: number;
  maxInclusive?: number;
  minInclusive?: number;
  maxLength?: number;
  pattern?: string;
  valueUris?: string[];
  values?: string[];
  typeRequired: boolean;
  uniqueProperties?: string[];
  value?: string | number | boolean;
  uniqueAmong: string[];
}

export interface MaterialPropertyDigest {
  _: {
    literal: boolean;
    class?: string;
    dictionaryKey?: string;
    abstract: boolean;
    datatype?: string;
    plural: boolean;
    optional: boolean;
    dtmiSegment?: string;
    inherited: boolean;
    shadowed: boolean;
    isKey: boolean;
    isSeg: boolean;
    description: string;
  };
  [dtdlVersion: number]: PropertyVersionDigest;
}

export interface InstanceConditionDigest {
  jsonType?: string;
  datatype?: string;
  instanceProperty?: string[];
  pattern?: string;
  hasValue?: string;
  namePattern?: string;
  nameHasValue?: string;
}

export interface InstanceValidationDigest {
  criteriaText: string;
  [dtdlVersion: number]: {
    element: InstanceConditionDigest;
    eachChild: InstanceConditionDigest;
  };
}

export interface MaterialClassDigest {
  dtdlVersions: number[];
  abstract: boolean;
  overt: boolean;
  partition: boolean;
  parentClass: string | null;
  typeOptionalVersions: number[];
  idRequiredVersions: number[];
  typeIds: string[];
  concreteSubclasses: { [dtdlVersion: number]: string[] };
  elementalSubclasses: { [dtdlVersion: number]: string[] };
  elements: { [dtdlVersion: number]: StandardElementDigest[] };
  extensibleMaterialSubclasses: { [dtdlVersion: number]: string[] };
  standardElementIds?: { [dtdlVersion: number]: string[] };
  badTypeCauseFormat: { [dtdlVersion: number]: string };
  badTypeActionFormat: { [dtdlVersion: number]: string };
  properties: { [propName: string]: MaterialPropertyDigest };
  instance?: InstanceValidationDigest;
}

export interface DescendantControlDigest {
  propertyNames: string[];
  dtdlVersion: number;
  rootClass: string;
  definingClass: string;
  properties: string[];
  narrow: boolean;
  excludeType?: string;
  datatypeProperty?: string;
  maxDepth?: number;
  maxCount?: number;
  importProperties?: string[];
}

export interface SupplementalPropertyDigest {
  propertyName: string;
  type?: string;
  typeName?: string;
  maxCount?: number;
  minCount?: number;
  plural: boolean;
  optional: boolean;
  dictionaryKey?: string;
  instanceProperty?: string;
  description?: string;
}

export interface SupplementalConstraintDigest {
  property: string;
  requiredTypes?: string[];
  requiredTypeNames?: string[];
  requiredTypesString?: string;
  requiredValues?: string[];
  requiredValueNames?: string[];
  requiredValuesString?: string;
}

export interface SupplementalTypeDigest {
  abstract: boolean;
  parent: string;
  extensionKind: string;
  extensionContext: string;
  cotypes: string[];
  cotypeVersions: number[];
  properties: { [propertyUri: string]: SupplementalPropertyDigest };
  constraints: SupplementalConstraintDigest[];
}

export interface QuantitativeTypeDigest {
  quant: string;
  quantContext: string;
  unit: string;
  unitContext: string;
}

export interface PartitionRestriction {
  maxBytes?: number;
}

export interface MetamodelDigest {
  digestFormatVersion: number;
  dtdlVersions: number[];
  contexts: { [contextId: string]: Context };
  baseClass: string;
  partitionClasses: string[];
  rootableClasses: { [dtdlVersion: number]: string[] };
  aliases: { [alias: string]: string };
  identifierDefinition: IdentifierRestriction;
  identifierReference: VersionedIdentifierRestriction;
  partitions: { [dtdlVersion: number]: PartitionRestriction };
  dtdlVersionsAllowingLocalTerms: number[];
  affiliateContextsImplicitDtdlVersions: { [context: string]: number };
  extensionKinds: string[];
  extensibleMaterialClasses: { [dtdlVersion: number]: string[] };
  materialClasses: { [className: string]: MaterialClassDigest };
  descendantControls: DescendantControlDigest[];
  supplementalTypes: { [typeUri: string]: SupplementalTypeDigest };
  quantitativeTypes: { [dtdlVersion: number]: QuantitativeTypeDigest[] };
  units: { [dtdlVersion: number]: { [unitType: string]: { [unit: string]: string } } };
  elements: { [x: string]: unknown }[];
  partitionRestrictions?: PartitionRestrictions;
}
