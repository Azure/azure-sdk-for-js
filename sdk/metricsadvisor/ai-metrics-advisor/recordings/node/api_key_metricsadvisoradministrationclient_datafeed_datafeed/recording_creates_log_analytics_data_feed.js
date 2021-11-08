let nock = require('nock');

module.exports.hash = "9b472f6f211657f4799291bcf7bf404d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureLogAnalytics","dataFeedName":"js-test-logAnalyticsFeed-163634432099803631","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"tenantId":"tenant-id","clientId":"client-id","clientSecret":"client-secret","workspaceId":"workspace-id","query":"query"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/acd75642-825d-4fb8-8317-8a9297446983',
  'x-request-id',
  '0252d6a4-1c1b-4924-ada3-3282efbac251',
  'x-envoy-upstream-service-time',
  '663',
  'apim-request-id',
  '0252d6a4-1c1b-4924-ada3-3282efbac251',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:37 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/acd75642-825d-4fb8-8317-8a9297446983')
  .reply(200, {"dataFeedId":"acd75642-825d-4fb8-8317-8a9297446983","dataFeedName":"js-test-logAnalyticsFeed-163634432099803631","metrics":[{"metricId":"81bff313-b94e-4578-b471-86c3c1e7249a","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"7359aa32-5a97-493b-a616-aaf3efb4b5b1","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureLogAnalytics","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-11-08T04:05:37Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"clientId":"client-id","query":"query","tenantId":"tenant-id","workspaceId":"workspace-id"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1301',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '5a2962d1-3752-44a5-98ed-69aead5d6bce',
  'x-envoy-upstream-service-time',
  '282',
  'apim-request-id',
  '5a2962d1-3752-44a5-98ed-69aead5d6bce',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:37 GMT'
]);
