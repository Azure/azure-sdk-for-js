let nock = require('nock');

module.exports.hash = "0b380ec49ea2252e1bfbaa30e93be775";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
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
  'cdc540ce-2282-434d-9600-ef50bfa30f00',
  'x-ms-ests-server',
  '2.1.11198.13 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Aky1TakCdjREqDsmmk-zKnf0CyfMAQAAAK2LLtcOAAAA; expires=Sun, 29-Nov-2020 22:33:17 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 30 Oct 2020 22:33:17 GMT',
  'Content-Length',
  '1500'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models')
  .query(true)
  .reply(200, {"modelList":[{"modelId":"024ac278-f0ca-4d20-94b3-2c21b78ddaeb","modelName":"modelName160409150354403307","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-10-30T20:58:24Z","lastUpdatedDateTime":"2020-10-30T20:58:26Z"},{"modelId":"04cbb804-a2c2-42a1-ac96-fab5c3676de6","modelName":"modelName160409704202407761","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-10-30T22:30:42Z","lastUpdatedDateTime":"2020-10-30T22:30:44Z"},{"modelId":"09a2c5b1-84b2-4ca1-b3ae-b176768e38d8","modelName":"copyModelName160409671913709414","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-10-30T22:25:19Z","lastUpdatedDateTime":"2020-10-30T22:25:21Z"},{"modelId":"0f03a13b-2fdd-4a48-9b9d-52849b15f2e4","modelName":"copyModelName160409083179803592","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-10-30T20:47:12Z","lastUpdatedDateTime":"2020-10-30T20:47:15Z"},{"modelId":"149d1e85-abf6-424e-8413-8eef509a02c8","modelName":"modelName160409111907201817","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-10-30T20:51:59Z","lastUpdatedDateTime":"2020-10-30T20:52:02Z"},{"modelId":"168d3fa1-1d35-44af-a932-4271ae1b5921","modelName":"copyModelName160409101383208799","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-10-30T20:50:14Z","lastUpdatedDateTime":"2020-10-30T20:50:15Z"},{"modelId":"199a2805-6bda-472f-bf0b-fac040bcc3bc","status":"ready","createdDateTime":"2020-10-30T21:01:24Z","lastUpdatedDateTime":"2020-10-30T21:01:41Z"},{"modelId":"19e4335e-bbf6-4a9c-9dda-643c2dd06b41","modelName":"copyModelName160409086557405988","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-10-30T20:47:46Z","lastUpdatedDateTime":"2020-10-30T20:47:48Z"},{"modelId":"1dc06117-811a-4f2d-992a-5e0313064de7","modelName":"copyModelName160408969674208348","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-10-30T20:28:17Z","lastUpdatedDateTime":"2020-10-30T20:28:19Z"},{"modelId":"1f874276-43b7-46ed-9fa2-1cbe37069599","modelName":"copyModelName160409097632102762","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-10-30T20:49:37Z","lastUpdatedDateTime":"2020-10-30T20:49:39Z"},{"modelId":"20bc9ad7-939f-4c8f-9143-44f1b034dbdd","modelName":"copyModelName160409101383208799","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-10-30T20:50:14Z","lastUpdatedDateTime":"2020-10-30T20:50:15Z"},{"modelId":"22c4f8d3-2fbc-4161-83dd-c4c07549829e","modelName":"copyModelName160408812211709531","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-10-30T20:02:02Z","lastUpdatedDateTime":"2020-10-30T20:02:05Z"},{"modelId":"2ad29bde-d86e-44fa-b6f2-ed8ace16cf06","modelName":"copyModelName160408926540607775","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-10-30T20:21:05Z","lastUpdatedDateTime":"2020-10-30T20:21:07Z"},{"modelId":"3440db6d-3409-43e6-bbfb-fa29bfa8b04b","modelName":"copyModelName160408913054003007","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-10-30T20:18:51Z","lastUpdatedDateTime":"2020-10-30T20:18:53Z"},{"modelId":"3ad6a6fc-27e8-4498-8932-7a5ae648ce4b","modelName":"copyModelName160408950628707182","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-10-30T20:25:07Z","lastUpdatedDateTime":"2020-10-30T20:25:09Z"},{"modelId":"3ffa2ece-d73d-47a8-b6e4-9a0d66a5a2e2","modelName":"copyModelName160408970901001440","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-10-30T20:28:29Z","lastUpdatedDateTime":"2020-10-30T20:28:31Z"},{"modelId":"4bda61a6-227a-4844-8a80-5afd8270bca2","status":"ready","createdDateTime":"2020-10-30T21:00:56Z","lastUpdatedDateTime":"2020-10-30T21:01:09Z"},{"modelId":"5149f019-f639-4d64-92c5-2925259ec94b","status":"ready","createdDateTime":"2020-10-30T21:04:51Z","lastUpdatedDateTime":"2020-10-30T21:05:06Z"},{"modelId":"54100123-8111-44bb-92bb-1c19e73e8886","modelName":"copyModelName160408823813003859","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-10-30T20:03:58Z","lastUpdatedDateTime":"2020-10-30T20:04:00Z"},{"modelId":"54663f62-5ab4-41ca-bff0-02113606c761","modelName":"copyModelName160409086557405988","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-10-30T20:47:46Z","lastUpdatedDateTime":"2020-10-30T20:47:48Z"},{"modelId":"55bf6148-3e0a-41a1-87f9-79a47cd89224","modelName":"copyModelName160409230180303916","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-10-30T21:11:42Z","lastUpdatedDateTime":"2020-10-30T21:11:44Z"},{"modelId":"6127a119-badf-409c-a7e5-9e426805d1dd","modelName":"copyModelName160409083179803592","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-10-30T20:47:12Z","lastUpdatedDateTime":"2020-10-30T20:47:15Z"},{"modelId":"637342e6-0031-421f-a7b7-585fb5b72e92","modelName":"copyModelName160409230180303916","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-10-30T21:11:42Z","lastUpdatedDateTime":"2020-10-30T21:11:44Z"},{"modelId":"709cc424-7fb3-4e92-aec9-62c9f5ce27a8","modelName":"copyModelName160409701196703558","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-10-30T22:30:12Z","lastUpdatedDateTime":"2020-10-30T22:30:14Z"},{"modelId":"73b78fb8-a238-40c8-9de3-f730c94c133d","modelName":"modelName160409148916608128","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-10-30T20:58:10Z","lastUpdatedDateTime":"2020-10-30T20:58:12Z"},{"modelId":"7b797b25-588e-4858-881f-2951c9d6b5d0","modelName":"copyModelName160408950628707182","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-10-30T20:25:07Z","lastUpdatedDateTime":"2020-10-30T20:25:09Z"},{"modelId":"7df3e1a2-8233-428a-aeba-a6796ee5ad6f","modelName":"copyModelName160408952460309249","attributes":{"isComposed":false},"status":"ready","createdDateTime":"2020-10-30T20:25:24Z","lastUpdatedDateTime":"2020-10-30T20:25:26Z"},{"modelId":"830e1f5e-6763-457c-b016-ba1e7c0e4a6a","status":"ready","createdDateTime":"2020-10-30T21:04:07Z","lastUpdatedDateTime":"2020-10-30T21:04:22Z"}],"nextLink":"https://endpoint:443/formrecognizer/v2.1-preview.1/custom/models?nextLink=2!204!MDAwMTA4IXN1YnNjcmlwdGlvbnMvZWUyMWUzMjc5ODU4NDlmNmI4YWM1YTZhMjBhMzBkZTIvbW9kZWxzLzgzMGUxZjVlLTY3NjMtNDU3Yy1iMDE2LWJhMWU3YzBlNGE2YS91c2VMYWJlbEZpbGUuanNvbiEwMDAwMjghOTk5OS0xMi0zMVQyMzo1OTo1OS45OTk5OTk5WiE-"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '252',
  'apim-request-id',
  '2f46a161-15f6-4e24-ae0c-4eee29129b0e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:33:17 GMT'
]);
