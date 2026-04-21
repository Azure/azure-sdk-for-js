# Azure TextTranslation REST client library for JavaScript

Azure Translator is a cloud-based, multilingual, neural machine translation service. The Text Translation API enables robust and scalable translation capabilities suitable for diverse applications.

**Please rely heavily on our [REST client docs](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/rest-clients.md) to use this library**

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/translation/ai-translation-text-rest)
- [Package (NPM)](https://www.npmjs.com/package/@azure-rest/ai-translation-text)
- [API reference documentation](https://learn.microsoft.com/javascript/api/@azure-rest/ai-translation-text)

## Getting started

### Currently supported environments

- LTS versions of Node.js

### Prerequisites

- You must have an [Azure subscription](https://azure.microsoft.com/free/) to use this package.

### Install the `@azure-rest/ai-translation-text` package

Install the Azure TextTranslation REST client REST client library for JavaScript with `npm`:

```bash
npm install @azure-rest/ai-translation-text
```

### Create and authenticate a `TextTranslationClient`

To use an [Azure Active Directory (AAD) token credential](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-with-a-pre-fetched-access-token),
provide an instance of the desired credential type obtained from the
[@azure/identity](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials) library.

To authenticate with AAD, you must first `npm` install [`@azure/identity`](https://www.npmjs.com/package/@azure/identity) 

After setup, you can choose which type of [credential](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials) from `@azure/identity` to use.
As an example, [DefaultAzureCredential](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential)
can be used to authenticate the client.

### Create a `TextTranslationClient` using an API key and Region credential

Once you have the value for the API key and Region, create an `TranslatorCredential`.

With the value of the `TranslatorCredential` you can create the [TextTranslationClient][translator_client_class]:

```ts snippet:ReadmeSampleCreateClient_TranslatorCredential
import TextTranslationClient, { TranslatorCredential } from "@azure-rest/ai-translation-text";

const endpoint = "https://api.cognitive.microsofttranslator.com";
const key = "YOUR_SUBSCRIPTION_KEY";
const region = "westus";
const credential: TranslatorCredential = {
  key,
  region,
};
const translationClient = TextTranslationClient(endpoint, credential);
```

## Examples

The following section provides several code snippets using the `client` [created above](#create-a-texttranslationclient-using-an-api-key-and-region-credential), and covers the main features present in this client library.

### Get Supported Languages

Gets the set of languages currently supported by other operations of the Translator.

```ts snippet:ReadmeSampleGetSupportedLanguages
import TextTranslationClient, {
  TranslatorCredential,
  isUnexpected,
} from "@azure-rest/ai-translation-text";

const endpoint = "https://api.cognitive.microsofttranslator.com";
const key = "YOUR_SUBSCRIPTION_KEY";
const region = "westus";
const credential: TranslatorCredential = {
  key,
  region,
};
const translationClient = TextTranslationClient(endpoint, credential);

const langResponse = await translationClient.path("/languages").get();

if (isUnexpected(langResponse)) {
  throw langResponse.body.error;
}

const languages = langResponse.body;

if (languages.translation) {
  console.log("Translated languages:");
  for (const [key, translationLanguage] of Object.entries(languages.translation)) {
    console.log(`${key} -- name: ${translationLanguage.name} (${translationLanguage.nativeName})`);
  }
}

if (languages.transliteration) {
  console.log("Transliteration languages:");
  for (const [key, transliterationLanguage] of Object.entries(languages.transliteration)) {
    console.log(
      `${key} -- name: ${transliterationLanguage.name} (${transliterationLanguage.nativeName})`,
    );
  }
}

if (languages.models) {
  console.log("Available LLM Models:");
  for (const model in languages.models) {
    console.log(model);
  }
}
```

Please refer to the service documentation for a conceptual discussion of [languages][languages_doc].

### Translate

Renders single source-language text to multiple target-language texts with a single request.

```ts snippet:ReadmeSampleTranslate
import TextTranslationClient, {
  TranslatorCredential,
  isUnexpected,
} from "@azure-rest/ai-translation-text";

const endpoint = "https://api.cognitive.microsofttranslator.com";
const key = "YOUR_SUBSCRIPTION_KEY";
const region = "westus";
const credential: TranslatorCredential = {
  key,
  region,
};
const translationClient = TextTranslationClient(endpoint, credential);

const input = {
  text: "This is a test.",
  targets: [{ language: "cs" }],
  language: "en",
};
const translateResponse = await translationClient.path("/translate").post({
  body: { inputs: [input] },
});

if (isUnexpected(translateResponse)) {
  throw translateResponse.body.error;
}

const translations = translateResponse.body.value;
for (const translation of translations) {
  console.log(
    `Text was translated to: '${translation?.translations[0]?.language}' and the result is: '${translation?.translations[0]?.text}'.`,
  );
}
```

Please refer to the service documentation for a conceptual discussion of [translate][translate_doc].

### Transliterate

Converts characters or letters of a source language to the corresponding characters or letters of a target language.

```ts snippet:ReadmeSampleTransliterate
import TextTranslationClient, {
  TranslatorCredential,
  isUnexpected,
} from "@azure-rest/ai-translation-text";

const endpoint = "https://api.cognitive.microsofttranslator.com";
const key = "YOUR_SUBSCRIPTION_KEY";
const region = "westus";
const credential: TranslatorCredential = {
  key,
  region,
};
const translationClient = TextTranslationClient(endpoint, credential);

const inputText = [{ text: "这是个测试。" }];
const parameters = {
  language: "zh-Hans",
  fromScript: "Hans",
  toScript: "Latn",
};
const transliterateResponse = await translationClient.path("/transliterate").post({
  body: { inputs: inputText },
  queryParameters: parameters,
});

if (isUnexpected(transliterateResponse)) {
  throw transliterateResponse.body.error;
}

const transliterations = transliterateResponse.body.value;
for (const transliteration of transliterations) {
  console.log(
    `Input text was transliterated to '${transliteration?.script}' script. Transliterated text: '${transliteration?.text}'.`,
  );
}
```

Please refer to the service documentation for a conceptual discussion of [transliterate][transliterate_doc].



## Troubleshooting

When you interact with the Translator Service using the TextTranslator client library, errors returned by the Translator service correspond to the same HTTP status codes returned for REST API requests.

For example, if you submit a translation request without a target translate language, a `400` error is returned, indicating "Bad Request".

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts snippet:SetLogLevel
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

[translator_client_class]: https://learn.microsoft.com/javascript/api/@azure-rest/ai-translation-text/texttranslationclient
[languages_doc]: https://learn.microsoft.com/azure/ai-services/translator/text-translation/preview/get-languages
[translate_doc]: https://learn.microsoft.com/azure/ai-services/translator/text-translation/preview/translate-api
[transliterate_doc]: https://learn.microsoft.com/azure/ai-services/translator/text-translation/preview/transliterate-api
