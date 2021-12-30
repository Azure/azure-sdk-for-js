// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AnomalyDetectionConfiguration as ServiceAnomalyDetectionConfiguration,
  AnomalyAlertingConfiguration as ServiceAnomalyAlertingConfiguration,
  AnomalyFeedback as ServiceAnomalyFeedback,
  ChangePointFeedback as ServiceChangePointFeedback,
  CommentFeedback as ServiceCommentFeedback,
  PeriodFeedback as ServicePeriodFeedback,
  MetricFeedbackUnion as ServiceMetricFeedbackUnion,
  DataFeedDetailUnion as ServiceDataFeedDetailUnion,
  AnomalyScope as ServiceAnomalyScope,
  HookInfoUnion as ServiceHookInfoUnion,
  Granularity as ServiceGranularity,
  WebhookHookInfo,
  EmailHookInfo,
  NeedRollupEnum,
  RollUpMethod as DataFeedDetailRollUpMethod,
  DataSourceCredentialPatchUnion as ServiceDataSourceCredentialPatch,
  AzureApplicationInsightsDataFeed as ServiceAzureApplicationInsightsDataFeed,
  AzureDataExplorerDataFeed as ServiceAzureDataExplorerDataFeed,
  AzureDataLakeStorageGen2DataFeed as ServiceAzureDataLakeStorageGen2DataFeed,
  AzureBlobDataFeed as ServiceAzureBlobDataFeed,
  AzureCosmosDBDataFeed as ServiceAzureCosmosDBDataFeed,
  AzureTableDataFeed as ServiceAzureTableDataFeed,
  MongoDBDataFeed as ServiceMongoDBDataFeed,
  MySqlDataFeed as ServiceMySqlDataFeed,
  PostgreSqlDataFeed as ServicePostgreSqlDataFeed,
  SQLServerDataFeed as ServiceSQLServerDataFeed,
  InfluxDBDataFeed as ServiceInfluxDBDataFeed,
  AzureEventHubsDataFeed as ServiceAzureEventHubsDataFeed,
  AzureLogAnalyticsDataFeed as ServiceAzureLogAnalyticsDataFeed,
  AnomalyDetectionConfigurationPatch as ServiceAnomalyDetectionConfigurationPatch,
  DataSourceCredentialUnion as ServiceDataSourceCredentialUnion,
  DataLakeGen2SharedKeyCredential,
  AzureSQLConnectionStringCredential,
  ServicePrincipalCredential,
  ServicePrincipalInKVCredential,
  AzureApplicationInsightsParameter,
  MongoDBParameter,
  AuthenticationTypeEnum,
  AzureBlobParameter,
  AzureCosmosDBParameter,
  AzureDataLakeStorageGen2Parameter,
  AzureEventHubsParameter,
  AzureLogAnalyticsParameter,
  AzureTableParameter,
  InfluxDBParameter,
  SqlSourceParameter,
} from "./generated/models";
import {
  MetricFeedbackUnion,
  MetricAnomalyFeedback,
  AnomalyDetectionConfiguration,
  MetricDetectionCondition,
  MetricChangePointFeedback,
  MetricCommentFeedback,
  MetricPeriodFeedback,
  MetricsAdvisorDataFeed,
  AzureBlobDataFeedSource,
  AzureDataExplorerDataFeedSource,
  NotificationHookUnion,
  DataFeedRollupSettings,
  MetricFeedbackCommon,
  NotificationHook,
  AnomalyAlertConfiguration,
  MetricAnomalyAlertScope,
  MetricBoundaryCondition,
  HardThresholdConditionUnion,
  ChangeThresholdConditionUnion,
  DataFeedGranularity,
  DataSourceCredentialPatch,
  AzureDataExplorerAuthTypes,
  AzureDataLakeStorageGen2AuthTypes,
  AzureDataLakeStorageGen2DataFeedSource,
  SqlServerAuthTypes,
  AnomalyDetectionConfigurationPatch,
  DataSourceCredentialEntityUnion,
  DataSourceCredentialEntity,
  DataFeedSource,
  DataFeedSourcePatch,
  DataSourceSqlServerConnectionStringPatch,
  DataSourceDataLakeGen2SharedKeyPatch,
  DataSourceServicePrincipalPatch,
  DataSourceServicePrincipalInKeyVaultPatch,
} from "./models";

// transform the protocol layer (codegen) service models into convenience layer models

export function fromServiceAnomalyDetectionConfiguration(
  original: ServiceAnomalyDetectionConfiguration
): AnomalyDetectionConfiguration {
  return {
    id: original.anomalyDetectionConfigurationId!,
    name: original.name,
    description: original.description,
    metricId: original.metricId,
    wholeSeriesDetectionCondition: original.wholeMetricConfiguration as MetricDetectionCondition,
    seriesGroupDetectionConditions: original.dimensionGroupOverrideConfigurations?.map((c) => {
      const {
        group,
        conditionOperator,
        smartDetectionCondition,
        hardThresholdCondition,
        changeThresholdCondition,
      } = c;
      return {
        groupKey: group.dimension,
        conditionOperator,
        smartDetectionCondition,
        hardThresholdCondition: hardThresholdCondition as HardThresholdConditionUnion,
        changeThresholdCondition: changeThresholdCondition as ChangeThresholdConditionUnion,
      };
    }),
    seriesDetectionConditions: original.seriesOverrideConfigurations?.map((c) => {
      const {
        series,
        conditionOperator,
        smartDetectionCondition,
        hardThresholdCondition,
        changeThresholdCondition,
      } = c;
      return {
        seriesKey: series.dimension,
        conditionOperator,
        smartDetectionCondition,
        hardThresholdCondition: hardThresholdCondition as HardThresholdConditionUnion,
        changeThresholdCondition: changeThresholdCondition as ChangeThresholdConditionUnion,
      };
    }),
  };
}

