let nock = require('nock');

module.exports.hash = "9b472f6f211657f4799291bcf7bf404d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('//metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureLogAnalytics","dataFeedName":"js-test-logAnalyticsFeed-163978429259802082","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"tenantId":"tenant-id","clientId":"client-id","clientSecret":"client-secret","workspaceId":"workspace-id","query":"query"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/9df90411-0766-4e19-9948-b1fce4b284d4',
  'x-request-id',
  '98c83568-1083-4849-958b-208ee14823bc',
  'x-envoy-upstream-service-time',
  '490',
  'apim-request-id',
  '98c83568-1083-4849-958b-208ee14823bc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:27 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('//metricsadvisor/v1.0/dataFeeds/9df90411-0766-4e19-9948-b1fce4b284d4')
  .reply(200, {"dataFeedId":"9df90411-0766-4e19-9948-b1fce4b284d4","dataFeedName":"js-test-logAnalyticsFeed-163978429259802082","metrics":[{"metricId":"6c043cf8-63dc-446d-a293-b3baf2213637","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"04693bb0-806f-4a61-874e-19ce146e896d","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureLogAnalytics","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-12-17T23:38:27Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"clientId":"client-id","query":"query","tenantId":"tenant-id","workspaceId":"workspace-id"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1301',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'fb0b6403-7275-456b-8cf8-82744a951cb5',
  'x-envoy-upstream-service-time',
  '166',
  'apim-request-id',
  'fb0b6403-7275-456b-8cf8-82744a951cb5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:27 GMT'
]);
