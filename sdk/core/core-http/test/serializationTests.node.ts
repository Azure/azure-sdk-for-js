// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import "chai/register-should";

import { TestClient } from "./data/TestClient/src/testClient";
import { Mappers } from "./data/TestClient/src/models/mappers";

describe("msrest (node)", function() {
  describe("deserialize", function() {
    it("should correctly deserialize without failing when encountering no discriminator", function(done) {
      const client = new TestClient("http://localhost:9090");
      const mapper = Mappers.Fish;
      const responseBody = {
        age: 22,
        birthday: new Date("2012-01-05T01:00:00Z").toISOString(),
        species: "king",
        length: 1.0,
        picture: Buffer.from([255, 255, 255, 255, 254]).toString(),
        siblings: [
          {
            "fish.type": "mutatedshark",
            age: 105,
            birthday: new Date("1900-01-05T01:00:00Z").toISOString(),
            length: 10.0,
            picture: Buffer.from([255, 255, 255, 255, 254]).toString(),
            species: "dangerous",
            siblings: [
              {
                "fish.type": "mutatedshark",
                age: 6,
                length: 20.0,
                species: "predator"
              }
            ]
          }
        ]
      };
      const deserializedSawshark = client.serializer.deserialize(
        mapper,
        responseBody,
        "responseBody"
      );
      deserializedSawshark.fishtype.should.equal("Fish");
      deserializedSawshark.siblings.length.should.equal(1);
      deserializedSawshark.siblings[0].fishtype.should.equal("mutatedshark");
      deserializedSawshark.siblings[0].species.should.equal("dangerous");
      deserializedSawshark.siblings[0].birthday.should.equal("1900-01-05T01:00:00.000Z");
      deserializedSawshark.siblings[0].age.should.equal(105);
      deserializedSawshark.siblings[0].siblings[0].fishtype.should.equal("mutatedshark");
      deserializedSawshark.siblings[0].siblings[0].species.should.equal("predator");
      deserializedSawshark.siblings[0].siblings[0].age.should.equal(6);
      done();
    });

    it("should correctly serialize without failing when encountering no discriminator", function(done) {
      const client = new TestClient("http://localhost:9090");
      const mapper = Mappers.SawShark;
      const sawshark = {
        age: 22,
        birthday: new Date("2012-01-05T01:00:00Z"),
        species: "king",
        length: 1.0,
        picture: Buffer.from([255, 255, 255, 255, 254]),
        siblings: [
          {
            fishtype: "shark",
            age: 6,
            birthday: new Date("2012-01-05T01:00:00Z"),
            length: 20.0,
            species: "predator"
          },
          {
            fishtype: "sawshark",
            age: 105,
            birthday: new Date("1900-01-05T01:00:00Z"),
            length: 10.0,
            picture: Buffer.from([255, 255, 255, 255, 254]),
            species: "dangerous"
          }
        ]
      };
      const serializedSawshark = client.serializer.serialize(mapper, sawshark, "result");
      serializedSawshark.age.should.equal(22);
      serializedSawshark["fish.type"].should.equal("sawshark");
      serializedSawshark.siblings.length.should.equal(2);
      serializedSawshark.siblings[0]["fish.type"].should.equal("shark");
      serializedSawshark.siblings[0].age.should.equal(6);
      serializedSawshark.siblings[0].birthday.should.equal(
        new Date("2012-01-05T01:00:00Z").toISOString()
      );
      serializedSawshark.siblings[1]["fish.type"].should.equal("sawshark");
      serializedSawshark.siblings[1].age.should.equal(105);
      serializedSawshark.siblings[1].birthday.should.equal(
        new Date("1900-01-05T01:00:00Z").toISOString()
      );
      serializedSawshark.siblings[1].picture.should.equal("//////4=");
      serializedSawshark.picture.should.equal("//////4=");
      done();
    });
  });
});
