import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  HomePage,
  AboutPage,
  ProductsPage,
  HomeLayout,
  CartPage,
  CheckoutPage,
  ErrorPage,
  PrivateRoute,
  SingleProductPage,
  AuthWrapper,
} from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "products/:id",
        element: <SingleProductPage />,
      },
      {
        path: "checkout",
        element: (
          <PrivateRoute>
            <CheckoutPage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <AuthWrapper>
      <RouterProvider router={router} />
    </AuthWrapper>
  );
}

export default App;
