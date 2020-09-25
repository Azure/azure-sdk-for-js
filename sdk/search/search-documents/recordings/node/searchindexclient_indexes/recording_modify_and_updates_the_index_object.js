let nock = require('nock');

module.exports.hash = "ba452171e66f849d7e6b41a30e645638";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexes(%27hotel-live-test3%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f0f3edddd7b7272efe0c1c1f1c9c3dff7236ab5cc16397d3dafdabcdc2e8bcb7c1bdddea36f66f979b62edbd7d3aa2e96172febeabc28a9e9725d96a38fce8bbc9c351f3dfade2f36108a19bdd35eaff0fbe96c317edde235fa4cd0ce2678f93c2b9b1c6f976d5e071fd539b5cf2fe5b3b65ed3474d55b7f2b7b639cfa6341aff93b7f9b569cd04385e66e5f50ff2daa0297d773fcd3a7f37d7cb6a79bdf8225b6144dfff25233ba8ec2a6faa45becc9be6797e9997341c6f884fab35902100dc4d80993f444170e308e56f6f80f2018f4f21feac0c709637d3ba58b545b5a47178638b4e9f20e50f4d71db38366de30d4e3ff9218caecd8ab2a15178233ba916ab327ff7069f10563d462679f1de38a9ca329f823e5b7859c87287be17dc643c32629f2ef2c97b92455afc2c51c5a7cbbc98cdf2e577f3e262ded25074a818dfd9b2bdb7471f491f8296e2e20f4f3f0ac6a79f6d1aa07ef2b33542fa285056fcf1e823faacf992599c3ed057d71717a4e6f29a3e4113035aff6cabb7f9b2e8fcfd8cc7af9f106deae0837c39adafb993df0ba3d36e8a45516635f4f123abe895da3ffe4531adaba63a6fc7c73f58d7f9f8350f7afce48bbdfbafdd7b44ad5d036e22bffc925ff2ff004671270e35060000"], [ 'Cache-Control',
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
  'W/"0x8D8612BC3878AC9"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '4b1d6eca-ceea-4c5e-8e37-ed47962113c0',
  'elapsed-time',
  '27',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 25 Sep 2020 08:19:48 GMT',
  'Content-Length',
  '662' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/indexes(%27hotel-live-test3%27)', {"name":"hotel-live-test3","fields":[{"name":"id","type":"Edm.String","key":true,"retrievable":true,"searchable":false,"filterable":false,"sortable":false,"facetable":false,"searchAnalyzer":null,"indexAnalyzer":null,"synonymMaps":[]},{"name":"awesomenessLevel","type":"Edm.Double","key":false,"retrievable":true,"searchable":false,"filterable":true,"sortable":true,"facetable":true,"searchAnalyzer":null,"indexAnalyzer":null,"synonymMaps":[]},{"name":"description","type":"Edm.String","key":false,"retrievable":true,"searchable":true,"filterable":false,"sortable":false,"facetable":false,"searchAnalyzer":null,"indexAnalyzer":null,"synonymMaps":[]},{"name":"details","type":"Edm.ComplexType","fields":[{"name":"tags","type":"Collection(Edm.String)","key":false,"retrievable":true,"searchable":true,"filterable":true,"sortable":false,"facetable":true,"analyzer":null,"searchAnalyzer":null,"indexAnalyzer":null,"synonymMaps":[]}]},{"name":"hiddenWeight","type":"Edm.Int32","key":false,"retrievable":false,"searchable":false,"filterable":false,"sortable":false,"facetable":false,"searchAnalyzer":null,"indexAnalyzer":null,"synonymMaps":[]},{"name":"lastUpdatedOn","type":"Edm.DateTimeOffset","searchable":false,"filterable":true,"sortable":false,"facetable":false}],"scoringProfiles":[],"defaultScoringProfile":null,"corsOptions":null,"suggesters":[],"analyzers":[],"tokenizers":[],"tokenFilters":[],"charFilters":[],"encryptionKey":null,"similarity":{"@odata.type":"#Microsoft.Azure.Search.BM25Similarity","k1":null,"b":null},"@odata.etag":"\"0x8D8612BC3878AC9\""})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f0f3edddd7b72b27ffaf464fff8d3dff7236ab5cc16397d3dafdabcdc2e8bcb7c1bdddea36f66f979b62edbd7d3aa2e96172febeabc28a9e9725d96a38fce8bbc9c351f3dfade2f36108a19bdd35eaff0fbe96c317edde235fa4cd0ce2678f93c2b9b1c6f976d5e071fd539b5cf2fe5b3b65ed3474d55b7f2b7b639cfa6341aff93b7f9b569cd04385e66e5f50ff2daa0297d773fcd3a7f37d7cb6a79bdf8225b6144dfff25233ba8ec2a6faa45becc9be6797e9997341c6f884fab35902100dc4d80993f444170e308e56f6f80f2018f4f21feac0c709637d3ba58b545b5a47178638b4e9f20e50f4d71db38366de30d4e3ff9218caecd8ab2a15178233ba916ab327ff7069f10563d462679f1de38a9ca329f823e5b7859c87287be17dc643c32629f2ef2c97b92455afc2c51c5a7cbbc98cdf2e577f3e262ded25074a818dfd9b2bdb7471f491f8296e2e20f4f3f0ac6a79f6d1aa07ef2b3344237be326bdaaf56a4fef2d9971dbe7e4a1fbe2916f997e7e74d8ec14b5f017efe48654e8281ca473f77e3fc3e7d142865fe78f4117dd67cc9a24c1fe8abeb8b0b52e7794d9fa08901ad7fb6d5db7c5974fe7ec6a3d74f883275f041be9cd6d7dcc9ef85d16937c5a228b31a76e79135684af41fffa298d655539db7e3e31faceb7cfc9a073d7ef2c5defdd7ee3da2d6ae0137915f7ec92ff97f008880de9d1d070000"], [ 'Cache-Control',
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
  'W/"0x8D8612BC4EDC4A6"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'a57a031f-6c73-44ee-8b7c-2d92d5283d7c',
  'elapsed-time',
  '179',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 25 Sep 2020 08:19:48 GMT',
  'Content-Length',
  '706' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexes(%27hotel-live-test3%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f0f3edddd7b72b27ffaf464fff8d3dff7236ab5cc16397d3dafdabcdc2e8bcb7c1bdddea36f66f979b62edbd7d3aa2e96172febeabc28a9e9725d96a38fce8bbc9c351f3dfade2f36108a19bdd35eaff0fbe96c317edde235fa4cd0ce2678f93c2b9b1c6f976d5e071fd539b5cf2fe5b3b65ed3474d55b7f2b7b639cfa6341aff93b7f9b569cd04385e66e5f50ff2daa0297d773fcd3a7f37d7cb6a79bdf8225b6144dfff25233ba8ec2a6faa45becc9be6797e9997341c6f884fab35902100dc4d80993f444170e308e56f6f80f2018f4f21feac0c709637d3ba58b545b5a47178638b4e9f20e50f4d71db38366de30d4e3ff9218caecd8ab2a15178233ba916ab327ff7069f10563d462679f1de38a9ca329f823e5b7859c87287be17dc643c32629f2ef2c97b92455afc2c51c5a7cbbc98cdf2e577f3e262ded25074a818dfd9b2bdb7471f491f8296e2e20f4f3f0ac6a79f6d1aa07ef2b3344237be326bdaaf56a4fef2d9971dbe7e4a1fbe2916f997e7e74d8ec14b5f017efe48654e8281ca473f77e3fc3e7d142865fe78f4117dd67cc9a24c1fe8abeb8b0b52e7794d9fa08901ad7fb6d5db7c5974fe7ec6a3d74f883275f041be9cd6d7dcc9ef85d16937c5a228b31a76e79135684af41fffa298d655539db7e3e31faceb7cfc9a073d7ef2c5defdd7ee3da2d6ae0137915f7ec92ff97f008880de9d1d070000"], [ 'Cache-Control',
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
  'W/"0x8D8612BC4EDC4A6"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '9f0cc570-3772-40cb-821e-763d6b348124',
  'elapsed-time',
  '17',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 25 Sep 2020 08:19:48 GMT',
  'Content-Length',
  '706' ]);
