// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export enum EnvVarKeys {
  EVENTHUB_FQDN = "EVENTHUB_FQDN",
  EVENTHUB_NAME = "EVENTHUB_NAME",
  EVENTHUB_CONNECTION_STRING = "EVENTHUB_CONNECTION_STRING",
  TEST_MODE = "TEST_MODE",
}

// Mocked values
export const EVENTHUB_FQDN = "localhost";
export const EVENTHUB_NAME = "mock-hub";
export const sharedAccessKeyName = "Foo";
export const sharedAccessKey = "Bar";
export const EVENTHUB_CONNECTION_STRING_WITH_KEY = `Endpoint=sb://${EVENTHUB_FQDN}/;SharedAccessKeyName=${sharedAccessKeyName};SharedAccessKey=${sharedAccessKey}`;
export const sharedAccessSignature = "sr=<resource>&sig=someb64=&se=<expiry>&skn=<keyname>";
export const EVENTHUB_CONNECTION_STRING_WITH_SAS = `Endpoint=sb://${EVENTHUB_FQDN}/;SharedAccessSignature=SharedAccessSignature ${sharedAccessSignature}`;
