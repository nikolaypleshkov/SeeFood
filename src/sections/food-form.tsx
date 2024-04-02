"use client";
import React from "react";
import { collection, addDoc } from "firebase/firestore";
import { firestoreDB } from "@/lib/firebase";
import { useRouter } from "next/navigation";

const FoodForm: React.FC = () => {
    const router = useRouter();
  const [formData, setFormData] = React.useState({
    label: "",
    calories: "",
    protein: "",
    fat: "",
    carbs: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
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
      router.replace('/dashboard')
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error adding food");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="label" className="block">
          Label
        </label>
        <input
          type="text"
          name="label"
          value={formData.label}
          onChange={handleChange}
          className="input"
          required
        />
      </div>
      <div>
        <label htmlFor="calories" className="block">
          Calories (kcal)
        </label>
        <input
          type="number"
          name="calories"
          value={formData.calories}
          onChange={handleChange}
          className="input"
          required
        />
      </div>
      <div>
        <label htmlFor="protein" className="block">
          Protein (g)
        </label>
        <input
          type="number"
          name="protein"
          value={formData.protein}
          onChange={handleChange}
          className="input"
          required
        />
      </div>
      <div>
        <label htmlFor="fat" className="block">
          Fat (g)
        </label>
        <input
          type="number"
          name="fat"
          value={formData.fat}
          onChange={handleChange}
          className="input"
          required
        />
      </div>
      <div>
        <label htmlFor="carbs" className="block">
          Carbs (g)
        </label>
        <input
          type="number"
          name="carbs"
          value={formData.carbs}
          onChange={handleChange}
          className="input"
          required
        />
      </div>
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
