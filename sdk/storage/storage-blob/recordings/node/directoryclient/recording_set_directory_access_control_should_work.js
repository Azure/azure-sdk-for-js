let nock = require('nock');

module.exports.testInfo = {"container":"container156654452532402719","directory":"directory156654452648500601"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654452532402719')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 23 Aug 2019 07:11:28 GMT',
  'ETag',
  '"0x8D727991DEA72E7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5515594f-c01e-0019-2c81-591280000000',
  'x-ms-client-request-id',
  '3af48c7d-0b3e-49e5-b0a9-4421f40dd043',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 23 Aug 2019 07:11:28 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654452532402719/directory156654452648500601')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Fri, 23 Aug 2019 07:11:29 GMT',
  'ETag',
  '"0x8D727991E9B7F42"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b329af42-e01f-0043-7281-597467000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'afa07597-4ea4-4806-822e-ded8ccf5eab8',
  'Date',
  'Fri, 23 Aug 2019 07:11:28 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/container156654452532402719/directory156654452648500601')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Fri, 23 Aug 2019 07:11:29 GMT',
  'ETag',
  '"0x8D727991E9B7F42"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  'cd03bd9b-801f-0037-3281-594097000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'ac6eb366-0860-459b-86ff-053a67ac41c7',
  'Date',
  'Fri, 23 Aug 2019 07:11:30 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156654452532402719/directory156654452648500601')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Fri, 23 Aug 2019 07:11:29 GMT',
  'ETag',
  '"0x8D727991E9B7F42"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rwxr-x-w-',
  'x-ms-acl',
  'user::rwx,group::r-x,other::-w-',
  'x-ms-request-id',
  '2173904f-a01f-0020-2181-59e99c000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '68726152-a700-4d21-b3c4-7aa2efe5cb92',
  'Date',
  'Fri, 23 Aug 2019 07:11:31 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156654452532402719')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '951113b7-d01e-0015-5581-598588000000',
  'x-ms-client-request-id',
  'eebe1d17-8725-44a4-b094-fef54d642e73',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 23 Aug 2019 07:11:32 GMT',
  'Connection',
  'close' ]);

