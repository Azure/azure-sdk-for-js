// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a change data capture resource.
 *
 * @summary creates or updates a change data capture resource.
 * x-ms-original-file: 2018-06-01/ChangeDataCapture_Create.json
 */
async function changeDataCaptureCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.changeDataCapture.createOrUpdate(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleChangeDataCapture",
    {
      description:
        "Sample demo change data capture to transfer data from delimited (csv) to Azure SQL Database with automapped and non-automapped mappings.",
      allowVNetOverride: false,
      policy: { mode: "Microbatch", recurrence: { frequency: "Minute", interval: 15 } },
      sourceConnectionsInfo: [
        {
          connection: {
            type: "linkedservicetype",
            commonDslConnectorProperties: [
              { name: "allowSchemaDrift", value: true },
              { name: "inferDriftedColumnTypes", value: true },
              { name: "format", value: "delimited" },
              {
                name: "dateFormats",
                value: [
                  "MM/dd/yyyy",
                  "dd/MM/yyyy",
                  "yyyy/MM/dd",
                  "MM-dd-yyyy",
                  "dd-MM-yyyy",
                  "yyyy-MM-dd",
                  "dd.MM.yyyy",
                  "MM.dd.yyyy",
                  "yyyy.MM.dd",
                ],
              },
              {
                name: "timestampFormats",
                value: [
                  "yyyyMMddHHmm",
                  "yyyyMMdd HHmm",
                  "yyyyMMddHHmmss",
                  "yyyyMMdd HHmmss",
                  "dd-MM-yyyy HH:mm:ss",
                  "dd-MM-yyyy HH:mm",
                  "yyyy-M-d H:m:s",
                  "yyyy-MM-dd\\'T\\'HH:mm:ss\\'Z\\'",
                  "yyyy-M-d\\'T\\'H:m:s\\'Z\\'",
                  "yyyy-M-d\\'T\\'H:m:s",
                  "yyyy-MM-dd\\'T\\'HH:mm:ss",
                  "yyyy-MM-dd HH:mm:ss",
                  "yyyy-MM-dd HH:mm",
                  "yyyy.MM.dd HH:mm:ss",
                  "MM/dd/yyyy HH:mm:ss",
                  "M/d/yyyy H:m:s",
                  "yyyy/MM/dd HH:mm:ss",
                  "yyyy/M/d H:m:s",
                  "dd MMM yyyy HH:mm:ss",
                  "dd MMMM yyyy HH:mm:ss",
                  "d MMM yyyy H:m:s",
                  "d MMMM yyyy H:m:s",
                  "d-M-yyyy H:m:s",
                  "d-M-yyyy H:m",
                  "yyyy-M-d H:m",
                  "MM/dd/yyyy HH:mm",
                  "M/d/yyyy H:m",
                  "yyyy/MM/dd HH:mm",
                  "yyyy/M/d H:m",
                  "dd MMMM yyyy HH:mm",
                  "dd MMM yyyy HH:mm",
                  "d MMMM yyyy H:m",
                  "d MMM yyyy H:m",
                  "MM-dd-yyyy hh:mm:ss a",
                  "MM-dd-yyyy HH:mm:ss",
                  "MM/dd/yyyy hh:mm:ss a",
                  "yyyy.MM.dd hh:mm:ss a",
                  "MM/dd/yyyy",
                  "dd/MM/yyyy",
                  "yyyy/MM/dd",
                  "MM-dd-yyyy",
                  "dd-MM-yyyy",
                  "yyyy-MM-dd",
                  "dd.MM.yyyy",
                  "MM.dd.yyyy",
                  "yyyy.MM.dd",
                ],
              },
              { name: "enableCdc", value: true },
              { name: "skipInitialLoad", value: true },
              { name: "columnNamesAsHeader", value: true },
              { name: "columnDelimiter", value: "," },
              { name: "escapeChar", value: "\\\\" },
              { name: "quoteChar", value: '\\"' },
            ],
            isInlineDataset: true,
            linkedService: { type: "LinkedServiceReference", referenceName: "amjaAdls03" },
            linkedServiceType: "AzureBlobFS",
          },
          sourceEntities: [
            {
              name: "source/customer",
              schema: [
                { name: "CustId", dataType: "short" },
                { name: "CustName", dataType: "string" },
                { name: "CustAddres", dataType: "string" },
                { name: "CustDepName", dataType: "string" },
                { name: "CustDepLoc", dataType: "string" },
              ],
              dslConnectorProperties: [
                { name: "container", value: "source" },
                { name: "fileSystem", value: "source" },
                { name: "folderPath", value: "customer" },
                { name: "allowSchemaDrift", value: false },
                { name: "inferDriftedColumnTypes", value: false },
              ],
            },
            {
              name: "source/employee",
              schema: [],
              dslConnectorProperties: [
                { name: "container", value: "source" },
                { name: "fileSystem", value: "source" },
                { name: "folderPath", value: "employee" },
              ],
            },
            {
              name: "lookup",
              schema: [
                { name: "EmpId", dataType: "short" },
                { name: "EmpName", dataType: "string" },
                { name: "HomeAddress", dataType: "string" },
                { name: "OfficeAddress", dataType: "string" },
                { name: "EmpPhoneNumber", dataType: "integer" },
                { name: "DepName", dataType: "string" },
                { name: "DepLoc", dataType: "string" },
                { name: "DecimalCol", dataType: "double" },
              ],
              dslConnectorProperties: [
                { name: "container", value: "lookup" },
                { name: "fileSystem", value: "lookup" },
                { name: "allowSchemaDrift", value: false },
                { name: "inferDriftedColumnTypes", value: false },
              ],
            },
            {
              name: "source/justSchema",
              schema: [
                { name: "CustId", dataType: "string" },
                { name: "CustName", dataType: "string" },
                { name: "CustAddres", dataType: "string" },
                { name: "CustDepName", dataType: "string" },
                { name: "CustDepLoc", dataType: "string" },
              ],
              dslConnectorProperties: [
                { name: "container", value: "source" },
                { name: "fileSystem", value: "source" },
                { name: "folderPath", value: "justSchema" },
                { name: "allowSchemaDrift", value: false },
                { name: "inferDriftedColumnTypes", value: false },
              ],
            },
          ],
        },
      ],
      targetConnectionsInfo: [
        {
          connection: {
            type: "linkedservicetype",
            commonDslConnectorProperties: [
              { name: "allowSchemaDrift", value: true },
              { name: "inferDriftedColumnTypes", value: true },
              { name: "format", value: "table" },
              { name: "store", value: "sqlserver" },
              { name: "databaseType", value: "databaseType" },
              { name: "database", value: "database" },
              { name: "deletable", value: false },
              { name: "insertable", value: true },
              { name: "updateable", value: false },
              { name: "upsertable", value: false },
              { name: "skipDuplicateMapInputs", value: true },
              { name: "skipDuplicateMapOutputs", value: true },
            ],
            isInlineDataset: true,
            linkedService: { type: "LinkedServiceReference", referenceName: "amjaSql" },
            linkedServiceType: "AzureSqlDatabase",
          },
          dataMapperMappings: [
            {
              attributeMappingInfo: { attributeMappings: [] },
              sourceConnectionReference: {
                type: "linkedservicetype",
                connectionName: "amjaAdls03",
              },
              sourceEntityName: "source/customer",
              targetEntityName: "dbo.customer",
            },
            {
              attributeMappingInfo: {
                attributeMappings: [
                  {
                    name: "Name",
                    type: "Derived",
                    attributeReferences: [
                      {
                        name: "EmpName",
                        entity: "lookup",
                        entityConnectionReference: {
                          type: "linkedservicetype",
                          connectionName: "amjaAdls03",
                        },
                      },
                    ],
                    expression: "upper(EmpName)",
                    functionName: "upper",
                  },
                  {
                    name: "PersonID",
                    type: "Direct",
                    attributeReference: {
                      name: "EmpId",
                      entity: "lookup",
                      entityConnectionReference: {
                        type: "linkedservicetype",
                        connectionName: "amjaAdls03",
                      },
                    },
                    functionName: "",
                  },
                ],
              },
              sourceConnectionReference: {
                type: "linkedservicetype",
                connectionName: "amjaAdls03",
              },
              sourceEntityName: "lookup",
              targetEntityName: "dbo.data_source_table",
            },
            {
              attributeMappingInfo: { attributeMappings: [] },
              sourceConnectionReference: {
                type: "linkedservicetype",
                connectionName: "amjaAdls03",
              },
              sourceEntityName: "source/employee",
              targetEntityName: "dbo.employee",
            },
            {
              attributeMappingInfo: {
                attributeMappings: [
                  {
                    name: "CustAddres",
                    type: "Derived",
                    attributeReferences: [
                      {
                        name: "CustAddres",
                        entity: "source/justSchema",
                        entityConnectionReference: {
                          type: "linkedservicetype",
                          connectionName: "amjaAdls03",
                        },
                      },
                    ],
                    expression: "trim(CustAddres)",
                    functionName: "trim",
                  },
                  {
                    name: "CustDepLoc",
                    type: "Direct",
                    attributeReference: {
                      name: "CustDepLoc",
                      entity: "source/justSchema",
                      entityConnectionReference: {
                        type: "linkedservicetype",
                        connectionName: "amjaAdls03",
                      },
                    },
                  },
                  {
                    name: "CustDepName",
                    type: "Derived",
                    attributeReferences: [
                      {
                        name: "CustName",
                        entity: "source/justSchema",
                        entityConnectionReference: {
                          type: "linkedservicetype",
                          connectionName: "amjaAdls03",
                        },
                      },
                      {
                        name: "CustDepName",
                        entity: "source/justSchema",
                        entityConnectionReference: {
                          type: "linkedservicetype",
                          connectionName: "amjaAdls03",
                        },
                      },
                    ],
                    expression: 'concat(CustName, " -> ", CustDepName)',
                    functionName: "",
                  },
                  {
                    name: "CustId",
                    type: "Direct",
                    attributeReference: {
                      name: "CustId",
                      entity: "source/justSchema",
                      entityConnectionReference: {
                        type: "linkedservicetype",
                        connectionName: "amjaAdls03",
                      },
                    },
                    functionName: "",
                  },
                  {
                    name: "CustName",
                    type: "Direct",
                    attributeReference: {
                      name: "CustName",
                      entity: "source/justSchema",
                      entityConnectionReference: {
                        type: "linkedservicetype",
                        connectionName: "amjaAdls03",
                      },
                    },
                  },
                ],
              },
              sourceConnectionReference: {
                type: "linkedservicetype",
                connectionName: "amjaAdls03",
              },
              sourceEntityName: "source/justSchema",
              targetEntityName: "dbo.justSchema",
            },
          ],
          relationships: [],
          targetEntities: [
            {
              name: "dbo.employee",
              schema: [],
              dslConnectorProperties: [
                { name: "schemaName", value: "dbo" },
                { name: "tableName", value: "employee" },
              ],
            },
            {
              name: "dbo.justSchema",
              schema: [],
              dslConnectorProperties: [
                { name: "schemaName", value: "dbo" },
                { name: "tableName", value: "justSchema" },
                { name: "allowSchemaDrift", value: true },
                { name: "inferDriftedColumnTypes", value: true },
              ],
            },
            {
              name: "dbo.customer",
              schema: [
                { name: "CustId", dataType: "integer" },
                { name: "CustName", dataType: "string" },
                { name: "CustAddres", dataType: "string" },
                { name: "CustDeptName", dataType: "string" },
                { name: "CustEmail", dataType: "string" },
              ],
              dslConnectorProperties: [
                { name: "schemaName", value: "dbo" },
                { name: "tableName", value: "customer" },
                { name: "allowSchemaDrift", value: false },
                { name: "inferDriftedColumnTypes", value: false },
              ],
            },
            {
              name: "dbo.data_source_table",
              schema: [
                { name: "PersonID", dataType: "integer" },
                { name: "Name", dataType: "string" },
                { name: "LastModifytime", dataType: "timestamp" },
              ],
              dslConnectorProperties: [
                { name: "schemaName", value: "dbo" },
                { name: "tableName", value: "data_source_table" },
                { name: "allowSchemaDrift", value: false },
                { name: "inferDriftedColumnTypes", value: false },
                { name: "defaultToUpsert", value: false },
              ],
            },
          ],
        },
      ],
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a change data capture resource.
 *
 * @summary creates or updates a change data capture resource.
 * x-ms-original-file: 2018-06-01/ChangeDataCapture_Update.json
 */
async function changeDataCaptureUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.changeDataCapture.createOrUpdate(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleChangeDataCapture",
    {
      description:
        "Sample demo change data capture to transfer data from delimited (csv) to Azure SQL Database. Updating table mappings.",
      allowVNetOverride: false,
      policy: { mode: "Microbatch", recurrence: { frequency: "Minute", interval: 15 } },
      sourceConnectionsInfo: [
        {
          connection: {
            type: "linkedservicetype",
            commonDslConnectorProperties: [
              { name: "allowSchemaDrift", value: true },
              { name: "inferDriftedColumnTypes", value: true },
              { name: "format", value: "delimited" },
              {
                name: "dateFormats",
                value: [
                  "MM/dd/yyyy",
                  "dd/MM/yyyy",
                  "yyyy/MM/dd",
                  "MM-dd-yyyy",
                  "dd-MM-yyyy",
                  "yyyy-MM-dd",
                  "dd.MM.yyyy",
                  "MM.dd.yyyy",
                  "yyyy.MM.dd",
                ],
              },
              {
                name: "timestampFormats",
                value: [
                  "yyyyMMddHHmm",
                  "yyyyMMdd HHmm",
                  "yyyyMMddHHmmss",
                  "yyyyMMdd HHmmss",
                  "dd-MM-yyyy HH:mm:ss",
                  "dd-MM-yyyy HH:mm",
                  "yyyy-M-d H:m:s",
                  "yyyy-MM-dd\\'T\\'HH:mm:ss\\'Z\\'",
                  "yyyy-M-d\\'T\\'H:m:s\\'Z\\'",
                  "yyyy-M-d\\'T\\'H:m:s",
                  "yyyy-MM-dd\\'T\\'HH:mm:ss",
                  "yyyy-MM-dd HH:mm:ss",
                  "yyyy-MM-dd HH:mm",
                  "yyyy.MM.dd HH:mm:ss",
                  "MM/dd/yyyy HH:mm:ss",
                  "M/d/yyyy H:m:s",
                  "yyyy/MM/dd HH:mm:ss",
                  "yyyy/M/d H:m:s",
                  "dd MMM yyyy HH:mm:ss",
                  "dd MMMM yyyy HH:mm:ss",
                  "d MMM yyyy H:m:s",
                  "d MMMM yyyy H:m:s",
                  "d-M-yyyy H:m:s",
                  "d-M-yyyy H:m",
                  "yyyy-M-d H:m",
                  "MM/dd/yyyy HH:mm",
                  "M/d/yyyy H:m",
                  "yyyy/MM/dd HH:mm",
                  "yyyy/M/d H:m",
                  "dd MMMM yyyy HH:mm",
                  "dd MMM yyyy HH:mm",
                  "d MMMM yyyy H:m",
                  "d MMM yyyy H:m",
                  "MM-dd-yyyy hh:mm:ss a",
                  "MM-dd-yyyy HH:mm:ss",
                  "MM/dd/yyyy hh:mm:ss a",
                  "yyyy.MM.dd hh:mm:ss a",
                  "MM/dd/yyyy",
                  "dd/MM/yyyy",
                  "yyyy/MM/dd",
                  "MM-dd-yyyy",
                  "dd-MM-yyyy",
                  "yyyy-MM-dd",
                  "dd.MM.yyyy",
                  "MM.dd.yyyy",
                  "yyyy.MM.dd",
                ],
              },
              { name: "enableCdc", value: true },
              { name: "skipInitialLoad", value: true },
              { name: "columnNamesAsHeader", value: true },
              { name: "columnDelimiter", value: "," },
              { name: "escapeChar", value: "\\\\" },
              { name: "quoteChar", value: '\\"' },
            ],
            isInlineDataset: true,
            linkedService: { type: "LinkedServiceReference", referenceName: "amjaAdls03" },
            linkedServiceType: "AzureBlobFS",
          },
          sourceEntities: [
            {
              name: "source/customer",
              schema: [
                { name: "CustId", dataType: "short" },
                { name: "CustName", dataType: "string" },
                { name: "CustAddres", dataType: "string" },
                { name: "CustDepName", dataType: "string" },
                { name: "CustDepLoc", dataType: "string" },
              ],
              dslConnectorProperties: [
                { name: "container", value: "source" },
                { name: "fileSystem", value: "source" },
                { name: "folderPath", value: "customer" },
                { name: "allowSchemaDrift", value: false },
                { name: "inferDriftedColumnTypes", value: false },
              ],
            },
            {
              name: "source/employee",
              schema: [],
              dslConnectorProperties: [
                { name: "container", value: "source" },
                { name: "fileSystem", value: "source" },
                { name: "folderPath", value: "employee" },
              ],
            },
            {
              name: "lookup",
              schema: [
                { name: "EmpId", dataType: "short" },
                { name: "EmpName", dataType: "string" },
                { name: "HomeAddress", dataType: "string" },
                { name: "OfficeAddress", dataType: "string" },
                { name: "EmpPhoneNumber", dataType: "integer" },
                { name: "DepName", dataType: "string" },
                { name: "DepLoc", dataType: "string" },
                { name: "DecimalCol", dataType: "double" },
              ],
              dslConnectorProperties: [
                { name: "container", value: "lookup" },
                { name: "fileSystem", value: "lookup" },
                { name: "allowSchemaDrift", value: false },
                { name: "inferDriftedColumnTypes", value: false },
              ],
            },
            {
              name: "source/justSchema",
              schema: [
                { name: "CustId", dataType: "string" },
                { name: "CustName", dataType: "string" },
                { name: "CustAddres", dataType: "string" },
                { name: "CustDepName", dataType: "string" },
                { name: "CustDepLoc", dataType: "string" },
              ],
              dslConnectorProperties: [
                { name: "container", value: "source" },
                { name: "fileSystem", value: "source" },
                { name: "folderPath", value: "justSchema" },
                { name: "allowSchemaDrift", value: false },
                { name: "inferDriftedColumnTypes", value: false },
              ],
            },
          ],
        },
      ],
      status: "Stopped",
      targetConnectionsInfo: [
        {
          connection: {
            type: "linkedservicetype",
            commonDslConnectorProperties: [
              { name: "allowSchemaDrift", value: true },
              { name: "inferDriftedColumnTypes", value: true },
              { name: "format", value: "table" },
              { name: "store", value: "sqlserver" },
              { name: "databaseType", value: "databaseType" },
              { name: "database", value: "database" },
              { name: "deletable", value: false },
              { name: "insertable", value: true },
              { name: "updateable", value: false },
              { name: "upsertable", value: false },
              { name: "skipDuplicateMapInputs", value: true },
              { name: "skipDuplicateMapOutputs", value: true },
            ],
            isInlineDataset: true,
            linkedService: { type: "LinkedServiceReference", referenceName: "amjaSql" },
            linkedServiceType: "AzureSqlDatabase",
          },
          dataMapperMappings: [
            {
              attributeMappingInfo: {
                attributeMappings: [
                  {
                    name: "CustAddres",
                    type: "Derived",
                    attributeReferences: [
                      {
                        name: "CustAddres",
                        entity: "source/customer",
                        entityConnectionReference: {
                          type: "linkedservicetype",
                          connectionName: "amjaAdls03",
                        },
                      },
                    ],
                    expression: "trim(CustAddres)",
                    functionName: "trim",
                  },
                  {
                    name: "CustDeptName",
                    type: "Direct",
                    attributeReference: {
                      name: "CustDepName",
                      entity: "source/customer",
                      entityConnectionReference: {
                        type: "linkedservicetype",
                        connectionName: "amjaAdls03",
                      },
                    },
                    functionName: "",
                  },
                  {
                    name: "CustEmail",
                    type: "Direct",
                    attributeReference: {
                      name: "CustName",
                      entity: "source/customer",
                      entityConnectionReference: {
                        type: "linkedservicetype",
                        connectionName: "amjaAdls03",
                      },
                    },
                    functionName: "",
                  },
                  {
                    name: "CustId",
                    type: "Direct",
                    attributeReference: {
                      name: "CustId",
                      entity: "source/customer",
                      entityConnectionReference: {
                        type: "linkedservicetype",
                        connectionName: "amjaAdls03",
                      },
                    },
                    functionName: "",
                  },
                  {
                    name: "CustName",
                    type: "Direct",
                    attributeReference: {
                      name: "CustName",
                      entity: "source/customer",
                      entityConnectionReference: {
                        type: "linkedservicetype",
                        connectionName: "amjaAdls03",
                      },
                    },
                    functionName: "",
                  },
                ],
              },
              sourceConnectionReference: {
                type: "linkedservicetype",
                connectionName: "amjaAdls03",
              },
              sourceEntityName: "source/customer",
              targetEntityName: "dbo.customer",
            },
            {
              attributeMappingInfo: {
                attributeMappings: [
                  {
                    name: "Name",
                    type: "Derived",
                    attributeReferences: [
                      {
                        name: "EmpName",
                        entity: "lookup",
                        entityConnectionReference: {
                          type: "linkedservicetype",
                          connectionName: "amjaAdls03",
                        },
                      },
                    ],
                    expression: "upper(EmpName)",
                    functionName: "upper",
                  },
                  {
                    name: "PersonID",
                    type: "Direct",
                    attributeReference: {
                      name: "EmpId",
                      entity: "lookup",
                      entityConnectionReference: {
                        type: "linkedservicetype",
                        connectionName: "amjaAdls03",
                      },
                    },
                    functionName: "",
                  },
                ],
              },
              sourceConnectionReference: {
                type: "linkedservicetype",
                connectionName: "amjaAdls03",
              },
              sourceEntityName: "lookup",
              targetEntityName: "dbo.data_source_table",
            },
            {
              attributeMappingInfo: { attributeMappings: [] },
              sourceConnectionReference: {
                type: "linkedservicetype",
                connectionName: "amjaAdls03",
              },
              sourceEntityName: "source/employee",
              targetEntityName: "dbo.employee",
            },
            {
              attributeMappingInfo: {
                attributeMappings: [
                  {
                    name: "CustAddres",
                    type: "Derived",
                    attributeReferences: [
                      {
                        name: "CustAddres",
                        entity: "source/justSchema",
                        entityConnectionReference: {
                          type: "linkedservicetype",
                          connectionName: "amjaAdls03",
                        },
                      },
                    ],
                    expression: "trim(CustAddres)",
                    functionName: "trim",
                  },
                  {
                    name: "CustDepLoc",
                    type: "Direct",
                    attributeReference: {
                      name: "CustDepLoc",
                      entity: "source/justSchema",
                      entityConnectionReference: {
                        type: "linkedservicetype",
                        connectionName: "amjaAdls03",
                      },
                    },
                  },
                  {
                    name: "CustDepName",
                    type: "Derived",
                    attributeReferences: [
                      {
                        name: "CustName",
                        entity: "source/justSchema",
                        entityConnectionReference: {
                          type: "linkedservicetype",
                          connectionName: "amjaAdls03",
                        },
                      },
                      {
                        name: "CustDepName",
                        entity: "source/justSchema",
                        entityConnectionReference: {
                          type: "linkedservicetype",
                          connectionName: "amjaAdls03",
                        },
                      },
                    ],
                    expression: 'concat(CustName, " -> ", CustDepName)',
                    functionName: "",
                  },
                  {
                    name: "CustId",
                    type: "Direct",
                    attributeReference: {
                      name: "CustId",
                      entity: "source/justSchema",
                      entityConnectionReference: {
                        type: "linkedservicetype",
                        connectionName: "amjaAdls03",
                      },
                    },
                    functionName: "",
                  },
                  {
                    name: "CustName",
                    type: "Direct",
                    attributeReference: {
                      name: "CustName",
                      entity: "source/justSchema",
                      entityConnectionReference: {
                        type: "linkedservicetype",
                        connectionName: "amjaAdls03",
                      },
                    },
                  },
                ],
              },
              sourceConnectionReference: {
                type: "linkedservicetype",
                connectionName: "amjaAdls03",
              },
              sourceEntityName: "source/justSchema",
              targetEntityName: "dbo.justSchema",
            },
          ],
          relationships: [],
          targetEntities: [
            {
              name: "dbo.employee",
              schema: [],
              dslConnectorProperties: [
                { name: "schemaName", value: "dbo" },
                { name: "tableName", value: "employee" },
              ],
            },
            {
              name: "dbo.justSchema",
              schema: [],
              dslConnectorProperties: [
                { name: "schemaName", value: "dbo" },
                { name: "tableName", value: "justSchema" },
                { name: "allowSchemaDrift", value: true },
                { name: "inferDriftedColumnTypes", value: true },
              ],
            },
            {
              name: "dbo.customer",
              schema: [
                { name: "CustId", dataType: "integer" },
                { name: "CustName", dataType: "string" },
                { name: "CustAddres", dataType: "string" },
                { name: "CustDeptName", dataType: "string" },
                { name: "CustEmail", dataType: "string" },
              ],
              dslConnectorProperties: [
                { name: "schemaName", value: "dbo" },
                { name: "tableName", value: "customer" },
                { name: "allowSchemaDrift", value: false },
                { name: "inferDriftedColumnTypes", value: false },
              ],
            },
            {
              name: "dbo.data_source_table",
              schema: [
                { name: "PersonID", dataType: "integer" },
                { name: "Name", dataType: "string" },
                { name: "LastModifytime", dataType: "timestamp" },
              ],
              dslConnectorProperties: [
                { name: "schemaName", value: "dbo" },
                { name: "tableName", value: "data_source_table" },
                { name: "allowSchemaDrift", value: false },
                { name: "inferDriftedColumnTypes", value: false },
                { name: "defaultToUpsert", value: false },
              ],
            },
          ],
        },
      ],
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await changeDataCaptureCreate();
  await changeDataCaptureUpdate();
}

main().catch(console.error);
