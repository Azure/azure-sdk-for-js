/*
The MIT License (MIT)
Copyright (c) 2017 Microsoft Corporation

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

"use strict";

var Base = require("./base")
    , BigInt = require("big-integer")
    , Int64BE = require("int64-buffer").Int64BE;

//SCRIPT START
var ResourceId = Base.defineClass(

    function () {
        this.offer = '0';
        this.database = '0';
        this.documentCollection = '0';
        this.storedProcedure = '0';
        this.trigger = '0';
        this.userDefinedFunction = '0';
        this.document = '0';
        this.partitionKeyRange = '0';
        this.user = '0';
        this.conflict = '0';
        this.permission = '0';
        this.attachment = '0';
        this.length = 20,
            this.offer_id_length = 3,
            this.DocumentByte = 0,
            this.StoredProcedureByte = 8,
            this.TriggerByte = 7,
            this.UserDefinedFunctionByte = 6,
            this.ConflictByte = 4,
            this.PartitionKeyRangeByte = 5

    },
    {
        parse: function (id) {
            var pair = this.tryParse(id);

            if (!pair[0]) {
                throw (new Error("invalid resource id " + id));
            }
            return pair[1];
        },

        newDatabaseId: function (dbId) {
            var resourceId = new ResourceId();
            resourceId.database = dbId;
            return ResourceId;
        },

        newDocumentCollectionId: function (databaseId, collectionId) {
            var dbId = this.parse(databaseId);

            var collectionResourceId = new ResourceId();
            collectionResourceId.database = dbId.database;
            collectionResourceId.documentCollection = collectionId;

            return collectionResourceId;
        },

        newUserId: function (databaseId, userId) {
            var dbId = this.parse(databaseId);

            var userResourceId = new ResourceId();
            userResourceId.database = dbId.database;
            userResourceId.user = userId;

            return userResourceId;
        },

        newPermissionId: function (userId, permissionId) {
            var usrId = this.parse(userId);

            var permissionResourceId = new ResourceId();
            permissionResourceId.database = usrId.database;
            permissionResourceId.user = usrId.user;
            permissionResourceId.permission = permissionId;
            return permissionResourceId;
        },

        newAttachmentId: function (documentId, attachmentId) {
            var docId = this.parse(documentId);

            var attachmentResourceId = new ResourceId();
            attachmentResourceId.database = docId.database;
            attachmentResourceId.documentCollection = docId.documentCollection;
            attachmentResourceId.document = docId.document;
            attachmentResourceId.attachment = attachmentid;

            return attachmentResourceId;
        },

        tryParse: function (id) {
            var rid = undefined;
            if (!id)
                return [false, undefined];

            var pair = this.verify(id);

            if (!pair[0])
                return [false, undefined];

            var buffer = pair[1];

            var intArray = new Int8Array(buffer);

            if (buffer.length % 4 != 0 && buffer.length != this.offer_id_length)
                return [false, undefined];

            var rid = new ResourceId();

            //if length < 4 bytes, the resource is an offer 
            if (buffer.length == this.offer_id_length) {
                rid.offer = 0;

                for (var index = 0; index < this.offer_id_length; index++) {
                    rid.offer = rid.offer | (intArray[index] << (index * 8));
                }

                rid.offer = rid.offer.toString();
                return [true, rid];
            }

            //first 4 bytes represent the database
            if (buffer.length >= 4)
                rid.database = buffer.readIntBE(0, 4).toString();

            if (buffer.length >= 8) {
                var isCollection = (intArray[4] & (128)) > 0;

                if (isCollection) {
                    //5th - 8th bytes represents the collection

                    rid.documentCollection = buffer.readIntBE(4, 4).toString();
                    var newBuff = new Buffer(4);

                    if (buffer.length >= 16) {

                        //9th - 15th bytes represent one of document, trigger, sproc, udf, conflict, pkrange
                        var subCollectionResource = this.bigNumberReadIntBE(buffer, 8, 8).toString();

                        if ((intArray[15] >> 4) == this.DocumentByte) {
                            rid.document = subCollectionResource;

                            //16th - 20th bytes represent the attachment
                            if (buffer.length == 20)
                                rid.attachment = buffer.readIntBE(16, 4).toString();
                        } else if (Math.abs(intArray[15] >> 4) == this.StoredProcedureByte)
                            rid.storedProcedure = subCollectionResource;
                        else if ((intArray[15] >> 4) == this.TriggerByte)
                            rid.trigger = subCollectionResource;
                        else if ((intArray[15] >> 4) == this.UserDefinedFunctionByte)
                            rid.userDefinedFunction = subCollectionResource;
                        else if ((intArray[15] >> 4) == this.ConflictByte)
                            rid.conflict = subCollectionResource;
                        else if ((intArray[15] >> 4) == this.PartitionKeyRangeByte)
                            rid.partitionKeyRange = subCollectionResource;
                        else
                            return [false, rid];

                    } else if (buffer.length != 8) {
                        return [false, rid];
                    }
                } else {
                    //5th - 8th bytes represents the user

                    rid.user = buffer.readIntBE(4, 4).toString();

                    //9th - 15th bytes represent the permission
                    if (buffer.length == 16)
                        rid.permission = this.bigNumberReadIntBE(buffer, 8, 8).toString();
                    else if (buffer.length != 8)
                        return [false, rid];
                }
            }

            return [true, rid];
        },

        verify: function (id) {
            if (!id) {
                throw (new Error("invalid resource id " + id));
            }

            var buffer = this.fromBase64String(id);
            if (!buffer || buffer.length > this.length) {
                buffer = undefined;
                return [false, buffer];
            }

            return [true, buffer];
        },

        verifyBool: function (id) {
            return this.verify(id)[0];
        },

        fromBase64String: function (s) {
            return Buffer(s.replace('-', '/'), 'base64');
        },

        toBase64String: function (buffer) {
            return buffer.toString('base64');
        },

        isDatabaseId: function () {
            return this.database != 0 && (this.documentCollection == 0 && this.user == 0)
        },

        getDatabaseId: function () {
            var rid = new ResourceId();
            rid.database = this.database;
            return rid;
        },

        getDocumentCollectionId: function () {
            var rid = new ResourceId();
            rid.database = this.database;
            rid.documentCollection = this.documentCollection;
            return rid;
        },

        getUniqueDocumentCollectionId: function () {
            var db = new BigInt(this.database);
            var coll = new BigInt(this.documentCollection);
            return db.shiftLeft(32).or(coll).toString();
        },

        getStoredProcedureId: function () {
            var rid = new ResourceId();
            rid.database = this.database;
            rid.documentCollection = this.documentCollection;
            rid.storedProcedure = this.storedProcedure;
            return rid;
        },

        getTriggerId: function () {
            var rid = new ResourceId();
            rid.database = this.database;
            rid.documentCollection = this.documentCollection;
            rid.trigger = this.trigger;
            return rid;
        },

        getUserDefinedFunctionId: function () {
            var rid = new ResourceId();
            rid.database = this.database;
            rid.documentCollection = this.documentCollection;
            rid.userDefinedFunction = this.userDefinedFunction;
            return rid;
        },

        getConflictId: function () {
            var rid = new ResourceId();
            rid.database = this.database;
            rid.documentCollection = this.documentCollection;
            rid.conflict = this.conflict;
            return rid;
        },

        getDocumentId: function () {
            var rid = new ResourceId();
            rid.database = this.database;
            rid.documentCollection = this.documentCollection;
            rid.document = this.document;
            return rid;
        },

        getPartitonKeyRangeId: function () {
            var rid = new ResourceId();
            rid.database = this.database;
            rid.documentCollection = this.documentCollection;
            rid.partitionKeyRange = this.partitionKeyRange;
            return rid;
        },

        getUserId: function () {
            var rid = new ResourceId();
            rid.database = this.database;
            rid.user = this.user;
            return rid;
        },

        getPermissionId: function () {
            var rid = new ResourceId();
            rid.database = this.database;
            rid.user = this.user;
            rid.permission = this.permission;
            return rid;
        },

        getAttachmentId: function () {
            var rid = new ResourceId();
            rid.database = this.database;
            rid.documentCollection = this.documentCollection;
            rid.document = this.document;
            rid.attachment = this.attachment;
            return rid;
        },

        getOfferId: function () {
            var rid = new ResourceId();
            rid.offer = this.offer;
            return rid;
        },

        getValue: function () {
            var len = 0;
            if (this.offer != '0')
                len = len + this.offer_id_length;
            else if (this.database != '0')
                len = len + 4;
            if (this.documentCollection != '0' || this.user != '0')
                len = len + 4;
            if (this.document != '0' || this.permission != '0'
                || this.storedProcedure != '0' || this.trigger != '0'
                || this.userDefinedFunction != 0 || this.conflict != '0'
                || this.partitionKeyRange != '0')
                len = len + 8;
            if (this.attachment != '0')
                len = len + 4;

            var buffer = new Buffer(len);
            buffer.fill(0);

            if (this.offer != '0')
                buffer.writeIntLE(Number(this.offer), 0, this.offer_id_length);
            else if (this.database != '0')
                buffer.writeIntBE(Number(this.database), 0, 4);

            if (this.documentCollection != '0')
                buffer.writeIntBE(Number(this.documentCollection), 4, 4);
            else if (this.user != '0')
                buffer.writeIntBE(Number(this.user), 4, 4);

            if (this.storedProcedure != '0') {
                var big = new Int64BE(this.storedProcedure);
                big.toBuffer().copy(buffer, 8, 0, 8);
            }
            else if (this.trigger != '0') {
                var big = new Int64BE(this.trigger);
                big.toBuffer().copy(buffer, 8, 0, 8);
            }
            else if (this.userDefinedFunction != '0') {
                var big = new Int64BE(this.userDefinedFunction);
                big.toBuffer().copy(buffer, 8, 0, 8);
            }
            else if (this.conflict != '0') {
                var big = new Int64BE(this.conflict);
                big.toBuffer().copy(buffer, 8, 0, 8);
            }
            else if (this.document != '0') {
                var big = new Int64BE(this.document);
                big.toBuffer().copy(buffer, 8, 0, 8);
            }
            else if (this.permission != '0') {
                var big = new Int64BE(this.permission);
                big.toBuffer().copy(buffer, 8, 0, 8);
            }
            else if (this.partitionKeyRange != '0') {
                var big = new Int64BE(this.partitionKeyRange);
                big.toBuffer().copy(buffer, 8, 0, 8);
            }

            if (this.attachment != '0')
                buffer.writeIntBE(Number(this.attachment), 16, 4);

            return buffer;

        },

        toString: function () {
            return this.toBase64String(this.getValue());
        },

        bigNumberReadIntBE: function (buffer, offset, byteLength) {
            offset = offset >>> 0
            byteLength = byteLength >>> 0

            var i = byteLength
            var mul = new BigInt("1");
            var val = new BigInt(buffer[offset + --i]);
            while (i > 0 && (mul = mul.times(0x100))) {
                var temp = new BigInt(buffer[offset + --i]);
                val = val.plus(temp.times(mul));
            }
            mul = mul.times(0x80);

            if (val.greater(mul)) {
                var subtrahend = new BigInt(2);
                val = val.minus(subtrahend.pow(8 * byteLength));
            }

            return val
        }
    }, null
);
//SCRIPT END

if (typeof exports !== "undefined") {
    module.exports = ResourceId;
}
