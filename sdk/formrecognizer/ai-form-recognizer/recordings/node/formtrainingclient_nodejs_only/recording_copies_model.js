let nock = require('nock');

module.exports.hash = "5a28e0cc54d69d3797649efcd97b78a2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models/copyAuthorization')
  .reply(201, {"modelId":"2b126773-7e18-4cdc-81fd-addc8f4b6feb","accessToken":"accessToken","expirationDateTimeTicks":1603390130}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/2b126773-7e18-4cdc-81fd-addc8f4b6feb',
  'x-envoy-upstream-service-time',
  '33',
  'apim-request-id',
  '4d433509-f501-4021-98a7-88956ba99281',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 21 Oct 2020 18:08:49 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models/d4488598-71ae-4cdc-8847-a3eca7a0473d/copy', {"targetResourceId":"/subscriptions/e1367d46-77d4-4f57-8cfe-348edbdc84a3/resourceGroups/jstests/providers/Microsoft.CognitiveServices/accounts/jstests-fr","targetResourceRegion":"westus2","copyAuthorization":{"modelId":"2b126773-7e18-4cdc-81fd-addc8f4b6feb","accessToken":"accessToken","expirationDateTimeTicks":1603390130}})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/d4488598-71ae-4cdc-8847-a3eca7a0473d/copyresults/355cb309-2a09-473a-a34f-1f951d082cbb',
  'x-envoy-upstream-service-time',
  '49',
  'apim-request-id',
  'db2a0a8f-d63d-4d83-b582-4be3b96074d3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 21 Oct 2020 18:08:49 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/d4488598-71ae-4cdc-8847-a3eca7a0473d/copyResults/355cb309-2a09-473a-a34f-1f951d082cbb')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-10-21T18:08:50Z","lastUpdatedDateTime":"2020-10-21T18:08:50Z","copyResult":{"modelId":"2b126773-7e18-4cdc-81fd-addc8f4b6feb"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '14590e6b-9b50-46c6-9d25-cae26400aa89',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 21 Oct 2020 18:08:50 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/d4488598-71ae-4cdc-8847-a3eca7a0473d/copyResults/355cb309-2a09-473a-a34f-1f951d082cbb')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-10-21T18:08:50Z","lastUpdatedDateTime":"2020-10-21T18:08:50Z","copyResult":{"modelId":"2b126773-7e18-4cdc-81fd-addc8f4b6feb"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  'e6f5b2c3-e734-4054-a080-9c1833ed261d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 21 Oct 2020 18:08:50 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/d4488598-71ae-4cdc-8847-a3eca7a0473d/copyResults/355cb309-2a09-473a-a34f-1f951d082cbb')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-10-21T18:08:50Z","lastUpdatedDateTime":"2020-10-21T18:08:50Z","copyResult":{"modelId":"2b126773-7e18-4cdc-81fd-addc8f4b6feb"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  'fbad9cb0-dab3-41bc-b328-30d158e1cef3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 21 Oct 2020 18:08:56 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/d4488598-71ae-4cdc-8847-a3eca7a0473d/copyResults/355cb309-2a09-473a-a34f-1f951d082cbb')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-10-21T18:08:50Z","lastUpdatedDateTime":"2020-10-21T18:08:50Z","copyResult":{"modelId":"2b126773-7e18-4cdc-81fd-addc8f4b6feb"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  'a83be79e-548b-4ab0-9f9a-30d296d09006',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 21 Oct 2020 18:09:00 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/d4488598-71ae-4cdc-8847-a3eca7a0473d/copyResults/355cb309-2a09-473a-a34f-1f951d082cbb')
  .reply(200, {"status":"succeeded","createdDateTime":"2020-10-21T18:09:06.2274792Z","lastUpdatedDateTime":"2020-10-21T18:09:06.2274796Z","copyResult":{"modelId":"2b126773-7e18-4cdc-81fd-addc8f4b6feb"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  'dc366385-f045-4019-aae5-e333fac9ab6e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 21 Oct 2020 18:09:05 GMT'
]);
