let nock = require('nock');

module.exports.hash = "4bb0c54363466bf4ac07bece7a8646a6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('//metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"MySql","dataFeedName":"js-test-mySqlFeed-163978429259808585","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"https://connect-to-mysql","query":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/ae45fff1-950e-4271-801c-e64de61d8982',
  'x-request-id',
  '101ceb8e-de40-47e3-8f27-a782b58e76ed',
  'x-envoy-upstream-service-time',
  '484',
  'apim-request-id',
  '101ceb8e-de40-47e3-8f27-a782b58e76ed',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:24 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('//metricsadvisor/v1.0/dataFeeds/ae45fff1-950e-4271-801c-e64de61d8982')
  .reply(200, {"dataFeedId":"ae45fff1-950e-4271-801c-e64de61d8982","dataFeedName":"js-test-mySqlFeed-163978429259808585","metrics":[{"metricId":"dce80185-146d-4917-a2e3-af88ac923abe","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"3cc17207-2f2e-47af-b0da-8ba7e9f86ee1","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"MySql","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-12-17T23:38:25Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"query":"{ find: mongodb,filter: { Time: @StartTime },batch: 200 }"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1259',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'da6f0ac6-9c60-48c9-b6f6-87386119e6cf',
  'x-envoy-upstream-service-time',
  '167',
  'apim-request-id',
  'da6f0ac6-9c60-48c9-b6f6-87386119e6cf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:24 GMT'
]);
