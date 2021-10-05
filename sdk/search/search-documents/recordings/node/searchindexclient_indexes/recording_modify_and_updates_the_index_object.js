let nock = require('nock');

module.exports.hash = "b245b95d080a6176fe78be0672431373";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get(`/indexes('hotel-live-test3')`)
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f1f1eeceddfdf79f0e4e4f8e474eff7fd885a2db3454e5fcfab362fb7cbe232df46b7f7e89b597e9eadcbf6f5b4aa8be5c5cbba3a2f4a6aba5c97e5e8a3f3222f67cd478fbef78b0d846246efb4d72bfc7e3a5b8c5fb7788d3e13b4b3095e3ecfca26c7db659bd7c147754eedf34bf9acadd7f45153d5adfcad6dceb3298dc6ffe46d7e6d5a33018e975979fd83bc36684adfdd4fb3cedfcbaa5e6465e17dd25c2fabe5f5e28b6c85317eff978cec30b3abbca916f9326f9ae7f9655ed200bd413fadd6408f0070c701aefea005e58d6396bfbd21cb073c6285f8431af22c6fa675b16a8b6a4923f3461b9d6241d31fac62bb71b4dac61bae7ef27332de362bca86c6e58df5a45aaccafcdd1b7c4278f6d89fa4cc7be3a42acb7c0a8a6de16521d41dfa5eb095110a0dfebf47299f56f36236cb97dfcd8b8b794bc3d3e163cc67cbf6de1e7d24bd0698de3464fdecff5563a68f0245c81f8f3ea2cf9a2f5934e8037d757d71412a34afe91334319de99fae2ffda0addee6cbeedfcf9844fa0991af0e3ec897d3fa9a7bfdbd4000edb75814655643f93fb2564527e4c7bf28a675d554e7edf8f807eb3a1fbf66ba8c9f7cb177ffb57b8f08ba6bc04de4975ff24bfe1f4f09184ea2060000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D9824507BCACE2"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '07cb87a1-546e-4b18-b360-5038e1dc4ffb',
  'elapsed-time',
  '20',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 28 Sep 2021 05:58:48 GMT',
  'Content-Length',
  '655'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put(`/indexes('hotel-live-test3')`, {"name":"hotel-live-test3","fields":[{"name":"id","type":"Edm.String","key":true,"retrievable":true,"searchable":false,"filterable":false,"sortable":false,"facetable":false,"analyzer":null,"searchAnalyzer":null,"indexAnalyzer":null,"normalizer":null,"synonymMaps":[]},{"name":"awesomenessLevel","type":"Edm.Double","key":false,"retrievable":true,"searchable":false,"filterable":true,"sortable":true,"facetable":true,"analyzer":null,"searchAnalyzer":null,"indexAnalyzer":null,"normalizer":null,"synonymMaps":[]},{"name":"description","type":"Edm.String","key":false,"retrievable":true,"searchable":true,"filterable":false,"sortable":false,"facetable":false,"analyzer":null,"searchAnalyzer":null,"indexAnalyzer":null,"normalizer":null,"synonymMaps":[]},{"name":"details","type":"Edm.ComplexType","fields":[{"name":"tags","type":"Collection(Edm.String)","key":false,"retrievable":true,"searchable":true,"filterable":false,"sortable":false,"facetable":false,"analyzer":null,"searchAnalyzer":null,"indexAnalyzer":null,"normalizer":null,"synonymMaps":[]}]},{"name":"hiddenWeight","type":"Edm.Int32","key":false,"retrievable":false,"searchable":false,"filterable":false,"sortable":false,"facetable":false,"analyzer":null,"searchAnalyzer":null,"indexAnalyzer":null,"normalizer":null,"synonymMaps":[]},{"name":"lastUpdatedOn","type":"Edm.DateTimeOffset","searchable":false,"filterable":true,"sortable":false,"facetable":false}],"scoringProfiles":[],"defaultScoringProfile":null,"corsOptions":null,"suggesters":[],"analyzers":[],"tokenizers":[],"tokenFilters":[],"charFilters":[],"normalizers":[],"encryptionKey":null,"similarity":{"@odata.type":"#Microsoft.Azure.Search.BM25Similarity","k1":null,"b":null},"@odata.etag":"\"0x8D9824507BCACE2\""})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f1f1eeceddfdf39dedf39fdf464f7f7fd885a2db3454e5fcfab362fb7cbe232df46b7f7e89b597e9eadcbf6f5b4aa8be5c5cbba3a2f4a6aba5c97e5e8a3f3222f67cd478fbef78b0d846246efb4d72bfc7e3a5b8c5fb7788d3e13b4b3095e3ecfca26c7db659bd7c147754eedf34bf9acadd7f45153d5adfcad6dceb3298dc6ffe46d7e6d5a33018e975979fd83bc36684adfdd4fb3cedfcbaa5e6465e17dd25c2fabe5f5e28b6c85317eff978cec30b3abbca916f9326f9ae7f9655ed200bd413fadd6408f0070c701aefea005e58d6396bfbd21cb073c6285f8431af22c6fa675b16a8b6a4923f3461b9d6241d31fac62bb71b4dac61bae7ef27332de362bca86c6e58df5a45aaccafcdd1b7c4278f6d89fa4cc7be3a42acb7c0a8a6de16521d41dfa5eb095110a0dfebf47299f56f36236cb97dfcd8b8b794bc3d3e163cc67cbf6de1e7d24bd0698de3464fdecff4d6376232eb3a6fd6a45aa359f7dd99187a7f4e19b62917f797edee42087f41e60ec8f5da63618ba7cf4ffa6917f9f3e0a4c007f3cfa883e6bbe64a5401fe8abeb8b0b321e794d9fa089e94cff747de9076df5365f76ff7ec604d24f887875f041be9cd6d7dcebef050268bfc5a228b31a66ef91b5a73a2f3ffe4531adaba63a6fc7c73f58d7f9f835d365fce48bbdfbafdd7b44d05d036e22bffc925ff2ff008b18e0329c070000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D982450A40E6C1"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '39cda959-ae87-4b43-b6a1-1161f798f32f',
  'elapsed-time',
  '134',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 28 Sep 2021 05:58:48 GMT',
  'Content-Length',
  '700'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get(`/indexes('hotel-live-test3')`)
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f1f1eeceddfdf39dedf39fdf464f7f7fd885a2db3454e5fcfab362fb7cbe232df46b7f7e89b597e9eadcbf6f5b4aa8be5c5cbba3a2f4a6aba5c97e5e8a3f3222f67cd478fbef78b0d846246efb4d72bfc7e3a5b8c5fb7788d3e13b4b3095e3ecfca26c7db659bd7c147754eedf34bf9acadd7f45153d5adfcad6dceb3298dc6ffe46d7e6d5a33018e975979fd83bc36684adfdd4fb3cedfcbaa5e6465e17dd25c2fabe5f5e28b6c85317eff978cec30b3abbca916f9326f9ae7f9655ed200bd413fadd6408f0070c701aefea005e58d6396bfbd21cb073c6285f8431af22c6fa675b16a8b6a4923f3461b9d6241d31fac62bb71b4dac61bae7ef27332de362bca86c6e58df5a45aaccafcdd1b7c4278f6d89fa4cc7be3a42acb7c0a8a6de16521d41dfa5eb095110a0dfebf47299f56f36236cb97dfcd8b8b794bc3d3e163cc67cbf6de1e7d24bd0698de3464fdecff4d6376232eb3a6fd6a45aa359f7dd99187a7f4e19b62917f797edee42087f41e60ec8f5da63618ba7cf4ffa6917f9f3e0a4c007f3cfa883e6bbe64a5401fe8abeb8b0b321e794d9fa089e94cff747de9076df5365f76ff7ec604d24f887875f041be9cd6d7dcebef050268bfc5a228b31a66ef91b5a73a2f3ffe4531adaba63a6fc7c73f58d7f9f835d365fce48bbdfbafdd7b44d05d036e22bffc925ff2ff008b18e0329c070000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D982450A40E6C1"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '2fc277ea-5ceb-4cdc-b04f-6168082c691c',
  'elapsed-time',
  '18',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 28 Sep 2021 05:58:48 GMT',
  'Content-Length',
  '700'
]);
