# Azure TextTranslation REST client library for JavaScript

Text translation is a cloud-based REST API feature of the Translator service that uses neural
machine translation technology to enable quick and accurate source-to-target text translation
in real time across all supported languages.

The following methods are supported by the Text Translation feature:

Languages. Returns a list of languages supported by Translate, Transliterate, and Dictionary Lookup operations.

Translate. Renders single source-language text to multiple target-language texts with a single request.

Transliterate. Converts characters or letters of a source language to the corresponding characters or letters of a target language.

Detect. Returns the source code language code and a boolean variable denoting whether the detected language is supported for text translation and transliteration.

Dictionary lookup. Returns equivalent words for the source term in the target language.

Dictionary example Returns grammatical structure and context examples for the source term and target term pair.

**Please rely heavily on our [REST client docs](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/rest-clients.md) to use this library**

Key links:

- [Package (NPM)](https://www.npmjs.com/package/@azure-rest/ai-translation-text)
- [API reference documentation](https://learn.microsoft.com/azure/cognitive-services/translator/reference/v3-0-reference)
- [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/translation/ai-translation-text/samples)

## Getting started

### Currently supported environments

- LTS versions of Node.js

### Prerequisites

- An existing Translator service or Cognitive Services resource.
- Latest versions of Edge, Chrome, Safar and Firefox

### Install the `@azure-rest/ai-translation-text` package

Install the Azure Text Translation REST client library for JavaScript with `npm`:

```bash
npm install @azure-rest/ai-translation-text
```

#### Create a Translator service resource

You can create Translator resource following [Create a Translator resource][translator_resource_create].

### Browser support

#### JavaScript Bundle

To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

### Authenticate the client

Interaction with the service using the client library begins with creating an instance of the [TextTranslationClient][translator_client_class] class. You will need an **API key** or `TokenCredential` to instantiate a client object. For more information regarding authenticating with cognitive services, see [Authenticate requests to Translator Service][translator_auth].

#### Get an API key

You can get the `endpoint`, `API key` and `Region` from the Cognitive Services resource or Translator service resource information in the [Azure Portal][azure_portal].

Alternatively, use the [Azure CLI][azure_cli] snippet below to get the API key from the Translator service resource.

```PowerShell
az cognitiveservices account keys list --resource-group <your-resource-group-name> --name <your-resource-name>
```

### Create a `TextTranslationClient` using an API key and Region credential

Once you have the value for the API key and Region, create an `TranslatorCredential`.

With the value of the `TranslatorCredential` you can create the [TextTranslationClient][translator_client_class]:

```typescript
const translateCedential = new TranslatorCredential(apiKey, region);
const translationClient = TextTranslationFactory(endpoint, translateCedential);
```

## Examples

The following section provides several code snippets using the `client` [created above](#create-a-texttranslationclient-using-an-api-key-and-region-credential), and covers the main features present in this client library.

### Get Supported Languages

Gets the set of languages currently supported by other operations of the Translator.

```typescript
const langResponse = await translationClient.path("/languages").get();

if (langResponse.status !== "200") {
  const error = langResponse.body as ErrorResponseOutput;
  throw error.error;
}

const languages = langResponse.body as GetLanguagesResultOutput;

if (languages.translation) {
  console.log("Translated languages:");
  for (const key of languages.translation) {
    const translationLanguage = languages.translation[key];
    console.log(`${key} -- name: ${translationLanguage.name} (${translationLanguage.nativeName})`);
  }
}

if (languages.transliteration) {
  console.log("Transliteration languages:");
  for (const key in languages.transliteration) {
    const transliterationLanguage = languages.transliteration[key];
    console.log(
      `${key} -- name: ${transliterationLanguage.name} (${transliterationLanguage.nativeName})`
    );
  }
}

if (languages.dictionary) {
  console.log("Dictionary languages:");
  for (const key in languages.dictionary) {
    const dictionaryLanguage = languages.dictionary[key];
    console.log(
      `${key} -- name: ${dictionaryLanguage.name} (${dictionaryLanguage.nativeName}), supported target languages count: ${dictionaryLanguage.translations.length}`
    );
  }
}
```

Please refer to the service documentation for a conceptual discussion of [languages][languages_doc].

### Translate

Renders single source-language text to multiple target-language texts with a single request.

```typescript
const inputText: InputTextItem[] = [{ text: "This is a test." }];
const parameters: TranslateQueryParamProperties & Record<string, unknown> = {
  to: "cs",
  from: "en",
};
const translateResponse = await translationClient.path("/translate").post({
  body: inputText,
  queryParameters: parameters,
});

if (translateResponse.status !== "200") {
  const error = translateResponse.body as ErrorResponseOutput;
  throw error.error;
}

const translations = translateResponse.body as TranslatedTextItemOutput[];
for (const key in translations) {
  const translation = translations[key];
  console.log(
    `Text was translated to: '${translation?.translations[0]?.to}' and the result is: '${translation?.translations[0]?.text}'.`
  );
}
```

Please refer to the service documentation for a conceptual discussion of [translate][translate_doc].

### Transliterate

Converts characters or letters of a source language to the corresponding characters or letters of a target language.

```typescript
const inputText: InputTextItem[] = [{ text: "这是个测试。" }];
const parameters: TransliterateQueryParamProperties & Record<string, unknown> = {
  language: "zh-Hans",
  fromScript: "Hans",
  toScript: "Latn",
};
const transliterateResponse = await translationClient.path("/transliterate").post({
  body: inputText,
  queryParameters: parameters,
});

if (transliterateResponse.status !== "200") {
  const error = transliterateResponse.body as ErrorResponseOutput;
  throw error.error;
}

const translations = transliterateResponse.body as TransliteratedTextOutput[];
for (const key in translations) {
  const transliteration = translations[key];
  console.log(
    `Input text was transliterated to '${transliteration?.script}' script. Transliterated text: '${transliteration?.text}'.`
  );
}
```

Please refer to the service documentation for a conceptual discussion of [transliterate][transliterate_doc].

### Break Sentence

Identifies the positioning of sentence boundaries in a piece of text.

```typescript
const inputText: InputTextItem[] = [{ text: "zhè shì gè cè shì。" }];
const parameters: FindSentenceBoundariesQueryParamProperties & Record<string, unknown> = {
  language: "zh-Hans",
  script: "Latn",
};
const breakSentenceResponse = await translationClient.path("/breaksentence").post({
  body: inputText,
  queryParameters: parameters,
});

if (breakSentenceResponse.status !== "200") {
  const error = breakSentenceResponse.body as ErrorResponseOutput;
  throw error.error;
}

const breakSentences = breakSentenceResponse.body as BreakSentenceItemOutput[];
for (const key in breakSentences) {
  const breakSentence = breakSentences[key];
  console.log(`The detected sentece boundaries: '${breakSentence?.sentLen.join(", ")}'.`);
}
```

Please refer to the service documentation for a conceptual discussion of [break sentence][breaksentence_doc].

### Dictionary Lookup

Returns equivalent words for the source term in the target language.

```typescript
const inputText: InputTextItem[] = [{ text: "fly" }];
const parameters: LookupDictionaryEntriesQueryParamProperties & Record<string, unknown> = {
  to: "es",
  from: "en",
};
const dictionaryResponse = await translationClient.path("/dictionary/lookup").post({
  body: inputText,
  queryParameters: parameters,
});

if (dictionaryResponse.status !== "200") {
  const error = dictionaryResponse.body as ErrorResponseOutput;
  throw error.error;
}

const dictionaryEntries = dictionaryResponse.body as DictionaryLookupItemOutput[];
for (const key in dictionaryEntries) {
  const dictionaryEntry = dictionaryEntries[key];
  console.log(
    `For the given input ${dictionaryEntry?.translations?.length} entries were found in the dictionary.`
  );
  console.log(
    `First entry: '${dictionaryEntry?.translations[0]?.displayTarget}', confidence: ${dictionaryEntry?.translations[0]?.confidence}.`
  );
}
```

Please refer to the service documentation for a conceptual discussion of [dictionary lookup][dictionarylookup_doc].

### Dictionary Examples

Returns grammatical structure and context examples for the source term and target term pair.

```typescript
const inputText: DictionaryExampleTextItem[] = [{ text: "fly", translation: "volar" }];
const parameters: LookupDictionaryExamplesQueryParamProperties & Record<string, unknown> = {
  to: "es",
  from: "en",
};
const dictionaryResponse = await translationClient.path("/dictionary/examples").post({
  body: inputText,
  queryParameters: parameters,
});

if (dictionaryResponse.status !== "200") {
  const error = dictionaryResponse.body as ErrorResponseOutput;
  throw error.error;
}

const dictionaryExamples = dictionaryResponse.body as DictionaryExampleItemOutput[];
for (const key in dictionaryExamples) {
  const dictionaryExample = dictionaryExamples[key];
  console.log(
    `For the given input ${dictionaryExample?.examples?.length} examples were found in the dictionary.`
  );
  const firstExample = dictionaryExample?.examples[0];
  console.log(
    `Example: '${firstExample.targetPrefix + firstExample.targetTerm + firstExample.targetSuffix}'.`
  );
}
```

Please refer to the service documentation for a conceptual discussion of [dictionary examples][dictionaryexamples_doc].

## Troubleshooting

When you interact with the Translator Service using the TextTranslator client library, errors returned by the Translator service correspond to the same HTTP status codes returned for REST API requests.

For example, if you submit a translation request without a target translate language, a `400` error is returned, indicating "Bad Request".

You can find the different error codes returned by the service in the [Service Documentation][service_errors].

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
const { setLogLevel } = require("@azure/logger");

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_portal]: https://portal.azure.com
[translator_resource_create]: https://learn.microsoft.com/azure/cognitive-services/Translator/create-translator-resource
[translator_auth]: https://learn.microsoft.com/azure/cognitive-services/translator/reference/v3-0-reference#authentication
[service_errors]: https://learn.microsoft.com/azure/cognitive-services/translator/reference/v3-0-reference#errors
[translator_client_class]: https://github.com/azure/azure-sdk-for-js/blob/main/sdk/translation/ai-translation-text/src/generated/clientDefinitions.ts
[languages_doc]: https://learn.microsoft.com/azure/cognitive-services/translator/reference/v3-0-languages
[translate_doc]: https://learn.microsoft.com/azure/cognitive-services/translator/reference/v3-0-translate
[transliterate_doc]: https://learn.microsoft.com/azure/cognitive-services/translator/reference/v3-0-transliterate
[breaksentence_doc]: https://learn.microsoft.com/azure/cognitive-services/translator/reference/v3-0-break-sentence
[dictionarylookup_doc]: https://learn.microsoft.com/azure/cognitive-services/translator/reference/v3-0-dictionary-lookup
[dictionaryexamples_doc]: https://learn.microsoft.com/azure/cognitive-services/translator/reference/v3-0-dictionary-examples
