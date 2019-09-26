let nock = require('nock');

module.exports.testInfo = {"share":"share156775326305308577","share156775326305308577":"share156775326305308577156775326345007792"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775326305308577')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:01:03 GMT',
  'ETag',
  '"0x8D73297FB446236"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f874f9e-701a-00b6-6980-6485f5000000',
  'x-ms-client-request-id',
  '36398933-2ceb-4265-aa0a-008b8d3a02a6',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:01:02 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775326305308577156775326345007792')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:01:03 GMT',
  'ETag',
  '"0x8D73297FB848A6D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fe6e7aab-a01a-009a-0d80-64695a000000',
  'x-ms-client-request-id',
  'c026317a-d6a2-4896-83b9-25c8a041d08f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:01:03 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156775326305308577156775326345007792')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:01:03 GMT',
  'ETag',
  '"0x8D73297FB848A6D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3aeb5f1d-a01a-007e-3780-6467c4000000',
  'x-ms-client-request-id',
  'e37092cf-2df6-4ec2-a6ac-f7d6e9509a46',
  'x-ms-version',
  '2019-02-02',
  'x-ms-meta-key',
  'value',
  'x-ms-has-immutability-policy',
  'false',
  'x-ms-has-legal-hold',
  'false',
  'x-ms-share-quota',
  '5120',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-meta-key,Last-Modified,ETag,x-ms-has-immutability-policy,x-ms-has-legal-hold,x-ms-share-quota,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 07:01:03 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156775326305308577')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '22ee8bf3-b01a-00b9-6380-64f399000000',
  'x-ms-client-request-id',
  '02a1b76e-d369-48ba-94f0-a5270a747bf6',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:01:04 GMT',
  'Connection',
  'close' ]);

