// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a database data masking rule.
 *
 * @summary creates or updates a database data masking rule.
 * x-ms-original-file: 2025-02-01-preview/DataMaskingRuleCreateOrUpdateDefaultMax.json
 */
async function createOrUpdateDataMaskingRuleForDefaultMax(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.dataMaskingRules.createOrUpdate(
    "sqlcrudtest-6852",
    "sqlcrudtest-2080",
    "sqlcrudtest-331",
    "Default",
    "rule1",
    {
      aliasName: "nickname",
      columnName: "test1",
      maskingFunction: "Default",
      ruleState: "Enabled",
      schemaName: "dbo",
      tableName: "Table_1",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a database data masking rule.
 *
 * @summary creates or updates a database data masking rule.
 * x-ms-original-file: 2025-02-01-preview/DataMaskingRuleCreateOrUpdateDefaultMin.json
 */
async function createOrUpdateDataMaskingRuleForDefaultMin(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.dataMaskingRules.createOrUpdate(
    "sqlcrudtest-6852",
    "sqlcrudtest-2080",
    "sqlcrudtest-331",
    "Default",
    "rule1",
    { columnName: "test1", maskingFunction: "Default", schemaName: "dbo", tableName: "Table_1" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a database data masking rule.
 *
 * @summary creates or updates a database data masking rule.
 * x-ms-original-file: 2025-02-01-preview/DataMaskingRuleCreateOrUpdateNumber.json
 */
async function createOrUpdateDataMaskingRuleForNumbers(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.dataMaskingRules.createOrUpdate(
    "sqlcrudtest-6852",
    "sqlcrudtest-2080",
    "sqlcrudtest-331",
    "Default",
    "rule1",
    {
      columnName: "test1",
      maskingFunction: "Number",
      numberFrom: "0",
      numberTo: "2",
      schemaName: "dbo",
      tableName: "Table_1",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a database data masking rule.
 *
 * @summary creates or updates a database data masking rule.
 * x-ms-original-file: 2025-02-01-preview/DataMaskingRuleCreateOrUpdateText.json
 */
async function createOrUpdateDataMaskingRuleForText(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.dataMaskingRules.createOrUpdate(
    "sqlcrudtest-6852",
    "sqlcrudtest-2080",
    "sqlcrudtest-331",
    "Default",
    "rule1",
    {
      columnName: "test1",
      maskingFunction: "Text",
      prefixSize: "1",
      replacementString: "asdf",
      schemaName: "dbo",
      suffixSize: "0",
      tableName: "Table_1",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateDataMaskingRuleForDefaultMax();
  await createOrUpdateDataMaskingRuleForDefaultMin();
  await createOrUpdateDataMaskingRuleForNumbers();
  await createOrUpdateDataMaskingRuleForText();
}

main().catch(console.error);
