# Property Watch Decorator

### Install
```npm install property-watch-decorator --save```

### Example 1 (General)
```typescript
class PersonComponent {
    // optional "change" parameter
    @OnChange(function(value, change: SimpleChange) {
        console.log(`name is changed from ${change.previousValue} to ${value}`);
    })  
    name: string;
}
```

### Example 2 (Angular)

```typescript
@Component({
    ...
})
export class MyComponent {
    @OnChange(function(value) {
        console.log('property1 is changed to', value);
    })
    property1: any;
    
    @OnChange(function(value, change) {
        console.log('property2 is changed to', value)
    })
    @Input()  // can be combined with @Input()
    property2: any;
}
```

### Important notes: 
#### PITFALL 1
Arrow function should be avoided as this would make the function lose context. In this case, `this` would NOT refer to class instance but `undefined`
For example: it is WRONG to use this way
```typescript
class MyComponent {
  @OnChange(value => {
      console.log(`property1 is changed to ${value}`);
      console.log(this.property1)  // "this" would refer to undefined, cannot access "property1" of undefined
  })
  property1: any;
}
```
To correct this, you just need to change arrow function to es5 function:
```typescript
class MyComponent {
  @OnChange(function(value) {
      console.log(`property1 is changed to ${value}`);
      console.log(this.property1)   // "this" would refer to component instance
  })
  property1: any;
}
```

#### PITFALL 2
Callback function CANNOT be referred to class method, this would also cause `this` to be `undefined` 
For example:
```typescript
class MyComponent {
  @OnChange(this.someFunction) // "this" would refer to undefined, cannot access "someFunction" of undefined
  property1: any;
  
  someFunction(value) {
    console.log(`property1 is changed to ${value}`);
    console.log(this.property1)   
  }
}

```
Correct way
```typescript
class MyComponent {
  @OnChange(someFunction)
  property1: any;
}
function someFunction(value) {
    console.log(`property1 is changed to ${value}`);
    console.log(this.property1)   
}

```
