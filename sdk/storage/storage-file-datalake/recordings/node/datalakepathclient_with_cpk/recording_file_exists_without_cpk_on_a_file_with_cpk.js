let nock = require('nock');

module.exports.hash = "664533feb9753b673a5112924f95843f";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem164864664710907256","file":"file164864664738709661","dir":"dir164864664738804566"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864664710907256')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:07 GMT',
  'ETag',
  '"0x8DA1250918C25CE"',
  'x-ms-request-id',
  '601eaef6-e01e-0001-3e39-441b65000000',
  'x-ms-client-request-id',
  'fcb9e686-465a-4f53-90d9-b56a50d40939',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:07 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864664710907256/file164864664738709661')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:07 GMT',
  'ETag',
  '"0x8DA125091B920DE"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'x-ms-request-id',
  '2f12e4c0-a01f-0003-3e39-441608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '9171c269-e59f-48a3-bb2b-bab813eab372',
  'Date',
  'Wed, 30 Mar 2022 13:24:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem164864664710907256/file164864664738709661')
  .reply(409, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '601eaef8-e01e-0001-3f39-441b65000000',
  'x-ms-client-request-id',
  '4bcda5c8-cf66-45b5-b330-50990b77192a',
  'x-ms-version',
  '2021-04-10',
  'x-ms-error-code',
  'BlobUsesCustomerSpecifiedEncryption',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 30 Mar 2022 13:24:07 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem164864664710907256')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '601eaef9-e01e-0001-4039-441b65000000',
  'x-ms-client-request-id',
  'a8344d88-80a1-4708-91fb-68d98e1adc7b',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:08 GMT'
]);
