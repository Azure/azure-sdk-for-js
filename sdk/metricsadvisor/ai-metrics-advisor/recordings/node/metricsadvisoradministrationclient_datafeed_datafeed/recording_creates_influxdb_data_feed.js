let nock = require('nock');

module.exports.hash = "0f384f1795b315e5158ec2a8b4fa55c9";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"InfluxDB","dataFeedName":"js-test-influxdbFeed-160522265192802447","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"connectionString":"https://connect-to-influxdb","database":"data-feed-database","userName":"user","password":"pwd1","query":"partition-key eq @start-time"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/3274d451-d0ed-4742-bec2-a322ffd2f018',
  'x-request-id',
  '40878ced-0063-448b-9a87-679ca49fe70d',
  'x-envoy-upstream-service-time',
  '755',
  'apim-request-id',
  '40878ced-0063-448b-9a87-679ca49fe70d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:11:11 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/3274d451-d0ed-4742-bec2-a322ffd2f018')
  .reply(200, {"dataFeedId":"3274d451-d0ed-4742-bec2-a322ffd2f018","dataFeedName":"js-test-influxdbFeed-160522265192802447","metrics":[{"metricId":"eef531e1-dd61-4cbe-a3ba-4dffb4ad4f55","metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricId":"9b9de14e-4d1b-4148-87d1-2fe2e71cd0cb","metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"InfluxDB","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-12T23:11:11Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"connectionString":"https://connect-to-influxdb","password":"pwd1","database":"data-feed-database","query":"partition-key eq @start-time","userName":"user"}}, [
  'Content-Length',
  '1382',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'd6b36805-ac50-4d48-bc17-2b4b560f8687',
  'x-envoy-upstream-service-time',
  '489',
  'apim-request-id',
  'd6b36805-ac50-4d48-bc17-2b4b560f8687',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:11:12 GMT'
]);
