import { SharedKeyCredential } from "../../src/credentials/SharedKeyCredential";
import { newPipeline } from "../../src/Pipeline";
import { QueueServiceClient } from "../../src/QueueServiceClient";
// Uncomment if need to enable logger when debugging
// import {HttpPipelineLogLevel} from "../../src"
// import {ConsoleHttpPipelineLogger} from "./testutils.common"

export * from "./testutils.common";

export function getGenericQSU(
  accountType: string,
  accountNameSuffix: string = ""
): QueueServiceClient {
  const accountNameEnvVar = `${accountType}ACCOUNT_NAME`;
  const accountKeyEnvVar = `${accountType}ACCOUNT_KEY`;

  let accountName: string | undefined;
  let accountKey: string | undefined;

  accountName = process.env[accountNameEnvVar];
  accountKey = process.env[accountKeyEnvVar];

  if (!accountName || !accountKey || accountName === "" || accountKey === "") {
    throw new Error(
      `${accountNameEnvVar} and/or ${accountKeyEnvVar} environment variables not specified.`
    );
  }

  const credentials = new SharedKeyCredential(accountName, accountKey);
  const pipeline = newPipeline(credentials, {
    // Enable logger when debugging
    // logger: new ConsoleHttpPipelineLogger(HttpPipelineLogLevel.INFO)
  });
  const queuePrimaryURL = `https://${accountName}${accountNameSuffix}.queue.core.windows.net/`;
  return new QueueServiceClient(queuePrimaryURL, pipeline);
}

export function getQSU(): QueueServiceClient {
  return getGenericQSU("");
}

export function getAlternateQSU(): QueueServiceClient {
  return getGenericQSU("SECONDARY_", "-secondary");
}
