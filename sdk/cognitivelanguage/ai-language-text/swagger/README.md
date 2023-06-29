# Azure Text Analytics TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure/ai-language-text"
title: GeneratedClient
description: Text Analysis Client
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src/generated
input-file: https://github.com/Azure/azure-rest-api-specs/blob/af1b95f0c8cc5cedc3b224f3d6751eb43b57b43a/specification/cognitiveservices/data-plane/Language/stable/2023-04-01/analyzetext.json
add-credentials: false
package-version: 1.1.0
v3: true
hide-clients: true
typescript: true
```

## Customizations for Track 2 Generator

See the [AutoRest samples](https://github.com/Azure/autorest/tree/master/Samples/3b-custom-transformations)
for more about how we're customizing things.

## General customizations

```yaml
directive:
  - where-operation: AnalyzeText
    transform: $.operationId = "Analyze";
  - from: swagger-document
  - where-operation: AnalyzeText_SubmitJob
    transform: $.operationId = "AnalyzeBatch";

  - rename-model: 
      from: AnalyzeTextTask
      to: AnalyzeAction
  - rename-model: 
      from: AnalyzeTextLROTask
      to: AnalyzeBatchAction
  - where-model: TaskParameters
    transform:
      $.description = "Configuration common to all actions.";
      $.properties.loggingOptOut.description = "If set to true, you opt-out of having your text input logged for troubleshooting. By default, Cognitive Language Service logs your input text for 48 hours, solely to allow for troubleshooting issues. Setting this parameter to true, disables in logging and may limit our ability to remediate issues that occur.\n\nDefault is false.";
      $.properties.loggingOptOut["x-ms-client-name"] = "disableServiceLogs";
      $["x-ms-client-name"] = "ActionCommon";
  - where-model: PreBuiltTaskParameters
    transform:
      $.properties.modelVersion.description = "The version of the model to be used by the action.";
      $.description = "Configuration common to all actions that use prebuilt models.";
      $["x-ms-client-name"] = "ActionPrebuilt";
  - rename-model: 
      from: CustomTaskParameters
      to: ActionCustom
  - where-model: ActionCustom
    transform:
      $.description = "Configuration common to all actions that use custom models.";
      $.properties.projectName.description = "The project name for the model to be used by the action.";
      $.properties.deploymentName.description = "The deployment name for the model to be used by the action.";
  - rename-model: 
      from: EntityLinkingTaskParameters
      to: EntityLinkingAction
  - where-model: EntityLinkingAction
    transform:
      $.description = "Options for an entity linking action.";
  - rename-model: 
      from: EntitiesTaskParameters
      to: EntityRecognitionAction
  - where-model: EntityRecognitionAction
    transform:
      $.description = "Options for an entity recognition action.";
  - rename-model: 
      from: SentimentAnalysisTaskParameters
      to: SentimentAnalysisAction
  - where-model: SentimentAnalysisAction
    transform:
      $.description = "Options for a sentiment analysis action.";
      $.properties.opinionMining.description = "Enables performing opinion mining on the input documents, a more  granular analysis around the aspects of a product or service (also known as aspect-based sentiment analysis). If set to true, {@link SentenceSentiment.opinions} will contain the results of this analysis. See {@link https://docs.microsoft.com/azure/cognitive-services/language-service/sentiment-opinion-mining/overview#opinion-mining the service documentation} for more information.";
      $.properties.opinionMining["x-ms-client-name"] = "includeOpinionMining";
  - rename-model:
      from: KeyPhraseTaskParameters
      to: KeyPhraseExtractionAction
  - where-model: KeyPhraseExtractionAction
    transform:
      $.description = "Options for a key phrase recognition action.";
  - rename-model:
      from: PiiTaskParameters
      to: PiiEntityRecognitionAction
  - where-model: PiiEntityRecognitionAction
    transform:
      $.description = "Options for a Pii entity recognition action.";
      $.properties.domain.description = "Filters entities to ones only included in the specified domain (e.g., if set to `Phi`, only entities in the Protected Healthcare Information domain will be returned). For a list of possible domains, see {@link KnownPiiEntityDomain}.\n\nSee {@link https://aka.ms/tanerpii the service documentation} for more information.";
      $.properties.piiCategories.description = "Filters entities to ones only included in the specified array of categories. For a list of possible categories, see {@link KnownPiiCategory}";
      $.properties.domain["x-ms-client-name"] = "domainFilter";
      $.properties.piiCategories["x-ms-client-name"] = "categoriesFilter";
  - rename-model:
      from: LanguageDetectionTaskParameters
      to: LanguageDetectionAction
  - where-model: LanguageDetectionAction
    transform:
      $.description = "Options for a language detection action.";

  - rename-model:
      from: HealthcareTaskParameters
      to: HealthcareAction
  - rename-model:
      from: ExtractiveSummarizationTaskParameters
      to: ExtractiveSummarizationAction
  - where-model: ExtractiveSummarizationAction
    transform:
      $.properties.sentenceCount.description = "The max number of sentences to be part of the summary.";
      $.properties.sentenceCount["x-ms-client-name"] = "maxSentenceCount";
      $.properties.sortBy["x-ms-client-name"] = "orderBy";
  - where-model: ExtractiveSummarizationSortingCriteria
    transform:
      $["x-ms-enum"].name = "ExtractiveSummarizationOrderingCriteria";
  - rename-model:
      from: CustomEntitiesTaskParameters
      to: CustomEntityRecognitionAction
  - rename-model:
      from: CustomSingleLabelClassificationTaskParameters
      to: CustomSingleLabelClassificationAction
  - where-model: CustomSingleLabelClassificationAction
    transform:
      $.description = "Options for a single-label classification custom action";
  - rename-model:
      from: CustomMultiLabelClassificationTaskParameters
      to: CustomMultiLabelClassificationAction
  - where-model: CustomMultiLabelClassificationAction
    transform:
      $.description = "Options for a multi-label classification custom action";
  - where-model: TaskIdentifier
    transform:
      $.description = "The State of a batched action";
      $.properties.taskName.description = "The name of the action";
      $.properties.taskName["x-ms-client-name"] = "actionName";
      $["x-ms-client-name"] = "BatchActionState";

  - rename-model:
      from: HealthcareEntityLink
      to: EntityDataSource
  - where-model: EntityDataSource
    transform:
      $.description = "A type representing a reference for the healthcare entity into a specific entity catalog.";
      $.properties.dataSource["x-ms-client-name"] = "name";
      $.properties.id["x-ms-client-name"] = "entityId";

  - where-model: HealthcareEntity
    transform:
      $.description = "A type representing a reference for the healthcare entity into a specific entity catalog.";
      $.properties.links["x-ms-client-name"] = "dataSources";
      $.properties.name["x-ms-client-name"] = "normalizedText";

  - rename-model: 
      from: Assertion
      to: EntityAssertion
  - rename-model: 
      from: Conditionality
      to: EntityConditionality
  - where-model: HealthcareAssertion
    transform: >
      $.properties.certainty["x-ms-enum"]["name"] = "EntityCertainty";
      $.properties.conditionality["x-ms-enum"]["name"] = "EntityConditionality";
      $.properties.association["x-ms-enum"]["name"] = "EntityAssociation";
  - rename-model: 
      from: Association
      to: EntityAssociation

  - where-model: PiiDomain
    transform: $["x-ms-enum"].name = "PiiEntityDomain";
  - where-model: PiiCategories
    transform: $.items["x-ms-enum"].name = "PiiEntityCategory";

  - where-model: ClassificationDocumentResult
    transform: $.properties.class["x-ms-client-name"] = "classifications";
  - rename-model:
      from: ClassificationResult
      to: ClassificationCategory
  - where-model: ClassificationCategory
    transform: $.description = "A classification result from a custom classify document single category action";

  - where-model: DocumentStatistics
    transform: >
      $.properties.charactersCount["x-ms-client-name"] = "characterCount";
      $.properties.transactionsCount["x-ms-client-name"] = "transactionCount";

  - where-model: LinkedEntity
    transform: $.properties.bingId["x-ms-client-name"] = "bingEntitySearchApiId";
  - where-model: RequestStatistics
    transform: >
      $.properties.documentsCount["x-ms-client-name"] = "documentCount";
      $.properties.validDocumentsCount["x-ms-client-name"] = "validDocumentCount";
      $.properties.erroneousDocumentsCount["x-ms-client-name"] = "erroneousDocumentCount";
      $.properties.transactionsCount["x-ms-client-name"] = "transactionCount";
      $["x-ms-client-name"] = "TextDocumentBatchStatistics";

  - where-model: DocumentSentiment
    transform: $.properties.sentences["x-ms-client-name"] = "sentenceSentiments";
  - rename-model:
      from: SentenceAssessment
      to: AssessmentSentiment
  - where:-model: AssessmentSentiment
    transform: >
      $.description = "AssessmentSentiment contains the predicted sentiment, confidence scores and other information about an assessment of a target. For example, in the sentence \"The food is good\", the assessment of the target 'food' is 'good'.";

  - rename-model:
      from: DocumentStatistics
      to: TextDocumentStatistics
  - from: swagger-document
    where: $.parameters.ShowStats
    transform: >
      $["x-ms-client-name"] = "includeStatistics";

  - from: swagger-document
    where: $.definitions.AbstractiveSummary.required
    transform: >
      if (!$.find((x) => x === "contexts")) {
          $.push("contexts");
      }

  - from: swagger-document
    where: $.definitions[*]
    transform: >
      if ($.description && $.description.includes("showStats")) {
        $.description = $.description.replace("showStats", "includeStatistics");
      }

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
    where: $.definitions.AssessmentSentiment.properties.sentiment
    transform: >
      $["x-ms-enum"].name = "TokenSentimentLabel";

  - from: swagger-document
    where: $.definitions.LinkedEntity.properties.id
    transform: >
      $["x-ms-client-name"] = "dataSourceEntityId";

  - from: swagger-document
    where: $.definitions.SentimentConfidenceScorePerLabel
    transform: >
      $["x-ms-client-name"] = "SentimentConfidenceScores";

  - from: swagger-document
    where: $.definitions.TargetConfidenceScoreLabel
    transform: >
      $["x-ms-client-name"] = "TargetConfidenceScores";

  - from: swagger-document
    where: $.definitions.ExtractedSummarySentence
    transform: >
      $["x-ms-client-name"] = "SummarySentence";
      $.description = "A sentence that is part of the extracted summary.";

  - from: swagger-document
    where: $.definitions.Entity.properties.subcategory
    transform: >
      $["x-ms-client-name"] = "subCategory";
  - from: swagger-document
    where: $.definitions.HealthcareEntity.properties.subcategory
    transform: >
      $["x-ms-client-name"] = "subCategory";

  - from: swagger-document
    where: $.definitions.DocumentWarning.properties.code
    transform: >
      $["x-ms-enum"].name = "WarningCode";

  - from: swagger-document
    where: $.definitions.AnalyzeTextJobsInput.properties
    transform: >
      delete $["defaultLanguage"];

  - from: swagger-document
    where: $.definitions.DocumentWarning.properties
    transform: >
      delete $["targetRef"];

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

  - from: swagger-document
    where: $.definitions.JobState
    transform: $.properties.jobId["x-ms-client-name"] = "id";
  - from: swagger-document
    where: $.definitions.JobState
    transform: $.properties.status["x-ms-enum"].name = "OperationStatus";
  - from: swagger-document
    where: $.definitions.JobState
    transform: $.properties.createdDateTime["x-ms-client-name"] = "createdOn";
  - from: swagger-document
    where: $.definitions.JobState
    transform: $.properties.expirationDateTime["x-ms-client-name"] = "expiresOn";
  - from: swagger-document
    where: $.definitions.JobState
    transform: $.properties.lastUpdatedDateTime["x-ms-client-name"] = "modifiedOn";

