let nock = require('nock');

module.exports.hash = "3fc5740afa8d751ac63cde56f92b9419";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1331',
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
  '36779b91-cc05-4719-a9c1-efc935a0cd00',
  'x-ms-ests-server',
  '2.1.11722.21 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AinGrRGBzI5Mg73OLQslIGFb6HqYAQAAAOg5MdgOAAAAxix_JgEAAADpOTHYDgAAAA; expires=Mon, 14-Jun-2021 03:41:29 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 15 May 2021 03:41:28 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query', {"startTime":"2020-08-01T00:00:00.000Z","endTime":"2020-09-01T00:00:00.000Z"})
  .reply(200, {"value":[{"timestamp":"2020-08-31T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-15T03:26:20Z"},{"timestamp":"2020-08-30T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-15T03:25:51Z"},{"timestamp":"2020-08-29T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-15T03:30:05Z"},{"timestamp":"2020-08-28T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-15T03:29:08Z"},{"timestamp":"2020-08-27T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-15T03:29:35Z"},{"timestamp":"2020-08-26T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-15T03:32:39Z"},{"timestamp":"2020-08-25T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-15T03:33:56Z"},{"timestamp":"2020-08-24T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-15T03:33:43Z"},{"timestamp":"2020-08-23T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-15T03:36:47Z"},{"timestamp":"2020-08-22T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-15T03:37:01Z"},{"timestamp":"2020-08-21T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-15T03:38:31Z"},{"timestamp":"2020-08-20T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-15T03:37:46Z"},{"timestamp":"2020-08-19T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-05-15T03:18:29Z"},{"timestamp":"2020-08-18T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-05-15T03:31:10Z"},{"timestamp":"2020-08-17T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-05-15T03:30:46Z"},{"timestamp":"2020-08-16T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-05-15T03:32:06Z"},{"timestamp":"2020-08-15T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-05-15T03:32:26Z"},{"timestamp":"2020-08-14T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-05-15T03:34:55Z"},{"timestamp":"2020-08-13T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-05-15T03:40:44Z"},{"timestamp":"2020-08-12T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-05-15T03:39:48Z"},{"timestamp":"2020-08-11T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-15T03:14:51Z"},{"timestamp":"2020-08-10T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-15T03:12:34Z"},{"timestamp":"2020-08-09T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-15T03:18:03Z"},{"timestamp":"2020-08-08T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-05-15T00:16:07Z"},{"timestamp":"2020-08-07T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-05-15T00:16:07Z"},{"timestamp":"2020-08-06T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-05-15T00:14:27Z"},{"timestamp":"2020-08-05T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-05-15T00:14:07Z"},{"timestamp":"2020-08-04T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-05-15T00:14:31Z"},{"timestamp":"2020-08-03T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-05-15T00:14:03Z"},{"timestamp":"2020-08-02T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-05-15T00:12:48Z"},{"timestamp":"2020-08-01T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-05-15T00:12:40Z"}]}, [
  'Content-Length',
  '4159',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '61192960-97cb-4c22-a5f0-8ef3b747ebca',
  'x-envoy-upstream-service-time',
  '5385',
  'apim-request-id',
  '61192960-97cb-4c22-a5f0-8ef3b747ebca',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 03:41:35 GMT'
]);
