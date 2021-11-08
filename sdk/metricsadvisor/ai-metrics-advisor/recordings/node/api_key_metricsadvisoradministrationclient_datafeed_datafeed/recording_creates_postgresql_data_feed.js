let nock = require('nock');

module.exports.hash = "9e9d244b72937c7f2721b82f2bb4a3e4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"PostgreSql","dataFeedName":"js-test-postgreSqlFeed-163634432099907133","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"https://connect-to-postgresql","query":"{ find: postgresql,filter: { Time: @StartTime },batch: 200 }"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/82a8f4b6-5d84-4307-b1a3-bab0bd63c9c1',
  'x-request-id',
  '60c37969-9516-49ec-8a1b-f30b9677e2eb',
  'x-envoy-upstream-service-time',
  '640',
  'apim-request-id',
  '60c37969-9516-49ec-8a1b-f30b9677e2eb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:39 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/82a8f4b6-5d84-4307-b1a3-bab0bd63c9c1')
  .reply(200, {"dataFeedId":"82a8f4b6-5d84-4307-b1a3-bab0bd63c9c1","dataFeedName":"js-test-postgreSqlFeed-163634432099907133","metrics":[{"metricId":"9f24c03f-e339-4a24-8c62-5bf2356b269a","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"3796ddb0-578c-40ed-a525-d43c9eb96790","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"PostgreSql","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-11-08T04:05:39Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"query":"{ find: postgresql,filter: { Time: @StartTime },batch: 200 }"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1272',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c8b4ceb5-3b03-41db-8799-7fec614e355d',
  'x-envoy-upstream-service-time',
  '155',
  'apim-request-id',
  'c8b4ceb5-3b03-41db-8799-7fec614e355d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:39 GMT'
]);
