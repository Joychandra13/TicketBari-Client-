import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home/Home";
import About from "../Pages/About/About/About";
import ContactUs from "../Pages/ContactUs/ContactUs/ContactUs";
import AllTickets from "../Pages/AllTickets/AllTickets/AllTickets";
import LogIn from "../Pages/Auth/LogIn/LogIn";
import Register from "../Pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layout/DashboardLayout";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import MyBookedTickets from "../Pages/Dashboard/MyBookedTickets/MyBookedTickets";
import TransactionHistory from "../Pages/Dashboard/TransactionHistory/TransactionHistory";
import AddTicket from "../Pages/Dashboard/AddTicket/AddTicket";
import MyAddedTickets from "../Pages/Dashboard/MyAddedTickets/MyAddedTickets";
import RequestedBookings from "../Pages/Dashboard/RequestedBookings/RequestedBookings";
import RevenueOverview from "../Pages/Dashboard/RevenueOverview/RevenueOverview";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import ManageTickets from "../Pages/Dashboard/ManageTickets/ManageTickets";
import AdvertiseTickets from "../Pages/Dashboard/AdvertiseTickets/AdvertiseTickets";
import TicketDetails from "../Pages/AllTickets/TicketDetails/TicketDetails";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentCancelled from "../Pages/Dashboard/Payment/PaymentCancelled";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/all-tickets",
        element: <PrivateRoute><AllTickets /></PrivateRoute>,
      },
      {
        path: "/ticket/:id",
        element: <PrivateRoute><TicketDetails/></PrivateRoute>,
      },
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path:'dashboard',
    element: <PrivateRoute><DashboardLayout/></PrivateRoute>,
    children:[
      {
        path: 'my-profile', 
        Component: MyProfile
      },
      {
        path: 'my-booked-tickets', 
        Component: MyBookedTickets
      },
      {
        path: 'payment/:ticketId',
        Component: Payment
      },
      {
        path: 'payment-Cancelled',
        Component: PaymentCancelled
      },
      {
        path: 'payment-success',
        Component: PaymentSuccess
      },
      {
        path: 'transaction-history', 
        Component: TransactionHistory
      },
      {
        path: 'add-ticket', 
        Component: AddTicket
      },
      {
        path: 'my-added-ticket', 
        Component: MyAddedTickets
      },
      {
        path: 'requested-bookings', 
        Component: RequestedBookings
      },
      {
        path: 'revenue-overview', 
        Component: RevenueOverview
      },
      {
        path: 'manage-users', 
        Component: ManageUsers
      },
      {
        path: 'manage-tickets', 
        Component: ManageTickets
      },
      {
        path: 'advertise-tickets', 
        Component: AdvertiseTickets
      },
    ]
  }
]);
