// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import ConfidentialLedger, { ConfidentialLedgerClient, getLedgerIdentity } from "../../../src";
import {
  Recorder,
  env,
  assertEnvironmentVariable,
  isPlaybackMode,
} from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { Context } from "mocha";

const replaceableVariables: { [k: string]: string } = {
  LEDGER_URI: "https://test-ledger.confidential-ledger.azure.com",
  AZURE_CLIENT_OID: "azure_client_oid",
  IDENTITY_SERVICE_URL: "https://identity.confidential-ledger.core.azure.com",
  LEDGER_NAME: "test-ledger",
};

export async function getledgerIdentityCertificate(): Promise<string> {
  if (isPlaybackMode()) {
    return "";
  }
  const { ledgerIdentityCertificate } = await getLedgerIdentity(
    assertEnvironmentVariable("LEDGER_NAME"),
    env.IDENTITY_SERVICE_URL,
  );
  return ledgerIdentityCertificate;
}

export async function createClient(recorder: Recorder): Promise<ConfidentialLedgerClient> {
  const clientCredential = createTestCredential();

  const ledgerIdentityCertificate = await getledgerIdentityCertificate();

  return ConfidentialLedger(
    assertEnvironmentVariable("LEDGER_URI"),
    ledgerIdentityCertificate,
    clientCredential,
    recorder.configureClientOptions({}),
  );
}

/**
 * creates the recorder and reads the environment variables from the `.env` file.
 * Should be called first in the test suite to make sure environment variables are
 * read before they are being used.
 */
export async function createRecorder(context: Context): Promise<Recorder> {
  const ledgerIdentityCertificate = await getledgerIdentityCertificate();
  const recorder = new Recorder(context.currentTest);
  const uriSanitizers = [];
  if (env.AZURE_CLIENT_OID) {
    uriSanitizers.push({
      target: env.AZURE_CLIENT_OID,
      value: replaceableVariables["AZURE_CLIENT_OID"],
    });
  }
  await recorder.start({
    tlsValidationCert: ledgerIdentityCertificate,
    envSetupForPlayback: replaceableVariables,
    sanitizerOptions: {
      uriSanitizers,
    },
    // userId is not a secret, need it for the get user test
    removeCentralSanitizers: ["AZSDK3433"]
  });
  return recorder;
}

export function getUniqueName(prefix: string): string {
  return `${prefix}${new Date().getTime()}${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(5, "00000")}`;
}

export function getRecorderUniqueVariable(recorder: Recorder, name: string): string {
  return recorder.variable(name, getUniqueName(name));
}
