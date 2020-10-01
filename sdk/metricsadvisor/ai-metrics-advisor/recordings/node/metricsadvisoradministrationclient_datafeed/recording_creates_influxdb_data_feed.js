let nock = require('nock');

module.exports.hash = "e6ae5e9743b1262d89f9a692b06959fa";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"InfluxDB","dataFeedName":"js-test-influxdbFeed-160047174147203224","granularityName":"Daily","metrics":[{"metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"connectionString":"https://connect-to-influxdb","database":"data-feed-database","userName":"user","password":"pwd1","query":"partition-key eq @start-time"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/1cd3c86d-8a59-4fef-b26e-e7953dd69a30',
  'x-request-id',
  'd0cf8f9a-16ad-489b-b405-42e3674133f4',
  'x-envoy-upstream-service-time',
  '343',
  'apim-request-id',
  'd0cf8f9a-16ad-489b-b405-42e3674133f4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 18 Sep 2020 23:29:32 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/1cd3c86d-8a59-4fef-b26e-e7953dd69a30')
  .reply(200, {"dataFeedId":"1cd3c86d-8a59-4fef-b26e-e7953dd69a30","dataFeedName":"js-test-influxdbFeed-160047174147203224","metrics":[{"metricId":"cb383d96-fa8b-42bd-a671-d2ad533f2887","metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricId":"bf523782-0845-434b-bf75-f4626e248588","metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"InfluxDB","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["yumeng@microsoft.com"],"viewers":[],"creator":"yumeng@microsoft.com","status":"Active","createdTime":"2020-09-18T23:29:33Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"connectionString":"https://connect-to-influxdb","password":"pwd1","database":"data-feed-database","query":"partition-key eq @start-time","userName":"user"}}, [
  'Content-Length',
  '1359',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '2ca9dd87-e35d-4664-89fa-94818d32c550',
  'x-envoy-upstream-service-time',
  '129',
  'apim-request-id',
  '2ca9dd87-e35d-4664-89fa-94818d32c550',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 18 Sep 2020 23:29:33 GMT'
]);
