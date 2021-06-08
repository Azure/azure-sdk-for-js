let nock = require('nock');

module.exports.hash = "cbafa67c55ab39a574c7a94b2eed7809";

module.exports.testInfo = {"uniqueName":{"js-test-datafeed-":"js-test-datafeed-162267887276105652","js-test-appInsightsFeed-":"js-test-appInsightsFeed-162267887276101760","js-test-sqlServerFeed-":"js-test-sqlServerFeed-162267887276109253","js-test-cosmosFeed-":"js-test-cosmosFeed-162267887276107360","js-test-dataExplorerFeed-":"js-test-dataExplorerFeed-162267887276107753","js-test-tableFeed-":"js-test-tableFeed-162267887276108920","js-test-httpRequestFeed-":"js-test-httpRequestFeed-162267887276101250","js-test-influxdbFeed-":"js-test-influxdbFeed-162267887276108761","js-test-mongoDbFeed-":"js-test-mongoDbFeed-162267887276108343","js-test-mySqlFeed-":"js-test-mySqlFeed-162267887276100802","js-test-postgreSqlFeed-":"js-test-postgreSqlFeed-162267887276108070"},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  'a0d38bee-78ce-4857-86b2-d3f4e96a0e00',
  'x-ms-ests-server',
  '2.1.11787.14 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Ao3LGmWoTnxIo4o1diRecJfGLH8mAQAAAFgUStgOAAAA; expires=Sat, 03-Jul-2021 00:07:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 03 Jun 2021 00:07:52 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureBlob","dataFeedName":"js-test-datafeed-162267887276105652","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"blob_connection_string","container":"adsample","blobTemplate":"blob_template"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/78dc9b2a-0579-4986-a76b-0a71017bad86',
  'x-request-id',
  '0d4f12ef-8e50-4ad1-8abf-3e3ee60e0d7b',
  'x-envoy-upstream-service-time',
  '833',
  'apim-request-id',
  '0d4f12ef-8e50-4ad1-8abf-3e3ee60e0d7b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 00:07:53 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/78dc9b2a-0579-4986-a76b-0a71017bad86')
  .reply(200, {"dataFeedId":"78dc9b2a-0579-4986-a76b-0a71017bad86","dataFeedName":"js-test-datafeed-162267887276105652","metrics":[{"metricId":"1fc1391d-dcdd-4e16-a4ab-727d475c1b0a","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"93fc338b-1d61-447c-835d-4cb96d61db09","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureBlob","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["azure_client_id"],"viewers":[],"creator":"azure_client_id","status":"Active","createdTime":"2021-06-03T00:07:54Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"container":"adsample","blobTemplate":"blob_template"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1294',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '33a34dff-5d06-424e-8502-34eaa7ff0c80',
  'x-envoy-upstream-service-time',
  '124',
  'apim-request-id',
  '33a34dff-5d06-424e-8502-34eaa7ff0c80',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 00:07:54 GMT'
]);
