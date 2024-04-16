// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpClient } from "@azure/core-rest-pipeline";
import { addSanitizers } from "../sanitizer.js";
import { BodyKeySanitizer, FindReplaceSanitizer, HeaderSanitizer } from "./utils.js";

const JSON_BODY_KEYS_TO_REDACT = [
  "authHeader",
  "accountKey",
  "accessToken",
  "accountName",
  "applicationId",
  "apiKey",
  "client_secret",
  "connectionString",
  "url",
  "host",
  "password",
  "userName",
  "applicationSecret",
  "aliasSecondaryConnectionString",
  "aliasPrimaryConnectionString",
  "primaryKey",
  "secondaryKey",
  "adminPassword.value",
  "administratorLoginPassword",
  "runAsPassword",
  "adminPassword",
  "accessSAS",
  "WEBSITE_AUTH_ENCRYPTION_KEY",
  "decryptionKey",
  "primaryMasterKey",
  "primaryReadonlyMasterKey",
  "secondaryMasterKey",
  "secondaryReadonlyMasterKey",
  "certificatePassword",
  "clientSecret",
  "keyVaultClientSecret",
  "authHeader",
  "httpHeader",
  "encryptedCredential",
  "appkey",
  "functionKey",
  "atlasKafkaPrimaryEndpoint",
  "atlasKafkaSecondaryEndpoint",
  "certificatePassword",
  "storageAccountPrimaryKey",
  "privateKey",
  "fencingClientPassword",
  "acrToken",
  "scriptUrlSasToken",
  "azureBlobSource.containerUrl",
  "properties.DOCKER_REGISTRY_SEVER_PASSWORD",
];

const BODY_REGEXES_TO_REDACT = [
  "(?:(Password|User ID)=)(?<secret>.*)(?:;)",
  "client_secret=(?<secret>[^&]+)",
  "<PrimaryKey>(?<secret>.*?)</PrimaryKey>",
  "<SecondaryKey>(?<secret>.*?)</SecondaryKey>",
  "<UserDelegationKey>.*?<SignedOid>(?<secret>.*?)</SignedOid>.*?</UserDelegationKey>",
  "<UserDelegationKey>.*?<SignedTid>(?<secret>.*?)</SignedTid>.*?</UserDelegationKey>",
  "<UserDelegationKey>.*?<Value>(?<secret>.*?)</Value>.*?</UserDelegationKey>",
  'SharedAccessKey=(?<secret>[^;\\"]+)',
  'AccountKey=(?<secret>[^;\\"]+)',
  'accesskey=(?<secret>[^;\\"]+)',
  'AccessKey=(?<secret>[^;\\"]+)',
  'Secret=(?<secret>[^;\\"]+)',
  "access_token=(?<secret>.*?)(?=&|$)",
  "refresh_token=(?<secret>.*?)(?=&|$)",
  '(?:(sv|sig|se|srt|ss|sp)=)(?<secret>[^&\\"]*)',
];

const URL_REGEX = "(?<=http://|https://)([^/?]+)";

const HEADER_KEYS_TO_REDACT = [
  "Ocp-Apim-Subscription-Key",
  "api-key",
  "x-api-key",
  "subscription-key",
  "x-ms-encryption-key",
  "sshPassword",
];

export async function fallbackSanitizers(
  httpClient: HttpClient,
  url: string,
  recordingId: string,
): Promise<void> {
  const bodyKeySanitizers: BodyKeySanitizer[] = JSON_BODY_KEYS_TO_REDACT.map((prop) => ({
    jsonPath: `$..${prop}`, // Handles the request body
    value: "REDACTED",
  }));

  const generalSanitizers: FindReplaceSanitizer[] = BODY_REGEXES_TO_REDACT.map((regex) => ({
    value: "REDACTED",
    regex: true,
    groupForReplace: "secret",
    target: regex,
  }));

  const headerSanitizers: HeaderSanitizer[] = [
    {
      key: "Operation-location",
      groupForReplace: "secret",
      regex: true,
      target: URL_REGEX,
      value: "REDACTED",
    },
    {
      key: "ServiceBusDlqSupplementaryAuthorization",
      groupForReplace: "secret",
      regex: true,
      target: '(?:(sv|sig|se|srt|ss|sp)=)(?<secret>[^&\\"]+)',
      value: "REDACTED",
    },
    {
      key: "ServiceBusSupplementaryAuthorization",
      groupForReplace: "secret",
      regex: true,
      target: '(?:(sv|sig|se|srt|ss|sp)=)(?<secret>[^&\\"]+)',
      value: "REDACTED",
    },
  ];

  const headersForRemoval: string[] = HEADER_KEYS_TO_REDACT;
  await addSanitizers(httpClient, url, recordingId, {
    bodyKeySanitizers,
    generalSanitizers,
    removeHeaderSanitizer: { headersForRemoval },
    headerSanitizers,
  });
}
