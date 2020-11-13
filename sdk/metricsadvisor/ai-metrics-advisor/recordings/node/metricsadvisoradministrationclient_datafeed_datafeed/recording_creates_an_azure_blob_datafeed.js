let nock = require('nock');

module.exports.hash = "6a09f9748a6dda59ca3900c559706bda";

module.exports.testInfo = {"uniqueName":{"js-test-datafeed-":"js-test-datafeed-160529679231907425","js-test-appInsightsFeed-":"js-test-appInsightsFeed-160529679231907356","js-test-sqlServerFeed-":"js-test-sqlServerFeed-160529679231907547","js-test-cosmosFeed-":"js-test-cosmosFeed-160529679231909384","js-test-dataExplorerFeed-":"js-test-dataExplorerFeed-160529679231903768","js-test-tableFeed-":"js-test-tableFeed-160529679231907504","js-test-httpRequestFeed-":"js-test-httpRequestFeed-160529679231905989","js-test-influxdbFeed-":"js-test-influxdbFeed-160529679231903636","js-test-mongoDbFeed-":"js-test-mongoDbFeed-160529679231905659","js-test-mySqlFeed-":"js-test-mySqlFeed-160529679231904336","js-test-postgreSqlFeed-":"js-test-postgreSqlFeed-160529679231900484"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureBlob","dataFeedName":"js-test-datafeed-160529679231907425","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"connectionString":"blob_connection_string","container":"blob_container","blobTemplate":"blob_template"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/9e35715d-720b-4147-82fe-f79f3c56dc61',
  'x-request-id',
  '7e3e9de8-aa99-4d20-bfef-527938f29b77',
  'x-envoy-upstream-service-time',
  '700',
  'apim-request-id',
  '7e3e9de8-aa99-4d20-bfef-527938f29b77',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:32 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/9e35715d-720b-4147-82fe-f79f3c56dc61')
  .reply(200, {"dataFeedId":"9e35715d-720b-4147-82fe-f79f3c56dc61","dataFeedName":"js-test-datafeed-160529679231907425","metrics":[{"metricId":"81a4fe34-cc1c-4859-9944-f5bcc12367d2","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"9fefb598-e0d2-4284-9b7e-6fd2aeed08ea","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-13T19:46:32Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"container":"blob_container","connectionString":"blob_connection_string","blobTemplate":"blob_template"}}, [
  'Content-Length',
  '1687',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'd596a4e1-a7c8-40ee-81b3-2a7e0be31ac5',
  'x-envoy-upstream-service-time',
  '150',
  'apim-request-id',
  'd596a4e1-a7c8-40ee-81b3-2a7e0be31ac5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:32 GMT'
]);
