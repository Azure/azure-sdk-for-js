# Azure Text Analytics TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure/ai-text-analytics"
title: GeneratedClient
description: Text Analysis Client
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src/generated
input-file: https://github.com/Azure/azure-rest-api-specs/blob/cognitiveservices-Language-2022-04-01-preview/specification/cognitiveservices/data-plane/Language/preview/2022-04-01-preview/textanalytics.json
add-credentials: false
package-version: 6.0.0-beta.1
v3: true
hide-clients: true
typescript: true
```

## Customizations for Track 2 Generator

See the [AutoRest samples](https://github.com/Azure/autorest/tree/master/Samples/3b-custom-transformations)
for more about how we're customizing things.

### Rename analyze-text to Analyze and analyze-test/jobs to AnalyzeBatch

```yaml
directive:
  - from: swagger-document
    where: $["paths"]["/:analyze-text"]["post"]
    transform: $.operationId = "Analyze";
  - from: swagger-document
    where: $["paths"]["/:analyze-text/jobs"]["post"]
    transform: $.operationId = "AnalyzeBatch";
```

### Rename JobState

```yaml
directive:
  - from: swagger-document
    where: $.definitions.JobState
    transform: $.properties.createdDateTime["x-ms-client-name"] = "createdOn";
  - from: swagger-document
    where: $.definitions.JobState
    transform: $.properties.expirationDateTime["x-ms-client-name"] = "expiresOn";
  - from: swagger-document
    where: $.definitions.JobState
    transform: $.properties.jobId["x-ms-client-name"] = "operationId";
  - from: swagger-document
    where: $.definitions.JobState
    transform: $.properties.lastUpdateDateTime["x-ms-client-name"] = "lastModifiedOn";
  - from: swagger-document
    where: $.definitions.JobState
    transform: $.properties.status["x-ms-enum"].name = "OperationStatus";
