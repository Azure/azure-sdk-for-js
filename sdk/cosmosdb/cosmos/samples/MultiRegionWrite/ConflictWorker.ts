// tslint:disable:no-console

import { v4 as guid } from "uuid";
import { Container, CosmosClient, Item, ItemDefinition, ItemResponse, Items } from "../../lib";
import { ItemBody } from "../../lib/client/Item/ItemBody";
import { Constants, StatusCodes } from "../../lib/common";
import logger from "./logger";
import lwwSprocDef from "./lwwSprocDef";

export class ConflictWorker {
  private readonly clients: Map<string, CosmosClient> = new Map();
  constructor(
    private readonly databaseName: string,
    private readonly basicContainerName: string,
    private readonly manualContainerName: string,
    private readonly lwwContainerName: string,
    private readonly udpContainerName: string
  ) {}

  public addClient(region: string, client: CosmosClient) {
    this.clients.set(region, client);
  }

  public async init(): Promise<void> {
    const createClient = this.clients.values().next().value;

    const { database } = await createClient.databases.createIfNotExists({ id: this.databaseName });
    const { container: basicContainer } = await database.containers.createIfNotExists({ id: this.basicContainerName });
    const { container: manualContainer } = await database.containers.createIfNotExists({
      id: this.manualContainerName,
      conflictResolutionPolicy: {
        mode: "Custom"
      }
    });
    const { container: lwwContainer } = await database.containers.createIfNotExists({
      id: this.lwwContainerName,
      conflictResolutionPolicy: {
        mode: "LastWriterWins",
        conflictResolutionPath: "/regionId"
      }
    });
    const { container: udpContainer } = await database.containers.createIfNotExists({
      id: this.udpContainerName,
      conflictResolutionPolicy: {
        mode: "Custom",
        conflictResolutionProcedure: `dbs/${this.databaseName}/colls/${this.udpContainerName}/sprocs/resolver`
      }
    });

    // See ./lwwSprocDef for the stored procedure definition include the logic
    const { sproc: lwwSproc } = await udpContainer.storedProcedures.upsert(lwwSprocDef);
  }

  public async RunManualConflict() {
    console.log("Insert Conflict");
    await this.RunInsertConflictonManual();

    console.log("Update Conflict");
    await this.RunUpdateConflictOnManual();

    console.log("Delete Conflict");
    await this.RunDeleteConflictOnManual();
  }

  public async RunLWWConflict() {
    console.log("Insert Conflict");
    await this.RunInsertConflictOnLWW();

    console.log("Update Conflict");
    await this.RunUpdateConflictOnLWW();

    console.log("Delete Conflict");
    await this.RunDeleteConflictOnLWW();
  }

  public async RunUDP() {
    console.log("Insert Conflict");
    await this.RunInsertConflictOnUdp();

    console.log("Update Conflict");
    await this.RunUpdateConflictOnUdp();

    console.log("Delete Conflict");
    await this.RunDeleteConflictsOnUdp();
  }

  private async RunInsertConflictonManual() {
    do {
      let p = logger(
        `Performing conflicting insert across ${this.clients.size} regions on ${this.manualContainerName}`
      ).start();
      try {
        const insertTask: Array<Promise<ItemDefinition>> = [];
        const itemBase = { id: guid() };

        let index = 0;
        for (const [clientRegion, client] of this.clients.entries()) {
          const container = client.database(this.databaseName).container(this.manualContainerName);
          const newDef = { regionId: index++, regionEndpoint: clientRegion, ...itemBase }; // TODO: ReadEndpoint?
          insertTask.push(this.tryInsertItem(container.items, newDef));
        }

        const items = await Promise.all(insertTask);
        p.succeed();

        const numberOfConflicts = items.reduce<number>((prev, curr) => (curr !== null ? ++prev : prev), 0);

        if (numberOfConflicts > 1) {
          p = logger(`Caused ${numberOfConflicts}, verifying conflict resolution`).succeed();

          for (const item of items) {
            if (item !== null) {
              await this.validateAllManualConflict(item);
            }
          }
          break;
        } else {
          console.log("Retrying insert to induce conflicts");
        }
      } catch (err) {
        p.fail();
        throw err;
      }
    } while (true);
  }

