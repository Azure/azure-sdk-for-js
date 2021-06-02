let nock = require('nock');

module.exports.hash = "b6a74d9b0729403e262c11fc6d370f47";

module.exports.testInfo = {"uniqueName":{"js-test-datafeed-":"js-test-datafeed-162260135760501522","js-test-appInsightsFeed-":"js-test-appInsightsFeed-162260135760506331","js-test-sqlServerFeed-":"js-test-sqlServerFeed-162260135760508159","js-test-cosmosFeed-":"js-test-cosmosFeed-162260135760508287","js-test-dataExplorerFeed-":"js-test-dataExplorerFeed-162260135760505852","js-test-tableFeed-":"js-test-tableFeed-162260135760504401","js-test-httpRequestFeed-":"js-test-httpRequestFeed-162260135760504445","js-test-influxdbFeed-":"js-test-influxdbFeed-162260135760508899","js-test-mongoDbFeed-":"js-test-mongoDbFeed-162260135760504350","js-test-mySqlFeed-":"js-test-mySqlFeed-162260135760503230","js-test-postgreSqlFeed-":"js-test-postgreSqlFeed-162260135760506072"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureBlob","dataFeedName":"js-test-datafeed-162260135760501522","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"blob_connection_string","container":"adsample","blobTemplate":"blob_template"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/667c1f71-6f1c-453c-b647-7afbb0ae3820',
  'x-request-id',
  '50349444-4a69-4032-9837-0c4d23015a86',
  'x-envoy-upstream-service-time',
  '5824',
  'apim-request-id',
  '50349444-4a69-4032-9837-0c4d23015a86',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 02:36:02 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/667c1f71-6f1c-453c-b647-7afbb0ae3820')
  .reply(200, {"dataFeedId":"667c1f71-6f1c-453c-b647-7afbb0ae3820","dataFeedName":"js-test-datafeed-162260135760501522","metrics":[{"metricId":"29d0fc23-9eb6-4dcc-bdd0-e856f72657ec","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"85e85e8c-9801-4bb8-ae98-88aa6f7ebdf7","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-06-02T02:36:03Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"container":"adsample","blobTemplate":"blob_template"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1264',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b81eeeaa-cc0c-450c-9ad8-83ab36e3f9ee',
  'x-envoy-upstream-service-time',
  '242',
  'apim-request-id',
  'b81eeeaa-cc0c-450c-9ad8-83ab36e3f9ee',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 02:36:02 GMT'
]);
