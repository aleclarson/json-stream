import JSONParser from "../../src/jsonparser";
import Tokenizer from "../../src/tokenizer";
import TokenParser from "../../src/tokenparser";
import type { ParsedElementInfo } from "../src/core/utils/types/parsedElementInfo";
import type { ParsedTokenInfo } from "../src/core/utils/types/parsedTokenInfo";

export type TestData = {
  value: string | string[] | Iterable<number>;
  paths?: string[];
  expected: any[];
};

type ParseableData = string | Iterable<number>;
type InputData<T> = T | T[] | (() => Generator<T>);

function iterableData<T>(data: InputData<T>): Iterable<T> {
  if (typeof data === "function") return (data as () => Generator<T>)();
  if (Array.isArray(data)) return data;
  return [data];
}

function dataStream<T>(data: InputData<T>): ReadableStream<T> {
  return new ReadableStream({
    async start(controller) {
      for (const value of iterableData(data)) {
        controller.enqueue(value);
      }
      controller.close();
    },
  });
}

export async function runJSONParserTest(
  jsonparser: JSONParser,
  data: InputData<ParseableData>,
  onValue: (parsedElementInfo: ParsedElementInfo) => void = () => {
    /* Do nothing */
  }
) {
  const input = dataStream(data);
  const reader = input.pipeThrough(jsonparser).getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    onValue(value);
  }
}

export async function runTokenizerTest(
  tokenizer: Tokenizer,
  data: InputData<ParseableData>,
  onToken: (parsedElementInfo: ParsedTokenInfo) => void = () => {
    /* Do nothing */
  }
) {
  const input = dataStream(data);
  const reader = input.pipeThrough(tokenizer).getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    onToken(value);
  }
}

export async function runTokenParserTest(
  tokenParser: TokenParser,
  data: InputData<Omit<ParsedTokenInfo, "offset">>,
  onValue: (parsedElementInfo: ParsedElementInfo) => void = () => {
    /* Do nothing */
  }
) {
  const input = dataStream(data);
  const reader = input.pipeThrough(tokenParser).getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    onValue(value);
  }
}
