let nock = require('nock');

module.exports.testInfo = {"container":"container156776200214007352"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776200214007352')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:26:42 GMT',
  'ETag',
  '"0x8D732AC542E3518"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '579eb929-501e-00b1-3995-64e996000000',
  'x-ms-client-request-id',
  '4f86e2f3-d3f0-43d4-8fd7-910076bddfe8',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:26:41 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776200214007352')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:26:42 GMT',
  'ETag',
  '"0x8D732AC542E3518"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e856b96f-301e-012e-7795-645b99000000',
  'x-ms-client-request-id',
  '8962981f-f50d-42c2-bb87-71065849bfad',
  'x-ms-version',
  '2019-02-02',
  'x-ms-lease-id',
  'ca761232-ed42-11ce-bacd-00aa0057b223',
  'Date',
  'Fri, 06 Sep 2019 09:26:42 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156776200214007352')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:26:42 GMT',
  'ETag',
  '"0x8D732AC542E3518"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dbfbe537-e01e-009b-5595-643686000000',
  'x-ms-client-request-id',
  'd6c197bc-1cce-49a3-9438-3d114e0752a3',
  'x-ms-version',
  '2019-02-02',
  'x-ms-lease-status',
  'locked',
  'x-ms-lease-state',
  'leased',
  'x-ms-lease-duration',
  'fixed',
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
  'Fri, 06 Sep 2019 09:26:43 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776200214007352')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:26:42 GMT',
  'ETag',
  '"0x8D732AC542E3518"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '03f2c55a-c01e-00a3-3d95-649246000000',
  'x-ms-client-request-id',
  '63d05e98-177b-42ee-8012-583591a957f0',
  'x-ms-version',
  '2019-02-02',
  'x-ms-lease-id',
  '3c7e72eb-b430-4526-bc53-d8ecef03798f',
  'Date',
  'Fri, 06 Sep 2019 09:26:43 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156776200214007352')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:26:42 GMT',
  'ETag',
  '"0x8D732AC542E3518"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '46e8776c-601e-0133-2095-645625000000',
  'x-ms-client-request-id',
  'd020585d-d4cd-4a4f-85e2-ce4f9ccf68c0',
  'x-ms-version',
  '2019-02-02',
  'x-ms-lease-status',
  'locked',
  'x-ms-lease-state',
  'leased',
  'x-ms-lease-duration',
  'fixed',
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
  'Fri, 06 Sep 2019 09:26:43 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776200214007352')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:26:42 GMT',
  'ETag',
  '"0x8D732AC542E3518"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2ab51416-f01e-0143-7895-64efd2000000',
  'x-ms-client-request-id',
  'd3d6dce0-c1f7-4e3e-ad68-490e741ed525',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:26:44 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156776200214007352')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '891ea46c-501e-014a-6995-64aa01000000',
  'x-ms-client-request-id',
  'e716ffcf-9d2f-43e2-b877-7427ed129cb2',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:26:44 GMT',
  'Connection',
  'close' ]);

