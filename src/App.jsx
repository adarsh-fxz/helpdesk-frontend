import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home"
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";
import MyProfile from './components/MyProfile';
import CreateTicket from './components/CreateTicket';
import MyTickets from './components/MyTickets';
import OpenTickets from './components/OpenTickets';
import Dashboard from './pages/Dashboard';
import Setting from './components/Setting';
import Layout from './components/layout/Layout';
import Technician from './components/Technician';
import UsersList from './components/Users';
import NotificationsPage from './components/NotificationsPage';
import EditTicket from './components/EditTicket';
import HelpDocs from './components/HelpDocs';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/settings" element={
            <Layout>
              <Setting />
            </Layout>
          } />
          <Route path="/dashboard/create-ticket" element={
            <Layout>
              <CreateTicket />
            </Layout>
          } />
          <Route path="/dashboard/my-tickets" element={
            <Layout>
              <MyTickets />
            </Layout>
          } />
          <Route path="/dashboard/open-tickets" element={
            <Layout>
              <OpenTickets />
            </Layout>
          } />
          <Route path="/dashboard/technician" element={
            <Layout>
              <Technician />
            </Layout>
          } />
          <Route path="/dashboard/users" element={
            <Layout>
              <UsersList />
            </Layout>
          } />
          <Route path="/dashboard/notifications" element={
            <Layout>
              <NotificationsPage />
            </Layout>
          } />
          <Route path="/dashboard/ticket/:id/edit" element={
            <Layout>
              <EditTicket />
            </Layout>
          } />
          <Route path="/dashboard/help-docs" element={
            <Layout>
              <HelpDocs />
            </Layout>
          } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
