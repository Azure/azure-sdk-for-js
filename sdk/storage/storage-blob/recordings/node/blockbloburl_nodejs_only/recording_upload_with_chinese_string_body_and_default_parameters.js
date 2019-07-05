let nock = require('nock');

module.exports.testInfo = {"container":"container156231870231603461","blob":"blob156231870259406882","randomstring你好":"randomstring你好156231870259407078"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231870231603461')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:21:43 GMT',
  'ETag',
  '"0x8D7012A31CEE871"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '80cbdba4-e01e-00e1-5413-33d9e3000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:21:42 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231870231603461/blob156231870259406882', "randomstring你好156231870259407078")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'zj3EqkTuIAnqtUOaesYCfA==',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:21:43 GMT',
  'ETag',
  '"0x8D7012A31F90B0C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ec783886-201e-00b3-6b13-33c411000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:21:42 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156231870231603461/blob156231870259406882')
  .reply(200, "randomstring你好156231870259407078", [ 'Content-Length',
  '36',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'zj3EqkTuIAnqtUOaesYCfA==',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:21:43 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7012A31F90B0C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '708bd453-001e-00e0-6e13-33d81e000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Fri, 05 Jul 2019 09:21:43 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-tag-count,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 05 Jul 2019 09:21:43 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231870231603461')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '975462ee-401e-0046-2d13-33e000000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:21:43 GMT',
  'Connection',
  'close' ]);

