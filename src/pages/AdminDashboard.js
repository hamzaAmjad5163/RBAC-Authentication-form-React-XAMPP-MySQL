import React, { useEffect, useRef } from "react";
import { FaWallet, FaChartLine, FaMoneyBillWave } from "react-icons/fa";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const AdminDashboard = () => {
  // Use refs to store chart instances
  const chartRefs = useRef({});

  useEffect(() => {
    // Create charts
    createChart("cashDepositChart");
    createChart("investedDividendsChart");
    createChart("withdrawalsChart");

    // Cleanup function to destroy charts on unmount
    return () => {
      Object.values(chartRefs.current).forEach(chart => chart.destroy());
    };
  }, []);

  const createChart = (id) => {
    const ctx = document.getElementById(id);
    if (ctx) {
      // Destroy existing chart if it exists
      if (chartRefs.current[id]) {
        chartRefs.current[id].destroy();
      }

      // Create new chart and store it in the ref
      chartRefs.current[id] = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr"],
          datasets: [{
            label: "Data",
            data: [3, 2, 1, 4],
            backgroundColor: "rgba(0, 123, 255, 0.5)",
          }],
        },
        options: { responsive: true },
      });
    }
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-md-8 d-flex align-items-center">
                  <div className="me-3">
                    <img
                      src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGWm7kgMH1PEsycRwkyqPcPB1b2NITpD8j2g&s"}
                      alt="user Logo"
                      className="img-circle img-responsive"
                      style={{ height: "80px", width: "80px" }}
                    />
                  </div>
                  <div>
                    <h5 className="mb-1">Admin Dashboard</h5>
                    <p className="mb-0">
                      Description of the user goes here. This can be a short summary.
                    </p>
                  </div>
                </div>
                <div className="col-md-4 text-end">
                  <button className="btn btn-primary">Edit Profile</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        {[
          { icon: <FaWallet />, value: "3M", label: "Cash Deposit", trend: "5.2% up", id: "cashDepositChart" },
          { icon: <FaChartLine />, value: "2.5M", label: "Invested Dividends", trend: "3.8% up", id: "investedDividendsChart" },
          { icon: <FaMoneyBillWave />, value: "1.8M", label: "Withdrawals", trend: "2.1% down", id: "withdrawalsChart" },
        ].map((card, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card">
              <div className="card-body position-relative">
                <div className="chart-container position-absolute top-0 start-0 w-100 h-100 opacity-25">
                  <canvas id={card.id}></canvas>
                </div>
                <div className="card-text text-center position-relative z-index-2">
                  {card.icon}
                  <h3>{card.value}</h3>
                  <p>{card.label}</p>
                  <div className="trend d-flex align-items-center justify-content-center">
                    <span>{card.trend}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row mt-3">
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-header">TIMELINE</div>
            <div className="card-body" style={{ maxHeight: "300px", overflowY: "scroll" }}>
              {["Meeting at 15:00 PM", "Production Release", "More Meetings"].map((event, index) => (
                <div className="timeline-item" key={index}>
                  <div className="timeline-marker bg-primary border border-white rounded-circle"></div>
                  <div className="timeline-content">
                    <h6>{event}</h6>
                    <p>Details for event {index + 1}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="card-footer text-end">
              <button className="btn btn-primary">View All Messages</button>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card h-100">
            <div className="card-header">Data Table</div>
            <div className="card-body">
              <input type="text" className="form-control mb-3" placeholder="Full text search" />
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Country</th>
                      <th>Location</th>
                      <th>City</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[{ id: 1, name: "Pakistan", location: "Karachi", price: "Faisal Town", status: "Arriving" }].map(
                      (property) => (
                        <tr key={property.id}>
                          <td>{property.id}</td>
                          <td>{property.name}</td>
                          <td>{property.location}</td>
                          <td>{property.price}</td>
                          <td>{property.status}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="card-footer d-flex justify-content-end">
              <nav>
                <ul className="pagination mb-0">
                  <li className="page-item">
                    <a className="page-link" href="#">1</a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">2</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;