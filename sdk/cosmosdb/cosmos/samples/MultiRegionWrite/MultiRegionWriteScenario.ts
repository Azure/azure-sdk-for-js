// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ConsistencyLevel, CosmosClient } from "../../dist";
import config from "./config";
import { ConflictWorker } from "./ConflictWorker";
import { Worker } from "./Worker";
export class MultiRegionWriteScenario {
  private basicWorkers: Worker[] = [];
  private conflictWorker: ConflictWorker;
  constructor() {
    this.conflictWorker = new ConflictWorker(
      config.databaseName,
      config.basicCollectionName,
      config.manualCollectionName,
      config.lwwCollectionName,
      config.udpCollectionName
    );
    for (const region of config.regions) {
      const client = new CosmosClient({
        endpoint: config.endpoint,
        key: config.key,
        connectionPolicy: {
          preferredLocations: [region]
        },
        consistencyLevel: ConsistencyLevel.Eventual
      });
      this.conflictWorker.addClient(region, client);
      this.basicWorkers.push(
        new Worker(
          region,
          client.database(config.databaseName).container(config.basicCollectionName)
        )
      );
    }
  }

  public async init(): Promise<void> {
    await this.conflictWorker.init();
    console.log("Initialized containers");
  }

  public async runBasic(): Promise<void> {
    console.log("################################################");
    console.log("Basic Active-Active");
    console.log("################################################");

    console.log("1) Starting insert loops across multiple regions");

    await Promise.all(this.basicWorkers.map((worker) => worker.RunLoop(100)));

    console.log("2) Reading from every region...");

    await Promise.all(
      this.basicWorkers.map((worker) => worker.ReadAll(100 * this.basicWorkers.length))
    );

    console.log("3) Deleting all the documents");

    await this.basicWorkers[0].DeleteAll();

    console.log("################################################");
  }

  public async runManualConflict(): Promise<void> {
    console.log("################################################");
    console.log("Manual Conflict Resolution");
    console.log("################################################");

    await this.conflictWorker.RunManualConflict();
    console.log("################################################");
  }

  public async runLWW(): Promise<void> {
    console.log("################################################");
    console.log("LWW Conflict Resolution");
    console.log("################################################");

    await this.conflictWorker.RunLWWConflict();
    console.log("################################################");
  }

  public async runUDP(): Promise<void> {
    console.log("################################################");
    console.log("UDP Conflict Resolution");
    console.log("################################################");

    await this.conflictWorker.RunUDP();
    console.log("################################################");
  }
}
