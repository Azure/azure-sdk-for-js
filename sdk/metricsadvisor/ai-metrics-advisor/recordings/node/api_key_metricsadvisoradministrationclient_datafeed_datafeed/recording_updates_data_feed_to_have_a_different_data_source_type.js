let nock = require('nock');

module.exports.hash = "14a59b7c0e25a01bab2e00358aaee7ae";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('//metricsadvisor/v1.0/dataFeeds/8cecc5f6-fd29-4fe1-ba60-0660a9c3902c', {"dataSourceType":"MongoDB","authenticationType":"Basic","dataSourceParameter":{"connectionString":"https://connect-to-mongodb-patch","database":"data-feed-mongodb-patch","command":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"}})
  .reply(200, {"dataFeedId":"8cecc5f6-fd29-4fe1-ba60-0660a9c3902c","dataFeedName":"js-test-postgreSqlFeed-163978429259805784","metrics":[{"metricId":"78a9791c-4bea-459d-aab2-b98b20f09853","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"3c18f1b2-4f5f-467f-a649-f692576df257","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"MongoDB","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-12-17T23:38:28Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"database":"data-feed-mongodb-patch","command":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1305',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '8509e14c-8671-4a49-886a-915f5a80341b',
  'x-envoy-upstream-service-time',
  '748',
  'apim-request-id',
  '8509e14c-8671-4a49-886a-915f5a80341b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:29 GMT'
]);
