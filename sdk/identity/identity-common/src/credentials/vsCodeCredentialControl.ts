// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { VSCodeCredentialFinder } from "./visualStudioCodeCredentialPlugin";

let findCredentials: VSCodeCredentialFinder | undefined = undefined;

export const vsCodeCredentialControl = {
  setVsCodeCredentialFinder(finder: VSCodeCredentialFinder): void {
    findCredentials = finder;
  },
  getVsCodeCredentialFinder(): VSCodeCredentialFinder| undefined {
    return findCredentials
  }
};