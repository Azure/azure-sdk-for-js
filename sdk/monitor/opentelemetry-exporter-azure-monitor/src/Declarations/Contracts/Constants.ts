// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Subset of Connection String fields which this SDK can parse. Lower-typecased to
 * allow for case-insensitivity across field names
 */
export type ConnectionString = { [key in ConnectionStringKey]?: string }

export type ConnectionStringKey =
  | 'authorization'
  | 'instrumentationkey'
  | 'ingestionendpoint'
  | 'liveendpoint'
  | 'location'
  | 'endpointsuffix';
