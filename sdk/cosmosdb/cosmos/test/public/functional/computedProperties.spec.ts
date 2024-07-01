// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import assert from "assert";
import { ComputedProperty } from "../../../src/documents/ComputedProperty";
import { IndexingPolicy } from "../../../src/documents/IndexingPolicy";
import { createOrUpsertItem, getTestDatabase, removeAllDatabases } from "../common/TestHelpers";
import { Container } from "../../../src/client/Container/Container";

// As of the current emulator release (March 23), computed properties are not supported,
// hence, we are temporarily excluding these tests.
describe.skip("Computed Properties test", async () => {
  let lowerName: ComputedProperty;
  let parentsFullName: ComputedProperty;
  let allComputedProperties: ComputedProperty[];

  let indexAllComputedPropertiesIncludeAll: IndexingPolicy;
  let indexAllComputedProperties_ExcludeAll: IndexingPolicy;
  let indexDefaultIncludeAll: IndexingPolicy;
  let indexDefaultExcludeAll: IndexingPolicy;

  let selectAllComputedPropertiesQuery: string;
  let allComputedPropertiesResult: any;
  let emptyResult: any;
  let sampleItems: any;
  before(async function () {
    lowerName = {
      name: "lowerLastName",
      query:
        "SELECT VALUE LOWER(IS_DEFINED(c.lastName) ? c.lastName : c.parents[0].familyName) FROM c",
    };
    parentsFullName = {
      name: "parentsFullName",
      query:
        "SELECT VALUE CONCAT(CONCAT(c.parents[0].firstName, ' ', c.lastName), ' & ', CONCAT(c.parents[1].firstName, ' ', c.lastName)) FROM c",
    };
    allComputedProperties = [lowerName, parentsFullName];

    indexAllComputedPropertiesIncludeAll = {
      includedPaths: [
        { path: `/${lowerName.name}/*` },
        { path: `/${parentsFullName.name}/*` },
        { path: `/*` },
      ],
    };
    indexAllComputedProperties_ExcludeAll = {
      includedPaths: [{ path: `/${lowerName.name}/*` }, { path: `/${parentsFullName.name}/*` }],
      excludedPaths: [{ path: `/*` }],
    };
    indexDefaultIncludeAll = {
      includedPaths: [{ path: `/*` }],
    };

    indexDefaultExcludeAll = {
      excludedPaths: [{ path: `/*` }],
    };

    selectAllComputedPropertiesQuery = `SELECT c.${lowerName.name}, c.${parentsFullName.name} FROM c`;

    const andersenFamily = {
      id: "AndersenFamily",
      lastName: "Andersen",
      parents: [{ firstName: "Thomas" }, { firstName: "Mary Kay" }],
      children: [
        {
          firstName: "Henriette Thaulow",
          gender: "female",
          grade: 5,
          pets: [{ givenName: "Fluffy" }],
        },
      ],
      address: { state: "WA", county: "King", city: "seattle" },
      creationDate: 1431620472,
      isRegistered: true,
      _rid: "0fomAIxnukU1AQAAAAAAAA==",
    };

    const wakefieldFamily = {
      id: "WakefieldFamily",
      parents: [
        { familyName: "Wakefield", givenName: "Robin" },
        { familyName: "Miller", givenName: "Ben" },
      ],
      children: [
        {
          familyName: "Merriam",
          givenName: "Jesse",
          gender: "female",
          grade: 1,
          pets: [{ givenName: "Goofy" }, { givenName: "Shadow" }],
        },
        {
          familyName: "Miller",
          givenName: "Lisa",
          gender: "female",
          grade: 8,
        },
      ],
      address: { state: "NY", county: "Manhattan", city: "NY" },
      creationDate: 1431620462,
      isRegistered: false,
      _rid: "0fomAIxnukU1AQAAAAAAAB==",
    };

    sampleItems = [andersenFamily, wakefieldFamily];

    emptyResult = [{}, {}];
    allComputedPropertiesResult = [
      {
        lowerLastName: "andersen",
        parentsFullName: "Thomas Andersen & Mary Kay Andersen",
      },
      {
        lowerLastName: "wakefield",
      },
    ];
  });

  beforeEach(async function () {
    await removeAllDatabases();
  });

  it("empty computed property", async function () {
    // create container
    const container: Container = await createContainer("empty computed property", []);
    const { resources: results } = await container.items
      .query(selectAllComputedPropertiesQuery)
      .fetchAll();
    assert.deepStrictEqual(results, emptyResult);
  });

  it("all computed properties, no indexing", async function () {
    const container: Container = await createContainer(
      "all computed properties",
      allComputedProperties,
    );
    const { resources: results } = await container.items
      .query(selectAllComputedPropertiesQuery)
      .fetchAll();
    assert.deepStrictEqual(results, allComputedPropertiesResult);
  });

  it("all computed properties, indexed, exclude /*", async function () {
    const container: Container = await createContainer(
      "all computed properties, indexed, exclude all",
      allComputedProperties,
      indexAllComputedProperties_ExcludeAll,
    );
    const { resources: results } = await container.items
      .query(selectAllComputedPropertiesQuery)
      .fetchAll();
    assert.deepStrictEqual(results, allComputedPropertiesResult);
  });

  it("all computed properties, indexed, include /*", async function () {
    const container: Container = await createContainer(
      "all computed properties, indexed, include all",
      allComputedProperties,
      indexAllComputedPropertiesIncludeAll,
    );
    const { resources: results } = await container.items
      .query(selectAllComputedPropertiesQuery)
      .fetchAll();
    assert.deepStrictEqual(results, allComputedPropertiesResult);
  });

  it("all computed properties, not indexed, exclude /*", async function () {
    const container: Container = await createContainer(
      "all computed properties, not indexed, exclude all",
      allComputedProperties,
      indexDefaultExcludeAll,
    );
    const { resources: results } = await container.items
      .query(selectAllComputedPropertiesQuery)
      .fetchAll();
    assert.deepStrictEqual(results, allComputedPropertiesResult);
  });

  it("all computed properties, not indexed, include /*", async function () {
    const container: Container = await createContainer(
      "all computed properties, not indexed, include all",
      allComputedProperties,
      indexDefaultIncludeAll,
    );
    const { resources: results } = await container.items
      .query(selectAllComputedPropertiesQuery)
      .fetchAll();
    assert.deepStrictEqual(results, allComputedPropertiesResult);
  });

  // replace test
  it("replace computed property for a contianer", async function () {
    const database = await getTestDatabase("sample database");
    // create container
    const { resource: containerdef } = await database.containers.createIfNotExists({
      id: "replace computed property for a contianer",
      computedProperties: [lowerName],
      indexingPolicy: indexDefaultIncludeAll,
    });
    const container: Container = database.container(containerdef.id);
    await createOrUpsertItem(container, sampleItems[0], undefined, false);
    await createOrUpsertItem(container, sampleItems[1], undefined, false);
    const { resources: results1 } = await container.items
      .query(selectAllComputedPropertiesQuery)
      .fetchAll();
    const output1 = [
      {
        lowerLastName: "andersen",
      },
      {
        lowerLastName: "wakefield",
      },
    ];

    assert.deepStrictEqual(results1, output1);
    containerdef.computedProperties = [parentsFullName];
    await container.replace(containerdef);
    const { resources: results2 } = await container.items
      .query(selectAllComputedPropertiesQuery)
      .fetchAll();
    const output2 = [
      {
        parentsFullName: "Thomas Andersen & Mary Kay Andersen",
      },
      {},
    ];
    assert.deepStrictEqual(results2, output2);
  });

  it("delete computed property for a contianer", async function () {
    const database = await getTestDatabase("sample database");
    // create container
    const { resource: containerdef } = await database.containers.createIfNotExists({
      id: "delete computed property for a container",
      computedProperties: [lowerName],
      indexingPolicy: indexDefaultIncludeAll,
    });
    const container: Container = database.container(containerdef.id);
    await createOrUpsertItem(container, sampleItems[0], undefined, false);
    await createOrUpsertItem(container, sampleItems[1], undefined, false);
    const { resources: results1 } = await container.items
      .query(selectAllComputedPropertiesQuery)
      .fetchAll();
    const output1 = [
      {
        lowerLastName: "andersen",
      },
      {
        lowerLastName: "wakefield",
      },
    ];

    assert.deepStrictEqual(results1, output1);
    containerdef.computedProperties = [];
    await container.replace(containerdef);
    const { resources: results2 } = await container.items
      .query(selectAllComputedPropertiesQuery)
      .fetchAll();
    assert.deepStrictEqual(results2, emptyResult);
  });

  async function createContainer(
    containerName: string,
    computedProperties: ComputedProperty[],
    indexingPolicy?: IndexingPolicy,
  ) {
    const database = await getTestDatabase("sample database");
    // create container
    const { resource: containerdef } = await database.containers.createIfNotExists({
      id: containerName,
      computedProperties: computedProperties,
      indexingPolicy: indexingPolicy,
    });
    const container: Container = database.container(containerdef.id);
    await createOrUpsertItem(container, sampleItems[0], undefined, false);
    await createOrUpsertItem(container, sampleItems[1], undefined, false);
    return container;
  }
});
