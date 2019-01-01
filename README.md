# Property Watch Decorator

### install
```npm install property-watch-decorator --save```

### Example 1 (General)
```typescript
class PersonComponent {
  @OnChange(value => console.log('name is changed to: ', value))  
  name: string;
}
```

### Example 2 (Angular)

```typescript
@Component({
    ...
})
export class MyComponent {
    @OnChange(value => console.log('property1 is changed to', value))
    property1: any;
    
    @OnChange(value => console.log('property2 is changed to', value))
    @Input() 
    property2: any;
}
```
