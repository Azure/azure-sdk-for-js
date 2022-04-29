let nock = require('nock');

module.exports.hash = "6c57a89605c7f994ecd4924f62c9c039";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem164864664259404394","file":"file164864664287302035","dir":"dir164864664287409060"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864664259404394')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:02 GMT',
  'ETag',
  '"0x8DA12508EDB0419"',
  'x-ms-request-id',
  '601eaee4-e01e-0001-3239-441b65000000',
  'x-ms-client-request-id',
  '8b1bbdd9-cbe9-4d8e-abdc-00625cb0ec0a',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:02 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864664259404394/file164864664287302035')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:03 GMT',
  'ETag',
  '"0x8DA12508F08F18F"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'x-ms-request-id',
  '2f12e4bc-a01f-0003-3a39-441608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'ae16add9-4624-4882-b923-71f1cd73f78f',
  'Date',
  'Wed, 30 Mar 2022 13:24:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem164864664259404394/file164864664287302035')
  .reply(409, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '601eaee6-e01e-0001-3339-441b65000000',
  'x-ms-client-request-id',
  'acabc548-acf4-4076-8340-1bff2978ce2b',
  'x-ms-version',
  '2021-04-10',
  'x-ms-error-code',
  'BlobUsesCustomerSpecifiedEncryption',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 30 Mar 2022 13:24:02 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem164864664259404394')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '601eaee7-e01e-0001-3439-441b65000000',
  'x-ms-client-request-id',
  'e6e63e59-a020-4e34-bf87-ed9d50050db7',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:03 GMT'
]);
