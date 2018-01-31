// Write your Pizza Builder JavaScript in this file.

// Sets our Default Values once the DOM has fully loaded

$(document).ready(function() {
  defaultValues();
});

var prices = {
  "peppperonni": 1,
  "mushroom": 1,
  "green-pepper": 1,
  "sauce": 3,
  "crust": 5
};

// Add and Remove Toppings

// Code to connect Buttons with respective Ingredients
// Iteration 1
btnHandler(".btn-pepperonni", ".pepperonni");
btnHandler(".btn-mushrooms", ".mushroom");
btnHandler(".btn-green-peppers", ".green-pepper");

// Iteration 2
// Allows Users to select white sauce and gluten free crust
// if they desire them.
btnHandler(".btn-crust", ".crust", "crust-gluten-free");
btnHandler(".btn-sauce", ".sauce", "sauce-white");

// triggerClass, targetClass, and toggleClass are run through 
// this btnHandler function for Toppings. For example, when
// we pass through .btn-pepperonni" and ".pepperonni", no
// toggleClass (third argument) is provided, defaulting to
// the second condition in the tertiary operator that "toggles"
// the target class "on" and "off". Remember that "toggle" method
// alternates between "hide" and "show" for the selected elements.
// (display: none)

// If a "toggleClass" is passed as an argument to the "btnHandler"
// call, then we will specify that we want to "toggle" the "toggleClass"
// on and off instead of simply "showing" or "hiding" the element itself.

function btnHandler(triggerClass, targetClass, toggleClass) {
  $(triggerClass).on("click", function() {

      // Iteration 1 - Add / Remove Toppings + Iteration 2 - Sauce / Crust Options
      // Remember that "toggleClass" adds and removes one or more
      // class names from the selected elements.
      toggleClass ? $(targetClass).toggleClass(toggleClass) : $(targetClass).toggle();
    
    // Iteration 3 - Change Button State on Click 
    changeButtonStyle($(this));
    
    // Iteration 4 - Update Ingredients List / Prices on Click
    updateIngredientsList(targetClass);
    updatePrice();
  });
}

// Iteration 3 - Change the Button's State

function changeButtonStyle(button) {
  $(button).toggleClass("active");
}

function defaultValues () {
  // Iteration 2 - Regular Sauce / Crust are selected by Default 
  $(".crust").removeClass("crust-gluten-free");
  $(".crust").find(".sauce").removeClass("sauce-white");

  // Iteration 3 - Buttons State
  $(".btn-pepperonni, .btn-mushrooms, .btn-green-peppers").addClass("active");
  $(".btn-crust, .btn-sauce").removeClass("active");

  // Iteration 4 - Ingredients List
  $(".panel.price").find("ul").find("li:contains('sauce')").toggle();
  $(".panel.price").find("ul").find("li:contains('crust')").toggle();

  // Total price
  updatePrice();
}

// Iteration 4 - Ingredients / Prices

function updateIngredientsList(ingredient) {

  // Code to pass ingredient that has been added to the list
  // of ingredients in the far right corner.
  ingredient = ingredient.replace(".", "").split("-");
  var element = $(".panel.price").find("ul").find("li:contains('" + ingredient[0] + "')");
  
  // Show / Hide Element based upon Click
  element.toggle();
}

// Iteration 5 - Update Price

function updatePrice() {

  // Here, we use jQuery to find the elements that we want
  // to modify.
  var prices      = $(".panel.price");
  var base        = $(prices).find("b:first");
  var total       = $(prices).find("strong:last");
  var ingredients = $(prices).find("ul").find("li:visible");
  var totalPrice  = getPrice(base);

  // "$.each" is an iterator function that can be used to
  // iterate over both objects and arrays.
  $.each(ingredients, function(index, ingredient){
    totalPrice += getPrice(ingredient);
  });

  // Using the "total" variable that we defined earlier,
  // we replace the HTML content with "$" + the total
  // price of all ingredients.
  $(total).html("$" + totalPrice);
}

function getPrice(ingredient) {

  // Function to hone in on price of individual ingredient
  price = $(ingredient).html().split(" ")[0];

  // We remove the "$" from the price and run the string
  // through "parseInt" to retrieve the Integer
  return parseInt(price.replace("$", ""));
}
