import type { JsonKey, JsonStruct } from "./jsonTypes";

export const enum TokenParserMode {
  OBJECT,
  ARRAY,
}

export interface StackElement {
  key: JsonKey;
  value: JsonStruct;
  mode?: TokenParserMode;
  emit: boolean;
}
