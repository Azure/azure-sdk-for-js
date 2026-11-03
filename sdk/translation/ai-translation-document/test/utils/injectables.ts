// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { inject } from "vitest";
import { EnvVarKeys } from "./constants.js";
import type { KnownContainers } from "./types.js";

// The vitest `ProvidedContext` augmentation is declared here (rather than in
// setup.ts) because the test project only type-checks `*.spec.ts` files and the
// files they import. setup.ts is wired in as a `globalSetup` module and is not
// imported by any spec, so declaring the augmentation here ensures `inject` is
// correctly typed everywhere it is used.
declare module "vitest" {
  type MyEnvVarKeys = {
    [K in (typeof EnvVarKeys)[keyof typeof EnvVarKeys]]: string;
  };
  export interface ProvidedContext extends Omit<
    MyEnvVarKeys,
    | typeof EnvVarKeys.DISABLE_LOCAL_AUTH
    | typeof EnvVarKeys.TEST_MODE
    | typeof EnvVarKeys.CONTAINERS
  > {
    [EnvVarKeys.TEST_MODE]: string | undefined;
    [EnvVarKeys.DISABLE_LOCAL_AUTH]: boolean;
    [EnvVarKeys.CONTAINERS]: KnownContainers;
  }
}

export function getEndpoint(): string {
  return inject(EnvVarKeys.ENDPOINT);
}

export function getBlobEndpoint(): string {
  return inject(EnvVarKeys.BLOB_ENDPOINT);
}

export function isLocalAuthDisabled(): boolean {
  return inject(EnvVarKeys.DISABLE_LOCAL_AUTH);
}

export function getKey(): string {
  return inject(EnvVarKeys.KEY);
}

export function getRegion(): string {
  return inject(EnvVarKeys.REGION);
}

export function getResourceId(): string {
  return inject(EnvVarKeys.RESOURCE_ID);
}

export function getContainers(): KnownContainers {
  return inject(EnvVarKeys.CONTAINERS);
}

export function isLiveMode(): boolean {
  return ["live", "record"].includes(inject(EnvVarKeys.TEST_MODE) ?? "");
}
