let nock = require('nock');

module.exports.hash = "cf906e870ff3c40c0091416016a3efe0";

module.exports.testInfo = {"uniqueName":{"5":"modelName160591278237205301"},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
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
  '5eb89f49-87a9-4e87-ba41-18223e152500',
  'x-ms-ests-server',
  '2.1.11251.20 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Ah0wHdVXeW5Jif38dS_vnz8; expires=Sun, 20-Dec-2020 22:53:02 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 22:53:02 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.2/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":false},"useLabelFile":false,"modelName":"modelName160591278237205301"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.2/custom/models/ee77b711-af30-4e5b-9db4-4d90cd3e3362',
  'x-envoy-upstream-service-time',
  '82',
  'apim-request-id',
  '6f6b3932-41cf-41da-a0ce-3748cbd48b4a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:53:02 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/ee77b711-af30-4e5b-9db4-4d90cd3e3362')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"ee77b711-af30-4e5b-9db4-4d90cd3e3362","modelName":"modelName160591278237205301","status":"creating","createdDateTime":"2020-11-20T22:53:02Z","lastUpdatedDateTime":"2020-11-20T22:53:02Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  '3b66f060-75f8-471e-bf27-27160fc371d8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:53:02 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/ee77b711-af30-4e5b-9db4-4d90cd3e3362')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"ee77b711-af30-4e5b-9db4-4d90cd3e3362","modelName":"modelName160591278237205301","status":"creating","createdDateTime":"2020-11-20T22:53:02Z","lastUpdatedDateTime":"2020-11-20T22:53:02Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '22',
  'apim-request-id',
  'cefad7e3-65c1-4695-b3de-9ef9f8bcc182',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:53:02 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/ee77b711-af30-4e5b-9db4-4d90cd3e3362')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"ee77b711-af30-4e5b-9db4-4d90cd3e3362","modelName":"modelName160591278237205301","status":"creating","createdDateTime":"2020-11-20T22:53:02Z","lastUpdatedDateTime":"2020-11-20T22:53:02Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '148f285c-b672-4c97-b587-5c5663f4f3dd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:53:07 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/ee77b711-af30-4e5b-9db4-4d90cd3e3362')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"ee77b711-af30-4e5b-9db4-4d90cd3e3362","modelName":"modelName160591278237205301","status":"creating","createdDateTime":"2020-11-20T22:53:02Z","lastUpdatedDateTime":"2020-11-20T22:53:02Z"}}, [
  'Content-Length',
  '212',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '60f1dc45-6c38-4bd4-8404-64be6460a5e8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:53:12 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.2/custom/models/ee77b711-af30-4e5b-9db4-4d90cd3e3362')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"ee77b711-af30-4e5b-9db4-4d90cd3e3362","status":"ready","createdDateTime":"2020-11-20T22:53:02Z","lastUpdatedDateTime":"2020-11-20T22:53:14Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Ft Lauderdale, FL Phone:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Content-Length',
  '939',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '28',
  'apim-request-id',
  'ff196310-56ef-440a-82d6-10df99d19e1a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 22:53:18 GMT'
]);
