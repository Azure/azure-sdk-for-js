let nock = require('nock');

module.exports.hash = "a2cbb8e32223d6d95907bdb18e6a85b0";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem164864666587902204","file":"file164864666615700202","dir":"dir164864666615801863"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864666587902204')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:26 GMT',
  'ETag',
  '"0x8DA12509CBC4100"',
  'x-ms-request-id',
  '601eaf3d-e01e-0001-6c39-441b65000000',
  'x-ms-client-request-id',
  'dce0ecee-d738-4ae2-be8f-75d69cd36780',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:25 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864666587902204/dir164864666615801863')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:26 GMT',
  'ETag',
  '"0x8DA12509CE837C7"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'x-ms-request-id',
  '2f12e4dc-a01f-0003-5839-441608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '5593beec-6e22-4461-87c7-798cc213a85b',
  'Date',
  'Wed, 30 Mar 2022 13:24:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem164864666587902204/dir164864666615801863')
  .reply(409, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '601eaf3f-e01e-0001-6d39-441b65000000',
  'x-ms-client-request-id',
  '270c067b-ff2d-45fd-9478-9dcd29dce3ae',
  'x-ms-version',
  '2021-04-10',
  'x-ms-error-code',
  'BlobUsesCustomerSpecifiedEncryption',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 30 Mar 2022 13:24:26 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem164864666587902204')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '601eaf40-e01e-0001-6e39-441b65000000',
  'x-ms-client-request-id',
  'f00fcecc-d013-43a0-b212-fa610a7f47a0',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:26 GMT'
]);