export function toServiceAnomalyDetectionConfiguration(
  from: Omit<AnomalyDetectionConfiguration, "id">
): ServiceAnomalyDetectionConfiguration {
  return {
    name: from.name,
    metricId: from.metricId,
    description: from.description,
    wholeMetricConfiguration: from.wholeSeriesDetectionCondition,
    dimensionGroupOverrideConfigurations: from.seriesGroupDetectionConditions?.map((c) => {
      const {
        groupKey,
        conditionOperator,
        smartDetectionCondition,
        hardThresholdCondition,
        changeThresholdCondition,
      } = c;
      return {
        group: { dimension: groupKey },
        conditionOperator,
        smartDetectionCondition,
        hardThresholdCondition,
        changeThresholdCondition,
      };
    }),
    seriesOverrideConfigurations: from.seriesDetectionConditions?.map((c) => {
      const {
        seriesKey,
        conditionOperator,
        smartDetectionCondition,
        hardThresholdCondition,
        changeThresholdCondition,
      } = c;
      return {
        series: { dimension: seriesKey },
        conditionOperator,
        smartDetectionCondition,
        hardThresholdCondition,
        changeThresholdCondition,
      };
    }),
  };
}

export function toServiceAnomalyDetectionConfigurationPatch(
  from: AnomalyDetectionConfigurationPatch
): ServiceAnomalyDetectionConfigurationPatch {
  return {
    name: from.name,
    description: from.description,
    wholeMetricConfiguration: from.wholeSeriesDetectionCondition,
    dimensionGroupOverrideConfigurations: from.seriesGroupDetectionConditions?.map((c) => {
      const {
        groupKey,
        conditionOperator,
        smartDetectionCondition,
        hardThresholdCondition,
        changeThresholdCondition,
      } = c;
      return {
        group: { dimension: groupKey },
        conditionOperator,
        smartDetectionCondition,
        hardThresholdCondition,
        changeThresholdCondition,
      };
    }),
    seriesOverrideConfigurations: from.seriesDetectionConditions?.map((c) => {
      const {
        seriesKey,
        conditionOperator,
        smartDetectionCondition,
        hardThresholdCondition,
        changeThresholdCondition,
      } = c;
      return {
        series: { dimension: seriesKey },
        conditionOperator,
        smartDetectionCondition,
        hardThresholdCondition,
        changeThresholdCondition,
      };
    }),
  };
}

export function fromServiceMetricFeedbackUnion(
  original: ServiceMetricFeedbackUnion
): MetricFeedbackUnion {
  const common: MetricFeedbackCommon = {
    id: original.feedbackId,
    createdOn: original.createdTime,
    userPrincipal: original.userPrincipal,
    metricId: original.metricId,
    dimensionKey: original.dimensionFilter.dimension,
  };
  switch (original.feedbackType) {
    case "Anomaly": {
      const orig = original as ServiceAnomalyFeedback;
      const result1: MetricAnomalyFeedback = {
        ...common,
        feedbackType: "Anomaly",
        startTime: orig.startTime,
        endTime: orig.endTime,
        value: orig.value.anomalyValue,
        anomalyDetectionConfigurationId: orig.anomalyDetectionConfigurationId,
        anomalyDetectionConfigurationSnapshot:
          orig.anomalyDetectionConfigurationSnapshot &&
          fromServiceAnomalyDetectionConfiguration(orig.anomalyDetectionConfigurationSnapshot),
      };
      return result1;
    }
    case "ChangePoint": {
      const orig2 = original as ServiceChangePointFeedback;
      const result2: MetricChangePointFeedback = {
        ...common,
        feedbackType: "ChangePoint",
        // ChangePoint feedback only uses one timestamp
        startTime: orig2.startTime,
        value: orig2.value.changePointValue,
      };
      return result2;
    }
    case "Comment": {
      const orig3 = original as ServiceCommentFeedback;
      const result3: MetricCommentFeedback = {
        ...common,
        feedbackType: "Comment",
        startTime: orig3.startTime,
        endTime: orig3.endTime,
        comment: orig3.value.commentValue,
      };
      return result3;
    }
    case "Period": {
      const orig4 = original as ServicePeriodFeedback;
      const result4: MetricPeriodFeedback = {
        ...common,
        feedbackType: "Period",
        periodType: orig4.value.periodType,
        periodValue: orig4.value.periodValue,
      };
      return result4;
    }
    default:
      throw new Error(
        `Unrecognized feedback type ${(original as ServiceMetricFeedbackUnion).feedbackType}`
      );
  }
}

export function toRollupSettings(original: ServiceDataFeedDetailUnion): DataFeedRollupSettings {
  switch (original.needRollup) {
    case "NoRollup":
    case undefined:
      return {
        rollupType: "NoRollup",
      };
    case "AlreadyRollup":
      return {
        rollupType: "AlreadyRollup",
        rollupIdentificationValue: original.allUpIdentification,
      };
    case "NeedRollup":
      return {
        rollupType: "AutoRollup",
        autoRollupGroupByColumnNames: original.rollUpColumns,
        rollupMethod: original.rollUpMethod,
        rollupIdentificationValue: original.allUpIdentification,
      };
  }
}

export function toServiceRollupSettings(rollupSettings?: DataFeedRollupSettings):
  | {
      needRollup: NeedRollupEnum;
      rollUpColumns?: string[];
      rollUpMethod?: DataFeedDetailRollUpMethod;
      allUpIdentification?: string;
    }
  | undefined {
  if (!rollupSettings) {
    return undefined;
  }
  switch (rollupSettings.rollupType) {
    case "NoRollup":
      return {
        needRollup: "NoRollup",
      };
    case "AlreadyRollup":
      return {
        needRollup: "AlreadyRollup",
        allUpIdentification: rollupSettings.rollupIdentificationValue,
      };
    case "AutoRollup":
      return {
        needRollup: "NeedRollup",
        rollUpColumns: rollupSettings.autoRollupGroupByColumnNames,
        rollUpMethod: rollupSettings.rollupMethod,
        allUpIdentification: rollupSettings.rollupIdentificationValue,
      };
  }
}

function fromServiceGranularity(original: ServiceGranularity, value?: number): DataFeedGranularity {
  switch (original) {
    case "Minutely":
      return { granularityType: "PerMinute" };
    case "Custom":
      return { granularityType: "Custom", customGranularityValue: value! };
    default:
      return { granularityType: original };
  }
}

