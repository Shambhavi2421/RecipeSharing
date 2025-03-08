import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/UseGetUserID";
import axios from "axios";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("https://backend-1pcr.onrender.com/recipe");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://backend-1pcr.onrender.com/recipe/saved/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("https://backend-1pcr.onrender.com/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);


  return (
    <div>
<div class="carousel-container mt-5">
    <div id="recipeCarousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
        
        <div class="carousel-indicators">
            <button type="button" data-bs-target="#recipeCarousel" data-bs-slide-to="0" class="active"></button>
            <button type="button" data-bs-target="#recipeCarousel" data-bs-slide-to="1"></button>
            <button type="button" data-bs-target="#recipeCarousel" data-bs-slide-to="2"></button>
        </div>

        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="pasta.jpg" class="d-block w-100" alt="Spicy Pasta"/>
                <div class="carousel-caption">
                    <h5>Spicy Pasta</h5>
                    <p>Try this delicious spicy pasta for a quick dinner!</p>
                </div>
            </div>
            <div class="carousel-item">
                <img src="salad1.jpg" class="d-block w-100" alt="Healthy Salad"/>
                <div class="carousel-caption">
                    <h5>Healthy Salad</h5>
                    <p>A fresh and healthy salad packed with nutrients!</p>
                </div>
            </div>
            <div class="carousel-item">
                <img src="chocolate cake.jpg" class="d-block w-100" alt="Chocolate Cake"/>
                <div class="carousel-caption">
                    <h5>Chocolate Cake</h5>
                    <p>Indulge in a rich and creamy chocolate cake!</p>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="row row-cols-1 row-cols-md-4 g-3">
  <div class="col">
    <div class="card h-100">
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              <button 
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
              ><i class="fa-solid fa-bookmark"></i>
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
              </button>
            </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.photoUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.time} minutes</p>
          </li>
        ))}
      </ul>
      </div>
    </div>
  </div>
</div> 

  )
}

export default Home
