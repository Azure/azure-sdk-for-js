let nock = require('nock');

module.exports.hash = "a4d1af0f0e467a862bd88a6c2ae35d93";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.0-preview/custom/models/copyAuthorization')
  .reply(201, {"modelId":"be7f15e3-1b1e-43da-a133-d2869763f3c2","accessToken":"accessToken","expirationDateTimeTicks":1593293052}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://endpoint/formrecognizer/v2.0-preview/custom/models/be7f15e3-1b1e-43da-a133-d2869763f3c2',
  'x-envoy-upstream-service-time',
  '502',
  'apim-request-id',
  'aa0b36eb-b20d-4afb-ae48-cc01a872d827',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 26 Jun 2020 21:24:11 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.0-preview/custom/models/7f954280-8212-4c61-9c33-8fea2e47d279/copy', {"targetResourceId":"/subscriptions/e1367d46-77d4-4f57-8cfe-348edbdc84a3/resourceGroups/jstests/providers/Microsoft.CognitiveServices/accounts/jstests-fr","targetResourceRegion":"westus2","copyAuthorization":{"modelId":"be7f15e3-1b1e-43da-a133-d2869763f3c2","accessToken":"accessToken","expirationDateTimeTicks":1593293052}})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.0-preview/custom/models/7f954280-8212-4c61-9c33-8fea2e47d279/copyresults/eefd4da6-4503-4542-99bb-eee373b53f7e',
  'x-envoy-upstream-service-time',
  '5085',
  'apim-request-id',
  '5403624a-676c-4b32-9642-275b03542946',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 26 Jun 2020 21:24:17 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/custom/models/7f954280-8212-4c61-9c33-8fea2e47d279/copyResults/eefd4da6-4503-4542-99bb-eee373b53f7e')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-06-26T21:24:12Z","lastUpdatedDateTime":"2020-06-26T21:24:12Z","copyResult":{"modelId":"be7f15e3-1b1e-43da-a133-d2869763f3c2"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  'b06eec3e-69f4-4da3-847c-2e2be31ef887',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 26 Jun 2020 21:24:17 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/custom/models/7f954280-8212-4c61-9c33-8fea2e47d279/copyResults/eefd4da6-4503-4542-99bb-eee373b53f7e')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-06-26T21:24:12Z","lastUpdatedDateTime":"2020-06-26T21:24:12Z","copyResult":{"modelId":"be7f15e3-1b1e-43da-a133-d2869763f3c2"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  'df40c290-1d3a-4d13-9dc0-0638d5f48a8a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 26 Jun 2020 21:24:17 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/custom/models/7f954280-8212-4c61-9c33-8fea2e47d279/copyResults/eefd4da6-4503-4542-99bb-eee373b53f7e')
  .reply(200, {"status":"succeeded","createdDateTime":"2020-06-26T21:24:36.5192716Z","lastUpdatedDateTime":"2020-06-26T21:24:36.5192718Z","copyResult":{"modelId":"be7f15e3-1b1e-43da-a133-d2869763f3c2"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '28',
  'apim-request-id',
  '0f65dce7-4331-42cf-9427-9f2050ee9871',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 26 Jun 2020 21:24:37 GMT',
  'Connection',
  'close'
]);
