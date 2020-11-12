let nock = require('nock');

module.exports.hash = "e5f625d8b71e7cd3eb21b4316af23c28";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"MySql","dataFeedName":"js-test-mySqlFeed-160522265192807904","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"connectionString":"https://connect-to-mysql","query":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/0db874c5-0c18-4353-9131-214233edf7dc',
  'x-request-id',
  'fcede6af-5b14-4b96-978d-947e073e0730',
  'x-envoy-upstream-service-time',
  '672',
  'apim-request-id',
  'fcede6af-5b14-4b96-978d-947e073e0730',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:11:14 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/0db874c5-0c18-4353-9131-214233edf7dc')
  .reply(200, {"dataFeedId":"0db874c5-0c18-4353-9131-214233edf7dc","dataFeedName":"js-test-mySqlFeed-160522265192807904","metrics":[{"metricId":"f4a648d3-0813-42a4-9bea-6756fee7999e","metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricId":"fd729976-5373-49f3-9a0b-6d3522a02dd0","metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"MySql","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-12T23:11:15Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"connectionString":"https://connect-to-mysql","query":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"}}, [
  'Content-Length',
  '1334',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '8a21d810-73f4-4d85-a866-b975526b2777',
  'x-envoy-upstream-service-time',
  '312',
  'apim-request-id',
  '8a21d810-73f4-4d85-a866-b975526b2777',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:11:15 GMT'
]);
