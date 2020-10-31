let nock = require('nock');

module.exports.hash = "b9a3cf10cfdec4fc77b26f76d0a2acd3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/dataFeeds/6242f6d8-d0a0-4b18-8e2f-41e57174596a', {"dataSourceType":"MongoDB","dataSourceParameter":{"connectionString":"https://connect-to-mongodb-patch","database":"data-feed-mongodb-patch","command":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"}})
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'b820af78-2a89-4972-8700-f75d3e956510',
  'x-envoy-upstream-service-time',
  '531',
  'apim-request-id',
  'b820af78-2a89-4972-8700-f75d3e956510',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 20 Oct 2020 22:50:51 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/6242f6d8-d0a0-4b18-8e2f-41e57174596a')
  .reply(200, {"dataFeedId":"6242f6d8-d0a0-4b18-8e2f-41e57174596a","dataFeedName":"js-test-postgreSqlFeed-160323420510603918","metrics":[{"metricId":"5a650ba9-7b30-4a03-bb63-ec0e9fbda929","metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricId":"f449fafd-0944-420d-a08b-fe37576fc63c","metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"MongoDB","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["yumeng@microsoft.com"],"viewers":[],"creator":"yumeng@microsoft.com","status":"Active","createdTime":"2020-10-20T22:50:51Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"connectionString":"https://connect-to-mongodb-patch","database":"data-feed-mongodb-patch","command":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"}}, [
  'Content-Length',
  '1386',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '6fd55156-5092-4123-ab6c-f90646e63591',
  'x-envoy-upstream-service-time',
  '111',
  'apim-request-id',
  '6fd55156-5092-4123-ab6c-f90646e63591',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 20 Oct 2020 22:50:52 GMT',
  'Connection',
  'close'
]);
