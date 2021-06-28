let nock = require('nock');

module.exports.hash = "b305b062177574b168150bc47bb53ffe";

module.exports.testInfo = {"uniqueName":{"js-test-datafeed-":"js-test-datafeed-162456614300300139","js-test-appInsightsFeed-":"js-test-appInsightsFeed-162456614300408925","js-test-sqlServerFeed-":"js-test-sqlServerFeed-162456614300402561","js-test-cosmosFeed-":"js-test-cosmosFeed-162456614300400836","js-test-dataExplorerFeed-":"js-test-dataExplorerFeed-162456614300402514","js-test-tableFeed-":"js-test-tableFeed-162456614300409086","js-test-httpRequestFeed-":"js-test-httpRequestFeed-162456614300408284","js-test-logAnalyticsFeed-":"js-test-logAnalyticsFeed-162456614300401025","js-test-influxdbFeed-":"js-test-influxdbFeed-162456614300401958","js-test-mongoDbFeed-":"js-test-mongoDbFeed-162456614300402402","js-test-mySqlFeed-":"js-test-mySqlFeed-162456614300400971","js-test-postgreSqlFeed-":"js-test-postgreSqlFeed-162456614300408445","js-test-dataLakeGenFeed-":"js-test-dataLakeGenFeed-162456614300400179"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureEventHubs","dataFeedName":"js-test-httpRequestFeed-162456614300408284","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"eventhub-connection-string","consumerGroup":"consumer-group"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/49afdaec-205b-4211-8020-56a7458063c2',
  'x-request-id',
  'fb26ee74-d492-4354-ae45-99e8253fdfb7',
  'x-envoy-upstream-service-time',
  '2233',
  'apim-request-id',
  'fb26ee74-d492-4354-ae45-99e8253fdfb7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 24 Jun 2021 20:22:24 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/49afdaec-205b-4211-8020-56a7458063c2')
  .reply(200, {"dataFeedId":"49afdaec-205b-4211-8020-56a7458063c2","dataFeedName":"js-test-httpRequestFeed-162456614300408284","metrics":[{"metricId":"f0d89260-9d15-438f-865c-877a65558832","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"05627ee3-091c-4d8c-8263-819e6d689193","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2021-06-24T00:00:00Z","dataSourceType":"AzureEventHubs","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-06-24T20:22:24Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"consumerGroup":"consumer-group"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1233',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b8689547-dcd2-4a12-8cfd-7ebf3cf2e8d5',
  'x-envoy-upstream-service-time',
  '500',
  'apim-request-id',
  'b8689547-dcd2-4a12-8cfd-7ebf3cf2e8d5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 24 Jun 2021 20:22:25 GMT'
]);
