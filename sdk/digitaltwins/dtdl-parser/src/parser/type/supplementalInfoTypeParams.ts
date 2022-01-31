// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface SupplementalTypeInfoParams {
  // The context ID of the extension in which the supplemental type was defined.
  contextId: string;
  // URI that represents the type.
  type: string;
  // True if the supplemental type is abstract.
  isAbstract: boolean;
  // URI that represents the immediate parent in the type hierarchy.
  parentType?: string;
}
