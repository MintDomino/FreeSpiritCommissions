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
          title: "+ 1",
          modifier: 70,
          selected: false,
          index: 0,
          code: "~1"
        },
        {
          title: "+ 2",
          modifier: 150,
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
          price: 5,
          selected: false,
          index: 1,
          code: "&ME"        }
      ]
    }


    vm.total = 0.00;
    vm.code = "";
    vm.getTotal = getTotal;
    vm.resetColorOptions = resetColorOptions;
    vm.clearSketch = clearSketch;
    vm.clearInk = clearInk;
    vm.optionChange = optionChange;


    //FUNCTIONS
    //==========================================================================
    function getTotal(){
      vm.total = 0.00;
      vm.code = "";
      //Get the tier
      if(vm.tiers.sketch.selected){
        vm.total += vm.tiers.sketch.price;
        vm.code += vm.tiers.sketch.code;
        if(vm.colorOptions.sketch.selected){
          vm.total += vm.colorOptions.sketch.price;
          vm.code += vm.colorOptions.sketch.code;
          vm.colorOptions.sketch.options.forEach(function(element){
            if(element.selected){
              vm.total += element.price;
              vm.code += element.code;
            }
          });
        }
        if(vm.nsfwChoices.selected){
          vm.total += vm.nsfwChoices.price;
          vm.code += vm.nsfwChoices.code;
          vm.nsfwChoices.options.forEach(function(element){
            if(element.selected){
              vm.total += element.price;
              vm.code += element.code;
            }
          });
        }
      }
      else if(vm.tiers.ink.selected){
        vm.total += vm.tiers.ink.price;
        vm.code += vm.tiers.ink.code;
        if(vm.colorOptions.ink.selected){
          vm.total += vm.colorOptions.ink.price;
          vm.code += vm.colorOptions.ink.code;
          vm.colorOptions.ink.options.forEach(function(element){
            if(element.selected){
              vm.total += element.price;
              vm.code += element.code;
            }
          });
        }
        if(vm.nsfwChoices.selected){
          vm.total += vm.nsfwChoices.price;
          vm.code += vm.nsfwChoices.code;
          vm.nsfwChoices.options.forEach(function(element){
            if(element.selected){
              vm.total += element.price;
              vm.code += element.code;
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
        }
      }
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