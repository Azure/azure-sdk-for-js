// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export const encodeBase64 = (data: string) => btoa(data);
export const decodeBase64 = (data: string) => atob(data);
