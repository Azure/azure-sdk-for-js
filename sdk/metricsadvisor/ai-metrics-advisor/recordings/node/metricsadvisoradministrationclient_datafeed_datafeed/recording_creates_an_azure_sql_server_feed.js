let nock = require('nock');

module.exports.hash = "15447b926e251e7bf55a0d5237f52461";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"SqlServer","dataFeedName":"js-test-sqlServerFeed-160522265192807673","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"connectionString":"sqlServer_connection_string","query":"select * from blob_container2 where Timestamp = @StartTime"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/4615771e-a822-4624-98d0-429237edaf4c',
  'x-request-id',
  '23c23cec-8e80-4878-8ce9-4760a2b12115',
  'x-envoy-upstream-service-time',
  '423',
  'apim-request-id',
  '23c23cec-8e80-4878-8ce9-4760a2b12115',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:57 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/4615771e-a822-4624-98d0-429237edaf4c')
  .reply(200, {"dataFeedId":"4615771e-a822-4624-98d0-429237edaf4c","dataFeedName":"js-test-sqlServerFeed-160522265192807673","metrics":[{"metricId":"2a287a53-06ee-426d-a36a-6c5d90458936","metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricId":"7303bf5c-e1df-4b4a-b1a7-804a92eb1a66","metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"SqlServer","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-12T23:10:57Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"connectionString":"sqlServer_connection_string","query":"select * from blob_container2 where Timestamp = @StartTime"}}, [
  'Content-Length',
  '1546',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '714de26a-917d-4780-911f-3a386a110ba7',
  'x-envoy-upstream-service-time',
  '464',
  'apim-request-id',
  '714de26a-917d-4780-911f-3a386a110ba7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:57 GMT'
]);
