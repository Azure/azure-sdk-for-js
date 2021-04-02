// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * A method that allows us to alter and retrieve from the Window object.
 * This will help us clean up the code later.
 */
export const windowLens: {
  get: (propertyPath: string[], root?: any) => any;
  set: (propertyPath: string[], propertyValue: any, root?: any) => void;
} = {
  get(propertyPath: string[], root = window): any {
    if (propertyPath.length === 1) {
      return root[propertyPath[0]];
    }
    if (!root[propertyPath[0]]) {
      return;
    }
    return this.get(propertyPath.slice(1), root[propertyPath[0]]);
  },
  set(propertyPath: string[], propertyValue: any, root = window): void {
    if (propertyPath.length === 1) {
      root[propertyPath[0]] = propertyValue;
      return;
    }
    if (!root[propertyPath[0]]) {
      root[propertyPath[0]] = {};
    }
    return this.set(propertyPath.slice(1), propertyValue, root[propertyPath[0]]);
  }
};
