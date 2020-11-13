let nock = require('nock');

module.exports.hash = "0f384f1795b315e5158ec2a8b4fa55c9";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"InfluxDB","dataFeedName":"js-test-influxdbFeed-160530907341202296","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"connectionString":"https://connect-to-influxdb","database":"data-feed-database","userName":"user","password":"pwd1","query":"partition-key eq @start-time"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/62ea0636-0157-49fa-b855-b6c54360e5f8',
  'x-request-id',
  '52c93217-a7d0-4977-87bd-7b8b972ce3eb',
  'x-envoy-upstream-service-time',
  '589',
  'apim-request-id',
  '52c93217-a7d0-4977-87bd-7b8b972ce3eb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 23:11:32 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/62ea0636-0157-49fa-b855-b6c54360e5f8')
  .reply(200, {"dataFeedId":"62ea0636-0157-49fa-b855-b6c54360e5f8","dataFeedName":"js-test-influxdbFeed-160530907341202296","metrics":[{"metricId":"e28b7843-2fd9-4270-a241-2f41ee084d89","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"c38aa0f9-a435-4c74-bc3a-ff38565508d1","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"InfluxDB","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-13T23:11:31Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"connectionString":"https://connect-to-influxdb","password":"pwd1","database":"data-feed-database","query":"partition-key eq @start-time","userName":"user"}}, [
  'Content-Length',
  '1368',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'a89dc580-9260-4425-8542-601a0874e945',
  'x-envoy-upstream-service-time',
  '147',
  'apim-request-id',
  'a89dc580-9260-4425-8542-601a0874e945',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 23:11:32 GMT'
]);
