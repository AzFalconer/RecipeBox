$(document).ready(function() {
  //Variables
  var allRecipes = [["Omelet", "3	EGGS\n2	Tbsp water\n1/8	tsp salt\nDash	pepper\n1/2	cup of filling (such as shredded cheese, chopped ham, baby spinach, bell pepper, mushrooms, etc...)\n\nBEAT eggs, water, salt and pepper in small bowl until blended.\n\nHEAT 7 to 10-inch nonstick omelet pan or skillet over medium-high heat until hot. TILT pan to coat bottom. POUR IN egg mixture. Mixture should set immediately at edges.\n\nGENTLY PUSH cooked portions from edges toward the center with inverted turner so that uncooked eggs can reach the hot pan surface. CONTINUE cooking, tilting pan and gently moving cooked portions as needed.\n\nWhen top surface of eggs is thickened and no visible liquid egg remains, PLACE filling on one side of the omelet. FOLD omelet in half with turner. With a quick flip of the wrist, turn pan and INVERT or SLIDE omelet onto plate. SERVE immediately."],
                    ["Crepes", "1 cup all-purpose flour\n1 tablespoon sugar\n1/4 teaspoon coarse salt\n1-1/2 cups whole milk\n4 large eggs\n3 tablespoons unsalted butter, melted\n\nIn a blender, combine flour, sugar, salt, milk, eggs, and butter.\n\nPuree until mixture is smooth and bubbles form on top, about 30 seconds. Let batter sit at least 15 minutes at room temperature (or refrigerate in an airtight container, up to 1 day; whisk before using).\n\nHeat a 12-inch nonstick skillet over medium. Lightly coat with butter. Add 1/3 cup batter and swirl to completely cover bottom of skillet. Cook until underside of crepe is golden brown, 2 to 3 minutes.\n\nLoosen edge of crepe with a rubber spatula, then with your fingertips, quickly flip. Cook 1 minute more. Slide crepe out of skillet and repeat with remaining batter. (Coat pan with butter as needed.)\n\nMakes 10-14 Crepes"]],
      recipe = ["title", "text"],
      index = -1,
      title = "Your Recipes",
      editTitle = false,
      edit = false;

  //Listen
  $("#addRecipe").click(function(){addRecipe();});
  $("#btnSave").click(function(){save();});
  $("#btnDelete").click(function(){deleteRecipe();});
  $("#btnEdit").click(function(){edit = true; editRecipe();});
  $("#btnCancel").click(function(){$(".splash").show(); resetDisplay();});
  $("#changeName").click(function(){changeTitle();});
  $("#titleBox").keydown(function(e) {if (e.keyCode == 13 || e.keyCode == 3) {e.preventDefault();changeTitle();}})

  //Execute
  // Retrive localStorage
  var storedTitle = localStorage.getItem("_AzFalconer_title");
  if (storedTitle) {title = storedTitle;}
  var storedRecipes = localStorage.getItem("_AzFalconer_recipes");
  if (storedRecipes) {allRecipes = JSON.parse(storedRecipes);}
  resetDisplay ();

  //Functions
  function changeTitle() {
    if (editTitle == false) {
      editTitle = true;
      $("#titleBox").attr("readonly", false);
      $('#titleBox').focus();
      $('#titleBox').select();
    } else { //lock box
      editTitle = false;
      title = $("#titleBox").val();
      resetDisplay();
    }

  }

  function addRecipe () {
    resetDisplay();
    edit = false;
    $(".splash").hide();
    $("#btnSave").show();
    $("#btnCancel").show();
    $("#titleBox").val(title);
    $("#editTitle").val("Enter title of recipe here...");
    $("#editRecipe").val("Enter new recipe here...");
    $("#editTitle").attr("readonly", false);
    $("#editRecipe").attr("readonly", false);
    $("#editTitle").show();
    $("#editRecipe").show();
    $("#editTitle").select();
  }

  function editRecipe () {
    edit = true;
    var title = $("#editTitle").val();
    for (i=0;i<allRecipes.length;i++) {
      if (allRecipes[i][0] == title) {
        index = i;
      }
    }
    $("#btnEdit").hide();
    $("#btnDelete").hide();
    $("#btnSave").show();
    $("#btnCancel").show();
    $("#editTitle").attr("readonly", false);
    $("#editRecipe").attr("readonly", false);
    $("#editTitle").show();
    $("#editRecipe").show();
    $("#editRecipe").focus();
  }

  function deleteRecipe () {
    var delTitle = $("#editTitle").val();
    for (i=0;i<allRecipes.length;i++) {
      if (allRecipes[i][0] == delTitle) {
        allRecipes.splice(i,1);
      }
    }
    resetDisplay();
  }

  function save () {
    var title = $("#editTitle").val(),
        text = $("#editRecipe").val();
    if (edit !== true) { //Handles new Save
      allRecipes.push([title,text]);
    } else { //Handles edit Save
      allRecipes.splice(index,1,[title,text]);
      }
    resetDisplay();
  }

  function resetDisplay () {
    // store array to localstorage
    localStorage.setItem("_AzFalconer_recipes",  JSON.stringify(allRecipes));
    localStorage.setItem("_AzFalconer_title",  title);
    edit = false;
    index = -1;
    $("#titleBox").val(title);
    $("#editTitle").val("Enter title of recipe here...");
    $("#editRecipe").val("Enter new recipe here...");
    $("#titleBox").attr("readonly", true);
    $("#editTitle").attr("readonly", true);
    $("#editRecipe").attr("readonly", true);
    $("#btnSave").hide();
    $("#btnEdit").hide();
    $("#btnDelete").hide();
    $("#btnCancel").hide();
    $("#editTitle").hide();
    $("#editRecipe").hide();
    //Delete existing index list
    $( ".list" ).remove();
    //Sort allRecipes before build
     allRecipes = allRecipes.slice().sort();
    //build index list
    for (i=0;i<allRecipes.length;i++) {
      $("#indexList").append('<li class="list" id="' + i + '">' + allRecipes[i][0] + '</li>');
    }
    $('ul').on('click', 'li.list', function() { //dynamicly add onClick to new <li>
      $('.selected').removeClass('selected');
      $(this).addClass("selected");
      showRecipe(this.id);
    });
  }

  function showRecipe(index) {
    $(".splash").hide();
    $("#editTitle").val(allRecipes[index][0]);
    $("#editRecipe").val(allRecipes[index][1]);
    $("#editTitle").show();
    $("#editRecipe").show();
    $("#btnEdit").show();
    $("#btnDelete").show();
  }
});
