let nock = require('nock');

module.exports.hash = "a61e087df1db4c0fda448bb6a3aa80bf";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"MongoDB","dataFeedName":"js-test-mongoDbFeed-163634432099900834","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"https://connect-to-mongodb","database":"data-feed-mongodb","command":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/f419107a-f0fb-43da-b9df-14c79780fa62',
  'x-request-id',
  '23390c98-0c01-4ee2-9998-45687a6e72b1',
  'x-envoy-upstream-service-time',
  '612',
  'apim-request-id',
  '23390c98-0c01-4ee2-9998-45687a6e72b1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:32 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/f419107a-f0fb-43da-b9df-14c79780fa62')
  .reply(200, {"dataFeedId":"f419107a-f0fb-43da-b9df-14c79780fa62","dataFeedName":"js-test-mongoDbFeed-163634432099900834","metrics":[{"metricId":"d0901fd1-c699-4b91-9d5c-42eb0b0b5851","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"c2f664d8-2551-4d82-baa0-14631e44e506","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"MongoDB","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-11-08T04:05:33Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"database":"data-feed-mongodb","command":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1296',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f4ce6c1f-f516-4b74-a34c-d73da1beaffc',
  'x-envoy-upstream-service-time',
  '164',
  'apim-request-id',
  'f4ce6c1f-f516-4b74-a34c-d73da1beaffc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:33 GMT'
]);
