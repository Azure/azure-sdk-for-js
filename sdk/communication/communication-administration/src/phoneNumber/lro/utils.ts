// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PhoneNumberSearch, SearchStatus } from "../..";
import { PhoneNumberRelease, ReleaseStatus } from "../generated/src/models";

export const isComplete = (
  results: PhoneNumberSearch | PhoneNumberRelease,
  completionStatus: SearchStatus | ReleaseStatus
): boolean | never => {
  if (results.status === "Error" || results.status === "Failed") {
    throw new Error(JSON.stringify(results));
  }

  return results.status === completionStatus;
};
