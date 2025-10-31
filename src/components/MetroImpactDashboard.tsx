// MetroImpactDashboard.tsx
import React, { useState } from 'react';
import './MetroImpactDashboard.css';

interface DashboardData {
  equity: {
    routes: string[];
    ridership: number[];
    serviceHours: number[];
    demographicIndex: number[];
  };
  performance: {
    metrics: {
      onTimePerformance: number;
      costPerRider: number;
      customerSatisfaction: number;
      routeEfficiency: number;
    };
    trends: number[];
  };
  impact: {
    outcomes: {
      co2Reduction: number;
      carsRemoved: number;
      economicImpact: number;
      jobsSupported: number;
    };
    projections: number[];
  };
}

const MetroImpactDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'equity' | 'performance' | 'impact'>('equity');
  
  // Sample data - replace with your actual data
  const dashboardData: DashboardData = {
    equity: {
      routes: ['Route 1', 'Route 2', 'Route 3', 'Route 4', 'Route 5'],
      ridership: [12500, 8900, 15600, 7200, 11300],
      serviceHours: [18, 12, 22, 10, 16],
      demographicIndex: [85, 92, 78, 95, 82]
    },
    performance: {
      metrics: {
        onTimePerformance: 87,
        costPerRider: 2.45,
        customerSatisfaction: 4.2,
        routeEfficiency: 91
      },
      trends: [82, 84, 85, 87, 86, 87]
    },
    impact: {
      outcomes: {
        co2Reduction: 12500, // tons
        carsRemoved: 8500,
        economicImpact: 45.2, // millions
        jobsSupported: 1250
      },
      projections: [28, 35, 42, 48, 52, 55, 58]
    }
  };

  const renderEquityTab = () => (
    <div className="tab-content">
      <h3>Service Equity Analysis</h3>
      <div className="metrics-grid">
        <div className="metric-card">
          <h4>Route Equity Index</h4>
          <div className="equity-bars">
            {dashboardData.equity.routes.map((route, index) => (
              <div key={route} className="equity-bar">
                <span className="route-name">{route}</span>
                <div className="bar-container">
                  <div 
                    className="equity-fill"
                    style={{width: `${dashboardData.equity.demographicIndex[index]}%`}}
                  >
                    <span className="equity-value">
                      {dashboardData.equity.demographicIndex[index]}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="metric-card">
          <h4>Ridership vs Service Hours</h4>
          <div className="comparison-chart">
            {dashboardData.equity.routes.map((route, index) => (
              <div key={route} className="comparison-row">
                <span>{route}</span>
                <div className="comparison-bars">
                  <div 
                    className="ridership-bar"
                    style={{width: `${(dashboardData.equity.ridership[index] / 20000) * 100}%`}}
                  >
                    {dashboardData.equity.ridership[index].toLocaleString()} riders
                  </div>
                  <div 
                    className="service-bar"
                    style={{width: `${(dashboardData.equity.serviceHours[index] / 24) * 100}%`}}
                  >
                    {dashboardData.equity.serviceHours[index]} hrs
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPerformanceTab = () => (
    <div className="tab-content">
      <h3>System Performance Metrics</h3>
      <div className="metrics-grid">
        <div className="kpi-cards">
          <div className="kpi-card">
            <h4>On-Time Performance</h4>
            <div className="kpi-value">{dashboardData.performance.metrics.onTimePerformance}%</div>
          </div>
          <div className="kpi-card">
            <h4>Cost Per Rider</h4>
            <div className="kpi-value">${dashboardData.performance.metrics.costPerRider}</div>
          </div>
          <div className="kpi-card">
            <h4>Customer Satisfaction</h4>
            <div className="kpi-value">{dashboardData.performance.metrics.customerSatisfaction}/5</div>
          </div>
          <div className="kpi-card">
            <h4>Route Efficiency</h4>
            <div className="kpi-value">{dashboardData.performance.metrics.routeEfficiency}%</div>
          </div>
        </div>
        
        <div className="metric-card full-width">
          <h4>Performance Trend (Last 6 Months)</h4>
          <div className="trend-chart">
            {dashboardData.performance.trends.map((value, index) => (
              <div key={index} className="trend-bar">
                <div 
                  className="trend-fill"
                  style={{height: `${value}%`}}
                >
                  <span className="trend-value">{value}%</span>
                </div>
                <span className="trend-label">M{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderImpactTab = () => (
    <div className="tab-content">
      <h3>Community & Environmental Impact</h3>
      <div className="metrics-grid">
        <div className="impact-cards">
          <div className="impact-card">
            <h4>CO₂ Reduction</h4>
            <div className="impact-value">{dashboardData.impact.outcomes.co2Reduction.toLocaleString()} tons</div>
            <div className="impact-description">Annual emissions avoided</div>
          </div>
          <div className="impact-card">
            <h4>Cars Removed</h4>
            <div className="impact-value">{dashboardData.impact.outcomes.carsRemoved.toLocaleString()}</div>
            <div className="impact-description">Equivalent daily trips</div>
          </div>
          <div className="impact-card">
            <h4>Economic Impact</h4>
            <div className="impact-value">${dashboardData.impact.outcomes.economicImpact}M</div>
            <div className="impact-description">Annual regional benefit</div>
          </div>
          <div className="impact-card">
            <h4>Jobs Supported</h4>
            <div className="impact-value">{dashboardData.impact.outcomes.jobsSupported.toLocaleString()}</div>
            <div className="impact-description">Direct and indirect employment</div>
          </div>
        </div>
        
        <div className="metric-card full-width">
          <h4>Projected Growth in Impact</h4>
          <div className="projection-chart">
            {dashboardData.impact.projections.map((value, index) => (
              <div key={index} className="projection-point">
                <div className="projection-value">+{value}%</div>
                <div className="projection-line">
                  <div 
                    className="projection-fill"
                    style={{width: `${(value / 60) * 100}%`}}
                  ></div>
                </div>
                <span className="projection-label">Year {index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="metro-dashboard">
     <div className="dashboard-header">
  <h2>LBS Ventures - Impact Assessment</h2>
  <p className="demo-notice">Conceptual Prototype - Powered by data</p>
</div>
      
      <div className="tabs-container">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'equity' ? 'active' : ''}`}
            onClick={() => setActiveTab('equity')}
          >
            Service Equity
          </button>
          <button 
            className={`tab ${activeTab === 'performance' ? 'active' : ''}`}
            onClick={() => setActiveTab('performance')}
          >
            Performance
          </button>
          <button 
            className={`tab ${activeTab === 'impact' ? 'active' : ''}`}
            onClick={() => setActiveTab('impact')}
          >
            Community Impact
          </button>
        </div>
        
        <div className="tab-panel">
          {activeTab === 'equity' && renderEquityTab()}
          {activeTab === 'performance' && renderPerformanceTab()}
          {activeTab === 'impact' && renderImpactTab()}
        </div>
      </div>
      
      <div className="dashboard-footer">
        <p>
          <strong>Sample Visualization</strong> - This dashboard demonstrates how we can transform 
          transit data into actionable insights for King County Metro. All data shown is hypothetical 
          and for demonstration purposes only.
        </p>
      </div>
    </div>
  );
};

export default MetroImpactDashboard;