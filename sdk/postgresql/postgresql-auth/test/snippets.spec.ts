// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("entraTokenProvider", async () => {
    const { entraTokenProvider } = await import("@azure/postgresql-auth");
    const pg = await import("pg");

    const credential = new DefaultAzureCredential();
    const pool = new pg.Pool({
      host: process.env.PGHOST,
      port: Number(process.env.PGPORT || 5432),
      database: process.env.PGDATABASE,
      user: process.env.PGUSER,
      password: entraTokenProvider(credential),
      ssl: { rejectUnauthorized: true },
    });
  });

  it("configureEntraAuthentication", async () => {
    const { configureEntraAuthentication } = await import("@azure/postgresql-auth");
    const { Sequelize } = await import("sequelize");

    const sequelize = new Sequelize({
      dialect: "postgres",
      host: process.env.PGHOST,
      port: Number(process.env.PGPORT || 5432),
      database: process.env.PGDATABASE,
    });

    const credential = new DefaultAzureCredential();
    configureEntraAuthentication(sequelize, credential);
    await sequelize.authenticate();
  });

  it("Logging", async () => {
    setLogLevel("info");
  });
});
