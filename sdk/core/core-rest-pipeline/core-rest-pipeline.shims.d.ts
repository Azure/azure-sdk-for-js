// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

declare global {
  interface FormData {}
  interface Blob {}
  interface File {}
  interface ReadableStream {}
}

export * from "./types/latest/core-rest-pipeline";
