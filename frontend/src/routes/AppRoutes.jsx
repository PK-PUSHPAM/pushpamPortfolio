import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/public/HomePage.jsx";
import ProjectsPage from "../pages/public/ProjectsPage.jsx";
import ProjectDetailsPage from "../pages/public/ProjectDetailsPage.jsx";
import AdminLoginPage from "../pages/admin/AdminLoginPage.jsx";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage.jsx";
import ManageProjectsPage from "../pages/admin/ManageProjectsPage.jsx";
import ManageSkillsPage from "../pages/admin/ManageSkillsPage.jsx";
import ManageProfilePage from "../pages/admin/ManageProfilePage.jsx";
import ManageMessagesPage from "../pages/admin/ManageMessagesPage.jsx";
import ManageSocialLinksPage from "../pages/admin/ManageSocialLinksPage.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import NotFoundPage from "../pages/public/NotFoundPage.jsx";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/projects/:slug" element={<ProjectDetailsPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/projects"
        element={
          <ProtectedRoute>
            <ManageProjectsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/skills"
        element={
          <ProtectedRoute>
            <ManageSkillsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/profile"
        element={
          <ProtectedRoute>
            <ManageProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/messages"
        element={
          <ProtectedRoute>
            <ManageMessagesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/social-links"
        element={
          <ProtectedRoute>
            <ManageSocialLinksPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />}></Route>
    </Routes>
  );
};

export default AppRoutes;
