let nock = require('nock');

module.exports.hash = "a66a20d62f23f75ef5943d4f183e331b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/tableClientTestSASConnectionStringnode', {"PartitionKey":"P3_node","RowKey":"R3","testField":"cf8ef051-1b7d-4e93-a1e5-a3944d7e441c","testField@odata.type":"Edm.Guid"})
  .query(true)
  .reply(204, "", [ 'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'ETag',
  'W/"datetime\'2021-06-04T21%3A59%3A51.2018387Z\'"',
  'Location',
  'https://fakestorageaccount.table.core.windows.net/tableClientTestSASConnectionStringnode(PartitionKey=\'P3_node\',RowKey=\'R3\')',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e9d0c2f-c002-0024-148c-5918f1000000',
  'x-ms-client-request-id',
  '96c9e57f-4cf7-4dad-96be-8137e6094eb8',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Preference-Applied',
  'return-no-content',
  'DataServiceId',
  'https://fakestorageaccount.table.core.windows.net/tableClientTestSASConnectionStringnode(PartitionKey=\'P3_node\',RowKey=\'R3\')',
  'Date',
  'Fri, 04 Jun 2021 21:59:50 GMT' ]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .get(`/tableClientTestSASConnectionStringnode(PartitionKey='P3_node',RowKey='R3')`)
  .query(true)
  .reply(200, {"odata.metadata":"https://fakestorageaccount.table.core.windows.net/$metadata#tableClientTestSASConnectionStringnode/@Element","odata.etag":"W/\"datetime'2021-06-04T21%3A59%3A51.2018387Z'\"","PartitionKey":"P3_node","RowKey":"R3","Timestamp":"2021-06-04T21:59:51.2018387Z","testField@odata.type":"Edm.Guid","testField":"cf8ef051-1b7d-4e93-a1e5-a3944d7e441c"}, [ 'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'ETag',
  'W/"datetime\'2021-06-04T21%3A59%3A51.2018387Z\'"',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e9d0c36-c002-0024-1b8c-5918f1000000',
  'x-ms-client-request-id',
  '1b06a4cc-d02c-4d33-97c1-208adc9b29bf',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,ETag,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 04 Jun 2021 21:59:50 GMT' ]);

nock('https://fakestorageaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .delete(`/tableClientTestSASConnectionStringnode(PartitionKey='P3_node',RowKey='R3')`)
  .query(true)
  .reply(204, "", [ 'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e9d0c3a-c002-0024-1f8c-5918f1000000',
  'x-ms-client-request-id',
  '97aa0bc9-d258-4020-901e-58510cb063ab',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 04 Jun 2021 21:59:50 GMT' ]);
