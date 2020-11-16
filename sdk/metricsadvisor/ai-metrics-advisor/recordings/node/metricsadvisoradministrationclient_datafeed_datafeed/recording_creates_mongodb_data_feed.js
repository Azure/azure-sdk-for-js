let nock = require('nock');

module.exports.hash = "bf45e3de11c34abf0f34a75dd46554da";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"MongoDB","dataFeedName":"js-test-mongoDbFeed-160530907341201749","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"connectionString":"https://connect-to-mongodb","database":"data-feed-mongodb","command":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/369d9bf3-25e8-41b9-9442-0aa7b7a71914',
  'x-request-id',
  '0b7522f0-cb6e-43ca-8a24-da54e97af0b8',
  'x-envoy-upstream-service-time',
  '523',
  'apim-request-id',
  '0b7522f0-cb6e-43ca-8a24-da54e97af0b8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 23:11:33 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/369d9bf3-25e8-41b9-9442-0aa7b7a71914')
  .reply(200, {"dataFeedId":"369d9bf3-25e8-41b9-9442-0aa7b7a71914","dataFeedName":"js-test-mongoDbFeed-160530907341201749","metrics":[{"metricId":"58500bdb-3d35-4d51-b272-036f6370a379","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"d16d2416-a794-4ffe-9a92-acfbbebb5733","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"MongoDB","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-13T23:11:33Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"connectionString":"https://connect-to-mongodb","database":"data-feed-mongodb","command":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"}}, [
  'Content-Length',
  '1359',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'e95b7e99-d699-4f78-921d-f045c857f723',
  'x-envoy-upstream-service-time',
  '131',
  'apim-request-id',
  'e95b7e99-d699-4f78-921d-f045c857f723',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 23:11:33 GMT'
]);
