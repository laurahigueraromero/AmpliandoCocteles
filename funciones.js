const fs = require("fs");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
// args contiene la url y demás info
fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=daiquiri")
  .then((res) => res.json())
  .then((data) => {
    data.drinks.forEach((coctel) => {
      console.log("🍹 " + coctel.strDrink);
      console.log("Instrucciones:", coctel.strInstructions);
      console.log("Ingredientes:");
      for (let i = 1; i <= 15; i++) {
        const ing = coctel[`strIngredient${i}`];
        const cant = coctel[`strMeasure${i}`];
        if (ing) {
          console.log(` - ${cant ? cant : ""} ${ing}`);
        }
      }
      console.log("\n------------------\n");
    });

    function guardarBebidas(bebidas) {
      let contenido = "";

      bebidas.forEach((coctel, index) => {
        contenido += `🍹 ${index + 1}. ${coctel.strDrink}\n`;
        contenido += `Instrucciones: ${coctel.strInstructions}\n`;
        contenido += `Ingredientes:\n`;

        for (let i = 1; i <= 15; i++) {
          const ingrediente = coctel[`strIngredient${i}`];
          const cantidad = coctel[`strMeasure${i}`];
          if (ingrediente) {
            contenido += `  - ${cantidad ? cantidad : ""} ${ingrediente}\n`;
          }
        }
        contenido += `\n---------------------------\n\n`;
      });

      fs.writeFileSync("cocteles.txt", contenido, "utf-8");
      console.log("archivo guardado!!!!");
    }
    guardarBebidas(data.drinks);
  });
