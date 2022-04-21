let nock = require('nock');

module.exports.hash = "d5d1cc2dbd2517466f8bed205524092b";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem164864664371501511","file":"file164864664399900466","dir":"dir164864664400005610"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864664371501511')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:04 GMT',
  'ETag',
  '"0x8DA12508F879A75"',
  'x-ms-request-id',
  '601eaee8-e01e-0001-3539-441b65000000',
  'x-ms-client-request-id',
  'ace95eaa-beac-4591-98ad-41cef91d4aca',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:03 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864664371501511/file164864664399900466')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:04 GMT',
  'ETag',
  '"0x8DA12508FB70818"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '2f12e4bd-a01f-0003-3b39-441608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '454acd1d-084c-472c-87f9-f13db8aeae78',
  'Date',
  'Wed, 30 Mar 2022 13:24:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem164864664371501511/file164864664399900466')
  .reply(409, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '601eaeea-e01e-0001-3639-441b65000000',
  'x-ms-client-request-id',
  'ef2ab9a3-d139-4026-9b3e-2cb3d3e58385',
  'x-ms-version',
  '2021-04-10',
  'x-ms-error-code',
  'BlobDoesNotUseCustomerSpecifiedEncryption',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 30 Mar 2022 13:24:03 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem164864664371501511')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '601eaeeb-e01e-0001-3739-441b65000000',
  'x-ms-client-request-id',
  'e0d3648e-787b-438b-bcdc-f0f99f864fba',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:04 GMT'
]);
