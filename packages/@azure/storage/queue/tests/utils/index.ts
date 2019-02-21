import { SharedKeyCredential } from "../../lib/credentials/SharedKeyCredential";
import { ServiceURL } from "../../lib/ServiceURL";
import { StorageURL } from "../../lib/StorageURL";
// Uncomment if need to enable logger when debugging
// import {HttpPipelineLogLevel} from "../../lib"
// import {ConsoleHttpPipelineLogger} from "./testutils.common"

export * from "./testutils.common";

export function getGenericQSU(
  accountType: string,
  accountNameSuffix: string = ""
): ServiceURL {
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
  const pipeline = StorageURL.newPipeline(credentials, {
    // Enable logger when debugging
    // logger: new ConsoleHttpPipelineLogger(HttpPipelineLogLevel.INFO)
  });
  const queuePrimaryURL = `https://${accountName}${accountNameSuffix}.queue.core.windows.net/`;
  return new ServiceURL(queuePrimaryURL, pipeline);
}

export function getQSU(): ServiceURL {
  return getGenericQSU("");
}

export function getAlternateQSU(): ServiceURL {
  return getGenericQSU("SECONDARY_", "-secondary");
}
