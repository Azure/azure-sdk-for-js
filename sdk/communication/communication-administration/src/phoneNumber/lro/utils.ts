// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PhoneNumberSearch, SearchStatus } from "../..";

export const isComplete = (
  results: PhoneNumberSearch,
  completionStatus: SearchStatus
): boolean | never => {
  if (results.status == "Error") {
    throw new Error(JSON.stringify(results));
  }

  return results.status === completionStatus;
};
