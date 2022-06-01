// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Interface for checking whether an obverse object has a given type.
 */
export interface TypeChecker {
  /**
   * Determine whether the object has the indicated type.
   * @param typeId - The DTMI value of the type to check for.
   */
  doesHaveType(typeId: string): boolean;
}
