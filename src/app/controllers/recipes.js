const data = require('../../../public/data.json');
const fs = require('fs');

module.exports = {
    index(req,res) {
        return res.render("admin/recipes/index", { items: data.recipes });
    },

    create(req,res) {
        return res.render("admin/recipes/create");
    },

    edit(req,res) {
        const id = req.params.id;

        for(let i = 0; i < data.recipes.length; i++) {
            if(data.recipes[i].id == id) {
                return res.render(`admin/recipes/edit`, {recipe: data.recipes[i]});
            }
        }
    },

    show(req,res) {
        const id = req.params.id;

        for(let i = 0; i < data.recipes.length; i++) {
            if(data.recipes[i].id == id) {
                return res.render(`admin/recipes/show`, {item: data.recipes[i]});
            }
        }
    },

    put(req,res) {
        const { id } = req.body;
        let index = 0;
        console.log(id)
        const foundRecipe = data.recipes.find(function(recipe, foundIndex){
            if (id == recipe.id) {
                index = foundIndex;
                return true;
            }
        });

        if (!foundRecipe) return res.send("Recipe not found!");

        const recipe = {
            ...foundRecipe,
            ...req.body,
        }

        data.recipes[index] = recipe;

        fs.writeFile("./public/data.json", JSON.stringify(data, null, 4), function(err) {
            if (err) return res.send("Write file error!");

            return res.redirect("/admin/recipes");
        });
    },

    post(req,res) {
        const keys = Object.keys(req.body);

        for(key in keys) {
            if(req.body[key] == "") {
                return res.send("Please fill all the fields!");
            }
        }

        let { title, picture, ingredients, methods, info } = req.body;

        const id = Number(data.recipes.length + 1);

        data.recipes.push({
            id,
            title, 
            picture, 
            ingredients, 
            methods, 
            info
        });

        console.log(keys);

        fs.writeFile("./public/data.json", JSON.stringify(data, null, 4), function(err) {
            if (err) return res.send("Write file error!");

            return res.redirect("/admin/recipes");
        });
    },

    delete(req,res) {
        const { id } = req.body;

        const filteredRecipes = data.recipes.filter(function(recipes){
            return recipes.id != id;
        });

        data.recipes = filteredRecipes;
        
        fs.writeFile("./public/data.json", JSON.stringify(data, null, 4), function(err) {
            if (err) return res.send("Write file error!");

            return res.redirect("/admin/recipes");
        });
    }

}