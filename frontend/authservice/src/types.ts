export type ErrorWithMessage = {
  status: number;
  data: {
    message: string;
  };
};

export type MealType = {

  id:string;
  title:string,
  serving:string,
  readyInMinutes:string,
  sourceUrl:string,
  image:string,
  servings:string,
  nutrients:{
    
  }
  
}

export type NutrientsType={
  calories:number,
  carbohydrates:number,
  fat:number,
  protein:number,

}

export type MealResponseType = {
  meals: MealType[];
  nutrients: NutrientsType;
};
