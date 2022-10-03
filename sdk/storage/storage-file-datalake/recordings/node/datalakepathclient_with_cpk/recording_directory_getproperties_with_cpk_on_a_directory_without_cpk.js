let nock = require('nock');

module.exports.hash = "45ef9ca3298d057216dbd551d1ffe4e2";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem164864666139008622","file":"file164864666167006773","dir":"dir164864666167103376"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864666139008622')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:21 GMT',
  'ETag',
  '"0x8DA12509A0F3E29"',
  'x-ms-request-id',
  '601eaf2c-e01e-0001-5f39-441b65000000',
  'x-ms-client-request-id',
  'a0d40ed4-a7b9-49bd-878d-c4e98824fdcb',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:21 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864666139008622/dir164864666167103376')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:22 GMT',
  'ETag',
  '"0x8DA12509A3F09E3"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '2f12e4d8-a01f-0003-5439-441608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '9a9347e2-e3e1-4fde-be77-16b27f5374b0',
  'Date',
  'Wed, 30 Mar 2022 13:24:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem164864666139008622/dir164864666167103376')
  .reply(409, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '601eaf2e-e01e-0001-6039-441b65000000',
  'x-ms-client-request-id',
  '6c163c19-8ed2-476d-9023-f68cc73acc17',
  'x-ms-version',
  '2021-04-10',
  'x-ms-error-code',
  'BlobDoesNotUseCustomerSpecifiedEncryption',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 30 Mar 2022 13:24:22 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem164864666139008622')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '601eaf2f-e01e-0001-6139-441b65000000',
  'x-ms-client-request-id',
  '7f486f30-e8d8-43e5-b996-6c8223a8ec38',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:22 GMT'
]);
