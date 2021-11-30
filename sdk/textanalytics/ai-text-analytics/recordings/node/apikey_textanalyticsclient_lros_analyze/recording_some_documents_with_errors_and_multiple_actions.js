let nock = require('nock');

module.exports.hash = "ddb31afd5bdb8c006a752c2060317d17";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/analyze', {"analysisInput":{"documents":[{"id":"1","text":"","language":""},{"id":"2","text":"I did not like the hotel we stayed at. It was too expensive.","language":"english"},{"id":"3","text":"The restaurant had really good food. I recommend you try it.","language":"en"}]},"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.2/analyze/jobs/05bb1c94-c928-4e10-8100-e561a013db4e',
  'x-envoy-upstream-service-time',
  '415',
  'apim-request-id',
  'b83e240a-ae9c-4029-a4fd-c8aa84d8dee8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:38:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/05bb1c94-c928-4e10-8100-e561a013db4e')
  .query(true)
  .reply(200, {"jobId":"05bb1c94-c928-4e10-8100-e561a013db4e","lastUpdateDateTime":"2021-10-23T00:38:26Z","createdDateTime":"2021-10-23T00:38:25Z","expirationDateTime":"2021-10-24T00:38:25Z","status":"notStarted","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '1a01ae68-61f6-4a5f-8da9-979a20acc5ba',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:38:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/05bb1c94-c928-4e10-8100-e561a013db4e')
  .query(true)
  .reply(200, {"jobId":"05bb1c94-c928-4e10-8100-e561a013db4e","lastUpdateDateTime":"2021-10-23T00:38:26Z","createdDateTime":"2021-10-23T00:38:25Z","expirationDateTime":"2021-10-24T00:38:25Z","status":"notStarted","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  '31f99280-373c-4736-afb3-fb6348467e82',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:38:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/05bb1c94-c928-4e10-8100-e561a013db4e')
  .query(true)
  .reply(200, {"jobId":"05bb1c94-c928-4e10-8100-e561a013db4e","lastUpdateDateTime":"2021-10-23T00:38:26Z","createdDateTime":"2021-10-23T00:38:25Z","expirationDateTime":"2021-10-24T00:38:25Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  'cc869b23-1cd1-4fae-b57f-d0e779924629',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:38:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/05bb1c94-c928-4e10-8100-e561a013db4e')
  .query(true)
  .reply(200, {"jobId":"05bb1c94-c928-4e10-8100-e561a013db4e","lastUpdateDateTime":"2021-10-23T00:38:26Z","createdDateTime":"2021-10-23T00:38:25Z","expirationDateTime":"2021-10-24T00:38:25Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '29ff6dec-4e8b-4937-ab4e-99c637ff2342',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:38:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/05bb1c94-c928-4e10-8100-e561a013db4e')
  .query(true)
  .reply(200, {"jobId":"05bb1c94-c928-4e10-8100-e561a013db4e","lastUpdateDateTime":"2021-10-23T00:38:32Z","createdDateTime":"2021-10-23T00:38:25Z","expirationDateTime":"2021-10-24T00:38:25Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'b4b11459-f2b3-4b2b-ab38-bbab11f0e8cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:38:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/05bb1c94-c928-4e10-8100-e561a013db4e')
  .query(true)
  .reply(200, {"jobId":"05bb1c94-c928-4e10-8100-e561a013db4e","lastUpdateDateTime":"2021-10-23T00:38:34Z","createdDateTime":"2021-10-23T00:38:25Z","expirationDateTime":"2021-10-24T00:38:25Z","status":"running","errors":[],"tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-23T00:38:34.2548765Z","state":"succeeded","results":{"documents":[{"redactedText":"The restaurant had really good food. I recommend you try it.","id":"3","entities":[],"warnings":[]}],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: ja,ko,zh-Hans,de,en,es,fr,it,pt-BR,pt-PT. For additional details see https://aka.ms/text-analytics/language-support?tabs=named-entity-recognition"}}}],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-10-23T00:38:34.4591533Z","state":"succeeded","results":{"documents":[{"id":"3","keyPhrases":["good food","restaurant"],"warnings":[]}],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: ja,ko,zh-Hans,da,fi,nl,pl,ru,sv,de,en,es,fr,it,pt-BR,pt-PT,af,bg,ca,el,et,hr,hu,id,lv,no,ro,sk,sl,tr. For additional details see https://aka.ms/text-analytics/language-support?tabs=key-phrase-extraction"}}}],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '194',
  'apim-request-id',
  '41ce52e2-8b47-43e3-87fe-f5030a2e1677',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:38:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/05bb1c94-c928-4e10-8100-e561a013db4e')
  .query(true)
  .reply(200, {"jobId":"05bb1c94-c928-4e10-8100-e561a013db4e","lastUpdateDateTime":"2021-10-23T00:38:35Z","createdDateTime":"2021-10-23T00:38:25Z","expirationDateTime":"2021-10-24T00:38:25Z","status":"succeeded","errors":[],"tasks":{"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-10-23T00:38:35.0455016Z","state":"succeeded","results":{"documents":[{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.97}],"warnings":[]}],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en,es,de,fr,zh-Hans,ar,cs,da,fi,hu,it,ja,ko,no,nl,pl,pt-BR,pt-PT,ru,sv,tr. For additional details see https://aka.ms/text-analytics/language-support?tabs=named-entity-recognition"}}}],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-23T00:38:34.2548765Z","state":"succeeded","results":{"documents":[{"redactedText":"The restaurant had really good food. I recommend you try it.","id":"3","entities":[],"warnings":[]}],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: ja,ko,zh-Hans,de,en,es,fr,it,pt-BR,pt-PT. For additional details see https://aka.ms/text-analytics/language-support?tabs=named-entity-recognition"}}}],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-10-23T00:38:34.4591533Z","state":"succeeded","results":{"documents":[{"id":"3","keyPhrases":["good food","restaurant"],"warnings":[]}],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: ja,ko,zh-Hans,da,fi,nl,pl,ru,sv,de,en,es,fr,it,pt-BR,pt-PT,af,bg,ca,el,et,hr,hu,id,lv,no,ro,sk,sl,tr. For additional details see https://aka.ms/text-analytics/language-support?tabs=key-phrase-extraction"}}}],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '239',
  'apim-request-id',
  '9f60d77b-7c2b-4349-b3b4-07285596493f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:38:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/05bb1c94-c928-4e10-8100-e561a013db4e')
  .query(true)
  .reply(200, {"jobId":"05bb1c94-c928-4e10-8100-e561a013db4e","lastUpdateDateTime":"2021-10-23T00:38:35Z","createdDateTime":"2021-10-23T00:38:25Z","expirationDateTime":"2021-10-24T00:38:25Z","status":"succeeded","errors":[],"tasks":{"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-10-23T00:38:35.0455016Z","state":"succeeded","results":{"documents":[{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.97}],"warnings":[]}],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en,es,de,fr,zh-Hans,ar,cs,da,fi,hu,it,ja,ko,no,nl,pl,pt-BR,pt-PT,ru,sv,tr. For additional details see https://aka.ms/text-analytics/language-support?tabs=named-entity-recognition"}}}],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-23T00:38:34.2548765Z","state":"succeeded","results":{"documents":[{"redactedText":"The restaurant had really good food. I recommend you try it.","id":"3","entities":[],"warnings":[]}],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: ja,ko,zh-Hans,de,en,es,fr,it,pt-BR,pt-PT. For additional details see https://aka.ms/text-analytics/language-support?tabs=named-entity-recognition"}}}],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-10-23T00:38:34.4591533Z","state":"succeeded","results":{"documents":[{"id":"3","keyPhrases":["good food","restaurant"],"warnings":[]}],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: ja,ko,zh-Hans,da,fi,nl,pl,ru,sv,de,en,es,fr,it,pt-BR,pt-PT,af,bg,ca,el,et,hr,hu,id,lv,no,ro,sk,sl,tr. For additional details see https://aka.ms/text-analytics/language-support?tabs=key-phrase-extraction"}}}],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '205',
  'apim-request-id',
  '8e49bd94-8507-4093-a59b-730e01a7c4c9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:38:37 GMT'
]);
