"use server";

import { FoodResponse } from "@/model/food";
import axios from "axios";

export async function searchFood(
  ingrParam: string
): Promise<FoodResponse | null> {
  try {
    const response = await axios.get(
      `https://api.edamam.com/api/food-database/v2/parser?app_id=724e0cfb&app_key=b1b9bebaef0c0f847cb428ab6293e23d&ingr=${ingrParam}`
    );
    return response.data as FoodResponse;
  } catch (error) {
    console.log(error);
    return null;
  }
}
