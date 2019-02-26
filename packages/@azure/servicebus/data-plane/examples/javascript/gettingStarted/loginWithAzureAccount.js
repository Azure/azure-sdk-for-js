/*
  This sample demonstrates how to create a namespace using AAD token credentials
  obtained from signing in through your Azure account.

  Setup :
    Please ensure that your Azure Service Bus resource is in US East, US East 2, or West Europe
    region. AAD Role Based Access Control is not supported in other regions yet.

    Assign "owner" role to the registered application
     - In the azure-portal,
       go to your servicebus-namespace and assign "owner" role to your account.
     - This can be done from Access control (IAM) tab
       (in the left-side-navbar of your servicebus-namespace in the azure-portal)
*/

const { Namespace } = require("@azure/service-bus");
const { loginWithUsernamePassword } = require("ms-rest-azure");

// Define Service Bus Endpoint here and related entity names here
const serviceBusEndpoint = ""; // <your-servicebus-namespace>.servicebus.windows.net

const username = "";
const password = "";

async function main() {
  const tokenCreds = await loginWithUsernamePassword(username, password, {
    tokenAudience: "https://servicebus.azure.net/"
  });

  const ns = Namespace.createFromAadTokenCredentials(serviceBusEndpoint, tokenCreds);
  /*
   Refer to other samples, and place your code here
   to create queue clients, and to send/receive messages
  */
  await ns.close();
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
