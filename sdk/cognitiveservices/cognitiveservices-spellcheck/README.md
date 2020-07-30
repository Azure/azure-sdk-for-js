## An isomorphic javascript sdk for - SpellCheckClient

This package contains an isomorphic SDK for SpellCheckClient.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```bash
npm install @azure/cognitiveservices-spellcheck
```

### How to use

#### nodejs - Authentication, client creation and spellChecker  as an example written in TypeScript.

##### Install @azure/ms-rest-azure-js

```bash
npm install @azure/ms-rest-azure-js
```

##### Sample code
The following sample performs a spell check on the text - 'Bill Gatos'. The result will return a suggestion of 'Gates'. To know more, refer to the [Azure Documentation on Spell Check](https://docs.microsoft.com/en-us/azure/cognitive-services/bing-spell-check/)

```javascript
const { SpellCheckClient } = require("@azure/cognitiveservices-spellcheck");
const { CognitiveServicesCredentials } = require("@azure/ms-rest-azure-js");

async function main() {
  const spellCheckKey = process.env["spellCheckKey"] || "<spellCheckKey>";
  const spellCheckEndPoint =
    process.env["spellCheckEndPoint"] || "<spellCheckEndPoint>";
  const cognitiveServiceCredentials = new CognitiveServicesCredentials(
    spellCheckKey
  );
  const client = new SpellCheckClient(cognitiveServiceCredentials, {
    endpoint: spellCheckEndPoint
  });

  const options = {
    mode: "proof",
    pragma: "no-cache"
  };

  client
    .spellChecker("Bill Gatos", options)
    .then(result => {
      console.log("The result is: ");
      result.flaggedTokens.forEach(flaggedToken => {
        flaggedToken.suggestions.forEach(suggestion => {
          console.log(suggestion);
        });
      });
    })
    .catch(err => {
      console.log("An error occurred:");
      console.error(err);
    });
}

main();
```

#### browser - Authentication, client creation and spellChecker  as an example written in JavaScript.

##### Sample code

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/cognitiveservices-spellcheck sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/cognitiveservices-spellcheck/dist/cognitiveservices-spellcheck.js"></script>
    <script type="text/javascript">
      const spellcheckKey = "<YOUR_SPELL_CHECK_KEY>";
      const spellcheckEndPoint = "<YOUR_SPELL_CHECK_ENDPOINT>";
      const cognitiveServiceCredentials = new msRest.ApiKeyCredentials({
        inHeader: {
          "Ocp-Apim-Subscription-Key": spellcheckKey
        }
      });
      const client = new Azure.CognitiveservicesSpellcheck.SpellCheckClient(
        cognitiveServiceCredentials,
        {
          endpoint: spellcheckEndPoint
        }
      );

      const options = {
        mode: "proof",
        pragma: "no-cache"
      };

      client
        .spellChecker("Bill Gatos", options)
        .then(result => {
          console.log("The result is: ");
          result.flaggedTokens.forEach(flaggedToken => {
            flaggedToken.suggestions.forEach(suggestion => {
              console.log(suggestion);
            });
          });
        })
        .catch(err => {
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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcognitiveservices%2Fcognitiveservices-spellcheck%2FREADME.png)
