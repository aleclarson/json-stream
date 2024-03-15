import type {
  JsonArray,
  JsonKey,
  JsonObject,
  JsonPrimitive,
  JsonStruct,
} from "./jsonTypes";
import type { StackElement } from "./stackElement";

export interface ParsedElementInfo {
  value?: JsonPrimitive | JsonStruct;
  parent?: JsonStruct;
  key?: JsonKey;
  stack: StackElement[];
  partial?: boolean;
}

export interface ParsedArrayElement extends ParsedElementInfo {
  value: JsonPrimitive | JsonStruct;
  parent: JsonArray;
  key: number;
  stack: StackElement[];
}

export interface ParsedObjectProperty extends ParsedElementInfo {
  value: JsonPrimitive | JsonStruct;
  parent: JsonObject;
  key: string;
  stack: StackElement[];
}

export interface ParsedTopLevelElement extends ParsedElementInfo {
  value: JsonPrimitive | JsonStruct;
  parent: undefined;
  key: undefined;
  stack: [];
}