  private async RunUpdateConflictOnManual() {
    let retryCount = 5;
    do {
      const itemBase = { id: guid() };

      const [initialRegionName, initialClient] = this.clients.entries().next().value;
      const container = initialClient.database(this.databaseName).container(this.manualContainerName);
      const item = { regionId: 0, regionEndpoint: initialRegionName, ...itemBase }; // TODO: ReadEndpoint?
      const { body: newItemDef } = await container.items.create(item);

      await this.sleep(1000); // 1 second for the write to sync

      console.log(
        `1) Performing conflicting update across ${this.clients.size} regions on ${this.manualContainerName}`
      );

      const updates: Array<Promise<ItemDefinition>> = [];
      let index = 0;
      for (const [regionName, client] of this.clients.entries()) {
        const newDef = {
          regionId: index++,
          regionName,
          ...itemBase,
          _etag: newItemDef._etag
        };
        updates.push(
          this.tryUpdateItem(
            client
              .database(this.databaseName)
              .container(this.manualContainerName)
              .item(itemBase.id),
            newDef
          )
        );
      }

      const updatedItems = await Promise.all(updates);
      const numberOfConflicts = updatedItems.reduce((p: number, c: ItemDefinition) => (c !== null ? ++p : p), -1);
      if (numberOfConflicts > 0) {
        console.log(`2) Caused ${numberOfConflicts} update conflicts, verifying conflict resolution`);

        for (const updatedItem of updatedItems) {
          if (updatedItem) {
            await this.validateAllManualConflict(updatedItem);
          }
        }
        return;
      } else {
        console.log(`Found ${numberOfConflicts} - retrying to create more conflicts`);
      }
    } while (retryCount--);
    console.error("Could not enduce an update conflict for manual conflict resolution");
  }

  private async RunDeleteConflictOnManual() {
    do {
      const itemBase = { id: guid() };

      const [initialRegionName, initialClient] = this.clients.entries().next().value;
      const container = initialClient.database(this.databaseName).container(this.manualContainerName);
      const item = { regionId: 0, regionEndpoint: initialRegionName, ...itemBase }; // TODO: ReadEndpoint?
      const { body: newItemDef } = await container.items.create(item);

      await this.sleep(1000); // 1 second for the write to sync

      console.log(
        `1) Performing conflicting delete across ${this.clients.size} regions on ${this.manualContainerName}`
      );

      const deletes: Array<Promise<ItemDefinition>> = [];
      let index = 0;
      for (const [regionName, client] of this.clients.entries()) {
        const newDef = { regionId: index++, regionName, ...itemBase, _etag: newItemDef._etag, _rid: newItemDef._rid };
        deletes.push(
          this.tryDeleteItem(
            client
              .database(this.databaseName)
              .container(this.manualContainerName)
              .item(itemBase.id),
            newDef
          )
        );
      }

      const deletedItems = await Promise.all(deletes);
      const numberOfConflicts = deletedItems.reduce((p: number, c: ItemDefinition) => (c !== null ? ++p : p), -1);
      if (numberOfConflicts > 1) {
        console.log(`2) Caused ${numberOfConflicts} delete conflicts, verifying conflict resolution`);

        await this.validateLWW(deletedItems, true); // LWW deletes and manual deletes are handled the same

        break;
      } else {
        console.warn("Retrying update/delete to induce conflicts");
      }
    } while (true);
  }

