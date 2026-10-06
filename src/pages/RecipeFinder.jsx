import { useEffect, useMemo, useState } from "react";
import {
  ChefHat,
  Clock3,
  Heart,
  Search,
  Star,
  Users,
  X,
} from "lucide-react";

const STORAGE_KEY = "recipefinder_favorites";

const recipes = [
  {
    id: 1,
    name: "Creamy Garlic Pasta",
    category: "Dinner",
    diet: "Vegetarian",
    time: 25,
    servings: 2,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80",
    description:
      "A quick and creamy pasta dish with garlic, parmesan, herbs, and a smooth sauce.",
    ingredients: [
      "200g pasta",
      "3 garlic cloves",
      "1 cup cooking cream",
      "50g parmesan",
      "1 tbsp olive oil",
      "Fresh parsley",
      "Salt and pepper",
    ],
    instructions: [
      "Cook the pasta according to the package instructions.",
      "Heat olive oil and sauté the garlic until fragrant.",
      "Add the cream and simmer for a few minutes.",
      "Stir in parmesan, salt, and pepper.",
      "Add the cooked pasta and toss until coated.",
      "Finish with fresh parsley and serve.",
    ],
  },
  {
    id: 2,
    name: "Chicken Avocado Bowl",
    category: "Lunch",
    diet: "High Protein",
    time: 30,
    servings: 2,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
    description:
      "A balanced bowl with grilled chicken, avocado, vegetables, and rice.",
    ingredients: [
      "250g chicken breast",
      "1 avocado",
      "1 cup cooked rice",
      "Cherry tomatoes",
      "Cucumber",
      "Lettuce",
      "Olive oil",
      "Lemon juice",
    ],
    instructions: [
      "Season the chicken with salt, pepper, and your preferred spices.",
      "Grill the chicken until fully cooked.",
      "Slice the avocado, cucumber, and tomatoes.",
      "Add rice and vegetables to a bowl.",
      "Slice the chicken and place it on top.",
      "Finish with lemon juice and olive oil.",
    ],
  },
  {
    id: 3,
    name: "Berry Oatmeal",
    category: "Breakfast",
    diet: "Healthy",
    time: 10,
    servings: 1,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=900&q=80",
    description:
      "Warm oatmeal topped with fresh berries, banana, honey, and nuts.",
    ingredients: [
      "1/2 cup oats",
      "1 cup milk",
      "Strawberries",
      "Blueberries",
      "1 banana",
      "1 tsp honey",
      "Almonds",
    ],
    instructions: [
      "Combine oats and milk in a saucepan.",
      "Cook over medium heat until creamy.",
      "Slice the banana and berries.",
      "Transfer oatmeal to a bowl.",
      "Top with fruit, almonds, and honey.",
    ],
  },
  {
    id: 4,
    name: "Mediterranean Salad",
    category: "Salad",
    diet: "Vegetarian",
    time: 15,
    servings: 2,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80",
    description:
      "Fresh Mediterranean salad with vegetables, feta cheese, olives, and herbs.",
    ingredients: [
      "2 tomatoes",
      "1 cucumber",
      "1/2 red onion",
      "Feta cheese",
      "Black olives",
      "Fresh parsley",
      "Olive oil",
      "Lemon juice",
    ],
    instructions: [
      "Chop the tomatoes, cucumber, and onion.",
      "Add the vegetables to a large bowl.",
      "Add feta cheese and olives.",
      "Mix olive oil and lemon juice.",
      "Pour the dressing over the salad.",
      "Finish with parsley and serve.",
    ],
  },
  {
    id: 5,
    name: "Beef Burger",
    category: "Dinner",
    diet: "High Protein",
    time: 35,
    servings: 2,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
    description:
      "Juicy homemade beef burgers with lettuce, tomato, cheese, and sauce.",
    ingredients: [
      "300g ground beef",
      "2 burger buns",
      "2 cheese slices",
      "Lettuce",
      "Tomato",
      "Onion",
      "Burger sauce",
      "Salt and pepper",
    ],
    instructions: [
      "Season the beef with salt and pepper.",
      "Shape the beef into burger patties.",
      "Cook the patties until your preferred doneness.",
      "Toast the burger buns.",
      "Add sauce, lettuce, tomato, onion, and cheese.",
      "Place the beef patty inside and serve.",
    ],
  },
  {
    id: 6,
    name: "Vegetable Stir Fry",
    category: "Dinner",
    diet: "Vegan",
    time: 20,
    servings: 2,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
    description:
      "Colorful vegetables quickly cooked with a flavorful Asian-inspired sauce.",
    ingredients: [
      "Broccoli",
      "Bell pepper",
      "Carrot",
      "Snow peas",
      "Mushrooms",
      "Soy sauce",
      "Sesame oil",
      "Garlic",
    ],
    instructions: [
      "Wash and cut all vegetables.",
      "Heat sesame oil in a large pan.",
      "Add garlic and cook briefly.",
      "Add the vegetables and stir fry.",
      "Add soy sauce and continue cooking.",
      "Serve immediately.",
    ],
  },
];

