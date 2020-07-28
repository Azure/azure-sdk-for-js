## An isomorphic javascript sdk for - AutoSuggestClient

This package contains an isomorphic SDK for AutoSuggestClient.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```bash
npm install @azure/cognitiveservices-autosuggest
```

### How to use

#### nodejs - Authentication, client creation and autoSuggest as an example written in TypeScript.

##### Install @azure/ms-rest-azure-js

```bash
npm install @azure/ms-rest-azure-js
```

##### Sample code
The following sample gets suggestions from Bing for the given query **Microsoft Azure**. To know more, refer to the [Azure Documentation on Bing Auto Suggest](https://docs.microsoft.com/en-us/azure/cognitive-services/bing-autosuggest/)

```javascript
const { AutoSuggestClient } = require("@azure/cognitiveservices-autosuggest");
const { CognitiveServicesCredentials } = require("@azure/ms-rest-azure-js");

async function main() {
  const autoSuggestKey = process.env["autoSuggestKey"] || "<autoSuggestKey>";
  const cognitiveServiceCredentials = new CognitiveServicesCredentials(autoSuggestKey);
  const client = new AutoSuggestClient(cognitiveServiceCredentials);

  const query = "Microsoft Azure";
  const options = {
    acceptLanguage: "en-US",
    pragma: "no-cache",
    clientId: "testclientId",
    location: "westus2",
    countryCode: "en-US"
  };

  client
    .autoSuggest(query, options)
    .then((result) => {
      console.log("The result is:");
      result.suggestionGroups.forEach((suggestionGroup) => {
        suggestionGroup.searchSuggestions.forEach((searchSuggestion) => {
          console.log(`URL: ${searchSuggestion.url}`);
          console.log(`Display Text: ${searchSuggestion.displayText}`);
        });
      });
    })
    .catch((err) => {
      console.log("An error occurred:");
      console.error(err);
    });
}

main();
```

#### browser - Authentication, client creation and autoSuggest as an example written in JavaScript.

##### Sample code

See https://github.com/Azure/ms-rest-browserauth to learn how to authenticate to Azure in the browser.

- index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/cognitiveservices-autosuggest sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/cognitiveservices-autosuggest/dist/cognitiveservices-autosuggest.js"></script>
    <script type="text/javascript">
      const autoSuggestKey = "<YOUR_AUTO_SUGGEST_KEY>";
      const cognitiveServiceCredentials = new msRest.ApiKeyCredentials({
        inHeader: {
          "Ocp-Apim-Subscription-Key": autoSuggestKey
        }
      });
      const client = new Azure.CognitiveservicesAutosuggest.AutoSuggestClient(
        cognitiveServiceCredentials
      );

      const query = "Microsoft Azure";
      const options = {
        acceptLanguage: "en-US",
        pragma: "no-cache",
        clientId: "testclientId",
        location: "westus2",
        countryCode: "en-US"
      };

      client
        .autoSuggest(query, options)
        .then((result) => {
          console.log("The result is:");
          result.suggestionGroups.forEach((suggestionGroup) => {
            suggestionGroup.searchSuggestions.forEach((searchSuggestion) => {
              console.log(`URL: ${searchSuggestion.url}`);
              console.log(`Display Text: ${searchSuggestion.displayText}`);
            });
          });
        })
        .catch((err) => {
          console.log("An error occurred:");
          console.error(err);
        });
    </script>
  </head>
  <body></body>
</html>
```

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcognitiveservices%2Fcognitiveservices-autosuggest%2FREADME.png)
