export interface FoodResponse {
  text: string;
  parsed: any[];
  hints: Hint[];
}

export interface Hint {
  food: Food;
  measures: Measure[];
}

export interface Food {
  id: string; //document id in firestore
  foodId: string;
  label: string;
  knownAs: string;
  nutrients: Nutrients;
  brand: string;
  category: string;
  categoryLabel: string;
  foodContentsLabel: string;
  servingSizes: ServingSize[];
}

export interface Nutrients {
  ENERC_KCAL: number;
  PROCNT: number;
  FAT: number;
  CHOCDF: number;
}

export interface ServingSize {
  uri: string;
  label: string;
  quantity: number;
}

export interface Measure {
  uri: string;
  label: string;
  weight: number;
}
