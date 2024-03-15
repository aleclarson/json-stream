import { JSONParser, JSONParserOptions } from "./core";
import { JsonStruct } from "./types";

export class ObjectParserTransformer<T extends JsonStruct>
  extends JSONParser
  implements Transformer<Iterable<number> | string, T>
{
  // @ts-ignore Controller always defined during start
  private controller: TransformStreamDefaultController<T>;

  constructor(opts?: JSONParserOptions) {
    super({ paths: ["$"], separator: "\n", ...opts });
    this.onValue = (value) => this.controller.enqueue(value.value as T);
    this.onError = (err) => this.controller.error(err);
    this.onEnd = () => this.controller.terminate();
  }

  start(controller: TransformStreamDefaultController<T>) {
    this.controller = controller;
  }

  transform(chunk: Iterable<number> | string) {
    this.write(chunk);
  }

  flush() {
    this.end();
  }
}

export default class ObjectParserTransformStream<
  T extends JsonStruct,
> extends TransformStream<Iterable<number> | string, T> {
  constructor(
    opts?: JSONParserOptions,
    writableStrategy?: QueuingStrategy,
    readableStrategy?: QueuingStrategy
  ) {
    const transformer = new ObjectParserTransformer(opts);
    super(transformer, writableStrategy, readableStrategy);
  }
}
