import React, { useEffect, useRef } from 'react';
import * as Chart from 'chart.js';

const DashboardAnalytics = ({ dashboardData }) => {

    // Chart refs
    const productionChartRef = useRef(null);
    const costChartRef = useRef(null);
    const revenueChartRef = useRef(null);
    const resourceChartRef = useRef(null);
    const chartInstances = useRef({});

    useEffect(() => {
        // Register Chart.js components
        Chart.Chart.register(
            Chart.CategoryScale,
            Chart.LinearScale,
            Chart.PointElement,
            Chart.LineElement,
            Chart.BarElement,
            Chart.ArcElement,
            Chart.LineController,
            Chart.BarController,
            Chart.DoughnutController,
            Chart.RadarController,
            Chart.RadialLinearScale,
            Chart.Title,
            Chart.Tooltip,
            Chart.Legend
        );

        return () => {
            // Cleanup chart instances
            Object.values(chartInstances.current).forEach(chart => {
                if (chart) chart.destroy();
            });
        };
    }, []);

    useEffect(() => {
        if (dashboardData) {
            createCharts();
        }
    }, [dashboardData]);

    const createCharts = () => {
        if (!dashboardData?.landoptimizer?.suggested_locations?.[0]) return;

        const location = dashboardData.landoptimizer.suggested_locations[0];
        
        // Destroy existing charts
        Object.values(chartInstances.current).forEach(chart => {
            if (chart) chart.destroy();
        });

        // Production Capacity Chart
        if (productionChartRef.current) {
            const ctx = productionChartRef.current.getContext('2d');
            chartInstances.current.production = new Chart.Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Monthly Production (tons)',
                        data: [3500, 4200, 4800, 4100, 4600, 5000],
                        borderColor: '#67C090',
                        backgroundColor: 'rgba(103, 192, 144, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: { beginAtZero: true }
                    }
                }
            });
        }

        // Cost Breakdown Chart
        if (costChartRef.current) {
            const ctx = costChartRef.current.getContext('2d');
            const costData = location.cost_breakdown;
            chartInstances.current.cost = new Chart.Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: Object.keys(costData).map(key => key.replace(/_/g, ' ').replace(/cost/g, '').trim()),
                    datasets: [{
                        data: Object.values(costData).map(val => parseInt(val.replace(/[^\d]/g, ''))),
                        backgroundColor: ['#DDF4E7', '#67C090', '#26667F', '#124170', '#8FD3B0', '#4A90A4']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom' }
                    }
                }
            });
        }

        // Revenue Chart
        if (revenueChartRef.current) {
            const ctx = revenueChartRef.current.getContext('2d');
            const revenueData = location.revenue_estimation;
            chartInstances.current.revenue = new Chart.Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Domestic Sales', 'Export Revenue', 'Carbon Credits'],
                    datasets: [{
                        label: 'Revenue (Million INR)',
                        data: [
                            parseInt(revenueData.domestic_sales_revenue.replace(/[^\d]/g, '')),
                            parseInt(revenueData.export_revenue.replace(/[^\d]/g, '')),
                            parseInt(revenueData.carbon_credit_revenue.replace(/[^\d]/g, ''))
                        ],
                        backgroundColor: ['#67C090', '#26667F', '#124170']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    }
                }
            });
        }

        // Resource Utilization Chart
        if (resourceChartRef.current) {
            const ctx = resourceChartRef.current.getContext('2d');
            const resources = location.resource_sizing;
            chartInstances.current.resource = new Chart.Chart(ctx, {
                type: 'radar',
                data: {
                    labels: ['Solar Panels', 'Wind Turbines', 'Electrolyzers', 'Storage Capacity', 'Distribution'],
                    datasets: [{
                        label: 'Resource Utilization %',
                        data: [85, 92, 78, 88, 75],
                        borderColor: '#26667F',
                        backgroundColor: 'rgba(38, 102, 127, 0.2)',
                        pointBackgroundColor: '#67C090'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        r: {
                            beginAtZero: true,
                            max: 100
                        }
                    }
                }
            });
        }
    };

    return (
        <div className="analytics-section">
            <div className="section-header">
                <h2>Performance Analytics</h2>
            </div>
            
            <div className="analytics-grid">
                <div className="chart-card card">
                    <h3>Production Trend</h3>
                    <div className="chart-container">
                        <canvas ref={productionChartRef}></canvas>
                    </div>
                </div>

                <div className="chart-card card">
                    <h3>Cost Distribution</h3>
                    <div className="chart-container">
                        <canvas ref={costChartRef}></canvas>
                    </div>
                </div>

                <div className="chart-card card">
                    <h3>Revenue Streams</h3>
                    <div className="chart-container">
                        <canvas ref={revenueChartRef}></canvas>
                    </div>
                </div>

                <div className="chart-card card">
                    <h3>Resource Utilization</h3>
                    <div className="chart-container">
                        <canvas ref={resourceChartRef}></canvas>
                    </div>
                </div>
            </div>

            {dashboardData?.landoptimizer?.suggested_locations && (
                <div className="comparison-analysis card">
                    <h3>Cost Optimization Analysis</h3>
                    <div className="comparison-grid">
                        <div className="comparison-item">
                            <h4>Base Cost</h4>
                            <div className="cost-value base">{dashboardData.landoptimizer.suggested_locations[0].base_cost_estimate}</div>
                        </div>
                        <div className="comparison-arrow">
                            <i className="fas fa-arrow-right"></i>
                        </div>
                        <div className="comparison-item">
                            <h4>Optimized Cost</h4>
                            <div className="cost-value optimized">{dashboardData.landoptimizer.suggested_locations[0].optimized_cost_estimate}</div>
                        </div>
                        <div className="savings-highlight">
                            <div className="savings-amount">INR 50 Million</div>
                            <div className="savings-label">Potential Savings</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardAnalytics;
