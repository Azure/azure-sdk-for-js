# Azure Communication Short Codes client library for JavaScript

The phone numbers library provides capabilities for short codes administration.

## Getting started

### Prerequisites

- An [Azure subscription][azure_sub].
- An existing Communication Services resource. If you need to create the resource, you can use the [Azure Portal][azure_portal], the [Azure PowerShell][azure_powershell], or the [Azure CLI][azure_cli].

### Installing

```bash
npm install @azure-tools/communication-short-codes
```

### Browser support

#### JavaScript Bundle

To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

## Key concepts

The short codes package exposes the `ShortCodesClient` which provides methods to manage short codes.

### Short Code types

Short Codes come in two types; shortCode and alphaId. ShortCode = 5 digit number | alphaId = alphanumeric 5 digit combination.

### Short Codes

Short codes are a type of number that are available to enterprise customers. They come in the form of a 5 or 6 digit number and can be used to send sms similar to how a toll-free or geographic number is used. In order to acquire a short code it is necessary to submit an application, or program brief.

### Program Briefs

A program brief tracks the application for a short code and contains all the information necessary to process the application as well as information on the status of the application and any updates that may be needed. It can take 8-12 weeks for a program brief to be approved and a short code to be issued once the program brief is submitted.

## Examples

## Authentication

To create a client object to access the Communication Services API, you will need a `connection string` or the `endpoint` of your Communication Services resource and a `credential`. The Phone Numbers client can use either Azure Active Directory credentials or an API key credential to authenticate.

You can get a key and/or connection string from your Communication Services resource in the [Azure Portal][azure_portal]. You can also find the endpoint for your Communication Services resource in the [Azure Portal][azure_portal].

Once you have a key, you can authenticate the `ShortCodesClient` with any of the following methods:

### Using a connection string

```ts snippet:ReadmeSampleCreateClient_ConnectionString
import { ShortCodesClient } from "@azure-tools/communication-short-codes";

const connectionString = "endpoint=<endpoint>;accessKey=<accessKey>";
const client = new ShortCodesClient(connectionString);
```

### Using an access key with `AzureKeyCredential`

If you use a key to initialize the client you will also need to provide the appropriate endpoint. You can get this endpoint from your Communication Services resource in [Azure Portal][azure_portal]. Once you have a key and endpoint, you can authenticate with the following code:

```ts snippet:ReadmeSampleCreateClient_KeyCredential
import { AzureKeyCredential } from "@azure/core-auth";
import { ShortCodesClient } from "@azure-tools/communication-short-codes";

const credential = new AzureKeyCredential("<key-from-resource>");
const client = new ShortCodesClient("<endpoint-from-resource>", credential);
```

### Using an Azure Active Directory Credential

Connection string authentication is used in most of the examples, but you can also authenticate with Azure Active Directory using the [Azure Identity library][azure_identity]. To use the [DefaultAzureCredential][defaultazurecredential] provider shown below, or other credential providers provided with the Azure SDK, please install the [`@azure/identity`][azure_identity] package:

```bash
npm install @azure/identity
```

The [`@azure/identity`][azure_identity] package provides a variety of credential types that your application can use to do this. The [README for `@azure/identity`][azure_identity_readme] provides more details and samples to get you started.

```ts snippet:ReadmeSampleCreateClient_TokenCredential
import { DefaultAzureCredential } from "@azure/identity";
import { ShortCodesClient } from "@azure-tools/communication-short-codes";

const credential = new DefaultAzureCredential();
const client = new ShortCodesClient("<endpoint-from-resource>", credential);
```

## Usage

The following sections provide code snippets that cover some of the common tasks using the Azure Communication Services Phone Numbers client. The scenarios that are covered here consist of:

