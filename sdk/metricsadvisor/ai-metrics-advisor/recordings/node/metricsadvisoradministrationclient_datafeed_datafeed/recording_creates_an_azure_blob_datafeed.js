let nock = require('nock');

module.exports.hash = "8c4ac96851c1b9b6546de6dbc14adc6a";

module.exports.testInfo = {"uniqueName":{"js-test-datafeed-":"js-test-datafeed-160530907341201805","js-test-appInsightsFeed-":"js-test-appInsightsFeed-160530907341201171","js-test-sqlServerFeed-":"js-test-sqlServerFeed-160530907341201978","js-test-cosmosFeed-":"js-test-cosmosFeed-160530907341208834","js-test-dataExplorerFeed-":"js-test-dataExplorerFeed-160530907341205388","js-test-tableFeed-":"js-test-tableFeed-160530907341205255","js-test-httpRequestFeed-":"js-test-httpRequestFeed-160530907341203221","js-test-influxdbFeed-":"js-test-influxdbFeed-160530907341202296","js-test-mongoDbFeed-":"js-test-mongoDbFeed-160530907341201749","js-test-mySqlFeed-":"js-test-mySqlFeed-160530907341205359","js-test-postgreSqlFeed-":"js-test-postgreSqlFeed-160530907341207128"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureBlob","dataFeedName":"js-test-datafeed-160530907341201805","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"connectionString":"blob_connection_string","container":"adsample","blobTemplate":"blob_template"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/f516e8ad-c70f-4471-962f-a6e77637f5d1',
  'x-request-id',
  '5a53856b-d68c-45f4-b6d0-ef9b19c222c6',
  'x-envoy-upstream-service-time',
  '1037',
  'apim-request-id',
  '5a53856b-d68c-45f4-b6d0-ef9b19c222c6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 23:11:14 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/f516e8ad-c70f-4471-962f-a6e77637f5d1')
  .reply(200, {"dataFeedId":"f516e8ad-c70f-4471-962f-a6e77637f5d1","dataFeedName":"js-test-datafeed-160530907341201805","metrics":[{"metricId":"9347b82d-4eea-4bbb-9957-c51d5c960136","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"ba95d4b6-dddd-484b-aa93-689e6ae29d5f","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-13T23:11:14Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"container":"adsample","connectionString":"blob_connection_string","blobTemplate":"blob_template"}}, [
  'Content-Length',
  '1687',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b69655f9-a350-4801-a0b2-8bd2a1fac416',
  'x-envoy-upstream-service-time',
  '5509',
  'apim-request-id',
  'b69655f9-a350-4801-a0b2-8bd2a1fac416',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 23:11:19 GMT'
]);
