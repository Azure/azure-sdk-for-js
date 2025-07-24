# Release History

## 2.0.0-beta.1 (2025-07-24)
Compared with version 1.0.0

### Features Added
  - Added Interface BatchOptions
  - Added Interface GetDocumentsStatusIdsQueryParam
  - Added Interface GetDocumentsStatusOrderbyQueryParam
  - Added Interface GetDocumentsStatusStatusesQueryParam
  - Added Interface GetTranslationsStatusIdsQueryParam
  - Added Interface GetTranslationsStatusOrderbyQueryParam
  - Added Interface GetTranslationsStatusStatusesQueryParam
  - Added Interface PageSettings
  - Interface DocumentStatusOutput has a new optional parameter totalImageScansFailed
  - Interface DocumentStatusOutput has a new optional parameter totalImageScansSucceeded
  - Interface DocumentTranslateQueryParamProperties has a new optional parameter translateTextWithinImage
  - Interface StartTranslationDetails has a new optional parameter options
  - Interface StatusSummaryOutput has a new optional parameter totalImageScansFailed
  - Interface StatusSummaryOutput has a new optional parameter totalImageScansSucceeded
  - Added Type Alias FileFormatTypeOutput

### Breaking Changes
  - Interface DocumentTranslate200Headers has a new required parameter total-image-scans-failed
  - Interface DocumentTranslate200Headers has a new required parameter total-image-scans-succeeded
  - Interface DocumentTranslate200Headers has a new required parameter x-metered-usage
  - Type of parameter ids of interface GetDocumentsStatusQueryParamProperties is changed from string[] to string[] | GetDocumentsStatusIdsQueryParam
  - Type of parameter orderby of interface GetDocumentsStatusQueryParamProperties is changed from string[] to string[] | GetDocumentsStatusOrderbyQueryParam
  - Type of parameter statuses of interface GetDocumentsStatusQueryParamProperties is changed from string[] to string[] | GetDocumentsStatusStatusesQueryParam
  - Type of parameter ids of interface GetTranslationsStatusQueryParamProperties is changed from string[] to string[] | GetTranslationsStatusIdsQueryParam
  - Type of parameter orderby of interface GetTranslationsStatusQueryParamProperties is changed from string[] to string[] | GetTranslationsStatusOrderbyQueryParam
  - Type of parameter statuses of interface GetTranslationsStatusQueryParamProperties is changed from string[] to string[] | GetTranslationsStatusStatusesQueryParam

## 1.0.0 (2024-11-15)

### Other Changes
- Renamed SingleDocumentTranslationClient's API from `document_translate` to `translate`

## 1.0.0-beta.2 (2024-07-01)

### Other Changes
- Re-release of 1.0.0-beta.1 as the SDK package was released without types

## 1.0.0-beta.1 (2024-06-27)
- Initial release. Please see the README and wiki for information on the new design.

Version 1.0.0-beta.1 is preview of our efforts in creating a client library that is developer-friendly, idiomatic 
to the JS/TS ecosystem, and as consistent across different languages and platforms as possible. 

This package's 
[documentation](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/translation/ai-translation-document-rest/README.md) 
and 
[samples](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/translation/ai-translation-document-rest/samples) 
demonstrate the new API.

### Features Added
- Added support for Synchronous document translation - [translate-document API](https://learn.microsoft.com/azure/ai-services/translator/document-translation/reference/translate-document)
- Added support for Batch Translation - [start Translation API](https://learn.microsoft.com/azure/ai-services/translator/document-translation/reference/start-batch-translation)
- Added support for Get Translations Status - [get translations status API](https://learn.microsoft.com/azure/ai-services/translator/document-translation/reference/get-translations-status)
- Added support for Get Translation Status - [get translation status API](https://learn.microsoft.com/azure/ai-services/translator/document-translation/reference/get-translation-status)
- Added support for Get Documents Status - [get documents status API](https://learn.microsoft.com/azure/ai-services/translator/document-translation/reference/get-documents-status)
- Added support for Get Document Status - [get document status API](https://learn.microsoft.com/azure/ai-services/translator/document-translation/reference/get-document-status)
- Added support for Cancel Translation - [cancel translation API](https://learn.microsoft.com/azure/ai-services/translator/document-translation/reference/cancel-translation)
- Added support for Get Supported Document Formats - [get supported document formats API](https://learn.microsoft.com/azure/ai-services/translator/document-translation/reference/get-supported-document-formats)
- Added support for Get Supported Glossary Formats - [get supported glossary formats API](https://learn.microsoft.com/azure/ai-services/translator/document-translation/reference/get-supported-glossary-formats)