export function toServiceGranularity(model: DataFeedGranularity): {
  granularityName: ServiceGranularity;
  granularityAmount?: number;
} {
  switch (model.granularityType) {
    case "Custom":
      return { granularityName: "Custom", granularityAmount: model.customGranularityValue };
    case "PerMinute":
      return { granularityName: "Minutely" };
    default:
      return { granularityName: model.granularityType };
  }
}

export function toServiceDataFeedSource(source: DataFeedSource): {
  dataSourceType:
    | "AzureApplicationInsights"
    | "AzureBlob"
    | "AzureCosmosDB"
    | "AzureDataExplorer"
    | "AzureDataLakeStorageGen2"
    | "AzureTable"
    | "InfluxDB"
    | "MySql"
    | "PostgreSql"
    | "SqlServer"
    | "MongoDB"
    | "AzureLogAnalytics"
    | "AzureEventHubs";
  dataSourceParameter:
    | AzureApplicationInsightsParameter
    | AzureCosmosDBParameter
    | MongoDBParameter
    | AzureBlobParameter
    | SqlSourceParameter
    | InfluxDBParameter
    | AzureDataLakeStorageGen2Parameter
    | AzureTableParameter
    | AzureLogAnalyticsParameter
    | AzureEventHubsParameter;
  authenticationType?: AuthenticationTypeEnum;
  credentialId?: string;
} {
  switch (source.dataSourceType) {
    case "MongoDB":
      return {
        dataSourceType: "MongoDB",
        dataSourceParameter: {
          command: source.command,
          database: source.database,
          connectionString: source.connectionString,
        },
        authenticationType: source.authenticationType,
      };
    case "AzureApplicationInsights": {
      return {
        dataSourceType: "AzureApplicationInsights",
        dataSourceParameter: {
          azureCloud: source.azureCloud,
          applicationId: source.applicationId,
          apiKey: source.apiKey,
          query: source.query,
        },
        authenticationType: source.authenticationType,
      };
    }
    case "AzureBlob":
      return {
        dataSourceType: "AzureBlob",
        dataSourceParameter: {
          connectionString: source.connectionString,
          container: source.container,
          blobTemplate: source.blobTemplate,
        },
        authenticationType: source.authenticationType,
      };

    case "AzureCosmosDB":
      return {
        dataSourceType: "AzureCosmosDB",
        dataSourceParameter: {
          connectionString: source.connectionString!,
          database: source.database,
          collectionId: source.collectionId,
          sqlQuery: source.sqlQuery,
        },
        authenticationType: source.authenticationType,
      };
    case "SqlServer":
      if (source.authenticationType === "AzureSQLConnectionString") {
        return {
          dataSourceType: "SqlServer",
          dataSourceParameter: {
            query: source.query,
          },
          authenticationType: source.authenticationType,
          credentialId: source.credentialId,
        };
      } else if (
        source.authenticationType === "Basic" ||
        source.authenticationType === "ManagedIdentity"
      ) {
        return {
          dataSourceType: "SqlServer",
          dataSourceParameter: {
            query: source.query,
            connectionString: source.connectionString,
          },
          authenticationType: source.authenticationType,
        };
      } else {
        return {
          dataSourceType: "SqlServer",
          dataSourceParameter: {
            query: source.query,
            connectionString: source.connectionString,
          },
          authenticationType: source.authenticationType,
          credentialId: source.credentialId,
        };
      }
    case "AzureDataExplorer":
      if (
        source.authenticationType === "ServicePrincipal" ||
        source.authenticationType === "ServicePrincipalInKV"
      ) {
        return {
          dataSourceType: "AzureDataExplorer",
          dataSourceParameter: {
            connectionString: source.connectionString,
            query: source.query,
          },
          authenticationType: source.authenticationType,
          credentialId: source.credentialId,
        };
      } else {
        return {
          dataSourceType: "AzureDataExplorer",
          dataSourceParameter: {
            connectionString: source.connectionString,
            query: source.query,
          },
          authenticationType: source.authenticationType,
        };
      }
    case "AzureDataLakeStorageGen2":
      if (source.authenticationType === "Basic") {
        return {
          dataSourceType: "AzureDataLakeStorageGen2",
          dataSourceParameter: {
            accountName: source.accountName,
            directoryTemplate: source.directoryTemplate,
            fileTemplate: source.fileTemplate,
            fileSystemName: source.fileSystemName,
            accountKey: source.accountKey,
          },
          authenticationType: source.authenticationType,
        };
      } else if (source.authenticationType === "ManagedIdentity") {
        return {
          dataSourceType: "AzureDataLakeStorageGen2",
          dataSourceParameter: {
            accountName: source.accountName,
            directoryTemplate: source.directoryTemplate,
            fileTemplate: source.fileTemplate,
            fileSystemName: source.fileSystemName,
          },
          authenticationType: source.authenticationType,
        };
      } else {
        return {
          dataSourceType: "AzureDataLakeStorageGen2",
          dataSourceParameter: {
            accountName: source.accountName,
            directoryTemplate: source.directoryTemplate,
            fileTemplate: source.fileTemplate,
            fileSystemName: source.fileSystemName,
          },
          authenticationType: source.authenticationType,
          credentialId: source.credentialId,
        };
      }
    case "AzureEventHubs":
      return {
        dataSourceType: "AzureEventHubs",
        dataSourceParameter: {
          connectionString: source.connectionString!,
          consumerGroup: source.consumerGroup,
        },
        authenticationType: source.authenticationType,
      };
    case "AzureLogAnalytics":
      if (source.authenticationType === "Basic") {
        return {
          dataSourceType: "AzureLogAnalytics",
          dataSourceParameter: {
            tenantId: source.tenantId,
            clientId: source.clientId,
            clientSecret: source.clientSecret!,
            workspaceId: source.workspaceId,
            query: source.query,
          },
          authenticationType: source.authenticationType,
        };
      } else {
        return {
          dataSourceType: "AzureLogAnalytics",
          dataSourceParameter: {
            workspaceId: source.workspaceId,
            query: source.query,
          },
          authenticationType: source.authenticationType,
          credentialId: source.credentialId,
        };
      }

    case "AzureTable":
      return {
        dataSourceType: "AzureTable",
        dataSourceParameter: {
          query: source.query,
          connectionString: source.connectionString,
          table: source.table,
        },
        authenticationType: source.authenticationType,
      };
    case "InfluxDB":
      return {
        dataSourceType: "InfluxDB",
        dataSourceParameter: {
          query: source.query,
          connectionString: source.connectionString,
          database: source.database,
          userName: source.userName,
          password: source.password,
        },
        authenticationType: source.authenticationType,
      };
    case "MySql":
      return {
        dataSourceType: "MySql",
        dataSourceParameter: {
          query: source.query,
          connectionString: source.connectionString,
        },
        authenticationType: source.authenticationType,
      };
    case "PostgreSql":
      return {
        dataSourceType: "PostgreSql",
        dataSourceParameter: {
          query: source.query,
          connectionString: source.connectionString,
        },
        authenticationType: source.authenticationType,
      };
    default:
      throw new Error(`Unexpected datafeed source type: '${source.dataSourceType}'`);
  }
}

