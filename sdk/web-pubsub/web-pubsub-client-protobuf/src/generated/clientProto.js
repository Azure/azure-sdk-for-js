/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const UpstreamMessage = $root.UpstreamMessage = (() => {

    /**
     * Properties of an UpstreamMessage.
     * @exports IUpstreamMessage
     * @interface IUpstreamMessage
     * @property {UpstreamMessage.ISendToGroupMessage|null} [sendToGroupMessage] UpstreamMessage sendToGroupMessage
     * @property {UpstreamMessage.IEventMessage|null} [eventMessage] UpstreamMessage eventMessage
     * @property {UpstreamMessage.IJoinGroupMessage|null} [joinGroupMessage] UpstreamMessage joinGroupMessage
     * @property {UpstreamMessage.ILeaveGroupMessage|null} [leaveGroupMessage] UpstreamMessage leaveGroupMessage
     * @property {UpstreamMessage.ISequenceAckMessage|null} [sequenceAckMessage] UpstreamMessage sequenceAckMessage
     * @property {UpstreamMessage.ISetGroupStateMessage|null} [setGroupStateMessage] UpstreamMessage setGroupStateMessage
     * @property {UpstreamMessage.ISubscribeGroupStateMessage|null} [subscribeGroupStateMessage] UpstreamMessage subscribeGroupStateMessage
     * @property {UpstreamMessage.IUnsubscribeGroupStateMessage|null} [unsubscribeGroupStateMessage] UpstreamMessage unsubscribeGroupStateMessage
     */

    /**
     * Constructs a new UpstreamMessage.
     * @exports UpstreamMessage
     * @classdesc Represents an UpstreamMessage.
     * @implements IUpstreamMessage
     * @constructor
     * @param {IUpstreamMessage=} [properties] Properties to set
     */
    function UpstreamMessage(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * UpstreamMessage sendToGroupMessage.
     * @member {UpstreamMessage.ISendToGroupMessage|null|undefined} sendToGroupMessage
     * @memberof UpstreamMessage
     * @instance
     */
    UpstreamMessage.prototype.sendToGroupMessage = null;

    /**
     * UpstreamMessage eventMessage.
     * @member {UpstreamMessage.IEventMessage|null|undefined} eventMessage
     * @memberof UpstreamMessage
     * @instance
     */
    UpstreamMessage.prototype.eventMessage = null;

    /**
     * UpstreamMessage joinGroupMessage.
     * @member {UpstreamMessage.IJoinGroupMessage|null|undefined} joinGroupMessage
     * @memberof UpstreamMessage
     * @instance
     */
    UpstreamMessage.prototype.joinGroupMessage = null;

    /**
     * UpstreamMessage leaveGroupMessage.
     * @member {UpstreamMessage.ILeaveGroupMessage|null|undefined} leaveGroupMessage
     * @memberof UpstreamMessage
     * @instance
     */
    UpstreamMessage.prototype.leaveGroupMessage = null;

    /**
     * UpstreamMessage sequenceAckMessage.
     * @member {UpstreamMessage.ISequenceAckMessage|null|undefined} sequenceAckMessage
     * @memberof UpstreamMessage
     * @instance
     */
    UpstreamMessage.prototype.sequenceAckMessage = null;

    /**
     * UpstreamMessage setGroupStateMessage.
     * @member {UpstreamMessage.ISetGroupStateMessage|null|undefined} setGroupStateMessage
     * @memberof UpstreamMessage
     * @instance
     */
    UpstreamMessage.prototype.setGroupStateMessage = null;

    /**
     * UpstreamMessage subscribeGroupStateMessage.
     * @member {UpstreamMessage.ISubscribeGroupStateMessage|null|undefined} subscribeGroupStateMessage
     * @memberof UpstreamMessage
     * @instance
     */
    UpstreamMessage.prototype.subscribeGroupStateMessage = null;

    /**
     * UpstreamMessage unsubscribeGroupStateMessage.
     * @member {UpstreamMessage.IUnsubscribeGroupStateMessage|null|undefined} unsubscribeGroupStateMessage
     * @memberof UpstreamMessage
     * @instance
     */
    UpstreamMessage.prototype.unsubscribeGroupStateMessage = null;

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields;

    /**
     * UpstreamMessage message.
     * @member {"sendToGroupMessage"|"eventMessage"|"joinGroupMessage"|"leaveGroupMessage"|"sequenceAckMessage"|"setGroupStateMessage"|"subscribeGroupStateMessage"|"unsubscribeGroupStateMessage"|undefined} message
     * @memberof UpstreamMessage
     * @instance
     */
    Object.defineProperty(UpstreamMessage.prototype, "message", {
        get: $util.oneOfGetter($oneOfFields = ["sendToGroupMessage", "eventMessage", "joinGroupMessage", "leaveGroupMessage", "sequenceAckMessage", "setGroupStateMessage", "subscribeGroupStateMessage", "unsubscribeGroupStateMessage"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new UpstreamMessage instance using the specified properties.
     * @function create
     * @memberof UpstreamMessage
     * @static
     * @param {IUpstreamMessage=} [properties] Properties to set
     * @returns {UpstreamMessage} UpstreamMessage instance
     */
    UpstreamMessage.create = function create(properties) {
        return new UpstreamMessage(properties);
    };

    /**
     * Encodes the specified UpstreamMessage message. Does not implicitly {@link UpstreamMessage.verify|verify} messages.
     * @function encode
     * @memberof UpstreamMessage
     * @static
     * @param {IUpstreamMessage} message UpstreamMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    UpstreamMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sendToGroupMessage != null && Object.hasOwnProperty.call(message, "sendToGroupMessage"))
            $root.UpstreamMessage.SendToGroupMessage.encode(message.sendToGroupMessage, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.eventMessage != null && Object.hasOwnProperty.call(message, "eventMessage"))
            $root.UpstreamMessage.EventMessage.encode(message.eventMessage, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
        if (message.joinGroupMessage != null && Object.hasOwnProperty.call(message, "joinGroupMessage"))
            $root.UpstreamMessage.JoinGroupMessage.encode(message.joinGroupMessage, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
        if (message.leaveGroupMessage != null && Object.hasOwnProperty.call(message, "leaveGroupMessage"))
            $root.UpstreamMessage.LeaveGroupMessage.encode(message.leaveGroupMessage, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
        if (message.sequenceAckMessage != null && Object.hasOwnProperty.call(message, "sequenceAckMessage"))
            $root.UpstreamMessage.SequenceAckMessage.encode(message.sequenceAckMessage, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
        if (message.setGroupStateMessage != null && Object.hasOwnProperty.call(message, "setGroupStateMessage"))
            $root.UpstreamMessage.SetGroupStateMessage.encode(message.setGroupStateMessage, writer.uint32(/* id 15, wireType 2 =*/122).fork()).ldelim();
        if (message.subscribeGroupStateMessage != null && Object.hasOwnProperty.call(message, "subscribeGroupStateMessage"))
            $root.UpstreamMessage.SubscribeGroupStateMessage.encode(message.subscribeGroupStateMessage, writer.uint32(/* id 16, wireType 2 =*/130).fork()).ldelim();
        if (message.unsubscribeGroupStateMessage != null && Object.hasOwnProperty.call(message, "unsubscribeGroupStateMessage"))
            $root.UpstreamMessage.UnsubscribeGroupStateMessage.encode(message.unsubscribeGroupStateMessage, writer.uint32(/* id 17, wireType 2 =*/138).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified UpstreamMessage message, length delimited. Does not implicitly {@link UpstreamMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof UpstreamMessage
     * @static
     * @param {IUpstreamMessage} message UpstreamMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    UpstreamMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an UpstreamMessage message from the specified reader or buffer.
     * @function decode
     * @memberof UpstreamMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {UpstreamMessage} UpstreamMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    UpstreamMessage.decode = function decode(reader, length, error, long) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (long === undefined)
            long = 0;
        if (long > $Reader.recursionLimit)
            throw Error("maximum nesting depth exceeded");
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.UpstreamMessage();
        while (reader.pos < end) {
            let tag = reader.uint32();
            if (tag === error)
                break;
            switch (tag >>> 3) {
            case 1: {
                    message.sendToGroupMessage = $root.UpstreamMessage.SendToGroupMessage.decode(reader, reader.uint32(), undefined, long + 1);
                    break;
                }
            case 5: {
                    message.eventMessage = $root.UpstreamMessage.EventMessage.decode(reader, reader.uint32(), undefined, long + 1);
                    break;
                }
            case 6: {
                    message.joinGroupMessage = $root.UpstreamMessage.JoinGroupMessage.decode(reader, reader.uint32(), undefined, long + 1);
                    break;
                }
            case 7: {
                    message.leaveGroupMessage = $root.UpstreamMessage.LeaveGroupMessage.decode(reader, reader.uint32(), undefined, long + 1);
                    break;
                }
            case 8: {
                    message.sequenceAckMessage = $root.UpstreamMessage.SequenceAckMessage.decode(reader, reader.uint32(), undefined, long + 1);
                    break;
                }
            case 15: {
                    message.setGroupStateMessage = $root.UpstreamMessage.SetGroupStateMessage.decode(reader, reader.uint32(), undefined, long + 1);
                    break;
                }
            case 16: {
                    message.subscribeGroupStateMessage = $root.UpstreamMessage.SubscribeGroupStateMessage.decode(reader, reader.uint32(), undefined, long + 1);
                    break;
                }
            case 17: {
                    message.unsubscribeGroupStateMessage = $root.UpstreamMessage.UnsubscribeGroupStateMessage.decode(reader, reader.uint32(), undefined, long + 1);
                    break;
                }
            default:
                reader.skipType(tag & 7, long);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an UpstreamMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof UpstreamMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {UpstreamMessage} UpstreamMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    UpstreamMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an UpstreamMessage message.
     * @function verify
     * @memberof UpstreamMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    UpstreamMessage.verify = function verify(message, long) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (long === undefined)
            long = 0;
        if (long > $util.recursionLimit)
            return "maximum nesting depth exceeded";
        let properties = {};
        if (message.sendToGroupMessage != null && message.hasOwnProperty("sendToGroupMessage")) {
            properties.message = 1;
            {
                let error = $root.UpstreamMessage.SendToGroupMessage.verify(message.sendToGroupMessage, long + 1);
                if (error)
                    return "sendToGroupMessage." + error;
            }
        }
        if (message.eventMessage != null && message.hasOwnProperty("eventMessage")) {
            if (properties.message === 1)
                return "message: multiple values";
            properties.message = 1;
            {
                let error = $root.UpstreamMessage.EventMessage.verify(message.eventMessage, long + 1);
                if (error)
                    return "eventMessage." + error;
            }
        }
        if (message.joinGroupMessage != null && message.hasOwnProperty("joinGroupMessage")) {
            if (properties.message === 1)
                return "message: multiple values";
            properties.message = 1;
            {
                let error = $root.UpstreamMessage.JoinGroupMessage.verify(message.joinGroupMessage, long + 1);
                if (error)
                    return "joinGroupMessage." + error;
            }
        }
        if (message.leaveGroupMessage != null && message.hasOwnProperty("leaveGroupMessage")) {
            if (properties.message === 1)
                return "message: multiple values";
            properties.message = 1;
            {
                let error = $root.UpstreamMessage.LeaveGroupMessage.verify(message.leaveGroupMessage, long + 1);
                if (error)
                    return "leaveGroupMessage." + error;
            }
        }
        if (message.sequenceAckMessage != null && message.hasOwnProperty("sequenceAckMessage")) {
            if (properties.message === 1)
                return "message: multiple values";
            properties.message = 1;
            {
                let error = $root.UpstreamMessage.SequenceAckMessage.verify(message.sequenceAckMessage, long + 1);
                if (error)
                    return "sequenceAckMessage." + error;
            }
        }
        if (message.setGroupStateMessage != null && message.hasOwnProperty("setGroupStateMessage")) {
            if (properties.message === 1)
                return "message: multiple values";
            properties.message = 1;
            {
                let error = $root.UpstreamMessage.SetGroupStateMessage.verify(message.setGroupStateMessage, long + 1);
                if (error)
                    return "setGroupStateMessage." + error;
            }
        }
        if (message.subscribeGroupStateMessage != null && message.hasOwnProperty("subscribeGroupStateMessage")) {
            if (properties.message === 1)
                return "message: multiple values";
            properties.message = 1;
            {
                let error = $root.UpstreamMessage.SubscribeGroupStateMessage.verify(message.subscribeGroupStateMessage, long + 1);
                if (error)
                    return "subscribeGroupStateMessage." + error;
            }
        }
        if (message.unsubscribeGroupStateMessage != null && message.hasOwnProperty("unsubscribeGroupStateMessage")) {
            if (properties.message === 1)
                return "message: multiple values";
            properties.message = 1;
            {
                let error = $root.UpstreamMessage.UnsubscribeGroupStateMessage.verify(message.unsubscribeGroupStateMessage, long + 1);
                if (error)
                    return "unsubscribeGroupStateMessage." + error;
            }
        }
        return null;
    };

    /**
     * Creates an UpstreamMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof UpstreamMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {UpstreamMessage} UpstreamMessage
     */
    UpstreamMessage.fromObject = function fromObject(object, long) {
        if (object instanceof $root.UpstreamMessage)
            return object;
        if (long === undefined)
            long = 0;
        if (long > $util.recursionLimit)
            throw Error("maximum nesting depth exceeded");
        let message = new $root.UpstreamMessage();
        if (object.sendToGroupMessage != null) {
            if (typeof object.sendToGroupMessage !== "object")
                throw TypeError(".UpstreamMessage.sendToGroupMessage: object expected");
            message.sendToGroupMessage = $root.UpstreamMessage.SendToGroupMessage.fromObject(object.sendToGroupMessage, long + 1);
        }
        if (object.eventMessage != null) {
            if (typeof object.eventMessage !== "object")
                throw TypeError(".UpstreamMessage.eventMessage: object expected");
            message.eventMessage = $root.UpstreamMessage.EventMessage.fromObject(object.eventMessage, long + 1);
        }
        if (object.joinGroupMessage != null) {
            if (typeof object.joinGroupMessage !== "object")
                throw TypeError(".UpstreamMessage.joinGroupMessage: object expected");
            message.joinGroupMessage = $root.UpstreamMessage.JoinGroupMessage.fromObject(object.joinGroupMessage, long + 1);
        }
        if (object.leaveGroupMessage != null) {
            if (typeof object.leaveGroupMessage !== "object")
                throw TypeError(".UpstreamMessage.leaveGroupMessage: object expected");
            message.leaveGroupMessage = $root.UpstreamMessage.LeaveGroupMessage.fromObject(object.leaveGroupMessage, long + 1);
        }
        if (object.sequenceAckMessage != null) {
            if (typeof object.sequenceAckMessage !== "object")
                throw TypeError(".UpstreamMessage.sequenceAckMessage: object expected");
            message.sequenceAckMessage = $root.UpstreamMessage.SequenceAckMessage.fromObject(object.sequenceAckMessage, long + 1);
        }
        if (object.setGroupStateMessage != null) {
            if (typeof object.setGroupStateMessage !== "object")
                throw TypeError(".UpstreamMessage.setGroupStateMessage: object expected");
            message.setGroupStateMessage = $root.UpstreamMessage.SetGroupStateMessage.fromObject(object.setGroupStateMessage, long + 1);
        }
        if (object.subscribeGroupStateMessage != null) {
            if (typeof object.subscribeGroupStateMessage !== "object")
                throw TypeError(".UpstreamMessage.subscribeGroupStateMessage: object expected");
            message.subscribeGroupStateMessage = $root.UpstreamMessage.SubscribeGroupStateMessage.fromObject(object.subscribeGroupStateMessage, long + 1);
        }
        if (object.unsubscribeGroupStateMessage != null) {
            if (typeof object.unsubscribeGroupStateMessage !== "object")
                throw TypeError(".UpstreamMessage.unsubscribeGroupStateMessage: object expected");
            message.unsubscribeGroupStateMessage = $root.UpstreamMessage.UnsubscribeGroupStateMessage.fromObject(object.unsubscribeGroupStateMessage, long + 1);
        }
        return message;
    };

    /**
     * Creates a plain object from an UpstreamMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof UpstreamMessage
     * @static
     * @param {UpstreamMessage} message UpstreamMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    UpstreamMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (message.sendToGroupMessage != null && message.hasOwnProperty("sendToGroupMessage")) {
            object.sendToGroupMessage = $root.UpstreamMessage.SendToGroupMessage.toObject(message.sendToGroupMessage, options);
            if (options.oneofs)
                object.message = "sendToGroupMessage";
        }
        if (message.eventMessage != null && message.hasOwnProperty("eventMessage")) {
            object.eventMessage = $root.UpstreamMessage.EventMessage.toObject(message.eventMessage, options);
            if (options.oneofs)
                object.message = "eventMessage";
        }
        if (message.joinGroupMessage != null && message.hasOwnProperty("joinGroupMessage")) {
            object.joinGroupMessage = $root.UpstreamMessage.JoinGroupMessage.toObject(message.joinGroupMessage, options);
            if (options.oneofs)
                object.message = "joinGroupMessage";
        }
        if (message.leaveGroupMessage != null && message.hasOwnProperty("leaveGroupMessage")) {
            object.leaveGroupMessage = $root.UpstreamMessage.LeaveGroupMessage.toObject(message.leaveGroupMessage, options);
            if (options.oneofs)
                object.message = "leaveGroupMessage";
        }
        if (message.sequenceAckMessage != null && message.hasOwnProperty("sequenceAckMessage")) {
            object.sequenceAckMessage = $root.UpstreamMessage.SequenceAckMessage.toObject(message.sequenceAckMessage, options);
            if (options.oneofs)
                object.message = "sequenceAckMessage";
        }
        if (message.setGroupStateMessage != null && message.hasOwnProperty("setGroupStateMessage")) {
            object.setGroupStateMessage = $root.UpstreamMessage.SetGroupStateMessage.toObject(message.setGroupStateMessage, options);
            if (options.oneofs)
                object.message = "setGroupStateMessage";
        }
        if (message.subscribeGroupStateMessage != null && message.hasOwnProperty("subscribeGroupStateMessage")) {
            object.subscribeGroupStateMessage = $root.UpstreamMessage.SubscribeGroupStateMessage.toObject(message.subscribeGroupStateMessage, options);
            if (options.oneofs)
                object.message = "subscribeGroupStateMessage";
        }
        if (message.unsubscribeGroupStateMessage != null && message.hasOwnProperty("unsubscribeGroupStateMessage")) {
            object.unsubscribeGroupStateMessage = $root.UpstreamMessage.UnsubscribeGroupStateMessage.toObject(message.unsubscribeGroupStateMessage, options);
            if (options.oneofs)
                object.message = "unsubscribeGroupStateMessage";
        }
        return object;
    };

    /**
     * Converts this UpstreamMessage to JSON.
     * @function toJSON
     * @memberof UpstreamMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    UpstreamMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for UpstreamMessage
     * @function getTypeUrl
     * @memberof UpstreamMessage
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    UpstreamMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/UpstreamMessage";
    };

    UpstreamMessage.SendToGroupMessage = (function() {

        /**
         * Properties of a SendToGroupMessage.
         * @memberof UpstreamMessage
         * @interface ISendToGroupMessage
         * @property {string|null} [group] SendToGroupMessage group
         * @property {number|Long|null} [ackId] SendToGroupMessage ackId
         * @property {IMessageData|null} [data] SendToGroupMessage data
         * @property {boolean|null} [noEcho] SendToGroupMessage noEcho
         */

        /**
         * Constructs a new SendToGroupMessage.
         * @memberof UpstreamMessage
         * @classdesc Represents a SendToGroupMessage.
         * @implements ISendToGroupMessage
         * @constructor
         * @param {UpstreamMessage.ISendToGroupMessage=} [properties] Properties to set
         */
        function SendToGroupMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SendToGroupMessage group.
         * @member {string} group
         * @memberof UpstreamMessage.SendToGroupMessage
         * @instance
         */
        SendToGroupMessage.prototype.group = "";

        /**
         * SendToGroupMessage ackId.
         * @member {number|Long|null|undefined} ackId
         * @memberof UpstreamMessage.SendToGroupMessage
         * @instance
         */
        SendToGroupMessage.prototype.ackId = null;

        /**
         * SendToGroupMessage data.
         * @member {IMessageData|null|undefined} data
         * @memberof UpstreamMessage.SendToGroupMessage
         * @instance
         */
        SendToGroupMessage.prototype.data = null;

        /**
         * SendToGroupMessage noEcho.
         * @member {boolean|null|undefined} noEcho
         * @memberof UpstreamMessage.SendToGroupMessage
         * @instance
         */
        SendToGroupMessage.prototype.noEcho = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(SendToGroupMessage.prototype, "_ackId", {
            get: $util.oneOfGetter($oneOfFields = ["ackId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(SendToGroupMessage.prototype, "_noEcho", {
            get: $util.oneOfGetter($oneOfFields = ["noEcho"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new SendToGroupMessage instance using the specified properties.
         * @function create
         * @memberof UpstreamMessage.SendToGroupMessage
         * @static
         * @param {UpstreamMessage.ISendToGroupMessage=} [properties] Properties to set
         * @returns {UpstreamMessage.SendToGroupMessage} SendToGroupMessage instance
         */
        SendToGroupMessage.create = function create(properties) {
            return new SendToGroupMessage(properties);
        };

        /**
         * Encodes the specified SendToGroupMessage message. Does not implicitly {@link UpstreamMessage.SendToGroupMessage.verify|verify} messages.
         * @function encode
         * @memberof UpstreamMessage.SendToGroupMessage
         * @static
         * @param {UpstreamMessage.ISendToGroupMessage} message SendToGroupMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SendToGroupMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.group != null && Object.hasOwnProperty.call(message, "group"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.group);
            if (message.ackId != null && Object.hasOwnProperty.call(message, "ackId"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.ackId);
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                $root.MessageData.encode(message.data, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.noEcho != null && Object.hasOwnProperty.call(message, "noEcho"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.noEcho);
            return writer;
        };

        /**
         * Encodes the specified SendToGroupMessage message, length delimited. Does not implicitly {@link UpstreamMessage.SendToGroupMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof UpstreamMessage.SendToGroupMessage
         * @static
         * @param {UpstreamMessage.ISendToGroupMessage} message SendToGroupMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SendToGroupMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SendToGroupMessage message from the specified reader or buffer.
         * @function decode
         * @memberof UpstreamMessage.SendToGroupMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {UpstreamMessage.SendToGroupMessage} SendToGroupMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SendToGroupMessage.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.UpstreamMessage.SendToGroupMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.group = reader.string();
                        break;
                    }
                case 2: {
                        message.ackId = reader.uint64();
                        break;
                    }
                case 3: {
                        message.data = $root.MessageData.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 4: {
                        message.noEcho = reader.bool();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SendToGroupMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof UpstreamMessage.SendToGroupMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {UpstreamMessage.SendToGroupMessage} SendToGroupMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SendToGroupMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SendToGroupMessage message.
         * @function verify
         * @memberof UpstreamMessage.SendToGroupMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SendToGroupMessage.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            let properties = {};
            if (message.group != null && message.hasOwnProperty("group"))
                if (!$util.isString(message.group))
                    return "group: string expected";
            if (message.ackId != null && message.hasOwnProperty("ackId")) {
                properties._ackId = 1;
                if (!$util.isInteger(message.ackId) && !(message.ackId && $util.isInteger(message.ackId.low) && $util.isInteger(message.ackId.high)))
                    return "ackId: integer|Long expected";
            }
            if (message.data != null && message.hasOwnProperty("data")) {
                let error = $root.MessageData.verify(message.data, long + 1);
                if (error)
                    return "data." + error;
            }
            if (message.noEcho != null && message.hasOwnProperty("noEcho")) {
                properties._noEcho = 1;
                if (typeof message.noEcho !== "boolean")
                    return "noEcho: boolean expected";
            }
            return null;
        };

        /**
         * Creates a SendToGroupMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof UpstreamMessage.SendToGroupMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {UpstreamMessage.SendToGroupMessage} SendToGroupMessage
         */
        SendToGroupMessage.fromObject = function fromObject(object, long) {
            if (object instanceof $root.UpstreamMessage.SendToGroupMessage)
                return object;
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.UpstreamMessage.SendToGroupMessage();
            if (object.group != null)
                message.group = String(object.group);
            if (object.ackId != null)
                if ($util.Long)
                    (message.ackId = $util.Long.fromValue(object.ackId)).unsigned = true;
                else if (typeof object.ackId === "string")
                    message.ackId = parseInt(object.ackId, 10);
                else if (typeof object.ackId === "number")
                    message.ackId = object.ackId;
                else if (typeof object.ackId === "object")
                    message.ackId = new $util.LongBits(object.ackId.low >>> 0, object.ackId.high >>> 0).toNumber(true);
            if (object.data != null) {
                if (typeof object.data !== "object")
                    throw TypeError(".UpstreamMessage.SendToGroupMessage.data: object expected");
                message.data = $root.MessageData.fromObject(object.data, long + 1);
            }
            if (object.noEcho != null)
                message.noEcho = Boolean(object.noEcho);
            return message;
        };

        /**
         * Creates a plain object from a SendToGroupMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof UpstreamMessage.SendToGroupMessage
         * @static
         * @param {UpstreamMessage.SendToGroupMessage} message SendToGroupMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SendToGroupMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.group = "";
                object.data = null;
            }
            if (message.group != null && message.hasOwnProperty("group"))
                object.group = message.group;
            if (message.ackId != null && message.hasOwnProperty("ackId")) {
                if (typeof message.ackId === "number")
                    object.ackId = options.longs === String ? String(message.ackId) : message.ackId;
                else
                    object.ackId = options.longs === String ? $util.Long.prototype.toString.call(message.ackId) : options.longs === Number ? new $util.LongBits(message.ackId.low >>> 0, message.ackId.high >>> 0).toNumber(true) : message.ackId;
                if (options.oneofs)
                    object._ackId = "ackId";
            }
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = $root.MessageData.toObject(message.data, options);
            if (message.noEcho != null && message.hasOwnProperty("noEcho")) {
                object.noEcho = message.noEcho;
                if (options.oneofs)
                    object._noEcho = "noEcho";
            }
            return object;
        };

        /**
         * Converts this SendToGroupMessage to JSON.
         * @function toJSON
         * @memberof UpstreamMessage.SendToGroupMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SendToGroupMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SendToGroupMessage
         * @function getTypeUrl
         * @memberof UpstreamMessage.SendToGroupMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SendToGroupMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/UpstreamMessage.SendToGroupMessage";
        };

        return SendToGroupMessage;
    })();

    UpstreamMessage.EventMessage = (function() {

        /**
         * Properties of an EventMessage.
         * @memberof UpstreamMessage
         * @interface IEventMessage
         * @property {string|null} [event] EventMessage event
         * @property {IMessageData|null} [data] EventMessage data
         * @property {number|Long|null} [ackId] EventMessage ackId
         */

        /**
         * Constructs a new EventMessage.
         * @memberof UpstreamMessage
         * @classdesc Represents an EventMessage.
         * @implements IEventMessage
         * @constructor
         * @param {UpstreamMessage.IEventMessage=} [properties] Properties to set
         */
        function EventMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EventMessage event.
         * @member {string} event
         * @memberof UpstreamMessage.EventMessage
         * @instance
         */
        EventMessage.prototype.event = "";

        /**
         * EventMessage data.
         * @member {IMessageData|null|undefined} data
         * @memberof UpstreamMessage.EventMessage
         * @instance
         */
        EventMessage.prototype.data = null;

        /**
         * EventMessage ackId.
         * @member {number|Long|null|undefined} ackId
         * @memberof UpstreamMessage.EventMessage
         * @instance
         */
        EventMessage.prototype.ackId = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(EventMessage.prototype, "_ackId", {
            get: $util.oneOfGetter($oneOfFields = ["ackId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new EventMessage instance using the specified properties.
         * @function create
         * @memberof UpstreamMessage.EventMessage
         * @static
         * @param {UpstreamMessage.IEventMessage=} [properties] Properties to set
         * @returns {UpstreamMessage.EventMessage} EventMessage instance
         */
        EventMessage.create = function create(properties) {
            return new EventMessage(properties);
        };

        /**
         * Encodes the specified EventMessage message. Does not implicitly {@link UpstreamMessage.EventMessage.verify|verify} messages.
         * @function encode
         * @memberof UpstreamMessage.EventMessage
         * @static
         * @param {UpstreamMessage.IEventMessage} message EventMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EventMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.event != null && Object.hasOwnProperty.call(message, "event"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.event);
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                $root.MessageData.encode(message.data, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.ackId != null && Object.hasOwnProperty.call(message, "ackId"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.ackId);
            return writer;
        };

        /**
         * Encodes the specified EventMessage message, length delimited. Does not implicitly {@link UpstreamMessage.EventMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof UpstreamMessage.EventMessage
         * @static
         * @param {UpstreamMessage.IEventMessage} message EventMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EventMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EventMessage message from the specified reader or buffer.
         * @function decode
         * @memberof UpstreamMessage.EventMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {UpstreamMessage.EventMessage} EventMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EventMessage.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.UpstreamMessage.EventMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.event = reader.string();
                        break;
                    }
                case 2: {
                        message.data = $root.MessageData.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 3: {
                        message.ackId = reader.uint64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an EventMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof UpstreamMessage.EventMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {UpstreamMessage.EventMessage} EventMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EventMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EventMessage message.
         * @function verify
         * @memberof UpstreamMessage.EventMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EventMessage.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            let properties = {};
            if (message.event != null && message.hasOwnProperty("event"))
                if (!$util.isString(message.event))
                    return "event: string expected";
            if (message.data != null && message.hasOwnProperty("data")) {
                let error = $root.MessageData.verify(message.data, long + 1);
                if (error)
                    return "data." + error;
            }
            if (message.ackId != null && message.hasOwnProperty("ackId")) {
                properties._ackId = 1;
                if (!$util.isInteger(message.ackId) && !(message.ackId && $util.isInteger(message.ackId.low) && $util.isInteger(message.ackId.high)))
                    return "ackId: integer|Long expected";
            }
            return null;
        };

        /**
         * Creates an EventMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof UpstreamMessage.EventMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {UpstreamMessage.EventMessage} EventMessage
         */
        EventMessage.fromObject = function fromObject(object, long) {
            if (object instanceof $root.UpstreamMessage.EventMessage)
                return object;
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.UpstreamMessage.EventMessage();
            if (object.event != null)
                message.event = String(object.event);
            if (object.data != null) {
                if (typeof object.data !== "object")
                    throw TypeError(".UpstreamMessage.EventMessage.data: object expected");
                message.data = $root.MessageData.fromObject(object.data, long + 1);
            }
            if (object.ackId != null)
                if ($util.Long)
                    (message.ackId = $util.Long.fromValue(object.ackId)).unsigned = true;
                else if (typeof object.ackId === "string")
                    message.ackId = parseInt(object.ackId, 10);
                else if (typeof object.ackId === "number")
                    message.ackId = object.ackId;
                else if (typeof object.ackId === "object")
                    message.ackId = new $util.LongBits(object.ackId.low >>> 0, object.ackId.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from an EventMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof UpstreamMessage.EventMessage
         * @static
         * @param {UpstreamMessage.EventMessage} message EventMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EventMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.event = "";
                object.data = null;
            }
            if (message.event != null && message.hasOwnProperty("event"))
                object.event = message.event;
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = $root.MessageData.toObject(message.data, options);
            if (message.ackId != null && message.hasOwnProperty("ackId")) {
                if (typeof message.ackId === "number")
                    object.ackId = options.longs === String ? String(message.ackId) : message.ackId;
                else
                    object.ackId = options.longs === String ? $util.Long.prototype.toString.call(message.ackId) : options.longs === Number ? new $util.LongBits(message.ackId.low >>> 0, message.ackId.high >>> 0).toNumber(true) : message.ackId;
                if (options.oneofs)
                    object._ackId = "ackId";
            }
            return object;
        };

        /**
         * Converts this EventMessage to JSON.
         * @function toJSON
         * @memberof UpstreamMessage.EventMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EventMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for EventMessage
         * @function getTypeUrl
         * @memberof UpstreamMessage.EventMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        EventMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/UpstreamMessage.EventMessage";
        };

        return EventMessage;
    })();

    UpstreamMessage.JoinGroupMessage = (function() {

        /**
         * Properties of a JoinGroupMessage.
         * @memberof UpstreamMessage
         * @interface IJoinGroupMessage
         * @property {string|null} [group] JoinGroupMessage group
         * @property {number|Long|null} [ackId] JoinGroupMessage ackId
         */

        /**
         * Constructs a new JoinGroupMessage.
         * @memberof UpstreamMessage
         * @classdesc Represents a JoinGroupMessage.
         * @implements IJoinGroupMessage
         * @constructor
         * @param {UpstreamMessage.IJoinGroupMessage=} [properties] Properties to set
         */
        function JoinGroupMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * JoinGroupMessage group.
         * @member {string} group
         * @memberof UpstreamMessage.JoinGroupMessage
         * @instance
         */
        JoinGroupMessage.prototype.group = "";

        /**
         * JoinGroupMessage ackId.
         * @member {number|Long|null|undefined} ackId
         * @memberof UpstreamMessage.JoinGroupMessage
         * @instance
         */
        JoinGroupMessage.prototype.ackId = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(JoinGroupMessage.prototype, "_ackId", {
            get: $util.oneOfGetter($oneOfFields = ["ackId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new JoinGroupMessage instance using the specified properties.
         * @function create
         * @memberof UpstreamMessage.JoinGroupMessage
         * @static
         * @param {UpstreamMessage.IJoinGroupMessage=} [properties] Properties to set
         * @returns {UpstreamMessage.JoinGroupMessage} JoinGroupMessage instance
         */
        JoinGroupMessage.create = function create(properties) {
            return new JoinGroupMessage(properties);
        };

        /**
         * Encodes the specified JoinGroupMessage message. Does not implicitly {@link UpstreamMessage.JoinGroupMessage.verify|verify} messages.
         * @function encode
         * @memberof UpstreamMessage.JoinGroupMessage
         * @static
         * @param {UpstreamMessage.IJoinGroupMessage} message JoinGroupMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        JoinGroupMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.group != null && Object.hasOwnProperty.call(message, "group"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.group);
            if (message.ackId != null && Object.hasOwnProperty.call(message, "ackId"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.ackId);
            return writer;
        };

        /**
         * Encodes the specified JoinGroupMessage message, length delimited. Does not implicitly {@link UpstreamMessage.JoinGroupMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof UpstreamMessage.JoinGroupMessage
         * @static
         * @param {UpstreamMessage.IJoinGroupMessage} message JoinGroupMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        JoinGroupMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a JoinGroupMessage message from the specified reader or buffer.
         * @function decode
         * @memberof UpstreamMessage.JoinGroupMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {UpstreamMessage.JoinGroupMessage} JoinGroupMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        JoinGroupMessage.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.UpstreamMessage.JoinGroupMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.group = reader.string();
                        break;
                    }
                case 2: {
                        message.ackId = reader.uint64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a JoinGroupMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof UpstreamMessage.JoinGroupMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {UpstreamMessage.JoinGroupMessage} JoinGroupMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        JoinGroupMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a JoinGroupMessage message.
         * @function verify
         * @memberof UpstreamMessage.JoinGroupMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        JoinGroupMessage.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            let properties = {};
            if (message.group != null && message.hasOwnProperty("group"))
                if (!$util.isString(message.group))
                    return "group: string expected";
            if (message.ackId != null && message.hasOwnProperty("ackId")) {
                properties._ackId = 1;
                if (!$util.isInteger(message.ackId) && !(message.ackId && $util.isInteger(message.ackId.low) && $util.isInteger(message.ackId.high)))
                    return "ackId: integer|Long expected";
            }
            return null;
        };

        /**
         * Creates a JoinGroupMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof UpstreamMessage.JoinGroupMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {UpstreamMessage.JoinGroupMessage} JoinGroupMessage
         */
        JoinGroupMessage.fromObject = function fromObject(object, long) {
            if (object instanceof $root.UpstreamMessage.JoinGroupMessage)
                return object;
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.UpstreamMessage.JoinGroupMessage();
            if (object.group != null)
                message.group = String(object.group);
            if (object.ackId != null)
                if ($util.Long)
                    (message.ackId = $util.Long.fromValue(object.ackId)).unsigned = true;
                else if (typeof object.ackId === "string")
                    message.ackId = parseInt(object.ackId, 10);
                else if (typeof object.ackId === "number")
                    message.ackId = object.ackId;
                else if (typeof object.ackId === "object")
                    message.ackId = new $util.LongBits(object.ackId.low >>> 0, object.ackId.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a JoinGroupMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof UpstreamMessage.JoinGroupMessage
         * @static
         * @param {UpstreamMessage.JoinGroupMessage} message JoinGroupMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        JoinGroupMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.group = "";
            if (message.group != null && message.hasOwnProperty("group"))
                object.group = message.group;
            if (message.ackId != null && message.hasOwnProperty("ackId")) {
                if (typeof message.ackId === "number")
                    object.ackId = options.longs === String ? String(message.ackId) : message.ackId;
                else
                    object.ackId = options.longs === String ? $util.Long.prototype.toString.call(message.ackId) : options.longs === Number ? new $util.LongBits(message.ackId.low >>> 0, message.ackId.high >>> 0).toNumber(true) : message.ackId;
                if (options.oneofs)
                    object._ackId = "ackId";
            }
            return object;
        };

        /**
         * Converts this JoinGroupMessage to JSON.
         * @function toJSON
         * @memberof UpstreamMessage.JoinGroupMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        JoinGroupMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for JoinGroupMessage
         * @function getTypeUrl
         * @memberof UpstreamMessage.JoinGroupMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        JoinGroupMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/UpstreamMessage.JoinGroupMessage";
        };

        return JoinGroupMessage;
    })();

    UpstreamMessage.LeaveGroupMessage = (function() {

        /**
         * Properties of a LeaveGroupMessage.
         * @memberof UpstreamMessage
         * @interface ILeaveGroupMessage
         * @property {string|null} [group] LeaveGroupMessage group
         * @property {number|Long|null} [ackId] LeaveGroupMessage ackId
         */

        /**
         * Constructs a new LeaveGroupMessage.
         * @memberof UpstreamMessage
         * @classdesc Represents a LeaveGroupMessage.
         * @implements ILeaveGroupMessage
         * @constructor
         * @param {UpstreamMessage.ILeaveGroupMessage=} [properties] Properties to set
         */
        function LeaveGroupMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LeaveGroupMessage group.
         * @member {string} group
         * @memberof UpstreamMessage.LeaveGroupMessage
         * @instance
         */
        LeaveGroupMessage.prototype.group = "";

        /**
         * LeaveGroupMessage ackId.
         * @member {number|Long|null|undefined} ackId
         * @memberof UpstreamMessage.LeaveGroupMessage
         * @instance
         */
        LeaveGroupMessage.prototype.ackId = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(LeaveGroupMessage.prototype, "_ackId", {
            get: $util.oneOfGetter($oneOfFields = ["ackId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new LeaveGroupMessage instance using the specified properties.
         * @function create
         * @memberof UpstreamMessage.LeaveGroupMessage
         * @static
         * @param {UpstreamMessage.ILeaveGroupMessage=} [properties] Properties to set
         * @returns {UpstreamMessage.LeaveGroupMessage} LeaveGroupMessage instance
         */
        LeaveGroupMessage.create = function create(properties) {
            return new LeaveGroupMessage(properties);
        };

        /**
         * Encodes the specified LeaveGroupMessage message. Does not implicitly {@link UpstreamMessage.LeaveGroupMessage.verify|verify} messages.
         * @function encode
         * @memberof UpstreamMessage.LeaveGroupMessage
         * @static
         * @param {UpstreamMessage.ILeaveGroupMessage} message LeaveGroupMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LeaveGroupMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.group != null && Object.hasOwnProperty.call(message, "group"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.group);
            if (message.ackId != null && Object.hasOwnProperty.call(message, "ackId"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.ackId);
            return writer;
        };

        /**
         * Encodes the specified LeaveGroupMessage message, length delimited. Does not implicitly {@link UpstreamMessage.LeaveGroupMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof UpstreamMessage.LeaveGroupMessage
         * @static
         * @param {UpstreamMessage.ILeaveGroupMessage} message LeaveGroupMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LeaveGroupMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LeaveGroupMessage message from the specified reader or buffer.
         * @function decode
         * @memberof UpstreamMessage.LeaveGroupMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {UpstreamMessage.LeaveGroupMessage} LeaveGroupMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LeaveGroupMessage.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.UpstreamMessage.LeaveGroupMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.group = reader.string();
                        break;
                    }
                case 2: {
                        message.ackId = reader.uint64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a LeaveGroupMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof UpstreamMessage.LeaveGroupMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {UpstreamMessage.LeaveGroupMessage} LeaveGroupMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LeaveGroupMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LeaveGroupMessage message.
         * @function verify
         * @memberof UpstreamMessage.LeaveGroupMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LeaveGroupMessage.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            let properties = {};
            if (message.group != null && message.hasOwnProperty("group"))
                if (!$util.isString(message.group))
                    return "group: string expected";
            if (message.ackId != null && message.hasOwnProperty("ackId")) {
                properties._ackId = 1;
                if (!$util.isInteger(message.ackId) && !(message.ackId && $util.isInteger(message.ackId.low) && $util.isInteger(message.ackId.high)))
                    return "ackId: integer|Long expected";
            }
            return null;
        };

        /**
         * Creates a LeaveGroupMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof UpstreamMessage.LeaveGroupMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {UpstreamMessage.LeaveGroupMessage} LeaveGroupMessage
         */
        LeaveGroupMessage.fromObject = function fromObject(object, long) {
            if (object instanceof $root.UpstreamMessage.LeaveGroupMessage)
                return object;
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.UpstreamMessage.LeaveGroupMessage();
            if (object.group != null)
                message.group = String(object.group);
            if (object.ackId != null)
                if ($util.Long)
                    (message.ackId = $util.Long.fromValue(object.ackId)).unsigned = true;
                else if (typeof object.ackId === "string")
                    message.ackId = parseInt(object.ackId, 10);
                else if (typeof object.ackId === "number")
                    message.ackId = object.ackId;
                else if (typeof object.ackId === "object")
                    message.ackId = new $util.LongBits(object.ackId.low >>> 0, object.ackId.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a LeaveGroupMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof UpstreamMessage.LeaveGroupMessage
         * @static
         * @param {UpstreamMessage.LeaveGroupMessage} message LeaveGroupMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LeaveGroupMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.group = "";
            if (message.group != null && message.hasOwnProperty("group"))
                object.group = message.group;
            if (message.ackId != null && message.hasOwnProperty("ackId")) {
                if (typeof message.ackId === "number")
                    object.ackId = options.longs === String ? String(message.ackId) : message.ackId;
                else
                    object.ackId = options.longs === String ? $util.Long.prototype.toString.call(message.ackId) : options.longs === Number ? new $util.LongBits(message.ackId.low >>> 0, message.ackId.high >>> 0).toNumber(true) : message.ackId;
                if (options.oneofs)
                    object._ackId = "ackId";
            }
            return object;
        };

        /**
         * Converts this LeaveGroupMessage to JSON.
         * @function toJSON
         * @memberof UpstreamMessage.LeaveGroupMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LeaveGroupMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for LeaveGroupMessage
         * @function getTypeUrl
         * @memberof UpstreamMessage.LeaveGroupMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        LeaveGroupMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/UpstreamMessage.LeaveGroupMessage";
        };

        return LeaveGroupMessage;
    })();

    UpstreamMessage.SequenceAckMessage = (function() {

        /**
         * Properties of a SequenceAckMessage.
         * @memberof UpstreamMessage
         * @interface ISequenceAckMessage
         * @property {number|Long|null} [sequenceId] SequenceAckMessage sequenceId
         */

        /**
         * Constructs a new SequenceAckMessage.
         * @memberof UpstreamMessage
         * @classdesc Represents a SequenceAckMessage.
         * @implements ISequenceAckMessage
         * @constructor
         * @param {UpstreamMessage.ISequenceAckMessage=} [properties] Properties to set
         */
        function SequenceAckMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SequenceAckMessage sequenceId.
         * @member {number|Long} sequenceId
         * @memberof UpstreamMessage.SequenceAckMessage
         * @instance
         */
        SequenceAckMessage.prototype.sequenceId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new SequenceAckMessage instance using the specified properties.
         * @function create
         * @memberof UpstreamMessage.SequenceAckMessage
         * @static
         * @param {UpstreamMessage.ISequenceAckMessage=} [properties] Properties to set
         * @returns {UpstreamMessage.SequenceAckMessage} SequenceAckMessage instance
         */
        SequenceAckMessage.create = function create(properties) {
            return new SequenceAckMessage(properties);
        };

        /**
         * Encodes the specified SequenceAckMessage message. Does not implicitly {@link UpstreamMessage.SequenceAckMessage.verify|verify} messages.
         * @function encode
         * @memberof UpstreamMessage.SequenceAckMessage
         * @static
         * @param {UpstreamMessage.ISequenceAckMessage} message SequenceAckMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SequenceAckMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.sequenceId != null && Object.hasOwnProperty.call(message, "sequenceId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.sequenceId);
            return writer;
        };

        /**
         * Encodes the specified SequenceAckMessage message, length delimited. Does not implicitly {@link UpstreamMessage.SequenceAckMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof UpstreamMessage.SequenceAckMessage
         * @static
         * @param {UpstreamMessage.ISequenceAckMessage} message SequenceAckMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SequenceAckMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SequenceAckMessage message from the specified reader or buffer.
         * @function decode
         * @memberof UpstreamMessage.SequenceAckMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {UpstreamMessage.SequenceAckMessage} SequenceAckMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SequenceAckMessage.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.UpstreamMessage.SequenceAckMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.sequenceId = reader.uint64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SequenceAckMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof UpstreamMessage.SequenceAckMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {UpstreamMessage.SequenceAckMessage} SequenceAckMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SequenceAckMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SequenceAckMessage message.
         * @function verify
         * @memberof UpstreamMessage.SequenceAckMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SequenceAckMessage.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.sequenceId != null && message.hasOwnProperty("sequenceId"))
                if (!$util.isInteger(message.sequenceId) && !(message.sequenceId && $util.isInteger(message.sequenceId.low) && $util.isInteger(message.sequenceId.high)))
                    return "sequenceId: integer|Long expected";
            return null;
        };

        /**
         * Creates a SequenceAckMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof UpstreamMessage.SequenceAckMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {UpstreamMessage.SequenceAckMessage} SequenceAckMessage
         */
        SequenceAckMessage.fromObject = function fromObject(object, long) {
            if (object instanceof $root.UpstreamMessage.SequenceAckMessage)
                return object;
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.UpstreamMessage.SequenceAckMessage();
            if (object.sequenceId != null)
                if ($util.Long)
                    (message.sequenceId = $util.Long.fromValue(object.sequenceId)).unsigned = true;
                else if (typeof object.sequenceId === "string")
                    message.sequenceId = parseInt(object.sequenceId, 10);
                else if (typeof object.sequenceId === "number")
                    message.sequenceId = object.sequenceId;
                else if (typeof object.sequenceId === "object")
                    message.sequenceId = new $util.LongBits(object.sequenceId.low >>> 0, object.sequenceId.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a SequenceAckMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof UpstreamMessage.SequenceAckMessage
         * @static
         * @param {UpstreamMessage.SequenceAckMessage} message SequenceAckMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SequenceAckMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.sequenceId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.sequenceId = options.longs === String ? "0" : 0;
            if (message.sequenceId != null && message.hasOwnProperty("sequenceId"))
                if (typeof message.sequenceId === "number")
                    object.sequenceId = options.longs === String ? String(message.sequenceId) : message.sequenceId;
                else
                    object.sequenceId = options.longs === String ? $util.Long.prototype.toString.call(message.sequenceId) : options.longs === Number ? new $util.LongBits(message.sequenceId.low >>> 0, message.sequenceId.high >>> 0).toNumber(true) : message.sequenceId;
            return object;
        };

        /**
         * Converts this SequenceAckMessage to JSON.
         * @function toJSON
         * @memberof UpstreamMessage.SequenceAckMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SequenceAckMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SequenceAckMessage
         * @function getTypeUrl
         * @memberof UpstreamMessage.SequenceAckMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SequenceAckMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/UpstreamMessage.SequenceAckMessage";
        };

        return SequenceAckMessage;
    })();

    UpstreamMessage.SetGroupStateMessage = (function() {

        /**
         * Properties of a SetGroupStateMessage.
         * @memberof UpstreamMessage
         * @interface ISetGroupStateMessage
         * @property {string|null} [group] SetGroupStateMessage group
         * @property {number|Long|null} [ackId] SetGroupStateMessage ackId
         * @property {GroupStateItem.IGroupState|null} [state] SetGroupStateMessage state
         */

        /**
         * Constructs a new SetGroupStateMessage.
         * @memberof UpstreamMessage
         * @classdesc Represents a SetGroupStateMessage.
         * @implements ISetGroupStateMessage
         * @constructor
         * @param {UpstreamMessage.ISetGroupStateMessage=} [properties] Properties to set
         */
        function SetGroupStateMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SetGroupStateMessage group.
         * @member {string} group
         * @memberof UpstreamMessage.SetGroupStateMessage
         * @instance
         */
        SetGroupStateMessage.prototype.group = "";

        /**
         * SetGroupStateMessage ackId.
         * @member {number|Long|null|undefined} ackId
         * @memberof UpstreamMessage.SetGroupStateMessage
         * @instance
         */
        SetGroupStateMessage.prototype.ackId = null;

        /**
         * SetGroupStateMessage state.
         * @member {GroupStateItem.IGroupState|null|undefined} state
         * @memberof UpstreamMessage.SetGroupStateMessage
         * @instance
         */
        SetGroupStateMessage.prototype.state = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(SetGroupStateMessage.prototype, "_ackId", {
            get: $util.oneOfGetter($oneOfFields = ["ackId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(SetGroupStateMessage.prototype, "_state", {
            get: $util.oneOfGetter($oneOfFields = ["state"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new SetGroupStateMessage instance using the specified properties.
         * @function create
         * @memberof UpstreamMessage.SetGroupStateMessage
         * @static
         * @param {UpstreamMessage.ISetGroupStateMessage=} [properties] Properties to set
         * @returns {UpstreamMessage.SetGroupStateMessage} SetGroupStateMessage instance
         */
        SetGroupStateMessage.create = function create(properties) {
            return new SetGroupStateMessage(properties);
        };

        /**
         * Encodes the specified SetGroupStateMessage message. Does not implicitly {@link UpstreamMessage.SetGroupStateMessage.verify|verify} messages.
         * @function encode
         * @memberof UpstreamMessage.SetGroupStateMessage
         * @static
         * @param {UpstreamMessage.ISetGroupStateMessage} message SetGroupStateMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SetGroupStateMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.group != null && Object.hasOwnProperty.call(message, "group"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.group);
            if (message.ackId != null && Object.hasOwnProperty.call(message, "ackId"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.ackId);
            if (message.state != null && Object.hasOwnProperty.call(message, "state"))
                $root.GroupStateItem.GroupState.encode(message.state, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified SetGroupStateMessage message, length delimited. Does not implicitly {@link UpstreamMessage.SetGroupStateMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof UpstreamMessage.SetGroupStateMessage
         * @static
         * @param {UpstreamMessage.ISetGroupStateMessage} message SetGroupStateMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SetGroupStateMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SetGroupStateMessage message from the specified reader or buffer.
         * @function decode
         * @memberof UpstreamMessage.SetGroupStateMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {UpstreamMessage.SetGroupStateMessage} SetGroupStateMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SetGroupStateMessage.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.UpstreamMessage.SetGroupStateMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.group = reader.string();
                        break;
                    }
                case 2: {
                        message.ackId = reader.uint64();
                        break;
                    }
                case 3: {
                        message.state = $root.GroupStateItem.GroupState.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SetGroupStateMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof UpstreamMessage.SetGroupStateMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {UpstreamMessage.SetGroupStateMessage} SetGroupStateMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SetGroupStateMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SetGroupStateMessage message.
         * @function verify
         * @memberof UpstreamMessage.SetGroupStateMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SetGroupStateMessage.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            let properties = {};
            if (message.group != null && message.hasOwnProperty("group"))
                if (!$util.isString(message.group))
                    return "group: string expected";
            if (message.ackId != null && message.hasOwnProperty("ackId")) {
                properties._ackId = 1;
                if (!$util.isInteger(message.ackId) && !(message.ackId && $util.isInteger(message.ackId.low) && $util.isInteger(message.ackId.high)))
                    return "ackId: integer|Long expected";
            }
            if (message.state != null && message.hasOwnProperty("state")) {
                properties._state = 1;
                {
                    let error = $root.GroupStateItem.GroupState.verify(message.state, long + 1);
                    if (error)
                        return "state." + error;
                }
            }
            return null;
        };

        /**
         * Creates a SetGroupStateMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof UpstreamMessage.SetGroupStateMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {UpstreamMessage.SetGroupStateMessage} SetGroupStateMessage
         */
        SetGroupStateMessage.fromObject = function fromObject(object, long) {
            if (object instanceof $root.UpstreamMessage.SetGroupStateMessage)
                return object;
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.UpstreamMessage.SetGroupStateMessage();
            if (object.group != null)
                message.group = String(object.group);
            if (object.ackId != null)
                if ($util.Long)
                    (message.ackId = $util.Long.fromValue(object.ackId)).unsigned = true;
                else if (typeof object.ackId === "string")
                    message.ackId = parseInt(object.ackId, 10);
                else if (typeof object.ackId === "number")
                    message.ackId = object.ackId;
                else if (typeof object.ackId === "object")
                    message.ackId = new $util.LongBits(object.ackId.low >>> 0, object.ackId.high >>> 0).toNumber(true);
            if (object.state != null) {
                if (typeof object.state !== "object")
                    throw TypeError(".UpstreamMessage.SetGroupStateMessage.state: object expected");
                message.state = $root.GroupStateItem.GroupState.fromObject(object.state, long + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a SetGroupStateMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof UpstreamMessage.SetGroupStateMessage
         * @static
         * @param {UpstreamMessage.SetGroupStateMessage} message SetGroupStateMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SetGroupStateMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.group = "";
            if (message.group != null && message.hasOwnProperty("group"))
                object.group = message.group;
            if (message.ackId != null && message.hasOwnProperty("ackId")) {
                if (typeof message.ackId === "number")
                    object.ackId = options.longs === String ? String(message.ackId) : message.ackId;
                else
                    object.ackId = options.longs === String ? $util.Long.prototype.toString.call(message.ackId) : options.longs === Number ? new $util.LongBits(message.ackId.low >>> 0, message.ackId.high >>> 0).toNumber(true) : message.ackId;
                if (options.oneofs)
                    object._ackId = "ackId";
            }
            if (message.state != null && message.hasOwnProperty("state")) {
                object.state = $root.GroupStateItem.GroupState.toObject(message.state, options);
                if (options.oneofs)
                    object._state = "state";
            }
            return object;
        };

        /**
         * Converts this SetGroupStateMessage to JSON.
         * @function toJSON
         * @memberof UpstreamMessage.SetGroupStateMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SetGroupStateMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SetGroupStateMessage
         * @function getTypeUrl
         * @memberof UpstreamMessage.SetGroupStateMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SetGroupStateMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/UpstreamMessage.SetGroupStateMessage";
        };

        return SetGroupStateMessage;
    })();

    UpstreamMessage.SubscribeGroupStateMessage = (function() {

        /**
         * Properties of a SubscribeGroupStateMessage.
         * @memberof UpstreamMessage
         * @interface ISubscribeGroupStateMessage
         * @property {string|null} [group] SubscribeGroupStateMessage group
         * @property {number|Long|null} [ackId] SubscribeGroupStateMessage ackId
         */

        /**
         * Constructs a new SubscribeGroupStateMessage.
         * @memberof UpstreamMessage
         * @classdesc Represents a SubscribeGroupStateMessage.
         * @implements ISubscribeGroupStateMessage
         * @constructor
         * @param {UpstreamMessage.ISubscribeGroupStateMessage=} [properties] Properties to set
         */
        function SubscribeGroupStateMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SubscribeGroupStateMessage group.
         * @member {string} group
         * @memberof UpstreamMessage.SubscribeGroupStateMessage
         * @instance
         */
        SubscribeGroupStateMessage.prototype.group = "";

        /**
         * SubscribeGroupStateMessage ackId.
         * @member {number|Long|null|undefined} ackId
         * @memberof UpstreamMessage.SubscribeGroupStateMessage
         * @instance
         */
        SubscribeGroupStateMessage.prototype.ackId = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(SubscribeGroupStateMessage.prototype, "_ackId", {
            get: $util.oneOfGetter($oneOfFields = ["ackId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new SubscribeGroupStateMessage instance using the specified properties.
         * @function create
         * @memberof UpstreamMessage.SubscribeGroupStateMessage
         * @static
         * @param {UpstreamMessage.ISubscribeGroupStateMessage=} [properties] Properties to set
         * @returns {UpstreamMessage.SubscribeGroupStateMessage} SubscribeGroupStateMessage instance
         */
        SubscribeGroupStateMessage.create = function create(properties) {
            return new SubscribeGroupStateMessage(properties);
        };

        /**
         * Encodes the specified SubscribeGroupStateMessage message. Does not implicitly {@link UpstreamMessage.SubscribeGroupStateMessage.verify|verify} messages.
         * @function encode
         * @memberof UpstreamMessage.SubscribeGroupStateMessage
         * @static
         * @param {UpstreamMessage.ISubscribeGroupStateMessage} message SubscribeGroupStateMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SubscribeGroupStateMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.group != null && Object.hasOwnProperty.call(message, "group"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.group);
            if (message.ackId != null && Object.hasOwnProperty.call(message, "ackId"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.ackId);
            return writer;
        };

        /**
         * Encodes the specified SubscribeGroupStateMessage message, length delimited. Does not implicitly {@link UpstreamMessage.SubscribeGroupStateMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof UpstreamMessage.SubscribeGroupStateMessage
         * @static
         * @param {UpstreamMessage.ISubscribeGroupStateMessage} message SubscribeGroupStateMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SubscribeGroupStateMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SubscribeGroupStateMessage message from the specified reader or buffer.
         * @function decode
         * @memberof UpstreamMessage.SubscribeGroupStateMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {UpstreamMessage.SubscribeGroupStateMessage} SubscribeGroupStateMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SubscribeGroupStateMessage.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.UpstreamMessage.SubscribeGroupStateMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.group = reader.string();
                        break;
                    }
                case 2: {
                        message.ackId = reader.uint64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SubscribeGroupStateMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof UpstreamMessage.SubscribeGroupStateMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {UpstreamMessage.SubscribeGroupStateMessage} SubscribeGroupStateMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SubscribeGroupStateMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SubscribeGroupStateMessage message.
         * @function verify
         * @memberof UpstreamMessage.SubscribeGroupStateMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SubscribeGroupStateMessage.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            let properties = {};
            if (message.group != null && message.hasOwnProperty("group"))
                if (!$util.isString(message.group))
                    return "group: string expected";
            if (message.ackId != null && message.hasOwnProperty("ackId")) {
                properties._ackId = 1;
                if (!$util.isInteger(message.ackId) && !(message.ackId && $util.isInteger(message.ackId.low) && $util.isInteger(message.ackId.high)))
                    return "ackId: integer|Long expected";
            }
            return null;
        };

        /**
         * Creates a SubscribeGroupStateMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof UpstreamMessage.SubscribeGroupStateMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {UpstreamMessage.SubscribeGroupStateMessage} SubscribeGroupStateMessage
         */
        SubscribeGroupStateMessage.fromObject = function fromObject(object, long) {
            if (object instanceof $root.UpstreamMessage.SubscribeGroupStateMessage)
                return object;
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.UpstreamMessage.SubscribeGroupStateMessage();
            if (object.group != null)
                message.group = String(object.group);
            if (object.ackId != null)
                if ($util.Long)
                    (message.ackId = $util.Long.fromValue(object.ackId)).unsigned = true;
                else if (typeof object.ackId === "string")
                    message.ackId = parseInt(object.ackId, 10);
                else if (typeof object.ackId === "number")
                    message.ackId = object.ackId;
                else if (typeof object.ackId === "object")
                    message.ackId = new $util.LongBits(object.ackId.low >>> 0, object.ackId.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a SubscribeGroupStateMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof UpstreamMessage.SubscribeGroupStateMessage
         * @static
         * @param {UpstreamMessage.SubscribeGroupStateMessage} message SubscribeGroupStateMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SubscribeGroupStateMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.group = "";
            if (message.group != null && message.hasOwnProperty("group"))
                object.group = message.group;
            if (message.ackId != null && message.hasOwnProperty("ackId")) {
                if (typeof message.ackId === "number")
                    object.ackId = options.longs === String ? String(message.ackId) : message.ackId;
                else
                    object.ackId = options.longs === String ? $util.Long.prototype.toString.call(message.ackId) : options.longs === Number ? new $util.LongBits(message.ackId.low >>> 0, message.ackId.high >>> 0).toNumber(true) : message.ackId;
                if (options.oneofs)
                    object._ackId = "ackId";
            }
            return object;
        };

        /**
         * Converts this SubscribeGroupStateMessage to JSON.
         * @function toJSON
         * @memberof UpstreamMessage.SubscribeGroupStateMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SubscribeGroupStateMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SubscribeGroupStateMessage
         * @function getTypeUrl
         * @memberof UpstreamMessage.SubscribeGroupStateMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SubscribeGroupStateMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/UpstreamMessage.SubscribeGroupStateMessage";
        };

        return SubscribeGroupStateMessage;
    })();

    UpstreamMessage.UnsubscribeGroupStateMessage = (function() {

        /**
         * Properties of an UnsubscribeGroupStateMessage.
         * @memberof UpstreamMessage
         * @interface IUnsubscribeGroupStateMessage
         * @property {string|null} [group] UnsubscribeGroupStateMessage group
         * @property {number|Long|null} [ackId] UnsubscribeGroupStateMessage ackId
         */

        /**
         * Constructs a new UnsubscribeGroupStateMessage.
         * @memberof UpstreamMessage
         * @classdesc Represents an UnsubscribeGroupStateMessage.
         * @implements IUnsubscribeGroupStateMessage
         * @constructor
         * @param {UpstreamMessage.IUnsubscribeGroupStateMessage=} [properties] Properties to set
         */
        function UnsubscribeGroupStateMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UnsubscribeGroupStateMessage group.
         * @member {string} group
         * @memberof UpstreamMessage.UnsubscribeGroupStateMessage
         * @instance
         */
        UnsubscribeGroupStateMessage.prototype.group = "";

        /**
         * UnsubscribeGroupStateMessage ackId.
         * @member {number|Long|null|undefined} ackId
         * @memberof UpstreamMessage.UnsubscribeGroupStateMessage
         * @instance
         */
        UnsubscribeGroupStateMessage.prototype.ackId = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(UnsubscribeGroupStateMessage.prototype, "_ackId", {
            get: $util.oneOfGetter($oneOfFields = ["ackId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new UnsubscribeGroupStateMessage instance using the specified properties.
         * @function create
         * @memberof UpstreamMessage.UnsubscribeGroupStateMessage
         * @static
         * @param {UpstreamMessage.IUnsubscribeGroupStateMessage=} [properties] Properties to set
         * @returns {UpstreamMessage.UnsubscribeGroupStateMessage} UnsubscribeGroupStateMessage instance
         */
        UnsubscribeGroupStateMessage.create = function create(properties) {
            return new UnsubscribeGroupStateMessage(properties);
        };

        /**
         * Encodes the specified UnsubscribeGroupStateMessage message. Does not implicitly {@link UpstreamMessage.UnsubscribeGroupStateMessage.verify|verify} messages.
         * @function encode
         * @memberof UpstreamMessage.UnsubscribeGroupStateMessage
         * @static
         * @param {UpstreamMessage.IUnsubscribeGroupStateMessage} message UnsubscribeGroupStateMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UnsubscribeGroupStateMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.group != null && Object.hasOwnProperty.call(message, "group"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.group);
            if (message.ackId != null && Object.hasOwnProperty.call(message, "ackId"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.ackId);
            return writer;
        };

        /**
         * Encodes the specified UnsubscribeGroupStateMessage message, length delimited. Does not implicitly {@link UpstreamMessage.UnsubscribeGroupStateMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof UpstreamMessage.UnsubscribeGroupStateMessage
         * @static
         * @param {UpstreamMessage.IUnsubscribeGroupStateMessage} message UnsubscribeGroupStateMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UnsubscribeGroupStateMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an UnsubscribeGroupStateMessage message from the specified reader or buffer.
         * @function decode
         * @memberof UpstreamMessage.UnsubscribeGroupStateMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {UpstreamMessage.UnsubscribeGroupStateMessage} UnsubscribeGroupStateMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UnsubscribeGroupStateMessage.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.UpstreamMessage.UnsubscribeGroupStateMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.group = reader.string();
                        break;
                    }
                case 2: {
                        message.ackId = reader.uint64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an UnsubscribeGroupStateMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof UpstreamMessage.UnsubscribeGroupStateMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {UpstreamMessage.UnsubscribeGroupStateMessage} UnsubscribeGroupStateMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UnsubscribeGroupStateMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an UnsubscribeGroupStateMessage message.
         * @function verify
         * @memberof UpstreamMessage.UnsubscribeGroupStateMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UnsubscribeGroupStateMessage.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            let properties = {};
            if (message.group != null && message.hasOwnProperty("group"))
                if (!$util.isString(message.group))
                    return "group: string expected";
            if (message.ackId != null && message.hasOwnProperty("ackId")) {
                properties._ackId = 1;
                if (!$util.isInteger(message.ackId) && !(message.ackId && $util.isInteger(message.ackId.low) && $util.isInteger(message.ackId.high)))
                    return "ackId: integer|Long expected";
            }
            return null;
        };

        /**
         * Creates an UnsubscribeGroupStateMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof UpstreamMessage.UnsubscribeGroupStateMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {UpstreamMessage.UnsubscribeGroupStateMessage} UnsubscribeGroupStateMessage
         */
        UnsubscribeGroupStateMessage.fromObject = function fromObject(object, long) {
            if (object instanceof $root.UpstreamMessage.UnsubscribeGroupStateMessage)
                return object;
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.UpstreamMessage.UnsubscribeGroupStateMessage();
            if (object.group != null)
                message.group = String(object.group);
            if (object.ackId != null)
                if ($util.Long)
                    (message.ackId = $util.Long.fromValue(object.ackId)).unsigned = true;
                else if (typeof object.ackId === "string")
                    message.ackId = parseInt(object.ackId, 10);
                else if (typeof object.ackId === "number")
                    message.ackId = object.ackId;
                else if (typeof object.ackId === "object")
                    message.ackId = new $util.LongBits(object.ackId.low >>> 0, object.ackId.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from an UnsubscribeGroupStateMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof UpstreamMessage.UnsubscribeGroupStateMessage
         * @static
         * @param {UpstreamMessage.UnsubscribeGroupStateMessage} message UnsubscribeGroupStateMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UnsubscribeGroupStateMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.group = "";
            if (message.group != null && message.hasOwnProperty("group"))
                object.group = message.group;
            if (message.ackId != null && message.hasOwnProperty("ackId")) {
                if (typeof message.ackId === "number")
                    object.ackId = options.longs === String ? String(message.ackId) : message.ackId;
                else
                    object.ackId = options.longs === String ? $util.Long.prototype.toString.call(message.ackId) : options.longs === Number ? new $util.LongBits(message.ackId.low >>> 0, message.ackId.high >>> 0).toNumber(true) : message.ackId;
                if (options.oneofs)
                    object._ackId = "ackId";
            }
            return object;
        };

        /**
         * Converts this UnsubscribeGroupStateMessage to JSON.
         * @function toJSON
         * @memberof UpstreamMessage.UnsubscribeGroupStateMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UnsubscribeGroupStateMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for UnsubscribeGroupStateMessage
         * @function getTypeUrl
         * @memberof UpstreamMessage.UnsubscribeGroupStateMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        UnsubscribeGroupStateMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/UpstreamMessage.UnsubscribeGroupStateMessage";
        };

        return UnsubscribeGroupStateMessage;
    })();

    return UpstreamMessage;
})();

export const DownstreamMessage = $root.DownstreamMessage = (() => {

    /**
     * Properties of a DownstreamMessage.
     * @exports IDownstreamMessage
     * @interface IDownstreamMessage
     * @property {DownstreamMessage.IAckMessage|null} [ackMessage] DownstreamMessage ackMessage
     * @property {DownstreamMessage.IDataMessage|null} [dataMessage] DownstreamMessage dataMessage
     * @property {DownstreamMessage.ISystemMessage|null} [systemMessage] DownstreamMessage systemMessage
     * @property {DownstreamMessage.IGroupStateUpdateMessage|null} [groupStateUpdateMessage] DownstreamMessage groupStateUpdateMessage
     * @property {DownstreamMessage.IGroupStateSnapshotMessage|null} [groupStateSnapshotMessage] DownstreamMessage groupStateSnapshotMessage
     */

    /**
     * Constructs a new DownstreamMessage.
     * @exports DownstreamMessage
     * @classdesc Represents a DownstreamMessage.
     * @implements IDownstreamMessage
     * @constructor
     * @param {IDownstreamMessage=} [properties] Properties to set
     */
    function DownstreamMessage(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * DownstreamMessage ackMessage.
     * @member {DownstreamMessage.IAckMessage|null|undefined} ackMessage
     * @memberof DownstreamMessage
     * @instance
     */
    DownstreamMessage.prototype.ackMessage = null;

    /**
     * DownstreamMessage dataMessage.
     * @member {DownstreamMessage.IDataMessage|null|undefined} dataMessage
     * @memberof DownstreamMessage
     * @instance
     */
    DownstreamMessage.prototype.dataMessage = null;

    /**
     * DownstreamMessage systemMessage.
     * @member {DownstreamMessage.ISystemMessage|null|undefined} systemMessage
     * @memberof DownstreamMessage
     * @instance
     */
    DownstreamMessage.prototype.systemMessage = null;

    /**
     * DownstreamMessage groupStateUpdateMessage.
     * @member {DownstreamMessage.IGroupStateUpdateMessage|null|undefined} groupStateUpdateMessage
     * @memberof DownstreamMessage
     * @instance
     */
    DownstreamMessage.prototype.groupStateUpdateMessage = null;

    /**
     * DownstreamMessage groupStateSnapshotMessage.
     * @member {DownstreamMessage.IGroupStateSnapshotMessage|null|undefined} groupStateSnapshotMessage
     * @memberof DownstreamMessage
     * @instance
     */
    DownstreamMessage.prototype.groupStateSnapshotMessage = null;

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields;

    /**
     * DownstreamMessage message.
     * @member {"ackMessage"|"dataMessage"|"systemMessage"|"groupStateUpdateMessage"|"groupStateSnapshotMessage"|undefined} message
     * @memberof DownstreamMessage
     * @instance
     */
    Object.defineProperty(DownstreamMessage.prototype, "message", {
        get: $util.oneOfGetter($oneOfFields = ["ackMessage", "dataMessage", "systemMessage", "groupStateUpdateMessage", "groupStateSnapshotMessage"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new DownstreamMessage instance using the specified properties.
     * @function create
     * @memberof DownstreamMessage
     * @static
     * @param {IDownstreamMessage=} [properties] Properties to set
     * @returns {DownstreamMessage} DownstreamMessage instance
     */
    DownstreamMessage.create = function create(properties) {
        return new DownstreamMessage(properties);
    };

    /**
     * Encodes the specified DownstreamMessage message. Does not implicitly {@link DownstreamMessage.verify|verify} messages.
     * @function encode
     * @memberof DownstreamMessage
     * @static
     * @param {IDownstreamMessage} message DownstreamMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DownstreamMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.ackMessage != null && Object.hasOwnProperty.call(message, "ackMessage"))
            $root.DownstreamMessage.AckMessage.encode(message.ackMessage, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.dataMessage != null && Object.hasOwnProperty.call(message, "dataMessage"))
            $root.DownstreamMessage.DataMessage.encode(message.dataMessage, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.systemMessage != null && Object.hasOwnProperty.call(message, "systemMessage"))
            $root.DownstreamMessage.SystemMessage.encode(message.systemMessage, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.groupStateUpdateMessage != null && Object.hasOwnProperty.call(message, "groupStateUpdateMessage"))
            $root.DownstreamMessage.GroupStateUpdateMessage.encode(message.groupStateUpdateMessage, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
        if (message.groupStateSnapshotMessage != null && Object.hasOwnProperty.call(message, "groupStateSnapshotMessage"))
            $root.DownstreamMessage.GroupStateSnapshotMessage.encode(message.groupStateSnapshotMessage, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified DownstreamMessage message, length delimited. Does not implicitly {@link DownstreamMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof DownstreamMessage
     * @static
     * @param {IDownstreamMessage} message DownstreamMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DownstreamMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a DownstreamMessage message from the specified reader or buffer.
     * @function decode
     * @memberof DownstreamMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {DownstreamMessage} DownstreamMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DownstreamMessage.decode = function decode(reader, length, error, long) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (long === undefined)
            long = 0;
        if (long > $Reader.recursionLimit)
            throw Error("maximum nesting depth exceeded");
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.DownstreamMessage();
        while (reader.pos < end) {
            let tag = reader.uint32();
            if (tag === error)
                break;
            switch (tag >>> 3) {
            case 1: {
                    message.ackMessage = $root.DownstreamMessage.AckMessage.decode(reader, reader.uint32(), undefined, long + 1);
                    break;
                }
            case 2: {
                    message.dataMessage = $root.DownstreamMessage.DataMessage.decode(reader, reader.uint32(), undefined, long + 1);
                    break;
                }
            case 3: {
                    message.systemMessage = $root.DownstreamMessage.SystemMessage.decode(reader, reader.uint32(), undefined, long + 1);
                    break;
                }
            case 9: {
                    message.groupStateUpdateMessage = $root.DownstreamMessage.GroupStateUpdateMessage.decode(reader, reader.uint32(), undefined, long + 1);
                    break;
                }
            case 10: {
                    message.groupStateSnapshotMessage = $root.DownstreamMessage.GroupStateSnapshotMessage.decode(reader, reader.uint32(), undefined, long + 1);
                    break;
                }
            default:
                reader.skipType(tag & 7, long);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a DownstreamMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof DownstreamMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {DownstreamMessage} DownstreamMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DownstreamMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a DownstreamMessage message.
     * @function verify
     * @memberof DownstreamMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    DownstreamMessage.verify = function verify(message, long) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (long === undefined)
            long = 0;
        if (long > $util.recursionLimit)
            return "maximum nesting depth exceeded";
        let properties = {};
        if (message.ackMessage != null && message.hasOwnProperty("ackMessage")) {
            properties.message = 1;
            {
                let error = $root.DownstreamMessage.AckMessage.verify(message.ackMessage, long + 1);
                if (error)
                    return "ackMessage." + error;
            }
        }
        if (message.dataMessage != null && message.hasOwnProperty("dataMessage")) {
            if (properties.message === 1)
                return "message: multiple values";
            properties.message = 1;
            {
                let error = $root.DownstreamMessage.DataMessage.verify(message.dataMessage, long + 1);
                if (error)
                    return "dataMessage." + error;
            }
        }
        if (message.systemMessage != null && message.hasOwnProperty("systemMessage")) {
            if (properties.message === 1)
                return "message: multiple values";
            properties.message = 1;
            {
                let error = $root.DownstreamMessage.SystemMessage.verify(message.systemMessage, long + 1);
                if (error)
                    return "systemMessage." + error;
            }
        }
        if (message.groupStateUpdateMessage != null && message.hasOwnProperty("groupStateUpdateMessage")) {
            if (properties.message === 1)
                return "message: multiple values";
            properties.message = 1;
            {
                let error = $root.DownstreamMessage.GroupStateUpdateMessage.verify(message.groupStateUpdateMessage, long + 1);
                if (error)
                    return "groupStateUpdateMessage." + error;
            }
        }
        if (message.groupStateSnapshotMessage != null && message.hasOwnProperty("groupStateSnapshotMessage")) {
            if (properties.message === 1)
                return "message: multiple values";
            properties.message = 1;
            {
                let error = $root.DownstreamMessage.GroupStateSnapshotMessage.verify(message.groupStateSnapshotMessage, long + 1);
                if (error)
                    return "groupStateSnapshotMessage." + error;
            }
        }
        return null;
    };

    /**
     * Creates a DownstreamMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof DownstreamMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {DownstreamMessage} DownstreamMessage
     */
    DownstreamMessage.fromObject = function fromObject(object, long) {
        if (object instanceof $root.DownstreamMessage)
            return object;
        if (long === undefined)
            long = 0;
        if (long > $util.recursionLimit)
            throw Error("maximum nesting depth exceeded");
        let message = new $root.DownstreamMessage();
        if (object.ackMessage != null) {
            if (typeof object.ackMessage !== "object")
                throw TypeError(".DownstreamMessage.ackMessage: object expected");
            message.ackMessage = $root.DownstreamMessage.AckMessage.fromObject(object.ackMessage, long + 1);
        }
        if (object.dataMessage != null) {
            if (typeof object.dataMessage !== "object")
                throw TypeError(".DownstreamMessage.dataMessage: object expected");
            message.dataMessage = $root.DownstreamMessage.DataMessage.fromObject(object.dataMessage, long + 1);
        }
        if (object.systemMessage != null) {
            if (typeof object.systemMessage !== "object")
                throw TypeError(".DownstreamMessage.systemMessage: object expected");
            message.systemMessage = $root.DownstreamMessage.SystemMessage.fromObject(object.systemMessage, long + 1);
        }
        if (object.groupStateUpdateMessage != null) {
            if (typeof object.groupStateUpdateMessage !== "object")
                throw TypeError(".DownstreamMessage.groupStateUpdateMessage: object expected");
            message.groupStateUpdateMessage = $root.DownstreamMessage.GroupStateUpdateMessage.fromObject(object.groupStateUpdateMessage, long + 1);
        }
        if (object.groupStateSnapshotMessage != null) {
            if (typeof object.groupStateSnapshotMessage !== "object")
                throw TypeError(".DownstreamMessage.groupStateSnapshotMessage: object expected");
            message.groupStateSnapshotMessage = $root.DownstreamMessage.GroupStateSnapshotMessage.fromObject(object.groupStateSnapshotMessage, long + 1);
        }
        return message;
    };

    /**
     * Creates a plain object from a DownstreamMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof DownstreamMessage
     * @static
     * @param {DownstreamMessage} message DownstreamMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    DownstreamMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (message.ackMessage != null && message.hasOwnProperty("ackMessage")) {
            object.ackMessage = $root.DownstreamMessage.AckMessage.toObject(message.ackMessage, options);
            if (options.oneofs)
                object.message = "ackMessage";
        }
        if (message.dataMessage != null && message.hasOwnProperty("dataMessage")) {
            object.dataMessage = $root.DownstreamMessage.DataMessage.toObject(message.dataMessage, options);
            if (options.oneofs)
                object.message = "dataMessage";
        }
        if (message.systemMessage != null && message.hasOwnProperty("systemMessage")) {
            object.systemMessage = $root.DownstreamMessage.SystemMessage.toObject(message.systemMessage, options);
            if (options.oneofs)
                object.message = "systemMessage";
        }
        if (message.groupStateUpdateMessage != null && message.hasOwnProperty("groupStateUpdateMessage")) {
            object.groupStateUpdateMessage = $root.DownstreamMessage.GroupStateUpdateMessage.toObject(message.groupStateUpdateMessage, options);
            if (options.oneofs)
                object.message = "groupStateUpdateMessage";
        }
        if (message.groupStateSnapshotMessage != null && message.hasOwnProperty("groupStateSnapshotMessage")) {
            object.groupStateSnapshotMessage = $root.DownstreamMessage.GroupStateSnapshotMessage.toObject(message.groupStateSnapshotMessage, options);
            if (options.oneofs)
                object.message = "groupStateSnapshotMessage";
        }
        return object;
    };

    /**
     * Converts this DownstreamMessage to JSON.
     * @function toJSON
     * @memberof DownstreamMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    DownstreamMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for DownstreamMessage
     * @function getTypeUrl
     * @memberof DownstreamMessage
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    DownstreamMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/DownstreamMessage";
    };

    DownstreamMessage.AckMessage = (function() {

        /**
         * Properties of an AckMessage.
         * @memberof DownstreamMessage
         * @interface IAckMessage
         * @property {number|Long|null} [ackId] AckMessage ackId
         * @property {boolean|null} [success] AckMessage success
         * @property {DownstreamMessage.AckMessage.IErrorMessage|null} [error] AckMessage error
         */

        /**
         * Constructs a new AckMessage.
         * @memberof DownstreamMessage
         * @classdesc Represents an AckMessage.
         * @implements IAckMessage
         * @constructor
         * @param {DownstreamMessage.IAckMessage=} [properties] Properties to set
         */
        function AckMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AckMessage ackId.
         * @member {number|Long} ackId
         * @memberof DownstreamMessage.AckMessage
         * @instance
         */
        AckMessage.prototype.ackId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * AckMessage success.
         * @member {boolean} success
         * @memberof DownstreamMessage.AckMessage
         * @instance
         */
        AckMessage.prototype.success = false;

        /**
         * AckMessage error.
         * @member {DownstreamMessage.AckMessage.IErrorMessage|null|undefined} error
         * @memberof DownstreamMessage.AckMessage
         * @instance
         */
        AckMessage.prototype.error = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(AckMessage.prototype, "_error", {
            get: $util.oneOfGetter($oneOfFields = ["error"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new AckMessage instance using the specified properties.
         * @function create
         * @memberof DownstreamMessage.AckMessage
         * @static
         * @param {DownstreamMessage.IAckMessage=} [properties] Properties to set
         * @returns {DownstreamMessage.AckMessage} AckMessage instance
         */
        AckMessage.create = function create(properties) {
            return new AckMessage(properties);
        };

        /**
         * Encodes the specified AckMessage message. Does not implicitly {@link DownstreamMessage.AckMessage.verify|verify} messages.
         * @function encode
         * @memberof DownstreamMessage.AckMessage
         * @static
         * @param {DownstreamMessage.IAckMessage} message AckMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AckMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.ackId != null && Object.hasOwnProperty.call(message, "ackId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.ackId);
            if (message.success != null && Object.hasOwnProperty.call(message, "success"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.success);
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                $root.DownstreamMessage.AckMessage.ErrorMessage.encode(message.error, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified AckMessage message, length delimited. Does not implicitly {@link DownstreamMessage.AckMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof DownstreamMessage.AckMessage
         * @static
         * @param {DownstreamMessage.IAckMessage} message AckMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AckMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AckMessage message from the specified reader or buffer.
         * @function decode
         * @memberof DownstreamMessage.AckMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {DownstreamMessage.AckMessage} AckMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AckMessage.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.DownstreamMessage.AckMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.ackId = reader.uint64();
                        break;
                    }
                case 2: {
                        message.success = reader.bool();
                        break;
                    }
                case 3: {
                        message.error = $root.DownstreamMessage.AckMessage.ErrorMessage.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an AckMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof DownstreamMessage.AckMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {DownstreamMessage.AckMessage} AckMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AckMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AckMessage message.
         * @function verify
         * @memberof DownstreamMessage.AckMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AckMessage.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            let properties = {};
            if (message.ackId != null && message.hasOwnProperty("ackId"))
                if (!$util.isInteger(message.ackId) && !(message.ackId && $util.isInteger(message.ackId.low) && $util.isInteger(message.ackId.high)))
                    return "ackId: integer|Long expected";
            if (message.success != null && message.hasOwnProperty("success"))
                if (typeof message.success !== "boolean")
                    return "success: boolean expected";
            if (message.error != null && message.hasOwnProperty("error")) {
                properties._error = 1;
                {
                    let error = $root.DownstreamMessage.AckMessage.ErrorMessage.verify(message.error, long + 1);
                    if (error)
                        return "error." + error;
                }
            }
            return null;
        };

        /**
         * Creates an AckMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof DownstreamMessage.AckMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {DownstreamMessage.AckMessage} AckMessage
         */
        AckMessage.fromObject = function fromObject(object, long) {
            if (object instanceof $root.DownstreamMessage.AckMessage)
                return object;
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.DownstreamMessage.AckMessage();
            if (object.ackId != null)
                if ($util.Long)
                    (message.ackId = $util.Long.fromValue(object.ackId)).unsigned = true;
                else if (typeof object.ackId === "string")
                    message.ackId = parseInt(object.ackId, 10);
                else if (typeof object.ackId === "number")
                    message.ackId = object.ackId;
                else if (typeof object.ackId === "object")
                    message.ackId = new $util.LongBits(object.ackId.low >>> 0, object.ackId.high >>> 0).toNumber(true);
            if (object.success != null)
                message.success = Boolean(object.success);
            if (object.error != null) {
                if (typeof object.error !== "object")
                    throw TypeError(".DownstreamMessage.AckMessage.error: object expected");
                message.error = $root.DownstreamMessage.AckMessage.ErrorMessage.fromObject(object.error, long + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from an AckMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof DownstreamMessage.AckMessage
         * @static
         * @param {DownstreamMessage.AckMessage} message AckMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AckMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.ackId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.ackId = options.longs === String ? "0" : 0;
                object.success = false;
            }
            if (message.ackId != null && message.hasOwnProperty("ackId"))
                if (typeof message.ackId === "number")
                    object.ackId = options.longs === String ? String(message.ackId) : message.ackId;
                else
                    object.ackId = options.longs === String ? $util.Long.prototype.toString.call(message.ackId) : options.longs === Number ? new $util.LongBits(message.ackId.low >>> 0, message.ackId.high >>> 0).toNumber(true) : message.ackId;
            if (message.success != null && message.hasOwnProperty("success"))
                object.success = message.success;
            if (message.error != null && message.hasOwnProperty("error")) {
                object.error = $root.DownstreamMessage.AckMessage.ErrorMessage.toObject(message.error, options);
                if (options.oneofs)
                    object._error = "error";
            }
            return object;
        };

        /**
         * Converts this AckMessage to JSON.
         * @function toJSON
         * @memberof DownstreamMessage.AckMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AckMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for AckMessage
         * @function getTypeUrl
         * @memberof DownstreamMessage.AckMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        AckMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/DownstreamMessage.AckMessage";
        };

        AckMessage.ErrorMessage = (function() {

            /**
             * Properties of an ErrorMessage.
             * @memberof DownstreamMessage.AckMessage
             * @interface IErrorMessage
             * @property {string|null} [name] ErrorMessage name
             * @property {string|null} [message] ErrorMessage message
             */

            /**
             * Constructs a new ErrorMessage.
             * @memberof DownstreamMessage.AckMessage
             * @classdesc Represents an ErrorMessage.
             * @implements IErrorMessage
             * @constructor
             * @param {DownstreamMessage.AckMessage.IErrorMessage=} [properties] Properties to set
             */
            function ErrorMessage(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ErrorMessage name.
             * @member {string} name
             * @memberof DownstreamMessage.AckMessage.ErrorMessage
             * @instance
             */
            ErrorMessage.prototype.name = "";

            /**
             * ErrorMessage message.
             * @member {string} message
             * @memberof DownstreamMessage.AckMessage.ErrorMessage
             * @instance
             */
            ErrorMessage.prototype.message = "";

            /**
             * Creates a new ErrorMessage instance using the specified properties.
             * @function create
             * @memberof DownstreamMessage.AckMessage.ErrorMessage
             * @static
             * @param {DownstreamMessage.AckMessage.IErrorMessage=} [properties] Properties to set
             * @returns {DownstreamMessage.AckMessage.ErrorMessage} ErrorMessage instance
             */
            ErrorMessage.create = function create(properties) {
                return new ErrorMessage(properties);
            };

            /**
             * Encodes the specified ErrorMessage message. Does not implicitly {@link DownstreamMessage.AckMessage.ErrorMessage.verify|verify} messages.
             * @function encode
             * @memberof DownstreamMessage.AckMessage.ErrorMessage
             * @static
             * @param {DownstreamMessage.AckMessage.IErrorMessage} message ErrorMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ErrorMessage.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
                if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.message);
                return writer;
            };

            /**
             * Encodes the specified ErrorMessage message, length delimited. Does not implicitly {@link DownstreamMessage.AckMessage.ErrorMessage.verify|verify} messages.
             * @function encodeDelimited
             * @memberof DownstreamMessage.AckMessage.ErrorMessage
             * @static
             * @param {DownstreamMessage.AckMessage.IErrorMessage} message ErrorMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ErrorMessage.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an ErrorMessage message from the specified reader or buffer.
             * @function decode
             * @memberof DownstreamMessage.AckMessage.ErrorMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {DownstreamMessage.AckMessage.ErrorMessage} ErrorMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ErrorMessage.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.DownstreamMessage.AckMessage.ErrorMessage();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.name = reader.string();
                            break;
                        }
                    case 2: {
                            message.message = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an ErrorMessage message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof DownstreamMessage.AckMessage.ErrorMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {DownstreamMessage.AckMessage.ErrorMessage} ErrorMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ErrorMessage.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an ErrorMessage message.
             * @function verify
             * @memberof DownstreamMessage.AckMessage.ErrorMessage
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ErrorMessage.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.message != null && message.hasOwnProperty("message"))
                    if (!$util.isString(message.message))
                        return "message: string expected";
                return null;
            };

            /**
             * Creates an ErrorMessage message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof DownstreamMessage.AckMessage.ErrorMessage
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {DownstreamMessage.AckMessage.ErrorMessage} ErrorMessage
             */
            ErrorMessage.fromObject = function fromObject(object, long) {
                if (object instanceof $root.DownstreamMessage.AckMessage.ErrorMessage)
                    return object;
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.DownstreamMessage.AckMessage.ErrorMessage();
                if (object.name != null)
                    message.name = String(object.name);
                if (object.message != null)
                    message.message = String(object.message);
                return message;
            };

            /**
             * Creates a plain object from an ErrorMessage message. Also converts values to other types if specified.
             * @function toObject
             * @memberof DownstreamMessage.AckMessage.ErrorMessage
             * @static
             * @param {DownstreamMessage.AckMessage.ErrorMessage} message ErrorMessage
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ErrorMessage.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.name = "";
                    object.message = "";
                }
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.message != null && message.hasOwnProperty("message"))
                    object.message = message.message;
                return object;
            };

            /**
             * Converts this ErrorMessage to JSON.
             * @function toJSON
             * @memberof DownstreamMessage.AckMessage.ErrorMessage
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ErrorMessage.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for ErrorMessage
             * @function getTypeUrl
             * @memberof DownstreamMessage.AckMessage.ErrorMessage
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ErrorMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/DownstreamMessage.AckMessage.ErrorMessage";
            };

            return ErrorMessage;
        })();

        return AckMessage;
    })();

    DownstreamMessage.DataMessage = (function() {

        /**
         * Properties of a DataMessage.
         * @memberof DownstreamMessage
         * @interface IDataMessage
         * @property {string|null} [from] DataMessage from
         * @property {string|null} [group] DataMessage group
         * @property {IMessageData|null} [data] DataMessage data
         * @property {number|Long|null} [sequenceId] DataMessage sequenceId
         */

        /**
         * Constructs a new DataMessage.
         * @memberof DownstreamMessage
         * @classdesc Represents a DataMessage.
         * @implements IDataMessage
         * @constructor
         * @param {DownstreamMessage.IDataMessage=} [properties] Properties to set
         */
        function DataMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DataMessage from.
         * @member {string} from
         * @memberof DownstreamMessage.DataMessage
         * @instance
         */
        DataMessage.prototype.from = "";

        /**
         * DataMessage group.
         * @member {string|null|undefined} group
         * @memberof DownstreamMessage.DataMessage
         * @instance
         */
        DataMessage.prototype.group = null;

        /**
         * DataMessage data.
         * @member {IMessageData|null|undefined} data
         * @memberof DownstreamMessage.DataMessage
         * @instance
         */
        DataMessage.prototype.data = null;

        /**
         * DataMessage sequenceId.
         * @member {number|Long|null|undefined} sequenceId
         * @memberof DownstreamMessage.DataMessage
         * @instance
         */
        DataMessage.prototype.sequenceId = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(DataMessage.prototype, "_group", {
            get: $util.oneOfGetter($oneOfFields = ["group"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(DataMessage.prototype, "_sequenceId", {
            get: $util.oneOfGetter($oneOfFields = ["sequenceId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new DataMessage instance using the specified properties.
         * @function create
         * @memberof DownstreamMessage.DataMessage
         * @static
         * @param {DownstreamMessage.IDataMessage=} [properties] Properties to set
         * @returns {DownstreamMessage.DataMessage} DataMessage instance
         */
        DataMessage.create = function create(properties) {
            return new DataMessage(properties);
        };

        /**
         * Encodes the specified DataMessage message. Does not implicitly {@link DownstreamMessage.DataMessage.verify|verify} messages.
         * @function encode
         * @memberof DownstreamMessage.DataMessage
         * @static
         * @param {DownstreamMessage.IDataMessage} message DataMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DataMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.from != null && Object.hasOwnProperty.call(message, "from"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.from);
            if (message.group != null && Object.hasOwnProperty.call(message, "group"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.group);
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                $root.MessageData.encode(message.data, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.sequenceId != null && Object.hasOwnProperty.call(message, "sequenceId"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.sequenceId);
            return writer;
        };

        /**
         * Encodes the specified DataMessage message, length delimited. Does not implicitly {@link DownstreamMessage.DataMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof DownstreamMessage.DataMessage
         * @static
         * @param {DownstreamMessage.IDataMessage} message DataMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DataMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DataMessage message from the specified reader or buffer.
         * @function decode
         * @memberof DownstreamMessage.DataMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {DownstreamMessage.DataMessage} DataMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DataMessage.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.DownstreamMessage.DataMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.from = reader.string();
                        break;
                    }
                case 2: {
                        message.group = reader.string();
                        break;
                    }
                case 3: {
                        message.data = $root.MessageData.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 4: {
                        message.sequenceId = reader.uint64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a DataMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof DownstreamMessage.DataMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {DownstreamMessage.DataMessage} DataMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DataMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DataMessage message.
         * @function verify
         * @memberof DownstreamMessage.DataMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DataMessage.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            let properties = {};
            if (message.from != null && message.hasOwnProperty("from"))
                if (!$util.isString(message.from))
                    return "from: string expected";
            if (message.group != null && message.hasOwnProperty("group")) {
                properties._group = 1;
                if (!$util.isString(message.group))
                    return "group: string expected";
            }
            if (message.data != null && message.hasOwnProperty("data")) {
                let error = $root.MessageData.verify(message.data, long + 1);
                if (error)
                    return "data." + error;
            }
            if (message.sequenceId != null && message.hasOwnProperty("sequenceId")) {
                properties._sequenceId = 1;
                if (!$util.isInteger(message.sequenceId) && !(message.sequenceId && $util.isInteger(message.sequenceId.low) && $util.isInteger(message.sequenceId.high)))
                    return "sequenceId: integer|Long expected";
            }
            return null;
        };

        /**
         * Creates a DataMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof DownstreamMessage.DataMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {DownstreamMessage.DataMessage} DataMessage
         */
        DataMessage.fromObject = function fromObject(object, long) {
            if (object instanceof $root.DownstreamMessage.DataMessage)
                return object;
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.DownstreamMessage.DataMessage();
            if (object.from != null)
                message.from = String(object.from);
            if (object.group != null)
                message.group = String(object.group);
            if (object.data != null) {
                if (typeof object.data !== "object")
                    throw TypeError(".DownstreamMessage.DataMessage.data: object expected");
                message.data = $root.MessageData.fromObject(object.data, long + 1);
            }
            if (object.sequenceId != null)
                if ($util.Long)
                    (message.sequenceId = $util.Long.fromValue(object.sequenceId)).unsigned = true;
                else if (typeof object.sequenceId === "string")
                    message.sequenceId = parseInt(object.sequenceId, 10);
                else if (typeof object.sequenceId === "number")
                    message.sequenceId = object.sequenceId;
                else if (typeof object.sequenceId === "object")
                    message.sequenceId = new $util.LongBits(object.sequenceId.low >>> 0, object.sequenceId.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a DataMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof DownstreamMessage.DataMessage
         * @static
         * @param {DownstreamMessage.DataMessage} message DataMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DataMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.from = "";
                object.data = null;
            }
            if (message.from != null && message.hasOwnProperty("from"))
                object.from = message.from;
            if (message.group != null && message.hasOwnProperty("group")) {
                object.group = message.group;
                if (options.oneofs)
                    object._group = "group";
            }
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = $root.MessageData.toObject(message.data, options);
            if (message.sequenceId != null && message.hasOwnProperty("sequenceId")) {
                if (typeof message.sequenceId === "number")
                    object.sequenceId = options.longs === String ? String(message.sequenceId) : message.sequenceId;
                else
                    object.sequenceId = options.longs === String ? $util.Long.prototype.toString.call(message.sequenceId) : options.longs === Number ? new $util.LongBits(message.sequenceId.low >>> 0, message.sequenceId.high >>> 0).toNumber(true) : message.sequenceId;
                if (options.oneofs)
                    object._sequenceId = "sequenceId";
            }
            return object;
        };

        /**
         * Converts this DataMessage to JSON.
         * @function toJSON
         * @memberof DownstreamMessage.DataMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DataMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for DataMessage
         * @function getTypeUrl
         * @memberof DownstreamMessage.DataMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        DataMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/DownstreamMessage.DataMessage";
        };

        return DataMessage;
    })();

    DownstreamMessage.SystemMessage = (function() {

        /**
         * Properties of a SystemMessage.
         * @memberof DownstreamMessage
         * @interface ISystemMessage
         * @property {DownstreamMessage.SystemMessage.IConnectedMessage|null} [connectedMessage] SystemMessage connectedMessage
         * @property {DownstreamMessage.SystemMessage.IDisconnectedMessage|null} [disconnectedMessage] SystemMessage disconnectedMessage
         */

        /**
         * Constructs a new SystemMessage.
         * @memberof DownstreamMessage
         * @classdesc Represents a SystemMessage.
         * @implements ISystemMessage
         * @constructor
         * @param {DownstreamMessage.ISystemMessage=} [properties] Properties to set
         */
        function SystemMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SystemMessage connectedMessage.
         * @member {DownstreamMessage.SystemMessage.IConnectedMessage|null|undefined} connectedMessage
         * @memberof DownstreamMessage.SystemMessage
         * @instance
         */
        SystemMessage.prototype.connectedMessage = null;

        /**
         * SystemMessage disconnectedMessage.
         * @member {DownstreamMessage.SystemMessage.IDisconnectedMessage|null|undefined} disconnectedMessage
         * @memberof DownstreamMessage.SystemMessage
         * @instance
         */
        SystemMessage.prototype.disconnectedMessage = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * SystemMessage message.
         * @member {"connectedMessage"|"disconnectedMessage"|undefined} message
         * @memberof DownstreamMessage.SystemMessage
         * @instance
         */
        Object.defineProperty(SystemMessage.prototype, "message", {
            get: $util.oneOfGetter($oneOfFields = ["connectedMessage", "disconnectedMessage"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new SystemMessage instance using the specified properties.
         * @function create
         * @memberof DownstreamMessage.SystemMessage
         * @static
         * @param {DownstreamMessage.ISystemMessage=} [properties] Properties to set
         * @returns {DownstreamMessage.SystemMessage} SystemMessage instance
         */
        SystemMessage.create = function create(properties) {
            return new SystemMessage(properties);
        };

        /**
         * Encodes the specified SystemMessage message. Does not implicitly {@link DownstreamMessage.SystemMessage.verify|verify} messages.
         * @function encode
         * @memberof DownstreamMessage.SystemMessage
         * @static
         * @param {DownstreamMessage.ISystemMessage} message SystemMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SystemMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.connectedMessage != null && Object.hasOwnProperty.call(message, "connectedMessage"))
                $root.DownstreamMessage.SystemMessage.ConnectedMessage.encode(message.connectedMessage, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.disconnectedMessage != null && Object.hasOwnProperty.call(message, "disconnectedMessage"))
                $root.DownstreamMessage.SystemMessage.DisconnectedMessage.encode(message.disconnectedMessage, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified SystemMessage message, length delimited. Does not implicitly {@link DownstreamMessage.SystemMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof DownstreamMessage.SystemMessage
         * @static
         * @param {DownstreamMessage.ISystemMessage} message SystemMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SystemMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SystemMessage message from the specified reader or buffer.
         * @function decode
         * @memberof DownstreamMessage.SystemMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {DownstreamMessage.SystemMessage} SystemMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SystemMessage.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.DownstreamMessage.SystemMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.connectedMessage = $root.DownstreamMessage.SystemMessage.ConnectedMessage.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 2: {
                        message.disconnectedMessage = $root.DownstreamMessage.SystemMessage.DisconnectedMessage.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SystemMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof DownstreamMessage.SystemMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {DownstreamMessage.SystemMessage} SystemMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SystemMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SystemMessage message.
         * @function verify
         * @memberof DownstreamMessage.SystemMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SystemMessage.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            let properties = {};
            if (message.connectedMessage != null && message.hasOwnProperty("connectedMessage")) {
                properties.message = 1;
                {
                    let error = $root.DownstreamMessage.SystemMessage.ConnectedMessage.verify(message.connectedMessage, long + 1);
                    if (error)
                        return "connectedMessage." + error;
                }
            }
            if (message.disconnectedMessage != null && message.hasOwnProperty("disconnectedMessage")) {
                if (properties.message === 1)
                    return "message: multiple values";
                properties.message = 1;
                {
                    let error = $root.DownstreamMessage.SystemMessage.DisconnectedMessage.verify(message.disconnectedMessage, long + 1);
                    if (error)
                        return "disconnectedMessage." + error;
                }
            }
            return null;
        };

        /**
         * Creates a SystemMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof DownstreamMessage.SystemMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {DownstreamMessage.SystemMessage} SystemMessage
         */
        SystemMessage.fromObject = function fromObject(object, long) {
            if (object instanceof $root.DownstreamMessage.SystemMessage)
                return object;
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.DownstreamMessage.SystemMessage();
            if (object.connectedMessage != null) {
                if (typeof object.connectedMessage !== "object")
                    throw TypeError(".DownstreamMessage.SystemMessage.connectedMessage: object expected");
                message.connectedMessage = $root.DownstreamMessage.SystemMessage.ConnectedMessage.fromObject(object.connectedMessage, long + 1);
            }
            if (object.disconnectedMessage != null) {
                if (typeof object.disconnectedMessage !== "object")
                    throw TypeError(".DownstreamMessage.SystemMessage.disconnectedMessage: object expected");
                message.disconnectedMessage = $root.DownstreamMessage.SystemMessage.DisconnectedMessage.fromObject(object.disconnectedMessage, long + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a SystemMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof DownstreamMessage.SystemMessage
         * @static
         * @param {DownstreamMessage.SystemMessage} message SystemMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SystemMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (message.connectedMessage != null && message.hasOwnProperty("connectedMessage")) {
                object.connectedMessage = $root.DownstreamMessage.SystemMessage.ConnectedMessage.toObject(message.connectedMessage, options);
                if (options.oneofs)
                    object.message = "connectedMessage";
            }
            if (message.disconnectedMessage != null && message.hasOwnProperty("disconnectedMessage")) {
                object.disconnectedMessage = $root.DownstreamMessage.SystemMessage.DisconnectedMessage.toObject(message.disconnectedMessage, options);
                if (options.oneofs)
                    object.message = "disconnectedMessage";
            }
            return object;
        };

        /**
         * Converts this SystemMessage to JSON.
         * @function toJSON
         * @memberof DownstreamMessage.SystemMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SystemMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SystemMessage
         * @function getTypeUrl
         * @memberof DownstreamMessage.SystemMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SystemMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/DownstreamMessage.SystemMessage";
        };

        SystemMessage.ConnectedMessage = (function() {

            /**
             * Properties of a ConnectedMessage.
             * @memberof DownstreamMessage.SystemMessage
             * @interface IConnectedMessage
             * @property {string|null} [connectionId] ConnectedMessage connectionId
             * @property {string|null} [userId] ConnectedMessage userId
             * @property {string|null} [reconnectionToken] ConnectedMessage reconnectionToken
             */

            /**
             * Constructs a new ConnectedMessage.
             * @memberof DownstreamMessage.SystemMessage
             * @classdesc Represents a ConnectedMessage.
             * @implements IConnectedMessage
             * @constructor
             * @param {DownstreamMessage.SystemMessage.IConnectedMessage=} [properties] Properties to set
             */
            function ConnectedMessage(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ConnectedMessage connectionId.
             * @member {string} connectionId
             * @memberof DownstreamMessage.SystemMessage.ConnectedMessage
             * @instance
             */
            ConnectedMessage.prototype.connectionId = "";

            /**
             * ConnectedMessage userId.
             * @member {string} userId
             * @memberof DownstreamMessage.SystemMessage.ConnectedMessage
             * @instance
             */
            ConnectedMessage.prototype.userId = "";

            /**
             * ConnectedMessage reconnectionToken.
             * @member {string} reconnectionToken
             * @memberof DownstreamMessage.SystemMessage.ConnectedMessage
             * @instance
             */
            ConnectedMessage.prototype.reconnectionToken = "";

            /**
             * Creates a new ConnectedMessage instance using the specified properties.
             * @function create
             * @memberof DownstreamMessage.SystemMessage.ConnectedMessage
             * @static
             * @param {DownstreamMessage.SystemMessage.IConnectedMessage=} [properties] Properties to set
             * @returns {DownstreamMessage.SystemMessage.ConnectedMessage} ConnectedMessage instance
             */
            ConnectedMessage.create = function create(properties) {
                return new ConnectedMessage(properties);
            };

            /**
             * Encodes the specified ConnectedMessage message. Does not implicitly {@link DownstreamMessage.SystemMessage.ConnectedMessage.verify|verify} messages.
             * @function encode
             * @memberof DownstreamMessage.SystemMessage.ConnectedMessage
             * @static
             * @param {DownstreamMessage.SystemMessage.IConnectedMessage} message ConnectedMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ConnectedMessage.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.connectionId != null && Object.hasOwnProperty.call(message, "connectionId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.connectionId);
                if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.userId);
                if (message.reconnectionToken != null && Object.hasOwnProperty.call(message, "reconnectionToken"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.reconnectionToken);
                return writer;
            };

            /**
             * Encodes the specified ConnectedMessage message, length delimited. Does not implicitly {@link DownstreamMessage.SystemMessage.ConnectedMessage.verify|verify} messages.
             * @function encodeDelimited
             * @memberof DownstreamMessage.SystemMessage.ConnectedMessage
             * @static
             * @param {DownstreamMessage.SystemMessage.IConnectedMessage} message ConnectedMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ConnectedMessage.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ConnectedMessage message from the specified reader or buffer.
             * @function decode
             * @memberof DownstreamMessage.SystemMessage.ConnectedMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {DownstreamMessage.SystemMessage.ConnectedMessage} ConnectedMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ConnectedMessage.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.DownstreamMessage.SystemMessage.ConnectedMessage();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.connectionId = reader.string();
                            break;
                        }
                    case 2: {
                            message.userId = reader.string();
                            break;
                        }
                    case 3: {
                            message.reconnectionToken = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ConnectedMessage message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof DownstreamMessage.SystemMessage.ConnectedMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {DownstreamMessage.SystemMessage.ConnectedMessage} ConnectedMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ConnectedMessage.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ConnectedMessage message.
             * @function verify
             * @memberof DownstreamMessage.SystemMessage.ConnectedMessage
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ConnectedMessage.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.connectionId != null && message.hasOwnProperty("connectionId"))
                    if (!$util.isString(message.connectionId))
                        return "connectionId: string expected";
                if (message.userId != null && message.hasOwnProperty("userId"))
                    if (!$util.isString(message.userId))
                        return "userId: string expected";
                if (message.reconnectionToken != null && message.hasOwnProperty("reconnectionToken"))
                    if (!$util.isString(message.reconnectionToken))
                        return "reconnectionToken: string expected";
                return null;
            };

            /**
             * Creates a ConnectedMessage message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof DownstreamMessage.SystemMessage.ConnectedMessage
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {DownstreamMessage.SystemMessage.ConnectedMessage} ConnectedMessage
             */
            ConnectedMessage.fromObject = function fromObject(object, long) {
                if (object instanceof $root.DownstreamMessage.SystemMessage.ConnectedMessage)
                    return object;
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.DownstreamMessage.SystemMessage.ConnectedMessage();
                if (object.connectionId != null)
                    message.connectionId = String(object.connectionId);
                if (object.userId != null)
                    message.userId = String(object.userId);
                if (object.reconnectionToken != null)
                    message.reconnectionToken = String(object.reconnectionToken);
                return message;
            };

            /**
             * Creates a plain object from a ConnectedMessage message. Also converts values to other types if specified.
             * @function toObject
             * @memberof DownstreamMessage.SystemMessage.ConnectedMessage
             * @static
             * @param {DownstreamMessage.SystemMessage.ConnectedMessage} message ConnectedMessage
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ConnectedMessage.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.connectionId = "";
                    object.userId = "";
                    object.reconnectionToken = "";
                }
                if (message.connectionId != null && message.hasOwnProperty("connectionId"))
                    object.connectionId = message.connectionId;
                if (message.userId != null && message.hasOwnProperty("userId"))
                    object.userId = message.userId;
                if (message.reconnectionToken != null && message.hasOwnProperty("reconnectionToken"))
                    object.reconnectionToken = message.reconnectionToken;
                return object;
            };

            /**
             * Converts this ConnectedMessage to JSON.
             * @function toJSON
             * @memberof DownstreamMessage.SystemMessage.ConnectedMessage
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ConnectedMessage.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for ConnectedMessage
             * @function getTypeUrl
             * @memberof DownstreamMessage.SystemMessage.ConnectedMessage
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ConnectedMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/DownstreamMessage.SystemMessage.ConnectedMessage";
            };

            return ConnectedMessage;
        })();

        SystemMessage.DisconnectedMessage = (function() {

            /**
             * Properties of a DisconnectedMessage.
             * @memberof DownstreamMessage.SystemMessage
             * @interface IDisconnectedMessage
             * @property {string|null} [reason] DisconnectedMessage reason
             */

            /**
             * Constructs a new DisconnectedMessage.
             * @memberof DownstreamMessage.SystemMessage
             * @classdesc Represents a DisconnectedMessage.
             * @implements IDisconnectedMessage
             * @constructor
             * @param {DownstreamMessage.SystemMessage.IDisconnectedMessage=} [properties] Properties to set
             */
            function DisconnectedMessage(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * DisconnectedMessage reason.
             * @member {string} reason
             * @memberof DownstreamMessage.SystemMessage.DisconnectedMessage
             * @instance
             */
            DisconnectedMessage.prototype.reason = "";

            /**
             * Creates a new DisconnectedMessage instance using the specified properties.
             * @function create
             * @memberof DownstreamMessage.SystemMessage.DisconnectedMessage
             * @static
             * @param {DownstreamMessage.SystemMessage.IDisconnectedMessage=} [properties] Properties to set
             * @returns {DownstreamMessage.SystemMessage.DisconnectedMessage} DisconnectedMessage instance
             */
            DisconnectedMessage.create = function create(properties) {
                return new DisconnectedMessage(properties);
            };

            /**
             * Encodes the specified DisconnectedMessage message. Does not implicitly {@link DownstreamMessage.SystemMessage.DisconnectedMessage.verify|verify} messages.
             * @function encode
             * @memberof DownstreamMessage.SystemMessage.DisconnectedMessage
             * @static
             * @param {DownstreamMessage.SystemMessage.IDisconnectedMessage} message DisconnectedMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DisconnectedMessage.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.reason != null && Object.hasOwnProperty.call(message, "reason"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.reason);
                return writer;
            };

            /**
             * Encodes the specified DisconnectedMessage message, length delimited. Does not implicitly {@link DownstreamMessage.SystemMessage.DisconnectedMessage.verify|verify} messages.
             * @function encodeDelimited
             * @memberof DownstreamMessage.SystemMessage.DisconnectedMessage
             * @static
             * @param {DownstreamMessage.SystemMessage.IDisconnectedMessage} message DisconnectedMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DisconnectedMessage.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a DisconnectedMessage message from the specified reader or buffer.
             * @function decode
             * @memberof DownstreamMessage.SystemMessage.DisconnectedMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {DownstreamMessage.SystemMessage.DisconnectedMessage} DisconnectedMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DisconnectedMessage.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.DownstreamMessage.SystemMessage.DisconnectedMessage();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 2: {
                            message.reason = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a DisconnectedMessage message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof DownstreamMessage.SystemMessage.DisconnectedMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {DownstreamMessage.SystemMessage.DisconnectedMessage} DisconnectedMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DisconnectedMessage.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a DisconnectedMessage message.
             * @function verify
             * @memberof DownstreamMessage.SystemMessage.DisconnectedMessage
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DisconnectedMessage.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.reason != null && message.hasOwnProperty("reason"))
                    if (!$util.isString(message.reason))
                        return "reason: string expected";
                return null;
            };

            /**
             * Creates a DisconnectedMessage message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof DownstreamMessage.SystemMessage.DisconnectedMessage
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {DownstreamMessage.SystemMessage.DisconnectedMessage} DisconnectedMessage
             */
            DisconnectedMessage.fromObject = function fromObject(object, long) {
                if (object instanceof $root.DownstreamMessage.SystemMessage.DisconnectedMessage)
                    return object;
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.DownstreamMessage.SystemMessage.DisconnectedMessage();
                if (object.reason != null)
                    message.reason = String(object.reason);
                return message;
            };

            /**
             * Creates a plain object from a DisconnectedMessage message. Also converts values to other types if specified.
             * @function toObject
             * @memberof DownstreamMessage.SystemMessage.DisconnectedMessage
             * @static
             * @param {DownstreamMessage.SystemMessage.DisconnectedMessage} message DisconnectedMessage
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DisconnectedMessage.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults)
                    object.reason = "";
                if (message.reason != null && message.hasOwnProperty("reason"))
                    object.reason = message.reason;
                return object;
            };

            /**
             * Converts this DisconnectedMessage to JSON.
             * @function toJSON
             * @memberof DownstreamMessage.SystemMessage.DisconnectedMessage
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DisconnectedMessage.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for DisconnectedMessage
             * @function getTypeUrl
             * @memberof DownstreamMessage.SystemMessage.DisconnectedMessage
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            DisconnectedMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/DownstreamMessage.SystemMessage.DisconnectedMessage";
            };

            return DisconnectedMessage;
        })();

        return SystemMessage;
    })();

    DownstreamMessage.GroupStateSnapshotMessage = (function() {

        /**
         * Properties of a GroupStateSnapshotMessage.
         * @memberof DownstreamMessage
         * @interface IGroupStateSnapshotMessage
         * @property {string|null} [group] GroupStateSnapshotMessage group
         * @property {Array.<IGroupStateItem>|null} [items] GroupStateSnapshotMessage items
         * @property {number|Long|null} [sequenceId] GroupStateSnapshotMessage sequenceId
         */

        /**
         * Constructs a new GroupStateSnapshotMessage.
         * @memberof DownstreamMessage
         * @classdesc Represents a GroupStateSnapshotMessage.
         * @implements IGroupStateSnapshotMessage
         * @constructor
         * @param {DownstreamMessage.IGroupStateSnapshotMessage=} [properties] Properties to set
         */
        function GroupStateSnapshotMessage(properties) {
            this.items = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GroupStateSnapshotMessage group.
         * @member {string} group
         * @memberof DownstreamMessage.GroupStateSnapshotMessage
         * @instance
         */
        GroupStateSnapshotMessage.prototype.group = "";

        /**
         * GroupStateSnapshotMessage items.
         * @member {Array.<IGroupStateItem>} items
         * @memberof DownstreamMessage.GroupStateSnapshotMessage
         * @instance
         */
        GroupStateSnapshotMessage.prototype.items = $util.emptyArray;

        /**
         * GroupStateSnapshotMessage sequenceId.
         * @member {number|Long|null|undefined} sequenceId
         * @memberof DownstreamMessage.GroupStateSnapshotMessage
         * @instance
         */
        GroupStateSnapshotMessage.prototype.sequenceId = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(GroupStateSnapshotMessage.prototype, "_sequenceId", {
            get: $util.oneOfGetter($oneOfFields = ["sequenceId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new GroupStateSnapshotMessage instance using the specified properties.
         * @function create
         * @memberof DownstreamMessage.GroupStateSnapshotMessage
         * @static
         * @param {DownstreamMessage.IGroupStateSnapshotMessage=} [properties] Properties to set
         * @returns {DownstreamMessage.GroupStateSnapshotMessage} GroupStateSnapshotMessage instance
         */
        GroupStateSnapshotMessage.create = function create(properties) {
            return new GroupStateSnapshotMessage(properties);
        };

        /**
         * Encodes the specified GroupStateSnapshotMessage message. Does not implicitly {@link DownstreamMessage.GroupStateSnapshotMessage.verify|verify} messages.
         * @function encode
         * @memberof DownstreamMessage.GroupStateSnapshotMessage
         * @static
         * @param {DownstreamMessage.IGroupStateSnapshotMessage} message GroupStateSnapshotMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GroupStateSnapshotMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.group != null && Object.hasOwnProperty.call(message, "group"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.group);
            if (message.items != null && message.items.length)
                for (let i = 0; i < message.items.length; ++i)
                    $root.GroupStateItem.encode(message.items[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.sequenceId != null && Object.hasOwnProperty.call(message, "sequenceId"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.sequenceId);
            return writer;
        };

        /**
         * Encodes the specified GroupStateSnapshotMessage message, length delimited. Does not implicitly {@link DownstreamMessage.GroupStateSnapshotMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof DownstreamMessage.GroupStateSnapshotMessage
         * @static
         * @param {DownstreamMessage.IGroupStateSnapshotMessage} message GroupStateSnapshotMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GroupStateSnapshotMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GroupStateSnapshotMessage message from the specified reader or buffer.
         * @function decode
         * @memberof DownstreamMessage.GroupStateSnapshotMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {DownstreamMessage.GroupStateSnapshotMessage} GroupStateSnapshotMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GroupStateSnapshotMessage.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.DownstreamMessage.GroupStateSnapshotMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.group = reader.string();
                        break;
                    }
                case 2: {
                        if (!(message.items && message.items.length))
                            message.items = [];
                        message.items.push($root.GroupStateItem.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 3: {
                        message.sequenceId = reader.uint64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GroupStateSnapshotMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof DownstreamMessage.GroupStateSnapshotMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {DownstreamMessage.GroupStateSnapshotMessage} GroupStateSnapshotMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GroupStateSnapshotMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GroupStateSnapshotMessage message.
         * @function verify
         * @memberof DownstreamMessage.GroupStateSnapshotMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GroupStateSnapshotMessage.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            let properties = {};
            if (message.group != null && message.hasOwnProperty("group"))
                if (!$util.isString(message.group))
                    return "group: string expected";
            if (message.items != null && message.hasOwnProperty("items")) {
                if (!Array.isArray(message.items))
                    return "items: array expected";
                for (let i = 0; i < message.items.length; ++i) {
                    let error = $root.GroupStateItem.verify(message.items[i], long + 1);
                    if (error)
                        return "items." + error;
                }
            }
            if (message.sequenceId != null && message.hasOwnProperty("sequenceId")) {
                properties._sequenceId = 1;
                if (!$util.isInteger(message.sequenceId) && !(message.sequenceId && $util.isInteger(message.sequenceId.low) && $util.isInteger(message.sequenceId.high)))
                    return "sequenceId: integer|Long expected";
            }
            return null;
        };

        /**
         * Creates a GroupStateSnapshotMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof DownstreamMessage.GroupStateSnapshotMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {DownstreamMessage.GroupStateSnapshotMessage} GroupStateSnapshotMessage
         */
        GroupStateSnapshotMessage.fromObject = function fromObject(object, long) {
            if (object instanceof $root.DownstreamMessage.GroupStateSnapshotMessage)
                return object;
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.DownstreamMessage.GroupStateSnapshotMessage();
            if (object.group != null)
                message.group = String(object.group);
            if (object.items) {
                if (!Array.isArray(object.items))
                    throw TypeError(".DownstreamMessage.GroupStateSnapshotMessage.items: array expected");
                message.items = [];
                for (let i = 0; i < object.items.length; ++i) {
                    if (typeof object.items[i] !== "object")
                        throw TypeError(".DownstreamMessage.GroupStateSnapshotMessage.items: object expected");
                    message.items[i] = $root.GroupStateItem.fromObject(object.items[i], long + 1);
                }
            }
            if (object.sequenceId != null)
                if ($util.Long)
                    (message.sequenceId = $util.Long.fromValue(object.sequenceId)).unsigned = true;
                else if (typeof object.sequenceId === "string")
                    message.sequenceId = parseInt(object.sequenceId, 10);
                else if (typeof object.sequenceId === "number")
                    message.sequenceId = object.sequenceId;
                else if (typeof object.sequenceId === "object")
                    message.sequenceId = new $util.LongBits(object.sequenceId.low >>> 0, object.sequenceId.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a GroupStateSnapshotMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof DownstreamMessage.GroupStateSnapshotMessage
         * @static
         * @param {DownstreamMessage.GroupStateSnapshotMessage} message GroupStateSnapshotMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GroupStateSnapshotMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.items = [];
            if (options.defaults)
                object.group = "";
            if (message.group != null && message.hasOwnProperty("group"))
                object.group = message.group;
            if (message.items && message.items.length) {
                object.items = [];
                for (let j = 0; j < message.items.length; ++j)
                    object.items[j] = $root.GroupStateItem.toObject(message.items[j], options);
            }
            if (message.sequenceId != null && message.hasOwnProperty("sequenceId")) {
                if (typeof message.sequenceId === "number")
                    object.sequenceId = options.longs === String ? String(message.sequenceId) : message.sequenceId;
                else
                    object.sequenceId = options.longs === String ? $util.Long.prototype.toString.call(message.sequenceId) : options.longs === Number ? new $util.LongBits(message.sequenceId.low >>> 0, message.sequenceId.high >>> 0).toNumber(true) : message.sequenceId;
                if (options.oneofs)
                    object._sequenceId = "sequenceId";
            }
            return object;
        };

        /**
         * Converts this GroupStateSnapshotMessage to JSON.
         * @function toJSON
         * @memberof DownstreamMessage.GroupStateSnapshotMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GroupStateSnapshotMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GroupStateSnapshotMessage
         * @function getTypeUrl
         * @memberof DownstreamMessage.GroupStateSnapshotMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GroupStateSnapshotMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/DownstreamMessage.GroupStateSnapshotMessage";
        };

        return GroupStateSnapshotMessage;
    })();

    DownstreamMessage.GroupStateUpdateMessage = (function() {

        /**
         * Properties of a GroupStateUpdateMessage.
         * @memberof DownstreamMessage
         * @interface IGroupStateUpdateMessage
         * @property {string|null} [group] GroupStateUpdateMessage group
         * @property {Array.<IGroupStateItem>|null} [items] GroupStateUpdateMessage items
         * @property {number|Long|null} [sequenceId] GroupStateUpdateMessage sequenceId
         */

        /**
         * Constructs a new GroupStateUpdateMessage.
         * @memberof DownstreamMessage
         * @classdesc Represents a GroupStateUpdateMessage.
         * @implements IGroupStateUpdateMessage
         * @constructor
         * @param {DownstreamMessage.IGroupStateUpdateMessage=} [properties] Properties to set
         */
        function GroupStateUpdateMessage(properties) {
            this.items = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GroupStateUpdateMessage group.
         * @member {string} group
         * @memberof DownstreamMessage.GroupStateUpdateMessage
         * @instance
         */
        GroupStateUpdateMessage.prototype.group = "";

        /**
         * GroupStateUpdateMessage items.
         * @member {Array.<IGroupStateItem>} items
         * @memberof DownstreamMessage.GroupStateUpdateMessage
         * @instance
         */
        GroupStateUpdateMessage.prototype.items = $util.emptyArray;

        /**
         * GroupStateUpdateMessage sequenceId.
         * @member {number|Long|null|undefined} sequenceId
         * @memberof DownstreamMessage.GroupStateUpdateMessage
         * @instance
         */
        GroupStateUpdateMessage.prototype.sequenceId = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(GroupStateUpdateMessage.prototype, "_sequenceId", {
            get: $util.oneOfGetter($oneOfFields = ["sequenceId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new GroupStateUpdateMessage instance using the specified properties.
         * @function create
         * @memberof DownstreamMessage.GroupStateUpdateMessage
         * @static
         * @param {DownstreamMessage.IGroupStateUpdateMessage=} [properties] Properties to set
         * @returns {DownstreamMessage.GroupStateUpdateMessage} GroupStateUpdateMessage instance
         */
        GroupStateUpdateMessage.create = function create(properties) {
            return new GroupStateUpdateMessage(properties);
        };

        /**
         * Encodes the specified GroupStateUpdateMessage message. Does not implicitly {@link DownstreamMessage.GroupStateUpdateMessage.verify|verify} messages.
         * @function encode
         * @memberof DownstreamMessage.GroupStateUpdateMessage
         * @static
         * @param {DownstreamMessage.IGroupStateUpdateMessage} message GroupStateUpdateMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GroupStateUpdateMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.group != null && Object.hasOwnProperty.call(message, "group"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.group);
            if (message.items != null && message.items.length)
                for (let i = 0; i < message.items.length; ++i)
                    $root.GroupStateItem.encode(message.items[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.sequenceId != null && Object.hasOwnProperty.call(message, "sequenceId"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.sequenceId);
            return writer;
        };

        /**
         * Encodes the specified GroupStateUpdateMessage message, length delimited. Does not implicitly {@link DownstreamMessage.GroupStateUpdateMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof DownstreamMessage.GroupStateUpdateMessage
         * @static
         * @param {DownstreamMessage.IGroupStateUpdateMessage} message GroupStateUpdateMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GroupStateUpdateMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GroupStateUpdateMessage message from the specified reader or buffer.
         * @function decode
         * @memberof DownstreamMessage.GroupStateUpdateMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {DownstreamMessage.GroupStateUpdateMessage} GroupStateUpdateMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GroupStateUpdateMessage.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.DownstreamMessage.GroupStateUpdateMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.group = reader.string();
                        break;
                    }
                case 2: {
                        if (!(message.items && message.items.length))
                            message.items = [];
                        message.items.push($root.GroupStateItem.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 3: {
                        message.sequenceId = reader.uint64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GroupStateUpdateMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof DownstreamMessage.GroupStateUpdateMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {DownstreamMessage.GroupStateUpdateMessage} GroupStateUpdateMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GroupStateUpdateMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GroupStateUpdateMessage message.
         * @function verify
         * @memberof DownstreamMessage.GroupStateUpdateMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GroupStateUpdateMessage.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            let properties = {};
            if (message.group != null && message.hasOwnProperty("group"))
                if (!$util.isString(message.group))
                    return "group: string expected";
            if (message.items != null && message.hasOwnProperty("items")) {
                if (!Array.isArray(message.items))
                    return "items: array expected";
                for (let i = 0; i < message.items.length; ++i) {
                    let error = $root.GroupStateItem.verify(message.items[i], long + 1);
                    if (error)
                        return "items." + error;
                }
            }
            if (message.sequenceId != null && message.hasOwnProperty("sequenceId")) {
                properties._sequenceId = 1;
                if (!$util.isInteger(message.sequenceId) && !(message.sequenceId && $util.isInteger(message.sequenceId.low) && $util.isInteger(message.sequenceId.high)))
                    return "sequenceId: integer|Long expected";
            }
            return null;
        };

        /**
         * Creates a GroupStateUpdateMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof DownstreamMessage.GroupStateUpdateMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {DownstreamMessage.GroupStateUpdateMessage} GroupStateUpdateMessage
         */
        GroupStateUpdateMessage.fromObject = function fromObject(object, long) {
            if (object instanceof $root.DownstreamMessage.GroupStateUpdateMessage)
                return object;
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.DownstreamMessage.GroupStateUpdateMessage();
            if (object.group != null)
                message.group = String(object.group);
            if (object.items) {
                if (!Array.isArray(object.items))
                    throw TypeError(".DownstreamMessage.GroupStateUpdateMessage.items: array expected");
                message.items = [];
                for (let i = 0; i < object.items.length; ++i) {
                    if (typeof object.items[i] !== "object")
                        throw TypeError(".DownstreamMessage.GroupStateUpdateMessage.items: object expected");
                    message.items[i] = $root.GroupStateItem.fromObject(object.items[i], long + 1);
                }
            }
            if (object.sequenceId != null)
                if ($util.Long)
                    (message.sequenceId = $util.Long.fromValue(object.sequenceId)).unsigned = true;
                else if (typeof object.sequenceId === "string")
                    message.sequenceId = parseInt(object.sequenceId, 10);
                else if (typeof object.sequenceId === "number")
                    message.sequenceId = object.sequenceId;
                else if (typeof object.sequenceId === "object")
                    message.sequenceId = new $util.LongBits(object.sequenceId.low >>> 0, object.sequenceId.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a GroupStateUpdateMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof DownstreamMessage.GroupStateUpdateMessage
         * @static
         * @param {DownstreamMessage.GroupStateUpdateMessage} message GroupStateUpdateMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GroupStateUpdateMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.items = [];
            if (options.defaults)
                object.group = "";
            if (message.group != null && message.hasOwnProperty("group"))
                object.group = message.group;
            if (message.items && message.items.length) {
                object.items = [];
                for (let j = 0; j < message.items.length; ++j)
                    object.items[j] = $root.GroupStateItem.toObject(message.items[j], options);
            }
            if (message.sequenceId != null && message.hasOwnProperty("sequenceId")) {
                if (typeof message.sequenceId === "number")
                    object.sequenceId = options.longs === String ? String(message.sequenceId) : message.sequenceId;
                else
                    object.sequenceId = options.longs === String ? $util.Long.prototype.toString.call(message.sequenceId) : options.longs === Number ? new $util.LongBits(message.sequenceId.low >>> 0, message.sequenceId.high >>> 0).toNumber(true) : message.sequenceId;
                if (options.oneofs)
                    object._sequenceId = "sequenceId";
            }
            return object;
        };

        /**
         * Converts this GroupStateUpdateMessage to JSON.
         * @function toJSON
         * @memberof DownstreamMessage.GroupStateUpdateMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GroupStateUpdateMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GroupStateUpdateMessage
         * @function getTypeUrl
         * @memberof DownstreamMessage.GroupStateUpdateMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GroupStateUpdateMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/DownstreamMessage.GroupStateUpdateMessage";
        };

        return GroupStateUpdateMessage;
    })();

    return DownstreamMessage;
})();

export const MessageData = $root.MessageData = (() => {

    /**
     * Properties of a MessageData.
     * @exports IMessageData
     * @interface IMessageData
     * @property {string|null} [textData] MessageData textData
     * @property {Uint8Array|null} [binaryData] MessageData binaryData
     * @property {google.protobuf.IAny|null} [protobufData] MessageData protobufData
     * @property {string|null} [jsonData] MessageData jsonData
     */

    /**
     * Constructs a new MessageData.
     * @exports MessageData
     * @classdesc Represents a MessageData.
     * @implements IMessageData
     * @constructor
     * @param {IMessageData=} [properties] Properties to set
     */
    function MessageData(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MessageData textData.
     * @member {string|null|undefined} textData
     * @memberof MessageData
     * @instance
     */
    MessageData.prototype.textData = null;

    /**
     * MessageData binaryData.
     * @member {Uint8Array|null|undefined} binaryData
     * @memberof MessageData
     * @instance
     */
    MessageData.prototype.binaryData = null;

    /**
     * MessageData protobufData.
     * @member {google.protobuf.IAny|null|undefined} protobufData
     * @memberof MessageData
     * @instance
     */
    MessageData.prototype.protobufData = null;

    /**
     * MessageData jsonData.
     * @member {string|null|undefined} jsonData
     * @memberof MessageData
     * @instance
     */
    MessageData.prototype.jsonData = null;

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields;

    /**
     * MessageData data.
     * @member {"textData"|"binaryData"|"protobufData"|"jsonData"|undefined} data
     * @memberof MessageData
     * @instance
     */
    Object.defineProperty(MessageData.prototype, "data", {
        get: $util.oneOfGetter($oneOfFields = ["textData", "binaryData", "protobufData", "jsonData"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new MessageData instance using the specified properties.
     * @function create
     * @memberof MessageData
     * @static
     * @param {IMessageData=} [properties] Properties to set
     * @returns {MessageData} MessageData instance
     */
    MessageData.create = function create(properties) {
        return new MessageData(properties);
    };

    /**
     * Encodes the specified MessageData message. Does not implicitly {@link MessageData.verify|verify} messages.
     * @function encode
     * @memberof MessageData
     * @static
     * @param {IMessageData} message MessageData message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MessageData.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.textData != null && Object.hasOwnProperty.call(message, "textData"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.textData);
        if (message.binaryData != null && Object.hasOwnProperty.call(message, "binaryData"))
            writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.binaryData);
        if (message.protobufData != null && Object.hasOwnProperty.call(message, "protobufData"))
            $root.google.protobuf.Any.encode(message.protobufData, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.jsonData != null && Object.hasOwnProperty.call(message, "jsonData"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.jsonData);
        return writer;
    };

    /**
     * Encodes the specified MessageData message, length delimited. Does not implicitly {@link MessageData.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MessageData
     * @static
     * @param {IMessageData} message MessageData message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MessageData.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MessageData message from the specified reader or buffer.
     * @function decode
     * @memberof MessageData
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MessageData} MessageData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MessageData.decode = function decode(reader, length, error, long) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (long === undefined)
            long = 0;
        if (long > $Reader.recursionLimit)
            throw Error("maximum nesting depth exceeded");
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.MessageData();
        while (reader.pos < end) {
            let tag = reader.uint32();
            if (tag === error)
                break;
            switch (tag >>> 3) {
            case 1: {
                    message.textData = reader.string();
                    break;
                }
            case 2: {
                    message.binaryData = reader.bytes();
                    break;
                }
            case 3: {
                    message.protobufData = $root.google.protobuf.Any.decode(reader, reader.uint32(), undefined, long + 1);
                    break;
                }
            case 4: {
                    message.jsonData = reader.string();
                    break;
                }
            default:
                reader.skipType(tag & 7, long);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a MessageData message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MessageData
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MessageData} MessageData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MessageData.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MessageData message.
     * @function verify
     * @memberof MessageData
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MessageData.verify = function verify(message, long) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (long === undefined)
            long = 0;
        if (long > $util.recursionLimit)
            return "maximum nesting depth exceeded";
        let properties = {};
        if (message.textData != null && message.hasOwnProperty("textData")) {
            properties.data = 1;
            if (!$util.isString(message.textData))
                return "textData: string expected";
        }
        if (message.binaryData != null && message.hasOwnProperty("binaryData")) {
            if (properties.data === 1)
                return "data: multiple values";
            properties.data = 1;
            if (!(message.binaryData && typeof message.binaryData.length === "number" || $util.isString(message.binaryData)))
                return "binaryData: buffer expected";
        }
        if (message.protobufData != null && message.hasOwnProperty("protobufData")) {
            if (properties.data === 1)
                return "data: multiple values";
            properties.data = 1;
            {
                let error = $root.google.protobuf.Any.verify(message.protobufData, long + 1);
                if (error)
                    return "protobufData." + error;
            }
        }
        if (message.jsonData != null && message.hasOwnProperty("jsonData")) {
            if (properties.data === 1)
                return "data: multiple values";
            properties.data = 1;
            if (!$util.isString(message.jsonData))
                return "jsonData: string expected";
        }
        return null;
    };

    /**
     * Creates a MessageData message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MessageData
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MessageData} MessageData
     */
    MessageData.fromObject = function fromObject(object, long) {
        if (object instanceof $root.MessageData)
            return object;
        if (long === undefined)
            long = 0;
        if (long > $util.recursionLimit)
            throw Error("maximum nesting depth exceeded");
        let message = new $root.MessageData();
        if (object.textData != null)
            message.textData = String(object.textData);
        if (object.binaryData != null)
            if (typeof object.binaryData === "string")
                $util.base64.decode(object.binaryData, message.binaryData = $util.newBuffer($util.base64.length(object.binaryData)), 0);
            else if (object.binaryData.length >= 0)
                message.binaryData = object.binaryData;
        if (object.protobufData != null) {
            if (typeof object.protobufData !== "object")
                throw TypeError(".MessageData.protobufData: object expected");
            message.protobufData = $root.google.protobuf.Any.fromObject(object.protobufData, long + 1);
        }
        if (object.jsonData != null)
            message.jsonData = String(object.jsonData);
        return message;
    };

    /**
     * Creates a plain object from a MessageData message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MessageData
     * @static
     * @param {MessageData} message MessageData
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MessageData.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (message.textData != null && message.hasOwnProperty("textData")) {
            object.textData = message.textData;
            if (options.oneofs)
                object.data = "textData";
        }
        if (message.binaryData != null && message.hasOwnProperty("binaryData")) {
            object.binaryData = options.bytes === String ? $util.base64.encode(message.binaryData, 0, message.binaryData.length) : options.bytes === Array ? Array.prototype.slice.call(message.binaryData) : message.binaryData;
            if (options.oneofs)
                object.data = "binaryData";
        }
        if (message.protobufData != null && message.hasOwnProperty("protobufData")) {
            object.protobufData = $root.google.protobuf.Any.toObject(message.protobufData, options);
            if (options.oneofs)
                object.data = "protobufData";
        }
        if (message.jsonData != null && message.hasOwnProperty("jsonData")) {
            object.jsonData = message.jsonData;
            if (options.oneofs)
                object.data = "jsonData";
        }
        return object;
    };

    /**
     * Converts this MessageData to JSON.
     * @function toJSON
     * @memberof MessageData
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MessageData.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for MessageData
     * @function getTypeUrl
     * @memberof MessageData
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    MessageData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/MessageData";
    };

    return MessageData;
})();

export const GroupStateItem = $root.GroupStateItem = (() => {

    /**
     * Properties of a GroupStateItem.
     * @exports IGroupStateItem
     * @interface IGroupStateItem
     * @property {string|null} [connectionId] GroupStateItem connectionId
     * @property {string|null} [userId] GroupStateItem userId
     * @property {GroupStateItem.IGroupState|null} [state] GroupStateItem state
     * @property {number|Long|null} [updatedAt] GroupStateItem updatedAt
     */

    /**
     * Constructs a new GroupStateItem.
     * @exports GroupStateItem
     * @classdesc Represents a GroupStateItem.
     * @implements IGroupStateItem
     * @constructor
     * @param {IGroupStateItem=} [properties] Properties to set
     */
    function GroupStateItem(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GroupStateItem connectionId.
     * @member {string} connectionId
     * @memberof GroupStateItem
     * @instance
     */
    GroupStateItem.prototype.connectionId = "";

    /**
     * GroupStateItem userId.
     * @member {string|null|undefined} userId
     * @memberof GroupStateItem
     * @instance
     */
    GroupStateItem.prototype.userId = null;

    /**
     * GroupStateItem state.
     * @member {GroupStateItem.IGroupState|null|undefined} state
     * @memberof GroupStateItem
     * @instance
     */
    GroupStateItem.prototype.state = null;

    /**
     * GroupStateItem updatedAt.
     * @member {number|Long} updatedAt
     * @memberof GroupStateItem
     * @instance
     */
    GroupStateItem.prototype.updatedAt = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields;

    // Virtual OneOf for proto3 optional field
    Object.defineProperty(GroupStateItem.prototype, "_userId", {
        get: $util.oneOfGetter($oneOfFields = ["userId"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    // Virtual OneOf for proto3 optional field
    Object.defineProperty(GroupStateItem.prototype, "_state", {
        get: $util.oneOfGetter($oneOfFields = ["state"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new GroupStateItem instance using the specified properties.
     * @function create
     * @memberof GroupStateItem
     * @static
     * @param {IGroupStateItem=} [properties] Properties to set
     * @returns {GroupStateItem} GroupStateItem instance
     */
    GroupStateItem.create = function create(properties) {
        return new GroupStateItem(properties);
    };

    /**
     * Encodes the specified GroupStateItem message. Does not implicitly {@link GroupStateItem.verify|verify} messages.
     * @function encode
     * @memberof GroupStateItem
     * @static
     * @param {IGroupStateItem} message GroupStateItem message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GroupStateItem.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.connectionId != null && Object.hasOwnProperty.call(message, "connectionId"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.connectionId);
        if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.userId);
        if (message.state != null && Object.hasOwnProperty.call(message, "state"))
            $root.GroupStateItem.GroupState.encode(message.state, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.updatedAt != null && Object.hasOwnProperty.call(message, "updatedAt"))
            writer.uint32(/* id 4, wireType 0 =*/32).int64(message.updatedAt);
        return writer;
    };

    /**
     * Encodes the specified GroupStateItem message, length delimited. Does not implicitly {@link GroupStateItem.verify|verify} messages.
     * @function encodeDelimited
     * @memberof GroupStateItem
     * @static
     * @param {IGroupStateItem} message GroupStateItem message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GroupStateItem.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GroupStateItem message from the specified reader or buffer.
     * @function decode
     * @memberof GroupStateItem
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GroupStateItem} GroupStateItem
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GroupStateItem.decode = function decode(reader, length, error, long) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (long === undefined)
            long = 0;
        if (long > $Reader.recursionLimit)
            throw Error("maximum nesting depth exceeded");
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GroupStateItem();
        while (reader.pos < end) {
            let tag = reader.uint32();
            if (tag === error)
                break;
            switch (tag >>> 3) {
            case 1: {
                    message.connectionId = reader.string();
                    break;
                }
            case 2: {
                    message.userId = reader.string();
                    break;
                }
            case 3: {
                    message.state = $root.GroupStateItem.GroupState.decode(reader, reader.uint32(), undefined, long + 1);
                    break;
                }
            case 4: {
                    message.updatedAt = reader.int64();
                    break;
                }
            default:
                reader.skipType(tag & 7, long);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a GroupStateItem message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof GroupStateItem
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GroupStateItem} GroupStateItem
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GroupStateItem.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GroupStateItem message.
     * @function verify
     * @memberof GroupStateItem
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    GroupStateItem.verify = function verify(message, long) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (long === undefined)
            long = 0;
        if (long > $util.recursionLimit)
            return "maximum nesting depth exceeded";
        let properties = {};
        if (message.connectionId != null && message.hasOwnProperty("connectionId"))
            if (!$util.isString(message.connectionId))
                return "connectionId: string expected";
        if (message.userId != null && message.hasOwnProperty("userId")) {
            properties._userId = 1;
            if (!$util.isString(message.userId))
                return "userId: string expected";
        }
        if (message.state != null && message.hasOwnProperty("state")) {
            properties._state = 1;
            {
                let error = $root.GroupStateItem.GroupState.verify(message.state, long + 1);
                if (error)
                    return "state." + error;
            }
        }
        if (message.updatedAt != null && message.hasOwnProperty("updatedAt"))
            if (!$util.isInteger(message.updatedAt) && !(message.updatedAt && $util.isInteger(message.updatedAt.low) && $util.isInteger(message.updatedAt.high)))
                return "updatedAt: integer|Long expected";
        return null;
    };

    /**
     * Creates a GroupStateItem message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof GroupStateItem
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {GroupStateItem} GroupStateItem
     */
    GroupStateItem.fromObject = function fromObject(object, long) {
        if (object instanceof $root.GroupStateItem)
            return object;
        if (long === undefined)
            long = 0;
        if (long > $util.recursionLimit)
            throw Error("maximum nesting depth exceeded");
        let message = new $root.GroupStateItem();
        if (object.connectionId != null)
            message.connectionId = String(object.connectionId);
        if (object.userId != null)
            message.userId = String(object.userId);
        if (object.state != null) {
            if (typeof object.state !== "object")
                throw TypeError(".GroupStateItem.state: object expected");
            message.state = $root.GroupStateItem.GroupState.fromObject(object.state, long + 1);
        }
        if (object.updatedAt != null)
            if ($util.Long)
                (message.updatedAt = $util.Long.fromValue(object.updatedAt)).unsigned = false;
            else if (typeof object.updatedAt === "string")
                message.updatedAt = parseInt(object.updatedAt, 10);
            else if (typeof object.updatedAt === "number")
                message.updatedAt = object.updatedAt;
            else if (typeof object.updatedAt === "object")
                message.updatedAt = new $util.LongBits(object.updatedAt.low >>> 0, object.updatedAt.high >>> 0).toNumber();
        return message;
    };

    /**
     * Creates a plain object from a GroupStateItem message. Also converts values to other types if specified.
     * @function toObject
     * @memberof GroupStateItem
     * @static
     * @param {GroupStateItem} message GroupStateItem
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    GroupStateItem.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.connectionId = "";
            if ($util.Long) {
                let long = new $util.Long(0, 0, false);
                object.updatedAt = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.updatedAt = options.longs === String ? "0" : 0;
        }
        if (message.connectionId != null && message.hasOwnProperty("connectionId"))
            object.connectionId = message.connectionId;
        if (message.userId != null && message.hasOwnProperty("userId")) {
            object.userId = message.userId;
            if (options.oneofs)
                object._userId = "userId";
        }
        if (message.state != null && message.hasOwnProperty("state")) {
            object.state = $root.GroupStateItem.GroupState.toObject(message.state, options);
            if (options.oneofs)
                object._state = "state";
        }
        if (message.updatedAt != null && message.hasOwnProperty("updatedAt"))
            if (typeof message.updatedAt === "number")
                object.updatedAt = options.longs === String ? String(message.updatedAt) : message.updatedAt;
            else
                object.updatedAt = options.longs === String ? $util.Long.prototype.toString.call(message.updatedAt) : options.longs === Number ? new $util.LongBits(message.updatedAt.low >>> 0, message.updatedAt.high >>> 0).toNumber() : message.updatedAt;
        return object;
    };

    /**
     * Converts this GroupStateItem to JSON.
     * @function toJSON
     * @memberof GroupStateItem
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    GroupStateItem.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for GroupStateItem
     * @function getTypeUrl
     * @memberof GroupStateItem
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    GroupStateItem.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/GroupStateItem";
    };

    GroupStateItem.GroupState = (function() {

        /**
         * Properties of a GroupState.
         * @memberof GroupStateItem
         * @interface IGroupState
         * @property {Object.<string,string>|null} [entries] GroupState entries
         */

        /**
         * Constructs a new GroupState.
         * @memberof GroupStateItem
         * @classdesc Represents a GroupState.
         * @implements IGroupState
         * @constructor
         * @param {GroupStateItem.IGroupState=} [properties] Properties to set
         */
        function GroupState(properties) {
            this.entries = {};
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GroupState entries.
         * @member {Object.<string,string>} entries
         * @memberof GroupStateItem.GroupState
         * @instance
         */
        GroupState.prototype.entries = $util.emptyObject;

        /**
         * Creates a new GroupState instance using the specified properties.
         * @function create
         * @memberof GroupStateItem.GroupState
         * @static
         * @param {GroupStateItem.IGroupState=} [properties] Properties to set
         * @returns {GroupStateItem.GroupState} GroupState instance
         */
        GroupState.create = function create(properties) {
            return new GroupState(properties);
        };

        /**
         * Encodes the specified GroupState message. Does not implicitly {@link GroupStateItem.GroupState.verify|verify} messages.
         * @function encode
         * @memberof GroupStateItem.GroupState
         * @static
         * @param {GroupStateItem.IGroupState} message GroupState message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GroupState.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.entries != null && Object.hasOwnProperty.call(message, "entries"))
                for (let keys = Object.keys(message.entries), i = 0; i < keys.length; ++i)
                    writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.entries[keys[i]]).ldelim();
            return writer;
        };

        /**
         * Encodes the specified GroupState message, length delimited. Does not implicitly {@link GroupStateItem.GroupState.verify|verify} messages.
         * @function encodeDelimited
         * @memberof GroupStateItem.GroupState
         * @static
         * @param {GroupStateItem.IGroupState} message GroupState message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GroupState.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GroupState message from the specified reader or buffer.
         * @function decode
         * @memberof GroupStateItem.GroupState
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {GroupStateItem.GroupState} GroupState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GroupState.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.GroupStateItem.GroupState(), key, value;
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (message.entries === $util.emptyObject)
                            message.entries = {};
                        let end2 = reader.uint32() + reader.pos;
                        key = "";
                        value = "";
                        while (reader.pos < end2) {
                            let tag2 = reader.uint32();
                            switch (tag2 >>> 3) {
                            case 1:
                                key = reader.string();
                                break;
                            case 2:
                                value = reader.string();
                                break;
                            default:
                                reader.skipType(tag2 & 7, long);
                                break;
                            }
                        }
                        if (key === "__proto__")
                            $util.makeProp(message.entries, key);
                        message.entries[key] = value;
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GroupState message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof GroupStateItem.GroupState
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {GroupStateItem.GroupState} GroupState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GroupState.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GroupState message.
         * @function verify
         * @memberof GroupStateItem.GroupState
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GroupState.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.entries != null && message.hasOwnProperty("entries")) {
                if (!$util.isObject(message.entries))
                    return "entries: object expected";
                let key = Object.keys(message.entries);
                for (let i = 0; i < key.length; ++i)
                    if (!$util.isString(message.entries[key[i]]))
                        return "entries: string{k:string} expected";
            }
            return null;
        };

        /**
         * Creates a GroupState message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof GroupStateItem.GroupState
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {GroupStateItem.GroupState} GroupState
         */
        GroupState.fromObject = function fromObject(object, long) {
            if (object instanceof $root.GroupStateItem.GroupState)
                return object;
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.GroupStateItem.GroupState();
            if (object.entries) {
                if (typeof object.entries !== "object")
                    throw TypeError(".GroupStateItem.GroupState.entries: object expected");
                message.entries = {};
                for (let keys = Object.keys(object.entries), i = 0; i < keys.length; ++i) {
                    if (keys[i] === "__proto__")
                        $util.makeProp(message.entries, keys[i]);
                    message.entries[keys[i]] = String(object.entries[keys[i]]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a GroupState message. Also converts values to other types if specified.
         * @function toObject
         * @memberof GroupStateItem.GroupState
         * @static
         * @param {GroupStateItem.GroupState} message GroupState
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GroupState.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.objects || options.defaults)
                object.entries = {};
            let keys2;
            if (message.entries && (keys2 = Object.keys(message.entries)).length) {
                object.entries = {};
                for (let j = 0; j < keys2.length; ++j) {
                    if (keys2[j] === "__proto__")
                        $util.makeProp(object.entries, keys2[j]);
                    object.entries[keys2[j]] = message.entries[keys2[j]];
                }
            }
            return object;
        };

        /**
         * Converts this GroupState to JSON.
         * @function toJSON
         * @memberof GroupStateItem.GroupState
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GroupState.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GroupState
         * @function getTypeUrl
         * @memberof GroupStateItem.GroupState
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GroupState.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/GroupStateItem.GroupState";
        };

        return GroupState;
    })();

    return GroupStateItem;
})();

export const google = $root.google = (() => {

    /**
     * Namespace google.
     * @exports google
     * @namespace
     */
    const google = {};

    google.protobuf = (function() {

        /**
         * Namespace protobuf.
         * @memberof google
         * @namespace
         */
        const protobuf = {};

        protobuf.Any = (function() {

            /**
             * Properties of an Any.
             * @memberof google.protobuf
             * @interface IAny
             * @property {string|null} [type_url] Any type_url
             * @property {Uint8Array|null} [value] Any value
             */

            /**
             * Constructs a new Any.
             * @memberof google.protobuf
             * @classdesc Represents an Any.
             * @implements IAny
             * @constructor
             * @param {google.protobuf.IAny=} [properties] Properties to set
             */
            function Any(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Any type_url.
             * @member {string} type_url
             * @memberof google.protobuf.Any
             * @instance
             */
            Any.prototype.type_url = "";

            /**
             * Any value.
             * @member {Uint8Array} value
             * @memberof google.protobuf.Any
             * @instance
             */
            Any.prototype.value = $util.newBuffer([]);

            /**
             * Creates a new Any instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.IAny=} [properties] Properties to set
             * @returns {google.protobuf.Any} Any instance
             */
            Any.create = function create(properties) {
                return new Any(properties);
            };

            /**
             * Encodes the specified Any message. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.IAny} message Any message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Any.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.type_url != null && Object.hasOwnProperty.call(message, "type_url"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.type_url);
                if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.value);
                return writer;
            };

            /**
             * Encodes the specified Any message, length delimited. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.IAny} message Any message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Any.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Any message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Any
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Any} Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Any.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Any();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.type_url = reader.string();
                            break;
                        }
                    case 2: {
                            message.value = reader.bytes();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an Any message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Any
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Any} Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Any.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Any message.
             * @function verify
             * @memberof google.protobuf.Any
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Any.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.type_url != null && message.hasOwnProperty("type_url"))
                    if (!$util.isString(message.type_url))
                        return "type_url: string expected";
                if (message.value != null && message.hasOwnProperty("value"))
                    if (!(message.value && typeof message.value.length === "number" || $util.isString(message.value)))
                        return "value: buffer expected";
                return null;
            };

            /**
             * Creates an Any message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Any
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Any} Any
             */
            Any.fromObject = function fromObject(object, long) {
                if (object instanceof $root.google.protobuf.Any)
                    return object;
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.google.protobuf.Any();
                if (object.type_url != null)
                    message.type_url = String(object.type_url);
                if (object.value != null)
                    if (typeof object.value === "string")
                        $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0);
                    else if (object.value.length >= 0)
                        message.value = object.value;
                return message;
            };

            /**
             * Creates a plain object from an Any message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.Any} message Any
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Any.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.type_url = "";
                    if (options.bytes === String)
                        object.value = "";
                    else {
                        object.value = [];
                        if (options.bytes !== Array)
                            object.value = $util.newBuffer(object.value);
                    }
                }
                if (message.type_url != null && message.hasOwnProperty("type_url"))
                    object.type_url = message.type_url;
                if (message.value != null && message.hasOwnProperty("value"))
                    object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value;
                return object;
            };

            /**
             * Converts this Any to JSON.
             * @function toJSON
             * @memberof google.protobuf.Any
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Any.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Any
             * @function getTypeUrl
             * @memberof google.protobuf.Any
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Any.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/google.protobuf.Any";
            };

            return Any;
        })();

        return protobuf;
    })();

    return google;
})();

export { $root as default };
