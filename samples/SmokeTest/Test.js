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
Object.defineProperty(exports, "__esModule", { value: true });
var keyvault_secrets_1 = require("@azure/keyvault-secrets");
var identity_1 = require("@azure/identity");
var event_hubs_1 = require("@azure/event-hubs");
var assert = require('assert');
describe('KEY VAULT', function () {
    var credential = new identity_1.EnvironmentCredential();
    var url = process.env["AZURE_PROJECT_URL"];
    if (url === undefined) {
        assert.fail('The connection string is undefined');
        return;
    }
    var client = new keyvault_secrets_1.SecretsClient(url, credential);
    var secretName = "MySecretName";
    var secretValue = "MySecretValue";
    describe('Set a secret', function () {
        it('Should create a new secret.', function () {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, client.setSecret(secretName, secretValue)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    describe('Get that secret', function () {
        it('Should get the secret previusly created..', function () {
            return __awaiter(this, void 0, void 0, function () {
                var getResult;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, client.getSecret(secretName)];
                        case 1:
                            getResult = _a.sent();
                            assert.equal(getResult.name, secretName);
                            assert.equal(getResult.value, secretValue);
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    describe('Delete the secret previously created', function () {
        it('Should delete the secret.', function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, client.deleteSecret(secretName)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
});
describe('EVENT HUBS', function () {
    describe('Send and Receive a batch of events', function () {
        var client;
        var partitionId;
        it('Should create a client', function () {
            return __awaiter(this, void 0, void 0, function () {
                var eventHubName, eventHubConnectionString;
                return __generator(this, function (_a) {
                    eventHubName = "myeventhub";
                    eventHubConnectionString = process.env["EVENT_HUBS_CONNECTION_STRING"];
                    if (eventHubConnectionString === undefined) {
                        assert.fail('The connection string is undefined');
                        return [2 /*return*/];
                    }
                    client = event_hubs_1.EventHubClient.createFromConnectionString(eventHubConnectionString, eventHubName);
                    return [2 /*return*/];
                });
            });
        });
        it('Should get the first partition id', function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, client.getPartitionIds()];
                        case 1:
                            partitionId = _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('Should send a batch of events', function () {
            return __awaiter(this, void 0, void 0, function () {
                var closed;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, client.sendBatch([
                                { body: "JS Event Test 1" },
                                { body: "JS Event Test 2" },
                                { body: "JS Event Test 3" }
                            ], partitionId[0])];
                        case 1:
                            _a.sent();
                            closed = client.close();
                            return [2 /*return*/];
                    }
                });
            });
        });
        it('Should receive a batch of events', function () {
            return __awaiter(this, void 0, void 0, function () {
                var myEvents, closed;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, client.receiveBatch(partitionId[0], 10, 2)];
                        case 1:
                            myEvents = _a.sent();
                            closed = client.close();
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
});
