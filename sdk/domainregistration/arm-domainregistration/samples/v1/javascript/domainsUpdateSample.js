// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DomainRegistrationManagementClient } = require("@azure/arm-domainregistration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Creates or updates a domain.
 *
 * @summary description for Creates or updates a domain.
 * x-ms-original-file: 2024-11-01/UpdateAppServiceDomain.json
 */
async function updateAppServiceDomain() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new DomainRegistrationManagementClient(credential, subscriptionId);
  const result = await client.domains.update("testrg123", "example.com", {
    authCode: "exampleAuthCode",
    autoRenew: true,
    consent: {
      agreedAt: new Date("2021-09-10T19:30:53Z"),
      agreedBy: "192.0.2.1",
      agreementKeys: ["agreementKey1"],
    },
    contactAdmin: {
      addressMailing: {
        address1: "3400 State St",
        city: "Chicago",
        country: "United States",
        postalCode: "67098",
        state: "IL",
      },
      email: "admin@email.com",
      fax: "1-245-534-2242",
      jobTitle: "Admin",
      nameFirst: "John",
      nameLast: "Doe",
      nameMiddle: "",
      organization: "Microsoft Inc.",
      phone: "1-245-534-2242",
    },
    contactBilling: {
      addressMailing: {
        address1: "3400 State St",
        city: "Chicago",
        country: "United States",
        postalCode: "67098",
        state: "IL",
      },
      email: "billing@email.com",
      fax: "1-245-534-2242",
      jobTitle: "Billing",
      nameFirst: "John",
      nameLast: "Doe",
      nameMiddle: "",
      organization: "Microsoft Inc.",
      phone: "1-245-534-2242",
    },
    contactRegistrant: {
      addressMailing: {
        address1: "3400 State St",
        city: "Chicago",
        country: "United States",
        postalCode: "67098",
        state: "IL",
      },
      email: "registrant@email.com",
      fax: "1-245-534-2242",
      jobTitle: "Registrant",
      nameFirst: "John",
      nameLast: "Doe",
      nameMiddle: "",
      organization: "Microsoft Inc.",
      phone: "1-245-534-2242",
    },
    contactTech: {
      addressMailing: {
        address1: "3400 State St",
        city: "Chicago",
        country: "United States",
        postalCode: "67098",
        state: "IL",
      },
      email: "tech@email.com",
      fax: "1-245-534-2242",
      jobTitle: "Tech",
      nameFirst: "John",
      nameLast: "Doe",
      nameMiddle: "",
      organization: "Microsoft Inc.",
      phone: "1-245-534-2242",
    },
    dnsType: "DefaultDomainRegistrarDns",
    privacy: false,
  });
  console.log(result);
}

async function main() {
  await updateAppServiceDomain();
}

main().catch(console.error);
