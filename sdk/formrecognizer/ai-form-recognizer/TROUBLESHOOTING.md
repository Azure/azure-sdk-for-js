# Troubleshoot Azure Form Recognizer client library issues

This troubleshooting guide contains instructions to diagnose frequently encountered issues while using the Azure Form Recognizer client library for Javascript.

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

Form Recognizer service methods throw [`RestError`] on failure.

The RestError raised by the Azure Form Recognizer client library includes detailed error response information that provides useful insights into what went wrong and includes corrective actions to fix common issues.
This error information can be found in the `RestError#message` property.

### Build model error

Build model errors usually occur when trying to build a custom model. The most common scenarios when this might occur is, if you are building the model with an
[Invalid data set](#invalid-training-data-set) or an [Invalid SAS Url](#invalid-sas-url).

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

This error points to missing permissions on the blob storage SAS URL for the Form Recognizer service to access the training dataset resource. For more information about SAS tokens for Form Recognizer, see [here](https://learn.microsoft.com/azure/applied-ai-services/form-recognizer/create-sas-tokens).

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

It is common to have a longer completion time than what is expected when building a custom model using the `neural` build mode with `DocumentModelAdministrationClient#beginBuildDocumentModel()`.

For simpler use-cases, you can use `template` build mode which uses a different model building algorithm that takes less time. See more about `template` custom models [here](https://aka.ms/custom-template-models). To see more information about `neural` custom models (these models use deep learning to train and build), see documentation [here](https://aka.ms/custom-neural-models).

### Form Recognizer errors

For information about the error messages and codes produced by the Form Recognizer service, please refer to [the service's error documentation][fr-errors].

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
