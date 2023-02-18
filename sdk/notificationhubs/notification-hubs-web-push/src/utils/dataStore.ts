// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AZURE_DATABASE_NAME, AZURE_DATABASE_VERSION, AZURE_OBJECT_STORE_NAME } from "./constants.js";
import { DBSchema, IDBPDatabase, deleteDB, openDB } from 'idb';
import type { WebPushInstallation } from "../publicTypes.js";

interface WebPushDBSchema extends DBSchema {
  'azure-webpush-store': {
    key: string;
    value: WebPushInstallation;
  };
}

let lazyDatabase: Promise<IDBPDatabase<WebPushDBSchema>> | undefined;
function getDatabase(): Promise<IDBPDatabase<WebPushDBSchema>> {
  if (!lazyDatabase) {
    lazyDatabase = openDB(AZURE_DATABASE_NAME, AZURE_DATABASE_VERSION, {
      upgrade: (database) => {
        database.createObjectStore(AZURE_OBJECT_STORE_NAME);
      }
    });
  }

  return lazyDatabase;
}

export async function getDBRecord(applicationUrl: string): Promise<WebPushInstallation | undefined> {
  const db = await getDatabase();
  return await db
    .transaction(AZURE_OBJECT_STORE_NAME)
    .objectStore(AZURE_OBJECT_STORE_NAME)
    .get(applicationUrl);
}

export async function putDBRecord(
  applicationUrl: string,
  installation: WebPushInstallation,
): Promise<WebPushInstallation> {
  const db = await getDatabase();
  const transaction = db.transaction(AZURE_OBJECT_STORE_NAME, "readwrite");
  await transaction.objectStore(AZURE_OBJECT_STORE_NAME).put(installation, applicationUrl);
  await transaction.done;

  return installation;
}

export async function removeDBRecord(
  applicationUrl: string,
): Promise<void> {
  const db = await getDatabase();
  const transaction = db.transaction(AZURE_OBJECT_STORE_NAME, "readwrite");
  await transaction.objectStore(AZURE_OBJECT_STORE_NAME).delete(applicationUrl);
  await transaction.done;
}

/**
 * @internal
 */
export async function deleteDatabase() {
  if (lazyDatabase) {
    const db = await getDatabase();
    db.close();
    await deleteDB(AZURE_DATABASE_NAME);
    lazyDatabase = undefined;
  }
}
