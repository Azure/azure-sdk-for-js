// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export const encodeBase64 = (data: string): string => btoa(data);
export const decodeBase64 = (data: string): string => atob(data);
