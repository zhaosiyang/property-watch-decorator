# Property Watch Decorator

#### This package provides a `@OnChange` decorator that can be easily used to listen to changes of class properties.

##### I have a [talk at ng-conf 2019](https://www.youtube.com/watch?v=rVDMmlCRvkg&list=PLOETEcp3DkCpimylVKTDe968yNmNIajlR&index=22) about why this package is useful and how I implement this package.

### Install
```npm install property-watch-decorator```

### Example 1
```typescript
class PersonComponent {
    // Parameter value is inferred as any
    // Parameter change is optional, and inferred as SimpleChange<any>
    @OnChange(function(value, change) {
        console.log(`name is changed from ${change.previousValue} to ${value}`);
    })  
    name: string;
}
```

### Example 2, use generics, better typing
```typescript
class PersonComponent {
    // Parameter value is inferred as string
    // Parameter change is optional, and inferred as SimpleChange<string>
    @OnChange<string>(function(value, change) {
        console.log(`name is changed from ${change.previousValue} to ${value}`);
    })  
    name: string;
}
```

### Example 3, type `this` if you want to access other member of the class (just for better IDE integration)
```typescript
class PersonComponent {
 
    @OnChange<string>(function(this: PersonComponent, value, change) {
        console.log(`name is changed from ${change.previousValue} to ${value}`);
        console.log(`At the moment, age is ${this.age}`)
    })  
    name: string;
    
    age: number;
}
```

### Example 4, using class method reference for onChange
```typescript
class PersonComponent {
 
    @OnChange<string>('onNameChange')  
    name: string;
    
    age: number;

    onNameChange(value, change) {
      console.log(`name is changed from ${change.previousValue} to ${value}`);
      console.log(`At the moment, age is ${this.age}`);
    }
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
#### Correct way
Change arrow function to es5 function:
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
#### Correct way
```typescript
class MyComponent {
  @OnChange(someFunction)
  property1;
}
function someFunction(value) {
    console.log(`property1 is changed to ${value}`);
}

```
