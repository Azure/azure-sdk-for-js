// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export const getDefaultLocale = (): string => {
  return self?.navigator?.language ?? "en-US";
};
