export declare class Serializer {
    modelMappers?: {
        [key: string]: any;
    };
    constructor(mappers?: {
        [key: string]: any;
    });
    validateConstraints(mapper: Mapper, value: any, objectName: string): void;
    private trimEnd(str, ch);
    private bufferToBase64Url(buffer);
    private base64UrlToBuffer(str);
    private splitSerializeName(prop);
    private dateToUnixTime(d);
    private unixTimeToDate(n);
    private serializeBasicTypes(typeName, objectName, value);
    private serializeEnumType(objectName, allowedValues, value);
    private serializeBufferType(objectName, value);
    private serializeBase64UrlType(objectName, value);
    private serializeDateTypes(typeName, value, objectName);
    private serializeSequenceType(mapper, object, objectName);
    private serializeDictionaryType(mapper, object, objectName);
    private serializeCompositeType(mapper, object, objectName);
    /**
     * Serialize the given object based on its metadata defined in the mapper
     *
     * @param {Mapper} mapper The mapper which defines the metadata of the serializable object
     *
     * @param {object|string|Array|number|boolean|Date|stream} object A valid Javascript object to be serialized
     *
     * @param {string} objectName Name of the serialized object
     *
     * @returns {object|string|Array|number|boolean|Date|stream} A valid serialized Javascript object
     */
    serialize(mapper: Mapper, object: any, objectName: string): any;
    private deserializeCompositeType(mapper, responseBody, objectName);
    private deserializeDictionaryType(mapper, responseBody, objectName);
    private deserializeSequenceType(mapper, responseBody, objectName);
    /**
     * Deserialize the given object based on its metadata defined in the mapper
     *
     * @param {object} mapper The mapper which defines the metadata of the serializable object
     *
     * @param {object|string|Array|number|boolean|Date|stream} responseBody A valid Javascript entity to be deserialized
     *
     * @param {string} objectName Name of the deserialized object
     *
     * @returns {object|string|Array|number|boolean|Date|stream} A valid deserialized Javascript object
     */
    deserialize(mapper: Mapper, responseBody: any, objectName: string): any;
    private getPolymorphicMapper(mapper, object, objectName, mode);
    private getPolymorphicMapperObjectVersion(mapper, object, objectName, mode);
    private getPolymorphicMapperStringVersion(mapper, object, objectName);
}
export interface MapperConstraints {
    InclusiveMaximum?: number;
    ExclusiveMaximum?: number;
    InclusiveMinimum?: number;
    ExclusiveMinimum?: number;
    MaxLength?: number;
    MinLength?: number;
    Pattern?: string;
    MaxItems?: number;
    MinItems?: number;
    UniqueItems?: true;
    MultipleOf?: number;
}
export interface BaseMapperType {
    name: string;
    [key: string]: any;
}
export interface Mapper {
    readOnly?: boolean;
    isConstant?: boolean;
    required: boolean;
    serializedName: string;
    type: BaseMapperType;
    defaultValue?: any;
    constraints?: MapperConstraints;
}
export interface PolymorphicDiscriminator {
    serializedName: string;
    clientName: string;
    [key: string]: string;
}
export interface CompositeMapper extends Mapper {
    type: {
        name: "Composite";
        className: string;
        modelProperties?: {
            [propertyName: string]: Mapper;
        };
        uberParent?: string;
        polymorphicDiscriminator?: string | PolymorphicDiscriminator;
    };
}
export interface SequenceMapper extends Mapper {
    type: {
        name: "Sequence";
        element: Mapper;
    };
}
export interface DictionaryMapper extends Mapper {
    type: {
        name: "Dictionary";
        value: Mapper;
    };
}
export interface EnumMapper extends Mapper {
    type: {
        name: "Enum";
        allowedValues: Array<any>;
    };
}
export interface UrlParameterValue {
    value: string;
    skipUrlEncoding: boolean;
}
export declare function serializeObject(toSerialize: any): any;
export declare const MapperType: {
    Base64Url: "Base64Url";
    Boolean: "Boolean";
    ByteArray: "ByteArray";
    Composite: "Composite";
    Date: "Date";
    DateTime: "DateTime";
    DateTimeRfc1123: "DateTimeRfc1123";
    Dictionary: "Dictionary";
    Enum: "Enum";
    Number: "Number";
    Object: "Object";
    Sequence: "Sequence";
    String: "String";
    Stream: "Stream";
    TimeSpan: "TimeSpan";
    UnixTime: "UnixTime";
};