  private async validateAllManualConflict(item: ItemDefinition) {
    let conflictExists = false;
    for (const [conflictRegion, client] of this.clients.entries()) {
      conflictExists = await this.validateManualConflict(conflictRegion, client, item);
    }

    if (conflictExists) {
      await this.DeleteConflict(item);
    }
  }

  private async validateManualConflict(clientRegion: string, client: CosmosClient, item: ItemDefinition) {
    while (true) {
      const container = client.database(this.databaseName).container(this.manualContainerName);

      const { result: conflicts } = await container.conflicts.readAll().toArray();

      for (const conflict of conflicts) {
        if (conflict.operationType !== Constants.OperationTypes.Delete) {
          const content = JSON.parse(conflict.content as any);
          if (item.id !== content.id) {
            continue;
          }

          if (item._rid === content._rid && item._etag === content._etag) {
            console.log(`Document from region ${item.regionId} lost conflict @ ${clientRegion}`);
            return true;
          } else {
            try {
              const winner = client.database(this.databaseName).container(this.manualContainerName);
              console.log(`Document from region ${item.regionId} won the conflict @ ${clientRegion}`);
              return false;
            } catch (err) {
              if (err.code && err.code === StatusCodes.NotFound) {
                console.log(`Item from region ${item.regionId} not found @ ${clientRegion}`);
              }
            }
          }
        } else {
          if (conflict.resourceId === item._rid) {
            console.log(`Delete conflict found @ ${clientRegion}`);
            return false;
          }
        }
      }

      console.warn(`Document ${item.id} is not found in conflict feed @ ${clientRegion}, retrying`);
      await this.sleep(500);
    }
  }

  private async RunInsertConflictOnLWW() {
    do {
      console.log(`1) Performing conflicting insert across ${this.clients.size} regions on ${this.lwwContainerName}`);

      const inserts: Array<Promise<ItemDefinition>> = [];
      const itemBase = { id: guid() };

      let index = 0;
      for (const [clientRegion, client] of this.clients.entries()) {
        const container = client.database(this.databaseName).container(this.lwwContainerName);
        const newDef = { regionId: index++, regionEndpoint: clientRegion, ...itemBase }; // TODO: ReadEndpoint?
        inserts.push(this.tryInsertItem(container.items, newDef));
      }

      const items = (await Promise.all(inserts)).filter(v => v !== null);

      if (items.length > 1) {
        console.log(`2) Caused ${items.length} insert conflicts, verifying conflict resolution`);

        await this.validateLWW(items);
        break;
      } else {
        console.warn("Retrying insert to induce conflicts");
      }
    } while (true);
  }

  private async RunUpdateConflictOnLWW() {
    let retry = 5;
    do {
      const itemBase = { id: guid() };

      const [initialRegionName, initialClient] = this.clients.entries().next().value;
      const container = initialClient.database(this.databaseName).container(this.lwwContainerName);
      const item = { regionId: 0, regionEndpoint: initialRegionName, ...itemBase }; // TODO: ReadEndpoint?
      const { body: newItemDef } = await container.items.create(item);

      await this.sleep(1000); // 1 second for the write to sync

      console.log(`1) Performing conflicting update across ${this.clients.size} regions on ${this.lwwContainerName}`);

      const updates: Array<Promise<ItemDefinition>> = [];
      let index = 0;
      for (const [regionName, client] of this.clients.entries()) {
        const newDef = { regionId: index++, regionName, ...itemBase, _etag: newItemDef._etag };
        updates.push(
          this.tryUpdateItem(
            client
              .database(this.databaseName)
              .container(this.lwwContainerName)
              .item(itemBase.id),
            newDef
          )
        );
      }

      const items = (await Promise.all(updates)).filter(v => v !== null);

      if (items.length > 1) {
        console.log(`2) Caused ${items.length} update conflicts, verifying conflict resolution`);

        await this.validateLWW(items);
        return;
      } else {
        console.warn("Retrying update to induce conflicts");
      }
    } while (retry--);
    console.error("Could not induce update conflict on LWW");
  }

