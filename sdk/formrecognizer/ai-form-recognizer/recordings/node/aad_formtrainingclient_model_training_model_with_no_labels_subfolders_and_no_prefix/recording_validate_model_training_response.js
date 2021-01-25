let nock = require('nock');

module.exports.hash = "8c1f0c6fb337da955d3b2a3f96436310";

module.exports.testInfo = {"uniqueName":{"4":"modelName160434046171008541"},"newDate":{}}

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
  'ebe34607-5efd-4eb2-9088-e38b1bbf9a00',
  'x-ms-ests-server',
  '2.1.11198.13 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AhSsHR8KznNIl69oR23Szyn0CyfMAQAAAO1BMtcOAAAA; expires=Wed, 02-Dec-2020 18:07:42 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 02 Nov 2020 18:07:41 GMT',
  'Content-Length',
  '1500'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.1-preview.1/custom/models', {"source":"https://storageaccount/trainingdata?sastoken","sourceFilter":{"includeSubFolders":true},"useLabelFile":false,"modelName":"modelName160434046171008541"})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/formrecognizer/v2.1-preview.1/custom/models/352faec2-1189-4e2f-8c90-33991667e644',
  'x-envoy-upstream-service-time',
  '58',
  'apim-request-id',
  '4a864938-1014-4e15-b309-150ce22bc070',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:07:41 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/352faec2-1189-4e2f-8c90-33991667e644')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"352faec2-1189-4e2f-8c90-33991667e644","modelName":"modelName160434046171008541","status":"creating","createdDateTime":"2020-11-02T18:07:42Z","lastUpdatedDateTime":"2020-11-02T18:07:42Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '2932ce7b-531e-46db-9e59-dd7e97db3228',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:07:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/352faec2-1189-4e2f-8c90-33991667e644')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"352faec2-1189-4e2f-8c90-33991667e644","modelName":"modelName160434046171008541","status":"creating","createdDateTime":"2020-11-02T18:07:42Z","lastUpdatedDateTime":"2020-11-02T18:07:42Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '9c0e5263-181d-47e0-93bf-8f37a94958e3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:07:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/352faec2-1189-4e2f-8c90-33991667e644')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"352faec2-1189-4e2f-8c90-33991667e644","modelName":"modelName160434046171008541","status":"creating","createdDateTime":"2020-11-02T18:07:42Z","lastUpdatedDateTime":"2020-11-02T18:07:42Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  'bc2e4ef6-e134-406a-b7f5-e70c07b93ac6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:07:46 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/352faec2-1189-4e2f-8c90-33991667e644')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"352faec2-1189-4e2f-8c90-33991667e644","modelName":"modelName160434046171008541","status":"creating","createdDateTime":"2020-11-02T18:07:42Z","lastUpdatedDateTime":"2020-11-02T18:07:42Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  'ab776765-634d-4d95-b12a-4aa1d451bd9e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:07:52 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/352faec2-1189-4e2f-8c90-33991667e644')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"352faec2-1189-4e2f-8c90-33991667e644","modelName":"modelName160434046171008541","status":"creating","createdDateTime":"2020-11-02T18:07:42Z","lastUpdatedDateTime":"2020-11-02T18:07:42Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  '0bca9fe4-253b-42db-8775-87fe914f3d85',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:07:57 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/352faec2-1189-4e2f-8c90-33991667e644')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"352faec2-1189-4e2f-8c90-33991667e644","modelName":"modelName160434046171008541","status":"creating","createdDateTime":"2020-11-02T18:07:42Z","lastUpdatedDateTime":"2020-11-02T18:07:42Z"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '013bc909-efb1-4c43-b113-a8543242dbea',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:08:02 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.1-preview.1/custom/models/352faec2-1189-4e2f-8c90-33991667e644')
  .query(true)
  .reply(200, {"modelInfo":{"modelId":"352faec2-1189-4e2f-8c90-33991667e644","status":"ready","createdDateTime":"2020-11-02T18:07:42Z","lastUpdatedDateTime":"2020-11-02T18:08:03Z"},"keys":{"clusters":{"0":["Additional Notes:","Address:","Company Name:","Company Phone:","Dated As:","Details","Email:","Ft Lauderdale, FL Phone:","Hero Limited","Name:","Phone:","Purchase Order","Purchase Order #:","Quantity","SUBTOTAL","Seattle, WA 93849 Phone:","Shipped From","Shipped To","TAX","TOTAL","Total","Unit Price","Vendor Name:","Website:"]}},"trainResult":{"trainingDocuments":[{"documentName":"Form_1.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_2.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_3.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_4.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"Form_5.jpg","pages":1,"errors":[],"status":"succeeded"},{"documentName":"subfolder/Form_6.jpg","pages":1,"errors":[],"status":"succeeded"}],"errors":[]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '65dbfcb6-e5ee-44db-ad03-52e93253de0e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 02 Nov 2020 18:08:08 GMT'
]);
