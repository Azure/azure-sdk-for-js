let nock = require('nock');

module.exports.testInfo = {"container":"container156929887353409241","directory":"directory156929887469704275"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929887353409241')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 24 Sep 2019 04:16:51 GMT',
  'ETag',
  '"0x8D740A606B03C2C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '370f00c7-101e-0093-7e8e-72d3d5000000',
  'x-ms-client-request-id',
  'dcd6c824-0f4d-4e2d-971a-27a0686625a1',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 24 Sep 2019 04:16:50 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156929887353409241/directory156929887469704275')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 24 Sep 2019 04:16:52 GMT',
  'ETag',
  '"0x8D740A6076105C1"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1e30a2f8-601f-0050-268e-725a96000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'bf3840ab-e0f3-423e-a247-d2309ba3908d',
  'Date',
  'Tue, 24 Sep 2019 04:16:52 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/container156929887353409241/directory156929887469704275')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 24 Sep 2019 04:16:52 GMT',
  'ETag',
  '"0x8D740A6076105C1"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  'ac8b1ab0-e01f-0086-718e-72114c000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '24fe8cbf-e66d-425f-8eec-ffc6b437ba0f',
  'Date',
  'Tue, 24 Sep 2019 04:16:53 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156929887353409241/directory156929887469704275')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 24 Sep 2019 04:16:52 GMT',
  'ETag',
  '"0x8D740A6076105C1"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  '---------',
  'x-ms-acl',
  'user::---,group::---,other::---',
  'x-ms-request-id',
  '40a7f666-401f-0080-2d8e-72e634000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '375c517e-58d2-4637-9765-d0ce6a87a05f',
  'Date',
  'Tue, 24 Sep 2019 04:16:54 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/container156929887353409241/directory156929887469704275')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 24 Sep 2019 04:16:52 GMT',
  'ETag',
  '"0x8D740A6076105C1"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  'bd894b0c-601f-005b-148e-7242e2000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '1e87c338-4d9d-40a8-8e6b-e8311b171f5e',
  'Date',
  'Tue, 24 Sep 2019 04:16:55 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156929887353409241/directory156929887469704275')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 24 Sep 2019 04:16:52 GMT',
  'ETag',
  '"0x8D740A6076105C1"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  '---------',
  'x-ms-acl',
  'user::---,group::---,other::---',
  'x-ms-request-id',
  '3019846e-701f-0088-758e-72fd47000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '667adc4e-1ece-45a1-86b4-4a0945a83c9d',
  'Date',
  'Tue, 24 Sep 2019 04:16:57 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156929887353409241')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0cda34fa-101e-00b1-518e-72bde3000000',
  'x-ms-client-request-id',
  '0eaafe4c-79d5-4365-9bd5-4315ea0bf30a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 24 Sep 2019 04:16:57 GMT' ]);
