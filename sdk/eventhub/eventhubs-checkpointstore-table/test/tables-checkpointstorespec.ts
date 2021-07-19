// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { TableCheckpointStore } from "../src";

if (typeof TableCheckpointStore == "function") {
  console.log("TableCheckpointstore is a function");
} else {
  console.log("Error: TableCheckpointstore is not a function");
}
