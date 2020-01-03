let nock = require('nock');

module.exports.testInfo = {"queue":"queue157120298759201536"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue157120298759201536')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f52f157a-f003-0068-74e0-8338ad000000',
  'x-ms-client-request-id',
  '6e42f940-584a-4629-a18d-272e77bad19a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 16 Oct 2019 05:16:27 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue157120298759201536')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1a6f3221-a003-0059-40e0-83637a000000',
  'x-ms-client-request-id',
  '1b8aeb34-56be-4dba-9cec-a0382386b696',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 16 Oct 2019 05:16:28 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue157120298759201536')
  .query(true)
  .reply(200, "", [ 'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4b190980-0003-0010-14e0-83501a000000',
  'x-ms-client-request-id',
  'ccca71d9-915d-4687-a391-9acce33aa341',
  'x-ms-version',
  '2019-02-02',
  'x-ms-approximate-messages-count',
  '0',
  'x-ms-meta-key0',
  'val0',
  'x-ms-meta-keya',
  'vala',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-approximate-messages-count,Cache-Control,x-ms-meta-key0,x-ms-meta-keya,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 16 Oct 2019 05:16:27 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue157120298759201536')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '89b4015f-5003-0065-03e0-83d7a1000000',
  'x-ms-client-request-id',
  '08a6c594-771b-4e94-8ed6-839b7461e9e0',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 16 Oct 2019 05:16:28 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue157120298759201536')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>QueueNotFound</Code><Message>The specified queue does not exist.\nRequestId:2f3ca484-b003-002b-7be0-831244000000\nTime:2019-10-16T05:16:29.5328512Z</Message></Error>", [ 'Content-Length',
  '217',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2f3ca484-b003-002b-7be0-831244000000',
  'x-ms-client-request-id',
  '134b6c93-0cee-42b9-861d-b8c2a4130e7c',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'QueueNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 16 Oct 2019 05:16:29 GMT',
  'Connection',
  'close' ]);

