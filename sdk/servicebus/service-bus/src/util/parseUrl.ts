// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const url = require("url");

export const parseURL = (rawUrl: string) => {
  return new url.URL(rawUrl);
};
