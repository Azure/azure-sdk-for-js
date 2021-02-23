let nock = require('nock');

module.exports.hash = "c6b29871814e2ed17055893a0e240b0f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
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
  '57be2733-70a8-45f3-8c30-3fc5e7dd0d00',
  'x-ms-ests-server',
  '2.1.11513.13 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1DgAAAMVixtcOAAAA; expires=Thu, 25-Mar-2021 02:43:33 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 02:43:33 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/entities/recognition/pii', {"documents":[{"id":"0","text":"👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: 859-98-0987","language":"en"}]})
  .query(true)
  .reply(200, {"documents":[{"redactedText":"👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: ***********","id":"0","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":17,"length":11,"confidenceScore":0.65}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1',
  'x-envoy-upstream-service-time',
  '61',
  'apim-request-id',
  'e5e3093f-baf0-416d-bcfd-a512b6278783',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:43:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/entities/recognition/pii', {"documents":[{"id":"0","text":"👩 SSN: 859-98-0987","language":"en"}]})
  .query(true)
  .reply(200, {"documents":[{"redactedText":"👩 SSN: ***********","id":"0","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":7,"length":11,"confidenceScore":0.65}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  'a1088743-f2e4-49aa-b639-5ac40717cf37',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:43:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/entities/recognition/pii', {"documents":[{"id":"0","text":"아가 SSN: 859-98-0987","language":"en"}]})
  .query(true)
  .reply(200, {"documents":[{"redactedText":"아가 SSN: ***********","id":"0","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":8,"length":11,"confidenceScore":0.65}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1',
  'x-envoy-upstream-service-time',
  '49',
  'apim-request-id',
  'ca6bef5a-d76f-461a-9c07-74c51a9c0033',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:43:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/entities/recognition/pii', {"documents":[{"id":"0","text":"año SSN: 859-98-0987","language":"en"}]})
  .query(true)
  .reply(200, {"documents":[{"redactedText":"año SSN: ***********","id":"0","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":9,"length":11,"confidenceScore":0.65}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1',
  'x-envoy-upstream-service-time',
  '31',
  'apim-request-id',
  '4e427403-87fc-4393-aa46-3085b44944d8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:43:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/entities/recognition/pii', {"documents":[{"id":"0","text":"👩‍👩‍👧‍👧 SSN: 859-98-0987","language":"en"}]})
  .query(true)
  .reply(200, {"documents":[{"redactedText":"👩‍👩‍👧‍👧 SSN: ***********","id":"0","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":13,"length":11,"confidenceScore":0.65}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  'c8e237f6-9fab-4fd0-98d9-7675bd608ef9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:43:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/entities/recognition/pii', {"documents":[{"id":"0","text":"👩🏻 SSN: 859-98-0987","language":"en"}]})
  .query(true)
  .reply(200, {"documents":[{"redactedText":"👩🏻 SSN: ***********","id":"0","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":8,"length":11,"confidenceScore":0.65}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1',
  'x-envoy-upstream-service-time',
  '53',
  'apim-request-id',
  'e1930a54-1b34-4bc8-9d99-c3e8e26a4911',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:43:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/entities/recognition/pii', {"documents":[{"id":"0","text":"아가 SSN: 859-98-0987","language":"en"}]})
  .query(true)
  .reply(200, {"documents":[{"redactedText":"아가 SSN: ***********","id":"0","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":8,"length":11,"confidenceScore":0.65}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1',
  'x-envoy-upstream-service-time',
  '59',
  'apim-request-id',
  '3474fb91-554c-44df-ad90-ddc318610945',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:43:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/entities/recognition/pii', {"documents":[{"id":"0","text":"año SSN: 859-98-0987","language":"en"}]})
  .query(true)
  .reply(200, {"documents":[{"redactedText":"año SSN: ***********","id":"0","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":9,"length":11,"confidenceScore":0.65}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1',
  'x-envoy-upstream-service-time',
  '48',
  'apim-request-id',
  '15d32ead-e5f3-43a4-9d28-238163405778',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:43:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/entities/recognition/pii', {"documents":[{"id":"0","text":"ơ̵̧̧̢̳̘̘͕͔͕̭̟̙͎͈̞͔̈̇̒̃͋̇̅͛̋͛̎́͑̄̐̂̎͗͝m̵͍͉̗̄̏͌̂̑̽̕͝͠g̵̢̡̢̡̨̡̧̛͉̞̯̠̤̣͕̟̫̫̼̰͓̦͖̣̣͎̋͒̈́̓̒̈̍̌̓̅͑̒̓̅̅͒̿̏́͗̀̇͛̏̀̈́̀̊̾̀̔͜͠͝ͅ SSN: 859-98-0987","language":"en"}]})
  .query(true)
  .reply(200, {"documents":[{"redactedText":"ơ̵̧̧̢̳̘̘͕͔͕̭̟̙͎͈̞͔̈̇̒̃͋̇̅͛̋͛̎́͑̄̐̂̎͗͝m̵͍͉̗̄̏͌̂̑̽̕͝͠g̵̢̡̢̡̨̡̧̛͉̞̯̠̤̣͕̟̫̫̼̰͓̦͖̣̣͎̋͒̈́̓̒̈̍̌̓̅͑̒̓̅̅͒̿̏́͗̀̇͛̏̀̈́̀̊̾̀̔͜͠͝ͅ SSN: ***********","id":"0","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":9,"length":11,"confidenceScore":0.65}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1',
  'x-envoy-upstream-service-time',
  '103',
  'apim-request-id',
  '518d6bb5-ccba-46cf-bc04-315664e1ad01',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:43:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/entities/recognition/pii', {"documents":[{"id":"0","text":"ơ̵̧̧̢̳̘̘͕͔͕̭̟̙͎͈̞͔̈̇̒̃͋̇̅͛̋͛̎́͑̄̐̂̎͗͝m̵͍͉̗̄̏͌̂̑̽̕͝͠g̵̢̡̢̡̨̡̧̛͉̞̯̠̤̣͕̟̫̫̼̰͓̦͖̣̣͎̋͒̈́̓̒̈̍̌̓̅͑̒̓̅̅͒̿̏́͗̀̇͛̏̀̈́̀̊̾̀̔͜͠͝ͅ SSN: 859-98-0987","language":"en"}]})
  .query(true)
  .reply(200, {"documents":[{"redactedText":"ơ̵̧̧̢̳̘̘͕͔͕̭̟̙͎͈̞͔̈̇̒̃͋̇̅͛̋͛̎́͑̄̐̂̎͗͝m̵͍͉̗̄̏͌̂̑̽̕͝͠g̵̢̡̢̡̨̡̧̛͉̞̯̠̤̣͕̟̫̫̼̰͓̦͖̣̣͎̋͒̈́̓̒̈̍̌̓̅͑̒̓̅̅͒̿̏́͗̀̇͛̏̀̈́̀̊̾̀̔͜͠͝ͅ SSN: ***********","id":"0","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":121,"length":11,"confidenceScore":0.65}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1',
  'x-envoy-upstream-service-time',
  '226',
  'apim-request-id',
  '6a4b0e48-aedf-48b4-a4ad-89eac44a30a9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:43:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/entities/recognition/pii', {"documents":[{"id":"0","text":"아가 SSN: 859-98-0987","language":"en"}]})
  .query(true)
  .reply(200, {"documents":[{"redactedText":"아가 SSN: ***********","id":"0","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":8,"length":11,"confidenceScore":0.65}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'csp-billing-usage',
  'CognitiveServices.TextAnalytics.BatchScoring=1',
  'x-envoy-upstream-service-time',
  '825',
  'apim-request-id',
  '80fb173c-e3f8-4cbd-a66a-703b18138b7b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:43:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/analyze', {"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]},"analysisInput":{"documents":[{"id":"1","text":"Microsoft was founded by Bill Gates and Paul Allen","language":"en"},{"id":"2","text":"Microsoft fue fundado por Bill Gates y Paul Allen","language":"es"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/8b4b2275-e66d-4e10-a88e-41bf9ff96d9e',
  'x-envoy-upstream-service-time',
  '1929',
  'apim-request-id',
  '50727f67-005b-47ea-8dda-4924a78a233d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:43:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8b4b2275-e66d-4e10-a88e-41bf9ff96d9e')
  .query(true)
  .reply(200, {"jobId":"8b4b2275-e66d-4e10-a88e-41bf9ff96d9e","lastUpdateDateTime":"2021-02-23T02:43:33Z","createdDateTime":"2021-02-23T02:43:33Z","expirationDateTime":"2021-02-24T02:43:33Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:43:33Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '551',
  'apim-request-id',
  'a018455d-c918-41c9-9990-162f3c86aa96',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:43:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8b4b2275-e66d-4e10-a88e-41bf9ff96d9e')
  .query(true)
  .reply(200, {"jobId":"8b4b2275-e66d-4e10-a88e-41bf9ff96d9e","lastUpdateDateTime":"2021-02-23T02:43:33Z","createdDateTime":"2021-02-23T02:43:33Z","expirationDateTime":"2021-02-24T02:43:33Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:43:33Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '140e59f4-c06b-40ca-a958-031e101cfd89',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:43:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8b4b2275-e66d-4e10-a88e-41bf9ff96d9e')
  .query(true)
  .reply(200, {"jobId":"8b4b2275-e66d-4e10-a88e-41bf9ff96d9e","lastUpdateDateTime":"2021-02-23T02:43:33Z","createdDateTime":"2021-02-23T02:43:33Z","expirationDateTime":"2021-02-24T02:43:33Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:43:33Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  '81d71030-5a97-403a-a711-a1af551572b5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:43:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8b4b2275-e66d-4e10-a88e-41bf9ff96d9e')
  .query(true)
  .reply(200, {"jobId":"8b4b2275-e66d-4e10-a88e-41bf9ff96d9e","lastUpdateDateTime":"2021-02-23T02:43:39Z","createdDateTime":"2021-02-23T02:43:33Z","expirationDateTime":"2021-02-24T02:43:33Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:43:39Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '782',
  'apim-request-id',
  'fe0a5b75-2164-47cc-b22b-bd842e1b802b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:43:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8b4b2275-e66d-4e10-a88e-41bf9ff96d9e')
  .query(true)
  .reply(200, {"jobId":"8b4b2275-e66d-4e10-a88e-41bf9ff96d9e","lastUpdateDateTime":"2021-02-23T02:43:39Z","createdDateTime":"2021-02-23T02:43:33Z","expirationDateTime":"2021-02-24T02:43:33Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:43:39Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  'e7238758-cdc7-42d8-98e5-8f37b697ba30',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:43:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8b4b2275-e66d-4e10-a88e-41bf9ff96d9e')
  .query(true)
  .reply(200, {"jobId":"8b4b2275-e66d-4e10-a88e-41bf9ff96d9e","lastUpdateDateTime":"2021-02-23T02:43:39Z","createdDateTime":"2021-02-23T02:43:33Z","expirationDateTime":"2021-02-24T02:43:33Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:43:39Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  'abb5317d-0928-41b5-8a64-58a42b1231d5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:43:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8b4b2275-e66d-4e10-a88e-41bf9ff96d9e')
  .query(true)
  .reply(200, {"jobId":"8b4b2275-e66d-4e10-a88e-41bf9ff96d9e","lastUpdateDateTime":"2021-02-23T02:43:39Z","createdDateTime":"2021-02-23T02:43:33Z","expirationDateTime":"2021-02-24T02:43:33Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:43:39Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '1240',
  'apim-request-id',
  '17a38e1c-a05d-4b8c-9264-c098eceab1a7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:43:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8b4b2275-e66d-4e10-a88e-41bf9ff96d9e')
  .query(true)
  .reply(200, {"jobId":"8b4b2275-e66d-4e10-a88e-41bf9ff96d9e","lastUpdateDateTime":"2021-02-23T02:43:39Z","createdDateTime":"2021-02-23T02:43:33Z","expirationDateTime":"2021-02-24T02:43:33Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:43:39Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '441',
  'apim-request-id',
  'd56556eb-d631-43bd-a43a-a238faa07fc7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:43:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8b4b2275-e66d-4e10-a88e-41bf9ff96d9e')
  .query(true)
  .reply(200, {"jobId":"8b4b2275-e66d-4e10-a88e-41bf9ff96d9e","lastUpdateDateTime":"2021-02-23T02:43:39Z","createdDateTime":"2021-02-23T02:43:33Z","expirationDateTime":"2021-02-24T02:43:33Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:43:39Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '129',
  'apim-request-id',
  'bb815be6-6310-472d-b2c0-cbc82504a1f4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:43:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8b4b2275-e66d-4e10-a88e-41bf9ff96d9e')
  .query(true)
  .reply(200, {"jobId":"8b4b2275-e66d-4e10-a88e-41bf9ff96d9e","lastUpdateDateTime":"2021-02-23T02:43:39Z","createdDateTime":"2021-02-23T02:43:33Z","expirationDateTime":"2021-02-24T02:43:33Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:43:39Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '546',
  'apim-request-id',
  'e1d1f8d2-f23d-424e-98b9-b6858c738f4b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:43:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8b4b2275-e66d-4e10-a88e-41bf9ff96d9e')
  .query(true)
  .reply(200, {"jobId":"8b4b2275-e66d-4e10-a88e-41bf9ff96d9e","lastUpdateDateTime":"2021-02-23T02:43:39Z","createdDateTime":"2021-02-23T02:43:33Z","expirationDateTime":"2021-02-24T02:43:33Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:43:39Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '847',
  'apim-request-id',
  '5b6ed850-e033-4be3-b013-c098546e03ad',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:43:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8b4b2275-e66d-4e10-a88e-41bf9ff96d9e')
  .query(true)
  .reply(200, {"jobId":"8b4b2275-e66d-4e10-a88e-41bf9ff96d9e","lastUpdateDateTime":"2021-02-23T02:43:39Z","createdDateTime":"2021-02-23T02:43:33Z","expirationDateTime":"2021-02-24T02:43:33Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:43:39Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '328',
  'apim-request-id',
  '8a727f0c-77b8-49b8-9c42-31de47a2e238',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:44:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8b4b2275-e66d-4e10-a88e-41bf9ff96d9e')
  .query(true)
  .reply(200, {"jobId":"8b4b2275-e66d-4e10-a88e-41bf9ff96d9e","lastUpdateDateTime":"2021-02-23T02:43:39Z","createdDateTime":"2021-02-23T02:43:33Z","expirationDateTime":"2021-02-24T02:43:33Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:43:39Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '530',
  'apim-request-id',
  'f54b1369-d6fc-4d43-93a0-8fe55733af01',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:44:03 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
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
  '8540ade9-f402-43da-bbc4-fe8e910e7c00',
  'x-ms-ests-server',
  '2.1.11513.13 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1DwAAAMVixtcOAAAA; expires=Thu, 25-Mar-2021 02:44:06 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 02:44:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8b4b2275-e66d-4e10-a88e-41bf9ff96d9e')
  .query(true)
  .reply(200, {"jobId":"8b4b2275-e66d-4e10-a88e-41bf9ff96d9e","lastUpdateDateTime":"2021-02-23T02:43:39Z","createdDateTime":"2021-02-23T02:43:33Z","expirationDateTime":"2021-02-24T02:43:33Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:43:39Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '1091',
  'apim-request-id',
  '5f70d766-bd27-471e-a246-13c2106aa018',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:44:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8b4b2275-e66d-4e10-a88e-41bf9ff96d9e')
  .query(true)
  .reply(200, {"jobId":"8b4b2275-e66d-4e10-a88e-41bf9ff96d9e","lastUpdateDateTime":"2021-02-23T02:43:39Z","createdDateTime":"2021-02-23T02:43:33Z","expirationDateTime":"2021-02-24T02:43:33Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:43:39Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '1309',
  'apim-request-id',
  'e519a078-a31c-4353-9474-4bc2d521d9fe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:44:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8b4b2275-e66d-4e10-a88e-41bf9ff96d9e')
  .query(true)
  .reply(200, {"jobId":"8b4b2275-e66d-4e10-a88e-41bf9ff96d9e","lastUpdateDateTime":"2021-02-23T02:43:39Z","createdDateTime":"2021-02-23T02:43:33Z","expirationDateTime":"2021-02-24T02:43:33Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:43:39Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '74',
  'apim-request-id',
  '73e7af36-7e0e-4764-8e5b-b3c2aad9a981',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:44:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8b4b2275-e66d-4e10-a88e-41bf9ff96d9e')
  .query(true)
  .reply(200, {"jobId":"8b4b2275-e66d-4e10-a88e-41bf9ff96d9e","lastUpdateDateTime":"2021-02-23T02:43:39Z","createdDateTime":"2021-02-23T02:43:33Z","expirationDateTime":"2021-02-24T02:43:33Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:43:39Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  'ac6ff5f0-0150-40f5-84cd-16dc1835ca71',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:44:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8b4b2275-e66d-4e10-a88e-41bf9ff96d9e')
  .query(true)
  .reply(200, {"jobId":"8b4b2275-e66d-4e10-a88e-41bf9ff96d9e","lastUpdateDateTime":"2021-02-23T02:43:39Z","createdDateTime":"2021-02-23T02:43:33Z","expirationDateTime":"2021-02-24T02:43:33Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:43:39Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '176',
  'apim-request-id',
  'a1f09893-dd04-4276-94c7-fb11b9d02a04',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:44:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8b4b2275-e66d-4e10-a88e-41bf9ff96d9e')
  .query(true)
  .reply(200, {"jobId":"8b4b2275-e66d-4e10-a88e-41bf9ff96d9e","lastUpdateDateTime":"2021-02-23T02:43:39Z","createdDateTime":"2021-02-23T02:43:33Z","expirationDateTime":"2021-02-24T02:43:33Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:43:39Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '72',
  'apim-request-id',
  '1dca9f13-5087-4e04-9b2b-88c6139b5b9d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:44:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8b4b2275-e66d-4e10-a88e-41bf9ff96d9e')
  .query(true)
  .reply(200, {"jobId":"8b4b2275-e66d-4e10-a88e-41bf9ff96d9e","lastUpdateDateTime":"2021-02-23T02:43:39Z","createdDateTime":"2021-02-23T02:43:33Z","expirationDateTime":"2021-02-24T02:43:33Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:43:39Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '743',
  'apim-request-id',
  'a20b00ac-1b30-4191-93af-11dfb1550199',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:44:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8b4b2275-e66d-4e10-a88e-41bf9ff96d9e')
  .query(true)
  .reply(200, {"jobId":"8b4b2275-e66d-4e10-a88e-41bf9ff96d9e","lastUpdateDateTime":"2021-02-23T02:43:39Z","createdDateTime":"2021-02-23T02:43:33Z","expirationDateTime":"2021-02-24T02:43:33Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:43:39Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '427',
  'apim-request-id',
  '1f16b8f9-13d7-488f-b6cf-8d5497674b27',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:44:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8b4b2275-e66d-4e10-a88e-41bf9ff96d9e')
  .query(true)
  .reply(200, {"jobId":"8b4b2275-e66d-4e10-a88e-41bf9ff96d9e","lastUpdateDateTime":"2021-02-23T02:43:39Z","createdDateTime":"2021-02-23T02:43:33Z","expirationDateTime":"2021-02-24T02:43:33Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:43:39Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '677',
  'apim-request-id',
  '205db052-120e-4c3d-878c-a627ee268416',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:44:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8b4b2275-e66d-4e10-a88e-41bf9ff96d9e')
  .query(true)
  .reply(200, {"jobId":"8b4b2275-e66d-4e10-a88e-41bf9ff96d9e","lastUpdateDateTime":"2021-02-23T02:43:39Z","createdDateTime":"2021-02-23T02:43:33Z","expirationDateTime":"2021-02-24T02:43:33Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:43:39Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '188',
  'apim-request-id',
  '6b25082b-2f90-4c36-a144-31464b10d892',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:44:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8b4b2275-e66d-4e10-a88e-41bf9ff96d9e')
  .query(true)
  .reply(200, {"jobId":"8b4b2275-e66d-4e10-a88e-41bf9ff96d9e","lastUpdateDateTime":"2021-02-23T02:43:39Z","createdDateTime":"2021-02-23T02:43:33Z","expirationDateTime":"2021-02-24T02:43:33Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:43:39Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '410',
  'apim-request-id',
  '0e5a5778-9607-4fcc-87d1-8f92e05c15c8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:44:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8b4b2275-e66d-4e10-a88e-41bf9ff96d9e')
  .query(true)
  .reply(200, {"jobId":"8b4b2275-e66d-4e10-a88e-41bf9ff96d9e","lastUpdateDateTime":"2021-02-23T02:43:39Z","createdDateTime":"2021-02-23T02:43:33Z","expirationDateTime":"2021-02-24T02:43:33Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:43:39Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  '56b437e5-2971-47e6-b2ac-de20a9a6cd80',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:44:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8b4b2275-e66d-4e10-a88e-41bf9ff96d9e')
  .query(true)
  .reply(200, {"jobId":"8b4b2275-e66d-4e10-a88e-41bf9ff96d9e","lastUpdateDateTime":"2021-02-23T02:43:39Z","createdDateTime":"2021-02-23T02:43:33Z","expirationDateTime":"2021-02-24T02:43:33Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:43:39Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  '44a14048-2f75-4dd9-8ac3-07c240725869',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:44:36 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
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
  '4f096ab9-2cfe-428d-a7b0-d7324a490d00',
  'x-ms-ests-server',
  '2.1.11513.13 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1EAAAAMVixtcOAAAA; expires=Thu, 25-Mar-2021 02:44:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 02:44:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8b4b2275-e66d-4e10-a88e-41bf9ff96d9e')
  .query(true)
  .reply(200, {"jobId":"8b4b2275-e66d-4e10-a88e-41bf9ff96d9e","lastUpdateDateTime":"2021-02-23T02:43:39Z","createdDateTime":"2021-02-23T02:43:33Z","expirationDateTime":"2021-02-24T02:43:33Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:43:39Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '721',
  'apim-request-id',
  'f093bb5f-291a-40b0-b87e-f1976296c7b2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:44:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8b4b2275-e66d-4e10-a88e-41bf9ff96d9e')
  .query(true)
  .reply(200, {"jobId":"8b4b2275-e66d-4e10-a88e-41bf9ff96d9e","lastUpdateDateTime":"2021-02-23T02:43:39Z","createdDateTime":"2021-02-23T02:43:33Z","expirationDateTime":"2021-02-24T02:43:33Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:43:39Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  '43e94d70-d03e-4c6d-b855-a322b1d97d09',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:44:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8b4b2275-e66d-4e10-a88e-41bf9ff96d9e')
  .query(true)
  .reply(200, {"jobId":"8b4b2275-e66d-4e10-a88e-41bf9ff96d9e","lastUpdateDateTime":"2021-02-23T02:43:39Z","createdDateTime":"2021-02-23T02:43:33Z","expirationDateTime":"2021-02-24T02:43:33Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:43:39Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  'a49eb076-4c87-4a0a-b942-5070b47b4be4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:44:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8b4b2275-e66d-4e10-a88e-41bf9ff96d9e')
  .query(true)
  .reply(200, {"jobId":"8b4b2275-e66d-4e10-a88e-41bf9ff96d9e","lastUpdateDateTime":"2021-02-23T02:43:39Z","createdDateTime":"2021-02-23T02:43:33Z","expirationDateTime":"2021-02-24T02:43:33Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:43:39Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T02:43:39.060273Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.95},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":0.99},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.96},{"text":"Bill Gates","category":"Person","offset":26,"length":10,"confidenceScore":0.99},{"text":"Paul Allen","category":"Person","offset":39,"length":10,"confidenceScore":0.99}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '1214',
  'apim-request-id',
  '299d83c7-e422-4e04-ba05-7b302289a523',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:44:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8b4b2275-e66d-4e10-a88e-41bf9ff96d9e')
  .query(true)
  .reply(200, {"jobId":"8b4b2275-e66d-4e10-a88e-41bf9ff96d9e","lastUpdateDateTime":"2021-02-23T02:43:39Z","createdDateTime":"2021-02-23T02:43:33Z","expirationDateTime":"2021-02-24T02:43:33Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:43:39Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T02:43:39.060273Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.95},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":0.99},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.96},{"text":"Bill Gates","category":"Person","offset":26,"length":10,"confidenceScore":0.99},{"text":"Paul Allen","category":"Person","offset":39,"length":10,"confidenceScore":0.99}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '132',
  'apim-request-id',
  '6367153e-4416-4013-b1e1-9c03760fed16',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:44:45 GMT'
]);