  private async RunDeleteConflictOnLWW() {
    do {
      const itemBase = { id: guid() };

      const [initialRegionName, initialClient] = this.clients.entries().next().value;
      const container = initialClient.database(this.databaseName).container(this.lwwContainerName);
      const item = { regionId: 0, regionEndpoint: initialRegionName, ...itemBase }; // TODO: ReadEndpoint?
      const { body: newItemDef } = await container.items.create(item);

      await this.sleep(1000); // 1 second for the write to sync

      console.log(`1) Performing conflicting delete across ${this.clients.size} regions on ${this.lwwContainerName}`);

      const deletes: Array<Promise<ItemDefinition>> = [];
      let index = 0;
      for (const [regionName, client] of this.clients.entries()) {
        const newDef = { regionId: index++, regionName, ...itemBase, _etag: newItemDef._etag };
        if (index % 2 === 1) {
          deletes.push(
            this.tryDeleteItem(
              client
                .database(this.databaseName)
                .container(this.lwwContainerName)
                .item(itemBase.id),
              newDef
            )
          );
        } else {
          deletes.push(
            this.tryUpdateItem(
              client
                .database(this.databaseName)
                .container(this.lwwContainerName)
                .item(itemBase.id),
              newDef
            )
          );
        }
      }

      const items = (await Promise.all(deletes)).filter(v => v !== null);
      if (items.length > 2) {
        console.log(`2) Caused ${items.length} delete conflicts, verifying conflict resolution`);

        await this.validateLWW(items, true);
        break;
      } else {
        console.warn("Retrying update/delete to induce conflicts");
      }
    } while (true);
  }

  private async validateLWW(items: ItemDefinition[], hasDeleteConflict: boolean = false) {
    for (const [regionName, client] of this.clients.entries()) {
      await this.validateLWWPerClient(regionName, client, items, hasDeleteConflict);
    }
  }

  private async validateLWWPerClient(
    regionName: string,
    client: CosmosClient,
    items: ItemDefinition[],
    hasDeleteConflict: boolean
  ) {
    const container = client.database(this.databaseName).container(this.lwwContainerName);

    const { result: conflicts } = await container.conflicts.readAll().toArray();

    if (conflicts.length !== 0) {
      console.error(`Found ${conflicts.length} conflicts in the lww container`);
      return;
    }

    if (hasDeleteConflict) {
      do {
        try {
          await container.item(items[0].id).read();
        } catch (err) {
          if (err.code === StatusCodes.NotFound) {
            console.log(`Delete conflict won @ ${regionName}`);
            return;
          }
        }
        console.error(`Delete conflict for item ${items[0].id} didn't win @ ${regionName}`);
        await this.sleep(500);
      } while (true);
    }

    const winner = items.reduce((p, c) => (p.regionId <= c.regionId ? c : p), items[0]);

    console.log(`Document from region ${winner.regionId} should be the winner`);

    while (true) {
      try {
        const { body: currentItem } = await container.item(winner.id).read();

        if (currentItem.regionId === winner.regionId) {
          console.log(`Winner document from region ${currentItem.regionId} found at ${regionName}`);
          break;
        }
      } catch (err) {
        /* No op */
      }

      console.error(
        `Winning document version from region ${winner.regionId} is not found @ ${regionName}, retrying...`
      );
      await this.sleep(500);
    }
  }

  public async RunInsertConflictOnUdp() {
    do {
      console.log(`1) Performing conflicting insert across ${this.clients.size} regions on ${this.udpContainerName}`);

      const inserts: Array<Promise<ItemDefinition>> = [];
      const itemBase = { id: guid() };

      let index = 0;
      for (const [clientRegion, client] of this.clients.entries()) {
        const container = client.database(this.databaseName).container(this.udpContainerName);
        const newDef = { regionId: index++, regionEndpoint: clientRegion, ...itemBase }; // TODO: ReadEndpoint?
        inserts.push(this.tryInsertItem(container.items, newDef));
      }

      const items = (await Promise.all(inserts)).filter(v => v !== null);

      if (items.length > 1) {
        console.log(`2) Caused ${items.length} insert conflicts, verifying conflict resolution`);

        await this.validateUDP(items);
        break;
      } else {
        console.warn("Retrying insert to induce conflicts");
      }
    } while (true);
  }

