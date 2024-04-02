import Layout from "@/layout";
import DashboardSection from "@/sections/dashboard/dashboard";
import { NextPage } from "next";
import React from "react";

const Dashboard: NextPage = () => {
  return (
    <Layout title="Dashboard">
      <DashboardSection />
    </Layout>
  );
};

export default Dashboard;
