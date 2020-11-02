let nock = require('nock');

module.exports.hash = "cc91d98773ae9b01d284205419a1f21d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fdev.azuresynapse.net%2F.default")
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
  '62ef029d-b4b5-404c-a403-599c4e403b00',
  'x-ms-ests-server',
  '2.1.11198.13 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Altny8Z2WDpIkE6QDgm9kuJJ0eYvAQAAALfGPdcOAAAA; expires=Fri, 11-Dec-2020 11:49:11 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 11 Nov 2020 11:49:11 GMT',
  'Content-Length',
  '1322'
]);

nock('https://workspace_name.dev.azuresynapse.net:443', {"encodedQueryParams":true})
  .get('/livyApi/versions/2019-11-01-preview/sparkPools/sparkpool_name/sessions/39')
  .query(true)
  .reply(200, {"livyInfo":{"notStartedAt":null,"startingAt":null,"idleAt":null,"deadAt":null,"shuttingDownAt":null,"killedAt":null,"recoveringAt":null,"busyAt":null,"errorAt":null,"currentState":"not_started","jobCreationRequest":{"name":"testSession","conf":{},"driverMemory":"8g","driverCores":4,"executorMemory":"8g","executorCores":4,"numExecutors":2}},"name":"testSession","workspaceName":"workspace_name","computeName":"sparkpool_name","sparkPoolName":"sparkpool_name","submitterId":"bf4f36df-eda0-4fc4-9602-69d6ff714d8c","artifactId":"Livy","jobType":"SparkSession","result":"Uncertain","schedulerInfo":{"submittedAt":"2020-11-11T11:49:10.2134752+00:00","scheduledAt":"2020-11-11T11:49:11.6440269+00:00","endedAt":null,"cancellationRequestedAt":null,"currentState":"Scheduled"},"pluginInfo":{"preparationStartedAt":"2020-11-11T11:49:11.656113+00:00","resourceAcquisitionStartedAt":"2020-11-11T11:49:11.9039743+00:00","submissionStartedAt":null,"monitoringStartedAt":null,"cleanupStartedAt":null,"currentState":"ResourceAcquisition"},"tags":{},"id":39,"appId":null,"appInfo":null,"state":"not_started","log":null}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-job-submitted-by-name',
  'bf4f36df-eda0-4fc4-9602-69d6ff714d8c',
  'x-ms-job-submitted-on',
  '11/11/2020 11:49:10 AM +00:00',
  'x-ms-job-scheduled-on',
  '11/11/2020 11:49:11 AM +00:00',
  'x-ms-job-ended-on',
  '',
  'x-ms-job-scheduler-state',
  'Scheduled',
  'x-ms-job-internal-id',
  '39',
  'x-ms-job-result',
  'Uncertain',
  'x-ms-job-type',
  'SparkServiceSession',
  'x-ms-job-queued-on',
  '1/1/0001 12:00:00 AM +00:00',
  'x-ms-job-clusterrequested-on',
  '11/11/2020 11:49:11 AM +00:00',
  'x-ms-job-livysubmission-on',
  '1/1/0001 12:00:00 AM +00:00',
  'x-ms-response-time-ms',
  '16',
  'x-ms-activity-id',
  '2e356a96-b0ac-4d4b-a21f-0365f6c52ba8',
  'x-ms-client-request-id',
  '58851771-e5a9-4aba-982e-1a14c2d220ef',
  'x-ms-request-id',
  'b4828441-8839-4140-bfeb-1b33572162ce',
  'Date',
  'Wed, 11 Nov 2020 11:49:12 GMT'
]);
