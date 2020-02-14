const mongoose = require("mongoose");
const Drink = require("../models/Drink");
const Ingredient = require("../models/Ingredient");
const dbName = "cocktail-me";
const drinks = [
  {
    name: "Vesper",
    glass: "martini",
    category: "Before Dinner Cocktail",
    ingredients: [
      { unit: "cl", amount: 6, ingredient: "Gin" },
      { unit: "cl", amount: 1.5, ingredient: "Vodka" },
      { unit: "cl", amount: 0.75, ingredient: "Lillet Blonde" }
    ],
    garnish: "Lemon twist",
    preparation: "Shake and strain into a chilled cocktail glass."
  },
  {
    name: "Bacardi",
    glass: "martini",
    category: "Before Dinner Cocktail",
    ingredients: [
      {
        unit: "cl",
        amount: 4.5,
        ingredient: "White rum",
        label: "Bacardi White Rum"
      },
      { unit: "cl", amount: 2, ingredient: "Lime juice" },
      { unit: "cl", amount: 1, ingredient: "Syrup", label: "Grenadine" }
    ],
    preparation: "Shake with ice cubes. Strain into chilled cocktail glass."
  },
  {
    name: "Negroni",
    glass: "old-fashioned",
    category: "Before Dinner Cocktail",
    ingredients: [
      { unit: "cl", amount: 3, ingredient: "Gin" },
      { unit: "cl", amount: 3, ingredient: "Campari" },
      {
        unit: "cl",
        amount: 3,
        ingredient: "Vermouth",
        label: "Sweet red vermouth"
      }
    ],
    garnish: "Half an orange slice",
    preparation: "Build into old-fashioned glass filled with ice. Stir gently."
  },
  {
    name: "Rose",
    glass: "martini",
    ingredients: [
      { unit: "cl", amount: 2, ingredient: "Kirsch" },
      { unit: "cl", amount: 4, ingredient: "Vermouth", label: "Dry vermouth" },
      { special: "3 dashes Strawberry syrup" }
    ],
    preparation:
      "Stir all ingredients with ice and strain into a cocktail glass."
  },
  {
    name: "Old Fashioned",
    glass: "old-fashioned",
    category: "Before Dinner Cocktail",
    ingredients: [
      {
        unit: "cl",
        amount: 4.5,
        ingredient: "Whiskey",
        label: "Bourbon or rye whiskey"
      },
      { special: "2 dashes Angostura Bitters" },
      { special: "1 sugar cube" },
      { special: "Few dashes plain water" }
    ],
    garnish: "Orange slice and cherry",
    preparation:
      "Place sugar cube in old-fashioned glass and saturate with bitters, add a dash of plain water. Muddle until dissolve. Fill the glass with ice cubes and add whisky."
  },
  {
    name: "Tuxedo",
    glass: "martini",
    category: "All Day Cocktail",
    ingredients: [
      { unit: "cl", amount: 3, ingredient: "Gin", label: "Old Tom Gin" },
      { unit: "cl", amount: 3, ingredient: "Vermouth", label: "Dry vermouth" },
      { special: "1/2 bar spoon Maraschino" },
      { special: "1/4 bar spoon Absinthe" },
      { special: "3 dashes Orange Bitters" }
    ],
    garnish: "Cherry and lemon twist",
    preparation: "Stir all ingredients with ice and strain into cocktail glass."
  },
  {
    name: "Mojito",
    glass: "collins",
    category: "Longdrink",
    ingredients: [
      {
        unit: "cl",
        amount: 4,
        ingredient: "White rum",
        label: "White Cuban Rum"
      },
      { unit: "cl", amount: 3, ingredient: "Lime juice" },
      { special: "6 Mint sprigs" },
      { special: "2 teaspoons white sugar" },
      { special: "Soda water" }
    ],
    garnish: "Mint leaves and lemon slice",
    preparation:
      "Muddle mint sprigs with sugar and lime juice. Add splash of soda water and fill glass with cracked ice. Pour rum and top with soda water. Serve with straw."
  },
  {
    name: "Horse's Neck",
    glass: "highball",
    category: "Longdrink",
    ingredients: [
      { unit: "cl", amount: 4, ingredient: "Cognac" },
      { unit: "cl", amount: 12, ingredient: "Ginger Ale" },
      { special: "Dash of Angostura bitters (optional)" }
    ],
    garnish: "Lemon twist",
    preparation:
      "Build into highball glass with ice cubes. Stir gently. If required, add dashes of Angostura bitters."
  },
  {
    name: "Planter's Punch",
    glass: "highball",
    category: "Longdrink",
    ingredients: [
      { unit: "cl", amount: 4.5, ingredient: "Dark rum" },
      { unit: "cl", amount: 3.5, ingredient: "Orange juice" },
      { unit: "cl", amount: 3.5, ingredient: "Pineapple juice" },
      { unit: "cl", amount: 2, ingredient: "Lemon juice" },
      { unit: "cl", amount: 1, ingredient: "Syrup", label: "Grenadine" },
      { unit: "cl", amount: 1, ingredient: "Syrup", label: "Sugar syrup" },
      { special: "3 to 4 dashes Angostura bitters" }
    ],
    garnish: "Pineapple slice and a cherry",
    preparation:
      "Pour all ingredients, except the bitters, into shaker filled with ice. Shake. Pour into large glass, filled with ice. Add Angostura bitters, “on top”."
  },
  {
    name: "Sea Breeze",
    glass: "highball",
    category: "Longdrink",
    ingredients: [
      { unit: "cl", amount: 4, ingredient: "Vodka" },
      { unit: "cl", amount: 12, ingredient: "Cranberry juice" },
      { unit: "cl", amount: 3, ingredient: "Grapefruit juice" }
    ],
    garnish: "Lime wedge",
    preparation: "Build all ingredients in a rock glass filled with ice."
  },
  {
    name: "Pisco Sour",
    glass: "old-fashioned",
    category: "All Day Cocktail",
    ingredients: [
      { unit: "cl", amount: 4.5, ingredient: "Pisco" },
      { unit: "cl", amount: 3, ingredient: "Lemon juice" },
      { unit: "cl", amount: 2, ingredient: "Syrup", label: "Sugar syrup" },
      { special: "1 raw egg white (small egg)" }
    ],
    preparation:
      "Shake and strain into a chilled champagne flute. Dash some Angostura bitters on top."
  },
  {
    name: "Long Island Iced Tea",
    glass: "highball",
    category: "Longdrink",
    ingredients: [
      { unit: "cl", amount: 1.5, ingredient: "Tequila" },
      { unit: "cl", amount: 1.5, ingredient: "Vodka" },
      { unit: "cl", amount: 1.5, ingredient: "White rum" },
      { unit: "cl", amount: 1.5, ingredient: "Triple Sec" },
      { unit: "cl", amount: 1.5, ingredient: "Gin" },
      { unit: "cl", amount: 2.5, ingredient: "Lemon juice" },
      { unit: "cl", amount: 3.0, ingredient: "Syrup", label: "Gomme syrup" },
      { special: "1 dash of Cola" }
    ],
    garnish: "Lemon twist",
    preparation:
      "Add all ingredients into highball glass filled with ice. Stir gently. Serve with straw."
  },
  {
    name: "Clover Club",
    glass: "martini",
    category: "All Day Cocktail",
    ingredients: [
      { unit: "cl", amount: 4.5, ingredient: "Gin" },
      {
        unit: "cl",
        amount: 1.5,
        ingredient: "Syrup",
        label: "Raspberry syrup"
      },
      { unit: "cl", amount: 1.5, ingredient: "Lemon juice" },
      { special: "Few drops of Egg White" }
    ],
    preparation: "Shake with ice cubes. Strain into cocktail glass."
  },
  {
    name: "Angel Face",
    glass: "martini",
    category: "All Day Cocktail",
    ingredients: [
      { unit: "cl", amount: 3, ingredient: "Gin" },
      { unit: "cl", amount: 3, ingredient: "Apricot brandy" },
      { unit: "cl", amount: 3, ingredient: "Calvados" }
    ],
    preparation: "Shake with ice cubes. Strain into a cocktail glass."
  },
  {
    name: "Mimosa",
    glass: "champagne-flute",
    category: "Sparkling Cocktail",
    ingredients: [
      { unit: "cl", amount: 7.5, ingredient: "Champagne" },
      { unit: "cl", amount: 7.5, ingredient: "Orange juice" }
    ],
    garnish: "Optional orange twist",
    preparation:
      "Pour orange juice into flute and gently pour Champagne. Stir gently. Note: Buck's Fizz is a very similar cocktail but made of two parts champagne to one part orange juice."
  },
  {
    name: "Whiskey Sour",
    glass: "old-fashioned",
    category: "Before Dinner Cocktail",
    ingredients: [
      {
        unit: "cl",
        amount: 4.5,
        ingredient: "Whiskey",
        label: "Bourbon whiskey"
      },
      { unit: "cl", amount: 3.0, ingredient: "Lemon juice" },
      { unit: "cl", amount: 1.5, ingredient: "Syrup", label: "Sugar syrup" }
    ],
    garnish: "Half an orange slice and cherry",
    preparation:
      "Dash egg white (Optional: if used shake little harder to foam up the egg white). Pour all ingredients into cocktail shaker filled with ice. Shake. Strain into cocktail glass. If served ‘On the rocks’, strain ingredients into old-fashioned glass filled with ice."
  },
  {
    name: "Screwdriver",
    glass: "highball",
    category: "All Day Cocktail",
    ingredients: [
      { unit: "cl", amount: 5, ingredient: "Vodka" },
      { unit: "cl", amount: 10, ingredient: "Orange juice" }
    ],
    garnish: "Orange slice",
    preparation: "Build into a highball glass filled with ice. Stir gently."
  },
  {
    name: "Cuba Libre",
    glass: "highball",
    category: "Longdrink",
    ingredients: [
      { unit: "cl", amount: 5, ingredient: "White rum" },
      { unit: "cl", amount: 12, ingredient: "Cola" },
      { unit: "cl", amount: 1, ingredient: "Lime juice" }
    ],
    garnish: "Lime wedge",
    preparation: "Build all ingredients in a highball glass filled with ice."
  },
  {
    name: "Manhattan",
    glass: "martini",
    category: "Before Dinner Cocktail",
    ingredients: [
      { unit: "cl", amount: 5, ingredient: "Whiskey", label: "Rye whiskey" },
      { unit: "cl", amount: 2, ingredient: "Vermouth", label: "Red vermouth" },
      { special: "1 dash Angostura Bitters" }
    ],
    garnish: "Cherry",
    preparation:
      "Stir in mixing glass with ice cubes. Strain into chilled cocktail glass."
  },
  {
    name: "Porto Flip",
    glass: "martini",
    category: "After Dinner Cocktail",
    ingredients: [
      { unit: "cl", amount: 1.5, ingredient: "Cognac" },
      { unit: "cl", amount: 4.5, ingredient: "Red Port" },
      { unit: "cl", amount: 1, ingredient: "Egg yolk" }
    ],
    preparation:
      "Shake with ice cubes. Strain into cocktail glass. Sprinkle with fresh ground nutmeg."
  },
  {
    name: "Gin Fizz",
    glass: "highball",
    category: "Longdrink",
    ingredients: [
      { unit: "cl", amount: 4.5, ingredient: "Gin" },
      { unit: "cl", amount: 3, ingredient: "Lemon juice" },
      { unit: "cl", amount: 1, ingredient: "Syrup", label: "Sugar syrup" },
      { unit: "cl", amount: 8, ingredient: "Soda water" }
    ],
    garnish: "Lemon slice",
    preparation:
      "Shake all ingredients with ice cubes, except soda water. Pour into tumbler. Top with soda water."
  },
  {
    name: "Espresso Martini",
    glass: "martini",
    category: "After Dinner Cocktail",
    ingredients: [
      { unit: "cl", amount: 5, ingredient: "Vodka" },
      { unit: "cl", amount: 1, ingredient: "Coffee liqueur", label: "Kahlúa" },
      {
        special: "Sugar syrup (according to individual preference of sweetness)"
      },
      { special: "1 short strong Espresso" }
    ],
    preparation: "Shake and strain into a chilled cocktail glass."
  },
  {
    name: "Margarita",
    glass: "margarita",
    category: "All Day Cocktail",
    ingredients: [
      { unit: "cl", amount: 3.5, ingredient: "Tequila" },
      { unit: "cl", amount: 2, ingredient: "Triple Sec", label: "Cointreau" },
      { unit: "cl", amount: 1.5, ingredient: "Lime juice" }
    ],
    preparation:
      "Shake with ice cubes. Strain into cocktail glass rimmed with salt (note:Fruit Margarita - blend selected fruit with the above recipe)."
  },
  {
    name: "French 75",
    glass: "champagne-tulip",
    category: "Sparkling Cocktail",
    ingredients: [
      { unit: "cl", amount: 3, ingredient: "Gin" },
      { unit: "cl", amount: 1.5, ingredient: "Lemon juice" },
      { special: "2 dashes Sugar syrup" },
      { unit: "cl", amount: 6, ingredient: "Champagne" }
    ],
    preparation:
      "Shake with ice cubes, except for champagne. Strain into a champagne flute. Top up with champagne. Stir gently."
  },
  {
    name: "Yellow Bird",
    glass: "martini",
    category: "All Day Cocktail",
    ingredients: [
      { unit: "cl", amount: 3, ingredient: "White rum" },
      { unit: "cl", amount: 1.5, ingredient: "Galliano" },
      { unit: "cl", amount: 1.5, ingredient: "Triple Sec" },
      { unit: "cl", amount: 1.5, ingredient: "Lime juice" }
    ],
    preparation: "Shake and strain into a chilled cocktail glass."
  },
  {
    name: "Pina Colada",
    glass: "hurricane",
    category: "Longdrink",
    ingredients: [
      { unit: "cl", amount: 3, ingredient: "White rum" },
      { unit: "cl", amount: 9, ingredient: "Pineapple juice" },
      { unit: "cl", amount: 3, ingredient: "Coconut milk" }
    ],
    garnish: "Pineapple slice and a cherry",
    preparation:
      "Blend all the ingredients with ice in a electric blender, pour into a large goblet or Hurricane glass and serve with straws."
  },
  {
    name: "Aviation",
    glass: "martini",
    category: "All Day Cocktail",
    ingredients: [
      { unit: "cl", amount: 4.5, ingredient: "Gin" },
      {
        unit: "cl",
        amount: 1.5,
        ingredient: "Cherry liqueur",
        label: "Maraschino"
      },
      { unit: "cl", amount: 1.5, ingredient: "Lemon juice" }
    ],
    preparation: "Shake and strain into a chilled cocktail glass."
  },
  {
    name: "Bellini",
    glass: "champagne-flute",
    category: "Sparkling Cocktail",
    ingredients: [
      { unit: "cl", amount: 10, ingredient: "Prosecco" },
      { unit: "cl", amount: 5, ingredient: "Peach puree" }
    ],
    preparation:
      "Pour peach puree into chilled glass and add sparkling wine. Stir gently. Variations: Puccini (fresh mandarin juice), Rossini (fresh strawberry puree), Tintoretto (fresh pomegranate juice)"
  },
  {
    name: "Grasshopper",
    glass: "martini",
    category: "After Dinner Cocktail",
    ingredients: [
      {
        unit: "cl",
        amount: 3,
        ingredient: "Créme liqueur",
        label: "White Créme de Cacao"
      },
      {
        unit: "cl",
        amount: 3,
        ingredient: "Créme liqueur",
        label: "Green Créme de Menthe"
      },
      { unit: "cl", amount: 3, ingredient: "Cream" }
    ],
    preparation: "Shake with ice cubes. Strain into chilled cocktail glass."
  },
  {
    name: "Tequila Sunrise",
    glass: "highball",
    category: "Longdrink",
    ingredients: [
      { unit: "cl", amount: 4.5, ingredient: "Tequila" },
      { unit: "cl", amount: 9, ingredient: "Orange juice" },
      { unit: "cl", amount: 1.5, ingredient: "Syrup", label: "Grenadine" }
    ],
    garnish: "Orange slice and a cherry",
    preparation:
      "Build tequila and orange juice into highball with ice cubes. Add a splash of grenadine to create sunrise effect. Do not stir."
  },
  {
    name: "Daiquiri",
    glass: "martini",
    category: "Before Dinner Cocktail",
    ingredients: [
      { unit: "cl", amount: 4.5, ingredient: "White rum" },
      { unit: "cl", amount: 2.5, ingredient: "Lime juice" },
      { unit: "cl", amount: 1.5, ingredient: "Syrup", label: "Simple syrup" }
    ],
    preparation: "Shake and strain into a cocktail glass."
  },
  {
    name: "Rusty Nail",
    glass: "old-fashioned",
    category: "After Dinner Cocktail",
    ingredients: [
      {
        unit: "cl",
        amount: 4.5,
        ingredient: "Whiskey",
        label: "Scotch whisky"
      },
      { unit: "cl", amount: 2.5, ingredient: "Drambuie" }
    ],
    garnish: "Lemon twist",
    preparation: "Build into old-fashioned glass filled with ice. Stir gently."
  },
  {
    name: "B52",
    glass: "shot",
    category: "After Dinner Cocktail",
    ingredients: [
      { unit: "cl", amount: 2, ingredient: "Coffee liqueur", label: "Kahlúa" },
      {
        unit: "cl",
        amount: 2,
        ingredient: "Cream liqueur",
        label: "Baileys Irish Cream"
      },
      {
        unit: "cl",
        amount: 2,
        ingredient: "Triple Sec",
        label: "Grand Marnier"
      }
    ],
    preparation:
      "Layer ingredients one at a time starting with Kahlúa, followed by Baileys Irish Cream and top with Grand Marnier. Flame the Grand Marnier, serve while the flame is still on, accompanied with a straw on side plate."
  },
  {
    name: "Stinger",
    glass: "martini",
    category: "After Dinner Cocktail",
    ingredients: [
      { unit: "cl", amount: 5, ingredient: "Cognac" },
      {
        unit: "cl",
        amount: 2,
        ingredient: "Créme liqueur",
        label: "White Créme de Menthe"
      }
    ],
    preparation:
      "Stir in mixing glass with ice cubes. Strain into a cocktail glass."
  },
  {
    name: "Golden Dream",
    glass: "martini",
    category: "After Dinner Cocktail",
    ingredients: [
      { unit: "cl", amount: 2, ingredient: "Galliano" },
      { unit: "cl", amount: 2, ingredient: "Triple Sec" },
      { unit: "cl", amount: 2, ingredient: "Orange juice" },
      { unit: "cl", amount: 1, ingredient: "Cream" }
    ],
    preparation: "Shake with ice cubes. Strain into chilled cocktail glass."
  },
  {
    name: "God Mother",
    glass: "old-fashioned",
    ingredients: [
      { unit: "cl", amount: 3.5, ingredient: "Vodka" },
      { unit: "cl", amount: 3.5, ingredient: "DiSaronno" }
    ],
    preparation:
      "Build into old fashioned glass filled with ice cubes. Stir gently."
  },
  {
    name: "Spritz Veneziano",
    glass: "old-fashioned",
    category: "Sparkling Cocktail",
    ingredients: [
      { unit: "cl", amount: 6, ingredient: "Prosecco" },
      { unit: "cl", amount: 4, ingredient: "Aperol" },
      { special: "Splash of Soda water" }
    ],
    garnish: "Half an orange slice",
    preparation:
      "Build into an old-fashioned glass filled with ice. Top with a splash of soda water."
  },
  {
    name: "Bramble",
    glass: "old-fashioned",
    category: "All Day Cocktail",
    ingredients: [
      { unit: "cl", amount: 4, ingredient: "Gin" },
      { unit: "cl", amount: 1.5, ingredient: "Lemon juice" },
      { unit: "cl", amount: 1, ingredient: "Syrup", label: "Sugar syrup" },
      { unit: "cl", amount: 1.5, ingredient: "Blackberry liqueur" }
    ],
    garnish: "Lemon slice and two blackberries",
    preparation:
      "Build over crushed ice, in a rock glass. Stir, then pour the blackberry liqueur over the top of the drink in a circular fashion."
  },
  {
    name: "Alexander",
    glass: "martini",
    ingredients: [
      { unit: "cl", amount: 3, ingredient: "Cognac" },
      {
        unit: "cl",
        amount: 3,
        ingredient: "Créme liqueur",
        label: "Brown Créme de Cacao"
      },
      { unit: "cl", amount: 3, ingredient: "Cream" }
    ],
    preparation:
      "Shake and strain into a chilled cocktail glass. Sprinkle with fresh ground nutmeg."
  },
  {
    name: "Lemon Drop Martini",
    glass: "martini",
    category: "All Day Cocktail",
    ingredients: [
      { unit: "cl", amount: 2.5, ingredient: "Vodka", label: "Citron Vodka" },
      { unit: "cl", amount: 2, ingredient: "Triple Sec" },
      { unit: "cl", amount: 1.5, ingredient: "Lemon juice" }
    ],
    garnish: "Lemon slice",
    preparation:
      "Shake and strain into a chilled cocktail glass rimmed with sugar."
  },
  {
    name: "French Martini",
    glass: "martini",
    category: "Before Dinner Cocktail",
    ingredients: [
      { unit: "cl", amount: 4.5, ingredient: "Vodka" },
      { unit: "cl", amount: 1.5, ingredient: "Raspberry liqueur" },
      { unit: "cl", amount: 1.5, ingredient: "Pineapple juice" }
    ],
    preparation:
      "Stir in mixing glass with ice cubes. Strain into chilled cocktail glass. Squeeze oil from lemon peel onto the drink."
  },
  {
    name: "Black Russian",
    glass: "old-fashioned",
    category: "After Dinner Cocktail",
    ingredients: [
      { unit: "cl", amount: 5, ingredient: "Vodka" },
      { unit: "cl", amount: 2, ingredient: "Coffee liqueur" }
    ],
    preparation:
      "Build into old fashioned glass filled with ice cubes. Stir gently. Note: for White Russian, float fresh cream on the top and stir gently."
  },
  {
    name: "Bloody Mary",
    glass: "highball",
    category: "Longdrink",
    ingredients: [
      { unit: "cl", amount: 4.5, ingredient: "Vodka" },
      { unit: "cl", amount: 9, ingredient: "Tomato juice" },
      { unit: "cl", amount: 1.5, ingredient: "Lemon juice" },
      { special: "2 to 3 dashes of Worcestershire Sauce" },
      { special: "Tabasco" },
      { special: "Celery salt" },
      { special: "Pepper" }
    ],
    garnish: "Celery and optionally lemon wedge",
    preparation: "Stir gently, pour all ingredients into highball glass."
  },
  {
    name: "Mai-tai",
    glass: "highball",
    category: "Longdrink",
    ingredients: [
      { unit: "cl", amount: 4, ingredient: "White rum" },
      { unit: "cl", amount: 2, ingredient: "Dark rum" },
      {
        unit: "cl",
        amount: 1.5,
        ingredient: "Triple Sec",
        label: "Orange Curaçao"
      },
      { unit: "cl", amount: 1.5, ingredient: "Syrup", label: "Orgeat syrup" },
      { unit: "cl", amount: 1, ingredient: "Lime juice" }
    ],
    garnish: "Pineapple spear, mint leaves and lime wedge",
    preparation: "Shake and strain into highball glass. Serve with straw."
  },
  {
    name: "Barracuda",
    glass: "margarita",
    category: "Sparkling Cocktail",
    ingredients: [
      { unit: "cl", amount: 4.5, ingredient: "Dark rum", label: "Gold rum" },
      { unit: "cl", amount: 1.5, ingredient: "Galliano" },
      { unit: "cl", amount: 6, ingredient: "Pineapple juice" },
      { special: "1 dash Lime juice" },
      { special: "Top with Prosecco" }
    ]
  },
  {
    name: "Sex on the Beach",
    glass: "highball",
    category: "Longdrink",
    ingredients: [
      { unit: "cl", amount: 4, ingredient: "Vodka" },
      { unit: "cl", amount: 2, ingredient: "Peach schnapps" },
      { unit: "cl", amount: 4, ingredient: "Cranberry juice" },
      { unit: "cl", amount: 4, ingredient: "Orange juice" }
    ],
    garnish: "Orange slice",
    preparation: "Build all ingredients in a highball glass filled with ice."
  },
  {
    name: "Monkey Gland",
    glass: "martini",
    category: "All Day Cocktail",
    ingredients: [
      { unit: "cl", amount: 5, ingredient: "Gin" },
      { unit: "cl", amount: 3, ingredient: "Orange juice" },
      { special: "2 drops Absinthe" },
      { special: "2 drops Grenadine" }
    ],
    preparation: "Shake and strain into a chilled cocktail glass."
  },
  {
    name: "Derby",
    glass: "martini",
    category: "All Day Cocktail",
    ingredients: [
      { unit: "cl", amount: 6, ingredient: "Gin" },
      { special: "2 drops Peach Bitters" },
      { special: "2 Fresh mint leaves" }
    ],
    garnish: "Mint leaves",
    preparation:
      "Stir in mixing glass with ice cubes. Strain into a cocktail glass."
  },
  {
    name: "Sidecar",
    glass: "martini",
    category: "All Day Cocktail",
    ingredients: [
      { unit: "cl", amount: 5, ingredient: "Cognac" },
      { unit: "cl", amount: 2, ingredient: "Triple Sec" },
      { unit: "cl", amount: 2, ingredient: "Lemon juice" }
    ],
    preparation: "Shake with ice cubes. Strain into cocktail glass."
  },
  {
    name: "Irish Coffee",
    glass: "hot-drink",
    category: "Hot Drink",
    ingredients: [
      { unit: "cl", amount: 4, ingredient: "Whiskey", label: "Irish whiskey" },
      { unit: "cl", amount: 9, ingredient: "Hot coffee" },
      { unit: "cl", amount: 3, ingredient: "Cream" },
      { special: "1 teaspoon of brown sugar" }
    ],
    preparation:
      "Warm the Irish whiskey over a burner. Pour into the glass (for hot drink) hot coffee, and add a teaspoon of sugar. Float Cream on top."
  },
  {
    name: "Sazerac",
    glass: "old-fashioned",
    category: "After Dinner Cocktail",
    ingredients: [
      { unit: "cl", amount: 5, ingredient: "Cognac" },
      { unit: "cl", amount: 1, ingredient: "Absinthe" },
      { special: "1 sugar cube" },
      { special: "2 dashes Peychaud’s bitters" }
    ],
    garnish: "Lemon twist",
    preparation:
      "Rinse a chilled old-fashioned glass with the absinthe, add crushed ice and set it aside. Stir the remaining ingredients over ice and set it aside. Discard the ice and any excess absinthe from the prepared glass, and strain the drink into the glass. Note: The original recipe changed after the American Civil War, rye whiskey substituted cognac as it became hard to obtain."
  },
  {
    name: "Americano",
    glass: "old-fashioned",
    category: "Before Dinner Cocktail",
    ingredients: [
      { unit: "cl", amount: 3, ingredient: "Campari" },
      { unit: "cl", amount: 3, ingredient: "Vermouth", label: "Red vermouth" },
      { special: "A splash of soda water" }
    ],
    garnish: "Half an orange slice",
    preparation:
      "Build into old fashioned glass filled with ice cubes. Add a splash of soda water."
  },
  {
    name: "Singapore Sling",
    glass: "highball",
    category: "Longdrink",
    ingredients: [
      { unit: "cl", amount: 3, ingredient: "Gin" },
      { unit: "cl", amount: 1.5, ingredient: "Cherry liqueur" },
      {
        unit: "cl",
        amount: 0.75,
        ingredient: "Triple Sec",
        label: "Cointreau"
      },
      { unit: "cl", amount: 0.75, ingredient: "DOM Bénédictine" },
      { unit: "cl", amount: 12.0, ingredient: "Pineapple juice" },
      { unit: "cl", amount: 1.5, ingredient: "Lime juice" },
      { unit: "cl", amount: 1, ingredient: "Syrup", label: "Grenadine" },
      { special: "1 dash Angostura bitters" }
    ],
    garnish: "Pineapple slice and a cherry",
    preparation: "Shake with ice cubes. Strain into highball glass."
  },
  {
    name: "French Connection",
    glass: "old-fashioned",
    ingredients: [
      { unit: "cl", amount: 3.5, ingredient: "Cognac" },
      { unit: "cl", amount: 3.5, ingredient: "DiSaronno" }
    ],
    preparation:
      "Build into old fashioned glass filled with ice cubes. Stir gently."
  },
  {
    name: "Moscow Mule",
    glass: "highball",
    category: "Longdrink",
    ingredients: [
      { unit: "cl", amount: 4.5, ingredient: "Vodka" },
      { unit: "cl", amount: 12, ingredient: "Ginger beer" },
      { unit: "cl", amount: 0.5, ingredient: "Lime juice" },
      { special: "1 slice lime in a highball glass" }
    ],
    garnish: "Lime slice",
    preparation: "Combine the vodka and ginger beer. Add lime juice."
  },
  {
    name: "John Collins",
    glass: "highball",
    category: "Longdrink",
    ingredients: [
      { unit: "cl", amount: 4.5, ingredient: "Gin" },
      { unit: "cl", amount: 3, ingredient: "Lemon juice" },
      { unit: "cl", amount: 1.5, ingredient: "Syrup", label: "Sugar syrup" },
      { unit: "cl", amount: 6, ingredient: "Soda water" }
    ],
    garnish: "Lemon slice and a cherry",
    preparation:
      "Build into highball glass filled with ice. Stir gently. Add a dash of Angostura bitters. (Note: Use Old Tom Gin for Tom Collins)"
  },
  {
    name: "Kir",
    glass: "white-wine",
    category: "Before Dinner Cocktail",
    ingredients: [
      { unit: "cl", amount: 9, ingredient: "Dry White Wine" },
      {
        unit: "cl",
        amount: 1,
        ingredient: "Créme liqueur",
        label: "Créme de Cassis"
      }
    ],
    preparation:
      "Pour Créme de Cassis into glass, top up with white wine. For Kir Royal: Use champagne instead of white wine."
  },
  {
    name: "Mint Julep",
    glass: "highball",
    category: "Longdrink",
    ingredients: [
      {
        unit: "cl",
        amount: 6,
        ingredient: "Whiskey",
        label: "Bourbon whiskey"
      },
      { special: "4 fresh mint sprigs" },
      { special: "1 teaspoon powdered sugar" },
      { special: "2 teaspoons water" }
    ],
    garnish: "Mint sprig",
    preparation:
      "In a highball glass gently muddle the mint, sugar and water. Fill the glass with cracked ice, add Bourbon and stir well until the glass is frost."
  },
  {
    name: "Tommy's Margarita",
    glass: "martini",
    category: "All Day Cocktail",
    ingredients: [
      { unit: "cl", amount: 4.5, ingredient: "Tequila" },
      { unit: "cl", amount: 1.5, ingredient: "Lime juice" },
      { special: "2 bar spoons of Agave nectar" }
    ],
    preparation: "Shake and strain into a chilled cocktail glass."
  },
  {
    name: "Paradise",
    glass: "martini",
    category: "All Day Cocktail",
    ingredients: [
      { unit: "cl", amount: 3.5, ingredient: "Gin" },
      { unit: "cl", amount: 2, ingredient: "Apricot brandy" },
      { unit: "cl", amount: 1.5, ingredient: "Orange juice" }
    ],
    preparation: "Shake with ice cubes. Strain into chilled cocktail glass."
  },
  {
    name: "Dirty Martini",
    glass: "martini",
    category: "Before Dinner Cocktail",
    ingredients: [
      { unit: "cl", amount: 6, ingredient: "Vodka" },
      { unit: "cl", amount: 1, ingredient: "Vermouth", label: "Dry vermouth" },
      { unit: "cl", amount: 1, ingredient: "Olive juice" }
    ],
    garnish: "Green olive",
    preparation:
      "Stir in mixing glass with ice cubes. Strain into chilled martini glass."
  },
  {
    name: "Champagne Cocktail",
    glass: "champagne-flute",
    category: "Sparkling Cocktail",
    ingredients: [
      { unit: "cl", amount: 9, ingredient: "Champagne" },
      { unit: "cl", amount: 1, ingredient: "Cognac" },
      { special: "2 dashes Angostura Bitters" },
      { special: "1 sugar cube" }
    ],
    garnish: "Orange slice and a cherry",
    preparation:
      "Add dash of Angostura bitter onto sugar cube and drop it into champagne flute. Add cognac followed by pouring gently chilled champagne."
  },
  {
    name: "Mary Pickford",
    glass: "martini",
    category: "All Day Cocktail",
    ingredients: [
      { unit: "cl", amount: 6, ingredient: "White rum" },
      {
        unit: "cl",
        amount: 1,
        ingredient: "Cherry liqueur",
        label: "Maraschino"
      },
      { unit: "cl", amount: 6, ingredient: "Pineapple juice" },
      { unit: "cl", amount: 1, ingredient: "Syrup", label: "Grenadine" }
    ],
    preparation: "Shake and strain into a chilled large cocktail glass."
  },
  {
    name: "Hemingway Special",
    glass: "martini",
    category: "All Day Cocktail",
    ingredients: [
      { unit: "cl", amount: 6, ingredient: "White rum" },
      { unit: "cl", amount: 4, ingredient: "Grapefruit juice" },
      {
        unit: "cl",
        amount: 1.5,
        ingredient: "Cherry liqueur",
        label: "Maraschino"
      },
      { unit: "cl", amount: 1.5, ingredient: "Lime juice" }
    ],
    preparation: "Shake with ice cubes. Strain into a double cocktail glass."
  },
  {
    name: "Dark 'n' Stormy",
    glass: "highball",
    category: "Longdrink",
    ingredients: [
      { unit: "cl", amount: 6, ingredient: "Dark rum" },
      { unit: "cl", amount: 10, ingredient: "Ginger beer" }
    ],
    garnish: "Lime wedge",
    preparation:
      "Build into highball glass filled with ice. Add rum first and top it with ginger beer."
  },
  {
    name: "Ramos Fizz",
    glass: "highball",
    category: "Longdrink",
    ingredients: [
      { unit: "cl", amount: 4.5, ingredient: "Gin" },
      { unit: "cl", amount: 1.5, ingredient: "Lime juice" },
      { unit: "cl", amount: 1.5, ingredient: "Lemon juice" },
      { unit: "cl", amount: 3, ingredient: "Syrup", label: "Sugar syrup" },
      { unit: "cl", amount: 6, ingredient: "Cream" },
      { special: "1 Egg white" },
      { special: "3 dashes Orange flower water" },
      { special: "2 drops Vanilla extract" },
      { special: "Soda water" }
    ],
    preparation:
      "Pour all ingredients (except soda) in a mixing glass, dry shake (no ice) for two minutes, add ice and hard shake for another minute. Strain into a highball glass without ice, top with soda."
  },
  {
    name: "Russian Spring Punch",
    glass: "highball",
    category: "Sparkling Cocktail",
    ingredients: [
      { unit: "cl", amount: 2.5, ingredient: "Vodka" },
      { unit: "cl", amount: 2.5, ingredient: "Lemon juice" },
      {
        unit: "cl",
        amount: 1.5,
        ingredient: "Créme liqueur",
        label: "Créme de Cassis"
      },
      { unit: "cl", amount: 1, ingredient: "Syrup", label: "Sugar syrup" }
    ],
    garnish: "Lemon slice and a blackberry",
    preparation:
      "Shake the ingredients and pour into highball glass. Top with Sparkling wine."
  },
  {
    name: "God Father",
    glass: "old-fashioned",
    ingredients: [
      {
        unit: "cl",
        amount: 3.5,
        ingredient: "Whiskey",
        label: "Scotch whisky"
      },
      { unit: "cl", amount: 3.5, ingredient: "DiSaronno" }
    ],
    preparation:
      "Build into old fashioned glass filled with ice cubes. Stir gently."
  },
  {
    name: "Cosmopolitan",
    glass: "martini",
    category: "All Day Cocktail",
    ingredients: [
      { unit: "cl", amount: 4, ingredient: "Vodka", label: "Citron Vodka" },
      { unit: "cl", amount: 1.5, ingredient: "Triple Sec", label: "Cointreau" },
      { unit: "cl", amount: 1.5, ingredient: "Lime juice" },
      { unit: "cl", amount: 3, ingredient: "Cranberry juice" }
    ],
    garnish: "Lime slice",
    preparation: "Shake with ice cubes. Strain into a large cocktail glass."
  },
  {
    name: "Dry Martini",
    glass: "martini",
    category: "Before Dinner Cocktail",
    ingredients: [
      { unit: "cl", amount: 6, ingredient: "Gin" },
      { unit: "cl", amount: 1, ingredient: "Vermouth", label: "Dry vermouth" }
    ],
    preparation:
      "Stir in mixing glass with ice cubes. Strain into chilled martini glass. Squeeze oil from lemon peel onto the drink, or garnish with olive."
  },
  {
    name: "Between the Sheets",
    glass: "martini",
    category: "All Day Cocktail",
    ingredients: [
      { unit: "cl", amount: 3, ingredient: "White rum" },
      { unit: "cl", amount: 3, ingredient: "Cognac" },
      { unit: "cl", amount: 3, ingredient: "Triple Sec" },
      { unit: "cl", amount: 2, ingredient: "Lemon juice" }
    ],
    preparation: "Shake with ice cubes. Strain into chilled cocktail glass."
  },
  {
    name: "Casino",
    glass: "martini",
    category: "All Day Cocktail",
    ingredients: [
      { unit: "cl", amount: 4, ingredient: "Gin", label: "Old Tom Gin" },
      {
        unit: "cl",
        amount: 1,
        ingredient: "Cherry liqueur",
        label: "Maraschino"
      },
      { unit: "cl", amount: 1, ingredient: "Orange Bitters" },
      { unit: "cl", amount: 1, ingredient: "Lemon juice" }
    ],
    garnish: "Lemon twist and a cherry",
    preparation: "Shake with ice cubes. Strain into chilled cocktail glass."
  },
  {
    name: "Caipirinha",
    glass: "old-fashioned",
    category: "All Day Cocktail",
    ingredients: [
      { unit: "cl", amount: 5, ingredient: "Cachaca" },
      { special: "half fresh lime cut into 4 wedges" },
      { special: "2 teaspoon sugar" }
    ],
    preparation:
      "Place lime and sugar in old fashion glass and muddle. Fill glass with ice and Cachaca (note:Caipiroska- use Vodka instead of Cachaca)."
  },
  {
    name: "Vampiro",
    glass: "highball",
    ingredients: [
      { unit: "cl", amount: 5, ingredient: "Tequila", label: "Silver Tequila" },
      { unit: "cl", amount: 7, ingredient: "Tomato juice" },
      { unit: "cl", amount: 3, ingredient: "Orange juice" },
      { unit: "cl", amount: 1, ingredient: "Lime juice" },
      { special: "1 teaspoon clear honey" },
      { special: "Half slice onion finely chopped" },
      { special: "Few slices fresh red hot chili peppers" },
      { special: "Few drops Worcestershire sauce" },
      { special: "Salt" }
    ],
    garnish: "Lime wedge and a green or red chili",
    preparation:
      "Shake with ice cubes. Strain into a highball glass, filled with ice."
  },
  {
    name: "Kamikaze",
    glass: "martini",
    category: "All Day Cocktail",
    ingredients: [
      { unit: "cl", amount: 3, ingredient: "Vodka" },
      { unit: "cl", amount: 3, ingredient: "Triple Sec" },
      { unit: "cl", amount: 3, ingredient: "Lime juice" }
    ],
    preparation: "Shake and strain into a chilled cocktail glass."
  },
  {
    name: "White Lady",
    glass: "martini",
    category: "All Day Cocktail",
    ingredients: [
      { unit: "cl", amount: 4, ingredient: "Gin" },
      { unit: "cl", amount: 3, ingredient: "Triple Sec" },
      { unit: "cl", amount: 2, ingredient: "Lemon juice" }
    ],
    preparation: "Shake with ice cubes. Strain into large cocktail glass."
  },
  {
    name: "Harvey Wallbanger",
    glass: "highball",
    category: "All Day Cocktail",
    ingredients: [
      { unit: "cl", amount: 4.5, ingredient: "Vodka" },
      { unit: "cl", amount: 1.5, ingredient: "Galliano" },
      { unit: "cl", amount: 9, ingredient: "Orange juice" }
    ],
    garnish: "Orance slice and a cherry",
    preparation:
      "Build vodka and orange juice into a highball glass filled with ice. Stir gently and float Galliano on top."
  }
];

const ingArr = []; // create a unique list of ingredients from array of drink recipes

drinks.forEach(oneDrink => {
  oneDrink.ingredients.forEach(oneIngredient => {
    if (oneIngredient.ingredient) {
      if (!ingArr.includes(oneIngredient.ingredient))
        ingArr.push(oneIngredient.ingredient);
    }
  });
});

const ingredients = [];

ingArr.forEach(oneIngredient => {
  const ingObj = {
    name: oneIngredient
  };
  ingredients.push(ingObj);
});

mongoose
  .connect(`mongodb://localhost/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    return Ingredient.create(ingredients);
  })
  .then(createdIng => {
    console.log(`Inserted ${createdIng.length} into database`);
  })
  .then(() => mongoose.connection.close())
  .then(() => {
    console.log("Connection closed succesfully!");
  })
  .catch(err => {
    console.log(err);
  });
