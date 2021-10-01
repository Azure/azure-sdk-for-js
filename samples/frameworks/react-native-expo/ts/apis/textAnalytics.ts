import { TextAnalyticsClient } from "@azure/ai-text-analytics";
import { setLogLevel } from "@azure/logger";
import { ExpoAadTokenCredential } from "../auth/auth";

let cachedClient: TextAnalyticsClient;

function getClient(): TextAnalyticsClient {
  setLogLevel("verbose");
  if (!cachedClient) {
    const endpoint = process.env.TEXT_ANALYTICS_ENDPOINT;

    // Comment out the following to use AzureKeyCredential instead of AAD auth.
    // const key = process.env.TEXT_ANALYTICS_KEY;
    // cachedClient = new TextAnalyticsClient(
    //   endpoint as string,
    //   new AzureKeyCredential(key as string)
    // );

    const tenantId = process.env.AZURE_AAD_TENANT;
    const clientId = process.env.AZURE_AAD_CLIENT;

    const credential = new ExpoAadTokenCredential(
      tenantId as string,
      clientId as string
    );
    cachedClient = new TextAnalyticsClient(endpoint as string, credential);
  }

  return cachedClient;
}

export function analyzeSentiment(text: string[]) {
  const client = getClient();

  return client.analyzeSentiment(text);
}
