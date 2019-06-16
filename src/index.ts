export interface SimpleChange<T> {
  firstChange: boolean;
  previousValue: T;
  currentValue: T;
  isFirstChange: () => boolean;
}

export function OnChange<T = any>(callback: ((value: T, simpleChange?: SimpleChange<T>) => void) | string) {
  const cachedValueKey = Symbol();
  const isFirstChangeKey = Symbol();

  const isFunction = (fn) => fn.constructor === Function;

  const isValidFunction = (fn: Function, fnName: string): Function => {
    if (!fn) {
      throw new Error(`${fnName} is not a valid function`);
    }
    return fn;
  };

  return (target: any, key: PropertyKey) => {
      
    const callBackFn = (
      isFunction(callback) ?
        callback :
        isValidFunction(target[callback as string], callback as string)
    ) as Function;

    Object.defineProperty(target, key, {
      set: function (value) {
        // change status of "isFirstChange"
        this[isFirstChangeKey] = this[isFirstChangeKey] === undefined;
        // No operation if new value is same as old value

        if (!this[isFirstChangeKey] && this[cachedValueKey] === value) {
          return;
        }

        const oldValue = this[cachedValueKey];
        this[cachedValueKey] = value;
        const simpleChange: SimpleChange<T> = {
          firstChange: this[isFirstChangeKey],
          previousValue: oldValue,
          currentValue: this[cachedValueKey],
          isFirstChange: () => this[isFirstChangeKey],
        };
        callBackFn.call(this, this[cachedValueKey], simpleChange);
      },
      get: function () {
        return this[cachedValueKey];
      },
    });
  };
}
