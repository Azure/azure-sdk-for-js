"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var storage_blob_1 = require("@azure/storage-blob");
var BlobStorage = /** @class */ (function () {
    function BlobStorage() {
        this.service = "Storage - Blobs";
        this.description = "1) Upload Blob\n" +
            "2) Delete Blob (Clean up the resource)\n";
        //Setup the credentials and names for the container and blob.
        var account = process.env["STORAGE_ACCOUNT_NAME"];
        var accountKey = process.env["STORAGE_ACCOUNT_KEY"];
        var containerName = "mycontainer";
        this.blobName = "JSNewBlob";
        var credential = new storage_blob_1.SharedKeyCredential(account, accountKey);
        var serviceClient = new storage_blob_1.BlobServiceClient("https://" + account + ".blob.core.windows.net", credential);
        this.containerName = serviceClient.getContainerClient(containerName);
    }
    BlobStorage.prototype.Run = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.UploadBlob()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.CleanUp()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BlobStorage.prototype.UploadBlob = function () {
        return __awaiter(this, void 0, void 0, function () {
            var content, blobName, blobClient, blockBlobClient, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //This will upload a new blob in an existing container.
                        //If the container does not exist, it will create a new one.
                        //If the blob already exists in the container, this will override it.
                        console.log('Uploading blob...');
                        content = "This is the content for the sample blob";
                        blobName = "JSNewBlob";
                        blobClient = this.containerName.getBlobClient(blobName);
                        blockBlobClient = blobClient.getBlockBlobClient();
                        return [4 /*yield*/, blockBlobClient.upload(content, content.length)];
                    case 1:
                        response = _a.sent();
                        console.log("\tdone");
                        return [2 /*return*/];
                }
            });
        });
    };
    BlobStorage.prototype.CleanUp = function () {
        return __awaiter(this, void 0, void 0, function () {
            var blobClient;
            return __generator(this, function (_a) {
                console.log("Deleting container and blobs (Cleaning up the resource)...");
                blobClient = this.containerName.getBlobClient(this.blobName);
                blobClient["delete"]();
                console.log("\tdone");
                return [2 /*return*/];
            });
        });
    };
    return BlobStorage;
}());
exports.BlobStorage = BlobStorage;