export function toServiceDataFeedSourcePatch(source: DataFeedSourcePatch): {
  dataSourceType:
    | "AzureApplicationInsights"
    | "AzureBlob"
    | "AzureCosmosDB"
    | "AzureDataExplorer"
    | "AzureDataLakeStorageGen2"
    | "AzureTable"
    | "InfluxDB"
    | "MySql"
    | "PostgreSql"
    | "SqlServer"
    | "MongoDB"
    | "AzureLogAnalytics"
    | "AzureEventHubs";
  dataSourceParameter:
    | AzureApplicationInsightsParameter
    | AzureCosmosDBParameter
    | MongoDBParameter
    | AzureBlobParameter
    | SqlSourceParameter
    | InfluxDBParameter
    | AzureDataLakeStorageGen2Parameter
    | AzureTableParameter
    | AzureLogAnalyticsParameter
    | AzureEventHubsParameter;
  authenticationType?: AuthenticationTypeEnum;
  credentialId?: string;
} {
  switch (source.dataSourceType) {
    case "MongoDB":
      return {
        dataSourceType: "MongoDB",
        dataSourceParameter: {
          command: source.command!,
          database: source.database,
          connectionString: source.connectionString,
        },
        authenticationType: source.authenticationType,
      };
    case "AzureApplicationInsights": {
      return {
        dataSourceType: "AzureApplicationInsights",
        dataSourceParameter: {
          azureCloud: source.azureCloud,
          applicationId: source.applicationId,
          apiKey: source.apiKey,
          query: source.query!,
        },
        authenticationType: source.authenticationType,
      };
    }
    case "AzureBlob":
      return {
        dataSourceType: "AzureBlob",
        dataSourceParameter: {
          connectionString: source.connectionString,
          container: source.container!,
          blobTemplate: source.blobTemplate!,
        },
        authenticationType: source.authenticationType,
      };

    case "AzureCosmosDB":
      return {
        dataSourceType: "AzureCosmosDB",
        dataSourceParameter: {
          connectionString: source.connectionString,
          database: source.database!,
          collectionId: source.collectionId!,
          sqlQuery: source.sqlQuery!,
        },
        authenticationType: source.authenticationType,
      };
    case "SqlServer":
      if (source.authenticationType === "AzureSQLConnectionString") {
        return {
          dataSourceType: "SqlServer",
          dataSourceParameter: {
            query: source.query!,
          },
          authenticationType: source.authenticationType,
          credentialId: source.credentialId,
        };
      } else if (
        source.authenticationType === "Basic" ||
        source.authenticationType === "ManagedIdentity"
      ) {
        return {
          dataSourceType: "SqlServer",
          dataSourceParameter: {
            query: source.query!,
            connectionString: source.connectionString,
          },
          authenticationType: source.authenticationType,
        };
      } else if (
        source.authenticationType === "ServicePrincipalInKV" ||
        source.authenticationType === "ServicePrincipal"
      ) {
        return {
          dataSourceType: "SqlServer",
          dataSourceParameter: {
            query: source.query!,
            connectionString: source.connectionString,
          },
          authenticationType: source.authenticationType,
          credentialId: source.credentialId,
        };
      } else {
        throw new Error(`Unexpected datafeed authentication type: '${source.authenticationType}'`);
      }

    case "AzureDataExplorer":
      if (
        source.authenticationType === "ServicePrincipal" ||
        source.authenticationType === "ServicePrincipalInKV"
      ) {
        return {
          dataSourceType: "AzureDataExplorer",
          dataSourceParameter: {
            connectionString: source.connectionString,
            query: source.query!,
          },
          authenticationType: source.authenticationType,
          credentialId: source.credentialId,
        };
      } else {
        return {
          dataSourceType: "AzureDataExplorer",
          dataSourceParameter: {
            connectionString: source.connectionString,
            query: source.query!,
          },
          authenticationType: source.authenticationType,
        };
      }
    case "AzureDataLakeStorageGen2":
      if (source.authenticationType === "Basic") {
        return {
          dataSourceType: "AzureDataLakeStorageGen2",
          dataSourceParameter: {
            accountName: source.accountName,
            directoryTemplate: source.directoryTemplate!,
            fileTemplate: source.fileTemplate!,
            fileSystemName: source.fileSystemName!,
            accountKey: source.accountKey,
          },
          authenticationType: source.authenticationType,
        };
      } else if (source.authenticationType === "ManagedIdentity") {
        return {
          dataSourceType: "AzureDataLakeStorageGen2",
          dataSourceParameter: {
            accountName: source.accountName,
            directoryTemplate: source.directoryTemplate!,
            fileTemplate: source.fileTemplate!,
            fileSystemName: source.fileSystemName!,
          },
          authenticationType: source.authenticationType,
        };
      } else if (
        source.authenticationType === "DataLakeGen2SharedKey" ||
        source.authenticationType === "ServicePrincipal" ||
        source.authenticationType === "ServicePrincipalInKV"
      ) {
        return {
          dataSourceType: "AzureDataLakeStorageGen2",
          dataSourceParameter: {
            accountName: source.accountName,
            directoryTemplate: source.directoryTemplate!,
            fileTemplate: source.fileTemplate!,
            fileSystemName: source.fileSystemName!,
          },
          authenticationType: source.authenticationType,
          credentialId: source.credentialId!,
        };
      } else {
        throw new Error(`Unexpected datafeed authentication type: '${source.authenticationType}'`);
      }
    case "AzureEventHubs":
      return {
        dataSourceType: "AzureEventHubs",
        dataSourceParameter: {
          connectionString: source.connectionString!,
          consumerGroup: source.consumerGroup!,
        },
        authenticationType: source.authenticationType,
      };
    case "AzureLogAnalytics":
      if (source.authenticationType === "Basic") {
        return {
          dataSourceType: "AzureLogAnalytics",
          dataSourceParameter: {
            tenantId: source.tenantId,
            clientId: source.clientId,
            clientSecret: source.clientSecret,
            workspaceId: source.workspaceId,
            query: source.query!,
          },
          authenticationType: source.authenticationType,
        };
      } else if (
        source.authenticationType === "ServicePrincipal" ||
        source.authenticationType === "ServicePrincipalInKV"
      ) {
        return {
          dataSourceType: "AzureLogAnalytics",
          dataSourceParameter: {
            workspaceId: source.workspaceId,
            query: source.query!,
          },
          authenticationType: source.authenticationType,
          credentialId: source.credentialId,
        };
      } else {
        throw new Error(`Unexpected datafeed authentication type: '${source.authenticationType}'`);
      }

    case "AzureTable":
      return {
        dataSourceType: "AzureTable",
        dataSourceParameter: {
          query: source.query!,
          connectionString: source.connectionString,
          table: source.table,
        },
        authenticationType: source.authenticationType,
      };
    case "InfluxDB":
      return {
        dataSourceType: "InfluxDB",
        dataSourceParameter: {
          query: source.query!,
          connectionString: source.connectionString,
          database: source.database,
          userName: source.userName,
          password: source.password,
        },
        authenticationType: source.authenticationType,
      };
    case "MySql":
      return {
        dataSourceType: "MySql",
        dataSourceParameter: {
          query: source.query!,
          connectionString: source.connectionString,
        },
        authenticationType: source.authenticationType,
      };
    case "PostgreSql":
      return {
        dataSourceType: "PostgreSql",
        dataSourceParameter: {
          query: source.query!,
          connectionString: source.connectionString,
        },
        authenticationType: source.authenticationType,
      };
    default:
      throw new Error(`Unexpected datafeed source type: '${source.dataSourceType}'`);
  }
}

