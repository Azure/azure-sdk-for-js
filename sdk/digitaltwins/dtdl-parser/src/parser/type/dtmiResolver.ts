// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { GetModelsOptions } from "@azure/iot-modelsrepository";

export type FetchDependencies = (
  dtmis: string | string[],
  options?: GetModelsOptions
) => Promise<{ [dtmi: string]: unknown } | null>;
