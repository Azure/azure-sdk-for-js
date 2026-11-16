// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as packageExports from "@azure/provisioning-operationalinsights";
import { describe, expect, it } from "vitest";

describe("public entrypoints", () => {
  it("exports generated resource classes", () => {
    expect(packageExports.Cluster).toBeDefined();
    expect(packageExports.QueryPack).toBeDefined();
    expect(packageExports.Query).toBeDefined();
    expect(packageExports.Workspace).toBeDefined();
    expect(packageExports.DataExport).toBeDefined();
    expect(packageExports.DataSource).toBeDefined();
    expect(packageExports.LinkedService).toBeDefined();
    expect(packageExports.LinkedStorageAccount).toBeDefined();
    expect(packageExports.NetworkSecurityPerimeterConfiguration).toBeDefined();
    expect(packageExports.SavedSearch).toBeDefined();
    expect(packageExports.StorageInsight).toBeDefined();
    expect(packageExports.SummaryLog).toBeDefined();
    expect(packageExports.Table).toBeDefined();
  });
});
