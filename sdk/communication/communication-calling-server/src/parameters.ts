// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 */

import { OperationParameter } from "@azure/core-http";

/** Specified range used to indicate the bytes of the blob. */
export const range: OperationParameter = {
  parameterPath: ["options", "range"],
  mapper: {
    serializedName: "x-ms-range",
    xmlName: "x-ms-range",
    type: {
      name: "String"
    }
  }
};
