// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PhoneNumberSearch, SearchStatus } from "../..";

export const isComplete = (results: PhoneNumberSearch, status: SearchStatus): boolean | never => {
  if (results.status !== status) {
    throw new Error(JSON.stringify(results));
  }

  return true;
};