export function fromServiceDataFeedDetailUnion(
  original: ServiceDataFeedDetailUnion
): MetricsAdvisorDataFeed {
  const metricMap: Record<string, string> = {};
  for (const metric of original.metrics) {
    metricMap[metric.name] = metric.id!;
  }

  const common = {
    id: original.dataFeedId!,
    name: original.dataFeedName,
    metricIds: metricMap,
    createdOn: original.createdTime!,
    status: original.status!,
    isAdmin: original.isAdmin!,
    creator: original.creator!,
    schema: {
      metrics: original.metrics,
      dimensions: original.dimension,
      timestampColumn: original.timestampColumn,
    },
    granularity: fromServiceGranularity(original.granularityName, original.granularityAmount),
    ingestionSettings: {
      ingestionStartTime: original.dataStartFrom,
      ingestionStartOffsetInSeconds: original.startOffsetInSeconds,
      dataSourceRequestConcurrency: original.maxConcurrency,
      ingestionRetryDelayInSeconds: original.minRetryIntervalInSeconds,
      stopRetryAfterInSeconds: original.stopRetryAfterInSeconds,
    },
    description: original.dataFeedDescription,
    actionLinkTemplate: original.actionLinkTemplate,
    rollupSettings: toRollupSettings(original),
    missingDataPointFillSettings:
      original.fillMissingPointType === "CustomValue"
        ? {
            fillType: original.fillMissingPointType!,
            customFillValue: original.fillMissingPointValue!,
          }
        : {
            fillType: original.fillMissingPointType!,
          },
    accessMode: original.viewMode,
    admins: original.admins,
    viewers: original.viewers,
  };
  switch (original.dataSourceType) {
    case "AzureApplicationInsights": {
      const orig = original as ServiceAzureApplicationInsightsDataFeed;
      const result1: MetricsAdvisorDataFeed = {
        ...common,
        source: {
          dataSourceType: "AzureApplicationInsights",
          azureCloud: orig.dataSourceParameter.azureCloud!,
          applicationId: orig.dataSourceParameter.applicationId!,
          apiKey: orig.dataSourceParameter.apiKey,
          query: orig.dataSourceParameter.query,
          authenticationType: "Basic",
        },
      };
      return result1;
    }
    case "AzureBlob": {
      const orig2 = original as ServiceAzureBlobDataFeed;
      let auth: { authenticationType: "Basic" } | { authenticationType: "ManagedIdentity" };
      if (!original.authenticationType) {
        auth = { authenticationType: "Basic" };
      } else if (
        original.authenticationType === "Basic" ||
        original.authenticationType === "ManagedIdentity"
      ) {
        auth = { authenticationType: original.authenticationType };
      } else {
        throw new Error(`Unexpected authentication type: '${original.authenticationType}'`);
      }
      const source: AzureBlobDataFeedSource = {
        dataSourceType: "AzureBlob",
        blobTemplate: orig2.dataSourceParameter.blobTemplate,
        connectionString: orig2.dataSourceParameter.connectionString!,
        container: orig2.dataSourceParameter.container,
        ...auth,
      };
      const result2: MetricsAdvisorDataFeed = {
        ...common,
        source,
      };
      return result2;
    }
    case "AzureCosmosDB": {
      const orig3 = original as ServiceAzureCosmosDBDataFeed;
      const result3: MetricsAdvisorDataFeed = {
        ...common,
        source: {
          dataSourceType: "AzureCosmosDB",
          authenticationType: "Basic",
          ...orig3.dataSourceParameter,
        },
      };
      return result3;
    }
    case "AzureDataExplorer": {
      const orig4 = original as ServiceAzureDataExplorerDataFeed;
      let auth: AzureDataExplorerAuthTypes;
      if (!original.authenticationType) {
        auth = { authenticationType: "Basic" };
      } else if (
        original.authenticationType === "Basic" ||
        original.authenticationType === "ManagedIdentity"
      ) {
        auth = { authenticationType: original.authenticationType };
      } else if (
        original.authenticationType === "ServicePrincipal" ||
        original.authenticationType === "ServicePrincipalInKV"
      ) {
        auth = {
          authenticationType: original.authenticationType,
          credentialId: original.credentialId!,
        };
      } else {
        throw new Error(`Unexpected authentication type: '${original.authenticationType}'`);
      }
      const source: AzureDataExplorerDataFeedSource = {
        dataSourceType: "AzureDataExplorer",
        connectionString: orig4.dataSourceParameter.connectionString!,
        query: orig4.dataSourceParameter.query,
        ...auth,
      };
      const result4: MetricsAdvisorDataFeed = {
        ...common,
        source,
      };
      return result4;
    }
    case "AzureDataLakeStorageGen2": {
      const orig5 = original as ServiceAzureDataLakeStorageGen2DataFeed;
      let auth: AzureDataLakeStorageGen2AuthTypes;
      if (!original.authenticationType || original.authenticationType === "Basic") {
        auth = { authenticationType: "Basic", accountKey: orig5.dataSourceParameter.accountKey! };
      } else if (original.authenticationType === "ManagedIdentity") {
        auth = { authenticationType: original.authenticationType };
      } else if (
        original.authenticationType === "ServicePrincipal" ||
        original.authenticationType === "ServicePrincipalInKV" ||
        original.authenticationType === "DataLakeGen2SharedKey"
      ) {
        auth = {
          authenticationType: original.authenticationType,
          credentialId: original.credentialId!,
        };
      } else {
        throw new Error(`Unexpected authentication type: '${original.authenticationType}'`);
      }
      const source: AzureDataLakeStorageGen2DataFeedSource = {
        dataSourceType: "AzureDataLakeStorageGen2",
        accountName: orig5.dataSourceParameter.accountName!,
        directoryTemplate: orig5.dataSourceParameter.directoryTemplate,
        fileSystemName: orig5.dataSourceParameter.fileSystemName,
        fileTemplate: orig5.dataSourceParameter.fileTemplate,
        ...auth,
      };
      const result5: MetricsAdvisorDataFeed = {
        ...common,
        source,
      };
      return result5;
    }
    case "AzureTable": {
      const orig6 = original as ServiceAzureTableDataFeed;
      const result6: MetricsAdvisorDataFeed = {
        ...common,
        source: {
          dataSourceType: "AzureTable",
          connectionString: orig6.dataSourceParameter.connectionString!,
          table: orig6.dataSourceParameter.table,
          query: orig6.dataSourceParameter.query,
          authenticationType: "Basic",
        },
      };
      return result6;
    }
    case "InfluxDB": {
      const orig8 = original as ServiceInfluxDBDataFeed;
      const result8: MetricsAdvisorDataFeed = {
        ...common,
        source: {
          dataSourceType: "InfluxDB",
          connectionString: orig8.dataSourceParameter.connectionString!,
          database: orig8.dataSourceParameter.database!,
          password: orig8.dataSourceParameter.password!,
          query: orig8.dataSourceParameter.query,
          userName: orig8.dataSourceParameter.userName!,
          authenticationType: "Basic",
        },
      };
      return result8;
    }
    case "MongoDB": {
      const orig9 = original as ServiceMongoDBDataFeed;
      const result9: MetricsAdvisorDataFeed = {
        ...common,
        source: {
          dataSourceType: "MongoDB",
          connectionString: orig9.dataSourceParameter.connectionString!,
          database: orig9.dataSourceParameter.database!,
          command: orig9.dataSourceParameter.command,
          authenticationType: "Basic",
        },
      };
      return result9;
    }
    case "MySql": {
      const orig10 = original as ServiceMySqlDataFeed;
      const result10: MetricsAdvisorDataFeed = {
        ...common,
        source: {
          dataSourceType: "MySql",
          connectionString: orig10.dataSourceParameter.connectionString,
          query: orig10.dataSourceParameter.query,
          authenticationType: "Basic",
        },
      };
      return result10;
    }
    case "PostgreSql": {
      const orig11 = original as ServicePostgreSqlDataFeed;
      const result11: MetricsAdvisorDataFeed = {
        ...common,
        source: {
          dataSourceType: "PostgreSql",
          connectionString: orig11.dataSourceParameter.connectionString,
          query: orig11.dataSourceParameter.query,
          authenticationType: "Basic",
        },
      };
      return result11;
    }
    case "SqlServer": {
      const orig12 = original as ServiceSQLServerDataFeed;
      let auth: SqlServerAuthTypes;
      if (!original.authenticationType) {
        auth = {
          authenticationType: "Basic",
          connectionString: orig12.dataSourceParameter.connectionString!,
        };
      }
      if (
        original.authenticationType === "Basic" ||
        original.authenticationType === "ManagedIdentity"
      ) {
        auth = {
          authenticationType: original.authenticationType,
          connectionString: orig12.dataSourceParameter.connectionString!,
        };
      } else if (
        original.authenticationType === "ServicePrincipal" ||
        original.authenticationType === "ServicePrincipalInKV"
      ) {
        auth = {
          authenticationType: original.authenticationType,
          credentialId: orig12.credentialId!,
          connectionString: orig12.dataSourceParameter.connectionString!,
        };
      } else if (original.authenticationType === "AzureSQLConnectionString") {
        auth = {
          authenticationType: original.authenticationType,
          credentialId: original.credentialId!,
        };
      } else {
        throw new Error(`Unexpected authentication type: '${original.authenticationType}'`);
      }
      const result12: MetricsAdvisorDataFeed = {
        ...common,
        source: {
          dataSourceType: "SqlServer",
          query: orig12.dataSourceParameter.query,
          ...auth,
        },
      };
      return result12;
    }
    case "AzureEventHubs": {
      const orig13 = original as ServiceAzureEventHubsDataFeed;
      const result13: MetricsAdvisorDataFeed = {
        ...common,
        source: {
          dataSourceType: "AzureEventHubs",
          connectionString: orig13.dataSourceParameter.connectionString,
          consumerGroup: orig13.dataSourceParameter.consumerGroup,
          authenticationType: "Basic",
        },
      };
      return result13;
    }
    case "AzureLogAnalytics": {
      const orig14 = original as ServiceAzureLogAnalyticsDataFeed;
      const result14: MetricsAdvisorDataFeed = {
        ...common,
        source: {
          dataSourceType: "AzureLogAnalytics",
          clientId: orig14.dataSourceParameter.clientId!,
          clientSecret: orig14.dataSourceParameter.clientSecret,
          tenantId: orig14.dataSourceParameter.tenantId!,
          query: orig14.dataSourceParameter.query,
          workspaceId: orig14.dataSourceParameter.workspaceId,
          authenticationType: "Basic",
        },
      };
      return result14;
    }
    default:
      return {
        ...common,
        source: {
          dataSourceType: "Unknown",
          dataSourceParameter: (original as any).dataSourceParameter,
          authenticationType: "Basic",
        },
      };
  }
}