```

### Task renames

```yaml
directive:
  - from: swagger-document
    where: $.definitions.AnalyzeTextTask
    transform:
      $["x-ms-client-name"] = "AnalyzeAction";
  - from: swagger-document
    where: $.definitions.AnalyzeTextLROTask
    transform:
      $["x-ms-client-name"] = "AnalyzeBatchAction";
  - from: swagger-document
    where: $.definitions.TaskParameters
    transform:
      $.properties.loggingOptOut["x-ms-client-name"] = "disableServiceLogs";
      $.properties.loggingOptOut.description = "If set to true, you opt-out of having your text input logged for troubleshooting. By default, Cognitive Language Service logs your input text for 48 hours, solely to allow for troubleshooting issues. Setting this parameter to true, disables in logging and may limit our ability to remediate issues that occur.\n\nDefault is false.";
      $["x-ms-client-name"] = "ActionCommon";
      $.description = "Configuration common to all actions."
  - from: swagger-document
    where: $.definitions.PreBuiltTaskParameters.properties.modelVersion
    transform:
      $.description = "The version of the model to be used by the action.";
  - from: swagger-document
    where: $.definitions.PreBuiltTaskParameters
    transform:
      $.description = "Configuration common to all actions that use prebuilt models.";
      $["x-ms-client-name"] = "ActionPrebuilt";
  - from: swagger-document
    where: $.definitions.CustomTaskParameters
    transform:
      $["x-ms-client-name"] = "ActionCustom";
  - from: swagger-document
    where: $.definitions.ActionCustom
    transform:
      $.description = "Configuration common to all actions that use custom models.";
      $.properties.projectName.description = "The project name for the model to be used by the action.";
      $.properties.deploymentName.description = "The deployment name for the model to be used by the action.";
  - from: swagger-document
    where: $.definitions.EntityLinkingTaskParameters
    transform:
      $["x-ms-client-name"] = "EntityLinkingAction";
      $.description = "Options for an entity linking action.";
  - from: swagger-document
    where: $.definitions.EntitiesTaskParameters
    transform:
      $["x-ms-client-name"] = "EntityRecognitionAction";
      $.description = "Options for an entity recognition action.";
  - from: swagger-document
    where: $.definitions.SentimentAnalysisTaskParameters
    transform:
      $["x-ms-client-name"] = "SentimentAnalysisAction";
      $.properties.opinionMining.description = "Enables performing opinion mining on the input documents, a more  granular analysis around the aspects of a product or service (also known as aspect-based sentiment analysis). If set to true, {@link SentenceSentiment.opinions} will contain the results of this analysis. See {@link https://docs.microsoft.com/azure/cognitive-services/language-service/sentiment-opinion-mining/overview#opinion-mining the service documentation} for more information.";
      $.properties.opinionMining["x-ms-client-name"] = "includeOpinionMining";
      $.description = "Options for a sentiment analysis action.";
  - from: swagger-document
    where: $.definitions.KeyPhraseTaskParameters
    transform:
      $["x-ms-client-name"] = "KeyPhraseExtractionAction";
      $.description = "Options for a key phrase recognition action.";
  - from: swagger-document
    where: $.definitions.PiiTaskParameters
    transform:
      $["x-ms-client-name"] = "PiiEntityRecognitionAction";
      $.properties.domain.description = "Filters entities to ones only included in the specified domain (e.g., if set to `Phi`, only entities in the Protected Healthcare Information domain will be returned). For a list of possible domains, see {@link PiiDomain}.\n\nSee {@link https://aka.ms/tanerpii the service documentation} for more information.";
      $.properties.domain["x-ms-client-name"] = "domainFilter";
      $.properties.piiCategories.description = "Filters entities to ones only included in the specified array of categories. For a list of possible categories, see {@link KnownPiiCategory}";
      $.properties.piiCategories["x-ms-client-name"] = "categoriesFilter";
      $.description = "Options for a Pii entity recognition action."
  - from: swagger-document
    where: $.definitions.LanguageDetectionTaskParameters
    transform:
      $["x-ms-client-name"] = "LanguageDetectionAction";
      $.description = "Options for a language detection action.";
  - from: swagger-document
    where: $.definitions.HealthcareTaskParameters
    transform:
      $["x-ms-client-name"] = "HealthcareAction";
  - from: swagger-document
    where: $.definitions.ExtractiveSummarizationTaskParameters
    transform:
      $["x-ms-client-name"] = "ExtractiveSummarizationAction";
      $.properties.sentenceCount.description = "The max number of sentences to be part of the summary.";
      $.properties.sentenceCount["x-ms-client-name"] = "maxSentenceCount";
      $.properties.sortBy["x-ms-client-name"] = "orderBy";
  - from: swagger-document
    where: $.definitions.ExtractiveSummarizationSortingCriteria
    transform:
      $["x-ms-enum"].name = "ExtractiveSummarizationOrderingCriteria";
  - from: swagger-document
    where: $.definitions.CustomEntitiesTaskParameters
    transform:
      $["x-ms-client-name"] = "CustomEntityRecognitionAction";
  - from: swagger-document
    where: $.definitions.CustomSingleLabelClassificationTaskParameters
    transform:
      $["x-ms-client-name"] = "CustomSingleLabelClassificationAction";
      $.description = "Options for a single-label classification custom action";
  - from: swagger-document
    where: $.definitions.CustomMultiLabelClassificationTaskParameters
    transform:
      $["x-ms-client-name"] = "CustomMultiLabelClassificationAction";
      $.description = "Options for a multi-label classification custom action";
  - from: swagger-document
    where: $.definitions.TaskIdentifier
    transform:
      $["x-ms-client-name"] = "BatchActionState";
      $.description = "The State of a batched action";
      $.properties.taskName.description = "The name of the action";
      $.properties.taskName["x-ms-client-name"] = "actionName";
  - from: swagger-document
    where: $.definitions..properties.stringIndexType
    transform: >
      $.description = "Specifies the measurement unit used to calculate the offset and length properties. For a list of possible values, see {@link KnownStringIndexType}.\n\nThe default is the JavaScript's default which is \"Utf16CodeUnit\".";