- [Create and submit a program brief](#create-and-submit-program-brief)
- [Get and delete program briefs](#get-and-delete-program-briefs)
- [Get and update program brief](#get-and-update-program-brief)
- [Get short codes](#get-short-codes)

### Create and submit a program brief

Initialize a `ShortCodesCreateUSProgramBriefParams` object and populate it with the details for your program brief. Then add a call to `upsertUSProgramBrief` and use the object you created as the parameter. This will create a program brief object which can then be modified as much as needed until it's ready to be submitted. When ready to submit, call `submitUSProgramBrief` to submit for processing. After submission no edits will be allowed unless requested as part of the application process.

```ts snippet:ReadmeSampleCreateProgramBrief
import { DefaultAzureCredential } from "@azure/identity";
import {
  ShortCodesClient,
  ShortCodesUpsertUSProgramBriefOptionalParams,
} from "@azure-tools/communication-short-codes";

const credential = new DefaultAzureCredential();
const client = new ShortCodesClient("<endpoint-from-resource>", credential);

// create a new program brief request
const programBriefId = "1b4411b7-edb0-44e7-9eca-dc7208b8d88c";
const programBriefRequest: ShortCodesUpsertUSProgramBriefOptionalParams = {
  body: {
    id: programBriefId,
    programDetails: {
      description:
        "Customers can sign up to receive regular updates on coupons and other perks of our loyalty program.",
      expectedDateOfService: new Date(2022, 1, 25),
      isPoliticalCampaign: false,
      isVanity: false,
      name: "Contoso Loyalty Program",
      numberType: "shortCode",
      privacyPolicyUrl: "https://contoso.com/privacy",
      callToActionTypes: ["sms", "website"],
      termsOfServiceUrl: "https://contoso.com/terms",
      url: "https://contoso.com/loyalty-program",
      callToActionUrl: "https://contoso.com/sign-up",
    },
    companyInformation: {
      address: "1 Contoso Way Redmond, WA 98052",
      name: "Contoso",
      url: "https://contoso.com",
      contactInformation: {
        email: "alex@contoso.com",
        name: "Alex",
        phone: "+14255551234",
      },
      customerCareInformation: {
        email: "customercare@contoso.com",
        tollFreeNumber: "+18005551234",
      },
    },
    messageDetails: {
      supportedProtocol: "sms",
      recurrence: "subscription",
      useCases: [
        {
          contentType: "marketingAndPromotion",
          examples: [{ messages: [{ direction: "fromUser", text: "txtMessage" }] }],
        },
        {
          contentType: "loyaltyProgram",
          examples: [{ messages: [{ direction: "toUser", text: "txtMessage" }] }],
        },
        {
          contentType: "sweepstakesOrContest",
          examples: [{ messages: [{ direction: "toUser", text: "txtMessage" }] }],
        },
      ],
      optInMessageToUser:
        "Someone requested to subscribe this number to receive updates about Contoso's loyalty program.  To confirm subscription, reply to this message with 'JOIN'",
      optInAnswerFromUser: "JOIN",
      optInConfirmationMessageToUser:
        "Congrats, you have been successfully subscribed to loyalty program updates.  Welcome!",
      optOutAnswerToUser: "Reply STOP to unsubscribe.",
      helpAnswerToUser: "Reply HELP for help. Msg&Data rates may apply.",
      directionality: "twoWay",
    },
    trafficDetails: {
      totalMonthlyVolume: 10000,
      monthlyAverageMessagesFromUser: 1,
      monthlyAverageMessagesToUser: 3,
      estimatedRampUpTimeInDays: 50,
      isSpiky: true,
      spikeDetails:
        "Higher traffic expected around major shopping holidays, most notably Black Friday and Memorial Day.",
    },
  },
};

// create program brief
const createResponse = await client.upsertUSProgramBrief(programBriefId, programBriefRequest);

// submit program brief
const submittedProgramBrief = await client.submitUSProgramBrief(programBriefId);
```

### Get and delete program briefs

Use the `listUSProgramBriefs` method to page through all program briefs for an ACS resource. Use `deleteUSProgramBrief` to delete unwanted program briefs. Keep in mind that once a program brief is submitted it is not eligible for deletion.

```ts snippet:ReadmeSampleGetAndDeleteProgramBriefs
import { DefaultAzureCredential } from "@azure/identity";
import { ShortCodesClient } from "@azure-tools/communication-short-codes";

const credential = new DefaultAzureCredential();
const client = new ShortCodesClient("<endpoint-from-resource>", credential);

// get all program briefs for a resource
const programBriefs = client.listUSProgramBriefs();

// find draft program briefs, and delete them
for await (const programBrief of programBriefs) {
  console.log(`Program Brief with Id ${programBrief.id} has status ${programBrief.status}`);

  // identify drafts
  if (programBrief.status === "draft") {
    const unsubmittedProgramBriefId = programBrief.id;

    // delete draft program brief
    const deleteResponse = await client.deleteUSProgramBrief(unsubmittedProgramBriefId);
  }
}
```

### Get and update program brief

Use the `getUSProgramBrief` to retrieve a single program brief by its Id. Use the `upsertUSProgramBrief` to update a program brief. `upsertUSProgramBrief` accepts a `ShortCodesUpsertUSProgramBriefOptionalParams` object, in which only the fields that are changing need to be set.

```ts snippet:ReadmeSampleGetAndUpdateProgramBrief
import { DefaultAzureCredential } from "@azure/identity";
import {
  ShortCodesClient,
  ShortCodesUpsertUSProgramBriefOptionalParams,
} from "@azure-tools/communication-short-codes";

const credential = new DefaultAzureCredential();
const client = new ShortCodesClient("<endpoint-from-resource>", credential);

// get a program briefs for a resource
const programBriefId = "1b4411b7-edb0-44e7-9eca-dc7208b8d88c";
const programBrief = await client.getUSProgramBrief(programBriefId);
console.log(
  `Program brief with Id ${programBrief.id} has status ${programBrief.status} which was last updated ${programBrief.statusUpdatedDate}`,
);

// update the program brief
const updateRequest: ShortCodesUpsertUSProgramBriefOptionalParams = {
  body: {
    id: programBriefId,
    programDetails: {
      privacyPolicyUrl: "https://contoso.com/updated-privacy",
      termsOfServiceUrl: "https://contoso.com/updated-terms-of-service",
    },
  },
};
const upsertResponse = await client.upsertUSProgramBrief(programBriefId, updateRequest);
```

### Get short codes

Use `listShortCodes` to page through all short codes owned by a resource.

```ts snippet:ReadmeSampleGetShortCodes
import { DefaultAzureCredential } from "@azure/identity";
import { ShortCodesClient } from "@azure-tools/communication-short-codes";

const credential = new DefaultAzureCredential();
const client = new ShortCodesClient("<endpoint-from-resource>", credential);

// get all short codes for a resource
const shortCodes = client.listShortCodes();

// print all short codes
for await (const shortCode of shortCodes) {
  console.log(`${shortCode}`);
}
```

### Get short code costs

Use `listShortCodeCosts` to page through all short code costs eligible by a resource.

```ts snippet:ReadmeSampleGetShortCodeCosts
import { DefaultAzureCredential } from "@azure/identity";
import { ShortCodesClient } from "@azure-tools/communication-short-codes";

const credential = new DefaultAzureCredential();
const client = new ShortCodesClient("<endpoint-from-resource>", credential);

// get all eligible short code costs for a resource
const shortCodeCosts = client.listShortCodeCosts();

// print all short code costs
for await (const shortCodeCost of shortCodeCosts) {
  console.log(`${shortCodeCost}`);
}
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts snippet:SetLogLevel
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Next steps

Please take a look at the
[samples](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-short-codes/samples)
directory for detailed examples on how to use this library.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

[azure_cli]: https://learn.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_powershell]: https://learn.microsoft.com/powershell/module/az.communication/new-azcommunicationservice
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity
[azure_identity_readme]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/README.md