export function fromServiceHookInfoUnion(original: ServiceHookInfoUnion): NotificationHookUnion {
  const common: NotificationHook = {
    id: original.id,
    name: original.name,
    description: original.description,
    externalLink: original.externalLink,
    admins: original.admins,
  };
  switch (original.hookType) {
    case "Email": {
      const orig1 = original as EmailHookInfo;
      const result1: NotificationHookUnion = {
        ...common,
        hookType: "Email",
        hookParameter: orig1.hookParameter,
      };
      return result1;
    }
    case "Webhook": {
      const orig2 = original as WebhookHookInfo;
      const result2: NotificationHookUnion = {
        ...common,
        hookType: "Webhook",
        hookParameter: orig2.hookParameter,
      };
      return result2;
    }
    default:
      throw new Error(
        `Unrecognized hook union type ${(original as ServiceHookInfoUnion).hookType}`
      );
  }
}

export function toServiceMetricFeedbackUnion(
  from: MetricFeedbackUnion
): ServiceMetricFeedbackUnion {
  const common = {
    feedbackId: from.id,
    metricId: from.metricId,
    dimensionFilter: { dimension: from.dimensionKey },
  };
  switch (from.feedbackType) {
    case "Anomaly":
      return {
        ...common,
        feedbackType: from.feedbackType,
        startTime: from.startTime,
        endTime: from.endTime,
        value: {
          anomalyValue: from.value!,
        },
      };
    case "ChangePoint":
      return {
        ...common,
        feedbackType: from.feedbackType,
        // ChangePoint feedback only uses one timestamp
        startTime: from.startTime,
        endTime: from.startTime,
        value: {
          changePointValue: from.value!,
        },
      };
    case "Comment":
      return {
        ...common,
        feedbackType: from.feedbackType,
        value: {
          commentValue: from.comment!,
        },
      };
    case "Period":
      return {
        ...common,
        feedbackType: from.feedbackType,
        value: {
          periodType: from.periodType!,
          periodValue: from.periodValue!,
        },
      };
  }
}

