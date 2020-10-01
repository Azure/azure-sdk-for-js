let nock = require('nock');

module.exports.hash = "b976c4310f1f407a8c3e28736c499bd5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureDataLakeStorageGen2","dataFeedName":"js-test-dataLakeStorageGenFeed-160045525950301453","granularityName":"Daily","metrics":[{"metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"accountName":"storage","accountKey":"storageKey","fileSystemName":"data-lake-file","directoryTemplate":"%Y/%m/%d","fileTemplate":"template.json"}})
  .reply(400, {"code":"BadRequest","message":"JSON parse error: Cannot deserialize value of type `com.microsoft.powerai.metadata3p.adapter.meta.v1.apiContract.dataSource.DataSourceTypeV1` from String \"AzureDataLakeStorageGen2\": value not one of declared Enum instance names: [SqlServer, MySql, PostgreSql, HttpRequest, AzureDataExplorer, AzureEventHubs, InfluxDB, AzureTable, MongoDB, AzureCosmosDB, AzureApplicationInsights, AzureBlob]; nested exception is com.fasterxml.jackson.databind.exc.InvalidFormatException: Cannot deserialize value of type `com.microsoft.powerai.metadata3p.adapter.meta.v1.apiContract.dataSource.DataSourceTypeV1` from String \"AzureDataLakeStorageGen2\": value not one of declared Enum instance names: [SqlServer, MySql, PostgreSql, HttpRequest, AzureDataExplorer, AzureEventHubs, InfluxDB, AzureTable, MongoDB, AzureCosmosDB, AzureApplicationInsights, AzureBlob]\n at [Source: (PushbackInputStream); line: 1, column: 19] (through reference chain: com.microsoft.powerai.metadata3p.adapter.meta.v1.apiContract.DatafeedDetailV1[\"dataSourceType\"])"}, [
  'Content-Length',
  '1064',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c10adf5e-e809-4a97-8375-bf05acc6de70',
  'x-envoy-upstream-service-time',
  '54',
  'apim-request-id',
  'c10adf5e-e809-4a97-8375-bf05acc6de70',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 18 Sep 2020 18:54:35 GMT'
]);
