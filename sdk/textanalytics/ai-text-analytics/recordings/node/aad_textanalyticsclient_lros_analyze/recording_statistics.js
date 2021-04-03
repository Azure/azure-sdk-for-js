let nock = require('nock');

module.exports.hash = "9d5b39c71a9313c579a003b2a0557e47";

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
  '5bb2e781-00e6-465d-a5e2-022f38cb6700',
  'x-ms-ests-server',
  '2.1.11530.15 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AtLUJj6gS5dGl0RnKRkwUEpz_bg1AQAAAC2V1NcOAAAA; expires=Sun, 04-Apr-2021 21:10:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 05 Mar 2021 21:10:05 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/analyze', {"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]},"analysisInput":{"documents":[{"id":"56","text":":)"},{"id":"0","text":":("},{"id":"22","text":""},{"id":"19","text":":P"},{"id":"1","text":":D"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/695a8331-d4ce-4499-bbbf-32e398c7536c',
  'x-envoy-upstream-service-time',
  '1357',
  'apim-request-id',
  'a883ba1d-c0b2-4780-909d-ad0bbb7aedbd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 21:10:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/695a8331-d4ce-4499-bbbf-32e398c7536c')
  .query(true)
  .reply(200, {"jobId":"695a8331-d4ce-4499-bbbf-32e398c7536c","lastUpdateDateTime":"2021-03-05T21:10:12Z","createdDateTime":"2021-03-05T21:10:12Z","expirationDateTime":"2021-03-06T21:10:12Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-03-05T21:10:12Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '1405',
  'apim-request-id',
  '5a996d92-5ec1-4730-b9aa-1b1445cba6fa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 21:10:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/695a8331-d4ce-4499-bbbf-32e398c7536c')
  .query(true)
  .reply(200, {"jobId":"695a8331-d4ce-4499-bbbf-32e398c7536c","lastUpdateDateTime":"2021-03-05T21:10:15Z","createdDateTime":"2021-03-05T21:10:12Z","expirationDateTime":"2021-03-06T21:10:12Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-03-05T21:10:15Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-03-05T21:10:15.2080175Z","state":"succeeded","results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"0","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"19","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"1","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidRequest","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '3413',
  'apim-request-id',
  '9c38dc22-a1d2-45fc-9ac0-15223a1a722f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 21:10:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/695a8331-d4ce-4499-bbbf-32e398c7536c')
  .query(true)
  .reply(200, {"jobId":"695a8331-d4ce-4499-bbbf-32e398c7536c","lastUpdateDateTime":"2021-03-05T21:10:15Z","createdDateTime":"2021-03-05T21:10:12Z","expirationDateTime":"2021-03-06T21:10:12Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-03-05T21:10:15Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-03-05T21:10:15.2080175Z","state":"succeeded","results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"0","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"19","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"1","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidRequest","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '723',
  'apim-request-id',
  'c680d3ad-3f18-47f5-a2ef-53ab0a0ef71c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 21:10:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/695a8331-d4ce-4499-bbbf-32e398c7536c')
  .query(true)
  .reply(200, {"jobId":"695a8331-d4ce-4499-bbbf-32e398c7536c","lastUpdateDateTime":"2021-03-05T21:10:15Z","createdDateTime":"2021-03-05T21:10:12Z","expirationDateTime":"2021-03-06T21:10:12Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-03-05T21:10:15Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-03-05T21:10:15.2080175Z","state":"succeeded","results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"0","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"19","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"1","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidRequest","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '1643',
  'apim-request-id',
  'f0dec742-c958-4e51-bf9d-ccc3aaf50442',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 21:10:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/695a8331-d4ce-4499-bbbf-32e398c7536c')
  .query(true)
  .reply(200, {"jobId":"695a8331-d4ce-4499-bbbf-32e398c7536c","lastUpdateDateTime":"2021-03-05T21:10:15Z","createdDateTime":"2021-03-05T21:10:12Z","expirationDateTime":"2021-03-06T21:10:12Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-03-05T21:10:15Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-03-05T21:10:15.2080175Z","state":"succeeded","results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"0","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"19","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"1","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidRequest","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '1106',
  'apim-request-id',
  '8b88941c-cba7-406a-8163-bf78ea179275',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 21:10:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/695a8331-d4ce-4499-bbbf-32e398c7536c')
  .query(true)
  .reply(200, {"jobId":"695a8331-d4ce-4499-bbbf-32e398c7536c","lastUpdateDateTime":"2021-03-05T21:10:15Z","createdDateTime":"2021-03-05T21:10:12Z","expirationDateTime":"2021-03-06T21:10:12Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-03-05T21:10:15Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-03-05T21:10:15.2080175Z","state":"succeeded","results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"0","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"19","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"1","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidRequest","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '2002',
  'apim-request-id',
  '2866b412-6a2b-4311-9232-7cc787ff7695',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 21:10:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/695a8331-d4ce-4499-bbbf-32e398c7536c')
  .query(true)
  .reply(200, {"jobId":"695a8331-d4ce-4499-bbbf-32e398c7536c","lastUpdateDateTime":"2021-03-05T21:10:15Z","createdDateTime":"2021-03-05T21:10:12Z","expirationDateTime":"2021-03-06T21:10:12Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-03-05T21:10:15Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-03-05T21:10:15.2080175Z","state":"succeeded","results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"0","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"19","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"1","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidRequest","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '1787',
  'apim-request-id',
  'bf0762f4-6272-43ec-a602-e00d20f59bf8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 21:10:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/695a8331-d4ce-4499-bbbf-32e398c7536c')
  .query(true)
  .reply(200, {"jobId":"695a8331-d4ce-4499-bbbf-32e398c7536c","lastUpdateDateTime":"2021-03-05T21:10:15Z","createdDateTime":"2021-03-05T21:10:12Z","expirationDateTime":"2021-03-06T21:10:12Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-03-05T21:10:15Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-03-05T21:10:15.2080175Z","state":"succeeded","results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"0","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"19","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"1","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidRequest","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '2402',
  'apim-request-id',
  'b0e36c42-e122-4761-bf16-a0a9b73ddd81',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 21:10:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/695a8331-d4ce-4499-bbbf-32e398c7536c')
  .query(true)
  .reply(200, {"jobId":"695a8331-d4ce-4499-bbbf-32e398c7536c","lastUpdateDateTime":"2021-03-05T21:10:15Z","createdDateTime":"2021-03-05T21:10:12Z","expirationDateTime":"2021-03-06T21:10:12Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-03-05T21:10:15Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-03-05T21:10:15.2080175Z","state":"succeeded","results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"0","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"19","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"1","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidRequest","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '244',
  'apim-request-id',
  'd7bb3d19-268e-44eb-a269-9f1c4de1af60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 21:10:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/695a8331-d4ce-4499-bbbf-32e398c7536c')
  .query(true)
  .reply(200, {"jobId":"695a8331-d4ce-4499-bbbf-32e398c7536c","lastUpdateDateTime":"2021-03-05T21:10:15Z","createdDateTime":"2021-03-05T21:10:12Z","expirationDateTime":"2021-03-06T21:10:12Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-03-05T21:10:15Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-03-05T21:10:15.2080175Z","state":"succeeded","results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"0","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"19","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"1","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidRequest","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '337',
  'apim-request-id',
  '883c7823-63a1-4129-9675-bec85c73cd62',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 21:10:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/695a8331-d4ce-4499-bbbf-32e398c7536c')
  .query(true)
  .reply(200, {"jobId":"695a8331-d4ce-4499-bbbf-32e398c7536c","lastUpdateDateTime":"2021-03-05T21:10:15Z","createdDateTime":"2021-03-05T21:10:12Z","expirationDateTime":"2021-03-06T21:10:12Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-03-05T21:10:15Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-03-05T21:10:15.2080175Z","state":"succeeded","results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"0","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"19","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"1","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidRequest","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '184',
  'apim-request-id',
  '003ac93f-5b6f-4d6d-8081-cffbc1f66f99',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 21:10:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/695a8331-d4ce-4499-bbbf-32e398c7536c')
  .query(true)
  .reply(200, {"jobId":"695a8331-d4ce-4499-bbbf-32e398c7536c","lastUpdateDateTime":"2021-03-05T21:10:15Z","createdDateTime":"2021-03-05T21:10:12Z","expirationDateTime":"2021-03-06T21:10:12Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-03-05T21:10:15Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-03-05T21:10:15.2080175Z","state":"succeeded","results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"0","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"19","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"1","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidRequest","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '621',
  'apim-request-id',
  '9770a7c1-a8e8-43bc-bd1e-8d28aba9fe68',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 21:10:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/695a8331-d4ce-4499-bbbf-32e398c7536c')
  .query(true)
  .reply(200, {"jobId":"695a8331-d4ce-4499-bbbf-32e398c7536c","lastUpdateDateTime":"2021-03-05T21:10:15Z","createdDateTime":"2021-03-05T21:10:12Z","expirationDateTime":"2021-03-06T21:10:12Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-03-05T21:10:15Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-03-05T21:10:15.2080175Z","state":"succeeded","results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"0","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"19","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"1","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidRequest","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '202',
  'apim-request-id',
  '1340e3fa-5b58-4f12-84cb-6cfb6a450092',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 21:10:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/695a8331-d4ce-4499-bbbf-32e398c7536c')
  .query(true)
  .reply(200, {"jobId":"695a8331-d4ce-4499-bbbf-32e398c7536c","lastUpdateDateTime":"2021-03-05T21:10:15Z","createdDateTime":"2021-03-05T21:10:12Z","expirationDateTime":"2021-03-06T21:10:12Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-03-05T21:10:15Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-03-05T21:10:15.2080175Z","state":"succeeded","results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"0","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"19","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"1","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidRequest","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '196',
  'apim-request-id',
  '17aa0b1e-3f71-4ba4-b860-69cb79c62d36',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 21:10:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/695a8331-d4ce-4499-bbbf-32e398c7536c')
  .query(true)
  .reply(200, {"jobId":"695a8331-d4ce-4499-bbbf-32e398c7536c","lastUpdateDateTime":"2021-03-05T21:10:15Z","createdDateTime":"2021-03-05T21:10:12Z","expirationDateTime":"2021-03-06T21:10:12Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-03-05T21:10:15Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-03-05T21:10:15.2080175Z","state":"succeeded","results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"0","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"19","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"1","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidRequest","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '251',
  'apim-request-id',
  '41943cc1-842d-4fa7-a6bf-1ccbf0d8c255',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 21:10:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/695a8331-d4ce-4499-bbbf-32e398c7536c')
  .query(true)
  .reply(200, {"jobId":"695a8331-d4ce-4499-bbbf-32e398c7536c","lastUpdateDateTime":"2021-03-05T21:10:15Z","createdDateTime":"2021-03-05T21:10:12Z","expirationDateTime":"2021-03-06T21:10:12Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-03-05T21:10:15Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-03-05T21:10:15.2080175Z","state":"succeeded","results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"0","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"19","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"1","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidRequest","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '155',
  'apim-request-id',
  'a4185b91-f07f-4db0-aed0-74d91c0a3225',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 21:10:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/695a8331-d4ce-4499-bbbf-32e398c7536c')
  .query(true)
  .reply(200, {"jobId":"695a8331-d4ce-4499-bbbf-32e398c7536c","lastUpdateDateTime":"2021-03-05T21:10:15Z","createdDateTime":"2021-03-05T21:10:12Z","expirationDateTime":"2021-03-06T21:10:12Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-03-05T21:10:15Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-03-05T21:10:15.2080175Z","state":"succeeded","results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"0","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"19","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"1","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidRequest","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '139',
  'apim-request-id',
  '1b53e6e0-82bd-4cb1-9581-4374838438cc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 21:11:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/695a8331-d4ce-4499-bbbf-32e398c7536c')
  .query(true)
  .reply(200, {"jobId":"695a8331-d4ce-4499-bbbf-32e398c7536c","lastUpdateDateTime":"2021-03-05T21:10:15Z","createdDateTime":"2021-03-05T21:10:12Z","expirationDateTime":"2021-03-06T21:10:12Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-03-05T21:10:15Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-03-05T21:10:15.2080175Z","state":"succeeded","results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"0","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"19","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"1","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidRequest","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '157',
  'apim-request-id',
  '095cbe15-ee5a-4184-ae9d-205ce42f6b9c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 21:11:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/695a8331-d4ce-4499-bbbf-32e398c7536c')
  .query(true)
  .reply(200, {"jobId":"695a8331-d4ce-4499-bbbf-32e398c7536c","lastUpdateDateTime":"2021-03-05T21:10:15Z","createdDateTime":"2021-03-05T21:10:12Z","expirationDateTime":"2021-03-06T21:10:12Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-03-05T21:10:15Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-03-05T21:10:15.2080175Z","state":"succeeded","results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"0","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"19","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"1","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidRequest","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '222',
  'apim-request-id',
  'dcfd12ac-886f-4607-8dfd-291c889ddc87',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 21:11:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/695a8331-d4ce-4499-bbbf-32e398c7536c')
  .query(true)
  .reply(200, {"jobId":"695a8331-d4ce-4499-bbbf-32e398c7536c","lastUpdateDateTime":"2021-03-05T21:10:15Z","createdDateTime":"2021-03-05T21:10:12Z","expirationDateTime":"2021-03-06T21:10:12Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-03-05T21:10:15Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-03-05T21:10:15.2080175Z","state":"succeeded","results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"0","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"19","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"1","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidRequest","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '239',
  'apim-request-id',
  '5acea655-b7d6-4be8-94d4-b06cea5e642b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 21:11:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/695a8331-d4ce-4499-bbbf-32e398c7536c')
  .query(true)
  .reply(200, {"jobId":"695a8331-d4ce-4499-bbbf-32e398c7536c","lastUpdateDateTime":"2021-03-05T21:10:15Z","createdDateTime":"2021-03-05T21:10:12Z","expirationDateTime":"2021-03-06T21:10:12Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-03-05T21:10:15Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-03-05T21:10:15.2080175Z","state":"succeeded","results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"0","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"19","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"1","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidRequest","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '907',
  'apim-request-id',
  '6de404fc-cfed-4d07-a522-3784263f5603',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 21:11:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/695a8331-d4ce-4499-bbbf-32e398c7536c')
  .query(true)
  .reply(200, {"jobId":"695a8331-d4ce-4499-bbbf-32e398c7536c","lastUpdateDateTime":"2021-03-05T21:10:15Z","createdDateTime":"2021-03-05T21:10:12Z","expirationDateTime":"2021-03-06T21:10:12Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-03-05T21:10:15Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-03-05T21:10:15.2080175Z","state":"succeeded","results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"0","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"19","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"1","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidRequest","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '184',
  'apim-request-id',
  '8377e627-8e46-47b0-ad52-a615bc480273',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 21:11:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/695a8331-d4ce-4499-bbbf-32e398c7536c')
  .query(true)
  .reply(200, {"jobId":"695a8331-d4ce-4499-bbbf-32e398c7536c","lastUpdateDateTime":"2021-03-05T21:10:15Z","createdDateTime":"2021-03-05T21:10:12Z","expirationDateTime":"2021-03-06T21:10:12Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-03-05T21:10:15Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-03-05T21:10:15.2080175Z","state":"succeeded","results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"0","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"19","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"1","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidRequest","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '155',
  'apim-request-id',
  'b9a2a22c-fb5e-4d4c-b2ba-a0b0e9c377cc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 21:11:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/695a8331-d4ce-4499-bbbf-32e398c7536c')
  .query(true)
  .reply(200, {"jobId":"695a8331-d4ce-4499-bbbf-32e398c7536c","lastUpdateDateTime":"2021-03-05T21:10:15Z","createdDateTime":"2021-03-05T21:10:12Z","expirationDateTime":"2021-03-06T21:10:12Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-03-05T21:10:15Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-03-05T21:10:15.2080175Z","state":"succeeded","results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"0","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"19","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"1","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidRequest","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '218',
  'apim-request-id',
  '82b8c99f-3aa7-435f-b4d9-2cf46b35ef64',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 21:11:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/695a8331-d4ce-4499-bbbf-32e398c7536c')
  .query(true)
  .reply(200, {"jobId":"695a8331-d4ce-4499-bbbf-32e398c7536c","lastUpdateDateTime":"2021-03-05T21:10:15Z","createdDateTime":"2021-03-05T21:10:12Z","expirationDateTime":"2021-03-06T21:10:12Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-03-05T21:10:15Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-03-05T21:10:15.2080175Z","state":"succeeded","results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"0","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"19","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"1","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidRequest","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '190',
  'apim-request-id',
  'f770fb0d-0e36-4fc6-837a-623b970aa7b7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 21:11:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/695a8331-d4ce-4499-bbbf-32e398c7536c')
  .query(true)
  .reply(200, {"jobId":"695a8331-d4ce-4499-bbbf-32e398c7536c","lastUpdateDateTime":"2021-03-05T21:10:15Z","createdDateTime":"2021-03-05T21:10:12Z","expirationDateTime":"2021-03-06T21:10:12Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-03-05T21:10:15Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-03-05T21:10:15.2080175Z","state":"succeeded","results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]},{"id":"0","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]},{"id":"19","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]},{"id":"1","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidRequest","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-03-05T21:10:15.2080175Z","state":"succeeded","results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"redactedText":":)","id":"56","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]},{"redactedText":":(","id":"0","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]},{"redactedText":":P","id":"19","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]},{"redactedText":":D","id":"1","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidRequest","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-03-05T21:10:15.2080175Z","state":"succeeded","results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"0","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"19","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"1","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidRequest","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '1195',
  'apim-request-id',
  '32c2b979-280c-4cc3-8743-581edc844a98',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 21:11:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/695a8331-d4ce-4499-bbbf-32e398c7536c')
  .query(true)
  .reply(200, {"jobId":"695a8331-d4ce-4499-bbbf-32e398c7536c","lastUpdateDateTime":"2021-03-05T21:10:15Z","createdDateTime":"2021-03-05T21:10:12Z","expirationDateTime":"2021-03-06T21:10:12Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-03-05T21:10:15Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-03-05T21:10:15.2080175Z","state":"succeeded","results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]},{"id":"0","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]},{"id":"19","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]},{"id":"1","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidRequest","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-03-05T21:10:15.2080175Z","state":"succeeded","results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"redactedText":":)","id":"56","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]},{"redactedText":":(","id":"0","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]},{"redactedText":":P","id":"19","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]},{"redactedText":":D","id":"1","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidRequest","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-03-05T21:10:15.2080175Z","state":"succeeded","results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"0","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"19","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]},{"id":"1","keyPhrases":[],"statistics":{"charactersCount":2,"transactionsCount":1},"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidRequest","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '279',
  'apim-request-id',
  '1109cb75-0771-461d-89c4-00c2e9717536',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 21:11:22 GMT'
]);
