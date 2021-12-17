let nock = require('nock');

module.exports.hash = "9e9d244b72937c7f2721b82f2bb4a3e4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('//metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"PostgreSql","dataFeedName":"js-test-postgreSqlFeed-163978429259805784","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"https://connect-to-postgresql","query":"{ find: postgresql,filter: { Time: @StartTime },batch: 200 }"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/8cecc5f6-fd29-4fe1-ba60-0660a9c3902c',
  'x-request-id',
  '6e743efb-4683-434b-afd4-4465bb0b488d',
  'x-envoy-upstream-service-time',
  '499',
  'apim-request-id',
  '6e743efb-4683-434b-afd4-4465bb0b488d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:28 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('//metricsadvisor/v1.0/dataFeeds/8cecc5f6-fd29-4fe1-ba60-0660a9c3902c')
  .reply(200, {"dataFeedId":"8cecc5f6-fd29-4fe1-ba60-0660a9c3902c","dataFeedName":"js-test-postgreSqlFeed-163978429259805784","metrics":[{"metricId":"78a9791c-4bea-459d-aab2-b98b20f09853","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"3c18f1b2-4f5f-467f-a649-f692576df257","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"PostgreSql","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-12-17T23:38:28Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"query":"{ find: postgresql,filter: { Time: @StartTime },batch: 200 }"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1272',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'dc9d2bfe-891e-4240-8e6c-0970d0686394',
  'x-envoy-upstream-service-time',
  '163',
  'apim-request-id',
  'dc9d2bfe-891e-4240-8e6c-0970d0686394',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:28 GMT'
]);
