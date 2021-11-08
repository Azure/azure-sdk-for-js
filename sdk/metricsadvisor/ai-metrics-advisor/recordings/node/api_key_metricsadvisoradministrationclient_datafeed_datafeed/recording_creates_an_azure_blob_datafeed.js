let nock = require('nock');

module.exports.hash = "413113d9b30eef2f13c2941fcef17d32";

module.exports.testInfo = {"uniqueName":{"js-test-datafeed-":"js-test-datafeed-163634432099807600","js-test-appInsightsFeed-":"js-test-appInsightsFeed-163634432099808480","js-test-sqlServerFeed-":"js-test-sqlServerFeed-163634432099804880","js-test-cosmosFeed-":"js-test-cosmosFeed-163634432099804715","js-test-dataExplorerFeed-":"js-test-dataExplorerFeed-163634432099806912","js-test-tableFeed-":"js-test-tableFeed-163634432099804800","js-test-eventhubRequestFeed-":"js-test-eventhubRequestFeed-163634432099805861","js-test-logAnalyticsFeed-":"js-test-logAnalyticsFeed-163634432099803631","js-test-influxdbFeed-":"js-test-influxdbFeed-163634432099905915","js-test-mongoDbFeed-":"js-test-mongoDbFeed-163634432099900834","js-test-mySqlFeed-":"js-test-mySqlFeed-163634432099909086","js-test-postgreSqlFeed-":"js-test-postgreSqlFeed-163634432099907133","js-test-dataLakeGenFeed-":"js-test-dataLakeGenFeed-163634432099900487"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureBlob","dataFeedName":"js-test-datafeed-163634432099807600","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"blob_connection_string","container":"adsample","blobTemplate":"blob_template"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/0992b58a-87f5-498b-8909-081a9fe869bb',
  'x-request-id',
  '9336e541-d8fb-4e3a-b6ab-60c94ac21063',
  'x-envoy-upstream-service-time',
  '633',
  'apim-request-id',
  '9336e541-d8fb-4e3a-b6ab-60c94ac21063',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:21 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/0992b58a-87f5-498b-8909-081a9fe869bb')
  .reply(200, {"dataFeedId":"0992b58a-87f5-498b-8909-081a9fe869bb","dataFeedName":"js-test-datafeed-163634432099807600","metrics":[{"metricId":"93c9504e-a2f0-4be8-aed5-4f2933d487b1","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"1638e0e5-c0be-4dca-a1cd-207eb6ece0de","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-11-08T04:05:21Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"container":"adsample","blobTemplate":"blob_template"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1248',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '372fb682-3c0f-422c-b191-da5d8ac0ef99',
  'x-envoy-upstream-service-time',
  '202',
  'apim-request-id',
  '372fb682-3c0f-422c-b191-da5d8ac0ef99',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:21 GMT'
]);
