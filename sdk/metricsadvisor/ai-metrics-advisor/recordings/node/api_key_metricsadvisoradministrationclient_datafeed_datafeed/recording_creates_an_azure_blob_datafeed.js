let nock = require('nock');

module.exports.hash = "b6a74d9b0729403e262c11fc6d370f47";

module.exports.testInfo = {"uniqueName":{"js-test-datafeed-":"js-test-datafeed-162260297550809501","js-test-appInsightsFeed-":"js-test-appInsightsFeed-162260297550807806","js-test-sqlServerFeed-":"js-test-sqlServerFeed-162260297550803908","js-test-cosmosFeed-":"js-test-cosmosFeed-162260297550808659","js-test-dataExplorerFeed-":"js-test-dataExplorerFeed-162260297550806768","js-test-tableFeed-":"js-test-tableFeed-162260297550802327","js-test-httpRequestFeed-":"js-test-httpRequestFeed-162260297550809365","js-test-influxdbFeed-":"js-test-influxdbFeed-162260297550802300","js-test-mongoDbFeed-":"js-test-mongoDbFeed-162260297550801946","js-test-mySqlFeed-":"js-test-mySqlFeed-162260297550809294","js-test-postgreSqlFeed-":"js-test-postgreSqlFeed-162260297550800642"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureBlob","dataFeedName":"js-test-datafeed-162260297550809501","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"blob_connection_string","container":"adsample","blobTemplate":"blob_template"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/036f0f01-e1c9-4ff5-aefd-f044ec23f355',
  'x-request-id',
  '9bb3d2c3-3fff-42a6-ac8f-c7cfc4a93468',
  'x-envoy-upstream-service-time',
  '641',
  'apim-request-id',
  '9bb3d2c3-3fff-42a6-ac8f-c7cfc4a93468',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 03:02:56 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/036f0f01-e1c9-4ff5-aefd-f044ec23f355')
  .reply(200, {"dataFeedId":"036f0f01-e1c9-4ff5-aefd-f044ec23f355","dataFeedName":"js-test-datafeed-162260297550809501","metrics":[{"metricId":"921ba8e2-75ff-4386-a025-0c957c7b1860","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"d9ab794f-04ad-4997-927f-5acea130e53a","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-06-02T03:02:55Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"container":"adsample","blobTemplate":"blob_template"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1264',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b647c510-ee9d-40ce-bdbe-c385f163416b',
  'x-envoy-upstream-service-time',
  '203',
  'apim-request-id',
  'b647c510-ee9d-40ce-bdbe-c385f163416b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 03:02:56 GMT'
]);
