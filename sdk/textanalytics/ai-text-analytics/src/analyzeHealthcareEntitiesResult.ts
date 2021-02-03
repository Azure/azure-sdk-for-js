// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  DocumentHealthcareEntities,
  Entity,
  HealthcareRelation,
  TextDocumentBatchStatistics,
  HealthcareEntity as GeneratedHealthcareEntity
} from "./generated/models";
import {
  makeTextAnalyticsSuccessResult,
  TextAnalyticsErrorResult,
  TextAnalyticsSuccessResult
} from "./textAnalyticsResult";
import { parseHealthcareEntityIndex } from "./util";

/**
 * The type of different relationships between any two healthcare entities.
 */
export type HealthcareEntityRelationType =
  | "DirectionOfBodyStructure"
  | "DirectionOfExamination"
  | "RelationOfExamination"
  | "TimeOfExamination"
  | "UnitOfExamination"
  | "ValueOfExamination"
  | "DirectionOfCondition"
  | "QualifierOfCondition"
  | "TimeOfCondition"
  | "UnitOfCondition"
  | "ValueOfCondition"
  | "DosageOfMedication"
  | "FormOfMedication"
  | "FrequencyOfMedication"
  | "RouteOfMedication"
  | "TimeOfMedication"
  | "DirectionOfTreatment"
  | "TimeOfTreatment"
  | "FrequencyOfTreatment";

/**
 * a type predicate for the healthcare entity relation type
 * @param relation - a healthcare entity relation type
 * @internal
 * @hidden
 */
function isHealthcareEntityRelationType(
  relation: string
): relation is HealthcareEntityRelationType {
  const relationsList = [
    "DirectionOfBodyStructure",
    "DirectionOfExamination",
    "RelationOfExamination",
    "TimeOfExamination",
    "UnitOfExamination",
    "ValueOfExamination",
    "DirectionOfCondition",
    "QualifierOfCondition",
    "TimeOfCondition",
    "UnitOfCondition",
    "ValueOfCondition",
    "DosageOfMedication",
    "FormOfMedication",
    "FrequencyOfMedication",
    "RouteOfMedication",
    "TimeOfMedication",
    "DirectionOfTreatment",
    "TimeOfMedication",
    "FrequencyOfTreatment"
  ];
  const relations = new Set(relationsList);
  return relations.has(relation);
}

/**
 * A type representing a reference for the healthcare entity into a specific
 * entity catalog.
 */
export interface EntityDataSource {
  /**
   * Entity Catalog. Examples include: UMLS, CHV, MSH, etc.
   */
  name: string;
  /**
   * Entity id in the given source catalog.
   */
  entityId: string;
}

/**
 * A healthcare entity represented as a node in a directed graph where the edges are
 * a particular type of relationship between the source and target nodes.
 */
export interface HealthcareEntity extends Entity {
  /**
   * Whether the entity is negated.
   */
  isNegated: boolean;
  /**
   * Entity references in known data sources.
   */
  dataSources: EntityDataSource[];
  /**
   * Other healthcare entities related to the current one. It is a directed
   * relationship where the current entity is the source and the entities in
   * the map are the target.
   */
  relatedEntities: Map<HealthcareEntity, HealthcareEntityRelationType>;
}

/**
 * The results of a successful healthcare operation for a single document.
 */
export interface AnalyzeHealthcareEntitiesSuccessResult extends TextAnalyticsSuccessResult {
  /**
   * Healthcare entities.
   */
  entities: HealthcareEntity[];
}

/**
 * An error result from the healthcare operation on a single document.
 */
export type AnalyzeHealthcareEntitiesErrorResult = TextAnalyticsErrorResult;

/**
 * The result of the healthcare operation on a single document.
 */
export type AnalyzeHealthcareEntitiesResult =
  | AnalyzeHealthcareEntitiesSuccessResult
  | AnalyzeHealthcareEntitiesErrorResult;

/**
 * Array of {@link AnalyzeHealthcareEntitiesResult}
 */
export interface AnalyzeHealthcareEntitiesResultArray
  extends Array<AnalyzeHealthcareEntitiesResult> {}

/**
 * The results of a healthcare operation represented as a paged iterator that can
 * either iterate over the results on a document-by-document basis or, by
 * byPage(), can iterate over pages of documents.
 */
export type PagedAsyncIterableAnalyzeHealthcareEntitiesResult = PagedAsyncIterableIterator<
  AnalyzeHealthcareEntitiesResult,
  AnalyzeHealthcareEntitiesResultArray
>;

/**
 * The results of a healthcare operation represented as a paged iterator that can
 * either iterate over the results on a document-by-document basis or, by
 * byPage(), can iterate over pages of documents.
 */
export interface PagedAnalyzeHealthcareEntitiesResult
  extends PagedAsyncIterableAnalyzeHealthcareEntitiesResult {
  /**
   * Statistics about the input document batch and how it was processed
   * by the service. This property will have a value when includeStatistics is set to true
   * in the client call.
   */
  statistics?: TextDocumentBatchStatistics;
  /**
   * The version of the text analytics model used by this operation on this
   * batch of input documents.
   */
  modelVersion: string;
}

/**
 * Creates a user-friendly healthcare entity represented as a node in a graph
 * @param entity - the healthcare entity returned by the service
 * @internal
 * @hidden
 */
function makeHealthcareEntitiesWithoutNeighbors(
  entity: GeneratedHealthcareEntity
): HealthcareEntity {
  const { category, confidenceScore, isNegated, offset, text, links, subCategory, length } = entity;
  return {
    category,
    confidenceScore,
    isNegated,
    offset,
    length,
    text,
    subCategory,
    dataSources:
      links?.map(({ dataSource, id }): EntityDataSource => ({ name: dataSource, entityId: id })) ??
      [],
    // initialize the neighbors map to be filled later.
    relatedEntities: new Map()
  };
}

/**
 * Connects input healthcare entities as a graph according to the relationship
 * information the service sent.
 * @param entities - healthcare entities represented as isolated nodes
 * @param relations - relationship information between pairs of healthcare entities
 *                  - using JSON pointers
 * @internal
 * @hidden
 */
function makeHealthcareEntitiesGraph(
  entities: HealthcareEntity[],
  relations: HealthcareRelation[]
): void {
  for (const relation of relations) {
    const relationType = relation.relationType;
    const sourceIndex = parseHealthcareEntityIndex(relation.source);
    const targetIndex = parseHealthcareEntityIndex(relation.target);
    const sourceEntity = entities[sourceIndex];
    const targetEntity = entities[targetIndex];
    if (isHealthcareEntityRelationType(relationType)) {
      sourceEntity.relatedEntities.set(targetEntity, relationType);
      if (relation.bidirectional) {
        targetEntity.relatedEntities.set(sourceEntity, relationType);
      }
    } else {
      throw new Error(`Unrecognized healthcare entity relation type: ${relationType}`);
    }
  }
}

/**
 * Creates a healthcare entity in the convenience layer from the one sent by the service.
 * @param document - incoming results sent by the service for a particular document
 * @internal
 * @hidden
 */
export function makeHealthcareEntitiesResult(
  document: DocumentHealthcareEntities
): AnalyzeHealthcareEntitiesSuccessResult {
  const { id, entities, relations, warnings, statistics } = document;
  const newEntities = entities.map(makeHealthcareEntitiesWithoutNeighbors);
  makeHealthcareEntitiesGraph(newEntities, relations);
  return {
    ...makeTextAnalyticsSuccessResult(id, warnings, statistics),
    entities: newEntities
  };
}
