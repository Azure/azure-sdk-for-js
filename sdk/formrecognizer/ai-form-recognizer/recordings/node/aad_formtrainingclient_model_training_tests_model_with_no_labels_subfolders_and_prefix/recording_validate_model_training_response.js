let nock = require('nock');

module.exports.hash = "8c1f0c6fb337da955d3b2a3f96436310";

module.exports.testInfo = {"uniqueName":{"3":"modelName160409658071908611"},"newDate":{}}

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
  '15ab786c-5734-4a43-b59e-e5b3ff7b1100',
  'x-ms-ests-server',
  '2.1.11198.13 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=ArhlfYEnA9ZOhIsCncPBcqf0CyfMAQAAAESJLtcOAAAA; expires=Sun, 29-Nov-2020 22:23:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 30 Oct 2020 22:23:00 GMT',
  'Content-Length',
  '1500'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":true},"useLabelFile":false,"modelName":"modelName160409658071908611"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/b1ab6327-934b-4027-92ab-9fb8ae4f5eab',
  'x-envoy-upstream-service-time',
  '57',
  'apim-request-id',
  'ff576b2e-7c60-4afa-9a3a-ff8c062b8a56',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:23:01 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/b1ab6327-934b-4027-92ab-9fb8ae4f5eab')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"b1ab6327-934b-4027-92ab-9fb8ae4f5eab","modelName":"modelName160409658071908611","status":"creating","createdDateTime":"2020-10-30T22:23:01Z","lastUpdatedDateTime":"2020-10-30T22:23:01Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '47676b3d-ba85-4943-89fc-df63778096ad',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:23:01 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/b1ab6327-934b-4027-92ab-9fb8ae4f5eab')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"b1ab6327-934b-4027-92ab-9fb8ae4f5eab","modelName":"modelName160409658071908611","status":"creating","createdDateTime":"2020-10-30T22:23:01Z","lastUpdatedDateTime":"2020-10-30T22:23:01Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  'b058e9ce-724e-4b5c-91b2-af80807bfe65',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:23:01 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/b1ab6327-934b-4027-92ab-9fb8ae4f5eab')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"b1ab6327-934b-4027-92ab-9fb8ae4f5eab","modelName":"modelName160409658071908611","status":"creating","createdDateTime":"2020-10-30T22:23:01Z","lastUpdatedDateTime":"2020-10-30T22:23:01Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '21',
  'apim-request-id',
  '16006218-1943-4ff2-a093-032fc7d6fbff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:23:06 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/b1ab6327-934b-4027-92ab-9fb8ae4f5eab')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"b1ab6327-934b-4027-92ab-9fb8ae4f5eab","modelName":"modelName160409658071908611","status":"creating","createdDateTime":"2020-10-30T22:23:01Z","lastUpdatedDateTime":"2020-10-30T22:23:01Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '23',
  'apim-request-id',
  '4eca74ce-cb49-4a77-b29a-7bce726974d4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:23:11 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/b1ab6327-934b-4027-92ab-9fb8ae4f5eab')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"b1ab6327-934b-4027-92ab-9fb8ae4f5eab","status":"ready","createdDateTime":"2020-10-30T22:23:01Z","lastUpdatedDateTime":"2020-10-30T22:23:16Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Ft Lauderdale, FL Phone:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"subfolder/Form_6.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '2c83ab5b-f6bf-421a-ae42-12ee2946fd78',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 30 Oct 2020 22:23:16 GMT'
]);
