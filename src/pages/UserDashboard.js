import React from "react";
import Navbar from "../components/Navbar";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Row, Col } from "react-bootstrap";
import {
  FaUser,
  FaShoppingCart,
  FaChartBar,
  FaMoneyBillAlt,
} from "react-icons/fa";

const chartOptions = (color) => ({
  chart: {
    type: "areaspline",
    height: 70,
    backgroundColor: "transparent",
  },
  title: { text: "" },
  xAxis: {
    visible: false,
  },
  yAxis: { visible: false },
  series: [
    {
      name: "Data",
      data: [5, 8, 3, 7, 6, 9, 2],
      color: color,
      fillColor: {
        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
        stops: [
          [0, color],
          [1, "rgba(255, 255, 255, 0.1)"],
        ],
      },
      fillOpacity: 0.4,
      lineWidth: 2,
      marker: {
        enabled: false,
      },
    },
  ],
  credits: { enabled: false },
  legend: { enabled: false },
  tooltip: {
    enabled: false,
  },
  plotOptions: {
    areaspline: {
      fillOpacity: 0.5,
    },
  },
});

const UserDashboard = () => {
  return (
    <>
      <Navbar />
      <div className="mx-3 mt-4">
        <h3 className="text-dark mb-4">User Dashboard</h3>

        {/* Main Layout */}
        <Row>
          {/* Left Column - Main Chart */}
          <Col md={6}>
            <div
              className="card bg-transparent text-dark p-4"
              style={{ border: "1px solid #666" }}
            >
              <h5>User Activity Overview</h5>
              <HighchartsReact
                highcharts={Highcharts}
                options={{
                  chart: {
                    type: "areaspline",
                    backgroundColor: "transparent",
                    height: 300,
                  },
                  title: { text: "" },
                  xAxis: {
                    categories: [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ],
                    gridLineWidth: 0,
                    lineColor: "#666",
                    tickColor: "#666",
                    labels: {
                      style: {
                        color: "#000",
                      },
                    },
                  },
                  yAxis: {
                    title: { text: "" },
                    gridLineColor: "#444",
                    labels: {
                      style: {
                        color: "#000",
                      },
                    },
                  },
                  series: [
                    {
                      name: "Activity",
                      data: [5, 8, 3, 7, 6, 9, 2, 10, 8, 12, 15, 13],
                      color: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                          [0, "rgba(92, 114, 125, 1)"],
                          [1, "rgba(92, 114, 125, 0.2)"],
                        ],
                      },
                      fillColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                          [0, "rgba(92, 114, 125, 0.6)"],
                          [1, "rgba(92, 114, 125, 0.1)"],
                        ],
                      },
                      lineWidth: 2,
                      marker: {
                        enabled: false,
                      },
                    },
                  ],
                  credits: { enabled: false },
                  legend: { enabled: false },
                  tooltip: {
                    backgroundColor: "#333",
                    borderColor: "#666",
                    style: {
                      color: "#000",
                    },
                  },
                  plotOptions: {
                    areaspline: {
                      fillOpacity: 0.5,
                    },
                  },
                }}
              />
            </div>
          </Col>

          {/* Right Column - Cards */}
          <Col md={6}>
            <Row>
              <Col md={6} className="mb-3">
                <div className="card text-dark p-3">
                  <Row>
                    <Col xs={8}>
                      <FaUser className="fa-3x" />
                      <h5 className="mt-2">Total Users</h5>
                      <h3>1,234</h3>
                    </Col>
                    <Col xs={4}>
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={chartOptions("#a0af50")}
                      />
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col md={6} className="mb-3">
                <div className="card text-dark p-3">
                  <Row>
                    <Col xs={8}>
                      <FaShoppingCart className="fa-3x" />
                      <h5 className="mt-2">Total Orders</h5>
                      <h3>567</h3>
                    </Col>
                    <Col xs={4}>
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={chartOptions("#f39c12")}
                      />
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col md={6} className="mb-3">
                <div className="card text-dark p-3">
                  <Row>
                    <Col xs={8}>
                      <FaChartBar className="fa-3x" />
                      <h5 className="mt-2">Total Sales</h5>
                      <h3>$12,345</h3>
                    </Col>
                    <Col xs={4}>
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={chartOptions("#3498db")}
                      />
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col md={6} className="mb-3">
                <div className="card text-dark p-3">
                  <Row>
                    <Col xs={8}>
                      <FaMoneyBillAlt className="fa-3x" />
                      <h5 className="mt-2">Total Revenue</h5>
                      <h3>$67,890</h3>
                    </Col>
                    <Col xs={4}>
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={chartOptions("#e74c3c")}
                      />
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default UserDashboard;