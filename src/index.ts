export function OnChange<T>(observer: (value: T) => void) {
    let cachedValue: T;
    return (target: any, key: PropertyKey) => {
        Object.defineProperty(target, key, {
            set: value => {
                cachedValue = value;
                observer(cachedValue);
            },
            get: () => cachedValue,
        });
    };
}
