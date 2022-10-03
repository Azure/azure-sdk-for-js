let nock = require('nock');

module.exports.hash = "423145825336e9a27dac3dd9260fd885";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem164864664485708225","file":"file164864664513509481","dir":"dir164864664513500976"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864664485708225')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:05 GMT',
  'ETag',
  '"0x8DA125090345803"',
  'x-ms-request-id',
  '601eaeec-e01e-0001-3839-441b65000000',
  'x-ms-client-request-id',
  '064dacc8-fe46-4df6-93bc-c2e935bda0ee',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:04 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164864664485708225/file164864664513509481')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:05 GMT',
  'ETag',
  '"0x8DA12509061306A"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'x-ms-request-id',
  '2f12e4be-a01f-0003-3c39-441608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '1aac9b97-0a3c-40dd-ae21-b352a7647e22',
  'Date',
  'Wed, 30 Mar 2022 13:24:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem164864664485708225/file164864664513509481')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 30 Mar 2022 13:24:05 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA12509061306A"',
  'x-ms-request-id',
  '601eaeee-e01e-0001-3939-441b65000000',
  'x-ms-client-request-id',
  '48f1062c-7104-4b44-aad3-5c8b080cad16',
  'x-ms-version',
  '2021-04-10',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Wed, 30 Mar 2022 13:24:05 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'x-ms-access-tier',
  'Cool',
  'x-ms-access-tier-inferred',
  'true',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rw-r-----',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-encryption-key-sha256,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 30 Mar 2022 13:24:04 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem164864664485708225')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '601eaeef-e01e-0001-3a39-441b65000000',
  'x-ms-client-request-id',
  '2e5498f1-9b6c-4fe0-b586-31fbf84d423f',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 13:24:05 GMT'
]);
