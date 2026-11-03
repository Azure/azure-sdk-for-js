// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as packageExports from "@azure/provisioning-appinsights";
import { describe, expect, it } from "vitest";

describe("public entrypoints", () => {
  it("exports generated resource classes", () => {
    expect(packageExports.Component).toBeDefined();
    expect(packageExports.AnalyticsItem).toBeDefined();
    expect(packageExports.ExportConfiguration).toBeDefined();
    expect(packageExports.Favorite).toBeDefined();
    expect(packageExports.LinkedStorageAccount).toBeDefined();
    expect(packageExports.ApplicationInsightsComponentAnalyticsItem).toBeDefined();
    expect(packageExports.ProactiveDetectionConfig).toBeDefined();
    expect(packageExports.WebTest).toBeDefined();
    expect(packageExports.Workbook).toBeDefined();
    expect(packageExports.Revision).toBeDefined();
    expect(packageExports.WorkbookTemplate).toBeDefined();
  });
});
