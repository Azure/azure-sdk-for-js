// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * A function that searches for credentials in the Visual Studio Code credential store.
 *
 * @returns an array of credentials (username and password)
 * @internal
 *
 * @deprecated VisualStudioCodeCredential is deprecated.
 */
export type VSCodeCredentialFinder = () => Promise<Array<{ account: string; password: string }>>;
