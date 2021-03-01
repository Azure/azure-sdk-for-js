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
  HealthcareRelationEntity
} from "./generated/models";
import {
  makeTextAnalyticsErrorResult,
  makeTextAnalyticsSuccessResult,
  TextAnalyticsErrorResult,
  TextAnalyticsSuccessResult
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
   * Whether the entity is negated.
   */
  assertion?: HealthcareAssertion;
  /**
   * Entity references in known data sources.
   */
  dataSources: EntityDataSource[];
  /**
   * Other healthcare entities related to the current one. It is a directed
   * relationship where the current entity is the source and the entities in
   * the map are the target.
   */
  relatedEntities: Map<HealthcareEntity, string>;
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
  role: HealthcareEntityRelationRoleType;
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
  const { category, confidenceScore, assertion, offset, text, links, subCategory, length } = entity;
  return {
    category,
    confidenceScore,
    assertion,
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
 */
function makeHealthcareEntitiesGraph(
  entities: HealthcareEntity[],
  relations: HealthcareRelation[]
): void {
  for (const relation of relations) {
    const attributeEntities: HealthcareEntity[] = [];
    const targetEntities: HealthcareEntity[] = [];
    for (const entity of relation.entities) {
      const index = parseHealthcareEntityIndex(entity.ref);
      if (entity.role === "Attribute") {
        attributeEntities.push(entities[index]);
      } else {
        targetEntities.push(entities[index]);
      }
    }
    // Entities with the role Attribute are the source of the relation (causation)
    // and other entities in the relation are caused by them.
    // For example: "High blood sugar leads to high blood pressure" – In this
    // case two symptoms are related to one another, but one is an attribute
    // (or causation) that leads to another.
    targetEntities.map((targetEntity: HealthcareEntity) => {
      attributeEntities.map((attributeEntity: HealthcareEntity) => {
        attributeEntity.relatedEntities.set(targetEntity, relation.relationType);
      });
    });
  }
}

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
          role: role.role
        })
      )
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
  makeHealthcareEntitiesGraph(newEntities, relations);
  return {
    ...makeTextAnalyticsSuccessResult(id, warnings, statistics),
    entities: newEntities,
    entityRelations: makeHealthcareRelations(newEntities, relations)
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
