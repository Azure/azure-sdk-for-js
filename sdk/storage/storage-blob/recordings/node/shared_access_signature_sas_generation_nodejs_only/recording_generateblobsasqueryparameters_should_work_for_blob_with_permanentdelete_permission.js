let nock = require('nock');

module.exports.hash = "83efe9d1b46a362ee26ee122f0434e3d";

module.exports.testInfo = {"uniqueName":{"container":"container163230260732807345","blob":"blob163230260760200552"},"newDate":{"now":"2021-09-22T09:23:27.328Z","tmr":"2021-09-22T09:23:27.328Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163230260732807345')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 22 Sep 2021 09:23:27 GMT',
  'ETag',
  '"0x8D97DAAA2CCF1D3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8e7a4589-f01e-0052-5593-afa62a000000',
  'x-ms-client-request-id',
  '9d853ceb-a6f1-4e68-bab5-6544812effb2',
  'x-ms-version',
  '2020-12-06',
  'Date',
  'Wed, 22 Sep 2021 09:23:27 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163230260732807345/blob163230260760200552')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 22 Sep 2021 09:23:28 GMT',
  'ETag',
  '"0x8D97DAAA2F67C4B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8e7a45e6-f01e-0052-2593-afa62a000000',
  'x-ms-client-request-id',
  'c6ea768e-e053-4235-972e-5e00454d4c04',
  'x-ms-version',
  '2020-12-06',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2021-09-22T09:23:28.1610827Z',
  'Date',
  'Wed, 22 Sep 2021 09:23:27 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163230260732807345/blob163230260760200552')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8e7a4620-f01e-0052-5a93-afa62a000000',
  'x-ms-client-request-id',
  'c87ae3bb-7915-4e11-9a90-b33a7bd40cc8',
  'x-ms-version',
  '2020-12-06',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Wed, 22 Sep 2021 09:23:28 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163230260732807345')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8e7a468e-f01e-0052-3793-afa62a000000',
  'x-ms-client-request-id',
  '49ccdba4-e077-4582-a006-8dde626215fd',
  'x-ms-version',
  '2020-12-06',
  'Date',
  'Wed, 22 Sep 2021 09:23:28 GMT'
]);
