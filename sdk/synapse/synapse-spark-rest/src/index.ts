// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import SparkClient from "./sparkClient";

export * from "./sparkClient";
export * from "./models";
export * from "./parameters";
export * from "./responses";

export { getLongRunningPoller } from "./longRunningHelper";
export { PaginateReturn, paginate } from "./pagination";

export default SparkClient;
