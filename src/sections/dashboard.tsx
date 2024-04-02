"use client";
import { searchFood } from "@/app/actions";
import { Food, FoodResponse, Hint } from "@/model/food";
import React from "react";

const DashboardSection = () => {
  const [searchIngr, setSearchIngr] = React.useState<string>("");
  const [foods, setFoods] = React.useState<Hint[] | null>(null);
  const [selectedFood, setSelectedFood] = React.useState<Food[] | null>(null);

  const handleSearchIngr = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchIngr(e.target.value);
  };

  const handleSelectFood = (food: Food) => {
    // find if selected food already exist in selectedFood list
    if (selectedFood && selectedFood?.length) {
      const selectedFoodIndex = selectedFood?.find((f) =>
        f.foodId.includes(food.foodId)
      );

      if (selectedFoodIndex) {
        const filteredFoods = selectedFood.filter((f) =>
          f.foodId.includes(food.foodId)
        );
        setSelectedFood(filteredFoods);
      } else {
        setSelectedFood((prev) => [...prev, food]);
      }
    } else {
      setSelectedFood([food]);
    }
  };

  const fetchIngredients = async (params: string) => {
    searchFood(params)
      .then((res: FoodResponse | null) => {
        if (res && res.hints.length > 0) setFoods(res?.hints);
      })
      .catch((err: Error) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    fetchIngredients(searchIngr);
  }, [searchIngr]);

  return (
    <div className="container mx-auto p-4 mt-20">
      <div className="flex justify-between item-center bg-white p-4 shadow rounded">
        <h1 className="text-xl font-semibold">SeeFood</h1>
      </div>

      <div className="mt-4 bg-white shadow rounded-lg">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Search</h2>
          <div className="mt-6">
            <div className="relative rounded-full shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#2c3e508f"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="block w-full rounded-full border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:pl-3 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleSearchIngr}
                value={searchIngr}
              />
            </div>
          </div>
          <div className="mt-4 w-full">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-1 px-4 w-32 rounded-md">
              Add
            </button>
          </div>
        </div>
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left font-bold text-gray-500 uppercase tracking-wider p-4">
                Label
              </th>
              <th className="text-left font-bold text-gray-500 uppercase tracking-wider p-4">
                Kcal
              </th>
              <th className="text-left font-bold text-gray-500 uppercase tracking-wider p-4">
                Protein(g)
              </th>
              <th className="text-left font-bold text-gray-500 uppercase tracking-wider p-4">
                Fat(g)
              </th>
              <th className="text-left font-bold text-gray-500 uppercase tracking-wider p-4">
                Carbs(g)
              </th>
            </tr>
          </thead>

          <tbody>
            {foods &&
              foods.map((food) => (
                <tr key={food.food.label} className="hover:bg-gray-100">
                  <td className="p-4">
                    {/* add checkbox */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded bg-white checked:bg-indigo-600 checked:border-indigo-600"
                        onClick={() => handleSelectFood(food.food)}
                      />
                      <span className="ml-2 text-gray-700 font-semibold">
                        {food.food.label}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    {Math.round(food.food.nutrients.ENERC_KCAL)} kcal
                  </td>
                  <td className="p-4">
                    {Math.round(food.food.nutrients.PROCNT)}g
                  </td>
                  <td className="p-4">
                    {Math.round(food.food.nutrients.FAT)}g
                  </td>
                  <td className="p-4">
                    {Math.round(food.food.nutrients.CHOCDF)}g
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 bg-white shadow rounded-lg">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Nutritional Totals</h2>
        </div>
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider p-4">
                Food Items
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider p-4">
                Calories
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider p-4">
                Protein
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider p-4">
                Carbs
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider p-4">
                Fats
              </th>
            </tr>
          </thead>
          <tbody>{/* TODO: Insert selected foods items here */}</tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardSection;
