let nock = require('nock');

module.exports.hash = "a42931894eb8a527d8258890f9680777";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem164864664596709139","file":"file164864664624508807","dir":"dir164864664624603583"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864664596709139')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:06 GMT',
  'ETag',
  '"0x8DA125090DDE15B"',
  'x-ms-request-id',
  '601eaef0-e01e-0001-3b39-441b65000000',
  'x-ms-client-request-id',
  'fddfe30d-a5ed-4d0e-806d-5ddd0b9a4416',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:05 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864664596709139/file164864664624508807')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:06 GMT',
  'ETag',
  '"0x8DA1250910C699E"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '2f12e4bf-a01f-0003-3d39-441608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '13596225-7c73-43f4-9490-93d0b6108ece',
  'Date',
  'Wed, 30 Mar 2022 13:24:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem164864664596709139/file164864664624508807')
  .reply(409, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '601eaef2-e01e-0001-3c39-441b65000000',
  'x-ms-client-request-id',
  'd6f48180-c61a-4633-a7e7-578de3a94507',
  'x-ms-version',
  '2021-04-10',
  'x-ms-error-code',
  'BlobDoesNotUseCustomerSpecifiedEncryption',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 30 Mar 2022 13:24:05 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem164864664596709139')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '601eaef3-e01e-0001-3d39-441b65000000',
  'x-ms-client-request-id',
  'effdfb47-d007-4dd0-b1bd-149b5e8a8e8e',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:07 GMT'
]);