  public async RunUpdateConflictOnUdp() {
    do {
      const itemBase = { id: guid() };

      const [initialRegionName, initialClient] = this.clients.entries().next().value;
      const container = initialClient.database(this.databaseName).container(this.udpContainerName);
      const item = { regionId: 0, regionEndpoint: initialRegionName, ...itemBase }; // TODO: ReadEndpoint?
      const { body: newItemDef } = await container.items.create(item);

      await this.sleep(1000); // 1 second for the write to sync

      console.log(`1) Performing conflicting update across ${this.clients.size} regions on ${this.udpContainerName}`);

      const updates: Array<Promise<ItemDefinition>> = [];
      let index = 0;
      for (const [regionName, client] of this.clients.entries()) {
        const newDef = { regionId: index++, regionName, ...itemBase, _etag: newItemDef._etag };
        updates.push(
          this.tryUpdateItem(
            client
              .database(this.databaseName)
              .container(this.udpContainerName)
              .item(itemBase.id),
            newDef
          )
        );
      }

      const items = (await Promise.all(updates)).filter(v => v !== null);

      if (items.length > 1) {
        console.log(`2) Caused ${items.length} update conflicts, verifying conflict resolution`);

        await this.validateUDP(items);
        break;
      } else {
        console.warn("Retrying update to induce conflicts");
      }
    } while (true);
  }

  public async RunDeleteConflictsOnUdp() {
    do {
      const itemBase = { id: guid() };

      const [initialRegionName, initialClient] = this.clients.entries().next().value;
      const container = initialClient.database(this.databaseName).container(this.udpContainerName);
      const item = { regionId: 0, regionEndpoint: initialRegionName, ...itemBase }; // TODO: ReadEndpoint?
      const { body: newItemDef } = await container.items.create(item);

      await this.sleep(1000); // 1 second for the write to sync

      console.log(`1) Performing conflicting delete across ${this.clients.size} regions on ${this.udpContainerName}`);

      const deletes: Array<Promise<ItemDefinition>> = [];
      let index = 0;
      for (const [regionName, client] of this.clients.entries()) {
        const newDef = { regionId: index++, regionName, ...itemBase, _etag: newItemDef._etag };
        if (index % 2 === 1) {
          deletes.push(
            this.tryDeleteItem(
              client
                .database(this.databaseName)
                .container(this.udpContainerName)
                .item(itemBase.id),
              newDef
            )
          );
        } else {
          deletes.push(
            this.tryUpdateItem(
              client
                .database(this.databaseName)
                .container(this.udpContainerName)
                .item(itemBase.id),
              newDef
            )
          );
        }
      }

      const items = (await Promise.all(deletes)).filter(v => v !== null);
      if (items.length > 2) {
        console.log(`2) Caused ${items.length} delete conflicts, verifying conflict resolution`);

        await this.validateUDP(items, true);
        break;
      } else {
        console.warn("Retrying update/delete to induce conflicts");
      }
    } while (true);
  }

  private async validateUDP(items: ItemDefinition[], hasDeleteConflict: boolean = false) {
    for (const [regionName, client] of this.clients.entries()) {
      await this.validateUDPPerClient(regionName, client, items, hasDeleteConflict);
    }
  }

