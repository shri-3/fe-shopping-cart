import { lazy } from "react";
import MainLayout from "../layouts/main-layout";
import { Outlet } from "react-router";
const HomeLazy = lazy(() => import("../pages/Home/Home"));
const ProductLazy = lazy(() => import("../pages/Product/Product"));
const ProductDetailsLazy = lazy(
  () => import("../pages/ProductDetails/ProductDetails"),
);
const WishlistLazy = lazy(() => import("../pages/Wishlist/Wishlist"));
const ShoppingCartLazy = lazy(
  () => import("../pages/ShoppingCart/ShoppingCart"),
);

const HomeRoutes = {
  path: "/",
  element: (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ),
  children: [
    {
      path: "/",
      element: <HomeLazy />,
    },
    {
      path: "/product",
      element: <ProductLazy />,
    },
    {
      path: "/product/:id",
      element: <ProductDetailsLazy />,
    },
    {
      path: "/wishlist",
      element: <WishlistLazy />,
    },
    {
      path: "/cart",
      element: <ShoppingCartLazy />,
    },
  ],
};

export default HomeRoutes;
