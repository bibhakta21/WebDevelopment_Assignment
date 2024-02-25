import React from "react";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardHeader from "../components/DashboardNavbar";
import { Outlet } from "react-router-dom";


const Dashboard = () => {
  return (
    <div className="dashboard-container   p-0">
      <div className="">
        <DashboardSidebar/>

      </div>
      <main className="dashboard-item-container p-0">
        <div className="shadow-lg">
          <DashboardHeader/>
        </div>
        <Outlet />
      </main>
    </div>

  );
};

export default Dashboard;