export function fromServiceAlertConfiguration(
  result: ServiceAnomalyAlertingConfiguration
): AnomalyAlertConfiguration {
  return {
    id: result.anomalyAlertingConfigurationId!,
    name: result.name,
    hookIds: result.hookIds,
    description: result.description,
    crossMetricsOperator: result.crossMetricsOperator,
    metricAlertConfigurations: result.metricAlertingConfigurations.map((c) => {
      const alertScope: MetricAnomalyAlertScope =
        c.anomalyScopeType === "All"
          ? { scopeType: "All" }
          : c.anomalyScopeType === "Dimension"
          ? { scopeType: "Dimension", seriesGroupInScope: c.dimensionAnomalyScope!.dimension }
          : { scopeType: "TopN", topNAnomalyScope: c.topNAnomalyScope! };
      return {
        detectionConfigurationId: c.anomalyDetectionConfigurationId,
        alertScope,
        negationOperation: c.negationOperation,
        snoozeCondition: c.snoozeFilter,
        alertConditions: {
          severityCondition: c.severityFilter,
          metricBoundaryCondition: c.valueFilter as MetricBoundaryCondition,
        },
      };
    }),
    dimensionsToSplitAlert: result.splitAlertByDimensions,
  };
}

export function toServiceAlertConfiguration(
  from: Omit<AnomalyAlertConfiguration, "id">
): ServiceAnomalyAlertingConfiguration {
  return {
    name: from.name,
    hookIds: from.hookIds,
    description: from.description,
    crossMetricsOperator: from.crossMetricsOperator,
    metricAlertingConfigurations: from.metricAlertConfigurations.map((c) => {
      const alertScope =
        c.alertScope.scopeType === "All"
          ? { anomalyScopeType: "All" }
          : c.alertScope.scopeType === "Dimension"
          ? {
              anomalyScopeType: "Dimension",
              dimensionAnomalyScope: { dimension: c.alertScope.seriesGroupInScope },
            }
          : { anomalyScopeType: "TopN", topNAnomalyScope: c.alertScope.topNAnomalyScope };
      return {
        anomalyDetectionConfigurationId: c.detectionConfigurationId,
        anomalyScopeType: alertScope.anomalyScopeType as ServiceAnomalyScope,
        dimensionAnomalyScope: alertScope.dimensionAnomalyScope,
        topNAnomalyScope: alertScope.topNAnomalyScope,
        negationOperation: c.negationOperation,
        snoozeFilter: c.snoozeCondition,
        severityFilter: c.alertConditions?.severityCondition,
        valueFilter: c.alertConditions?.metricBoundaryCondition,
      };
    }),
    splitAlertByDimensions: from.dimensionsToSplitAlert,
  };
}

