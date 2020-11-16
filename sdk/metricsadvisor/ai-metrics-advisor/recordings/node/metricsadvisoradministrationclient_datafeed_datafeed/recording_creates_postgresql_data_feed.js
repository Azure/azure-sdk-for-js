let nock = require('nock');

module.exports.hash = "9fc34eba72fda3ac544dc285510eecf3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"PostgreSql","dataFeedName":"js-test-postgreSqlFeed-160530907341207128","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"connectionString":"https://connect-to-postgresql","query":"{ find: postgresql,filter: { Time: @StartTime },batch: 200 }"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/020d58e2-fca1-4e87-a3ab-47497986bef6',
  'x-request-id',
  'e2460c67-a2f9-4db1-a361-c8c544aa2ca4',
  'x-envoy-upstream-service-time',
  '557',
  'apim-request-id',
  'e2460c67-a2f9-4db1-a361-c8c544aa2ca4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 23:11:35 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/020d58e2-fca1-4e87-a3ab-47497986bef6')
  .reply(200, {"dataFeedId":"020d58e2-fca1-4e87-a3ab-47497986bef6","dataFeedName":"js-test-postgreSqlFeed-160530907341207128","metrics":[{"metricId":"28d92709-e66a-45ee-bdd3-755f04d5eac5","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"c5e38fde-9535-4847-96ec-30036afc5213","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"PostgreSql","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-13T23:11:35Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"connectionString":"https://connect-to-postgresql","query":"{ find: postgresql,filter: { Time: @StartTime },batch: 200 }"}}, [
  'Content-Length',
  '1338',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '75db8627-2403-41a3-a138-54020575a223',
  'x-envoy-upstream-service-time',
  '139',
  'apim-request-id',
  '75db8627-2403-41a3-a138-54020575a223',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 23:11:35 GMT'
]);
