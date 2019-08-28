import * as chai from "chai";
import { LUISAuthoringClient } from "../../src/lUISAuthoringClient";
import { BaseTest } from "../baseTest";
import { HierarchicalEntityExtractor } from "../../src/models";


describe("model Module Functionality", () => {
    it('should list composite entities', async () => {
        await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
            let childEntity = await client.model.addPrebuilt(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, ["datetimeV2"]);
            let entityId = await client.model.addCompositeEntity(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, { children: ["datetimeV2"], name: "CompositeTest" });
            let result = await client.model.listCompositeEntities(BaseTest.GlobalAppId, BaseTest.GlobalVersionId);
            await client.model.deleteCompositeEntity(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, entityId.body);
            await client.model.deletePrebuilt(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, childEntity[0].id);
            chai.expect(result).not.to.be.null;
        });
    });

    it('should add composite entity', async () => {
        await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
            let childEntity = await client.model.addPrebuilt(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, ["datetimeV2"]);
            let result = await client.model.addCompositeEntity(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, { name: "CompositeTest", children: ["datetimeV2"] });
            await client.model.deleteCompositeEntity(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, result.body);
            await client.model.deletePrebuilt(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, childEntity[0].id);

            chai.expect(result.body != BaseTest.EmptyId);

        });

    });

    it('should get composite entity', async () => {
        await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
            let childEntity = await client.model.addPrebuilt(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, ["datetimeV2"]);
            let entityId = await client.model.addCompositeEntity(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, { children: ["datetimeV2"], name: "CompositeTest" });
            let result = await client.model.getCompositeEntity(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, entityId.body);
            await client.model.deleteCompositeEntity(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, entityId.body);
            await client.model.deletePrebuilt(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, childEntity[0].id);
            chai.expect(result.id).not.to.eql(BaseTest.EmptyId);
        });

    });

    it('should update composite entity', async () => {
        await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
            let childEntity = await client.model.addPrebuilt(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, ["datetimeV2"]);
            let entityId = await client.model.addCompositeEntity(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, { children: ["datetimeV2"], name: "CompositeTest" });
            await client.model.updateCompositeEntity(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, entityId.body, { children: ["datetimeV2"], name: "CompositeTestUpdate" });

            let entities = await client.model.listCompositeEntities(BaseTest.GlobalAppId, BaseTest.GlobalVersionId);
            await client.model.deleteCompositeEntity(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, entityId.body);
            await client.model.deletePrebuilt(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, childEntity[0].id);

            chai.expect(BaseTest.doesListContain(entities, "id", entityId.body)).to.be.true;
            chai.expect(BaseTest.doesListContain(entities, "name", "CompositeTestUpdate"));
        });


    });

    it('should delete composite entity', async () => {
        await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
            let childEntity = await client.model.addPrebuilt(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, ["datetimeV2"]);
            let entityId = await client.model.addCompositeEntity(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, { name: "CompositeTest", children: [childEntity[0].name] });
            await client.model.deleteCompositeEntity(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, entityId.body);
            let entities = await client.model.listCompositeEntities(BaseTest.GlobalAppId, BaseTest.GlobalVersionId);
            await client.model.deletePrebuilt(BaseTest.GlobalAppId, "0.1", childEntity[0].id);
            chai.expect(BaseTest.doesListContain(entities, "id", entityId.body)).to.be.false;
        });
    });

    it('should add composite entity child', async () => {
        await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
            let childEntityId = await client.model.addEntity(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, { name: "ChildTest" });
            let childEntityId2 = await client.model.addEntity(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, { name: "ChildTest2" });
            let entityId = await client.model.addCompositeEntity(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, { children: ["ChildTest"], name: "CompositeTest" });
            let result = await client.model.addCompositeEntityChild(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, entityId.body, { name: "ChildTest2" });
            await client.model.deleteCompositeEntity(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, entityId.body);
            await client.model.deleteEntity(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, childEntityId.body);
            await client.model.deleteEntity(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, childEntityId2.body);
            chai.expect(result.body != BaseTest.EmptyId);
        });

    });


    it('should delete composite entity child', async () => {
        await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
            let childEntity = await client.model.addPrebuilt(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, ["datetimeV2"]);
            let childEntity2 = await client.model.addPrebuilt(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, ["number"]);
            let entityId = await client.model.addCompositeEntity(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, { children: [childEntity[0].name, childEntity2[0].name], name: "CompositeTest" });
            let childEntityId = childEntity2[0].id;

            await client.model.deleteCompositeEntityChild(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, entityId.body, childEntityId);

            let entities = await client.model.listCompositeEntities(BaseTest.GlobalAppId, BaseTest.GlobalVersionId);
            await client.model.deleteCompositeEntity(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, entityId.body);

            await client.model.deletePrebuilt(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, childEntity[0].id);
            await client.model.deletePrebuilt(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, childEntity2[0].id);

            let found = false;
            for (let e of entities)
                for (let c of e.children)
                    if (e.id == entityId.body && c.id == childEntityId)
                        found = true;
            chai.expect(found).to.be.false;
        });

    });

    it('should list hierarchical entities', async () => {
        await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
            let entityId = await client.model.addHierarchicalEntity(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, { children: ["ChildTest"], name: "HierarchicalTest" });
            let result = await client.model.listHierarchicalEntities(BaseTest.GlobalAppId, BaseTest.GlobalVersionId);
            await client.model.deleteHierarchicalEntity(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, entityId.body);
            chai.expect(result).to.not.empty;
        });

    });

    it('should add hierarchical entity', async () => {
        await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
            let entityId = await client.model.addHierarchicalEntity(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, { children: ["ChildTest"], name: "HierarchicalTest" });
            await client.model.deleteHierarchicalEntity(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, entityId.body);

            chai.expect(entityId.body).not.to.eql(BaseTest.EmptyId);
        });

    });

    it('should get hierarchical entity', async () => {
        await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
            let entityId = await client.model.addHierarchicalEntity(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, { children: ["ChildTest"], name: "HierarchicalTest" });
            let result = await client.model.getHierarchicalEntity(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, entityId.body);
            await client.model.deleteHierarchicalEntity(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, entityId.body);

            chai.expect(result.id).not.to.eql(BaseTest.EmptyId);
        });

    });

    it('should update hierarchical entity', async () => {
        await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
            let entityId = await client.model.addHierarchicalEntity(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, { children: ["ChildTest"], name: "HierarchicalTest" });
            await client.model.updateHierarchicalEntity(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, entityId.body, { children: ["ChildTest"], name: "HierarchicalTestUpdate" });
            let entities = await client.model.listHierarchicalEntities(BaseTest.GlobalAppId, BaseTest.GlobalVersionId);
            await client.model.deleteHierarchicalEntity(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, entityId.body);

            chai.expect(BaseTest.doesListContain(entities, "id", entityId.body)).to.be.true;
            chai.expect(BaseTest.doesListContain(entities, "name", "HierarchicalTestUpdate")).to.be.true;
        });

    });

    it('should delete hierarchical entity', async () => {
        await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
            let entityId = await client.model.addHierarchicalEntity(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, { children: ["ChildTest"], name: "HierarchicalTest" });
            let entities = await client.model.listHierarchicalEntities(BaseTest.GlobalAppId, BaseTest.GlobalVersionId);
            await client.model.deleteHierarchicalEntity(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, entityId.body);

            entities = await client.model.listHierarchicalEntities(BaseTest.GlobalAppId, BaseTest.GlobalVersionId);
            chai.expect(BaseTest.doesListContain(entities, "id", entityId.body)).to.be.false;
        });

    });

    it('should get hierarchical entity child', async () => {
        await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
            let entityId = await client.model.addHierarchicalEntity(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, { children: ["ChildTest"], name: "HierarchicalTest" });
            let entity = await client.model.getHierarchicalEntity(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, entityId.body);
            let result = await client.model.getHierarchicalEntityChild(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, entityId.body, entity.children[0].id);
            await client.model.deleteHierarchicalEntity(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, entityId.body);

            chai.expect(result.id).not.to.eql(BaseTest.EmptyId);

        });

    });

    it('should delete hierarchical entity child', async () => {
        await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
            let entityId = await client.model.addHierarchicalEntity(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, { children: ["ChildTest", "AnotherChildTest"], name: "HierarchicalTest" });
            let list = (await client.model.listHierarchicalEntities(BaseTest.GlobalAppId, BaseTest.GlobalVersionId));
            let entity: HierarchicalEntityExtractor = null;
            for (let o of list)
                if (o.id == entityId.body)
                    entity = o;
            let childEntityId = entity.children[0].id;
            await client.model.deleteHierarchicalEntityChild(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, entityId.body, childEntityId);
            let entities = await client.model.listHierarchicalEntities(BaseTest.GlobalAppId, BaseTest.GlobalVersionId);
            await client.model.deleteHierarchicalEntity(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, entityId.body);
            let found = false;
            for (let e of entities)
                for (let c of e.children)
                    if (e.id == entityId.body && c.id == childEntityId)
                        found = true;
            chai.expect(found).to.be.false;
        });
    });

    it('should update hierarchical entity child', async () => {
        await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
            let entityId = await client.model.addHierarchicalEntity(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, { children: ["ChildTest"], name: "HierarchicalTest" });
            let entity = await client.model.getHierarchicalEntity(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, entityId.body);
            let childEntity = entity.children[entity.children.length - 1];

            await client.model.updateHierarchicalEntityChild(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, entity.id, childEntity.id, { name: "RenamedChildEntity" });

            let entities = await client.model.listHierarchicalEntities(BaseTest.GlobalAppId, BaseTest.GlobalVersionId);
            await client.model.deleteHierarchicalEntity(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, entityId.body);

            let _entity: HierarchicalEntityExtractor = null;
            for (let e of entities) {
                if (e.id == entity.id) {
                    _entity = e;
                }
            }
            let _childEntity = null;
            for (let c of _entity.children) {
                if (c.id == childEntity.id)
                    _childEntity = c;
            }
            chai.expect(_childEntity.name).to.eql("RenamedChildEntity");
        });
    });

    it('should add hierarchical entity child', async () => {
        await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
            let entityId = await client.model.addHierarchicalEntity(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, { children: ["ChildTest"], name: "HierarchicalTest" });

            let result = await client.model.addHierarchicalEntityChild(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, entityId.body, { name: "NewChildEntity" });
            await client.model.deleteHierarchicalEntity(BaseTest.GlobalAppId, BaseTest.GlobalVersionId, entityId.body);

            chai.expect(result.body).not.to.eql(BaseTest.EmptyId);

        });
    });

    it('should list models', async () => {
        await BaseTest.useClientFor(async (client: LUISAuthoringClient) => {
            let versionId = BaseTest.GlobalVersionId;
            let entities = await client.model.listModels(BaseTest.GlobalAppId, versionId);
            for (let entity of entities) {
                let entityInfo = await client.model.getEntity(BaseTest.GlobalAppId, versionId, entity.id);
                chai.expect(entity.name).to.eql(entityInfo.name);
            }
        });
    });

});
