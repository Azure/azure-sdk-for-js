## An isomorphic javascript sdk for - TranslatorTextClient

This package contains an isomorphic SDK for TranslatorTextClient.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```bash
npm install @azure/cognitiveservices-translatortext
```

### How to use

#### nodejs - Authentication, client creation and languages translator as an example written in TypeScript.

##### Install @azure/ms-rest-azure-js

```bash
npm install @azure/ms-rest-azure-js
```

##### Sample code
The following sample translates the given text which is in Chinese to English. To know more, refer to the [Azure Documentation on Translator](https://docs.microsoft.com/en-us/azure/cognitive-services/translator/)

```javascript
const { TranslatorTextClient } = require("@azure/cognitiveservices-translatortext");
const { CognitiveServicesCredentials } = require("@azure/ms-rest-azure-js");

async function main() {
  const translatorTextKey =
    process.env["translatorTextKey"] || "<translatorTextKey>";
  const translatorTextEndPoint =
    process.env["translatorTextEndPoint"] || "<translatorTextEndPoint>";
  const cognitiveServiceCredentials = new CognitiveServicesCredentials(
    translatorTextKey
  );
  const client = new TranslatorTextClient(
    cognitiveServiceCredentials,
    translatorTextEndPoint
  );

  const text = [
    {
      text: "你好，世界"
    }
  ];

  client.translator
    .detect(text)
    .then(result => {
      console.log("The result is: ");
      console.log(result);
    })
    .catch(err => {
      console.log("An error occurred:");
      console.error(err);
    });
}

main();
```

#### browser - Authentication, client creation and languages translator as an example written in JavaScript.

##### Sample code

- index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/cognitiveservices-translatortext sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/cognitiveservices-translatortext/dist/cognitiveservices-translatortext.js"></script>
    <script type="text/javascript">
      const translatorTextKey = "<YOUR_TRANSLATOR_TEXT_KEY>";
      const translatorTextEndPoint = "<YOUR_TRANSLATOR_TEXT_ENDPOINT>";

      const cognitiveServiceCredentials = new msRest.ApiKeyCredentials({
        inHeader: {
          "Ocp-Apim-Subscription-Key": translatorTextKey
        }
      });
      const client = new Azure.CognitiveservicesTranslatortext.TranslatorTextClient(
        cognitiveServiceCredentials,
        translatorTextEndPoint
      );

      const text = [
        {
          text: "你好，世界"
        }
      ];

      client.translator
        .detect(text)
        .then(result => {
          console.log("The result is: ");
          console.log(result);
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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcognitiveservices%2Fcognitiveservices-translatortext%2FREADME.png)
