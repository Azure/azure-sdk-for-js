// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecretsStoreExtensionManagementClient } from "@azure/arm-secretsstoreextension";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a SecretSync instance.
 *
 * @summary updates a SecretSync instance.
 * x-ms-original-file: 2026-09-25-preview/SecretSyncs_Update_MaximumSet_Gen.json
 */
async function secretSyncsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SecretsStoreExtensionManagementClient(credential, subscriptionId);
  const result = await client.secretSyncs.update("rg-ssc-example", "secretsync-ssc-example", {
    tags: { "example-tag": "example-tag-value" },
    properties: {
      secretProviderClassName:
        "jttlpenhtpxfrrlxdsmqqvmvtmgqrficvqngkggjwciilrexenlstxncyvkqcydxrivkioujssncoaiysdklfouukczzdbxniipbyiqsarqaespuqrbbydwtdaulllostoomntkadklihemfpeffvuyvyilequiqewzspaootvkibrynbqrsbiptjdhywynvydaadprdc",
      serviceAccountName:
        "fcldqfdfpktndlntuoxicsftelhefevovmlycflfwzckvamiqjnjugandqaqqeccsbzztfmmeunvhsafgerbcsdbnmsyqivygornebbkusuvphwghgouxvcbvmbydqjzoxextnyowsnyymadniwdrrxtogeveldpejixmsrzzfqkquaxdpzwvecevqwasxgxxchrfa",
      objectSecretMapping: [
        {
          sourcePath:
            "ssrzmbvdiomkvzrdsyilwlfzicfydnbjwjsnohrppkukjddrunfslkrnexunuckmghixdssposvndpiqchpqrkjuqbapoisvqdvgstvdonsmlpsmticfvuhqlofpaxfdg",
          targetKey:
            "lojegeqiqfjxyblfxhxloccqzwgpgcelrwqwsbsltcjvjvceejgdrmxhenokxrylhynkltvqntjcvujjrppzvcxyivxeksgmzhifrcklizbpntdepzdl",
        },
      ],
      forceSynchronization: "arbitrarystring",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await secretSyncsUpdate();
}

main().catch(console.error);
