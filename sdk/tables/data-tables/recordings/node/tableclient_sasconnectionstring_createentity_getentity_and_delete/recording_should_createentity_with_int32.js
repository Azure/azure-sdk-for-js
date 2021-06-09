let nock = require('nock');

module.exports.hash = "73515af9958108f6acd31f0ae1ac34e6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://joheredistorage2.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/tableClientTestSASConnectionStringnode', {"PartitionKey":"P5_node","RowKey":"R5","testField":123,"testField@odata.type":"Edm.Int32"})
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'ETag',
  `W/"datetime'2021-06-09T01%3A17%3A10.2359258Z'"`,
  'Location',
  "https://joheredistorage2.table.core.windows.net/tableClientTestSASConnectionStringnode(PartitionKey='P5_node',RowKey='R5')",
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c0d7ffb-7002-00b5-14cd-5c8c40000000',
  'x-ms-client-request-id',
  '1e32b717-1dad-48cb-83bb-41baff3f96dd',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Preference-Applied',
  'return-no-content',
  'DataServiceId',
  "https://joheredistorage2.table.core.windows.net/tableClientTestSASConnectionStringnode(PartitionKey='P5_node',RowKey='R5')",
  'Date',
  'Wed, 09 Jun 2021 01:17:09 GMT'
]);

nock('https://joheredistorage2.table.core.windows.net:443', {"encodedQueryParams":true})
  .get(`/tableClientTestSASConnectionStringnode(PartitionKey='P5_node',RowKey='R5')`)
  .query(true)
  .reply(200, {"odata.metadata":"https://joheredistorage2.table.core.windows.net/$metadata#tableClientTestSASConnectionStringnode/@Element","odata.etag":"W/\"datetime'2021-06-09T01%3A17%3A10.2359258Z'\"","PartitionKey":"P5_node","RowKey":"R5","Timestamp":"2021-06-09T01:17:10.2359258Z","testField":123}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'ETag',
  `W/"datetime'2021-06-09T01%3A17%3A10.2359258Z'"`,
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c0d8015-7002-00b5-2dcd-5c8c40000000',
  'x-ms-client-request-id',
  '7fad9855-dd4c-4ed4-8269-8b1a7376f783',
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
  .delete(`/tableClientTestSASConnectionStringnode(PartitionKey='P5_node',RowKey='R5')`)
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c0d8024-7002-00b5-3ccd-5c8c40000000',
  'x-ms-client-request-id',
  'b24e06bf-67b2-484c-97e1-e44bde48f6f7',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 09 Jun 2021 01:17:10 GMT'
]);
