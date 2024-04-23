// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
export interface ComputedProperty {
  /**
   *  The name of the computed property. Name of the computed property
   *  should be chosen such that it does not collide with any existing
   *  or future document properties.
   */
  name: string;
  // The query used to evaluate the value for the computed property.
  query: string;
  [key: string]: any; // For additional properties
}
