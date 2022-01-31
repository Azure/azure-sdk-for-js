// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Interface for establishing a type constraint on a property.
 */
export interface PropertyInstanceBinder {
  /**
   * Add a binding on a property whose value must be an instance of another property.
   * @param propertyName - Property whose value defines the instance validation criteria.
   * @param instancePropertyName - Property whose value must be an instance of PropertyName.
   */
  addInstanceProperty(propertyName: string, instancePropertyName: string): void;
}
