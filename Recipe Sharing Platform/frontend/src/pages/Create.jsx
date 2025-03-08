import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/UseGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Create = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    steps: "",
    instructions: "",
    photoUrl: "",
    time: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleAddIngredient = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("https://backend-1pcr.onrender.com/recipe",
        { ...recipe },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("Recipe Created");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div class="create">
      <div className="recipe-create" >
        <h3>Share Your Recipe <i class="fa-solid fa-bowl-food"></i></h3>
        <span onSubmit={handleSubmit}>
        <h3 htmlFor="name">Name</h3>
        <input type ="text" id="name" name="name" placeholder='Recipe Name' value={recipe.name}
          onChange={handleChange}></input>
        
        <h3 htmlFor="description">Description</h3>
        <textarea id ="description" name="description" placeholder='Description' cols="60"  value={recipe.description}
          onChange={handleChange}></textarea><br/>
        
        <h3 htmlFor="ingredients">Ingredients</h3>
        {recipe.ingredients.map((ingredient, index) => (
          <input key={index} type="text" name="ingredients" value={ingredient}
            onChange={(event) => handleIngredientChange(event, index)}
          />
        ))}
        <button type="button" onClick={handleAddIngredient}>
          Add Ingredient
        </button>

        <h3 htmlFor="steps">Steps</h3>
        <textarea id ="steps" name="steps" placeholder='Steps for prepairing recipe' cols="60" value={recipe.steps}
        onChange={handleChange}>
        </textarea>

        <h3 htmlFor="instructions">Instructions</h3>
        <textarea id ="instructions" name="instructions" placeholder='Instructions' cols="60" value={recipe.instructions}
          onChange={handleChange}></textarea><br/>
        
        <h3 htmlFor="photoUrl">Image URL</h3>
        <input type ="text" id="photoUrl" name="photoUrl" placeholder='Upload Recipe Photo'value={recipe.photoUrl}
          onChange={handleChange}></input>
        
        <h3 htmlFor="cooking Time">Cooking Time (minutes)</h3>
        <input type="number" id="time" name="time" value={recipe.time}
          onChange={handleChange}
        />

        <button type="submit">Create Recipe</button>
      </span>
      </div>
    </div>
  )
}

export default Create
