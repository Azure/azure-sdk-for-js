## An isomorphic javascript sdk for - QnAMakerRuntimeClient

This package contains an isomorphic SDK for QnAMakerRuntimeClient.

### Notes

- This library contains operations for interacting with QnAMaker such as training and asking questions.

- For editing and createing Knowledge Bases see @azure/cognitiveservices-qnamaker.

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### How to Install

```bash
npm install @azure/cognitiveservices-qnamaker-runtime
```

### How to use

#### nodejs - Authentication, client creation and generateAnswer runtime as an example written in TypeScript.

##### Install @azure/ms-rest-azure-js

```bash
npm install @azure/ms-rest-azure-js
```

##### Sample code

```typescript
import { CognitiveServicesCredentials } from "@azure/ms-rest-azure-js";
import { QnAMakerClient } from "@azure/cognitiveservices-qnamaker";

async function main() {
  const QNAMAKER_KEY = process.env["QNAMAKER_KEY"] || "<QNAMAKER_KEY>";
  const QNAMAKER_ENDPOINT = process.env["QNAMAKER_ENDPOINT"] || "<QNAMAKER_ENDPOINT>";
  const kbid = "<QNAMAKER_KNOWLEDGE_BASE_ID>";

  const cognitiveServicesCredentials = new CognitiveServicesCredentials(QNAMAKER_KEY);
  const client = new QnAMakerRuntimeClient(cognitiveServicesCredentials, QNMAKER_ENDPOINT);
  const customHeaders = { Authorization: `EndpointKey ${QNAMAKER_KEY}` };
  const question = "<QUESTION>";

  try {
    const settings = await client.runtime.generateAnswer(kbid, { question }, { customHeaders });
    console.log(`The result is: ${JSON.stringify(settings)}`);
  } catch (error) {
    console.error(error);
  }
}

main();
```

#### browser - Authentication, client creation and generateAnswer runtime as an example written in JavaScript.

##### Install @azure/ms-rest-browserauth

```bash
npm install @azure/ms-rest-browserauth
```

##### Sample code

See https://github.com/Azure/ms-rest-browserauth to learn how to authenticate to Azure in the browser.

- index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/cognitiveservices-qnamaker-runtime sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/cognitiveservices-qnamaker-runtime/dist/cognitiveservices-qnamaker-runtime.js"></script>
    <script type="text/javascript">
      async function main() {
        const QNAMAKER_KEY = "<QNAMAKER_KEY>";
        const QNAMAKER_ENDPOINT = "<QNAMAKER_ENDPOINT>";
        const cognitiveServiceCredentials = new msRest.ApiKeyCredentials({
          inHeader: {
            Authorization: `EndpointKey ${QNAMAKER_KEY}`
          }
        });

        const client = new Azure.CognitiveservicesQnamakerRuntime.QnAMakerRuntimeClient(
          cognitiveServiceCredentials,
          QNAMAKER_ENDPOINT
        );
        const question = "<QUESTION>";
        const kbid = "<KNOWLEDGE_BASE_ID>";

        try {
          const settings = await client.runtime.generateAnswer(kbid, { question });
          console.log(`The result is: ${JSON.stringify(settings)}`);
        } catch (error) {
          console.error(error);
        }
      }

      main();
    </script>
  </head>
  <body></body>
</html>
```

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/README.png)
