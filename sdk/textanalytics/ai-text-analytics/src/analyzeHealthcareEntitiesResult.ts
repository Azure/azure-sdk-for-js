// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  DocumentHealthcareEntities,
  Entity,
  HealthcareRelation,
  TextDocumentBatchStatistics,
  HealthcareEntity as GeneratedHealthcareEntity,
  TextAnalyticsError,
  HealthcareAssertion,
  RelationType,
  HealthcareRelationEntity,
  HealthcareEntityCategory,
} from "./generated/models";
import {
  makeTextAnalyticsErrorResult,
  makeTextAnalyticsSuccessResult,
  TextAnalyticsErrorResult,
  TextAnalyticsSuccessResult,
} from "./textAnalyticsResult";
import { parseHealthcareEntityIndex } from "./util";

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
   * Normalized name for the entity. For example, the normalized text for "histologically" is "histologic".
   */
  normalizedText?: string;
  /**
   * Whether the entity is negated.
   */
  assertion?: HealthcareAssertion;
  /**
   * Entity references in known data sources.
   */
  dataSources: EntityDataSource[];
  /**
   * Defines values for HealthcareEntityCategory.
   * {@link KnownHealthcareEntityCategory} can be used interchangeably with HealthcareEntityCategory,
   *  this enum contains the known values that the service supports.
   * ### Known values supported by the service
   * **BODY_STRUCTURE**
   * **AGE**
   * **GENDER**
   * **EXAMINATION_NAME**
   * **DATE**
   * **DIRECTION**
   * **FREQUENCY**
   * **MEASUREMENT_VALUE**
   * **MEASUREMENT_UNIT**
   * **RELATIONAL_OPERATOR**
   * **TIME**
   * **GENE_OR_PROTEIN**
   * **VARIANT**
   * **ADMINISTRATIVE_EVENT**
   * **CARE_ENVIRONMENT**
   * **HEALTHCARE_PROFESSION**
   * **DIAGNOSIS**
   * **SYMPTOM_OR_SIGN**
   * **CONDITION_QUALIFIER**
   * **MEDICATION_CLASS**
   * **MEDICATION_NAME**
   * **DOSAGE**
   * **MEDICATION_FORM**
   * **MEDICATION_ROUTE**
   * **FAMILY_RELATION**
   * **TREATMENT_NAME**
   */
  category: HealthcareEntityCategory;
}

/**
 * The type of different roles a healthcare entity can play in a relation.
 */
export type HealthcareEntityRelationRoleType = string;

/**
 * A healthcare entity that plays a specific role in a relation.
 */
export interface HealthcareEntityRelationRole {
  /**
   * A healthcare entity
   */
  entity: HealthcareEntity;
  /**
   * The role of the healthcare entity in a particular relation.
   */
  name: HealthcareEntityRelationRoleType;
}

/**
 * A relationship between two or more healthcare entities.
 */
export interface HealthcareEntityRelation {
  /**
   * The type of the healthcare relation.
   */
  relationType: RelationType;
  /**
   * The list of healthcare entities and their roles in the healthcare relation.
   */
  roles: HealthcareEntityRelationRole[];
}

/**
 * The results of a successful healthcare operation for a single document.
 */
export interface AnalyzeHealthcareEntitiesSuccessResult extends TextAnalyticsSuccessResult {
  /**
   * Healthcare entities.
   */
  entities: HealthcareEntity[];
  /**
   * Relations between healthcare entities.
   */
  entityRelations: HealthcareEntityRelation[];
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
 */
function makeHealthcareEntitiesWithoutNeighbors(
  entity: GeneratedHealthcareEntity
): HealthcareEntity {
  const { category, confidenceScore, assertion, offset, text, links, subcategory, length, name } =
    entity;
  return {
    category,
    confidenceScore,
    assertion,
    offset,
    length,
    text,
    normalizedText: name,
    subCategory: subcategory,
    dataSources:
      links?.map(({ dataSource, id }): EntityDataSource => ({ name: dataSource, entityId: id })) ??
      [],
  };
}

/**
 * @internal
 */
function makeHealthcareRelations(
  entities: HealthcareEntity[],
  relations: HealthcareRelation[]
): HealthcareEntityRelation[] {
  return relations.map(
    (relation: HealthcareRelation): HealthcareEntityRelation => ({
      relationType: relation.relationType,
      roles: relation.entities.map(
        (role: HealthcareRelationEntity): HealthcareEntityRelationRole => ({
          entity: entities[parseHealthcareEntityIndex(role.ref)],
          name: role.role,
        })
      ),
    })
  );
}

/**
 * Creates a healthcare entity in the convenience layer from the one sent by the service.
 * @param document - incoming results sent by the service for a particular document
 * @internal
 */
export function makeHealthcareEntitiesResult(
  document: DocumentHealthcareEntities
): AnalyzeHealthcareEntitiesSuccessResult {
  const { id, entities, relations, warnings, statistics } = document;
  const newEntities = entities.map(makeHealthcareEntitiesWithoutNeighbors);
  return {
    ...makeTextAnalyticsSuccessResult(id, warnings, statistics),
    entities: newEntities,
    entityRelations: makeHealthcareRelations(newEntities, relations),
  };
}

/**
 * @internal
 */
export function makeHealthcareEntitiesErrorResult(
  id: string,
  error: TextAnalyticsError
): AnalyzeHealthcareEntitiesErrorResult {
  return makeTextAnalyticsErrorResult(id, error);
}
