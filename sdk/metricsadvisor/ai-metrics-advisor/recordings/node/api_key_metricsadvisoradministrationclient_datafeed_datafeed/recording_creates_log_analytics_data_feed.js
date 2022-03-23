let nock = require('nock');

module.exports.hash = "484b93c2a60e1e555b700e8c2a48a4e1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureLogAnalytics","dataFeedName":"js-test-logAnalyticsFeed-164264035316907268","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"tenantId":"tenant-id","clientId":"client-id","clientSecret":"client-secret","workspaceId":"workspace-id","query":"query"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/7f4f0f7f-f826-49d8-87be-f9396295ec41',
  'x-request-id',
  '398bbca7-433e-4523-8288-6f1c8ada1bfa',
  'x-envoy-upstream-service-time',
  '432',
  'apim-request-id',
  '398bbca7-433e-4523-8288-6f1c8ada1bfa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:27 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/7f4f0f7f-f826-49d8-87be-f9396295ec41')
  .reply(200, {"dataFeedId":"7f4f0f7f-f826-49d8-87be-f9396295ec41","dataFeedName":"js-test-logAnalyticsFeed-164264035316907268","metrics":[{"metricId":"bbdcc0ad-f7d0-4f18-8a53-6d7d33453e9b","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"a0d4a65b-634a-43cf-97f7-e3008ffa6f84","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureLogAnalytics","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2022-01-20T00:59:26Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"clientId":"client-id","query":"query","tenantId":"tenant-id","workspaceId":"workspace-id"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1301',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'febf0825-9dc8-4fc6-9755-1ba006966b6a',
  'x-envoy-upstream-service-time',
  '151',
  'apim-request-id',
  'febf0825-9dc8-4fc6-9755-1ba006966b6a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:27 GMT'
]);
