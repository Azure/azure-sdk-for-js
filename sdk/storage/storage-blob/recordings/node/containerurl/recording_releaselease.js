let nock = require('nock');

module.exports.testInfo = {"container":"container156776198097701580"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776198097701580')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:26:21 GMT',
  'ETag',
  '"0x8D732AC4791208C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3cb9d3bb-901e-00ae-5b95-645a92000000',
  'x-ms-client-request-id',
  '164c1a5b-fac1-4821-9ba1-a53d62d4b5a8',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:26:20 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776198097701580')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:26:21 GMT',
  'ETag',
  '"0x8D732AC4791208C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dbfbc983-e01e-009b-3695-643686000000',
  'x-ms-client-request-id',
  'a25052d5-2538-4745-9d1b-e0bb18f92c93',
  'x-ms-version',
  '2019-02-02',
  'x-ms-lease-id',
  'ca761232-ed42-11ce-bacd-00aa0057b223',
  'Date',
  'Fri, 06 Sep 2019 09:26:20 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156776198097701580')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:26:21 GMT',
  'ETag',
  '"0x8D732AC4791208C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a8f6a461-301e-0098-1e95-64d7e2000000',
  'x-ms-client-request-id',
  'bd675237-58bb-435e-83d6-c3dda69f35fd',
  'x-ms-version',
  '2019-02-02',
  'x-ms-lease-status',
  'locked',
  'x-ms-lease-state',
  'leased',
  'x-ms-lease-duration',
  'infinite',
  'x-ms-has-immutability-policy',
  'false',
  'x-ms-has-legal-hold',
  'false',
  'x-ms-default-encryption-scope',
  '$account-encryption-key',
  'x-ms-deny-encryption-scope-override',
  'false',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-lease-status,x-ms-lease-state,x-ms-lease-duration,x-ms-has-immutability-policy,x-ms-has-legal-hold,x-ms-default-encryption-scope,x-ms-deny-encryption-scope-override,Content-Length,Date,Transfer-Encoding,content-md5,x-ms-content-crc64',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 09:26:21 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776198097701580')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:26:21 GMT',
  'ETag',
  '"0x8D732AC4791208C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bc54d1d0-201e-0012-1595-648c53000000',
  'x-ms-client-request-id',
  '02a10a91-e9df-4c90-9653-52340c2e3220',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:26:21 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156776198097701580')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4bc97958-001e-0147-7195-6462d5000000',
  'x-ms-client-request-id',
  '1bcea79e-ed9d-4acf-8b31-7553b9dcd6e9',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:26:22 GMT',
  'Connection',
  'close' ]);

