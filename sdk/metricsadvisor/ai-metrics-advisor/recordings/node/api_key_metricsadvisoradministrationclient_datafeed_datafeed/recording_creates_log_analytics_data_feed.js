let nock = require('nock');

module.exports.hash = "9b472f6f211657f4799291bcf7bf404d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureLogAnalytics","dataFeedName":"js-test-logAnalyticsFeed-163636432991201243","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"tenantId":"tenant-id","clientId":"client-id","clientSecret":"client-secret","workspaceId":"workspace-id","query":"query"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/d076d2d1-00b1-4e9a-803b-af25bbfa4f6e',
  'x-request-id',
  'f3c316bf-2a34-4690-88d8-d771ab06e50c',
  'x-envoy-upstream-service-time',
  '589',
  'apim-request-id',
  'f3c316bf-2a34-4690-88d8-d771ab06e50c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:03 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/d076d2d1-00b1-4e9a-803b-af25bbfa4f6e')
  .reply(200, {"dataFeedId":"d076d2d1-00b1-4e9a-803b-af25bbfa4f6e","dataFeedName":"js-test-logAnalyticsFeed-163636432991201243","metrics":[{"metricId":"4343fee3-c6cc-405a-9eec-4181035a259f","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"3f67b669-a491-4ade-878e-0063dd8ff072","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureLogAnalytics","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-11-08T09:39:04Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"clientId":"client-id","query":"query","tenantId":"tenant-id","workspaceId":"workspace-id"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1301',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'e9aa6282-9083-42a2-b595-210f09b3e5bc',
  'x-envoy-upstream-service-time',
  '164',
  'apim-request-id',
  'e9aa6282-9083-42a2-b595-210f09b3e5bc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:03 GMT'
]);