const filters = ["All", "Breakfast", "Lunch", "Dinner", "Salad"];
const diets = ["All", "Vegetarian", "Vegan", "Healthy", "High Protein"];

function RecipeFinder() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [diet, setDiet] = useState("All");
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesSearch =
        recipe.name.toLowerCase().includes(search.toLowerCase()) ||
        recipe.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || recipe.category === category;

      const matchesDiet = diet === "All" || recipe.diet === diet;

      const matchesFavorite =
        !favoritesOnly || favorites.includes(recipe.id);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesDiet &&
        matchesFavorite
      );
    });
  }, [search, category, diet, favorites, favoritesOnly]);

  function toggleFavorite(id) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id],
    );
  }

  function clearFilters() {
    setSearch("");
    setCategory("All");
    setDiet("All");
    setFavoritesOnly(false);
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <section className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-400/10 px-3 py-1 text-sm text-orange-300">
            <ChefHat size={15} />
            
          </div>

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-orange-400">
                RecipeFinder
              </p>

              <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
                Find something delicious.
              </h1>

              <p className="mt-3 max-w-2xl text-slate-400">
                Search recipes, explore dietary options, and save your
                favorites.
              </p>
            </div>

            <button
              onClick={() => setFavoritesOnly((current) => !current)}
              className={`inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-3 font-medium transition ${
                favoritesOnly
                  ? "border-red-400/30 bg-red-400/10 text-red-300"
                  : "border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-600 hover:text-white"
              }`}
            >
              <Heart
                size={18}
                fill={favoritesOnly ? "currentColor" : "none"}
              />
              Favorites ({favorites.length})
            </button>
          </div>
        </section>

        {/* Search */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-xl shadow-black/10">
          <div className="relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search recipes..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-12 pr-4 outline-none transition placeholder:text-slate-600 focus:border-orange-500"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {filters.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  category === item
                    ? "bg-orange-500 text-slate-950"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-sm text-slate-500">Diet:</span>

            {diets.map((item) => (
              <button
                key={item}
                onClick={() => setDiet(item)}
                className={`rounded-full px-3 py-1.5 text-xs transition ${
                  diet === item
                    ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}

            {(search ||
              category !== "All" ||
              diet !== "All" ||
              favoritesOnly) && (
              <button
                onClick={clearFilters}
                className="ml-auto text-sm text-orange-400 hover:text-orange-300"
              >
                Clear filters
              </button>
            )}
          </div>
        </section>

        {/* Results */}
        <section className="mt-8">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">
                {favoritesOnly ? "Your Favorites" : "Recipes"}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {filteredRecipes.length} recipe
                {filteredRecipes.length === 1 ? "" : "s"} found
              </p>
            </div>
          </div>

          {filteredRecipes.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-700 py-20 text-center">
              <ChefHat
                size={42}
                className="mx-auto mb-4 text-slate-600"
              />

              <h3 className="text-lg font-semibold">
                No recipes found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Try another search or clear your filters.
              </p>

              <button
                onClick={clearFilters}
                className="mt-5 rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-slate-950"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  isFavorite={favorites.includes(recipe.id)}
                  onFavorite={() => toggleFavorite(recipe.id)}
                  onOpen={() => setSelectedRecipe(recipe)}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Recipe modal */}
      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          isFavorite={favorites.includes(selectedRecipe.id)}
          onFavorite={() => toggleFavorite(selectedRecipe.id)}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </main>
  );
}

function RecipeCard({ recipe, isFavorite, onFavorite, onOpen }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 shadow-xl shadow-black/10 transition hover:-translate-y-1 hover:border-slate-700">
      <div className="relative h-56 overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <button
          onClick={onFavorite}
          aria-label={
            isFavorite
              ? `Remove ${recipe.name} from favorites`
              : `Add ${recipe.name} to favorites`
          }
          className={`absolute right-4 top-4 rounded-full p-2.5 backdrop-blur-md transition ${
            isFavorite
              ? "bg-red-500 text-white"
              : "bg-black/40 text-white hover:bg-black/60"
          }`}
        >
          <Heart
            size={18}
            fill={isFavorite ? "currentColor" : "none"}
          />
        </button>

        <div className="absolute bottom-4 left-4 flex gap-2">
          <span className="rounded-full bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-md">
            {recipe.category}
          </span>

          <span className="rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-medium text-slate-950">
            {recipe.diet}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold">{recipe.name}</h3>

          <div className="flex shrink-0 items-center gap-1 text-sm text-yellow-400">
            <Star size={15} fill="currentColor" />
            {recipe.rating}
          </div>
        </div>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">
          {recipe.description}
        </p>

        <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <Clock3 size={14} />
            {recipe.time} min
          </span>

          <span className="inline-flex items-center gap-1.5">
            <Users size={14} />
            {recipe.servings} servings
          </span>
        </div>

        <button
          onClick={onOpen}
          className="mt-5 w-full rounded-xl bg-orange-500 py-3 font-semibold text-slate-950 transition hover:bg-orange-400"
        >
          View Recipe
        </button>
      </div>
    </article>
  );
}

function RecipeModal({
  recipe,
  isFavorite,
  onFavorite,
  onClose,
}) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 p-4 backdrop-blur-sm">
      <div className="mx-auto my-8 max-w-4xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">
        <div className="relative h-64 sm:h-80">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/20" />

          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full bg-black/50 p-2 text-white backdrop-blur-md hover:bg-black/70"
          >
            <X size={20} />
          </button>

          <div className="absolute bottom-5 left-5 right-5">
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-slate-950">
                {recipe.category}
              </span>

              <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-slate-950">
                {recipe.diet}
              </span>
            </div>

            <h2 className="text-3xl font-bold sm:text-4xl">
              {recipe.name}
            </h2>
          </div>
        </div>

        <div className="grid gap-8 p-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="flex flex-wrap gap-4 text-sm text-slate-400">
              <span className="inline-flex items-center gap-2">
                <Clock3 size={16} className="text-orange-400" />
                {recipe.time} minutes
              </span>

              <span className="inline-flex items-center gap-2">
                <Users size={16} className="text-orange-400" />
                {recipe.servings} servings
              </span>

              <span className="inline-flex items-center gap-2">
                <Star
                  size={16}
                  className="text-yellow-400"
                  fill="currentColor"
                />
                {recipe.rating}
              </span>
            </div>

            <p className="mt-5 leading-7 text-slate-400">
              {recipe.description}
            </p>

            <button
              onClick={onFavorite}
              className={`mt-5 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                isFavorite
                  ? "bg-red-500/15 text-red-300"
                  : "bg-slate-800 text-slate-300 hover:text-white"
              }`}
            >
              <Heart
                size={17}
                fill={isFavorite ? "currentColor" : "none"}
              />
              {isFavorite
                ? "Saved to Favorites"
                : "Save to Favorites"}
            </button>

            <div className="mt-8">
              <h3 className="text-lg font-semibold">Ingredients</h3>

              <ul className="mt-4 space-y-3">
                {recipe.ingredients.map((ingredient) => (
                  <li
                    key={ingredient}
                    className="flex items-center gap-3 text-sm text-slate-400"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Instructions</h3>

            <div className="mt-4 space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <div
                  key={instruction}
                  className="flex gap-4 rounded-xl border border-slate-800 bg-slate-950/50 p-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500 font-bold text-slate-950">
                    {index + 1}
                  </span>

                  <p className="pt-1 text-sm leading-6 text-slate-400">
                    {instruction}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeFinder;