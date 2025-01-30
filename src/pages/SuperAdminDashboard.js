import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { FaUser, FaChartLine, FaCog, FaEnvelope, FaUsers } from "react-icons/fa";
import Navbar from "../components/Navbar";

Chart.register(...registerables);

const SuperAdminDashboard = () => {
  const userChartRef = useRef(null);
  const revenueChartRef = useRef(null);
  const activityChartRef = useRef(null);

  const userChartInstance = useRef(null);
  const revenueChartInstance = useRef(null);
  const activityChartInstance = useRef(null);

  useEffect(() => {
    createChart(userChartRef.current, userChartInstance, "Users Growth", [10, 15, 20, 25, 30]);
    createChart(revenueChartRef.current, revenueChartInstance, "Revenue Growth", [500, 700, 850, 1200, 1500]);
    createChart(activityChartRef.current, activityChartInstance, "Activity Tracking", [12, 18, 9, 24, 30]);

    return () => {
      // Cleanup charts on unmount
      destroyChart(userChartInstance);
      destroyChart(revenueChartInstance);
      destroyChart(activityChartInstance);
    };
  }, []);

  const createChart = (ctx, chartRef, label, data) => {
    if (ctx) {
      // Destroy previous chart if it exists
      if (chartRef.current) {
        chartRef.current.destroy();
      }
      chartRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May"],
          datasets: [
            {
              label: label,
              data: data,
              borderColor: "#a0af50",
              backgroundColor: "rgba(160, 175, 80, 0.2)",
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: "top" },
          },
        },
      });
    }
  };

  const destroyChart = (chartRef) => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }
  };

  return (
    <>
    <Navbar />
    <div className="container mt-5">
      <h1 className="text-center mb-4">Super Admin Dashboard</h1>
      <div className="row text-center mb-4">
        <div className="col-md-3 mb-3">
          <div className="card bg-light shadow p-3">
            <FaUsers size={30} className="text-success mb-2" />
            <h5>Total Users</h5>
            <p className="text-muted">1,500</p>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card bg-light shadow p-3">
            <FaChartLine size={30} className="text-primary mb-2" />
            <h5>Revenue</h5>
            <p className="text-muted">$12,500</p>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card bg-light shadow p-3">
            <FaEnvelope size={30} className="text-danger mb-2" />
            <h5>Messages</h5>
            <p className="text-muted">320</p>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card bg-light shadow p-3">
            <FaCog size={30} className="text-warning mb-2" />
            <h5>Settings</h5>
            <p className="text-muted">Active</p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title">User Growth</h5>
              <canvas ref={userChartRef}></canvas>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title">Revenue Growth</h5>
              <canvas ref={revenueChartRef}></canvas>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title">Activity Tracking</h5>
              <canvas ref={activityChartRef}></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default SuperAdminDashboard;
