// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @internal
 */
export const parseURL = (rawUrl: string): any => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: "self" will exist in the browser.
  return new self.URL(rawUrl);
};