```

### Rename HealthcareEntityLink => EntityDataSource

```yaml
directive:
  - from: swagger-document
    where: $.definitions.HealthcareEntityLink
    transform:
      $["x-ms-client-name"] = "EntityDataSource";
      $.description = "A type representing a reference for the healthcare entity into a specific entity catalog.";
      $.properties.dataSource["x-ms-client-name"] = "name";
      $.properties.id["x-ms-client-name"] = "entityId";
  - from: swagger-document
    where: $.definitions.HealthcareEntity.properties.links
    transform: >
      $["x-ms-client-name"] = "dataSources";
```

### Rename name to normalizedText

```yaml
directive:
  - from: swagger-document
    where: $.definitions.HealthcareEntity.properties.name
    transform: >
      $["x-ms-client-name"] = "normalizedText";
```

### Add Entity to some Healthcare types

```yaml
directive:
  - from: swagger-document
    where: $.definitions.Assertion
    transform: >
      $["x-ms-client-name"] = "EntityAssertion";
  - from: swagger-document
    where: $.definitions.Conditionality
    transform: >
      $["x-ms-client-name"] = "EntityConditionality";
  - from: swagger-document
    where: $.definitions.HealthcareAssertion
    transform: >
      $.properties.certainty["x-ms-enum"]["name"] = "EntityCertainty";
      $.properties.conditionality["x-ms-enum"]["name"] = "EntityConditionality";
      $.properties.association["x-ms-enum"]["name"] = "EntityAssociation";
  - from: swagger-document
    where: $.definitions.Association
    transform: >
      $["x-ms-client-name"] = "EntityAssociation";
```

### Pii types renames

```yaml
directive:
  - from: swagger-document
    where: $.definitions.PiiDomain
    transform: $["x-ms-enum"].name = "PiiEntityDomain";
  - from: swagger-document
    where: $.definitions.PiiCategories
    transform: $.items["x-ms-enum"].name = "PiiEntityCategory";
```

### Rename class => classification

```yaml
directive:
  - from: swagger-document
    where: $.definitions.SingleClassificationDocumentResult.properties.class
    transform:
      $["x-ms-client-name"] = "classification";
  - from: swagger-document
    where: $.definitions.MultiClassificationDocumentResult.properties.class
    transform:
      $["x-ms-client-name"] = "classifications";
  - from: swagger-document
    where: $.definitions.ClassificationResult
    transform:
      $["x-ms-client-name"] = "ClassificationCategory";
      $.description = "A classification result from a custom classify document single category action";
```

### Set Utf16CodeUnit as the default for StringIndexType because this is what JavaScript uses

```yaml
directive:
  - from: swagger-document
    where: $.definitions.StringIndexType
    transform: $.default = "Utf16CodeUnit";
```

### Rename plurals in DocumentStatistics

```yaml
directive:
  - from: swagger-document
    where: $.definitions.DocumentStatistics.properties.charactersCount
    transform: >
      $["x-ms-client-name"] = "characterCount";
```

```yaml
directive:
  - from: swagger-document
    where: $.definitions.DocumentStatistics.properties.transactionsCount
    transform: >
      $["x-ms-client-name"] = "transactionCount";
```

### Rename BingId to bingEntitySearchApiId

```yaml
directive:
  - from: swagger-document
    where: $.definitions.LinkedEntity.properties.bingId
    transform: >
      $["x-ms-client-name"] = "bingEntitySearchApiId";
```

### Rename plurals in RequestStatistics

```yaml
directive:
  - from: swagger-document
    where: $.definitions.RequestStatistics.properties.documentsCount
    transform: >
      $["x-ms-client-name"] = "documentCount";
  - from: swagger-document
    where: $.definitions.RequestStatistics.properties.validDocumentsCount
    transform: >
      $["x-ms-client-name"] = "validDocumentCount";
  - from: swagger-document
    where: $.definitions.RequestStatistics.properties.erroneousDocumentsCount
    transform: >
      $["x-ms-client-name"] = "erroneousDocumentCount";
  - from: swagger-document
    where: $.definitions.RequestStatistics.properties.transactionsCount
    transform: >
      $["x-ms-client-name"] = "transactionCount";
