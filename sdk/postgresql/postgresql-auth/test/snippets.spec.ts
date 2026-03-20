// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("GetEntraTokenPassword", async () => {
    const { getEntraTokenPassword } = await import("@azure/postgresql-auth");
    const pg = await import("pg");

    const credential = new DefaultAzureCredential();
    const pool = new pg.Pool({
      host: process.env.PGHOST,
      port: Number(process.env.PGPORT || 5432),
      database: process.env.PGDATABASE,
      user: process.env.PGUSER,
      password: () => getEntraTokenPassword(credential),
      ssl: { rejectUnauthorized: true },
    });
  });

  it("ConfigureEntraIdAuth", async () => {
    const { configureEntraIdAuth } = await import("@azure/postgresql-auth");
    const { Sequelize } = await import("sequelize");

    const sequelize = new Sequelize({
      dialect: "postgres",
      host: process.env.PGHOST,
      port: Number(process.env.PGPORT || 5432),
      database: process.env.PGDATABASE,
    });

    const credential = new DefaultAzureCredential();
    configureEntraIdAuth(sequelize, credential);
    await sequelize.authenticate();
  });

  it("Logging", async () => {
    setLogLevel("info");
  });
});
