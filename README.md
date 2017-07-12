# What even is this?
ko.components.generate adds a method to the ko.components namspace called generate. This method simply registers components  with a few helpful modifications.


## Params
you can pass a parameter schema into `generate()`. It will allow for makeing parameters required, and allow for default parameters. Params are also now mapped to `this`

```javascript
ko.components.generate('example-component', {
  params: {
    foo: {
      default: "this is the default for foo"
    }
  },
  viewModel: function(){
    this.foo() // <- foo is now mapped to this
  },
  template: '<div data-bind="text: foo"></div>'
});
```
