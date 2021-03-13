// Copyright (c) Microsoft Corporation.
// Licensed under the MIT Licence.

/*
  ONLY AVAILABLE IN NODE.JS RUNTIME
  If you are using the browser, you can use the InteractiveBrowserCredential provided via @azure/identity or any other feasible implementation of TokenCredential.

  This sample demonstrates how to instantiate SmsClient using AAD token credentials.

  Setup :
    Please ensure that your Communication Services resource is in US East, US East 2, or West Europe
    region. AAD Role Based Access Control is not supported in other regions yet.

    Register a new application in AAD
      - See https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app
        to register a new application in the Azure Active Directory.
      - Note down the CLIENT_ID and TENANT_ID from the above step.
      - In the "Certificates & Secrets" tab, create a secret and note that down.
      - In the Azure portal, go to your Communication Services resource and click on the Access control (IAM)
        tab. Here, assign the "Owner" role to the registered application.
      
    - Environment setup for the sample
      - From the overview page of your AAD Application, note down the `CLIENT ID` and `TENANT ID`. In the "Certificates & Secrets" tab, create a secret and note that down.
      - Make sure you have AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET as environment variables to successfully execute the sample (can leverage process.env).
*/

const { SmsClient } = require("@azure/communication-sms");
const { DefaultAzureCredential } = require("@azure/identity");

async function main() {
  const endpoint =
    process.env["COMMUNICATION_ENDPOINT"] || "https://<resource-name>.communication.azure.com";
  // Azure AD Credential information is required to run this sample:
  if (
    !process.env.AZURE_TENANT_ID ||
    !process.env.AZURE_CLIENT_ID ||
    !process.env.AZURE_CLIENT_SECRET
  ) {
    console.warn(
      "Azure AD authentication information not provided, but it is required to run this sample. Exiting."
    );
    return;
  }

  const client = new SmsClient(endpoint, new DefaultAzureCredential());
  const sendResults = await client.send({
    from: "<from-phone-number>", // Your E.164 formatted phone number used to send SMS
    to: ["<to-phone-number-1>"], // The list of E.164 formatted phone numbers to which message is being sent
    message: "Hello World via SMS!" // The message being sent
  });

  for (const sendResult of sendResults) {
    if (sendResult.successful) {
      console.log("Success: ", sendResult);
    } else {
      console.error("Something went wrong when trying to send this message: ", sendResult);
    }
  }
}

main().catch((error) => {
  console.error("Encountered an error while sending sms: ");
  console.error("Request: \n", error.request);
  console.error("\nResponse: \n", error.response);
});
