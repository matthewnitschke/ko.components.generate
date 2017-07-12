(function(){

  function paramSchema(paramSchema, callback){
    return function(params){
      var componentContext = this;

      if(Array.isArray(paramSchema)){
        paramSchema.forEach(function(scheme){
          if(Object.keys(params).indexOf(scheme) > -1){
            componentContext[scheme] = params[scheme];
          } else {
            throw new Error("Missing parameter '" + scheme + "' in component");
          }
        })
      } else {
        Object.keys(paramSchema).forEach(function(key) {
          if (Object.keys(params).indexOf(key) > -1){
            componentContext[key] = params[key];
          } else {
            if(paramSchema[key] && paramSchema[key].default){
              componentContext[key] = ko.observable(paramSchema[key].default);
            } else {
              throw new Error("Missing parameter '" + key + "' or parameter default in component")
            }

          }
        });
      }
      return callback.call(componentContext);
    }
  }

  ko.components.generate = function(name, config){
    var vm;

    if (config.params){
      vm = paramSchema(config.params, config.viewModel);
    } else {
      vm = config.viewModel;
    }

    ko.components.register(name, {
      viewModel: vm,
      template: config.template
    })
  }

})()
