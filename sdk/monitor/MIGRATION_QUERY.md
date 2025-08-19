# How to migrate away from @azure/monitor-query

To migrate away from the deprecated [@azure/monitor-query](https://www.npmjs.com/package/@azure/monitor-query) package, see the table below.

| Client name          | Replacement package            | Migration guidance |
|----------------------|--------------------------------|--------------------|
| `LogsQueryClient`    | [@azure/monitor-query-logs]    | [Guide][mg-lqc]    |
| `MetricsClient`      | [@azure/monitor-query-metrics] | [Guide][mg-mc]     |
| `MetricsQueryClient` | [@azure/arm-monitor]           | [Guide][mg-mqc]    |

<!-- LINKS -->
[@azure/arm-monitor]: https://www.npmjs.com/package/@azure/arm-monitor
[@azure/monitor-query-logs]: https://www.npmjs.com/package/@azure/monitor-query-logs
[@azure/monitor-query-metrics]: https://www.npmjs.com/package/@azure/monitor-query-metrics
[mg-lqc]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-query-logs/MIGRATION.md
[mg-mc]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-query-metrics/MIGRATION.md
[mg-mqc]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitor/MIGRATION_METRICSQUERYCLIENT_TO_ARM_MONITOR.md
