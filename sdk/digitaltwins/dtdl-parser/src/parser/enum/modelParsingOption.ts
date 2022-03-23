// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-unused-vars */

export enum ModelParsingOption {
  None = 0x00,
  RejectUndefinedExtensions = 0x01,
  RejectNonDtmiContexts = 0x02,
  MandateTopLevelPartition = 0x04,
  PermitAnyTopLevelElement = 0x08,
  ParseAllowsIdReferenceSyntax = 0x10,
  ResolveAllowsIdReferenceSyntax = 0x20
}
