// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DocumentTranslatorClient } from "@azure-rest/ai-document-translator";
import DocumentTranslator from "@azure-rest/ai-document-translator";
import type { Recorder } from "@azure-tools/test-recorder";
import { env } from "@azure-tools/test-recorder";

import type { ClientOptions } from "@azure-rest/core-client";

const envSetupForPlayback: { [k: string]: string } = {
  DOCUMENT_TRANSLATOR_API_KEY: "api_key",
  ENDPOINT: "https://endpoint/",
};

export async function createClient(
  recorder: Recorder,
  options?: ClientOptions,
): Promise<DocumentTranslatorClient> {
  await recorder.start({ envSetupForPlayback });
  const credential = { key: env.DOCUMENT_TRANSLATOR_API_KEY ?? "" };
  const client = DocumentTranslator(
    env.ENDPOINT ?? "",
    credential,
    recorder.configureClientOptions(options || {}),
  );
  return client;
}
