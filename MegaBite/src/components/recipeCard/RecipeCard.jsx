import "./recipeCard.css";
import porridge from "../../assets/porridge.jpg";

export default function RecipeCard() {
  return (
    <div className="recipeCard">
      <img src={porridge} alt="recipe thumbnail" />
    </div>
  );
}
