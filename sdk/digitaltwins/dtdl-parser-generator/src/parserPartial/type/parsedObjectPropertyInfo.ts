// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// import {InDTMI} from '../../parser/internalDtmi';

// import {InDTMI} from '../../parser/internalDtmi';

export interface ParsedObjectPropertyInfo {
  // codegen-outline-begin fields
  elementId: string;
  propertyName: string;
  referencedElementId: string;
  keyProperty?: string;
  allowedVersions?: Set<number>;
  badTypeCauseFormat?: string;
  badTypeActionFormat?: string;
  // codegen-outline-end
  expectedKinds?: any[]; // TODO this should be codegenned as an array of EntityKind
}
