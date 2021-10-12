// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 */

import {
    OperationParameter,
  } from "@azure/core-http";

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
