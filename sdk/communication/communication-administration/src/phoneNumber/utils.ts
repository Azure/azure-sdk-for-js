// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export const getDefaultLocale = (): string => {
  // hard-coded for NodeJS, we use navigator.language in the browser
  return "en-US";
};
