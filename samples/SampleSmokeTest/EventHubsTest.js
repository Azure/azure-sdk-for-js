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
var event_hubs_1 = require("@azure/event-hubs");
var EventHubs = /** @class */ (function () {
    function EventHubs() {
        this.service = "Event Hubs";
        this.description = "1) Get partitions ID\n" +
            "2) Send a batch of 3 events\n" +
            "3) Get a batch of events\n";
        var eventHubName = "myeventhub";
        var connectionString = process.env["EVENT_HUBS_CONNECTION_STRING"];
        this.client = event_hubs_1.EventHubClient.createFromConnectionString(connectionString, eventHubName);
    }
    EventHubs.prototype.Run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 6]);
                        return [4 /*yield*/, this.getPartitionsIds()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.sendBatchOfEvents()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.receiveBatchOfEvents()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        ex_1 = _a.sent();
                        //If something goes wrong, the client must be closed in order for the app to end.
                        return [4 /*yield*/, this.client.close()];
                    case 5:
                        //If something goes wrong, the client must be closed in order for the app to end.
                        _a.sent();
                        throw ex_1;
                    case 6: 
                    //At the end the client should be closed.
                    return [4 /*yield*/, this.client.close()];
                    case 7:
                        //At the end the client should be closed.
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EventHubs.prototype.getPartitionsIds = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log("getting partitions id");
                        //In this sample, all the events are gonna be send and received from the first partition of the Event Hub.
                        //This can be changed since it is not necessary to specify the partitionID when calling a method of the SDK.
                        _a = this;
                        return [4 /*yield*/, this.client.getPartitionIds()];
                    case 1:
                        //In this sample, all the events are gonna be send and received from the first partition of the Event Hub.
                        //This can be changed since it is not necessary to specify the partitionID when calling a method of the SDK.
                        _a.partitionId = _b.sent();
                        console.log("\tdone");
                        return [2 /*return*/];
                }
            });
        });
    };
    EventHubs.prototype.sendBatchOfEvents = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("sending a batch");
                        return [4 /*yield*/, this.client.sendBatch([
                                { body: "JS Event Test 1" },
                                { body: "JS Event Test 2" },
                                { body: "JS Event Test 3" }
                            ], this.partitionId[0])];
                    case 1:
                        _a.sent();
                        console.log("\tdone");
                        return [2 /*return*/];
                }
            });
        });
    };
    EventHubs.prototype.receiveBatchOfEvents = function () {
        return __awaiter(this, void 0, void 0, function () {
            var myEvents;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("receiving a batch");
                        return [4 /*yield*/, this.client.receiveBatch(this.partitionId[0], 3)];
                    case 1:
                        myEvents = _a.sent();
                        console.log("\tdone");
                        return [2 /*return*/];
                }
            });
        });
    };
    return EventHubs;
}());
exports.EventHubs = EventHubs;
