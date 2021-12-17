let nock = require('nock');

module.exports.hash = "6686ffeb000fe6e65256c94d6ecb6584";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('//metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"SqlServer","dataFeedName":"js-test-sqlServerFeed-163978429259808429","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"sqlServer_connection_string","query":"select * from adsample2 where Timestamp = @StartTime"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/3b5d71ac-af9c-4855-a1da-11d83a9fa4cc',
  'x-request-id',
  '1e1a8933-3960-47ee-a3ad-ad6b307bce4e',
  'x-envoy-upstream-service-time',
  '593',
  'apim-request-id',
  '1e1a8933-3960-47ee-a3ad-ad6b307bce4e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:15 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('//metricsadvisor/v1.0/dataFeeds/3b5d71ac-af9c-4855-a1da-11d83a9fa4cc')
  .reply(200, {"dataFeedId":"3b5d71ac-af9c-4855-a1da-11d83a9fa4cc","dataFeedName":"js-test-sqlServerFeed-163978429259808429","metrics":[{"metricId":"e594364d-4e25-4247-9172-0f8ca143df85","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"9abab968-4582-4e1c-a4d4-e663360ab561","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"SqlServer","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-12-17T23:38:15Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"query":"select * from adsample2 where Timestamp = @StartTime"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1262',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'd77612a9-07fb-4a6d-8314-743e43e16f24',
  'x-envoy-upstream-service-time',
  '192',
  'apim-request-id',
  'd77612a9-07fb-4a6d-8314-743e43e16f24',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:15 GMT'
]);
