let nock = require('nock');

module.exports.hash = "cd38c4c6eb5d8af4f0f3e496da5ffdf1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/analyze', {"analysisInput":{"documents":[{"id":"0","text":"This should fail because we're passing in an invalid language hint","language":"notalanguage"}]},"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/analyze/jobs/33bbdb89-f8bc-416c-9615-c90873b610e9',
  'x-envoy-upstream-service-time',
  '221',
  'apim-request-id',
  '53661851-8612-4146-9f38-cc99a7598913',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:54:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/33bbdb89-f8bc-416c-9615-c90873b610e9')
  .query(true)
  .reply(200, {"jobId":"33bbdb89-f8bc-416c-9615-c90873b610e9","lastUpdateDateTime":"2021-06-25T19:54:35Z","createdDateTime":"2021-06-25T19:54:34Z","expirationDateTime":"2021-06-26T19:54:34Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '484f9c9e-1cf4-4611-b848-a534fd1a61e6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:54:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/33bbdb89-f8bc-416c-9615-c90873b610e9')
  .query(true)
  .reply(200, {"jobId":"33bbdb89-f8bc-416c-9615-c90873b610e9","lastUpdateDateTime":"2021-06-25T19:54:35Z","createdDateTime":"2021-06-25T19:54:34Z","expirationDateTime":"2021-06-26T19:54:34Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'c898bd57-abbd-4280-a3bc-b81f982f6947',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:54:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/33bbdb89-f8bc-416c-9615-c90873b610e9')
  .query(true)
  .reply(200, {"jobId":"33bbdb89-f8bc-416c-9615-c90873b610e9","lastUpdateDateTime":"2021-06-25T19:54:35Z","createdDateTime":"2021-06-25T19:54:34Z","expirationDateTime":"2021-06-26T19:54:34Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '86b94501-51ba-4b50-abf4-a027c5dec250',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:54:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/33bbdb89-f8bc-416c-9615-c90873b610e9')
  .query(true)
  .reply(200, {"jobId":"33bbdb89-f8bc-416c-9615-c90873b610e9","lastUpdateDateTime":"2021-06-25T19:54:35Z","createdDateTime":"2021-06-25T19:54:34Z","expirationDateTime":"2021-06-26T19:54:34Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'a7efd33c-ad67-4582-9381-50b5c30aebad',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:54:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/33bbdb89-f8bc-416c-9615-c90873b610e9')
  .query(true)
  .reply(200, {"jobId":"33bbdb89-f8bc-416c-9615-c90873b610e9","lastUpdateDateTime":"2021-06-25T19:54:35Z","createdDateTime":"2021-06-25T19:54:34Z","expirationDateTime":"2021-06-26T19:54:34Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'ff99b519-0708-4ca9-a269-412681e90454',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:54:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/33bbdb89-f8bc-416c-9615-c90873b610e9')
  .query(true)
  .reply(200, {"jobId":"33bbdb89-f8bc-416c-9615-c90873b610e9","lastUpdateDateTime":"2021-06-25T19:54:41Z","createdDateTime":"2021-06-25T19:54:34Z","expirationDateTime":"2021-06-26T19:54:34Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:54:41.7544541Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en,es,de,fr,zh-Hans,ar,cs,da,fi,hu,it,ja,ko,no,nl,pl,pt-BR,pt-PT,ru,sv,tr. For additional details see https://aka.ms/text-analytics/language-support?tabs=named-entity-recognition"}}}],"modelVersion":"2021-06-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:54:41.6537417Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: ja,ko,zh-Hans,da,fi,nl,pl,ru,sv,de,en,es,fr,it,pt-BR,pt-PT,af,bg,ca,el,et,hr,hu,id,lv,no,ro,sk,sl,tr. For additional details see https://aka.ms/text-analytics/language-support?tabs=key-phrase-extraction"}}}],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '81',
  'apim-request-id',
  '1f6a945c-876b-4a81-8226-8d7f66dd0e0a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:54:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/33bbdb89-f8bc-416c-9615-c90873b610e9')
  .query(true)
  .reply(200, {"jobId":"33bbdb89-f8bc-416c-9615-c90873b610e9","lastUpdateDateTime":"2021-06-25T19:54:41Z","createdDateTime":"2021-06-25T19:54:34Z","expirationDateTime":"2021-06-26T19:54:34Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:54:41.7544541Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en,es,de,fr,zh-Hans,ar,cs,da,fi,hu,it,ja,ko,no,nl,pl,pt-BR,pt-PT,ru,sv,tr. For additional details see https://aka.ms/text-analytics/language-support?tabs=named-entity-recognition"}}}],"modelVersion":"2021-06-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:54:41.6537417Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: ja,ko,zh-Hans,da,fi,nl,pl,ru,sv,de,en,es,fr,it,pt-BR,pt-PT,af,bg,ca,el,et,hr,hu,id,lv,no,ro,sk,sl,tr. For additional details see https://aka.ms/text-analytics/language-support?tabs=key-phrase-extraction"}}}],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '221',
  'apim-request-id',
  'f88ff13f-a597-4d97-9a59-138399927e87',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:54:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/33bbdb89-f8bc-416c-9615-c90873b610e9')
  .query(true)
  .reply(200, {"jobId":"33bbdb89-f8bc-416c-9615-c90873b610e9","lastUpdateDateTime":"2021-06-25T19:54:41Z","createdDateTime":"2021-06-25T19:54:34Z","expirationDateTime":"2021-06-26T19:54:34Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:54:41.7544541Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en,es,de,fr,zh-Hans,ar,cs,da,fi,hu,it,ja,ko,no,nl,pl,pt-BR,pt-PT,ru,sv,tr. For additional details see https://aka.ms/text-analytics/language-support?tabs=named-entity-recognition"}}}],"modelVersion":"2021-06-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:54:41.6537417Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: ja,ko,zh-Hans,da,fi,nl,pl,ru,sv,de,en,es,fr,it,pt-BR,pt-PT,af,bg,ca,el,et,hr,hu,id,lv,no,ro,sk,sl,tr. For additional details see https://aka.ms/text-analytics/language-support?tabs=key-phrase-extraction"}}}],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '92',
  'apim-request-id',
  'cff1fdef-f21e-456b-89cb-9526b7d720b7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:54:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/33bbdb89-f8bc-416c-9615-c90873b610e9')
  .query(true)
  .reply(200, {"jobId":"33bbdb89-f8bc-416c-9615-c90873b610e9","lastUpdateDateTime":"2021-06-25T19:54:49Z","createdDateTime":"2021-06-25T19:54:34Z","expirationDateTime":"2021-06-26T19:54:34Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:54:41.7544541Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en,es,de,fr,zh-Hans,ar,cs,da,fi,hu,it,ja,ko,no,nl,pl,pt-BR,pt-PT,ru,sv,tr. For additional details see https://aka.ms/text-analytics/language-support?tabs=named-entity-recognition"}}}],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:54:49.3379301Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: ja,ko,zh-Hans,de,en,es,fr,it,pt-BR,pt-PT. For additional details see https://aka.ms/text-analytics/language-support?tabs=named-entity-recognition"}}}],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:54:41.6537417Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: ja,ko,zh-Hans,da,fi,nl,pl,ru,sv,de,en,es,fr,it,pt-BR,pt-PT,af,bg,ca,el,et,hr,hu,id,lv,no,ro,sk,sl,tr. For additional details see https://aka.ms/text-analytics/language-support?tabs=key-phrase-extraction"}}}],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '181',
  'apim-request-id',
  '6e2bee33-b861-4b19-9eb4-873d4f64ae98',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:54:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/33bbdb89-f8bc-416c-9615-c90873b610e9')
  .query(true)
  .reply(200, {"jobId":"33bbdb89-f8bc-416c-9615-c90873b610e9","lastUpdateDateTime":"2021-06-25T19:54:49Z","createdDateTime":"2021-06-25T19:54:34Z","expirationDateTime":"2021-06-26T19:54:34Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:54:41.7544541Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en,es,de,fr,zh-Hans,ar,cs,da,fi,hu,it,ja,ko,no,nl,pl,pt-BR,pt-PT,ru,sv,tr. For additional details see https://aka.ms/text-analytics/language-support?tabs=named-entity-recognition"}}}],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:54:49.3379301Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: ja,ko,zh-Hans,de,en,es,fr,it,pt-BR,pt-PT. For additional details see https://aka.ms/text-analytics/language-support?tabs=named-entity-recognition"}}}],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:54:41.6537417Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: ja,ko,zh-Hans,da,fi,nl,pl,ru,sv,de,en,es,fr,it,pt-BR,pt-PT,af,bg,ca,el,et,hr,hu,id,lv,no,ro,sk,sl,tr. For additional details see https://aka.ms/text-analytics/language-support?tabs=key-phrase-extraction"}}}],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '112',
  'apim-request-id',
  '305bc187-b0e3-484b-8827-225b61cf4b82',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:54:50 GMT'
]);
