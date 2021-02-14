## An isomorphic javascript sdk for - QnAMakerRuntimeClient

This package contains an isomorphic SDK for interacting with the QnA Maker service such as training and asking questions.
For editing and creating Knowledge Bases see @azure/cognitiveservices-qnamaker.

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

```javascript
const { QnAMakerRuntimeClient } = require("@azure/cognitiveservices-qnamaker-runtime");
const { CognitiveServicesCredentials } = require("@azure/ms-rest-azure-js");

async function main() {
  const QNAMAKER_KEY = process.env["QNAMAKER_KEY"] || "<QNAMAKER_KEY>";
  const QNAMAKER_ENDPOINT = process.env["QNAMAKER_ENDPOINT"] || "<QNAMAKER_ENDPOINT>";
  const kbid = process.env["QNAMAKER_KNOWLEDGE_BASE_ID"] || "<QNAMAKER_KNOWLEDGE_BASE_ID>";

  const cognitiveServicesCredentials = new CognitiveServicesCredentials(QNAMAKER_KEY);
  const client = new QnAMakerRuntimeClient(cognitiveServicesCredentials, QNAMAKER_ENDPOINT);
  const customHeaders = { Authorization: `EndpointKey ${QNAMAKER_KEY}` };

  // A question you'd like to get a response for, from the knowledge base. For example
  const question = "How are you?";

  // Maximum number of answer to retreive
  const top = 1;

  // Find only answers that contain these metadata
  const strictFilters = [{ name: "editorial", value: "chitchat" }];

  const result = await client.runtime.generateAnswer(
    kbid,
    { question, top, strictFilters },
    { customHeaders }
  );
  console.log(JSON.stringify(result));
  // Sample Result
  // {
  //   answers: [
  //     {
  //       questions: [
  //         "How are you?",
  //         "How is your tuesday?"
  //       ],
  //       answer:
  //         ""I'm doing great, thanks for asking!",
  //       score: 100,
  //       id: 90,
  //       source:
  //         "qna_chitchat_Friendly.tsv",
  //       metadata: [{ name: "editorial", value: "chitchat" }],
  //       context: { isContextOnly: false, prompts: [] }
  //     }
  //   ],
  //   debugInfo: null,
  //   activeLearningEnabled: false
  // }
}

main();
```

#### browser - Authentication, client creation and generateAnswer runtime  as an example written in JavaScript.

##### Sample code

- index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>@azure/cognitiveservices-qnamaker-runtime sample</title>
    <script src="node_modules/@azure/ms-rest-js/dist/msRest.browser.js"></script>
    <script src="node_modules/@azure/cognitiveservices-qnamaker-runtime/dist/cognitiveservices-qnamaker-runtime.js"></script>
    <script type="text/javascript">
      const QNAMAKER_KEY = "<QNAMAKER_KEY>";
      const QNAMAKER_ENDPOINT = "<QNAMAKER_ENDPOINT>";
      const kbid = "<QNAMAKER_KNOWLEDGE_BASE_ID>";

      const cognitiveServiceCredentials = new msRest.ApiKeyCredentials({
        inHeader: {
          "Ocp-Apim-Subscription-Key": QNAMAKER_KEY
        }
      });

      const client = new Azure.CognitiveservicesQnamakerRuntime.QnAMakerRuntimeClient(
        cognitiveServiceCredentials,
        QNAMAKER_ENDPOINT
      );
      const customHeaders = { Authorization: `EndpointKey ${QNAMAKER_KEY}` };

      // A question you'd like to get a response for, from the knowledge base. For example
      const question = "How are you?";

      // Maximum number of answer to retreive
      const topValue = 1;

      // Find only answers that contain these metadata
      const strictFilters = [{
        name: "editorial",
        value: "chitchat"
      }];

      client.runtime
        .generateAnswer(kbid, {question, topValue, strictFilters}, {customHeaders})
        .then(result => {
          console.log(JSON.stringify(result));
          // Sample Result
          // {
          //   answers: [
          //     {
          //       questions: [
          //         "How are you?",
          //         "How is your tuesday?"
          //       ],
          //       answer:
          //         ""I'm doing great, thanks for asking!",
          //       score: 100,
          //       id: 90,
          //       source:
          //         "qna_chitchat_Friendly.tsv",
          //       metadata: [{ name: "editorial", value: "chitchat" }],
          //       context: { isContextOnly: false, prompts: [] }
          //     }
          //   ],
          //   debugInfo: null,
          //   activeLearningEnabled: false
          // }
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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/README.png)
