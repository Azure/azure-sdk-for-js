import { Serializer } from "ms-rest-js";
import { CloudErrorMapper, CloudError } from "../lib/cloudError";
import { expect } from "chai";


describe("CloudError", () => {
    const serializer = new Serializer({"CloudError": CloudErrorMapper});

    describe("serialization", () => {
        it("serializes properly required properties", () => {
            const cloudError: CloudError = {
                name: "my error",
                code: "401",
                message: "test message"
            };

            const serializedCloudError = serializer.serialize(CloudErrorMapper, cloudError);

            expect(serializedCloudError.name).to.not.exist;
            expect(serializedCloudError.code).to.be.equal(cloudError.code);
            expect(serializedCloudError.message).to.be.equal(cloudError.message);
            expect(serializedCloudError.target).to.not.exist;
            expect(serializedCloudError.details).to.not.exist;
            expect(serializedCloudError.innerError).to.not.exist;
        });

        it("serializes properly optional properties", () => {
            const cloudError: CloudError = {
                name: "my error",
                code: "200",
                message: "test message",
                target: "my target",
                details: [ { name: "error", code: "404", message: "not found" }, { name: "error", code: "500", message: "Internal error" } ],
                innerError: new Error("Resource not found"),
                stack: "call stack"
            };

            const serializedCloudError = serializer.serialize(CloudErrorMapper, cloudError);

            expect(serializedCloudError.target).to.be.equal(cloudError.target);
            expect(serializedCloudError.details[0].code).to.be.equal(cloudError.details![0].code);
            expect(serializedCloudError.details[0].message).to.be.equal(cloudError.details![0].message);
            expect(serializedCloudError.details[0].name).to.not.exist;
            expect(serializedCloudError.details[1].code).to.be.equal(cloudError.details![1].code);
            expect(serializedCloudError.details[1].message).to.be.equal(cloudError.details![1].message);
            expect(serializedCloudError.details[1].name).to.not.exist;
            expect(serializedCloudError.innererror).to.be.equal(cloudError.innerError);
            expect(serializedCloudError.stack).to.not.exist;
        });
    });

    describe("deserialization", () => {
        it("serializes properly required properties", () => {
            const cloudError = {
                name: "my error",
                code: "401",
                message: "test message"
            };

            const deserializedCloudError: CloudError = serializer.deserialize(CloudErrorMapper, cloudError, "deserializedCloudError");

            expect(deserializedCloudError.name).to.not.exist;
            expect(deserializedCloudError.code).to.be.equal(cloudError.code);
            expect(deserializedCloudError.message).to.be.equal(cloudError.message);
            expect(deserializedCloudError.target).to.not.exist;
            expect(deserializedCloudError.details).to.not.exist;
            expect(deserializedCloudError.innerError).to.not.exist;
        });

        it("serializes properly optional properties", () => {
            const cloudError = {
                name: "my error",
                code: "200",
                message: "test message",
                target: "my target",
                details: [ { code: "404", message: "not found" }, { code: "500", message: "Internal error" } ],
                innererror: new Error("Resource not found"),
                stack: "call stack"
            };

            const deserializedCloudError: CloudError = serializer.deserialize(CloudErrorMapper, cloudError, "deserializedCloudError");

            expect(deserializedCloudError.target).to.be.equal(cloudError.target);
            expect(deserializedCloudError.details).to.be.deep.equal(cloudError.details);
            expect(deserializedCloudError.innerError).to.be.equal(cloudError.innererror);
            expect(deserializedCloudError.stack).to.not.exist;
        });
    });
});
