// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export { Resource, CustomPage } from "./api/foo/models.js";
export {
  CreateOrUpdateOptions,
  GetOptions,
  DeleteOptions,
  ListOptions,
} from "./api/foo/operations.js";
export { FooClient, FooClientOptions } from "./FooClient.js";
export { RequestOptions } from "./common/interfaces.js";
export {
  Resource as BarClientResource,
  CustomPage as BarClientCustomPage,
} from "./api/bar/models.js";
export {
  GetBinaryOptions,
  GetArrayOptions,
  CreateWithHeadersOptions,
  DeleteWithHeadersOptions,
} from "./api/bar/operations.js";
export { BarClient, BarClientOptions } from "./BarClient.js";
