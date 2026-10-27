import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import HomePage from "../pages/public/HomePage";
import AboutPage from "../pages/public/AboutPage";
import { NotFoundPage } from "../pages/public/NotFoundPage";
import CoursesPage from "../pages/public/CoursesPage";
import ContactUsPage from "../pages/public/ContactUsPage";
import CourseDetailsPage from "../pages/public/CourseDetailsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/courses",
        element: <CoursesPage />,
      },
      {
        path: "/contact",
        element: <ContactUsPage />,
      },
      {
        path: "/courses/:id",
        element: <CourseDetailsPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
