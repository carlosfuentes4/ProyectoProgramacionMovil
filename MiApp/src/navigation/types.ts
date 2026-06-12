export type RootStackParamList = {
  Login: undefined;
  Main: { email: string }; //Bottom Tabs
  Detail: { receta: any }; //Recibe la receta desde Supabase
  ManageRecipe: { receta?: any }; //Para agregar o editar recetas
};
