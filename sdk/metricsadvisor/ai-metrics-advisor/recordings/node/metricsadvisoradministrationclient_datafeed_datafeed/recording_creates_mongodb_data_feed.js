let nock = require('nock');

module.exports.hash = "bf45e3de11c34abf0f34a75dd46554da";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"MongoDB","dataFeedName":"js-test-mongoDbFeed-160522265192806675","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"connectionString":"https://connect-to-mongodb","database":"data-feed-mongodb","command":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/9ca14594-5c11-491f-92fc-56a7bddb61e2',
  'x-request-id',
  '4ae743b2-b12f-43ea-8b0e-e6bf74b8e2f6',
  'x-envoy-upstream-service-time',
  '482',
  'apim-request-id',
  '4ae743b2-b12f-43ea-8b0e-e6bf74b8e2f6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:11:13 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/9ca14594-5c11-491f-92fc-56a7bddb61e2')
  .reply(200, {"dataFeedId":"9ca14594-5c11-491f-92fc-56a7bddb61e2","dataFeedName":"js-test-mongoDbFeed-160522265192806675","metrics":[{"metricId":"a65a993f-c1cb-4eb8-a346-6b9be06ba390","metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricId":"57ea6ff3-25d8-4e29-892a-8a5e39c582d2","metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"MongoDB","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-12T23:11:13Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"connectionString":"https://connect-to-mongodb","database":"data-feed-mongodb","command":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"}}, [
  'Content-Length',
  '1373',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '972eb465-e1c6-463d-a106-ed20a42a288a',
  'x-envoy-upstream-service-time',
  '335',
  'apim-request-id',
  '972eb465-e1c6-463d-a106-ed20a42a288a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:11:13 GMT'
]);
