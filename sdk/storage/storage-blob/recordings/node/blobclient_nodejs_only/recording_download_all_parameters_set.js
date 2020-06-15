let nock = require('nock');

module.exports.hash = "651b32d87b36e03ada801c00994f9de9";

module.exports.testInfo = {"uniqueName":{"container":"container159210827774406457","blob":"blob159210827775905754"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827774406457')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:57 GMT',
  'ETag',
  '"0x8D81019EB1C3293"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309743-201e-003e-0e02-42dadf000000',
  'x-ms-client-request-id',
  '6ffbdbc1-bed7-4571-a428-067613f5341d',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827774406457/blob159210827775905754', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:57 GMT',
  'ETag',
  '"0x8D81019EB1F3572"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c130974b-201e-003e-1502-42dadf000000',
  'x-ms-client-request-id',
  'ef1ae411-cc95-4388-b79a-dc596350e285',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T04:17:57.7843058Z',
  'Date',
  'Sun, 14 Jun 2020 04:17:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container159210827774406457/blob159210827775905754')
  .reply(206, "H", [
  'Content-Length',
  '1',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'wdn1D4aCWhojAuwkScFxlg==',
  'Content-Range',
  'bytes 0-0/11',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:57 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D81019EB1F3572"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1309759-201e-003e-2302-42dadf000000',
  'x-ms-client-request-id',
  '1a889a7b-f482-413f-9b01-eace07ee831b',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-14T04:17:57.7843058Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Sun, 14 Jun 2020 04:17:57 GMT',
  'x-ms-blob-content-md5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Date',
  'Sun, 14 Jun 2020 04:17:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159210827774406457')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c130975e-201e-003e-2802-42dadf000000',
  'x-ms-client-request-id',
  '8449edfd-cdae-45ca-ad9a-77bce4abb05b',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:56 GMT'
]);
