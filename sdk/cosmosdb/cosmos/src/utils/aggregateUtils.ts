// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import process from "node:process";

export function disableListAndSetAggregate(): boolean {
  return process.env.DISABLE_LIST_AND_SET_AGGREGATE === "true";
}
