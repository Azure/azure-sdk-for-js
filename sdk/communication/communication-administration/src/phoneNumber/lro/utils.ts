// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PhoneNumberReservation, SearchStatus } from "../..";
import { PhoneNumberRelease, ReleaseStatus } from "../generated/src/models";

export const isComplete = (
  results: PhoneNumberReservation | PhoneNumberRelease,
  completionStatus: SearchStatus | ReleaseStatus
): boolean | never => {
  if (results.status === "Error" || results.status === "Failed" || results.status === "Expired") {
    throw new Error(JSON.stringify(results));
  }

  return results.status === completionStatus;
};
