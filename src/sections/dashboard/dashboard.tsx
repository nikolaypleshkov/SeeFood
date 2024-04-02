"use client";
import { searchFood } from "@/app/actions";
import { Food, FoodResponse, Hint } from "@/model/food";
import React from "react";
import {
  collection,
  addDoc,
} from "firebase/firestore";
import { firestoreDB } from "@/lib/firebase";
import FirebaseFoods from "./firebase-foods";
import FoodList from "./food-list";

const DashboardSection = () => {

  return (
    <div className="container mx-auto p-4 mt-20">
      <FirebaseFoods />
      <FoodList />
    </div>
  );
};

export default DashboardSection;
