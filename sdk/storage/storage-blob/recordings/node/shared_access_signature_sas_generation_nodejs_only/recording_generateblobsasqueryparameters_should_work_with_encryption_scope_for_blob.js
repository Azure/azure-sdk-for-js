let nock = require('nock');

module.exports.hash = "ff9a27fc6ae635fd2138a08c6f60f7f5";

module.exports.testInfo = {"uniqueName":{"container":"container163230260857906955","blob":"blob163230260885104890"},"newDate":{"now":"2021-09-22T09:23:28.579Z","tmr":"2021-09-22T09:23:28.579Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163230260857906955')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 22 Sep 2021 09:23:29 GMT',
  'ETag',
  '"0x8D97DAAA38B91F7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8e7a46cc-f01e-0052-7193-afa62a000000',
  'x-ms-client-request-id',
  '8e05df97-f157-428d-b3c5-e8afe3c190b5',
  'x-ms-version',
  '2020-12-06',
  'Date',
  'Wed, 22 Sep 2021 09:23:28 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163230260857906955/blob163230260885104890')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 22 Sep 2021 09:23:29 GMT',
  'ETag',
  '"0x8D97DAAA3B543B7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8e7a46f0-f01e-0052-0b93-afa62a000000',
  'x-ms-client-request-id',
  'aeadbbf7-88d5-4973-bfaf-4db3e8016b0a',
  'x-ms-version',
  '2020-12-06',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-scope',
  'antjoscope1',
  'x-ms-version-id',
  '2021-09-22T09:23:29.4113719Z',
  'Date',
  'Wed, 22 Sep 2021 09:23:29 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container163230260857906955/blob163230260885104890')
  .query(true)
  .reply(200, [], [
  'Cache-Control',
  'cache-control-override',
  'Content-Length',
  '1024',
  'Content-Type',
  'content-type-override',
  'Content-Encoding',
  'content-encoding-override',
  'Content-Language',
  'content-language-override',
  'Last-Modified',
  'Wed, 22 Sep 2021 09:23:29 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D97DAAA3B543B7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8e7a4707-f01e-0052-1d93-afa62a000000',
  'x-ms-client-request-id',
  'c35d0468-b784-4107-92d5-b307cc647932',
  'x-ms-version',
  '2020-12-06',
  'x-ms-version-id',
  '2021-09-22T09:23:29.4113719Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Wed, 22 Sep 2021 09:23:29 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'PageBlob',
  'x-ms-blob-sequence-number',
  '0',
  'Content-Disposition',
  'content-disposition-override',
  'x-ms-server-encrypted',
  'true',
  'x-ms-encryption-scope',
  'antjoscope1',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-sequence-number,Cache-Control,Content-Disposition,Content-Encoding,Content-Language,x-ms-server-encrypted,x-ms-encryption-scope,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 22 Sep 2021 09:23:29 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163230260857906955')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8e7a472b-f01e-0052-3d93-afa62a000000',
  'x-ms-client-request-id',
  '3036716a-840d-4375-8d01-10274352ca2c',
  'x-ms-version',
  '2020-12-06',
  'Date',
  'Wed, 22 Sep 2021 09:23:29 GMT'
]);
