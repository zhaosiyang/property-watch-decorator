export function OnChange<T>(observer: (value: T) => void) {
    let _cachedValue: T;
    return (target: any, key: PropertyKey) => {
        Object.defineProperty(target, key, {
            set: function (value) {
                _cachedValue = value;
                observer.call(this, _cachedValue);
            },
            get: function () {
                return _cachedValue;
            },
        });
    };
}