(function(){
  'use strict';

  angular
    .module('FreespiritCommissions')
    .controller('OrderForm',OrderForm);

  OrderForm.$inject = ["$scope"];

  function OrderForm()
  {
    var vm = this;

    //INITIAL VARIABLE
    //==========================================================================

    ///TIER ITEMS
    vm.tiers = {
      title: "Tier Selection",
      sketch: {
        title: "Sketch Tier",
        price: 15,
        selected: false,
        code: "Sk"
      },
      ink: {
        title: "Ink Tier",
        price: 25,
        selected: false,
        code: "In"
      },
      badge: {
        title: "Con Badge",
        price: 35,
        selected: false,
        code: "Bg"
      }
    };

    ///COLOR CHOICES
    vm.colorOptions = {
      title: "Color Options",
      sketch: {
        title: "Flat Colors",
        price: 2,
        selected: false,
        code: "F1",
        options: [
          {
            title: "Cel Shading",
            description: "Cel Shading is a form of solid-color shading that adds more depth to an image.",
            price: 3,
            index: 0,
            selected: false,
            code: "Ce"
          }
        ]
      },
      ink: {
        title: "Flat Colors",
        price: 3,
        selected: false,
        code: "F2",
        options: [
          {
            title: "Basic Cel Shading",
            description: "Cel Shading is a form of solid-color shading that adds more depth to an image.",
            price: 4,
            index: 0,
            selected: false,
            code: "bCe"
          },
          {
            title: "Advanced Cel Shading",
            description: "Smoother cel shading with more details.",
            price: 8,
            index: 1,
            selected: false,
            code: "aCe"
          }
        ]
      }
    }

    ///CHARACTER CHOICES
    vm.characterChoices = {
      title: "Extra Characters",
      options: [
        {
          title: "+ 1 Character",
          modifier: 60,
          selected: false,
          index: 0,
          code: "~1"
        },
        {
          title: "+ 2 Characters",
          modifier: 130,
          selected: false,
          index: 1,
          code: "~2"
        }
      ]
    }

    ///NSFW CHOICES
    vm.nsfwChoices = {
      title: "NSFW Options",
      price: 5,
      selected: false,
      code:"!!",
      options: [
        {
          title: "Closeup / Internal",
          description: "An additional closeup or internal shot in the image typically in the margins or in a speech-bubble-like container.",
          price: 5,
          selected: false,
          index: 0,
          code: "&Z"
        },
        {
          title: "Additional Minor Edit",
          description: "Example: A version with/without cum, speech bubbles.",
          price: 3,
          selected: false,
          index: 1,
          code: "&ME"        }
      ]
    }


    vm.total = 0.00;
    vm.code = "";
    vm.checkingCode = "";
    vm.cartOrder = [];
    vm.cartModifier = [];
    vm.getTotal = getTotal;
    vm.resetColorOptions = resetColorOptions;
    vm.clearSketch = clearSketch;
    vm.clearInk = clearInk;
    vm.optionChange = optionChange;
    vm.setCode = setCode;


    //FUNCTIONS
    //==========================================================================
    function getTotal(){
      vm.total = 0.00;
      vm.code = "";
      vm.cartOrder = [];
      vm.cartModifier = [];

      //Get the tier
      if(vm.tiers.badge.selected){
        vm.total += vm.tiers.badge.price;
        vm.code += vm.tiers.badge.code;
        vm.cartOrder.push({title: vm.tiers.badge.title, price: vm.tiers.badge.price});
      }
      else if(vm.tiers.sketch.selected){
        vm.total += vm.tiers.sketch.price;
        vm.code += vm.tiers.sketch.code;
        vm.cartOrder.push({title: vm.tiers.sketch.title, price: vm.tiers.sketch.price});
        if(vm.colorOptions.sketch.selected){
          vm.total += vm.colorOptions.sketch.price;
          vm.code += vm.colorOptions.sketch.code;
          vm.cartOrder.push({title: vm.colorOptions.sketch.title, price: vm.colorOptions.sketch.price});
          vm.colorOptions.sketch.options.forEach(function(element){
            if(element.selected){
              vm.total += element.price;
              vm.code += element.code;
              vm.cartOrder.push({title: element.title, price: element.price});
            }
          });
        }
        if(vm.nsfwChoices.selected){
          vm.total += vm.nsfwChoices.price;
          vm.code += vm.nsfwChoices.code;
          vm.cartOrder.push({title: vm.nsfwChoices.title, price: vm.nsfwChoices.price});
          vm.nsfwChoices.options.forEach(function(element){
            if(element.selected){
              vm.total += element.price;
              vm.code += element.code;
              vm.cartOrder.push({title: element.title, price: element.price});
            }
          });
        }
      }
      else if(vm.tiers.ink.selected){
        vm.total += vm.tiers.ink.price;
        vm.code += vm.tiers.ink.code;
        vm.cartOrder.push({title: vm.tiers.ink.title, price: vm.tiers.ink.price});
        if(vm.colorOptions.ink.selected){
          vm.total += vm.colorOptions.ink.price;
          vm.code += vm.colorOptions.ink.code;
          vm.cartOrder.push({title: vm.colorOptions.ink.title, price: vm.colorOptions.ink.price});
          vm.colorOptions.ink.options.forEach(function(element){
            if(element.selected){
              vm.total += element.price;
              vm.code += element.code;
              vm.cartOrder.push({title: element.title, price: element.price});
            }
          });
        }
        if(vm.nsfwChoices.selected){
          vm.total += vm.nsfwChoices.price;
          vm.code += vm.nsfwChoices.code;
          vm.cartOrder.push({title: vm.nsfwChoices.title, price: vm.nsfwChoices.price});
          vm.nsfwChoices.options.forEach(function(element){
            if(element.selected){
              vm.total += element.price;
              vm.code += element.code;
              vm.cartOrder.push({title: element.title, price: element.price});
            }
          });
        }
      }
      else{
        vm.total = 0.00;
        return resetItems();
      }
      for (var i = 0; i < vm.characterChoices.options.length; i++){
        if(vm.characterChoices.options[i].selected){
            vm.total += (vm.total * (vm.characterChoices.options[i].modifier)/100);
            vm.code += vm.characterChoices.options[i].code;
            vm.cartModifier.push({title: vm.characterChoices.options[i].title, modifier: vm.characterChoices.options[i].modifier});
        }
      }
    }

    function setCode(){
      //Set tiers
      if(vm.checkingCode.indexOf(vm.tiers.sketch.code) > -1){
        vm.tiers.sketch.selected = true;
        if(vm.checkingCode.indexOf(vm.colorOptions.sketch.code) > -1){
          vm.colorOptions.sketch.selected = true;
          vm.colorOptions.sketch.options.forEach(function(element){
            if(vm.checkingCode.indexOf(element.code) > -1){
              element.selected = true;
            }
          });
        }
      }
      if(vm.checkingCode.indexOf(vm.tiers.ink.code) > -1){
        vm.tiers.ink.selected = true;
        if(vm.checkingCode.indexOf(vm.colorOptions.ink.code) > -1){
          vm.colorOptions.ink.selected = true;
          vm.colorOptions.ink.options.forEach(function(element){
            if(vm.checkingCode.indexOf(element.code) > -1){
              element.selected = true;
            }
          });
        }
      }
      if(vm.checkingCode.indexOf(vm.nsfwChoices.code) > -1){
        vm.nsfwChoices.selected = true;
        vm.nsfwChoices.options.forEach(function(element){
          if(vm.checkingCode.indexOf(element.code) > -1){
            element.selected = true;
          }
        });
      }
      vm.characterChoices.options.forEach(function(element){
        if(vm.checkingCode.indexOf(element.code) > -1){
          element.selected = true;
        }
      });
      getTotal();
    }

    function resetItems(){
      console.log("Reset the items.");
      vm.colorOptions.sketch.selected = false;
      vm.colorOptions.ink.selected = false;
      resetColorOptions();
      optionChange(vm.characterChoices.options,-1);
      vm.nsfwChoices.selected = false;
      optionChange(vm.nsfwChoices.options, -1);
    }

    function clearInk(){
      vm.colorOptions.ink.selected = false;
      resetColorOptions();
      optionChange(vm.characterChoices.options,-1);
      vm.nsfwChoices.selected = false;
      optionChange(vm.nsfwChoices.options, -1);
    }

    function clearSketch(){
      vm.colorOptions.sketch.selected = false;
      resetColorOptions();
      optionChange(vm.characterChoices.options,-1);
      vm.nsfwChoices.selected = false;
      optionChange(vm.nsfwChoices.options, -1);
    }

    function optionChange(array, index){
        for(var i = 0; i < array.length; i++){
          if(i != index){
            array[i].selected = false;
          }
        }
    }

    function resetColorOptions(){
      vm.colorOptions.sketch.options.forEach(function(element){
        element.selected = false;
      });
      vm.colorOptions.ink.options.forEach(function(element){
        element.selected = false;
      });
    }

  }



}());
