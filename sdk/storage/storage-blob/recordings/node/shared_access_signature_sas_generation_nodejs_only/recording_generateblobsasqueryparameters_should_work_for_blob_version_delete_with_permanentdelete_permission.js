let nock = require('nock');

module.exports.hash = "4e394bac87cb8f88e55846569e83a714";

module.exports.testInfo = {"uniqueName":{"container":"container163230261247504386","blob":"blob163230261274801352"},"newDate":{"now":"2021-09-22T09:23:33.299Z","tmr":"2021-09-22T09:23:33.299Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163230261247504386')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 22 Sep 2021 09:23:33 GMT',
  'ETag',
  '"0x8D97DAAA5DE2B62"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8e7a4986-f01e-0052-2993-afa62a000000',
  'x-ms-client-request-id',
  'f839145a-053c-45d0-ab90-d5937a4f006b',
  'x-ms-version',
  '2020-12-06',
  'Date',
  'Wed, 22 Sep 2021 09:23:32 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163230261247504386/blob163230261274801352', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 22 Sep 2021 09:23:33 GMT',
  'ETag',
  '"0x8D97DAAA608A109"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8e7a49c6-f01e-0052-5f93-afa62a000000',
  'x-ms-client-request-id',
  '2dffe484-f99e-406d-a6e8-7517f7f09b06',
  'x-ms-version',
  '2020-12-06',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2021-09-22T09:23:33.3131529Z',
  'Date',
  'Wed, 22 Sep 2021 09:23:33 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163230261247504386/blob163230261274801352')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Wed, 22 Sep 2021 09:23:33 GMT',
  'ETag',
  '"0x8D97DAAA6321BFF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8e7a49e1-f01e-0052-7493-afa62a000000',
  'x-ms-client-request-id',
  'a78537ff-9929-4e93-beba-9366071f898d',
  'x-ms-version',
  '2020-12-06',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2021-09-22T09:23:33.5859983Z',
  'Date',
  'Wed, 22 Sep 2021 09:23:33 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163230261247504386/blob163230261274801352')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8e7a49f1-f01e-0052-0393-afa62a000000',
  'x-ms-client-request-id',
  'e91be2fe-c8e8-42a5-956b-e5a7a31f86f9',
  'x-ms-version',
  '2020-12-06',
  'x-ms-delete-type-permanent',
  'true',
  'Date',
  'Wed, 22 Sep 2021 09:23:33 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container163230261247504386/blob163230261274801352')
  .query(true)
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8e7a4a1c-f01e-0052-2493-afa62a000000',
  'x-ms-client-request-id',
  '97b476d7-0ded-4fe9-b11c-ed27d43db341',
  'x-ms-version',
  '2020-12-06',
  'x-ms-error-code',
  'BlobNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 22 Sep 2021 09:23:33 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163230261247504386')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8e7a4a2f-f01e-0052-3093-afa62a000000',
  'x-ms-client-request-id',
  'e02558c1-743b-4d50-98e9-74ca9e8dec10',
  'x-ms-version',
  '2020-12-06',
  'Date',
  'Wed, 22 Sep 2021 09:23:34 GMT'
]);
