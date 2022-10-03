import { SecretClient } from "@azure/keyvault-secrets";
import { DefaultAzureCredential } from "@azure/identity";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const credential = new DefaultAzureCredential();

    const vaultUri = process.env.KEYVAULT_URI;

    if (!vaultUri) {
      throw new Error("Missing KEYVAULT_URI environment variable.");
    }
    const client = new SecretClient(vaultUri, credential);

    await client.setSecret("secret-name-system", "secret-value-system");
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: "Successfully authenticated with keyvault",
    };
  } catch (error: any) {
    context.res = {
      status: 500,
      body: error.message,
    };
  }
};

export default httpTrigger;