```

### sentences => sentenceSentiments

```yaml
directive:
  - from: swagger-document
    where: $.definitions.DocumentSentiment.properties.sentences
    transform: >
      $["x-ms-client-name"] = "sentenceSentiments";
```

### SentenceAssessment to AssessmentSentiment

```yaml
directive:
  - from: swagger-document
    where: $.definitions.SentenceAssessment
    transform: >
      $["x-ms-client-name"] = "AssessmentSentiment";
      $.description = "AssessmentSentiment contains the predicted sentiment, confidence scores and other information about an assessment of a target. For example, in the sentence \"The food is good\", the assessment of the target 'food' is 'good'.";
```

### DocumentStatistics => TextDocumentStatistics

```yaml
directive:
  - from: swagger-document
    where: $.definitions.DocumentStatistics
    transform: >
      $["x-ms-client-name"] = "TextDocumentStatistics";
```

### RequestStatistics => TextDocumentBatchStatistics

```yaml
directive:
  - from: swagger-document
    where: $.definitions.RequestStatistics
    transform: >
      $["x-ms-client-name"] = "TextDocumentBatchStatistics";
```

### Rename showStats -> includeStatistics

```yaml
directive:
  - from: swagger-document
    where: $.parameters.ShowStats
    transform: >
      $["x-ms-client-name"] = "includeStatistics";
  - from: swagger-document
    where: $.definitions[*]
    transform: >
      if ($.description && $.description.includes("showStats")) {
        $.description = $.description.replace("showStats", "includeStatistics");
      }
```

### Rename {Document,Sentence,Token}SentimentValue -> Label

```yaml
directive:
  - from: swagger-document
    where: $.definitions.SentimentDocumentResult.properties.sentiment
    transform: >
      $["x-ms-enum"].name = "DocumentSentimentLabel";
  - from: swagger-document
    where: $.definitions.SentenceSentiment.properties.sentiment
    transform: >
      $["x-ms-enum"].name = "SentenceSentimentLabel";
  - from: swagger-document
    where: $.definitions.SentenceTarget.properties.sentiment
    transform: >
      $["x-ms-enum"].name = "TokenSentimentLabel";
  - from: swagger-document
    where: $.definitions.SentenceAssessment.properties.sentiment
    transform: >
      $["x-ms-enum"].name = "TokenSentimentLabel";
```

### Rename LinkedEntity id -> dataSourceEntityId

```yaml
directive:
  - from: swagger-document
    where: $.definitions.LinkedEntity.properties.id
    transform: >
      $["x-ms-client-name"] = "dataSourceEntityId";
```

### Rename SentimentConfidenceScorePerLabel -> SentimentConfidenceScores

```yaml
directive:
  - from: swagger-document
    where: $.definitions.SentimentConfidenceScorePerLabel
    transform: >
      $["x-ms-client-name"] = "SentimentConfidenceScores";
```

### Rename TargetConfidenceScoreLabel -> TargetConfidenceScores

```yaml
directive:
  - from: swagger-document
    where: $.definitions.TargetConfidenceScoreLabel
    transform: >
      $["x-ms-client-name"] = "TargetConfidenceScores";
```

### ExtractedSummarySentence to SummarySentence

```yaml
directive:
  - from: swagger-document
    where: $.definitions.ExtractedSummarySentence
    transform: >
      $["x-ms-client-name"] = "SummarySentence";
      $.description = "A sentence that is part of the extracted summary.";
```

### Change some casing to use camelCase

```yaml
directive:
  - from: swagger-document
    where: $.definitions.Entity.properties.subcategory
    transform: >
      $["x-ms-client-name"] = "subCategory";
  - from: swagger-document
    where: $.definitions.HealthcareEntity.properties.subcategory
    transform: >
      $["x-ms-client-name"] = "subCategory";
