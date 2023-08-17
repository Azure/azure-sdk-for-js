# Troubleshoot Azure AI Document Intelligence client library issues

This troubleshooting guide contains information to help diagnose frequently encountered issues while using the Azure AI Document Intelligence client library for JavaScript.

## Table of Contents

- [Troubleshooting Errors](#troubleshooting-errors)
  - [Handling RestError](#handling-resterror)
  - [Build model error](#build-model-error)
    - [Invalid training dataset](#invalid-training-data-set)
    - [Invalid SAS URL](#invalid-sas-url)
  - [Generic Error](#generic-error)
- [Unexpected time to build a custom model](#unexpected-time-to-build-a-custom-model)
- [Form Recognizer errors](#form-recognizer-errors)
- [Logging](#logging)

## Troubleshooting Errors

### Handling RestError

Document Intelligence service methods throw [`RestError`] on failure.

The RestError raised by the Azure Document Intelligence client library includes detailed error response information that provides useful insights into what went wrong and includes corrective actions to fix common issues.
This error information can be found in the `RestError#message` property.

### Build model error

When building a model, the most common errors are caused by an [invalid data set](#invalid-training-data-set) or an [invalid SAS Url](#invalid-sas-url).

#### Invalid training data set

This error indicates that the provided data set does not match the training data requirements.
Learn more about building a training data set [on Microsoft Learn by following this link](https://aka.ms/customModelV3).

Example error below:

```
 RestError: Invalid request.
  {
   "name": "RestError",
   "code": "InvalidRequest",
   "statusCode": 400,
   .
   .
   .
   .
   "details": {
     "error": {
       "code": "InvalidRequest",
       "message": "Invalid request.",
       "innererror": {
         "code": "InvalidContent",
         "message": "The file is corrupted or format is unsupported. Refer to documentation for the list of supported formats."
       }
     }
   },
   "message": "Invalid request."
 }
```

#### Invalid SAS URL

This error points to missing permissions on the blob storage SAS URL for the Document Intelligence service to access the training dataset resource. For more information about SAS tokens for Document Intelligence, see [here](https://learn.microsoft.com/azure/applied-ai-services/form-recognizer/create-sas-tokens).

Example error:

```
 RestError: Invalid argument.
  {
   "name": "RestError",
   "code": "InvalidArgument",
   "statusCode": 400,
   .
   .
   .
   "details": {
     "error": {
       "code": "InvalidArgument",
       "message": "Invalid argument.",
       "innererror": {
         "code": "InvalidSasToken",
         "message": "The shared access signature (SAS) is invalid: SAS token expired on 10/04/2022 03:19:05 +00:00"
       }
     }
   },
   "message": "Invalid argument."
 }
```

### Generic Error

Seeing a "Generic error" returned from the SDK is most often caused by heavy load on the service. For troubleshooting issues related to service limits, see related information [here](https://learn.microsoft.com/azure/applied-ai-services/form-recognizer/service-limits?tabs=v30).

Example error:

```
(3014) Generic error during training.
Invalid model created with ID=<model ID>
```

### Unexpected time to build a custom model

Training(`DocumentModelAdministrationClient#beginBuildDocumentModel()`) with the "neural" build mode typically takes significantly longer than the "template" mode.

For simpler use-cases, you can use the `template` build mode which uses a different model building algorithm that takes less time. Neural models are trained using deep learning, so they are more computationally intensive to train and use. More information about the `template` and neural build modes and the characteristics of models created using each can be found at the following Microsoft Learn pages:

- [Custom template models](https://aka.ms/custom-template-models)
- [Custom neural models](https://aka.ms/custom-neural-models)

_See also_: [`DocumentModelBuildMode` reference documentation](https://docs.microsoft.com/javascript/api/@azure/ai-form-recognizer/documentmodelbuildmode).

### Form Recognizer errors

For information about the error messages and codes produced by the Document Intelligence service, please refer to [the service's error documentation][fr-errors].

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
const { setLogLevel } = require("@azure/logger");

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fformrecognizer%2Fai-form-recognizer%2FTROUBLESHOOTING.png)

[`resterror`]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/core-rest-pipeline/src/restError.ts
[fr-errors]: https://aka.ms/azsdk/formrecognizer/errors
