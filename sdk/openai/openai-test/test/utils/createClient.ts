// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import {
  assertEnvironmentVariable,
} from "@azure-tools/test-recorder";
import OpenAI from 'openai';
import { ClientOptions } from 'openai';
import { EnvironmentVariableNames } from "./envVars";

export function createClient(
  clientOptions?: ClientOptions,
): OpenAI {  
  return new OpenAI({
    apiKey: clientOptions?.apiKey ?? assertEnvironmentVariable(EnvironmentVariableNames.OPENAI_KEY),
    dangerouslyAllowBrowser: true,
    ...clientOptions
  });
}