export function toServiceAlertConfigurationPatch(
  from: Partial<Omit<AnomalyAlertConfiguration, "id">>
): Partial<ServiceAnomalyAlertingConfiguration> {
  return {
    name: from.name,
    hookIds: from.hookIds,
    description: from.description,
    crossMetricsOperator: from.crossMetricsOperator,
    metricAlertingConfigurations: from.metricAlertConfigurations?.map((c) => {
      const alertScope =
        c.alertScope.scopeType === "All"
          ? { anomalyScopeType: "All" }
          : c.alertScope.scopeType === "Dimension"
          ? {
              anomalyScopeType: "Dimension",
              dimensionAnomalyScope: { dimension: c.alertScope.seriesGroupInScope },
            }
          : { anomalyScopeType: "TopN", topNAnomalyScope: c.alertScope.topNAnomalyScope };
      return {
        anomalyDetectionConfigurationId: c.detectionConfigurationId,
        anomalyScopeType: alertScope.anomalyScopeType as ServiceAnomalyScope,
        dimensionAnomalyScope: alertScope.dimensionAnomalyScope,
        topNAnomalyScope: alertScope.topNAnomalyScope,
        negationOperation: c.negationOperation,
        snoozeFilter: c.snoozeCondition,
        severityFilter: c.alertConditions?.severityCondition,
        valueFilter: c.alertConditions?.metricBoundaryCondition,
      };
    }),
    splitAlertByDimensions: from.dimensionsToSplitAlert,
  };
}

export function fromServiceCredential(
  result: ServiceDataSourceCredentialUnion
): DataSourceCredentialEntityUnion {
  const common: DataSourceCredentialEntity = {
    description: result.dataSourceCredentialDescription,
    id: result.dataSourceCredentialId,
    name: result.dataSourceCredentialName,
  };
  switch (result.dataSourceCredentialType) {
    case "AzureSQLConnectionString": {
      const cred1 = result as AzureSQLConnectionStringCredential;
      return {
        ...common,
        type: "AzureSQLConnectionString",
        ...cred1.parameters,
      };
    }
    case "DataLakeGen2SharedKey": {
      const cred2 = result as DataLakeGen2SharedKeyCredential;
      return {
        ...common,
        type: "DataLakeGen2SharedKey",
        ...cred2.parameters,
      };
    }
    case "ServicePrincipal": {
      const cred3 = result as ServicePrincipalCredential;
      return {
        ...common,
        type: "ServicePrincipal",
        ...cred3.parameters,
      };
    }
    case "ServicePrincipalInKV": {
      const cred4 = result as ServicePrincipalInKVCredential;
      return {
        ...common,
        type: "ServicePrincipalInKV",
        ...cred4.parameters,
      };
    }
  }
}

export function toServiceCredential(
  from: DataSourceCredentialEntityUnion
): ServiceDataSourceCredentialUnion {
  const common = {
    dataSourceCredentialName: from.name,
    dataSourceCredentialDescription: from.description,
  };
  switch (from.type) {
    case "AzureSQLConnectionString": {
      const parameters = {
        connectionString: from.connectionString,
      };
      const sqlcred: AzureSQLConnectionStringCredential = {
        ...common,
        dataSourceCredentialType: from.type,
        parameters,
      };
      return sqlcred;
    }
    case "DataLakeGen2SharedKey": {
      const datalake: DataLakeGen2SharedKeyCredential = {
        ...common,
        dataSourceCredentialType: from.type,
        parameters: {
          accountKey: from.accountKey,
        },
      };
      return datalake;
    }
    case "ServicePrincipal": {
      const sp: ServicePrincipalCredential = {
        ...common,
        dataSourceCredentialType: from.type,
        parameters: {
          clientId: from.clientId,
          clientSecret: from.clientSecret,
          tenantId: from.tenantId,
        },
      };
      return sp;
    }
    case "ServicePrincipalInKV": {
      const spInKV: ServicePrincipalInKVCredential = {
        ...common,
        dataSourceCredentialType: from.type,
        parameters: {
          keyVaultEndpoint: from.keyVaultEndpoint,
          keyVaultClientId: from.keyVaultClientId,
          keyVaultClientSecret: from.keyVaultClientSecret,
          servicePrincipalIdNameInKV: from.servicePrincipalIdNameInKV,
          servicePrincipalSecretNameInKV: from.servicePrincipalSecretNameInKV,
          tenantId: from.tenantId,
        },
      };
      return spInKV;
    }
  }
}

export function toServiceCredentialPatch(
  from: DataSourceCredentialPatch
): ServiceDataSourceCredentialPatch {
  const common = {
    dataSourceCredentialName: from.name,
    dataSourceCredentialDescription: from.description,
  };
  switch (from.type) {
    case "AzureSQLConnectionString": {
      const cred1 = from as DataSourceSqlServerConnectionStringPatch;
      return {
        ...common,
        dataSourceCredentialType: from.type,
        parameters: {
          connectionString: cred1.connectionString,
        },
      };
    }
    case "DataLakeGen2SharedKey": {
      const cred2 = from as DataSourceDataLakeGen2SharedKeyPatch;
      return {
        ...common,
        dataSourceCredentialType: from.type,
        parameters: {
          accountKey: cred2.accountKey,
        },
      };
    }
    case "ServicePrincipal": {
      const cred3 = from as DataSourceServicePrincipalPatch;
      return {
        ...common,
        dataSourceCredentialType: from.type,
        parameters: {
          clientId: cred3.clientId,
          clientSecret: cred3.clientSecret,
          tenantId: cred3.tenantId,
        },
      };
    }
    case "ServicePrincipalInKV": {
      const cred4 = from as DataSourceServicePrincipalInKeyVaultPatch;
      return {
        ...common,
        dataSourceCredentialType: from.type,
        parameters: {
          keyVaultEndpoint: cred4.keyVaultEndpoint,
          keyVaultClientId: cred4.keyVaultClientId,
          keyVaultClientSecret: cred4.keyVaultClientSecret,
          servicePrincipalIdNameInKV: cred4.servicePrincipalIdNameInKV,
          servicePrincipalSecretNameInKV: cred4.servicePrincipalSecretNameInKV,
          tenantId: cred4.tenantId,
        },
      };
    }
  }
}
