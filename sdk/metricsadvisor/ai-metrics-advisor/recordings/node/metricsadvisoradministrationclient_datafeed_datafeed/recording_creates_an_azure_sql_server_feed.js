let nock = require('nock');

module.exports.hash = "15447b926e251e7bf55a0d5237f52461";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"SqlServer","dataFeedName":"js-test-sqlServerFeed-160529679231907547","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"connectionString":"sqlServer_connection_string","query":"select * from blob_container2 where Timestamp = @StartTime"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/e18ec164-11c2-4189-9d94-e2d1e591f2d5',
  'x-request-id',
  '0acdc478-d566-47aa-bd36-4cd60d73a434',
  'x-envoy-upstream-service-time',
  '649',
  'apim-request-id',
  '0acdc478-d566-47aa-bd36-4cd60d73a434',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:35 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/e18ec164-11c2-4189-9d94-e2d1e591f2d5')
  .reply(200, {"dataFeedId":"e18ec164-11c2-4189-9d94-e2d1e591f2d5","dataFeedName":"js-test-sqlServerFeed-160529679231907547","metrics":[{"metricId":"5cf55f1f-9863-42e4-b3aa-2267d55b36b6","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"40e7ac1a-eda6-49d5-8103-703141421af5","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"SqlServer","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-13T19:46:35Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"connectionString":"sqlServer_connection_string","query":"select * from blob_container2 where Timestamp = @StartTime"}}, [
  'Content-Length',
  '1532',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'dd4c2ab1-f19a-490b-8a75-3f8e4c2070c4',
  'x-envoy-upstream-service-time',
  '154',
  'apim-request-id',
  'dd4c2ab1-f19a-490b-8a75-3f8e4c2070c4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:35 GMT'
]);
