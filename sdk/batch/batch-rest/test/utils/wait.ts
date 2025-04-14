// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export const wait = (ms: number): Promise<void> => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};
