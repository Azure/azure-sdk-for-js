// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export const generateGUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, // random integer between 0 and 15
          v = c === 'x' ? r : (r & 0x3 | 0x8); // bitwise operations to handle 'y' and 'x'
    return v.toString(16);
  });
}