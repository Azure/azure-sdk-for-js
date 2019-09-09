let nock = require('nock');

module.exports.testInfo = {"queue":"queue156758135739409098"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156758135739409098x1')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'db136093-2003-002d-35f0-6244f0000000',
  'x-ms-client-request-id',
  'f3e3ea95-0b75-4c0c-bde4-3e2f4196e181',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:15:57 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156758135739409098x2')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1902dd1d-a003-00d7-05f0-62a6b6000000',
  'x-ms-client-request-id',
  '7c3c6feb-eca2-4dfd-b1db-6c4f5a8319e0',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:15:57 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.queue.core.windows.net/\"><Prefix>queue156758135739409098</Prefix><MaxResults>1</MaxResults><Queues><Queue><Name>queue156758135739409098x1</Name><Metadata><key>val</key></Metadata></Queue></Queues><NextMarker>/fakestorageaccount/queue156758135739409098x2</NextMarker></EnumerationResults>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '344159f0-e003-0112-34f0-62725e000000',
  'x-ms-client-request-id',
  'fe17a469-92d4-4ca1-b529-fd9a73b47259',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 04 Sep 2019 07:15:58 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.queue.core.windows.net/\"><Prefix>queue156758135739409098</Prefix><Marker>/fakestorageaccount/queue156758135739409098x2</Marker><MaxResults>1</MaxResults><Queues><Queue><Name>queue156758135739409098x2</Name><Metadata><key>val</key></Metadata></Queue></Queues><NextMarker /></EnumerationResults>", [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7e5298f1-d003-0126-3af0-624196000000',
  'x-ms-client-request-id',
  'dd883357-429f-4c43-a9a6-5a26e47793d2',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 04 Sep 2019 07:15:58 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156758135739409098x1')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7c51bdcc-8003-0079-19f0-620ba7000000',
  'x-ms-client-request-id',
  '178232e1-d8f6-4830-9e0a-27fbe4b62939',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:15:59 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156758135739409098x2')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6d003585-e003-012d-57f0-62bafd000000',
  'x-ms-client-request-id',
  '69910bd4-d4d1-4fd1-bb16-6e1b9a4634d2',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:15:59 GMT',
  'Connection',
  'close' ]);

