// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export function getToken(tokenString: string): string {
  return btoa(tokenString);
}
