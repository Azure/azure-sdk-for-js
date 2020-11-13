let nock = require('nock');

module.exports.hash = "0f384f1795b315e5158ec2a8b4fa55c9";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"InfluxDB","dataFeedName":"js-test-influxdbFeed-160529679231903636","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"connectionString":"https://connect-to-influxdb","database":"data-feed-database","userName":"user","password":"pwd1","query":"partition-key eq @start-time"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/1e77b8e4-e8ab-46ea-a30d-3956f9c967e0',
  'x-request-id',
  'a27c6158-419d-40dc-9fb9-b3917b53a9c6',
  'x-envoy-upstream-service-time',
  '585',
  'apim-request-id',
  'a27c6158-419d-40dc-9fb9-b3917b53a9c6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:43 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/1e77b8e4-e8ab-46ea-a30d-3956f9c967e0')
  .reply(200, {"dataFeedId":"1e77b8e4-e8ab-46ea-a30d-3956f9c967e0","dataFeedName":"js-test-influxdbFeed-160529679231903636","metrics":[{"metricId":"921bfa22-c468-4191-b472-32edf7f18f68","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"4968a3b5-ea44-41ae-8b03-18fd4b3d2a82","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"InfluxDB","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-13T19:46:44Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"connectionString":"https://connect-to-influxdb","password":"pwd1","database":"data-feed-database","query":"partition-key eq @start-time","userName":"user"}}, [
  'Content-Length',
  '1368',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '2686bb74-1dbf-4d6d-98f6-8d6f77c13a47',
  'x-envoy-upstream-service-time',
  '145',
  'apim-request-id',
  '2686bb74-1dbf-4d6d-98f6-8d6f77c13a47',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:44 GMT'
]);
