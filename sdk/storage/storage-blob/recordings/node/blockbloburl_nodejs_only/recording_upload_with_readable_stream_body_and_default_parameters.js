let nock = require('nock');

module.exports.testInfo = {"container":"container156231870118204037","blob":"blob156231870145603742","randomstring":"randomstring156231870145708382"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231870118204037')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:21:42 GMT',
  'ETag',
  '"0x8D7012A31217222"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7a48ad0a-a01e-002a-4313-334bd3000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:21:41 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156231870118204037/blob156231870145603742', "randomstring156231870145708382")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'WwjvedVw1cqrNnT1z/crqA==',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:21:42 GMT',
  'ETag',
  '"0x8D7012A314B93E6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '131ca38e-001e-0123-6513-331708000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 05 Jul 2019 09:21:41 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156231870118204037/blob156231870145603742')
  .reply(200, "randomstring156231870145708382", [ 'Content-Length',
  '30',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'WwjvedVw1cqrNnT1z/crqA==',
  'Last-Modified',
  'Fri, 05 Jul 2019 09:21:42 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7012A314B93E6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '17dc0ffd-d01e-00a6-0b13-330688000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Fri, 05 Jul 2019 09:21:42 GMT',
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
  'Fri, 05 Jul 2019 09:21:42 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156231870118204037')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '776d123d-101e-00f4-5a13-331b7a000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 05 Jul 2019 09:21:42 GMT',
  'Connection',
  'close' ]);

