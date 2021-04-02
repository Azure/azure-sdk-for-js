import { DefaultAzureCredential, TokenCredential } from "@azure/identity";
import { isPlaybackMode, RecorderEnvironmentSetup } from "@azure/test-utils-recorder";

export const recorderConfiguration: RecorderEnvironmentSetup = {
  replaceableVariables: {
    AZURE_COMMUNICATION_LIVETEST_CONNECTION_STRING: "endpoint=https://endpoint/;accesskey=banana",
    AZURE_PHONE_NUMBER: "+18005551234",
    AZURE_CLIENT_ID: "SomeClientId",
    AZURE_CLIENT_SECRET: "SomeClientSecret",
    AZURE_TENANT_ID: "SomeTenantId"
  },
  customizationsOnRecordings: [
    (recording: string): string => recording.replace(/(https:\/\/)([^\/',]*)/, "$1endpoint"),
    (recording: string): string =>
      recording.replace(/"messageId"\s?:\s?"[^"]*"/g, `"messageId":"Sanitized"`)
  ],
  queryParametersToSkip: []
};

export function createCredential(): TokenCredential | undefined {
  if (isPlaybackMode()) {
    return {
      getToken: async (_scopes) => {
        return { token: "testToken", expiresOnTimestamp: 11111 };
      }
    };
  } else {
    try {
      return new DefaultAzureCredential();
    } catch {
      return undefined;
    }
  }
}
