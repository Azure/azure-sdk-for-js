/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-mixed-operators, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars, default-case, jsdoc/require-param*/
import $protobuf from "protobufjs/minimal.js";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
const $Object = $util.global.Object, $undefined = $util.global.undefined, $Error = $util.global.Error, $RangeError = $util.global.RangeError, $TypeError = $util.global.TypeError, $String = $util.global.String, $parseInt = $util.global.parseInt, $Boolean = $util.global.Boolean, $BigInt = $util.global.BigInt, $Number = $util.global.Number, $Array = $util.global.Array;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const UpstreamMessage = $root.UpstreamMessage = (() => {

    /**
     * Properties of an UpstreamMessage.
     * @typedef {Object} UpstreamMessage.$Properties
     * @property {UpstreamMessage.SendToGroupMessage.$Properties|null} [sendToGroupMessage] UpstreamMessage sendToGroupMessage
     * @property {UpstreamMessage.EventMessage.$Properties|null} [eventMessage] UpstreamMessage eventMessage
     * @property {UpstreamMessage.JoinGroupMessage.$Properties|null} [joinGroupMessage] UpstreamMessage joinGroupMessage
     * @property {UpstreamMessage.LeaveGroupMessage.$Properties|null} [leaveGroupMessage] UpstreamMessage leaveGroupMessage
     * @property {UpstreamMessage.SequenceAckMessage.$Properties|null} [sequenceAckMessage] UpstreamMessage sequenceAckMessage
     * @property {"sendToGroupMessage"|"eventMessage"|"joinGroupMessage"|"leaveGroupMessage"|"sequenceAckMessage"} [message] UpstreamMessage message
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */

    /**
     * Properties of an UpstreamMessage.
     * @exports IUpstreamMessage
     * @interface IUpstreamMessage
     * @augments UpstreamMessage.$Properties
     * @deprecated Use UpstreamMessage.$Properties instead.
     */

    /**
     * Narrowed shape of an UpstreamMessage.
     * @typedef {{
     *   sendToGroupMessage?: UpstreamMessage.SendToGroupMessage.$Shape|null;
     *   eventMessage?: UpstreamMessage.EventMessage.$Shape|null;
     *   joinGroupMessage?: UpstreamMessage.JoinGroupMessage.$Shape|null;
     *   leaveGroupMessage?: UpstreamMessage.LeaveGroupMessage.$Shape|null;
     *   sequenceAckMessage?: UpstreamMessage.SequenceAckMessage.$Shape|null;
     *   $unknowns?: Array.<Uint8Array>;
     * } & (
     *   ({ message?: undefined; sendToGroupMessage?: null; eventMessage?: null; joinGroupMessage?: null; leaveGroupMessage?: null; sequenceAckMessage?: null }|{ message?: "sendToGroupMessage"; sendToGroupMessage: UpstreamMessage.SendToGroupMessage.$Shape; eventMessage?: null; joinGroupMessage?: null; leaveGroupMessage?: null; sequenceAckMessage?: null }|{ message?: "eventMessage"; sendToGroupMessage?: null; eventMessage: UpstreamMessage.EventMessage.$Shape; joinGroupMessage?: null; leaveGroupMessage?: null; sequenceAckMessage?: null }|{ message?: "joinGroupMessage"; sendToGroupMessage?: null; eventMessage?: null; joinGroupMessage: UpstreamMessage.JoinGroupMessage.$Shape; leaveGroupMessage?: null; sequenceAckMessage?: null }|{ message?: "leaveGroupMessage"; sendToGroupMessage?: null; eventMessage?: null; joinGroupMessage?: null; leaveGroupMessage: UpstreamMessage.LeaveGroupMessage.$Shape; sequenceAckMessage?: null }|{ message?: "sequenceAckMessage"; sendToGroupMessage?: null; eventMessage?: null; joinGroupMessage?: null; leaveGroupMessage?: null; sequenceAckMessage: UpstreamMessage.SequenceAckMessage.$Shape })
     * )} UpstreamMessage.$Shape
     */

    /**
     * Constructs a new UpstreamMessage.
     * @exports UpstreamMessage
     * @classdesc Represents an UpstreamMessage.
     * @constructor
     * @param {UpstreamMessage.$Properties=} [properties] Properties to set
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */
    const UpstreamMessage = function (properties) {
        if (properties)
            for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    };

    /**
     * UpstreamMessage sendToGroupMessage.
     * @member {UpstreamMessage.SendToGroupMessage.$Properties|null|undefined} sendToGroupMessage
     * @memberof UpstreamMessage
     * @instance
     */
    UpstreamMessage.prototype.sendToGroupMessage = null;

    /**
     * UpstreamMessage eventMessage.
     * @member {UpstreamMessage.EventMessage.$Properties|null|undefined} eventMessage
     * @memberof UpstreamMessage
     * @instance
     */
    UpstreamMessage.prototype.eventMessage = null;

    /**
     * UpstreamMessage joinGroupMessage.
     * @member {UpstreamMessage.JoinGroupMessage.$Properties|null|undefined} joinGroupMessage
     * @memberof UpstreamMessage
     * @instance
     */
    UpstreamMessage.prototype.joinGroupMessage = null;

    /**
     * UpstreamMessage leaveGroupMessage.
     * @member {UpstreamMessage.LeaveGroupMessage.$Properties|null|undefined} leaveGroupMessage
     * @memberof UpstreamMessage
     * @instance
     */
    UpstreamMessage.prototype.leaveGroupMessage = null;

    /**
     * UpstreamMessage sequenceAckMessage.
     * @member {UpstreamMessage.SequenceAckMessage.$Properties|null|undefined} sequenceAckMessage
     * @memberof UpstreamMessage
     * @instance
     */
    UpstreamMessage.prototype.sequenceAckMessage = null;

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields;

    /**
     * UpstreamMessage message.
     * @member {"sendToGroupMessage"|"eventMessage"|"joinGroupMessage"|"leaveGroupMessage"|"sequenceAckMessage"|undefined} message
     * @memberof UpstreamMessage
     * @instance
     */
    $Object.defineProperty(UpstreamMessage.prototype, "message", {
        get: $util.oneOfGetter($oneOfFields = ["sendToGroupMessage", "eventMessage", "joinGroupMessage", "leaveGroupMessage", "sequenceAckMessage"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new UpstreamMessage instance using the specified properties.
     * @function create
     * @memberof UpstreamMessage
     * @static
     * @param {UpstreamMessage.$Properties=} [properties] Properties to set
     * @returns {UpstreamMessage} UpstreamMessage instance
     * @type {{
     *   (properties: UpstreamMessage.$Shape): UpstreamMessage & UpstreamMessage.$Shape;
     *   (properties?: UpstreamMessage.$Properties): UpstreamMessage;
     * }}
     */
    UpstreamMessage.create = function(properties) {
        return new UpstreamMessage(properties);
    };

    /**
     * Encodes the specified UpstreamMessage message. Does not implicitly {@link UpstreamMessage.verify|verify} messages.
     * @function encode
     * @memberof UpstreamMessage
     * @static
     * @param {UpstreamMessage.$Properties} message UpstreamMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    UpstreamMessage.encode = function (message, writer, _depth) {
        if (!writer)
            writer = $Writer.create();
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        if (message.sendToGroupMessage != null && $Object.hasOwnProperty.call(message, "sendToGroupMessage"))
            $root.UpstreamMessage.SendToGroupMessage.encode(message.sendToGroupMessage, writer.uint32(/* id 1, wireType 2 =*/10).fork(), _depth + 1).ldelim();
        if (message.eventMessage != null && $Object.hasOwnProperty.call(message, "eventMessage"))
            $root.UpstreamMessage.EventMessage.encode(message.eventMessage, writer.uint32(/* id 5, wireType 2 =*/42).fork(), _depth + 1).ldelim();
        if (message.joinGroupMessage != null && $Object.hasOwnProperty.call(message, "joinGroupMessage"))
            $root.UpstreamMessage.JoinGroupMessage.encode(message.joinGroupMessage, writer.uint32(/* id 6, wireType 2 =*/50).fork(), _depth + 1).ldelim();
        if (message.leaveGroupMessage != null && $Object.hasOwnProperty.call(message, "leaveGroupMessage"))
            $root.UpstreamMessage.LeaveGroupMessage.encode(message.leaveGroupMessage, writer.uint32(/* id 7, wireType 2 =*/58).fork(), _depth + 1).ldelim();
        if (message.sequenceAckMessage != null && $Object.hasOwnProperty.call(message, "sequenceAckMessage"))
            $root.UpstreamMessage.SequenceAckMessage.encode(message.sequenceAckMessage, writer.uint32(/* id 8, wireType 2 =*/66).fork(), _depth + 1).ldelim();
        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
            for (let i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
        return writer;
    };

    /**
     * Encodes the specified UpstreamMessage message, length delimited. Does not implicitly {@link UpstreamMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof UpstreamMessage
     * @static
     * @param {UpstreamMessage.$Properties} message UpstreamMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    UpstreamMessage.encodeDelimited = function(message, writer) {
        return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
    };

    /**
     * Decodes an UpstreamMessage message from the specified reader or buffer.
     * @function decode
     * @memberof UpstreamMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {UpstreamMessage & UpstreamMessage.$Shape} UpstreamMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    UpstreamMessage.decode = function (reader, length, _end, _depth, _target) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $Reader.recursionLimit)
            throw $Error("max depth exceeded");
        let end, message;
        if (length === $undefined)
            end = reader.len;
        else {
            end = reader.pos + length;
            if (end > reader.len)
                throw $RangeError("index out of range");
            length = reader.len;
            reader.len = end;
        }
        message = _target || new $root.UpstreamMessage();
        while (reader.pos < end) {
            let start = reader.pos;
            let tag = reader.tag();
            if (tag === _end) {
                _end = $undefined;
                break;
            }
            let wireType = tag & 7;
            switch (tag >>>= 3) {
            case 1: {
                    if (wireType !== 2)
                        break;
                    message.sendToGroupMessage = $root.UpstreamMessage.SendToGroupMessage.decode(reader, reader.uint32(), $undefined, _depth + 1, message.sendToGroupMessage);
                    message.message = "sendToGroupMessage";
                    continue;
                }
            case 5: {
                    if (wireType !== 2)
                        break;
                    message.eventMessage = $root.UpstreamMessage.EventMessage.decode(reader, reader.uint32(), $undefined, _depth + 1, message.eventMessage);
                    message.message = "eventMessage";
                    continue;
                }
            case 6: {
                    if (wireType !== 2)
                        break;
                    message.joinGroupMessage = $root.UpstreamMessage.JoinGroupMessage.decode(reader, reader.uint32(), $undefined, _depth + 1, message.joinGroupMessage);
                    message.message = "joinGroupMessage";
                    continue;
                }
            case 7: {
                    if (wireType !== 2)
                        break;
                    message.leaveGroupMessage = $root.UpstreamMessage.LeaveGroupMessage.decode(reader, reader.uint32(), $undefined, _depth + 1, message.leaveGroupMessage);
                    message.message = "leaveGroupMessage";
                    continue;
                }
            case 8: {
                    if (wireType !== 2)
                        break;
                    message.sequenceAckMessage = $root.UpstreamMessage.SequenceAckMessage.decode(reader, reader.uint32(), $undefined, _depth + 1, message.sequenceAckMessage);
                    message.message = "sequenceAckMessage";
                    continue;
                }
            }
            reader.skipType(wireType, _depth, tag);
            if (!reader.discardUnknown) {
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
        }
        if (length !== $undefined) {
            if (reader.pos !== end)
                throw $RangeError("index out of range");
            reader.len = length;
        }
        if (_end !== $undefined)
            throw $Error("missing end group");
        return message;
    };

    /**
     * Decodes an UpstreamMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof UpstreamMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {UpstreamMessage & UpstreamMessage.$Shape} UpstreamMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    UpstreamMessage.decodeDelimited = function(reader) {
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
    UpstreamMessage.verify = function (message, _depth) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            return "max depth exceeded";
        let properties = {};
        if (message.sendToGroupMessage != null && $Object.hasOwnProperty.call(message, "sendToGroupMessage")) {
            properties.message = 1;
            {
                let error = $root.UpstreamMessage.SendToGroupMessage.verify(message.sendToGroupMessage, _depth + 1);
                if (error)
                    return "sendToGroupMessage." + error;
            }
        }
        if (message.eventMessage != null && $Object.hasOwnProperty.call(message, "eventMessage")) {
            if (properties.message === 1)
                return "message: multiple values";
            properties.message = 1;
            {
                let error = $root.UpstreamMessage.EventMessage.verify(message.eventMessage, _depth + 1);
                if (error)
                    return "eventMessage." + error;
            }
        }
        if (message.joinGroupMessage != null && $Object.hasOwnProperty.call(message, "joinGroupMessage")) {
            if (properties.message === 1)
                return "message: multiple values";
            properties.message = 1;
            {
                let error = $root.UpstreamMessage.JoinGroupMessage.verify(message.joinGroupMessage, _depth + 1);
                if (error)
                    return "joinGroupMessage." + error;
            }
        }
        if (message.leaveGroupMessage != null && $Object.hasOwnProperty.call(message, "leaveGroupMessage")) {
            if (properties.message === 1)
                return "message: multiple values";
            properties.message = 1;
            {
                let error = $root.UpstreamMessage.LeaveGroupMessage.verify(message.leaveGroupMessage, _depth + 1);
                if (error)
                    return "leaveGroupMessage." + error;
            }
        }
        if (message.sequenceAckMessage != null && $Object.hasOwnProperty.call(message, "sequenceAckMessage")) {
            if (properties.message === 1)
                return "message: multiple values";
            properties.message = 1;
            {
                let error = $root.UpstreamMessage.SequenceAckMessage.verify(message.sequenceAckMessage, _depth + 1);
                if (error)
                    return "sequenceAckMessage." + error;
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
    UpstreamMessage.fromObject = function (object, _depth) {
        if (object instanceof $root.UpstreamMessage)
            return object;
        if (!$util.isObject(object))
            throw $TypeError(".UpstreamMessage: object expected");
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let message = new $root.UpstreamMessage();
        if (object.sendToGroupMessage != null) {
            if (!$util.isObject(object.sendToGroupMessage))
                throw $TypeError(".UpstreamMessage.sendToGroupMessage: object expected");
            message.sendToGroupMessage = $root.UpstreamMessage.SendToGroupMessage.fromObject(object.sendToGroupMessage, _depth + 1);
        }
        if (object.eventMessage != null) {
            if (!$util.isObject(object.eventMessage))
                throw $TypeError(".UpstreamMessage.eventMessage: object expected");
            message.eventMessage = $root.UpstreamMessage.EventMessage.fromObject(object.eventMessage, _depth + 1);
        }
        if (object.joinGroupMessage != null) {
            if (!$util.isObject(object.joinGroupMessage))
                throw $TypeError(".UpstreamMessage.joinGroupMessage: object expected");
            message.joinGroupMessage = $root.UpstreamMessage.JoinGroupMessage.fromObject(object.joinGroupMessage, _depth + 1);
        }
        if (object.leaveGroupMessage != null) {
            if (!$util.isObject(object.leaveGroupMessage))
                throw $TypeError(".UpstreamMessage.leaveGroupMessage: object expected");
            message.leaveGroupMessage = $root.UpstreamMessage.LeaveGroupMessage.fromObject(object.leaveGroupMessage, _depth + 1);
        }
        if (object.sequenceAckMessage != null) {
            if (!$util.isObject(object.sequenceAckMessage))
                throw $TypeError(".UpstreamMessage.sequenceAckMessage: object expected");
            message.sequenceAckMessage = $root.UpstreamMessage.SequenceAckMessage.fromObject(object.sequenceAckMessage, _depth + 1);
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
    UpstreamMessage.toObject = function (message, options, _depth) {
        if (!options)
            options = {};
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let object = {};
        if (message.sendToGroupMessage != null && $Object.hasOwnProperty.call(message, "sendToGroupMessage")) {
            object.sendToGroupMessage = $root.UpstreamMessage.SendToGroupMessage.toObject(message.sendToGroupMessage, options, _depth + 1);
            if (options.oneofs)
                object.message = "sendToGroupMessage";
        }
        if (message.eventMessage != null && $Object.hasOwnProperty.call(message, "eventMessage")) {
            object.eventMessage = $root.UpstreamMessage.EventMessage.toObject(message.eventMessage, options, _depth + 1);
            if (options.oneofs)
                object.message = "eventMessage";
        }
        if (message.joinGroupMessage != null && $Object.hasOwnProperty.call(message, "joinGroupMessage")) {
            object.joinGroupMessage = $root.UpstreamMessage.JoinGroupMessage.toObject(message.joinGroupMessage, options, _depth + 1);
            if (options.oneofs)
                object.message = "joinGroupMessage";
        }
        if (message.leaveGroupMessage != null && $Object.hasOwnProperty.call(message, "leaveGroupMessage")) {
            object.leaveGroupMessage = $root.UpstreamMessage.LeaveGroupMessage.toObject(message.leaveGroupMessage, options, _depth + 1);
            if (options.oneofs)
                object.message = "leaveGroupMessage";
        }
        if (message.sequenceAckMessage != null && $Object.hasOwnProperty.call(message, "sequenceAckMessage")) {
            object.sequenceAckMessage = $root.UpstreamMessage.SequenceAckMessage.toObject(message.sequenceAckMessage, options, _depth + 1);
            if (options.oneofs)
                object.message = "sequenceAckMessage";
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
    UpstreamMessage.prototype.toJSON = function() {
        return UpstreamMessage.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the type url for UpstreamMessage
     * @function getTypeUrl
     * @memberof UpstreamMessage
     * @static
     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns {string} The type url
     */
    UpstreamMessage.getTypeUrl = function(prefix) {
        if (prefix === $undefined)
            prefix = "type.googleapis.com";
        return prefix + "/UpstreamMessage";
    };

    UpstreamMessage.SendToGroupMessage = (function() {

        /**
         * Properties of a SendToGroupMessage.
         * @typedef {Object} UpstreamMessage.SendToGroupMessage.$Properties
         * @property {string|null} [group] SendToGroupMessage group
         * @property {number|Long|null} [ackId] SendToGroupMessage ackId
         * @property {MessageData.$Properties|null} [data] SendToGroupMessage data
         * @property {boolean|null} [noEcho] SendToGroupMessage noEcho
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a SendToGroupMessage.
         * @memberof UpstreamMessage
         * @interface ISendToGroupMessage
         * @augments UpstreamMessage.SendToGroupMessage.$Properties
         * @deprecated Use UpstreamMessage.SendToGroupMessage.$Properties instead.
         */

        /**
         * Shape of a SendToGroupMessage.
         * @typedef {{
         *   group?: string|null;
         *   ackId?: number|Long|null;
         *   data?: MessageData.$Shape|null;
         *   noEcho?: boolean|null;
         *   $unknowns?: Array.<Uint8Array>;
         * }} UpstreamMessage.SendToGroupMessage.$Shape
         */

        /**
         * Constructs a new SendToGroupMessage.
         * @memberof UpstreamMessage
         * @classdesc Represents a SendToGroupMessage.
         * @constructor
         * @param {UpstreamMessage.SendToGroupMessage.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        const SendToGroupMessage = function (properties) {
            if (properties)
                for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

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
         * @member {MessageData.$Properties|null|undefined} data
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
        $Object.defineProperty(SendToGroupMessage.prototype, "_ackId", {
            get: $util.oneOfGetter($oneOfFields = ["ackId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(SendToGroupMessage.prototype, "_noEcho", {
            get: $util.oneOfGetter($oneOfFields = ["noEcho"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new SendToGroupMessage instance using the specified properties.
         * @function create
         * @memberof UpstreamMessage.SendToGroupMessage
         * @static
         * @param {UpstreamMessage.SendToGroupMessage.$Properties=} [properties] Properties to set
         * @returns {UpstreamMessage.SendToGroupMessage} SendToGroupMessage instance
         * @type {{
         *   (properties: UpstreamMessage.SendToGroupMessage.$Shape): UpstreamMessage.SendToGroupMessage & UpstreamMessage.SendToGroupMessage.$Shape;
         *   (properties?: UpstreamMessage.SendToGroupMessage.$Properties): UpstreamMessage.SendToGroupMessage;
         * }}
         */
        SendToGroupMessage.create = function(properties) {
            return new SendToGroupMessage(properties);
        };

        /**
         * Encodes the specified SendToGroupMessage message. Does not implicitly {@link UpstreamMessage.SendToGroupMessage.verify|verify} messages.
         * @function encode
         * @memberof UpstreamMessage.SendToGroupMessage
         * @static
         * @param {UpstreamMessage.SendToGroupMessage.$Properties} message SendToGroupMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SendToGroupMessage.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.group != null && $Object.hasOwnProperty.call(message, "group") && message.group !== "")
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.group);
            if (message.ackId != null && $Object.hasOwnProperty.call(message, "ackId"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.ackId);
            if (message.data != null && $Object.hasOwnProperty.call(message, "data"))
                $root.MessageData.encode(message.data, writer.uint32(/* id 3, wireType 2 =*/26).fork(), _depth + 1).ldelim();
            if (message.noEcho != null && $Object.hasOwnProperty.call(message, "noEcho"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.noEcho);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified SendToGroupMessage message, length delimited. Does not implicitly {@link UpstreamMessage.SendToGroupMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof UpstreamMessage.SendToGroupMessage
         * @static
         * @param {UpstreamMessage.SendToGroupMessage.$Properties} message SendToGroupMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SendToGroupMessage.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a SendToGroupMessage message from the specified reader or buffer.
         * @function decode
         * @memberof UpstreamMessage.SendToGroupMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {UpstreamMessage.SendToGroupMessage & UpstreamMessage.SendToGroupMessage.$Shape} SendToGroupMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SendToGroupMessage.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            let end, message, value;
            if (length === $undefined)
                end = reader.len;
            else {
                end = reader.pos + length;
                if (end > reader.len)
                    throw $RangeError("index out of range");
                length = reader.len;
                reader.len = end;
            }
            message = _target || new $root.UpstreamMessage.SendToGroupMessage();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.group = value;
                        else
                            delete message.group;
                        continue;
                    }
                case 2: {
                        if (wireType !== 0)
                            break;
                        message.ackId = reader.uint64();
                        message._ackId = "ackId";
                        continue;
                    }
                case 3: {
                        if (wireType !== 2)
                            break;
                        message.data = $root.MessageData.decode(reader, reader.uint32(), $undefined, _depth + 1, message.data);
                        continue;
                    }
                case 4: {
                        if (wireType !== 0)
                            break;
                        message.noEcho = reader.bool();
                        message._noEcho = "noEcho";
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (length !== $undefined) {
                if (reader.pos !== end)
                    throw $RangeError("index out of range");
                reader.len = length;
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a SendToGroupMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof UpstreamMessage.SendToGroupMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {UpstreamMessage.SendToGroupMessage & UpstreamMessage.SendToGroupMessage.$Shape} SendToGroupMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SendToGroupMessage.decodeDelimited = function(reader) {
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
        SendToGroupMessage.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            let properties = {};
            if (message.group != null && $Object.hasOwnProperty.call(message, "group"))
                if (!$util.isString(message.group))
                    return "group: string expected";
            if (message.ackId != null && $Object.hasOwnProperty.call(message, "ackId")) {
                properties._ackId = 1;
                if (!$util.isInteger(message.ackId) && !(message.ackId && $util.isInteger(message.ackId.low) && $util.isInteger(message.ackId.high)))
                    return "ackId: integer|Long expected";
            }
            if (message.data != null && $Object.hasOwnProperty.call(message, "data")) {
                let error = $root.MessageData.verify(message.data, _depth + 1);
                if (error)
                    return "data." + error;
            }
            if (message.noEcho != null && $Object.hasOwnProperty.call(message, "noEcho")) {
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
        SendToGroupMessage.fromObject = function (object, _depth) {
            if (object instanceof $root.UpstreamMessage.SendToGroupMessage)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".UpstreamMessage.SendToGroupMessage: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let message = new $root.UpstreamMessage.SendToGroupMessage();
            if (object.group != null)
                if (typeof object.group !== "string" || object.group.length)
                    message.group = $String(object.group);
            if (object.ackId != null)
                if ($util.Long)
                    message.ackId = $util.Long.fromValue(object.ackId, true);
                else if (typeof object.ackId === "string")
                    message.ackId = $parseInt(object.ackId, 10);
                else if (typeof object.ackId === "number")
                    message.ackId = object.ackId;
                else if (typeof object.ackId === "object")
                    message.ackId = new $util.LongBits(object.ackId.low >>> 0, object.ackId.high >>> 0).toNumber(true);
            if (object.data != null) {
                if (!$util.isObject(object.data))
                    throw $TypeError(".UpstreamMessage.SendToGroupMessage.data: object expected");
                message.data = $root.MessageData.fromObject(object.data, _depth + 1);
            }
            if (object.noEcho != null)
                message.noEcho = $Boolean(object.noEcho);
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
        SendToGroupMessage.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.group = "";
                object.data = null;
            }
            if (message.group != null && $Object.hasOwnProperty.call(message, "group"))
                object.group = message.group;
            if (message.ackId != null && $Object.hasOwnProperty.call(message, "ackId"))
                if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                    object.ackId = typeof message.ackId === "number" ? $BigInt(message.ackId) : $util.Long.fromBits(message.ackId.low >>> 0, message.ackId.high >>> 0, true).toBigInt();
                else if (typeof message.ackId === "number")
                    object.ackId = options.longs === $String ? $String(message.ackId) : message.ackId;
                else
                    object.ackId = options.longs === $String ? $util.Long.prototype.toString.call(message.ackId) : options.longs === $Number ? new $util.LongBits(message.ackId.low >>> 0, message.ackId.high >>> 0).toNumber(true) : message.ackId;
            if (message.data != null && $Object.hasOwnProperty.call(message, "data"))
                object.data = $root.MessageData.toObject(message.data, options, _depth + 1);
            if (message.noEcho != null && $Object.hasOwnProperty.call(message, "noEcho"))
                object.noEcho = message.noEcho;
            return object;
        };

        /**
         * Converts this SendToGroupMessage to JSON.
         * @function toJSON
         * @memberof UpstreamMessage.SendToGroupMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SendToGroupMessage.prototype.toJSON = function() {
            return SendToGroupMessage.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for SendToGroupMessage
         * @function getTypeUrl
         * @memberof UpstreamMessage.SendToGroupMessage
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        SendToGroupMessage.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/UpstreamMessage.SendToGroupMessage";
        };

        return SendToGroupMessage;
    })();

    UpstreamMessage.EventMessage = (function() {

        /**
         * Properties of an EventMessage.
         * @typedef {Object} UpstreamMessage.EventMessage.$Properties
         * @property {string|null} [event] EventMessage event
         * @property {MessageData.$Properties|null} [data] EventMessage data
         * @property {number|Long|null} [ackId] EventMessage ackId
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of an EventMessage.
         * @memberof UpstreamMessage
         * @interface IEventMessage
         * @augments UpstreamMessage.EventMessage.$Properties
         * @deprecated Use UpstreamMessage.EventMessage.$Properties instead.
         */

        /**
         * Shape of an EventMessage.
         * @typedef {{
         *   event?: string|null;
         *   data?: MessageData.$Shape|null;
         *   ackId?: number|Long|null;
         *   $unknowns?: Array.<Uint8Array>;
         * }} UpstreamMessage.EventMessage.$Shape
         */

        /**
         * Constructs a new EventMessage.
         * @memberof UpstreamMessage
         * @classdesc Represents an EventMessage.
         * @constructor
         * @param {UpstreamMessage.EventMessage.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        const EventMessage = function (properties) {
            if (properties)
                for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * EventMessage event.
         * @member {string} event
         * @memberof UpstreamMessage.EventMessage
         * @instance
         */
        EventMessage.prototype.event = "";

        /**
         * EventMessage data.
         * @member {MessageData.$Properties|null|undefined} data
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
        $Object.defineProperty(EventMessage.prototype, "_ackId", {
            get: $util.oneOfGetter($oneOfFields = ["ackId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new EventMessage instance using the specified properties.
         * @function create
         * @memberof UpstreamMessage.EventMessage
         * @static
         * @param {UpstreamMessage.EventMessage.$Properties=} [properties] Properties to set
         * @returns {UpstreamMessage.EventMessage} EventMessage instance
         * @type {{
         *   (properties: UpstreamMessage.EventMessage.$Shape): UpstreamMessage.EventMessage & UpstreamMessage.EventMessage.$Shape;
         *   (properties?: UpstreamMessage.EventMessage.$Properties): UpstreamMessage.EventMessage;
         * }}
         */
        EventMessage.create = function(properties) {
            return new EventMessage(properties);
        };

        /**
         * Encodes the specified EventMessage message. Does not implicitly {@link UpstreamMessage.EventMessage.verify|verify} messages.
         * @function encode
         * @memberof UpstreamMessage.EventMessage
         * @static
         * @param {UpstreamMessage.EventMessage.$Properties} message EventMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EventMessage.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.event != null && $Object.hasOwnProperty.call(message, "event") && message.event !== "")
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.event);
            if (message.data != null && $Object.hasOwnProperty.call(message, "data"))
                $root.MessageData.encode(message.data, writer.uint32(/* id 2, wireType 2 =*/18).fork(), _depth + 1).ldelim();
            if (message.ackId != null && $Object.hasOwnProperty.call(message, "ackId"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.ackId);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified EventMessage message, length delimited. Does not implicitly {@link UpstreamMessage.EventMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof UpstreamMessage.EventMessage
         * @static
         * @param {UpstreamMessage.EventMessage.$Properties} message EventMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EventMessage.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes an EventMessage message from the specified reader or buffer.
         * @function decode
         * @memberof UpstreamMessage.EventMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {UpstreamMessage.EventMessage & UpstreamMessage.EventMessage.$Shape} EventMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EventMessage.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            let end, message, value;
            if (length === $undefined)
                end = reader.len;
            else {
                end = reader.pos + length;
                if (end > reader.len)
                    throw $RangeError("index out of range");
                length = reader.len;
                reader.len = end;
            }
            message = _target || new $root.UpstreamMessage.EventMessage();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.event = value;
                        else
                            delete message.event;
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        message.data = $root.MessageData.decode(reader, reader.uint32(), $undefined, _depth + 1, message.data);
                        continue;
                    }
                case 3: {
                        if (wireType !== 0)
                            break;
                        message.ackId = reader.uint64();
                        message._ackId = "ackId";
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (length !== $undefined) {
                if (reader.pos !== end)
                    throw $RangeError("index out of range");
                reader.len = length;
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes an EventMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof UpstreamMessage.EventMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {UpstreamMessage.EventMessage & UpstreamMessage.EventMessage.$Shape} EventMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EventMessage.decodeDelimited = function(reader) {
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
        EventMessage.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            let properties = {};
            if (message.event != null && $Object.hasOwnProperty.call(message, "event"))
                if (!$util.isString(message.event))
                    return "event: string expected";
            if (message.data != null && $Object.hasOwnProperty.call(message, "data")) {
                let error = $root.MessageData.verify(message.data, _depth + 1);
                if (error)
                    return "data." + error;
            }
            if (message.ackId != null && $Object.hasOwnProperty.call(message, "ackId")) {
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
        EventMessage.fromObject = function (object, _depth) {
            if (object instanceof $root.UpstreamMessage.EventMessage)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".UpstreamMessage.EventMessage: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let message = new $root.UpstreamMessage.EventMessage();
            if (object.event != null)
                if (typeof object.event !== "string" || object.event.length)
                    message.event = $String(object.event);
            if (object.data != null) {
                if (!$util.isObject(object.data))
                    throw $TypeError(".UpstreamMessage.EventMessage.data: object expected");
                message.data = $root.MessageData.fromObject(object.data, _depth + 1);
            }
            if (object.ackId != null)
                if ($util.Long)
                    message.ackId = $util.Long.fromValue(object.ackId, true);
                else if (typeof object.ackId === "string")
                    message.ackId = $parseInt(object.ackId, 10);
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
        EventMessage.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.event = "";
                object.data = null;
            }
            if (message.event != null && $Object.hasOwnProperty.call(message, "event"))
                object.event = message.event;
            if (message.data != null && $Object.hasOwnProperty.call(message, "data"))
                object.data = $root.MessageData.toObject(message.data, options, _depth + 1);
            if (message.ackId != null && $Object.hasOwnProperty.call(message, "ackId"))
                if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                    object.ackId = typeof message.ackId === "number" ? $BigInt(message.ackId) : $util.Long.fromBits(message.ackId.low >>> 0, message.ackId.high >>> 0, true).toBigInt();
                else if (typeof message.ackId === "number")
                    object.ackId = options.longs === $String ? $String(message.ackId) : message.ackId;
                else
                    object.ackId = options.longs === $String ? $util.Long.prototype.toString.call(message.ackId) : options.longs === $Number ? new $util.LongBits(message.ackId.low >>> 0, message.ackId.high >>> 0).toNumber(true) : message.ackId;
            return object;
        };

        /**
         * Converts this EventMessage to JSON.
         * @function toJSON
         * @memberof UpstreamMessage.EventMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EventMessage.prototype.toJSON = function() {
            return EventMessage.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for EventMessage
         * @function getTypeUrl
         * @memberof UpstreamMessage.EventMessage
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        EventMessage.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/UpstreamMessage.EventMessage";
        };

        return EventMessage;
    })();

    UpstreamMessage.JoinGroupMessage = (function() {

        /**
         * Properties of a JoinGroupMessage.
         * @typedef {Object} UpstreamMessage.JoinGroupMessage.$Properties
         * @property {string|null} [group] JoinGroupMessage group
         * @property {number|Long|null} [ackId] JoinGroupMessage ackId
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a JoinGroupMessage.
         * @memberof UpstreamMessage
         * @interface IJoinGroupMessage
         * @augments UpstreamMessage.JoinGroupMessage.$Properties
         * @deprecated Use UpstreamMessage.JoinGroupMessage.$Properties instead.
         */

        /**
         * Shape of a JoinGroupMessage.
         * @typedef {UpstreamMessage.JoinGroupMessage.$Properties} UpstreamMessage.JoinGroupMessage.$Shape
         */

        /**
         * Constructs a new JoinGroupMessage.
         * @memberof UpstreamMessage
         * @classdesc Represents a JoinGroupMessage.
         * @constructor
         * @param {UpstreamMessage.JoinGroupMessage.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        const JoinGroupMessage = function (properties) {
            if (properties)
                for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

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
        $Object.defineProperty(JoinGroupMessage.prototype, "_ackId", {
            get: $util.oneOfGetter($oneOfFields = ["ackId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new JoinGroupMessage instance using the specified properties.
         * @function create
         * @memberof UpstreamMessage.JoinGroupMessage
         * @static
         * @param {UpstreamMessage.JoinGroupMessage.$Properties=} [properties] Properties to set
         * @returns {UpstreamMessage.JoinGroupMessage} JoinGroupMessage instance
         * @type {{
         *   (properties: UpstreamMessage.JoinGroupMessage.$Shape): UpstreamMessage.JoinGroupMessage & UpstreamMessage.JoinGroupMessage.$Shape;
         *   (properties?: UpstreamMessage.JoinGroupMessage.$Properties): UpstreamMessage.JoinGroupMessage;
         * }}
         */
        JoinGroupMessage.create = function(properties) {
            return new JoinGroupMessage(properties);
        };

        /**
         * Encodes the specified JoinGroupMessage message. Does not implicitly {@link UpstreamMessage.JoinGroupMessage.verify|verify} messages.
         * @function encode
         * @memberof UpstreamMessage.JoinGroupMessage
         * @static
         * @param {UpstreamMessage.JoinGroupMessage.$Properties} message JoinGroupMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        JoinGroupMessage.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.group != null && $Object.hasOwnProperty.call(message, "group") && message.group !== "")
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.group);
            if (message.ackId != null && $Object.hasOwnProperty.call(message, "ackId"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.ackId);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified JoinGroupMessage message, length delimited. Does not implicitly {@link UpstreamMessage.JoinGroupMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof UpstreamMessage.JoinGroupMessage
         * @static
         * @param {UpstreamMessage.JoinGroupMessage.$Properties} message JoinGroupMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        JoinGroupMessage.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a JoinGroupMessage message from the specified reader or buffer.
         * @function decode
         * @memberof UpstreamMessage.JoinGroupMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {UpstreamMessage.JoinGroupMessage & UpstreamMessage.JoinGroupMessage.$Shape} JoinGroupMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        JoinGroupMessage.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            let end, message, value;
            if (length === $undefined)
                end = reader.len;
            else {
                end = reader.pos + length;
                if (end > reader.len)
                    throw $RangeError("index out of range");
                length = reader.len;
                reader.len = end;
            }
            message = _target || new $root.UpstreamMessage.JoinGroupMessage();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.group = value;
                        else
                            delete message.group;
                        continue;
                    }
                case 2: {
                        if (wireType !== 0)
                            break;
                        message.ackId = reader.uint64();
                        message._ackId = "ackId";
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (length !== $undefined) {
                if (reader.pos !== end)
                    throw $RangeError("index out of range");
                reader.len = length;
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a JoinGroupMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof UpstreamMessage.JoinGroupMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {UpstreamMessage.JoinGroupMessage & UpstreamMessage.JoinGroupMessage.$Shape} JoinGroupMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        JoinGroupMessage.decodeDelimited = function(reader) {
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
        JoinGroupMessage.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            let properties = {};
            if (message.group != null && $Object.hasOwnProperty.call(message, "group"))
                if (!$util.isString(message.group))
                    return "group: string expected";
            if (message.ackId != null && $Object.hasOwnProperty.call(message, "ackId")) {
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
        JoinGroupMessage.fromObject = function (object, _depth) {
            if (object instanceof $root.UpstreamMessage.JoinGroupMessage)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".UpstreamMessage.JoinGroupMessage: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let message = new $root.UpstreamMessage.JoinGroupMessage();
            if (object.group != null)
                if (typeof object.group !== "string" || object.group.length)
                    message.group = $String(object.group);
            if (object.ackId != null)
                if ($util.Long)
                    message.ackId = $util.Long.fromValue(object.ackId, true);
                else if (typeof object.ackId === "string")
                    message.ackId = $parseInt(object.ackId, 10);
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
        JoinGroupMessage.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let object = {};
            if (options.defaults)
                object.group = "";
            if (message.group != null && $Object.hasOwnProperty.call(message, "group"))
                object.group = message.group;
            if (message.ackId != null && $Object.hasOwnProperty.call(message, "ackId"))
                if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                    object.ackId = typeof message.ackId === "number" ? $BigInt(message.ackId) : $util.Long.fromBits(message.ackId.low >>> 0, message.ackId.high >>> 0, true).toBigInt();
                else if (typeof message.ackId === "number")
                    object.ackId = options.longs === $String ? $String(message.ackId) : message.ackId;
                else
                    object.ackId = options.longs === $String ? $util.Long.prototype.toString.call(message.ackId) : options.longs === $Number ? new $util.LongBits(message.ackId.low >>> 0, message.ackId.high >>> 0).toNumber(true) : message.ackId;
            return object;
        };

        /**
         * Converts this JoinGroupMessage to JSON.
         * @function toJSON
         * @memberof UpstreamMessage.JoinGroupMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        JoinGroupMessage.prototype.toJSON = function() {
            return JoinGroupMessage.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for JoinGroupMessage
         * @function getTypeUrl
         * @memberof UpstreamMessage.JoinGroupMessage
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        JoinGroupMessage.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/UpstreamMessage.JoinGroupMessage";
        };

        return JoinGroupMessage;
    })();

    UpstreamMessage.LeaveGroupMessage = (function() {

        /**
         * Properties of a LeaveGroupMessage.
         * @typedef {Object} UpstreamMessage.LeaveGroupMessage.$Properties
         * @property {string|null} [group] LeaveGroupMessage group
         * @property {number|Long|null} [ackId] LeaveGroupMessage ackId
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a LeaveGroupMessage.
         * @memberof UpstreamMessage
         * @interface ILeaveGroupMessage
         * @augments UpstreamMessage.LeaveGroupMessage.$Properties
         * @deprecated Use UpstreamMessage.LeaveGroupMessage.$Properties instead.
         */

        /**
         * Shape of a LeaveGroupMessage.
         * @typedef {UpstreamMessage.LeaveGroupMessage.$Properties} UpstreamMessage.LeaveGroupMessage.$Shape
         */

        /**
         * Constructs a new LeaveGroupMessage.
         * @memberof UpstreamMessage
         * @classdesc Represents a LeaveGroupMessage.
         * @constructor
         * @param {UpstreamMessage.LeaveGroupMessage.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        const LeaveGroupMessage = function (properties) {
            if (properties)
                for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

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
        $Object.defineProperty(LeaveGroupMessage.prototype, "_ackId", {
            get: $util.oneOfGetter($oneOfFields = ["ackId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new LeaveGroupMessage instance using the specified properties.
         * @function create
         * @memberof UpstreamMessage.LeaveGroupMessage
         * @static
         * @param {UpstreamMessage.LeaveGroupMessage.$Properties=} [properties] Properties to set
         * @returns {UpstreamMessage.LeaveGroupMessage} LeaveGroupMessage instance
         * @type {{
         *   (properties: UpstreamMessage.LeaveGroupMessage.$Shape): UpstreamMessage.LeaveGroupMessage & UpstreamMessage.LeaveGroupMessage.$Shape;
         *   (properties?: UpstreamMessage.LeaveGroupMessage.$Properties): UpstreamMessage.LeaveGroupMessage;
         * }}
         */
        LeaveGroupMessage.create = function(properties) {
            return new LeaveGroupMessage(properties);
        };

        /**
         * Encodes the specified LeaveGroupMessage message. Does not implicitly {@link UpstreamMessage.LeaveGroupMessage.verify|verify} messages.
         * @function encode
         * @memberof UpstreamMessage.LeaveGroupMessage
         * @static
         * @param {UpstreamMessage.LeaveGroupMessage.$Properties} message LeaveGroupMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LeaveGroupMessage.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.group != null && $Object.hasOwnProperty.call(message, "group") && message.group !== "")
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.group);
            if (message.ackId != null && $Object.hasOwnProperty.call(message, "ackId"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.ackId);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified LeaveGroupMessage message, length delimited. Does not implicitly {@link UpstreamMessage.LeaveGroupMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof UpstreamMessage.LeaveGroupMessage
         * @static
         * @param {UpstreamMessage.LeaveGroupMessage.$Properties} message LeaveGroupMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LeaveGroupMessage.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a LeaveGroupMessage message from the specified reader or buffer.
         * @function decode
         * @memberof UpstreamMessage.LeaveGroupMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {UpstreamMessage.LeaveGroupMessage & UpstreamMessage.LeaveGroupMessage.$Shape} LeaveGroupMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LeaveGroupMessage.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            let end, message, value;
            if (length === $undefined)
                end = reader.len;
            else {
                end = reader.pos + length;
                if (end > reader.len)
                    throw $RangeError("index out of range");
                length = reader.len;
                reader.len = end;
            }
            message = _target || new $root.UpstreamMessage.LeaveGroupMessage();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.group = value;
                        else
                            delete message.group;
                        continue;
                    }
                case 2: {
                        if (wireType !== 0)
                            break;
                        message.ackId = reader.uint64();
                        message._ackId = "ackId";
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (length !== $undefined) {
                if (reader.pos !== end)
                    throw $RangeError("index out of range");
                reader.len = length;
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a LeaveGroupMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof UpstreamMessage.LeaveGroupMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {UpstreamMessage.LeaveGroupMessage & UpstreamMessage.LeaveGroupMessage.$Shape} LeaveGroupMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LeaveGroupMessage.decodeDelimited = function(reader) {
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
        LeaveGroupMessage.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            let properties = {};
            if (message.group != null && $Object.hasOwnProperty.call(message, "group"))
                if (!$util.isString(message.group))
                    return "group: string expected";
            if (message.ackId != null && $Object.hasOwnProperty.call(message, "ackId")) {
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
        LeaveGroupMessage.fromObject = function (object, _depth) {
            if (object instanceof $root.UpstreamMessage.LeaveGroupMessage)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".UpstreamMessage.LeaveGroupMessage: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let message = new $root.UpstreamMessage.LeaveGroupMessage();
            if (object.group != null)
                if (typeof object.group !== "string" || object.group.length)
                    message.group = $String(object.group);
            if (object.ackId != null)
                if ($util.Long)
                    message.ackId = $util.Long.fromValue(object.ackId, true);
                else if (typeof object.ackId === "string")
                    message.ackId = $parseInt(object.ackId, 10);
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
        LeaveGroupMessage.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let object = {};
            if (options.defaults)
                object.group = "";
            if (message.group != null && $Object.hasOwnProperty.call(message, "group"))
                object.group = message.group;
            if (message.ackId != null && $Object.hasOwnProperty.call(message, "ackId"))
                if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                    object.ackId = typeof message.ackId === "number" ? $BigInt(message.ackId) : $util.Long.fromBits(message.ackId.low >>> 0, message.ackId.high >>> 0, true).toBigInt();
                else if (typeof message.ackId === "number")
                    object.ackId = options.longs === $String ? $String(message.ackId) : message.ackId;
                else
                    object.ackId = options.longs === $String ? $util.Long.prototype.toString.call(message.ackId) : options.longs === $Number ? new $util.LongBits(message.ackId.low >>> 0, message.ackId.high >>> 0).toNumber(true) : message.ackId;
            return object;
        };

        /**
         * Converts this LeaveGroupMessage to JSON.
         * @function toJSON
         * @memberof UpstreamMessage.LeaveGroupMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LeaveGroupMessage.prototype.toJSON = function() {
            return LeaveGroupMessage.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for LeaveGroupMessage
         * @function getTypeUrl
         * @memberof UpstreamMessage.LeaveGroupMessage
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        LeaveGroupMessage.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/UpstreamMessage.LeaveGroupMessage";
        };

        return LeaveGroupMessage;
    })();

    UpstreamMessage.SequenceAckMessage = (function() {

        /**
         * Properties of a SequenceAckMessage.
         * @typedef {Object} UpstreamMessage.SequenceAckMessage.$Properties
         * @property {number|Long|null} [sequenceId] SequenceAckMessage sequenceId
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a SequenceAckMessage.
         * @memberof UpstreamMessage
         * @interface ISequenceAckMessage
         * @augments UpstreamMessage.SequenceAckMessage.$Properties
         * @deprecated Use UpstreamMessage.SequenceAckMessage.$Properties instead.
         */

        /**
         * Shape of a SequenceAckMessage.
         * @typedef {UpstreamMessage.SequenceAckMessage.$Properties} UpstreamMessage.SequenceAckMessage.$Shape
         */

        /**
         * Constructs a new SequenceAckMessage.
         * @memberof UpstreamMessage
         * @classdesc Represents a SequenceAckMessage.
         * @constructor
         * @param {UpstreamMessage.SequenceAckMessage.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        const SequenceAckMessage = function (properties) {
            if (properties)
                for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

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
         * @param {UpstreamMessage.SequenceAckMessage.$Properties=} [properties] Properties to set
         * @returns {UpstreamMessage.SequenceAckMessage} SequenceAckMessage instance
         * @type {{
         *   (properties: UpstreamMessage.SequenceAckMessage.$Shape): UpstreamMessage.SequenceAckMessage & UpstreamMessage.SequenceAckMessage.$Shape;
         *   (properties?: UpstreamMessage.SequenceAckMessage.$Properties): UpstreamMessage.SequenceAckMessage;
         * }}
         */
        SequenceAckMessage.create = function(properties) {
            return new SequenceAckMessage(properties);
        };

        /**
         * Encodes the specified SequenceAckMessage message. Does not implicitly {@link UpstreamMessage.SequenceAckMessage.verify|verify} messages.
         * @function encode
         * @memberof UpstreamMessage.SequenceAckMessage
         * @static
         * @param {UpstreamMessage.SequenceAckMessage.$Properties} message SequenceAckMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SequenceAckMessage.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.sequenceId != null && $Object.hasOwnProperty.call(message, "sequenceId") && (typeof message.sequenceId === "object" ? message.sequenceId.low || message.sequenceId.high : message.sequenceId !== 0))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.sequenceId);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified SequenceAckMessage message, length delimited. Does not implicitly {@link UpstreamMessage.SequenceAckMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof UpstreamMessage.SequenceAckMessage
         * @static
         * @param {UpstreamMessage.SequenceAckMessage.$Properties} message SequenceAckMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SequenceAckMessage.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a SequenceAckMessage message from the specified reader or buffer.
         * @function decode
         * @memberof UpstreamMessage.SequenceAckMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {UpstreamMessage.SequenceAckMessage & UpstreamMessage.SequenceAckMessage.$Shape} SequenceAckMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SequenceAckMessage.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            let end, message, value;
            if (length === $undefined)
                end = reader.len;
            else {
                end = reader.pos + length;
                if (end > reader.len)
                    throw $RangeError("index out of range");
                length = reader.len;
                reader.len = end;
            }
            message = _target || new $root.UpstreamMessage.SequenceAckMessage();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        if (typeof (value = reader.uint64()) === "object" ? value.low || value.high : value !== 0)
                            message.sequenceId = value;
                        else
                            delete message.sequenceId;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (length !== $undefined) {
                if (reader.pos !== end)
                    throw $RangeError("index out of range");
                reader.len = length;
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a SequenceAckMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof UpstreamMessage.SequenceAckMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {UpstreamMessage.SequenceAckMessage & UpstreamMessage.SequenceAckMessage.$Shape} SequenceAckMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SequenceAckMessage.decodeDelimited = function(reader) {
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
        SequenceAckMessage.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.sequenceId != null && $Object.hasOwnProperty.call(message, "sequenceId"))
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
        SequenceAckMessage.fromObject = function (object, _depth) {
            if (object instanceof $root.UpstreamMessage.SequenceAckMessage)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".UpstreamMessage.SequenceAckMessage: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let message = new $root.UpstreamMessage.SequenceAckMessage();
            if (object.sequenceId != null)
                if (typeof object.sequenceId === "object" ? object.sequenceId.low || object.sequenceId.high : $Number(object.sequenceId) !== 0)
                    if ($util.Long)
                        message.sequenceId = $util.Long.fromValue(object.sequenceId, true);
                    else if (typeof object.sequenceId === "string")
                        message.sequenceId = $parseInt(object.sequenceId, 10);
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
        SequenceAckMessage.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let object = {};
            if (options.defaults)
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.sequenceId = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                } else
                    object.sequenceId = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
            if (message.sequenceId != null && $Object.hasOwnProperty.call(message, "sequenceId"))
                if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                    object.sequenceId = typeof message.sequenceId === "number" ? $BigInt(message.sequenceId) : $util.Long.fromBits(message.sequenceId.low >>> 0, message.sequenceId.high >>> 0, true).toBigInt();
                else if (typeof message.sequenceId === "number")
                    object.sequenceId = options.longs === $String ? $String(message.sequenceId) : message.sequenceId;
                else
                    object.sequenceId = options.longs === $String ? $util.Long.prototype.toString.call(message.sequenceId) : options.longs === $Number ? new $util.LongBits(message.sequenceId.low >>> 0, message.sequenceId.high >>> 0).toNumber(true) : message.sequenceId;
            return object;
        };

        /**
         * Converts this SequenceAckMessage to JSON.
         * @function toJSON
         * @memberof UpstreamMessage.SequenceAckMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SequenceAckMessage.prototype.toJSON = function() {
            return SequenceAckMessage.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for SequenceAckMessage
         * @function getTypeUrl
         * @memberof UpstreamMessage.SequenceAckMessage
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        SequenceAckMessage.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/UpstreamMessage.SequenceAckMessage";
        };

        return SequenceAckMessage;
    })();

    return UpstreamMessage;
})();

export const DownstreamMessage = $root.DownstreamMessage = (() => {

    /**
     * Properties of a DownstreamMessage.
     * @typedef {Object} DownstreamMessage.$Properties
     * @property {DownstreamMessage.AckMessage.$Properties|null} [ackMessage] DownstreamMessage ackMessage
     * @property {DownstreamMessage.DataMessage.$Properties|null} [dataMessage] DownstreamMessage dataMessage
     * @property {DownstreamMessage.SystemMessage.$Properties|null} [systemMessage] DownstreamMessage systemMessage
     * @property {"ackMessage"|"dataMessage"|"systemMessage"} [message] DownstreamMessage message
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */

    /**
     * Properties of a DownstreamMessage.
     * @exports IDownstreamMessage
     * @interface IDownstreamMessage
     * @augments DownstreamMessage.$Properties
     * @deprecated Use DownstreamMessage.$Properties instead.
     */

    /**
     * Narrowed shape of a DownstreamMessage.
     * @typedef {{
     *   ackMessage?: DownstreamMessage.AckMessage.$Shape|null;
     *   dataMessage?: DownstreamMessage.DataMessage.$Shape|null;
     *   systemMessage?: DownstreamMessage.SystemMessage.$Shape|null;
     *   $unknowns?: Array.<Uint8Array>;
     * } & (
     *   ({ message?: undefined; ackMessage?: null; dataMessage?: null; systemMessage?: null }|{ message?: "ackMessage"; ackMessage: DownstreamMessage.AckMessage.$Shape; dataMessage?: null; systemMessage?: null }|{ message?: "dataMessage"; ackMessage?: null; dataMessage: DownstreamMessage.DataMessage.$Shape; systemMessage?: null }|{ message?: "systemMessage"; ackMessage?: null; dataMessage?: null; systemMessage: DownstreamMessage.SystemMessage.$Shape })
     * )} DownstreamMessage.$Shape
     */

    /**
     * Constructs a new DownstreamMessage.
     * @exports DownstreamMessage
     * @classdesc Represents a DownstreamMessage.
     * @constructor
     * @param {DownstreamMessage.$Properties=} [properties] Properties to set
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */
    const DownstreamMessage = function (properties) {
        if (properties)
            for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    };

    /**
     * DownstreamMessage ackMessage.
     * @member {DownstreamMessage.AckMessage.$Properties|null|undefined} ackMessage
     * @memberof DownstreamMessage
     * @instance
     */
    DownstreamMessage.prototype.ackMessage = null;

    /**
     * DownstreamMessage dataMessage.
     * @member {DownstreamMessage.DataMessage.$Properties|null|undefined} dataMessage
     * @memberof DownstreamMessage
     * @instance
     */
    DownstreamMessage.prototype.dataMessage = null;

    /**
     * DownstreamMessage systemMessage.
     * @member {DownstreamMessage.SystemMessage.$Properties|null|undefined} systemMessage
     * @memberof DownstreamMessage
     * @instance
     */
    DownstreamMessage.prototype.systemMessage = null;

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields;

    /**
     * DownstreamMessage message.
     * @member {"ackMessage"|"dataMessage"|"systemMessage"|undefined} message
     * @memberof DownstreamMessage
     * @instance
     */
    $Object.defineProperty(DownstreamMessage.prototype, "message", {
        get: $util.oneOfGetter($oneOfFields = ["ackMessage", "dataMessage", "systemMessage"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new DownstreamMessage instance using the specified properties.
     * @function create
     * @memberof DownstreamMessage
     * @static
     * @param {DownstreamMessage.$Properties=} [properties] Properties to set
     * @returns {DownstreamMessage} DownstreamMessage instance
     * @type {{
     *   (properties: DownstreamMessage.$Shape): DownstreamMessage & DownstreamMessage.$Shape;
     *   (properties?: DownstreamMessage.$Properties): DownstreamMessage;
     * }}
     */
    DownstreamMessage.create = function(properties) {
        return new DownstreamMessage(properties);
    };

    /**
     * Encodes the specified DownstreamMessage message. Does not implicitly {@link DownstreamMessage.verify|verify} messages.
     * @function encode
     * @memberof DownstreamMessage
     * @static
     * @param {DownstreamMessage.$Properties} message DownstreamMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DownstreamMessage.encode = function (message, writer, _depth) {
        if (!writer)
            writer = $Writer.create();
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        if (message.ackMessage != null && $Object.hasOwnProperty.call(message, "ackMessage"))
            $root.DownstreamMessage.AckMessage.encode(message.ackMessage, writer.uint32(/* id 1, wireType 2 =*/10).fork(), _depth + 1).ldelim();
        if (message.dataMessage != null && $Object.hasOwnProperty.call(message, "dataMessage"))
            $root.DownstreamMessage.DataMessage.encode(message.dataMessage, writer.uint32(/* id 2, wireType 2 =*/18).fork(), _depth + 1).ldelim();
        if (message.systemMessage != null && $Object.hasOwnProperty.call(message, "systemMessage"))
            $root.DownstreamMessage.SystemMessage.encode(message.systemMessage, writer.uint32(/* id 3, wireType 2 =*/26).fork(), _depth + 1).ldelim();
        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
            for (let i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
        return writer;
    };

    /**
     * Encodes the specified DownstreamMessage message, length delimited. Does not implicitly {@link DownstreamMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof DownstreamMessage
     * @static
     * @param {DownstreamMessage.$Properties} message DownstreamMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DownstreamMessage.encodeDelimited = function(message, writer) {
        return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
    };

    /**
     * Decodes a DownstreamMessage message from the specified reader or buffer.
     * @function decode
     * @memberof DownstreamMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {DownstreamMessage & DownstreamMessage.$Shape} DownstreamMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DownstreamMessage.decode = function (reader, length, _end, _depth, _target) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $Reader.recursionLimit)
            throw $Error("max depth exceeded");
        let end, message;
        if (length === $undefined)
            end = reader.len;
        else {
            end = reader.pos + length;
            if (end > reader.len)
                throw $RangeError("index out of range");
            length = reader.len;
            reader.len = end;
        }
        message = _target || new $root.DownstreamMessage();
        while (reader.pos < end) {
            let start = reader.pos;
            let tag = reader.tag();
            if (tag === _end) {
                _end = $undefined;
                break;
            }
            let wireType = tag & 7;
            switch (tag >>>= 3) {
            case 1: {
                    if (wireType !== 2)
                        break;
                    message.ackMessage = $root.DownstreamMessage.AckMessage.decode(reader, reader.uint32(), $undefined, _depth + 1, message.ackMessage);
                    message.message = "ackMessage";
                    continue;
                }
            case 2: {
                    if (wireType !== 2)
                        break;
                    message.dataMessage = $root.DownstreamMessage.DataMessage.decode(reader, reader.uint32(), $undefined, _depth + 1, message.dataMessage);
                    message.message = "dataMessage";
                    continue;
                }
            case 3: {
                    if (wireType !== 2)
                        break;
                    message.systemMessage = $root.DownstreamMessage.SystemMessage.decode(reader, reader.uint32(), $undefined, _depth + 1, message.systemMessage);
                    message.message = "systemMessage";
                    continue;
                }
            }
            reader.skipType(wireType, _depth, tag);
            if (!reader.discardUnknown) {
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
        }
        if (length !== $undefined) {
            if (reader.pos !== end)
                throw $RangeError("index out of range");
            reader.len = length;
        }
        if (_end !== $undefined)
            throw $Error("missing end group");
        return message;
    };

    /**
     * Decodes a DownstreamMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof DownstreamMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {DownstreamMessage & DownstreamMessage.$Shape} DownstreamMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DownstreamMessage.decodeDelimited = function(reader) {
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
    DownstreamMessage.verify = function (message, _depth) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            return "max depth exceeded";
        let properties = {};
        if (message.ackMessage != null && $Object.hasOwnProperty.call(message, "ackMessage")) {
            properties.message = 1;
            {
                let error = $root.DownstreamMessage.AckMessage.verify(message.ackMessage, _depth + 1);
                if (error)
                    return "ackMessage." + error;
            }
        }
        if (message.dataMessage != null && $Object.hasOwnProperty.call(message, "dataMessage")) {
            if (properties.message === 1)
                return "message: multiple values";
            properties.message = 1;
            {
                let error = $root.DownstreamMessage.DataMessage.verify(message.dataMessage, _depth + 1);
                if (error)
                    return "dataMessage." + error;
            }
        }
        if (message.systemMessage != null && $Object.hasOwnProperty.call(message, "systemMessage")) {
            if (properties.message === 1)
                return "message: multiple values";
            properties.message = 1;
            {
                let error = $root.DownstreamMessage.SystemMessage.verify(message.systemMessage, _depth + 1);
                if (error)
                    return "systemMessage." + error;
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
    DownstreamMessage.fromObject = function (object, _depth) {
        if (object instanceof $root.DownstreamMessage)
            return object;
        if (!$util.isObject(object))
            throw $TypeError(".DownstreamMessage: object expected");
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let message = new $root.DownstreamMessage();
        if (object.ackMessage != null) {
            if (!$util.isObject(object.ackMessage))
                throw $TypeError(".DownstreamMessage.ackMessage: object expected");
            message.ackMessage = $root.DownstreamMessage.AckMessage.fromObject(object.ackMessage, _depth + 1);
        }
        if (object.dataMessage != null) {
            if (!$util.isObject(object.dataMessage))
                throw $TypeError(".DownstreamMessage.dataMessage: object expected");
            message.dataMessage = $root.DownstreamMessage.DataMessage.fromObject(object.dataMessage, _depth + 1);
        }
        if (object.systemMessage != null) {
            if (!$util.isObject(object.systemMessage))
                throw $TypeError(".DownstreamMessage.systemMessage: object expected");
            message.systemMessage = $root.DownstreamMessage.SystemMessage.fromObject(object.systemMessage, _depth + 1);
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
    DownstreamMessage.toObject = function (message, options, _depth) {
        if (!options)
            options = {};
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let object = {};
        if (message.ackMessage != null && $Object.hasOwnProperty.call(message, "ackMessage")) {
            object.ackMessage = $root.DownstreamMessage.AckMessage.toObject(message.ackMessage, options, _depth + 1);
            if (options.oneofs)
                object.message = "ackMessage";
        }
        if (message.dataMessage != null && $Object.hasOwnProperty.call(message, "dataMessage")) {
            object.dataMessage = $root.DownstreamMessage.DataMessage.toObject(message.dataMessage, options, _depth + 1);
            if (options.oneofs)
                object.message = "dataMessage";
        }
        if (message.systemMessage != null && $Object.hasOwnProperty.call(message, "systemMessage")) {
            object.systemMessage = $root.DownstreamMessage.SystemMessage.toObject(message.systemMessage, options, _depth + 1);
            if (options.oneofs)
                object.message = "systemMessage";
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
    DownstreamMessage.prototype.toJSON = function() {
        return DownstreamMessage.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the type url for DownstreamMessage
     * @function getTypeUrl
     * @memberof DownstreamMessage
     * @static
     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns {string} The type url
     */
    DownstreamMessage.getTypeUrl = function(prefix) {
        if (prefix === $undefined)
            prefix = "type.googleapis.com";
        return prefix + "/DownstreamMessage";
    };

    DownstreamMessage.AckMessage = (function() {

        /**
         * Properties of an AckMessage.
         * @typedef {Object} DownstreamMessage.AckMessage.$Properties
         * @property {number|Long|null} [ackId] AckMessage ackId
         * @property {boolean|null} [success] AckMessage success
         * @property {DownstreamMessage.AckMessage.ErrorMessage.$Properties|null} [error] AckMessage error
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of an AckMessage.
         * @memberof DownstreamMessage
         * @interface IAckMessage
         * @augments DownstreamMessage.AckMessage.$Properties
         * @deprecated Use DownstreamMessage.AckMessage.$Properties instead.
         */

        /**
         * Shape of an AckMessage.
         * @typedef {DownstreamMessage.AckMessage.$Properties} DownstreamMessage.AckMessage.$Shape
         */

        /**
         * Constructs a new AckMessage.
         * @memberof DownstreamMessage
         * @classdesc Represents an AckMessage.
         * @constructor
         * @param {DownstreamMessage.AckMessage.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        const AckMessage = function (properties) {
            if (properties)
                for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

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
         * @member {DownstreamMessage.AckMessage.ErrorMessage.$Properties|null|undefined} error
         * @memberof DownstreamMessage.AckMessage
         * @instance
         */
        AckMessage.prototype.error = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(AckMessage.prototype, "_error", {
            get: $util.oneOfGetter($oneOfFields = ["error"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new AckMessage instance using the specified properties.
         * @function create
         * @memberof DownstreamMessage.AckMessage
         * @static
         * @param {DownstreamMessage.AckMessage.$Properties=} [properties] Properties to set
         * @returns {DownstreamMessage.AckMessage} AckMessage instance
         * @type {{
         *   (properties: DownstreamMessage.AckMessage.$Shape): DownstreamMessage.AckMessage & DownstreamMessage.AckMessage.$Shape;
         *   (properties?: DownstreamMessage.AckMessage.$Properties): DownstreamMessage.AckMessage;
         * }}
         */
        AckMessage.create = function(properties) {
            return new AckMessage(properties);
        };

        /**
         * Encodes the specified AckMessage message. Does not implicitly {@link DownstreamMessage.AckMessage.verify|verify} messages.
         * @function encode
         * @memberof DownstreamMessage.AckMessage
         * @static
         * @param {DownstreamMessage.AckMessage.$Properties} message AckMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AckMessage.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.ackId != null && $Object.hasOwnProperty.call(message, "ackId") && (typeof message.ackId === "object" ? message.ackId.low || message.ackId.high : message.ackId !== 0))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.ackId);
            if (message.success != null && $Object.hasOwnProperty.call(message, "success") && message.success !== false)
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.success);
            if (message.error != null && $Object.hasOwnProperty.call(message, "error"))
                $root.DownstreamMessage.AckMessage.ErrorMessage.encode(message.error, writer.uint32(/* id 3, wireType 2 =*/26).fork(), _depth + 1).ldelim();
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified AckMessage message, length delimited. Does not implicitly {@link DownstreamMessage.AckMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof DownstreamMessage.AckMessage
         * @static
         * @param {DownstreamMessage.AckMessage.$Properties} message AckMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AckMessage.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes an AckMessage message from the specified reader or buffer.
         * @function decode
         * @memberof DownstreamMessage.AckMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {DownstreamMessage.AckMessage & DownstreamMessage.AckMessage.$Shape} AckMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AckMessage.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            let end, message, value;
            if (length === $undefined)
                end = reader.len;
            else {
                end = reader.pos + length;
                if (end > reader.len)
                    throw $RangeError("index out of range");
                length = reader.len;
                reader.len = end;
            }
            message = _target || new $root.DownstreamMessage.AckMessage();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        if (typeof (value = reader.uint64()) === "object" ? value.low || value.high : value !== 0)
                            message.ackId = value;
                        else
                            delete message.ackId;
                        continue;
                    }
                case 2: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.bool())
                            message.success = value;
                        else
                            delete message.success;
                        continue;
                    }
                case 3: {
                        if (wireType !== 2)
                            break;
                        message.error = $root.DownstreamMessage.AckMessage.ErrorMessage.decode(reader, reader.uint32(), $undefined, _depth + 1, message.error);
                        message._error = "error";
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (length !== $undefined) {
                if (reader.pos !== end)
                    throw $RangeError("index out of range");
                reader.len = length;
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes an AckMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof DownstreamMessage.AckMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {DownstreamMessage.AckMessage & DownstreamMessage.AckMessage.$Shape} AckMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AckMessage.decodeDelimited = function(reader) {
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
        AckMessage.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            let properties = {};
            if (message.ackId != null && $Object.hasOwnProperty.call(message, "ackId"))
                if (!$util.isInteger(message.ackId) && !(message.ackId && $util.isInteger(message.ackId.low) && $util.isInteger(message.ackId.high)))
                    return "ackId: integer|Long expected";
            if (message.success != null && $Object.hasOwnProperty.call(message, "success"))
                if (typeof message.success !== "boolean")
                    return "success: boolean expected";
            if (message.error != null && $Object.hasOwnProperty.call(message, "error")) {
                properties._error = 1;
                {
                    let error = $root.DownstreamMessage.AckMessage.ErrorMessage.verify(message.error, _depth + 1);
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
        AckMessage.fromObject = function (object, _depth) {
            if (object instanceof $root.DownstreamMessage.AckMessage)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".DownstreamMessage.AckMessage: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let message = new $root.DownstreamMessage.AckMessage();
            if (object.ackId != null)
                if (typeof object.ackId === "object" ? object.ackId.low || object.ackId.high : $Number(object.ackId) !== 0)
                    if ($util.Long)
                        message.ackId = $util.Long.fromValue(object.ackId, true);
                    else if (typeof object.ackId === "string")
                        message.ackId = $parseInt(object.ackId, 10);
                    else if (typeof object.ackId === "number")
                        message.ackId = object.ackId;
                    else if (typeof object.ackId === "object")
                        message.ackId = new $util.LongBits(object.ackId.low >>> 0, object.ackId.high >>> 0).toNumber(true);
            if (object.success != null)
                if (object.success)
                    message.success = $Boolean(object.success);
            if (object.error != null) {
                if (!$util.isObject(object.error))
                    throw $TypeError(".DownstreamMessage.AckMessage.error: object expected");
                message.error = $root.DownstreamMessage.AckMessage.ErrorMessage.fromObject(object.error, _depth + 1);
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
        AckMessage.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.ackId = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                } else
                    object.ackId = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
                object.success = false;
            }
            if (message.ackId != null && $Object.hasOwnProperty.call(message, "ackId"))
                if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                    object.ackId = typeof message.ackId === "number" ? $BigInt(message.ackId) : $util.Long.fromBits(message.ackId.low >>> 0, message.ackId.high >>> 0, true).toBigInt();
                else if (typeof message.ackId === "number")
                    object.ackId = options.longs === $String ? $String(message.ackId) : message.ackId;
                else
                    object.ackId = options.longs === $String ? $util.Long.prototype.toString.call(message.ackId) : options.longs === $Number ? new $util.LongBits(message.ackId.low >>> 0, message.ackId.high >>> 0).toNumber(true) : message.ackId;
            if (message.success != null && $Object.hasOwnProperty.call(message, "success"))
                object.success = message.success;
            if (message.error != null && $Object.hasOwnProperty.call(message, "error"))
                object.error = $root.DownstreamMessage.AckMessage.ErrorMessage.toObject(message.error, options, _depth + 1);
            return object;
        };

        /**
         * Converts this AckMessage to JSON.
         * @function toJSON
         * @memberof DownstreamMessage.AckMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AckMessage.prototype.toJSON = function() {
            return AckMessage.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for AckMessage
         * @function getTypeUrl
         * @memberof DownstreamMessage.AckMessage
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        AckMessage.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/DownstreamMessage.AckMessage";
        };

        AckMessage.ErrorMessage = (function() {

            /**
             * Properties of an ErrorMessage.
             * @typedef {Object} DownstreamMessage.AckMessage.ErrorMessage.$Properties
             * @property {string|null} [name] ErrorMessage name
             * @property {string|null} [message] ErrorMessage message
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */

            /**
             * Properties of an ErrorMessage.
             * @memberof DownstreamMessage.AckMessage
             * @interface IErrorMessage
             * @augments DownstreamMessage.AckMessage.ErrorMessage.$Properties
             * @deprecated Use DownstreamMessage.AckMessage.ErrorMessage.$Properties instead.
             */

            /**
             * Shape of an ErrorMessage.
             * @typedef {DownstreamMessage.AckMessage.ErrorMessage.$Properties} DownstreamMessage.AckMessage.ErrorMessage.$Shape
             */

            /**
             * Constructs a new ErrorMessage.
             * @memberof DownstreamMessage.AckMessage
             * @classdesc Represents an ErrorMessage.
             * @constructor
             * @param {DownstreamMessage.AckMessage.ErrorMessage.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */
            const ErrorMessage = function (properties) {
                if (properties)
                    for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            };

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
             * @param {DownstreamMessage.AckMessage.ErrorMessage.$Properties=} [properties] Properties to set
             * @returns {DownstreamMessage.AckMessage.ErrorMessage} ErrorMessage instance
             * @type {{
             *   (properties: DownstreamMessage.AckMessage.ErrorMessage.$Shape): DownstreamMessage.AckMessage.ErrorMessage & DownstreamMessage.AckMessage.ErrorMessage.$Shape;
             *   (properties?: DownstreamMessage.AckMessage.ErrorMessage.$Properties): DownstreamMessage.AckMessage.ErrorMessage;
             * }}
             */
            ErrorMessage.create = function(properties) {
                return new ErrorMessage(properties);
            };

            /**
             * Encodes the specified ErrorMessage message. Does not implicitly {@link DownstreamMessage.AckMessage.ErrorMessage.verify|verify} messages.
             * @function encode
             * @memberof DownstreamMessage.AckMessage.ErrorMessage
             * @static
             * @param {DownstreamMessage.AckMessage.ErrorMessage.$Properties} message ErrorMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ErrorMessage.encode = function (message, writer, _depth) {
                if (!writer)
                    writer = $Writer.create();
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (message.name != null && $Object.hasOwnProperty.call(message, "name") && message.name !== "")
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
                if (message.message != null && $Object.hasOwnProperty.call(message, "message") && message.message !== "")
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.message);
                if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                    for (let i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };

            /**
             * Encodes the specified ErrorMessage message, length delimited. Does not implicitly {@link DownstreamMessage.AckMessage.ErrorMessage.verify|verify} messages.
             * @function encodeDelimited
             * @memberof DownstreamMessage.AckMessage.ErrorMessage
             * @static
             * @param {DownstreamMessage.AckMessage.ErrorMessage.$Properties} message ErrorMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ErrorMessage.encodeDelimited = function(message, writer) {
                return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
            };

            /**
             * Decodes an ErrorMessage message from the specified reader or buffer.
             * @function decode
             * @memberof DownstreamMessage.AckMessage.ErrorMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {DownstreamMessage.AckMessage.ErrorMessage & DownstreamMessage.AckMessage.ErrorMessage.$Shape} ErrorMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ErrorMessage.decode = function (reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw $Error("max depth exceeded");
                let end, message, value;
                if (length === $undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw $RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = _target || new $root.DownstreamMessage.AckMessage.ErrorMessage();
                while (reader.pos < end) {
                    let start = reader.pos;
                    let tag = reader.tag();
                    if (tag === _end) {
                        _end = $undefined;
                        break;
                    }
                    let wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.name = value;
                            else
                                delete message.name;
                            continue;
                        }
                    case 2: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.message = value;
                            else
                                delete message.message;
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    if (!reader.discardUnknown) {
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                }
                if (length !== $undefined) {
                    if (reader.pos !== end)
                        throw $RangeError("index out of range");
                    reader.len = length;
                }
                if (_end !== $undefined)
                    throw $Error("missing end group");
                return message;
            };

            /**
             * Decodes an ErrorMessage message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof DownstreamMessage.AckMessage.ErrorMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {DownstreamMessage.AckMessage.ErrorMessage & DownstreamMessage.AckMessage.ErrorMessage.$Shape} ErrorMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ErrorMessage.decodeDelimited = function(reader) {
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
            ErrorMessage.verify = function (message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (message.name != null && $Object.hasOwnProperty.call(message, "name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.message != null && $Object.hasOwnProperty.call(message, "message"))
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
            ErrorMessage.fromObject = function (object, _depth) {
                if (object instanceof $root.DownstreamMessage.AckMessage.ErrorMessage)
                    return object;
                if (!$util.isObject(object))
                    throw $TypeError(".DownstreamMessage.AckMessage.ErrorMessage: object expected");
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let message = new $root.DownstreamMessage.AckMessage.ErrorMessage();
                if (object.name != null)
                    if (typeof object.name !== "string" || object.name.length)
                        message.name = $String(object.name);
                if (object.message != null)
                    if (typeof object.message !== "string" || object.message.length)
                        message.message = $String(object.message);
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
            ErrorMessage.toObject = function (message, options, _depth) {
                if (!options)
                    options = {};
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.name = "";
                    object.message = "";
                }
                if (message.name != null && $Object.hasOwnProperty.call(message, "name"))
                    object.name = message.name;
                if (message.message != null && $Object.hasOwnProperty.call(message, "message"))
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
            ErrorMessage.prototype.toJSON = function() {
                return ErrorMessage.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the type url for ErrorMessage
             * @function getTypeUrl
             * @memberof DownstreamMessage.AckMessage.ErrorMessage
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            ErrorMessage.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/DownstreamMessage.AckMessage.ErrorMessage";
            };

            return ErrorMessage;
        })();

        return AckMessage;
    })();

    DownstreamMessage.DataMessage = (function() {

        /**
         * Properties of a DataMessage.
         * @typedef {Object} DownstreamMessage.DataMessage.$Properties
         * @property {string|null} [from] DataMessage from
         * @property {string|null} [group] DataMessage group
         * @property {MessageData.$Properties|null} [data] DataMessage data
         * @property {number|Long|null} [sequenceId] DataMessage sequenceId
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a DataMessage.
         * @memberof DownstreamMessage
         * @interface IDataMessage
         * @augments DownstreamMessage.DataMessage.$Properties
         * @deprecated Use DownstreamMessage.DataMessage.$Properties instead.
         */

        /**
         * Shape of a DataMessage.
         * @typedef {{
         *   from?: string|null;
         *   group?: string|null;
         *   data?: MessageData.$Shape|null;
         *   sequenceId?: number|Long|null;
         *   $unknowns?: Array.<Uint8Array>;
         * }} DownstreamMessage.DataMessage.$Shape
         */

        /**
         * Constructs a new DataMessage.
         * @memberof DownstreamMessage
         * @classdesc Represents a DataMessage.
         * @constructor
         * @param {DownstreamMessage.DataMessage.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        const DataMessage = function (properties) {
            if (properties)
                for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

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
         * @member {MessageData.$Properties|null|undefined} data
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
        $Object.defineProperty(DataMessage.prototype, "_group", {
            get: $util.oneOfGetter($oneOfFields = ["group"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(DataMessage.prototype, "_sequenceId", {
            get: $util.oneOfGetter($oneOfFields = ["sequenceId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new DataMessage instance using the specified properties.
         * @function create
         * @memberof DownstreamMessage.DataMessage
         * @static
         * @param {DownstreamMessage.DataMessage.$Properties=} [properties] Properties to set
         * @returns {DownstreamMessage.DataMessage} DataMessage instance
         * @type {{
         *   (properties: DownstreamMessage.DataMessage.$Shape): DownstreamMessage.DataMessage & DownstreamMessage.DataMessage.$Shape;
         *   (properties?: DownstreamMessage.DataMessage.$Properties): DownstreamMessage.DataMessage;
         * }}
         */
        DataMessage.create = function(properties) {
            return new DataMessage(properties);
        };

        /**
         * Encodes the specified DataMessage message. Does not implicitly {@link DownstreamMessage.DataMessage.verify|verify} messages.
         * @function encode
         * @memberof DownstreamMessage.DataMessage
         * @static
         * @param {DownstreamMessage.DataMessage.$Properties} message DataMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DataMessage.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.from != null && $Object.hasOwnProperty.call(message, "from") && message.from !== "")
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.from);
            if (message.group != null && $Object.hasOwnProperty.call(message, "group"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.group);
            if (message.data != null && $Object.hasOwnProperty.call(message, "data"))
                $root.MessageData.encode(message.data, writer.uint32(/* id 3, wireType 2 =*/26).fork(), _depth + 1).ldelim();
            if (message.sequenceId != null && $Object.hasOwnProperty.call(message, "sequenceId"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.sequenceId);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified DataMessage message, length delimited. Does not implicitly {@link DownstreamMessage.DataMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof DownstreamMessage.DataMessage
         * @static
         * @param {DownstreamMessage.DataMessage.$Properties} message DataMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DataMessage.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a DataMessage message from the specified reader or buffer.
         * @function decode
         * @memberof DownstreamMessage.DataMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {DownstreamMessage.DataMessage & DownstreamMessage.DataMessage.$Shape} DataMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DataMessage.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            let end, message, value;
            if (length === $undefined)
                end = reader.len;
            else {
                end = reader.pos + length;
                if (end > reader.len)
                    throw $RangeError("index out of range");
                length = reader.len;
                reader.len = end;
            }
            message = _target || new $root.DownstreamMessage.DataMessage();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.from = value;
                        else
                            delete message.from;
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        message.group = reader.stringVerify();
                        message._group = "group";
                        continue;
                    }
                case 3: {
                        if (wireType !== 2)
                            break;
                        message.data = $root.MessageData.decode(reader, reader.uint32(), $undefined, _depth + 1, message.data);
                        continue;
                    }
                case 4: {
                        if (wireType !== 0)
                            break;
                        message.sequenceId = reader.uint64();
                        message._sequenceId = "sequenceId";
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (length !== $undefined) {
                if (reader.pos !== end)
                    throw $RangeError("index out of range");
                reader.len = length;
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a DataMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof DownstreamMessage.DataMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {DownstreamMessage.DataMessage & DownstreamMessage.DataMessage.$Shape} DataMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DataMessage.decodeDelimited = function(reader) {
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
        DataMessage.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            let properties = {};
            if (message.from != null && $Object.hasOwnProperty.call(message, "from"))
                if (!$util.isString(message.from))
                    return "from: string expected";
            if (message.group != null && $Object.hasOwnProperty.call(message, "group")) {
                properties._group = 1;
                if (!$util.isString(message.group))
                    return "group: string expected";
            }
            if (message.data != null && $Object.hasOwnProperty.call(message, "data")) {
                let error = $root.MessageData.verify(message.data, _depth + 1);
                if (error)
                    return "data." + error;
            }
            if (message.sequenceId != null && $Object.hasOwnProperty.call(message, "sequenceId")) {
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
        DataMessage.fromObject = function (object, _depth) {
            if (object instanceof $root.DownstreamMessage.DataMessage)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".DownstreamMessage.DataMessage: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let message = new $root.DownstreamMessage.DataMessage();
            if (object.from != null)
                if (typeof object.from !== "string" || object.from.length)
                    message.from = $String(object.from);
            if (object.group != null)
                message.group = $String(object.group);
            if (object.data != null) {
                if (!$util.isObject(object.data))
                    throw $TypeError(".DownstreamMessage.DataMessage.data: object expected");
                message.data = $root.MessageData.fromObject(object.data, _depth + 1);
            }
            if (object.sequenceId != null)
                if ($util.Long)
                    message.sequenceId = $util.Long.fromValue(object.sequenceId, true);
                else if (typeof object.sequenceId === "string")
                    message.sequenceId = $parseInt(object.sequenceId, 10);
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
        DataMessage.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.from = "";
                object.data = null;
            }
            if (message.from != null && $Object.hasOwnProperty.call(message, "from"))
                object.from = message.from;
            if (message.group != null && $Object.hasOwnProperty.call(message, "group"))
                object.group = message.group;
            if (message.data != null && $Object.hasOwnProperty.call(message, "data"))
                object.data = $root.MessageData.toObject(message.data, options, _depth + 1);
            if (message.sequenceId != null && $Object.hasOwnProperty.call(message, "sequenceId"))
                if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                    object.sequenceId = typeof message.sequenceId === "number" ? $BigInt(message.sequenceId) : $util.Long.fromBits(message.sequenceId.low >>> 0, message.sequenceId.high >>> 0, true).toBigInt();
                else if (typeof message.sequenceId === "number")
                    object.sequenceId = options.longs === $String ? $String(message.sequenceId) : message.sequenceId;
                else
                    object.sequenceId = options.longs === $String ? $util.Long.prototype.toString.call(message.sequenceId) : options.longs === $Number ? new $util.LongBits(message.sequenceId.low >>> 0, message.sequenceId.high >>> 0).toNumber(true) : message.sequenceId;
            return object;
        };

        /**
         * Converts this DataMessage to JSON.
         * @function toJSON
         * @memberof DownstreamMessage.DataMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DataMessage.prototype.toJSON = function() {
            return DataMessage.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for DataMessage
         * @function getTypeUrl
         * @memberof DownstreamMessage.DataMessage
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        DataMessage.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/DownstreamMessage.DataMessage";
        };

        return DataMessage;
    })();

    DownstreamMessage.SystemMessage = (function() {

        /**
         * Properties of a SystemMessage.
         * @typedef {Object} DownstreamMessage.SystemMessage.$Properties
         * @property {DownstreamMessage.SystemMessage.ConnectedMessage.$Properties|null} [connectedMessage] SystemMessage connectedMessage
         * @property {DownstreamMessage.SystemMessage.DisconnectedMessage.$Properties|null} [disconnectedMessage] SystemMessage disconnectedMessage
         * @property {"connectedMessage"|"disconnectedMessage"} [message] SystemMessage message
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a SystemMessage.
         * @memberof DownstreamMessage
         * @interface ISystemMessage
         * @augments DownstreamMessage.SystemMessage.$Properties
         * @deprecated Use DownstreamMessage.SystemMessage.$Properties instead.
         */

        /**
         * Narrowed shape of a SystemMessage.
         * @typedef {{
         *   connectedMessage?: DownstreamMessage.SystemMessage.ConnectedMessage.$Shape|null;
         *   disconnectedMessage?: DownstreamMessage.SystemMessage.DisconnectedMessage.$Shape|null;
         *   $unknowns?: Array.<Uint8Array>;
         * } & (
         *   ({ message?: undefined; connectedMessage?: null; disconnectedMessage?: null }|{ message?: "connectedMessage"; connectedMessage: DownstreamMessage.SystemMessage.ConnectedMessage.$Shape; disconnectedMessage?: null }|{ message?: "disconnectedMessage"; connectedMessage?: null; disconnectedMessage: DownstreamMessage.SystemMessage.DisconnectedMessage.$Shape })
         * )} DownstreamMessage.SystemMessage.$Shape
         */

        /**
         * Constructs a new SystemMessage.
         * @memberof DownstreamMessage
         * @classdesc Represents a SystemMessage.
         * @constructor
         * @param {DownstreamMessage.SystemMessage.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        const SystemMessage = function (properties) {
            if (properties)
                for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * SystemMessage connectedMessage.
         * @member {DownstreamMessage.SystemMessage.ConnectedMessage.$Properties|null|undefined} connectedMessage
         * @memberof DownstreamMessage.SystemMessage
         * @instance
         */
        SystemMessage.prototype.connectedMessage = null;

        /**
         * SystemMessage disconnectedMessage.
         * @member {DownstreamMessage.SystemMessage.DisconnectedMessage.$Properties|null|undefined} disconnectedMessage
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
        $Object.defineProperty(SystemMessage.prototype, "message", {
            get: $util.oneOfGetter($oneOfFields = ["connectedMessage", "disconnectedMessage"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new SystemMessage instance using the specified properties.
         * @function create
         * @memberof DownstreamMessage.SystemMessage
         * @static
         * @param {DownstreamMessage.SystemMessage.$Properties=} [properties] Properties to set
         * @returns {DownstreamMessage.SystemMessage} SystemMessage instance
         * @type {{
         *   (properties: DownstreamMessage.SystemMessage.$Shape): DownstreamMessage.SystemMessage & DownstreamMessage.SystemMessage.$Shape;
         *   (properties?: DownstreamMessage.SystemMessage.$Properties): DownstreamMessage.SystemMessage;
         * }}
         */
        SystemMessage.create = function(properties) {
            return new SystemMessage(properties);
        };

        /**
         * Encodes the specified SystemMessage message. Does not implicitly {@link DownstreamMessage.SystemMessage.verify|verify} messages.
         * @function encode
         * @memberof DownstreamMessage.SystemMessage
         * @static
         * @param {DownstreamMessage.SystemMessage.$Properties} message SystemMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SystemMessage.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.connectedMessage != null && $Object.hasOwnProperty.call(message, "connectedMessage"))
                $root.DownstreamMessage.SystemMessage.ConnectedMessage.encode(message.connectedMessage, writer.uint32(/* id 1, wireType 2 =*/10).fork(), _depth + 1).ldelim();
            if (message.disconnectedMessage != null && $Object.hasOwnProperty.call(message, "disconnectedMessage"))
                $root.DownstreamMessage.SystemMessage.DisconnectedMessage.encode(message.disconnectedMessage, writer.uint32(/* id 2, wireType 2 =*/18).fork(), _depth + 1).ldelim();
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified SystemMessage message, length delimited. Does not implicitly {@link DownstreamMessage.SystemMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof DownstreamMessage.SystemMessage
         * @static
         * @param {DownstreamMessage.SystemMessage.$Properties} message SystemMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SystemMessage.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a SystemMessage message from the specified reader or buffer.
         * @function decode
         * @memberof DownstreamMessage.SystemMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {DownstreamMessage.SystemMessage & DownstreamMessage.SystemMessage.$Shape} SystemMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SystemMessage.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            let end, message;
            if (length === $undefined)
                end = reader.len;
            else {
                end = reader.pos + length;
                if (end > reader.len)
                    throw $RangeError("index out of range");
                length = reader.len;
                reader.len = end;
            }
            message = _target || new $root.DownstreamMessage.SystemMessage();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        message.connectedMessage = $root.DownstreamMessage.SystemMessage.ConnectedMessage.decode(reader, reader.uint32(), $undefined, _depth + 1, message.connectedMessage);
                        message.message = "connectedMessage";
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        message.disconnectedMessage = $root.DownstreamMessage.SystemMessage.DisconnectedMessage.decode(reader, reader.uint32(), $undefined, _depth + 1, message.disconnectedMessage);
                        message.message = "disconnectedMessage";
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (length !== $undefined) {
                if (reader.pos !== end)
                    throw $RangeError("index out of range");
                reader.len = length;
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a SystemMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof DownstreamMessage.SystemMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {DownstreamMessage.SystemMessage & DownstreamMessage.SystemMessage.$Shape} SystemMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SystemMessage.decodeDelimited = function(reader) {
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
        SystemMessage.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            let properties = {};
            if (message.connectedMessage != null && $Object.hasOwnProperty.call(message, "connectedMessage")) {
                properties.message = 1;
                {
                    let error = $root.DownstreamMessage.SystemMessage.ConnectedMessage.verify(message.connectedMessage, _depth + 1);
                    if (error)
                        return "connectedMessage." + error;
                }
            }
            if (message.disconnectedMessage != null && $Object.hasOwnProperty.call(message, "disconnectedMessage")) {
                if (properties.message === 1)
                    return "message: multiple values";
                properties.message = 1;
                {
                    let error = $root.DownstreamMessage.SystemMessage.DisconnectedMessage.verify(message.disconnectedMessage, _depth + 1);
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
        SystemMessage.fromObject = function (object, _depth) {
            if (object instanceof $root.DownstreamMessage.SystemMessage)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".DownstreamMessage.SystemMessage: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let message = new $root.DownstreamMessage.SystemMessage();
            if (object.connectedMessage != null) {
                if (!$util.isObject(object.connectedMessage))
                    throw $TypeError(".DownstreamMessage.SystemMessage.connectedMessage: object expected");
                message.connectedMessage = $root.DownstreamMessage.SystemMessage.ConnectedMessage.fromObject(object.connectedMessage, _depth + 1);
            }
            if (object.disconnectedMessage != null) {
                if (!$util.isObject(object.disconnectedMessage))
                    throw $TypeError(".DownstreamMessage.SystemMessage.disconnectedMessage: object expected");
                message.disconnectedMessage = $root.DownstreamMessage.SystemMessage.DisconnectedMessage.fromObject(object.disconnectedMessage, _depth + 1);
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
        SystemMessage.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let object = {};
            if (message.connectedMessage != null && $Object.hasOwnProperty.call(message, "connectedMessage")) {
                object.connectedMessage = $root.DownstreamMessage.SystemMessage.ConnectedMessage.toObject(message.connectedMessage, options, _depth + 1);
                if (options.oneofs)
                    object.message = "connectedMessage";
            }
            if (message.disconnectedMessage != null && $Object.hasOwnProperty.call(message, "disconnectedMessage")) {
                object.disconnectedMessage = $root.DownstreamMessage.SystemMessage.DisconnectedMessage.toObject(message.disconnectedMessage, options, _depth + 1);
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
        SystemMessage.prototype.toJSON = function() {
            return SystemMessage.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for SystemMessage
         * @function getTypeUrl
         * @memberof DownstreamMessage.SystemMessage
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        SystemMessage.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/DownstreamMessage.SystemMessage";
        };

        SystemMessage.ConnectedMessage = (function() {

            /**
             * Properties of a ConnectedMessage.
             * @typedef {Object} DownstreamMessage.SystemMessage.ConnectedMessage.$Properties
             * @property {string|null} [connectionId] ConnectedMessage connectionId
             * @property {string|null} [userId] ConnectedMessage userId
             * @property {string|null} [reconnectionToken] ConnectedMessage reconnectionToken
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */

            /**
             * Properties of a ConnectedMessage.
             * @memberof DownstreamMessage.SystemMessage
             * @interface IConnectedMessage
             * @augments DownstreamMessage.SystemMessage.ConnectedMessage.$Properties
             * @deprecated Use DownstreamMessage.SystemMessage.ConnectedMessage.$Properties instead.
             */

            /**
             * Shape of a ConnectedMessage.
             * @typedef {DownstreamMessage.SystemMessage.ConnectedMessage.$Properties} DownstreamMessage.SystemMessage.ConnectedMessage.$Shape
             */

            /**
             * Constructs a new ConnectedMessage.
             * @memberof DownstreamMessage.SystemMessage
             * @classdesc Represents a ConnectedMessage.
             * @constructor
             * @param {DownstreamMessage.SystemMessage.ConnectedMessage.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */
            const ConnectedMessage = function (properties) {
                if (properties)
                    for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            };

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
             * @param {DownstreamMessage.SystemMessage.ConnectedMessage.$Properties=} [properties] Properties to set
             * @returns {DownstreamMessage.SystemMessage.ConnectedMessage} ConnectedMessage instance
             * @type {{
             *   (properties: DownstreamMessage.SystemMessage.ConnectedMessage.$Shape): DownstreamMessage.SystemMessage.ConnectedMessage & DownstreamMessage.SystemMessage.ConnectedMessage.$Shape;
             *   (properties?: DownstreamMessage.SystemMessage.ConnectedMessage.$Properties): DownstreamMessage.SystemMessage.ConnectedMessage;
             * }}
             */
            ConnectedMessage.create = function(properties) {
                return new ConnectedMessage(properties);
            };

            /**
             * Encodes the specified ConnectedMessage message. Does not implicitly {@link DownstreamMessage.SystemMessage.ConnectedMessage.verify|verify} messages.
             * @function encode
             * @memberof DownstreamMessage.SystemMessage.ConnectedMessage
             * @static
             * @param {DownstreamMessage.SystemMessage.ConnectedMessage.$Properties} message ConnectedMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ConnectedMessage.encode = function (message, writer, _depth) {
                if (!writer)
                    writer = $Writer.create();
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (message.connectionId != null && $Object.hasOwnProperty.call(message, "connectionId") && message.connectionId !== "")
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.connectionId);
                if (message.userId != null && $Object.hasOwnProperty.call(message, "userId") && message.userId !== "")
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.userId);
                if (message.reconnectionToken != null && $Object.hasOwnProperty.call(message, "reconnectionToken") && message.reconnectionToken !== "")
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.reconnectionToken);
                if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                    for (let i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };

            /**
             * Encodes the specified ConnectedMessage message, length delimited. Does not implicitly {@link DownstreamMessage.SystemMessage.ConnectedMessage.verify|verify} messages.
             * @function encodeDelimited
             * @memberof DownstreamMessage.SystemMessage.ConnectedMessage
             * @static
             * @param {DownstreamMessage.SystemMessage.ConnectedMessage.$Properties} message ConnectedMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ConnectedMessage.encodeDelimited = function(message, writer) {
                return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
            };

            /**
             * Decodes a ConnectedMessage message from the specified reader or buffer.
             * @function decode
             * @memberof DownstreamMessage.SystemMessage.ConnectedMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {DownstreamMessage.SystemMessage.ConnectedMessage & DownstreamMessage.SystemMessage.ConnectedMessage.$Shape} ConnectedMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ConnectedMessage.decode = function (reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw $Error("max depth exceeded");
                let end, message, value;
                if (length === $undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw $RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = _target || new $root.DownstreamMessage.SystemMessage.ConnectedMessage();
                while (reader.pos < end) {
                    let start = reader.pos;
                    let tag = reader.tag();
                    if (tag === _end) {
                        _end = $undefined;
                        break;
                    }
                    let wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.connectionId = value;
                            else
                                delete message.connectionId;
                            continue;
                        }
                    case 2: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.userId = value;
                            else
                                delete message.userId;
                            continue;
                        }
                    case 3: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.reconnectionToken = value;
                            else
                                delete message.reconnectionToken;
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    if (!reader.discardUnknown) {
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                }
                if (length !== $undefined) {
                    if (reader.pos !== end)
                        throw $RangeError("index out of range");
                    reader.len = length;
                }
                if (_end !== $undefined)
                    throw $Error("missing end group");
                return message;
            };

            /**
             * Decodes a ConnectedMessage message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof DownstreamMessage.SystemMessage.ConnectedMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {DownstreamMessage.SystemMessage.ConnectedMessage & DownstreamMessage.SystemMessage.ConnectedMessage.$Shape} ConnectedMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ConnectedMessage.decodeDelimited = function(reader) {
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
            ConnectedMessage.verify = function (message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (message.connectionId != null && $Object.hasOwnProperty.call(message, "connectionId"))
                    if (!$util.isString(message.connectionId))
                        return "connectionId: string expected";
                if (message.userId != null && $Object.hasOwnProperty.call(message, "userId"))
                    if (!$util.isString(message.userId))
                        return "userId: string expected";
                if (message.reconnectionToken != null && $Object.hasOwnProperty.call(message, "reconnectionToken"))
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
            ConnectedMessage.fromObject = function (object, _depth) {
                if (object instanceof $root.DownstreamMessage.SystemMessage.ConnectedMessage)
                    return object;
                if (!$util.isObject(object))
                    throw $TypeError(".DownstreamMessage.SystemMessage.ConnectedMessage: object expected");
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let message = new $root.DownstreamMessage.SystemMessage.ConnectedMessage();
                if (object.connectionId != null)
                    if (typeof object.connectionId !== "string" || object.connectionId.length)
                        message.connectionId = $String(object.connectionId);
                if (object.userId != null)
                    if (typeof object.userId !== "string" || object.userId.length)
                        message.userId = $String(object.userId);
                if (object.reconnectionToken != null)
                    if (typeof object.reconnectionToken !== "string" || object.reconnectionToken.length)
                        message.reconnectionToken = $String(object.reconnectionToken);
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
            ConnectedMessage.toObject = function (message, options, _depth) {
                if (!options)
                    options = {};
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.connectionId = "";
                    object.userId = "";
                    object.reconnectionToken = "";
                }
                if (message.connectionId != null && $Object.hasOwnProperty.call(message, "connectionId"))
                    object.connectionId = message.connectionId;
                if (message.userId != null && $Object.hasOwnProperty.call(message, "userId"))
                    object.userId = message.userId;
                if (message.reconnectionToken != null && $Object.hasOwnProperty.call(message, "reconnectionToken"))
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
            ConnectedMessage.prototype.toJSON = function() {
                return ConnectedMessage.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the type url for ConnectedMessage
             * @function getTypeUrl
             * @memberof DownstreamMessage.SystemMessage.ConnectedMessage
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            ConnectedMessage.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/DownstreamMessage.SystemMessage.ConnectedMessage";
            };

            return ConnectedMessage;
        })();

        SystemMessage.DisconnectedMessage = (function() {

            /**
             * Properties of a DisconnectedMessage.
             * @typedef {Object} DownstreamMessage.SystemMessage.DisconnectedMessage.$Properties
             * @property {string|null} [reason] DisconnectedMessage reason
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */

            /**
             * Properties of a DisconnectedMessage.
             * @memberof DownstreamMessage.SystemMessage
             * @interface IDisconnectedMessage
             * @augments DownstreamMessage.SystemMessage.DisconnectedMessage.$Properties
             * @deprecated Use DownstreamMessage.SystemMessage.DisconnectedMessage.$Properties instead.
             */

            /**
             * Shape of a DisconnectedMessage.
             * @typedef {DownstreamMessage.SystemMessage.DisconnectedMessage.$Properties} DownstreamMessage.SystemMessage.DisconnectedMessage.$Shape
             */

            /**
             * Constructs a new DisconnectedMessage.
             * @memberof DownstreamMessage.SystemMessage
             * @classdesc Represents a DisconnectedMessage.
             * @constructor
             * @param {DownstreamMessage.SystemMessage.DisconnectedMessage.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */
            const DisconnectedMessage = function (properties) {
                if (properties)
                    for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            };

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
             * @param {DownstreamMessage.SystemMessage.DisconnectedMessage.$Properties=} [properties] Properties to set
             * @returns {DownstreamMessage.SystemMessage.DisconnectedMessage} DisconnectedMessage instance
             * @type {{
             *   (properties: DownstreamMessage.SystemMessage.DisconnectedMessage.$Shape): DownstreamMessage.SystemMessage.DisconnectedMessage & DownstreamMessage.SystemMessage.DisconnectedMessage.$Shape;
             *   (properties?: DownstreamMessage.SystemMessage.DisconnectedMessage.$Properties): DownstreamMessage.SystemMessage.DisconnectedMessage;
             * }}
             */
            DisconnectedMessage.create = function(properties) {
                return new DisconnectedMessage(properties);
            };

            /**
             * Encodes the specified DisconnectedMessage message. Does not implicitly {@link DownstreamMessage.SystemMessage.DisconnectedMessage.verify|verify} messages.
             * @function encode
             * @memberof DownstreamMessage.SystemMessage.DisconnectedMessage
             * @static
             * @param {DownstreamMessage.SystemMessage.DisconnectedMessage.$Properties} message DisconnectedMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DisconnectedMessage.encode = function (message, writer, _depth) {
                if (!writer)
                    writer = $Writer.create();
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (message.reason != null && $Object.hasOwnProperty.call(message, "reason") && message.reason !== "")
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.reason);
                if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                    for (let i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };

            /**
             * Encodes the specified DisconnectedMessage message, length delimited. Does not implicitly {@link DownstreamMessage.SystemMessage.DisconnectedMessage.verify|verify} messages.
             * @function encodeDelimited
             * @memberof DownstreamMessage.SystemMessage.DisconnectedMessage
             * @static
             * @param {DownstreamMessage.SystemMessage.DisconnectedMessage.$Properties} message DisconnectedMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DisconnectedMessage.encodeDelimited = function(message, writer) {
                return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
            };

            /**
             * Decodes a DisconnectedMessage message from the specified reader or buffer.
             * @function decode
             * @memberof DownstreamMessage.SystemMessage.DisconnectedMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {DownstreamMessage.SystemMessage.DisconnectedMessage & DownstreamMessage.SystemMessage.DisconnectedMessage.$Shape} DisconnectedMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DisconnectedMessage.decode = function (reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw $Error("max depth exceeded");
                let end, message, value;
                if (length === $undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw $RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = _target || new $root.DownstreamMessage.SystemMessage.DisconnectedMessage();
                while (reader.pos < end) {
                    let start = reader.pos;
                    let tag = reader.tag();
                    if (tag === _end) {
                        _end = $undefined;
                        break;
                    }
                    let wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 2: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.reason = value;
                            else
                                delete message.reason;
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    if (!reader.discardUnknown) {
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                }
                if (length !== $undefined) {
                    if (reader.pos !== end)
                        throw $RangeError("index out of range");
                    reader.len = length;
                }
                if (_end !== $undefined)
                    throw $Error("missing end group");
                return message;
            };

            /**
             * Decodes a DisconnectedMessage message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof DownstreamMessage.SystemMessage.DisconnectedMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {DownstreamMessage.SystemMessage.DisconnectedMessage & DownstreamMessage.SystemMessage.DisconnectedMessage.$Shape} DisconnectedMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DisconnectedMessage.decodeDelimited = function(reader) {
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
            DisconnectedMessage.verify = function (message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (message.reason != null && $Object.hasOwnProperty.call(message, "reason"))
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
            DisconnectedMessage.fromObject = function (object, _depth) {
                if (object instanceof $root.DownstreamMessage.SystemMessage.DisconnectedMessage)
                    return object;
                if (!$util.isObject(object))
                    throw $TypeError(".DownstreamMessage.SystemMessage.DisconnectedMessage: object expected");
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let message = new $root.DownstreamMessage.SystemMessage.DisconnectedMessage();
                if (object.reason != null)
                    if (typeof object.reason !== "string" || object.reason.length)
                        message.reason = $String(object.reason);
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
            DisconnectedMessage.toObject = function (message, options, _depth) {
                if (!options)
                    options = {};
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let object = {};
                if (options.defaults)
                    object.reason = "";
                if (message.reason != null && $Object.hasOwnProperty.call(message, "reason"))
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
            DisconnectedMessage.prototype.toJSON = function() {
                return DisconnectedMessage.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the type url for DisconnectedMessage
             * @function getTypeUrl
             * @memberof DownstreamMessage.SystemMessage.DisconnectedMessage
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            DisconnectedMessage.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/DownstreamMessage.SystemMessage.DisconnectedMessage";
            };

            return DisconnectedMessage;
        })();

        return SystemMessage;
    })();

    return DownstreamMessage;
})();

export const MessageData = $root.MessageData = (() => {

    /**
     * Properties of a MessageData.
     * @typedef {Object} MessageData.$Properties
     * @property {string|null} [textData] MessageData textData
     * @property {Uint8Array|null} [binaryData] MessageData binaryData
     * @property {google.protobuf.Any.$Properties|null} [protobufData] MessageData protobufData
     * @property {string|null} [jsonData] MessageData jsonData
     * @property {"textData"|"binaryData"|"protobufData"|"jsonData"} [data] MessageData data
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */

    /**
     * Properties of a MessageData.
     * @exports IMessageData
     * @interface IMessageData
     * @augments MessageData.$Properties
     * @deprecated Use MessageData.$Properties instead.
     */

    /**
     * Narrowed shape of a MessageData.
     * @typedef {{
     *   textData?: string|null;
     *   binaryData?: Uint8Array|null;
     *   protobufData?: google.protobuf.Any.$Shape|null;
     *   jsonData?: string|null;
     *   $unknowns?: Array.<Uint8Array>;
     * } & (
     *   ({ data?: undefined; textData?: null; binaryData?: null; protobufData?: null; jsonData?: null }|{ data?: "textData"; textData: string; binaryData?: null; protobufData?: null; jsonData?: null }|{ data?: "binaryData"; textData?: null; binaryData: Uint8Array; protobufData?: null; jsonData?: null }|{ data?: "protobufData"; textData?: null; binaryData?: null; protobufData: google.protobuf.Any.$Shape; jsonData?: null }|{ data?: "jsonData"; textData?: null; binaryData?: null; protobufData?: null; jsonData: string })
     * )} MessageData.$Shape
     */

    /**
     * Constructs a new MessageData.
     * @exports MessageData
     * @classdesc Represents a MessageData.
     * @constructor
     * @param {MessageData.$Properties=} [properties] Properties to set
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
     */
    const MessageData = function (properties) {
        if (properties)
            for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    };

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
     * @member {google.protobuf.Any.$Properties|null|undefined} protobufData
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
    $Object.defineProperty(MessageData.prototype, "data", {
        get: $util.oneOfGetter($oneOfFields = ["textData", "binaryData", "protobufData", "jsonData"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new MessageData instance using the specified properties.
     * @function create
     * @memberof MessageData
     * @static
     * @param {MessageData.$Properties=} [properties] Properties to set
     * @returns {MessageData} MessageData instance
     * @type {{
     *   (properties: MessageData.$Shape): MessageData & MessageData.$Shape;
     *   (properties?: MessageData.$Properties): MessageData;
     * }}
     */
    MessageData.create = function(properties) {
        return new MessageData(properties);
    };

    /**
     * Encodes the specified MessageData message. Does not implicitly {@link MessageData.verify|verify} messages.
     * @function encode
     * @memberof MessageData
     * @static
     * @param {MessageData.$Properties} message MessageData message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MessageData.encode = function (message, writer, _depth) {
        if (!writer)
            writer = $Writer.create();
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        if (message.textData != null && $Object.hasOwnProperty.call(message, "textData"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.textData);
        if (message.binaryData != null && $Object.hasOwnProperty.call(message, "binaryData"))
            writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.binaryData);
        if (message.protobufData != null && $Object.hasOwnProperty.call(message, "protobufData"))
            $root.google.protobuf.Any.encode(message.protobufData, writer.uint32(/* id 3, wireType 2 =*/26).fork(), _depth + 1).ldelim();
        if (message.jsonData != null && $Object.hasOwnProperty.call(message, "jsonData"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.jsonData);
        if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
            for (let i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
        return writer;
    };

    /**
     * Encodes the specified MessageData message, length delimited. Does not implicitly {@link MessageData.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MessageData
     * @static
     * @param {MessageData.$Properties} message MessageData message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MessageData.encodeDelimited = function(message, writer) {
        return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
    };

    /**
     * Decodes a MessageData message from the specified reader or buffer.
     * @function decode
     * @memberof MessageData
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MessageData & MessageData.$Shape} MessageData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MessageData.decode = function (reader, length, _end, _depth, _target) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $Reader.recursionLimit)
            throw $Error("max depth exceeded");
        let end, message;
        if (length === $undefined)
            end = reader.len;
        else {
            end = reader.pos + length;
            if (end > reader.len)
                throw $RangeError("index out of range");
            length = reader.len;
            reader.len = end;
        }
        message = _target || new $root.MessageData();
        while (reader.pos < end) {
            let start = reader.pos;
            let tag = reader.tag();
            if (tag === _end) {
                _end = $undefined;
                break;
            }
            let wireType = tag & 7;
            switch (tag >>>= 3) {
            case 1: {
                    if (wireType !== 2)
                        break;
                    message.textData = reader.stringVerify();
                    message.data = "textData";
                    continue;
                }
            case 2: {
                    if (wireType !== 2)
                        break;
                    message.binaryData = reader.bytes();
                    message.data = "binaryData";
                    continue;
                }
            case 3: {
                    if (wireType !== 2)
                        break;
                    message.protobufData = $root.google.protobuf.Any.decode(reader, reader.uint32(), $undefined, _depth + 1, message.protobufData);
                    message.data = "protobufData";
                    continue;
                }
            case 4: {
                    if (wireType !== 2)
                        break;
                    message.jsonData = reader.stringVerify();
                    message.data = "jsonData";
                    continue;
                }
            }
            reader.skipType(wireType, _depth, tag);
            if (!reader.discardUnknown) {
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
            }
        }
        if (length !== $undefined) {
            if (reader.pos !== end)
                throw $RangeError("index out of range");
            reader.len = length;
        }
        if (_end !== $undefined)
            throw $Error("missing end group");
        return message;
    };

    /**
     * Decodes a MessageData message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MessageData
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MessageData & MessageData.$Shape} MessageData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MessageData.decodeDelimited = function(reader) {
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
    MessageData.verify = function (message, _depth) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            return "max depth exceeded";
        let properties = {};
        if (message.textData != null && $Object.hasOwnProperty.call(message, "textData")) {
            properties.data = 1;
            if (!$util.isString(message.textData))
                return "textData: string expected";
        }
        if (message.binaryData != null && $Object.hasOwnProperty.call(message, "binaryData")) {
            if (properties.data === 1)
                return "data: multiple values";
            properties.data = 1;
            if (!(message.binaryData && typeof message.binaryData.length === "number" || $util.isString(message.binaryData)))
                return "binaryData: buffer expected";
        }
        if (message.protobufData != null && $Object.hasOwnProperty.call(message, "protobufData")) {
            if (properties.data === 1)
                return "data: multiple values";
            properties.data = 1;
            {
                let error = $root.google.protobuf.Any.verify(message.protobufData, _depth + 1);
                if (error)
                    return "protobufData." + error;
            }
        }
        if (message.jsonData != null && $Object.hasOwnProperty.call(message, "jsonData")) {
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
    MessageData.fromObject = function (object, _depth) {
        if (object instanceof $root.MessageData)
            return object;
        if (!$util.isObject(object))
            throw $TypeError(".MessageData: object expected");
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let message = new $root.MessageData();
        if (object.textData != null)
            message.textData = $String(object.textData);
        if (object.binaryData != null)
            if (typeof object.binaryData === "string")
                $util.base64.decode(object.binaryData, message.binaryData = $util.newBuffer($util.base64.length(object.binaryData)), 0);
            else if (object.binaryData.length >= 0)
                message.binaryData = object.binaryData;
        if (object.protobufData != null) {
            if (!$util.isObject(object.protobufData))
                throw $TypeError(".MessageData.protobufData: object expected");
            message.protobufData = $root.google.protobuf.Any.fromObject(object.protobufData, _depth + 1);
        }
        if (object.jsonData != null)
            message.jsonData = $String(object.jsonData);
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
    MessageData.toObject = function (message, options, _depth) {
        if (!options)
            options = {};
        if (_depth === $undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw $Error("max depth exceeded");
        let object = {};
        if (message.textData != null && $Object.hasOwnProperty.call(message, "textData")) {
            object.textData = message.textData;
            if (options.oneofs)
                object.data = "textData";
        }
        if (message.binaryData != null && $Object.hasOwnProperty.call(message, "binaryData")) {
            object.binaryData = options.bytes === $String ? $util.base64.encode(message.binaryData, 0, message.binaryData.length) : options.bytes === $Array ? $Array.prototype.slice.call(message.binaryData) : message.binaryData;
            if (options.oneofs)
                object.data = "binaryData";
        }
        if (message.protobufData != null && $Object.hasOwnProperty.call(message, "protobufData")) {
            object.protobufData = $root.google.protobuf.Any.toObject(message.protobufData, options, _depth + 1);
            if (options.oneofs)
                object.data = "protobufData";
        }
        if (message.jsonData != null && $Object.hasOwnProperty.call(message, "jsonData")) {
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
    MessageData.prototype.toJSON = function() {
        return MessageData.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the type url for MessageData
     * @function getTypeUrl
     * @memberof MessageData
     * @static
     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns {string} The type url
     */
    MessageData.getTypeUrl = function(prefix) {
        if (prefix === $undefined)
            prefix = "type.googleapis.com";
        return prefix + "/MessageData";
    };

    return MessageData;
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
             * @typedef {Object} google.protobuf.Any.$Properties
             * @property {string|null} [type_url] Any type_url
             * @property {Uint8Array|null} [value] Any value
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */

            /**
             * Properties of an Any.
             * @memberof google.protobuf
             * @interface IAny
             * @augments google.protobuf.Any.$Properties
             * @deprecated Use google.protobuf.Any.$Properties instead.
             */

            /**
             * Shape of an Any.
             * @typedef {google.protobuf.Any.$Properties} google.protobuf.Any.$Shape
             */

            /**
             * Constructs a new Any.
             * @memberof google.protobuf
             * @classdesc Represents an Any.
             * @constructor
             * @param {google.protobuf.Any.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */
            const Any = function (properties) {
                if (properties)
                    for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            };

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
             * @param {google.protobuf.Any.$Properties=} [properties] Properties to set
             * @returns {google.protobuf.Any} Any instance
             * @type {{
             *   (properties: google.protobuf.Any.$Shape): google.protobuf.Any & google.protobuf.Any.$Shape;
             *   (properties?: google.protobuf.Any.$Properties): google.protobuf.Any;
             * }}
             */
            Any.create = function(properties) {
                return new Any(properties);
            };

            /**
             * Encodes the specified Any message. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.Any.$Properties} message Any message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Any.encode = function (message, writer, _depth) {
                if (!writer)
                    writer = $Writer.create();
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (message.type_url != null && $Object.hasOwnProperty.call(message, "type_url") && message.type_url !== "")
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.type_url);
                if (message.value != null && $Object.hasOwnProperty.call(message, "value") && message.value.length)
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.value);
                if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                    for (let i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };

            /**
             * Encodes the specified Any message, length delimited. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.Any.$Properties} message Any message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Any.encodeDelimited = function(message, writer) {
                return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
            };

            /**
             * Decodes an Any message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Any
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Any & google.protobuf.Any.$Shape} Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Any.decode = function (reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw $Error("max depth exceeded");
                let end, message, value;
                if (length === $undefined)
                    end = reader.len;
                else {
                    end = reader.pos + length;
                    if (end > reader.len)
                        throw $RangeError("index out of range");
                    length = reader.len;
                    reader.len = end;
                }
                message = _target || new $root.google.protobuf.Any();
                while (reader.pos < end) {
                    let start = reader.pos;
                    let tag = reader.tag();
                    if (tag === _end) {
                        _end = $undefined;
                        break;
                    }
                    let wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.stringVerify()).length)
                                message.type_url = value;
                            else
                                delete message.type_url;
                            continue;
                        }
                    case 2: {
                            if (wireType !== 2)
                                break;
                            if ((value = reader.bytes()).length)
                                message.value = value;
                            else
                                delete message.value;
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    if (!reader.discardUnknown) {
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                }
                if (length !== $undefined) {
                    if (reader.pos !== end)
                        throw $RangeError("index out of range");
                    reader.len = length;
                }
                if (_end !== $undefined)
                    throw $Error("missing end group");
                return message;
            };

            /**
             * Decodes an Any message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Any
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Any & google.protobuf.Any.$Shape} Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Any.decodeDelimited = function(reader) {
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
            Any.verify = function (message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (message.type_url != null && $Object.hasOwnProperty.call(message, "type_url"))
                    if (!$util.isString(message.type_url))
                        return "type_url: string expected";
                if (message.value != null && $Object.hasOwnProperty.call(message, "value"))
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
            Any.fromObject = function (object, _depth) {
                if (object instanceof $root.google.protobuf.Any)
                    return object;
                if (!$util.isObject(object))
                    throw $TypeError(".google.protobuf.Any: object expected");
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let message = new $root.google.protobuf.Any();
                if (object.type_url != null)
                    if (typeof object.type_url !== "string" || object.type_url.length)
                        message.type_url = $String(object.type_url);
                if (object.value != null)
                    if (object.value.length)
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
            Any.toObject = function (message, options, _depth) {
                if (!options)
                    options = {};
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.type_url = "";
                    if (options.bytes === $String)
                        object.value = "";
                    else {
                        object.value = [];
                        if (options.bytes !== $Array)
                            object.value = $util.newBuffer(object.value);
                    }
                }
                if (message.type_url != null && $Object.hasOwnProperty.call(message, "type_url"))
                    object.type_url = message.type_url;
                if (message.value != null && $Object.hasOwnProperty.call(message, "value"))
                    object.value = options.bytes === $String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === $Array ? $Array.prototype.slice.call(message.value) : message.value;
                return object;
            };

            /**
             * Converts this Any to JSON.
             * @function toJSON
             * @memberof google.protobuf.Any
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Any.prototype.toJSON = function() {
                return Any.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the type url for Any
             * @function getTypeUrl
             * @memberof google.protobuf.Any
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            Any.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/google.protobuf.Any";
            };

            return Any;
        })();

        return protobuf;
    })();

    return google;
})();

export {
  $root as default
};
