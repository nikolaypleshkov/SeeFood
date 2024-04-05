"use client";
import { Food } from "@/model/food";
import Link from "next/link";
import React from "react";
import {
  collection,
  doc,
  deleteDoc,
  query,
  onSnapshot,
} from "firebase/firestore";
import { firestoreDB } from "@/lib/firebase";

const FirebaseFoods: React.FC = () => {
  const [fetchedFoods, setFetchedFoods] = React.useState<Food[] | null>(null);
  const [totalNutrients, setTotalNutrients] = React.useState({
    calories: 0,
    protein: 0,
    fat: 0,
    carbs: 0,
  });

  const deleteFood = async (foodId: string) => {
    const foodDocRef = doc(firestoreDB, "nutritions", foodId);
    try {
      await deleteDoc(foodDocRef);
      console.log("Food item deleted successfully");
    } catch (error) {
      console.error("Error deleting food item: ", error);
    }
  };
  React.useEffect(() => {
    const q = query(collection(firestoreDB, "nutritions"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const foodsArray: any = [];
      querySnapshot.forEach((doc) => {
        foodsArray.push({ ...doc.data().food, id: doc.id });
      });
      setFetchedFoods(foodsArray);
    });

    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    if (fetchedFoods) {
      const totals = fetchedFoods.reduce(
        (acc, food) => {
          acc.calories += Math.round(food.nutrients.ENERC_KCAL);
          acc.protein += Math.round(food.nutrients.PROCNT);
          acc.fat += Math.round(food.nutrients.FAT);
          acc.carbs += Math.round(food.nutrients.CHOCDF);
          return acc;
        },
        { calories: 0, protein: 0, fat: 0, carbs: 0 }
      );
      setTotalNutrients(totals);
    }
  }, [fetchedFoods]);

  return (
    <div className="flex flex-col justify-between item-center bg-white p-4 shadow rounded">
      <div className="flex justify-between items-center w-full mb-4">
        <h1 className="text-xl font-semibold">Food Table</h1>
        <Link href="/food-create" passHref>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Custom Food
          </button>
        </Link>
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
            <th className="text-left font-bold text-gray-500 uppercase tracking-wider p-4">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {fetchedFoods &&
            fetchedFoods.map((food) => (
              <tr key={food.id} className="hover:bg-gray-100">
                <td className="p-4">{food.label}</td>
                <td className="p-4">
                  {Math.round(food.nutrients.ENERC_KCAL)} kcal
                </td>
                <td className="p-4">{Math.round(food.nutrients.PROCNT)}g</td>
                <td className="p-4">{Math.round(food.nutrients.FAT)}g</td>
                <td className="p-4">{Math.round(food.nutrients.CHOCDF)}g</td>
                <td className="p-4">
                  <button
                    onClick={() => deleteFood(food.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
        <tfoot className="bg-gray-200">
          <tr>
            <th className="text-left p-4">Total</th>
            <td className="p-4">
              <b>{totalNutrients.calories} kcal</b>
            </td>
            <td className="p-4">
              <b>{totalNutrients.protein}g</b>
            </td>
            <td className="p-4">
              <b>{totalNutrients.fat}g</b>
            </td>
            <td className="p-4" colSpan={2}>
              <b>{totalNutrients.carbs}g</b>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default FirebaseFoods;
