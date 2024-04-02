"use client";
import React from "react";
import { collection, addDoc } from "firebase/firestore";
import { firestoreDB } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";

const FoodForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    label: "",
    calories: "",
    protein: "",
    fat: "",
    carbs: "",
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (
      !formData.label ||
      !formData.calories ||
      !formData.protein ||
      !formData.fat ||
      !formData.carbs
    ) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await addDoc(collection(firestoreDB, "nutritions"), {
        food: {
          label: formData.label,
          nutrients: {
            ENERC_KCAL: parseFloat(formData.calories),
            PROCNT: parseFloat(formData.protein),
            FAT: parseFloat(formData.fat),
            CHOCDF: parseFloat(formData.carbs),
          },
        },
        timestamp: new Date(),
      });
      alert("Food added successfully");

      setFormData({
        label: "",
        calories: "",
        protein: "",
        fat: "",
        carbs: "",
      });
      router.replace("/dashboard");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error adding food");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label htmlFor="label" className="block">
            Label
          </label>
          <input
            type="text"
            name="label"
            value={formData.label}
            onChange={handleChange}
            className="block w-full border-0 py-1.5 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:pl-3 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            required
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label htmlFor="calories" className="block">
            Calories (kcal)
          </label>
          <input
            type="number"
            name="calories"
            value={formData.calories}
            onChange={handleChange}
            className="block w-full border-0 py-1.5 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:pl-3 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            required
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label htmlFor="protein" className="block">
            Protein (g)
          </label>
          <input
            type="number"
            name="protein"
            value={formData.protein}
            onChange={handleChange}
            className="block w-full border-0 py-1.5 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:pl-3 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            required
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label htmlFor="fat" className="block">
            Fat (g)
          </label>
          <input
            type="number"
            name="fat"
            value={formData.fat}
            onChange={handleChange}
            className="block w-full border-0 py-1.5 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:pl-3 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            required
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label htmlFor="carbs" className="block">
            Carbs (g)
          </label>
          <input
            type="number"
            name="carbs"
            value={formData.carbs}
            onChange={handleChange}
            className="block w-full border-0 py-1.5 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:pl-3 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            required
          />
        </div>
      </div>
      <Link href="/dashboard">
        <button type="submit" className="font-bold py-2 px-4 rounded">
          Go Back
        </button>
      </Link>{" "}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Food
      </button>
    </form>
  );
};

export default FoodForm;
