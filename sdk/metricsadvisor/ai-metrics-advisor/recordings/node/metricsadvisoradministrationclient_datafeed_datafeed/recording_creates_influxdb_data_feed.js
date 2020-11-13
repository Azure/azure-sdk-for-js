let nock = require('nock');

module.exports.hash = "0f384f1795b315e5158ec2a8b4fa55c9";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"InfluxDB","dataFeedName":"js-test-influxdbFeed-160530446860002090","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"connectionString":"https://connect-to-influxdb","database":"data-feed-database","userName":"user","password":"pwd1","query":"partition-key eq @start-time"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/caedf499-e4ba-456a-bdb0-8f19a0bfaa04',
  'x-request-id',
  '034a4979-46c5-4627-b51f-1347731d2c4b',
  'x-envoy-upstream-service-time',
  '806',
  'apim-request-id',
  '034a4979-46c5-4627-b51f-1347731d2c4b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:50 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/caedf499-e4ba-456a-bdb0-8f19a0bfaa04')
  .reply(200, {"dataFeedId":"caedf499-e4ba-456a-bdb0-8f19a0bfaa04","dataFeedName":"js-test-influxdbFeed-160530446860002090","metrics":[{"metricId":"239d4853-e5a1-45ae-8365-c58b16ce2010","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"f9e4d1cc-3259-4dee-8a69-9d4a2eff4933","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"InfluxDB","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-13T21:54:50Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"connectionString":"https://connect-to-influxdb","password":"pwd1","database":"data-feed-database","query":"partition-key eq @start-time","userName":"user"}}, [
  'Content-Length',
  '1368',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '1e769fe3-7482-4cb4-81ac-ec0d94acd12b',
  'x-envoy-upstream-service-time',
  '189',
  'apim-request-id',
  '1e769fe3-7482-4cb4-81ac-ec0d94acd12b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:50 GMT'
]);