```

### WarningCodeValue => WarningCode

```yaml
directive:
  - from: swagger-document
    where: $.definitions.DocumentWarning.properties.code
    transform: >
      $["x-ms-enum"].name = "WarningCode";
```

### Remove targetRef

```yaml
directive:
  - from: swagger-document
    where: $.definitions.DocumentWarning.properties
    transform: >
      delete $["targetRef"];
```

### Rename text input objects to avoid "export as"

```yaml
directive:
  - from: swagger-document
    where: $.definitions
    transform: >
      if (!$.TextDocumentInput) {
          $.TextDocumentInput = $.MultiLanguageInput
          delete $.MultiLanguageInput;
      }
  - from: swagger-document
    where: $.definitions.MultiLanguageAnalysisInput.properties.documents.items
    transform: >
      $["$ref"] = "#/definitions/TextDocumentInput";
  - from: swagger-document
    where: $.definitions
    transform: >
      if (!$.LanguageDetectionInput) {
          $.LanguageDetectionInput = $.LanguageInput;
          delete $.LanguageInput;
      }
  - from: swagger-document
    where: $.definitions.LanguageDetectionAnalysisInput.properties.documents.items
    transform: >
      $["$ref"] = "#/definitions/LanguageDetectionInput";
```


### Disable LRO

```yaml
directive:
  - from: swagger-document
    where: $["paths"][*]
    transform: >
      for (var op of Object.values($)) {
          if (op["x-ms-long-running-operation"]) {
              delete op["x-ms-long-running-operation"];
          }
      }
```

### Enhance documentation strings for some exported swagger types

```yaml
directive:
  - from: swagger-document
    where: $.definitions.DocumentWarning
    transform: $.description = "Represents a warning encountered while processing a document."
  - from: swagger-document
    where: $.definitions.SentenceSentiment
    transform: $.description = "The predicted sentiment for a given span of text. For more information regarding text sentiment, seehttps://docs.microsoft.com/azure/cognitive-services/language-service/sentiment-opinion-mining/overview."
  - from: swagger-document
    where: $.definitions.Match
    transform: $.description = "Details about the specific substring in a document that refers to a linked entity identified by the Language model."
  - from: swagger-document
    where: $.definitions.Entity
    transform: $.description = "A word or phrase identified as an entity that is categorized within a taxonomy of types. The set of categories recognized by the Language service is described at https://docs.microsoft.com/azure/cognitive-services/language-service/named-entity-recognition/concepts/named-entity-categories ."
  - from: swagger-document
    where: $.definitions.LinkedEntity
    transform: $.description = "A word or phrase identified as a well-known entity within a database, including its formal (disambiguated) name and a link to the entity information within the source database."
  - from: swagger-document
    where: $.definitions.LanguageDetectionInput
    transform: 
        $.description = "An input to the language detection operation. This object specifies a unique document id, as well as the full text of a document and a hint indicating the document's country of origin to assist the Language predictive model in detecting the document's language.";
        $.properties.countryHint.description = "A hint indicating the document's country of origin to assist the Language predictive model in detecting the document's language.";
        $.properties.text.description = "Full text of the input document.";
  - from: swagger-document
    where: $.definitions.TextDocumentInput
    transform: $.description = "An object representing an individual text document to be analyzed by the Language service. The document contains a unique document ID, the full text of the document, and the language of the document's text."
  - from: swagger-document
    where: $.definitions.DetectedLanguage
    transform: $.description = "Information about the language of a document as identified by the Language service."
  - from: swagger-document    
    where: $.definitions.SentenceAssessment
    transform: $.description = "An object that contains the predicted sentiment, confidence scores and other information about an assessment of a target. For example, in the sentence \"The food is good\", the assessment of the target 'food' is 'good'."
  - from: swagger-document    
    where: $.definitions.HealthcareAssertion
    transform: $.description = "An object that describes metadata about the healthcare entity such as whether it is hypothetical or conditional.";
```
