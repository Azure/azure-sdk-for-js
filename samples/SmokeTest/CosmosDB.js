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
var cosmos_1 = require("@azure/cosmos");
var CosmosDB = /** @class */ (function () {
    function CosmosDB() {
        this.service = "Cosmos DB";
        this.description = "1) Create a database\n" +
            "2) Create a collection\n" +
            "3) Create documents (items) in the collection\n" +
            "4) Delete the database (Clean up the resource)\n";
        this.dataBaseName = "jsSolarSystem";
        this.collectionName = "PlanetsCollection";
        //THIS CLASS EXPECTS TO FIND THE FOLLOWING ENVIRONMENT VARIABLES
        var endpoint = process.env["COSMOS_END_POINT"];
        var masterKey = process.env["COSMOS_KEY"];
        this.client = new cosmos_1.CosmosClient({ endpoint: endpoint, auth: { masterKey: masterKey } });
    }
    CosmosDB.prototype.Run = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.CreateDatabase()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.CreateCollection()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.CreateDocuments()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.DeleteDatabase()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CosmosDB.prototype.CreateDatabase = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Creating \"" + this.dataBaseName + "\" database...");
                        return [4 /*yield*/, this.client.databases.create({ id: this.dataBaseName })];
                    case 1:
                        db = (_a.sent()).database;
                        this.db = db;
                        console.log("\tdone");
                        return [2 /*return*/];
                }
            });
        });
    };
    CosmosDB.prototype.CreateCollection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var container;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Creating \"" + this.collectionName + "\" collection...");
                        return [4 /*yield*/, this.db.containers.create({ id: this.collectionName })];
                    case 1:
                        container = (_a.sent()).container;
                        this.container = container;
                        console.log("\tdone");
                        return [2 /*return*/];
                }
            });
        });
    };
    CosmosDB.prototype.CreateDocuments = function () {
        return __awaiter(this, void 0, void 0, function () {
            var planetEarth, planetMars, body, body2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Creating documents (items)...");
                        planetEarth = {
                            "id": "Earth",
                            "HasRings": false,
                            "Radius": 3959,
                            "Moons": [
                                {
                                    "Name": "Moon"
                                }
                            ]
                        };
                        planetMars = {
                            "id": "Mars",
                            "HasRings": false,
                            "Radius": 2106,
                            "Moons": [
                                {
                                    "Name": "Phobos"
                                },
                                {
                                    "Name": "Deimos"
                                }
                            ]
                        };
                        return [4 /*yield*/, this.container.items.create(planetEarth)];
                    case 1:
                        body = (_a.sent()).body;
                        console.log("\t" + planetEarth.id + " done");
                        return [4 /*yield*/, this.container.items.create(planetMars)];
                    case 2:
                        body2 = (_a.sent()).body2;
                        console.log("\t" + planetMars.id + " done");
                        return [2 /*return*/];
                }
            });
        });
    };
    CosmosDB.prototype.DeleteDatabase = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Deleting database...");
                        return [4 /*yield*/, this.db["delete"]()];
                    case 1:
                        _a.sent();
                        console.log("\tdone");
                        return [2 /*return*/];
                }
            });
        });
    };
    return CosmosDB;
}());
exports.CosmosDB = CosmosDB;
