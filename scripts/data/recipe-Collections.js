const recipeList = [
  {
    id: 1,
    name: "Vanilla Sponge Cake",
    image: "tumbnail-images/recipe-Images/recipe-Vanilla-Sponge-Cake.png",
    category: "Cake",
    featured: true,
    description: "Light, airy, and delicately sweet — perfect for layer cakes and celebration bakes.",
    prepTime: "15 mins",
    cookTime: "25 mins",
    totalTime: "40 mins",
    servings: 8,
    ingredients: [
      "4 large eggs (room temp)",
      "1 cup (200 g) granulated sugar",
      "1 cup (125 g) all-purpose flour, sifted",
      "1 tsp baking powder",
      "1/4 tsp salt",
      "2 tbsp milk",
      "2 tbsp unsalted butter, melted",
      "1 tsp vanilla extract"
    ],
    steps: [
      "Preheat oven to 180°C (350°F). Grease and line an 8-inch round pan.",
      "Whisk eggs and sugar in a bowl over a warm water bath until warm to touch, then beat until thick and pale (ribbon stage).",
      "Fold in sifted flour, baking powder and salt gently in two additions to keep air in the batter.",
      "Combine milk, melted butter and vanilla; fold into batter carefully.",
      "Pour into pan and bake 20–25 minutes or until a skewer comes out clean.",
      "Cool 10 minutes in pan, then turn out onto a rack to cool completely before slicing or layering."
    ],
    notes: "For extra richness, brush layers with a simple sugar syrup before frosting."
  },

  {
    id: 2,
    name: "Apple Scones",
    image: "tumbnail-images/recipe-Images/recipe-Apple-Scones.png",
    category: "Pastry",
    featured: true,
    description: "Buttery, tender scones studded with fresh apple pieces — perfect with tea.",
    prepTime: "15 mins",
    cookTime: "18 mins",
    totalTime: "33 mins",
    servings: 8,
    ingredients: [
      "2 cups (250 g) all-purpose flour",
      "1/4 cup (50 g) sugar",
      "2 tsp baking powder",
      "1/2 tsp salt",
      "6 tbsp cold unsalted butter, cubed",
      "1 cup diced apple (peeled)",
      "3/4 cup milk (plus extra to brush)",
      "1 egg"
    ],
    steps: [
      "Preheat oven to 220°C (425°F). Line a baking sheet.",
      "Whisk flour, sugar, baking powder and salt. Cut in cold butter until mixture resembles coarse crumbs.",
      "Stir in diced apple.",
      "Whisk milk and egg then fold into dry mix until just combined (don't overmix).",
      "Turn onto floured surface, pat to 1-inch thickness and cut into rounds.",
      "Brush with milk and bake 15–18 minutes until golden. Cool slightly and serve warm."
    ],
    notes: "Use tart apples like Granny Smith for balance; add a pinch of cinnamon if desired."
  },

  {
    id: 3,
    name: "Classic White Bread",
    image: "tumbnail-images/recipe-Images/recipe-Classic-White-Bread.png",
    category: "Bread",
    featured: true,
    description: "A soft and versatile loaf with a tender crumb — great for sandwiches or toasting.",
    prepTime: "15 mins (plus rising)",
    cookTime: "30–35 mins",
    totalTime: "3 hrs (including rises)",
    servings: 10,
    ingredients: [
      "3 1/2 cups (420 g) all-purpose flour",
      "2 tsp instant yeast",
      "1 1/4 tsp salt",
      "1 tbsp sugar",
      "1 1/4 cups warm water (around 40°C / 105°F)",
      "2 tbsp unsalted butter, softened"
    ],
    steps: [
      "In a bowl combine flour, yeast, sugar and salt.",
      "Add warm water and butter; mix until a rough dough forms.",
      "Knead 8–10 minutes until smooth and elastic (or use stand mixer).",
      "Place in lightly oiled bowl, cover and let rise until doubled (about 1–1.5 hours).",
      "Punch down, shape into a loaf, place in a greased loaf pan and let rise again until domed (~45 mins).",
      "Bake at 200°C (400°F) for 30–35 minutes or until golden and hollow-sounding. Cool on a rack."
    ],
    notes: "Tap the bottom — it should sound hollow when fully baked. For softer crust, brush with melted butter after baking."
  },

  {
    id: 4,
    name: "Chocolate Fudge Cake",
    image: "tumbnail-images/recipe-Images/recipe-Chocolate-Fudge-Cake.png",
    category: "Cake",
    featured: true,
    description: "Decadent, moist chocolate cake layered with silky fudge frosting.",
    prepTime: "20 mins",
    cookTime: "30–35 mins",
    totalTime: "1 hr",
    servings: 10,
    ingredients: [
      "1 3/4 cups (220 g) all-purpose flour",
      "3/4 cup (75 g) cocoa powder",
      "1 1/2 tsp baking powder",
      "1 1/2 tsp baking soda",
      "2 cups (400 g) sugar",
      "2 eggs",
      "1 cup milk",
      "1/2 cup vegetable oil",
      "1 tsp vanilla",
      "1 cup boiling water"
    ],
    steps: [
      "Preheat oven to 180°C (350°F). Grease two 8-inch pans.",
      "Whisk flour, cocoa, baking powder, baking soda and sugar.",
      "Add eggs, milk, oil and vanilla; beat until combined.",
      "Stir in boiling water (batter will be thin).",
      "Pour into pans and bake 30–35 minutes or until a skewer comes out mostly clean.",
      "Cool completely then frost with your favourite fudge frosting."
    ],
    notes: "Use high-quality cocoa for best flavor. The hot water blooms the cocoa for extra chocolateiness."
  },

  {
    id: 5,
    name: "Gingerbread Cookies",
    image: "tumbnail-images/recipe-Images/Gingerbread.png",
    category: "Cookies",
    featured: false,
    description: "Warm spiced cookies with classic gingerbread flavor — great for cutting into shapes.",
    holidays: ["Christmas"],
    prepTime: "20 mins (plus chilling)",
    cookTime: "8–10 mins",
    totalTime: "1 hr",
    servings: 24,
    ingredients: [
      "3 cups (375 g) all-purpose flour",
      "1 tbsp ground ginger",
      "2 tsp ground cinnamon",
      "1/2 tsp ground cloves",
      "1 tsp baking soda",
      "1/2 tsp salt",
      "3/4 cup (170 g) unsalted butter, softened",
      "3/4 cup (165 g) brown sugar",
      "1 egg",
      "1/2 cup molasses"
    ],
    steps: [
      "Whisk flour, spices, baking soda and salt.",
      "Cream butter and brown sugar until light, add egg and molasses.",
      "Gradually add dry mix until combined. Chill dough 30–60 minutes.",
      "Roll to 1/4-inch thickness, cut shapes and place on lined sheet.",
      "Bake 8–10 minutes at 180°C (350°F). Cool on wire rack before decorating."
    ],
    notes: "Chilling the dough helps shapes hold during baking."
  },

  {
    id: 6,
    name: "Christmas Fruit Cake",
    image: "tumbnail-images/recipe-Images/Fruit Cake.png",
    category: "Cake",
    featured: false,
    description: "A rich, boozy (optional) fruit cake loaded with candied fruits and nuts — traditional festive bake.",
    holidays: ["Christmas"],
    prepTime: "30 mins (plus soaking)",
    cookTime: "2 hrs",
    totalTime: "3+ hrs",
    servings: 12,
    ingredients: [
      "2 cups mixed dried fruit (raisins, sultanas, cherries)",
      "1/2 cup candied peel, chopped",
      "1/2 cup brandy or orange juice (for soaking)",
      "1 1/2 cups (190 g) flour",
      "1/2 cup (100 g) brown sugar",
      "1 tsp baking powder",
      "1/2 tsp mixed spice",
      "3/4 cup butter, softened",
      "2 eggs",
      "1/2 cup chopped nuts (optional)"
    ],
    steps: [
      "Soak fruit and peel in brandy or juice for at least 2 hours or overnight.",
      "Preheat oven to 150°C (300°F). Grease and line a deep round tin.",
      "Cream butter and sugar; beat in eggs one at a time.",
      "Fold in sifted flour, baking powder and mixed spice, then stir in soaked fruit and nuts.",
      "Spoon into tin, level surface and bake 1.5–2 hours until a skewer comes out clean.",
      "Cool in tin, then wrap and store; feed with a little brandy every few days for extra richness (optional)."
    ],
    notes: "This cake improves with age — make it a week ahead if possible."
  },

  {
    id: 7,
    name: "Yule Log Cake (Bûche de Noël)",
    image: "tumbnail-images/recipe-Images/Yule Log.png",
    category: "Cake",
    featured: false,
    description: "Chocolate sponge rolled and filled with cream, decorated to look like a festive log.",
    holidays: ["Christmas"],
    prepTime: "25 mins",
    cookTime: "10–12 mins (sponge)",
    totalTime: "1 hr 15 mins",
    servings: 10,
    ingredients: [
      "4 eggs",
      "1/2 cup sugar",
      "1/3 cup flour",
      "1/4 cup cocoa powder",
      "1 tsp vanilla",
      "1 cup whipped cream (for filling)",
      "Chocolate buttercream for coating"
    ],
    steps: [
      "Preheat oven to 200°C (400°F). Line a jelly-roll pan and dust with cocoa.",
      "Whisk eggs and sugar until thick; fold in flour and cocoa gently.",
      "Spread into pan and bake 10–12 minutes until springy.",
      "Turn onto sugared paper, roll up while warm and let cool.",
      "Unroll, spread whipped cream, re-roll and chill.",
      "Cover with chocolate buttercream and texture with a fork to mimic bark."
    ],
    notes: "Dust with icing sugar for a snowy effect and add meringue mushrooms for decoration."
  },

  {
    id: 8,
    name: "Sugar Cookies",
    image: "tumbnail-images/recipe-Images/Sugar Cookies.png",
    category: "Cookies",
    featured: false,
    description: "Soft, buttery cookies that are perfect for cutting and decorating.",
    holidays: ["Christmas"],
    prepTime: "20 mins (plus chilling)",
    cookTime: "8–10 mins",
    totalTime: "1 hr",
    servings: 24,
    ingredients: [
      "2 3/4 cups (345 g) all-purpose flour",
      "1 tsp baking soda",
      "1/2 tsp baking powder",
      "1 cup (225 g) butter, softened",
      "1 1/2 cups sugar",
      "1 egg",
      "1 tsp vanilla"
    ],
    steps: [
      "Preheat oven to 190°C (375°F).",
      "Whisk flour, baking soda and baking powder.",
      "Cream butter and sugar, add egg and vanilla, then slowly add dry ingredients.",
      "Chill dough 30 minutes, roll out and cut shapes.",
      "Bake 8–10 minutes until edges are just golden. Cool and decorate."
    ],
    notes: "Royal icing or simple powdered sugar glaze works well for decorating."
  },

  {
    id: 9,
    name: "Pumpkin Pie",
    image: "tumbnail-images/recipe-Images/Pumpkin Pie.png",
    category: "Pie",
    featured: false,
    description: "Silky spiced pumpkin filling baked in a flaky pastry — Thanksgiving classic.",
    holidays: ["Thanksgiving"],
    prepTime: "20 mins",
    cookTime: "50–60 mins",
    totalTime: "1 hr 30 mins",
    servings: 8,
    ingredients: [
      "1 (9-inch) pie crust (rolled)",
      "2 cups pumpkin puree",
      "1 cup condensed milk or 1 cup milk + 1/2 cup sugar",
      "2 large eggs",
      "1 tsp cinnamon",
      "1/2 tsp ginger",
      "1/4 tsp cloves",
      "1/2 tsp salt"
    ],
    steps: [
      "Preheat oven to 220°C (425°F).",
      "Beat pumpkin, eggs, spices and milk (or sweetened condensed milk) until smooth.",
      "Pour into pie crust, bake 15 minutes at 220°C then reduce to 175°C (350°F) and bake 35–45 minutes until set.",
      "Cool completely to allow filling to finish setting before slicing."
    ],
    notes: "Serve with lightly whipped cream and a dusting of cinnamon."
  },

  {
    id: 10,
    name: "Pecan Pie",
    image: "tumbnail-images/recipe-Images/Pecan Pie.png",
    category: "Pie",
    featured: false,
    description: "Sweet gooey filling studded with toasted pecans in a crisp crust — a holiday favorite.",
    holidays: ["Thanksgiving"],
    prepTime: "15 mins",
    cookTime: "50–60 mins",
    totalTime: "1 hr 20 mins",
    servings: 8,
    ingredients: [
      "1 (9-inch) pie crust",
      "1 cup corn syrup (light or dark)",
      "1 cup brown sugar",
      "3 eggs",
      "4 tbsp melted butter",
      "1 tsp vanilla",
      "1 1/2 cups pecan halves"
    ],
    steps: [
      "Preheat oven to 175°C (350°F).",
      "Mix corn syrup, brown sugar, eggs, melted butter and vanilla.",
      "Stir in pecans, pour into crust, and bake 50–60 minutes until filling is set but slightly jiggly in center.",
      "Cool before slicing."
    ],
    notes: "Toast pecans lightly for deeper flavor before adding."
  },

  {
    id: 11,
    name: "Apple Cider Donuts",
    image: "tumbnail-images/recipe-Images/Apple Cider Donuts.png",
    category: "Pastry",
    featured: false,
    description: "Light cake donuts flavored with apple cider and dusted with cinnamon sugar.",
    holidays: ["Thanksgiving"],
    prepTime: "20 mins",
    cookTime: "10 mins (fry) / 12–15 mins (bake)",
    totalTime: "40 mins",
    servings: 12,
    ingredients: [
      "2 1/2 cups flour",
      "2 tsp baking powder",
      "1 tsp baking soda",
      "1/2 tsp salt",
      "1 tsp cinnamon",
      "1/2 cup sugar",
      "1/2 cup apple cider",
      "2 eggs",
      "1/4 cup butter, melted"
    ],
    steps: [
      "Whisk dry ingredients. Combine wet ingredients separately.",
      "Fold wet into dry until just combined.",
      "Pipe or shape into donut rings. Fry until golden or bake at 180°C (350°F) for 12–15 minutes.",
      "Toss warm donuts in cinnamon sugar."
    ],
    notes: "To intensify cider flavor, reduce 1 cup cider on stove to 1/4 cup and use that concentrate."
  },

  {
    id: 12,
    name: "Cornbread",
    image: "tumbnail-images/recipe-Images/Cornbread.png",
    category: "Bread",
    featured: false,
    description: "Moist, golden cornbread with a lightly sweet, crumbly texture — great alongside stews.",
    holidays: ["Thanksgiving"],
    prepTime: "10 mins",
    cookTime: "20–25 mins",
    totalTime: "35 mins",
    servings: 8,
    ingredients: [
      "1 cup cornmeal",
      "1 cup all-purpose flour",
      "1/4 cup sugar",
      "4 tsp baking powder",
      "1/2 tsp salt",
      "1 cup milk",
      "1 egg",
      "1/4 cup melted butter"
    ],
    steps: [
      "Preheat oven to 200°C (400°F). Grease an 8-inch square pan.",
      "Whisk dry ingredients, then stir in milk, egg and melted butter until just combined.",
      "Pour into pan and bake 20–25 minutes until golden and a skewer is clean.",
      "Serve warm with butter or honey."
    ],
    notes: "For a crisp top, bake in a preheated cast-iron skillet."
  },

  {
    id: 13,
    name: "Carrot Cake (with Walnuts)",
    image: "tumbnail-images/recipe-Images/Carrot Walnut Cake.png",
    category: "Cake",
    featured: false,
    description: "Moist carrot cake with warm spices and crunchy walnuts, finished with cream cheese frosting.",
    holidays: ["Easter"],
    prepTime: "20 mins",
    cookTime: "30–35 mins",
    totalTime: "1 hr",
    servings: 10,
    ingredients: [
      "2 cups grated carrots",
      "1 1/4 cups sugar",
      "1 cup vegetable oil",
      "3 eggs",
      "2 cups flour",
      "2 tsp baking powder",
      "1 tsp cinnamon",
      "1/2 tsp nutmeg",
      "1/2 cup chopped walnuts"
    ],
    steps: [
      "Preheat oven to 180°C (350°F). Grease and line an 8–9 inch pan.",
      "Mix wet ingredients then stir in dry ingredients and grated carrots, fold in walnuts.",
      "Bake 30–35 minutes until a skewer comes out clean.",
      "Cool and frost with cream cheese frosting."
    ],
    notes: "Add pineapple for extra moisture (drain well)."
  },

  {
    id: 14,
    name: "Chocolate Eggs (Homemade Filled Eggs)",
    image: "tumbnail-images/recipe-Images/Chocolate Eggs.png",
    category: "Confection",
    featured: false,
    description: "Molded chocolate eggs with optional fillings — a fun, simple Easter treat.",
    holidays: ["Easter"],
    prepTime: "30 mins",
    cookTime: "none (chill time)",
    totalTime: "1.5 hrs",
    servings: 12,
    ingredients: [
      "400 g good quality chocolate (dark or milk), chopped",
      "Optional fillings: peanut butter, ganache, caramel"
    ],
    steps: [
      "Melt chocolate in a double boiler, temper if you want a shiny snap.",
      "Brush a bit of chocolate into egg molds, chill to set and repeat for a thicker shell.",
      "Fill half the shells with chosen filling, seal with more melted chocolate, and chill until set.",
      "Remove from molds and store in a cool place."
    ],
    notes: "Work on a cool surface and avoid moisture to keep chocolate glossy."
  },

  {
    id: 15,
    name: "Hot Cross Buns",
    image: "tumbnail-images/recipe-Images/Hot Cross Buns.png",
    category: "Bread",
    featured: false,
    description: "Soft, spiced sweet buns with currants and a marked cross — Easter classic.",
    holidays: ["Easter"],
    prepTime: "25 mins (plus rising)",
    cookTime: "20–22 mins",
    totalTime: "2.5 hrs",
    servings: 12,
    ingredients: [
      "4 cups (500 g) all-purpose flour",
      "1/4 cup sugar",
      "2 tsp mixed spice",
      "2 tsp active dry yeast",
      "1 1/4 cups warm milk",
      "1 egg",
      "3 tbsp butter",
      "1 cup currants"
    ],
    steps: [
      "Activate yeast in warm milk with a pinch of sugar.",
      "Mix flour, sugar and spices; add milk mixture, egg and butter, knead to smooth dough.",
      "Fold in currants, let dough rise until doubled (~1 hr).",
      "Divide into 12, shape, arrange on a tray and prove until puffy (~45 mins).",
      "Pipe a flour paste cross on each bun and bake at 200°C (400°F) for 20–22 minutes.",
      "Brush with warm apricot jam to glaze once out of oven."
    ],
    notes: "A soft glaze of warmed jam gives shine and slight sweetness."
  },

  {
    id: 16,
    name: "Easter Cookies",
    image: "tumbnail-images/recipe-Images/Easter Cookies.png",
    category: "Cookies",
    featured: false,
    description: "Cute, colorful cookies shaped for Easter — easy to bake and decorate.",
    holidays: ["Easter"],
    prepTime: "20 mins (plus chilling)",
    cookTime: "8–10 mins",
    totalTime: "1 hr",
    servings: 24,
    ingredients: [
      "2 3/4 cups (345 g) flour",
      "1 tsp baking soda",
      "1/2 tsp baking powder",
      "1 cup butter, softened",
      "1 1/2 cups sugar",
      "1 egg",
      "1 tsp vanilla",
      "Food coloring / sprinkles for decorating"
    ],
    steps: [
      "Preheat oven to 190°C (375°F). Whisk dry ingredients.",
      "Cream butter and sugar, add egg and vanilla; mix in dry ingredients.",
      "Chill dough 30 minutes, roll and cut shapes, bake 8–10 minutes.",
      "Cool and decorate with icing and sprinkles."
    ],
    notes: "Use small piping tips for neat decorations; let icing set fully before stacking."
  }
];