  private async validateUDPPerClient(
    regionName: string,
    client: CosmosClient,
    items: ItemDefinition,
    hasDeleteConflict: boolean
  ) {
    const container = client.database(this.databaseName).container(this.udpContainerName);

    const { result: conflicts } = await container.conflicts.readAll().toArray();

    if (conflicts.length !== 0) {
      console.error(`Found ${conflicts.length} conflicts in the udp container`);
      return;
    }

    if (hasDeleteConflict) {
      do {
        try {
          const { body: shouldNotExist } = await container.item(items[0].id).read();
        } catch (err) {
          if (err.code === StatusCodes.NotFound) {
            console.log(`Delete conflict won @ ${regionName}`);
            return;
          }
        }
        console.error(`Delete conflict for item ${items[0].id} didn't win @ ${regionName}`);
        await this.sleep(500);
      } while (true);
    }

    const winner = items.reduce((p: ItemDefinition, c: ItemDefinition) => (p.regionId <= c.regionId ? c : p), items[0]);

    console.log(`Document from region ${winner.regionId} should be the winner`);

    while (true) {
      try {
        const { body: currentItem } = await container.item(winner.id).read();

        if (currentItem.regionId === winner.regionId) {
          console.log(`Winner document from region ${currentItem.regionId} found at ${regionName}`);
          break;
        }
      } catch (err) {
        /* No op */
      }

      console.error(
        `Winning document version from region ${winner.regionId} is not found @ ${regionName}, retrying...`
      );
      await this.sleep(500);
    }
  }

  private async tryInsertItem(items: Items, newDef: ItemDefinition): Promise<ItemDefinition & ItemBody> {
    try {
      return (await items.create(newDef)).body;
    } catch (err) {
      // Handle conflict error silently
      if (err.code === StatusCodes.Conflict) {
        return null;
      }
      throw err;
    }
  }

  private async tryUpdateItem(item: Item, newDef: ItemDefinition): Promise<ItemDefinition & ItemBody> {
    const time = Date.now();
    try {
      return (await item.replace(newDef, {
        accessCondition: {
          type: "IfMatch",
          condition: newDef._etag
        }
      })).body;
    } catch (err) {
      if (err.code === StatusCodes.PreconditionFailed || err.code === StatusCodes.NotFound) {
        console.log(`${await item.container.database.client.getWriteEndpoint()} hit ${err.code} at ${time}`);
        return null; // Lost synchronously or not document yet. No conflict is induced.
      } else {
        console.log("tryUpdateItem hit unexpected error");
        throw new Error(JSON.stringify(err));
      }
    }
  }

  private async tryDeleteItem(item: Item, newDef: ItemDefinition): Promise<ItemDefinition> {
    try {
      const { body: deletedItem } = await item.delete({
        accessCondition: {
          type: "IfMatch",
          condition: newDef._etag
        }
      });
      return newDef;
    } catch (err) {
      if (err.code === StatusCodes.PreconditionFailed || err.code === StatusCodes.NotFound) {
        return null; // Lost synchronously or not document yet. No conflict is induced.
      } else {
        throw new Error(err);
      }
    }
  }

  private async DeleteConflict(item: ItemDefinition) {
    const client = this.clients.values().next().value;
    const container = client.database(this.databaseName).container(this.manualContainerName);
    const conflicts = await container.conflicts.readAll().toArray();

    for (const conflict of conflicts.result) {
      if (conflict.operationType !== Constants.OperationTypes.Delete) {
        const content = JSON.parse(conflict.content);
        if (content._rid === item._rid && content._etag === item._etag && content.regionId === item.regionId) {
          console.log(`Deleting manual conflict ${conflict.resourceId} from region ${item.regionId}`);
          await container.conflict(conflict.id).delete();
        }
      } else if (conflict.resourceId === item._rid) {
        console.log(`Deleting manual conflict ${conflict.resourceId} from region ${item.regionId}`);
        await container.conflict(conflict.id).delete();
      }
    }
  }

  private sleep(timeinMS: number): Promise<void> {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res();
      }, timeinMS);
    });
  }
}
