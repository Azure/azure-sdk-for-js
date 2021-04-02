let nock = require('nock');

module.exports.hash = "0b380ec49ea2252e1bfbaa30e93be775";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
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
  'f2c8a410-7cda-49b8-b272-a05c17ea2700',
  'x-ms-ests-server',
  '2.1.11251.20 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Apu4p-cd_B9ErYZeGwLDeSLGLH8mAQAAAAtAStcOAAAA; expires=Sun, 20-Dec-2020 22:54:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 22:54:04 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models')
  .query(true)
  .reply(200, {"modelList":[{"modelId":"0027bdb8-e62c-4583-907f-cdcd1e51d994","status":"creating","createdDateTime":"2020-11-20T22:41:44Z","lastUpdatedDateTime":"2020-11-20T22:41:44Z"},{"modelId":"005d969b-5b98-41b7-9891-37fa156d555e","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-11-20T22:53:40Z","lastUpdatedDateTime":"2020-11-20T22:53:41Z"},{"modelId":"01288035-2e0b-4e2a-8880-ad4aaba62f68","modelName":"modelDisplayName","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-11-20T22:42:17Z","lastUpdatedDateTime":"2020-11-20T22:42:19Z"},{"modelId":"02069b9b-9739-4e67-a6ea-9c0422a37cb0","status":"ready","createdDateTime":"2020-11-19T17:36:28Z","lastUpdatedDateTime":"2020-11-19T17:36:40Z"},{"modelId":"0394ccfe-60a3-4be2-bcad-2cd10b92f63e","status":"ready","createdDateTime":"2020-11-20T21:04:23Z","lastUpdatedDateTime":"2020-11-20T21:04:38Z"},{"modelId":"04c59350-4aed-4d48-bda7-86d50823e961","status":"ready","createdDateTime":"2020-11-20T21:04:36Z","lastUpdatedDateTime":"2020-11-20T21:04:48Z"},{"modelId":"05d2ab2b-eafc-4c94-9a2b-3725e32fc8b6","modelName":"input2","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-11-20T22:48:30Z","lastUpdatedDateTime":"2020-11-20T22:48:31Z"},{"modelId":"07809340-33cb-4b2f-a155-48980a95b0a9","status":"ready","createdDateTime":"2020-11-20T22:53:30Z","lastUpdatedDateTime":"2020-11-20T22:53:42Z"},{"modelId":"07a5a7f9-3972-4f5c-a8a0-158ca051902c","status":"ready","createdDateTime":"2020-11-20T22:41:28Z","lastUpdatedDateTime":"2020-11-20T22:41:39Z"},{"modelId":"07d558f1-be0c-4af3-95e6-a715f68f57b4","status":"ready","createdDateTime":"2020-11-20T22:22:52Z","lastUpdatedDateTime":"2020-11-20T22:23:05Z"},{"modelId":"09cbab22-755d-4b63-96a8-c4550447b73c","status":"ready","createdDateTime":"2020-11-20T22:22:20Z","lastUpdatedDateTime":"2020-11-20T22:22:33Z"},{"modelId":"09d65ded-18c8-4ce6-b3d0-a1a87919f199","modelName":"modelName160591270918502696","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-11-20T22:51:49Z","lastUpdatedDateTime":"2020-11-20T22:51:51Z"},{"modelId":"0a0c7de7-84e7-4fa9-a518-b2cfd5c42979","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-11-20T22:41:49Z","lastUpdatedDateTime":"2020-11-20T22:41:51Z"},{"modelId":"0ab36174-40a3-4a74-93aa-8e40e157c710","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-11-20T17:22:23Z","lastUpdatedDateTime":"2020-11-20T17:22:24Z"},{"modelId":"0ac2c290-5804-426d-98e9-078310e1d7f8","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-11-20T00:47:51Z","lastUpdatedDateTime":"2020-11-20T00:47:53Z"},{"modelId":"1555b17f-fd60-490a-9783-fb00505bf238","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-11-20T00:47:32Z","lastUpdatedDateTime":"2020-11-20T00:47:33Z"},{"modelId":"158e3f49-68c8-496f-b392-dba71196fb94","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-11-20T17:23:06Z","lastUpdatedDateTime":"2020-11-20T17:23:07Z"},{"modelId":"168c6f8c-d214-4b83-9698-515a49c347ac","status":"ready","createdDateTime":"2020-11-20T00:55:01Z","lastUpdatedDateTime":"2020-11-20T00:55:13Z"},{"modelId":"1ae42e79-21a3-44fd-a38d-81f8c34c84a7","modelName":"input1","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-11-20T22:47:55Z","lastUpdatedDateTime":"2020-11-20T22:47:58Z"},{"modelId":"1b745c7b-eb9a-4035-8eaf-2070b471bedd","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-11-20T17:21:57Z","lastUpdatedDateTime":"2020-11-20T17:21:59Z"},{"modelId":"1c6981b1-a37d-4c46-88b1-889c9cd93c51","status":"ready","createdDateTime":"2020-11-20T17:22:41Z","lastUpdatedDateTime":"2020-11-20T17:22:53Z"},{"modelId":"1cb78705-6f9b-4004-aaa9-5677b4863e28","status":"ready","createdDateTime":"2020-11-20T17:22:35Z","lastUpdatedDateTime":"2020-11-20T17:22:47Z"},{"modelId":"1d049bf9-4580-42bb-88b2-9e20734cc4f5","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-11-20T21:04:40Z","lastUpdatedDateTime":"2020-11-20T21:04:42Z"},{"modelId":"1e5f05ff-5738-4094-aaa4-2d265b984557","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-11-20T22:40:58Z","lastUpdatedDateTime":"2020-11-20T22:41:01Z"},{"modelId":"1e9a4171-7ea5-4a7d-8f6a-ecf9a42bc4e3","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-11-20T00:54:32Z","lastUpdatedDateTime":"2020-11-20T00:54:35Z"},{"modelId":"1f17e30a-9729-4f1a-abdf-45aec7b2c9d0","modelName":"customFormModelName160590900397107176","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-11-20T21:50:04Z","lastUpdatedDateTime":"2020-11-20T21:50:06Z"}],"nextLink":"https://endpoint/formrecognizer/v2.1-preview.2/custom/models?nextLink=2!204!MDAwMTA4IXN1YnNjcmlwdGlvbnMvNGE5OTc1MTJhYjI3NGEzMWE5NDBjZTZiNTAyYTczYTYvbW9kZWxzLzFmMTdlMzBhLTk3MjktNGYxYS1hYmRmLTQ1YWVjN2IyYzlkMC91c2VMYWJlbEZpbGUuanNvbiEwMDAwMjghOTk5OS0xMi0zMVQyMzo1OTo1OS45OTk5OTk5WiE-"}, [
  'Content-Length',
  '5033',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '562',
  'apim-request-id',
  '07a2626b-6590-4324-b13b-daa34a455a4c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:54:05 GMT'
]);