# Enhance documentation strings for some exported swagger types

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
    where: $.definitions.AssessmentSentiment
    transform: $.description = "An object that contains the predicted sentiment, confidence scores and other information about an assessment of a target. For example, in the sentence \"The food is good\", the assessment of the target 'food' is 'good'."
  - from: swagger-document    
    where: $.definitions.HealthcareAssertion
    transform: $.description = "An object that describes metadata about the healthcare entity such as whether it is hypothetical or conditional.";
  - rename-model:
      from: DynamicClassificationTaskParameters
      to: DynamicClassificationAction
  - where-model: DynamicClassificationAction
    transform:
      $.description = "Options for a dynamic classification action.";
  - rename-model:
      from: AbstractiveSummarizationTaskParameters
      to: AbstractiveSummarizationAction
  - where-model: DocumentDetectedLanguage
    transform: $.description = "The auto-detected language of the input document.";
  - where-model: EntityWithResolution
    transform: $.description = "An entity with resolution.";
```

## JS customizations

```yaml
directive:
  - from: swagger-document
    where: $.definitions..properties.stringIndexType
    transform: >
      $.description = "Specifies the measurement unit used to calculate the offset and length properties. For a list of possible values, see {@link KnownStringIndexType}.\n\nThe default is the JavaScript's default which is \"Utf16CodeUnit\".";

# Set Utf16CodeUnit as the default for StringIndexType because this is what JavaScript uses

  - from: swagger-document
    where: $.definitions.StringIndexType
    transform: $.default = "Utf16CodeUnit";

# Disable LRO

  - from: swagger-document
    where: $["paths"][*]
    transform: >
      for (var op of Object.values($)) {
          if (op["x-ms-long-running-operation"]) {
              delete op["x-ms-long-running-operation"];
          }
      }
```
