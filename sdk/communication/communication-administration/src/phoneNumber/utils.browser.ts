// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export const getDefaultLocale = (): string => {
  return window?.navigator?.language ?? "en-US";
};
