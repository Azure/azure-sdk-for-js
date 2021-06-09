let nock = require('nock');

module.exports.hash = "a66a20d62f23f75ef5943d4f183e331b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://joheredistorage2.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/tableClientTestSASConnectionStringnode', {"PartitionKey":"P3_node","RowKey":"R3","testField":"cf8ef051-1b7d-4e93-a1e5-a3944d7e441c","testField@odata.type":"Edm.Guid"})
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'ETag',
  `W/"datetime'2021-06-09T01%3A17%3A10.0337818Z'"`,
  'Location',
  "https://joheredistorage2.table.core.windows.net/tableClientTestSASConnectionStringnode(PartitionKey='P3_node',RowKey='R3')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c0d7f97-7002-00b5-36cd-5c8c40000000',
  'x-ms-client-request-id',
  'd720aecf-cac2-4f96-bdc8-813278f6888d',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Preference-Applied',
  'return-no-content',
  'DataServiceId',
  "https://joheredistorage2.table.core.windows.net/tableClientTestSASConnectionStringnode(PartitionKey='P3_node',RowKey='R3')",
  'Date',
  'Wed, 09 Jun 2021 01:17:09 GMT'
]);

nock('https://joheredistorage2.table.core.windows.net:443', {"encodedQueryParams":true})
  .get(`/tableClientTestSASConnectionStringnode(PartitionKey='P3_node',RowKey='R3')`)
  .query(true)
  .reply(200, {"odata.metadata":"https://joheredistorage2.table.core.windows.net/$metadata#tableClientTestSASConnectionStringnode/@Element","odata.etag":"W/\"datetime'2021-06-09T01%3A17%3A10.0337818Z'\"","PartitionKey":"P3_node","RowKey":"R3","Timestamp":"2021-06-09T01:17:10.0337818Z","testField@odata.type":"Edm.Guid","testField":"cf8ef051-1b7d-4e93-a1e5-a3944d7e441c"}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'ETag',
  `W/"datetime'2021-06-09T01%3A17%3A10.0337818Z'"`,
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c0d7fa5-7002-00b5-43cd-5c8c40000000',
  'x-ms-client-request-id',
  'fec7e115-537a-4dfc-b3e5-1f9c94729c95',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,X-Content-Type-Options,Cache-Control,ETag,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Jun 2021 01:17:09 GMT'
]);

nock('https://joheredistorage2.table.core.windows.net:443', {"encodedQueryParams":true})
  .delete(`/tableClientTestSASConnectionStringnode(PartitionKey='P3_node',RowKey='R3')`)
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c0d7fb3-7002-00b5-50cd-5c8c40000000',
  'x-ms-client-request-id',
  '27038935-b290-4059-b937-ec05428aafee',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 09 Jun 2021 01:17:09 GMT'
]);
