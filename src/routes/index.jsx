import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import AddBook from "../pages/AddBook/AddBook";
import AllBooks from "../pages/AllBooks/AllBooks";
import BorrowedBooks from "../pages/BorrowedBooks/BorrowedBooks";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Category from "../pages/Category/Category";
import Book from "../pages/Book/Book";
import Error from "../pages/Error/Error";
import AdminRoute from "./AdminRoute";
import EditBook from "../pages/EditBook/EditBook";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "add-book",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AddBook />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "edit-book/:bookId",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <EditBook />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "all-books",
        element: (
          <PrivateRoute>
            <AllBooks />
          </PrivateRoute>
        ),
      },
      {
        path: "borrowed-books",
        element: (
          <PrivateRoute>
            <BorrowedBooks />
          </PrivateRoute>
        ),
      },
      {
        path: "category/:categoryName",
        element: (
          <PrivateRoute>
            <Category />
          </PrivateRoute>
        ),
      },
      {
        path: "book/:bookId",
        element: (
          <PrivateRoute>
            <Book />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
