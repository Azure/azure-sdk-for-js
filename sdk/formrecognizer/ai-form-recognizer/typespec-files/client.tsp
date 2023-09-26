import "@azure-tools/typespec-client-generator-core";
import "@typespec/rest";
import "@typespec/http";
import "@typespec/versioning";
import "./main.tsp";

using Azure.ClientGenerator.Core;
using DocumentIntelligence;

@TypeSpec.Versioning.useDependency(Azure.Core.Versions.v1_0_Preview_2)
@TypeSpec.Versioning.useDependency(DocumentIntelligence.Versions.v2022_08_31)
@TypeSpec.Versioning.useDependency(DocumentIntelligence.Versions.v2023_07_31)
@TypeSpec.Versioning.useDependency(DocumentIntelligence.Versions.v2023_10_31_preview)
namespace ClientCustomizations;

@client({
  name: "DocumentAnalysisClient",
  service: DocumentIntelligence,
})
interface DocumentAnalysisClient {
  analyzeDocument is DocumentModelsOperations.analyzeDocument;
  classifyDocument is DocumentClassifierOperations.classifyDocument;
}


@client({
  name: "DocumentModelAdministrationClient",
  service: DocumentIntelligence,
})
interface DocumentModelAdministrationClient {
  buildDocument is DocumentModelsOperations.buildDocument;
  authorizeModelCopy is DocumentModelsOperations.authorizeModelCopy;
  getModel is DocumentModelsOperations.getModel;
  listModels is DocumentModelsOperations.listModels;
  deleteModel is DocumentModelsOperations.deleteModel;

  getResourceInfo is MiscellaneousOperations.getResourceInfo;
  getOperation is MiscellaneousOperations.getOperation;
  listOperations is MiscellaneousOperations.listOperations;

  getClassifier is DocumentClassifierOperations.getClassifier;
  listClassifiers is DocumentClassifierOperations.listClassifiers;
  deleteClassifier is DocumentClassifierOperations.deleteClassifier;
}



