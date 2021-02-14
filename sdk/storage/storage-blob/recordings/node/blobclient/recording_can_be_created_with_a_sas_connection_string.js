let nock = require('nock');

module.exports.hash = "4443cc2766c15a99c076e39eb8bcf64a";

module.exports.testInfo = {"uniqueName":{"container":"container159210827379107805","blob":"blob159210827380705726"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827379107805')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:53 GMT',
  'ETag',
  '"0x8D81019E8BF36E2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c130906a-201e-003e-1902-42dadf000000',
  'x-ms-client-request-id',
  '8e330ca1-bdd8-434c-bb59-da23c960edc5',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:52 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827379107805/blob159210827380705726', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:53 GMT',
  'ETag',
  '"0x8D81019E8C1EC6F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309072-201e-003e-1f02-42dadf000000',
  'x-ms-client-request-id',
  'd491b0c1-e546-4967-bd72-2d534355db5f',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T04:17:53.8175087Z',
  'Date',
  'Sun, 14 Jun 2020 04:17:52 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827379107805/blob159210827380705726')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:53 GMT',
  'ETag',
  '"0x8D81019E8C4D325"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c130907a-201e-003e-2702-42dadf000000',
  'x-ms-client-request-id',
  '1787fef7-dae2-4f46-ba27-20cd426b6dfb',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-14T04:17:53.8385233Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Sun, 14 Jun 2020 04:17:52 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container159210827379107805/blob159210827380705726')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:53 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D81019E8C4D325"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309083-201e-003e-3002-42dadf000000',
  'x-ms-client-request-id',
  '46f29682-8ae8-4448-b3e2-5dd703af8f6b',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-14T04:17:53.8385233Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-meta-a',
  'a',
  'x-ms-meta-b',
  'b',
  'x-ms-creation-time',
  'Sun, 14 Jun 2020 04:17:53 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Date',
  'Sun, 14 Jun 2020 04:17:52 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159210827379107805')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309085-201e-003e-3202-42dadf000000',
  'x-ms-client-request-id',
  'ff70c094-0e61-4ccb-8492-f5956a74ad61',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:52 GMT'
]);
