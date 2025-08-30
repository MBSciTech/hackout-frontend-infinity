import React from 'react';
import SolarPanel from '../3dModels/SolarPanel';
import WindPower from '../3dModels/WindPower';

const DashboardVisualization = ({ dashboardData }) => {

    const getSatelliteMapData = () => {
        if (!dashboardData?.landoptimizer?.suggested_locations) return null;
        
        const location = dashboardData.landoptimizer.suggested_locations[0];
        const consumers = location.nearby_consumers || [];
        
        return {
            plant: location.plant_location,
            consumers: consumers,
            coverage: {
                radius: 100, // km
                efficiency: 92
            }
        };
    };

    const renderSatelliteMap = () => {
        const mapData = getSatelliteMapData();
        if (!mapData) return <div>Loading map data...</div>;

        return (
            <div className="satellite-map">
                <div className="map-header">
                    <h3>Satellite Infrastructure View</h3>
                    <div className="map-controls">
                        <button className="map-btn active">Satellite</button>
                        <button className="map-btn">Terrain</button>
                    </div>
                </div>
                <div className="map-container">
                    <div className="satellite-view">
                        <div className="plant-marker main-plant" style={{
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}>
                            <div className="plant-icon">
                                <i className="fas fa-industry"></i>
                            </div>
                            <div className="plant-info">
                                <strong>{mapData.plant.name}</strong>
                                <span>{mapData.plant.address}</span>
                            </div>
                        </div>
                        
                        {mapData.consumers.map((consumer, index) => (
                            <div key={index} className="consumer-marker" style={{
                                left: `${30 + index * 25}%`,
                                top: `${25 + index * 15}%`
                            }}>
                                <div className="consumer-icon">
                                    <i className="fas fa-building"></i>
                                </div>
                                <div className="consumer-info">
                                    <strong>{consumer.name}</strong>
                                    <span>{consumer.distance_from_plant}</span>
                                </div>
                            </div>
                        ))}
                        
                        <div className="coverage-area"></div>
                        <div className="grid-overlay"></div>
                    </div>
                </div>
                <div className="map-legend">
                    <div className="legend-item">
                        <div className="legend-color" style={{ backgroundColor: '#67C090' }}></div>
                        <span>Production Plant</span>
                    </div>
                    <div className="legend-item">
                        <div className="legend-color" style={{ backgroundColor: '#26667F' }}></div>
                        <span>Consumers</span>
                    </div>
                    <div className="legend-item">
                        <div className="legend-color" style={{ backgroundColor: 'rgba(103, 192, 144, 0.3)' }}></div>
                        <span>Coverage Area</span>
                    </div>
                </div>
            </div>
        );
    };

    if (!dashboardData?.landoptimizer?.suggested_locations) {
        return <div className="loading">Loading visualization data...</div>;
    }

    const location = dashboardData.landoptimizer.suggested_locations[0];
    const resources = location.resource_sizing;
    const solarPanels = parseInt(resources.solar_panels_required.replace(/[^\d]/g, '')) / 1000;
    const windTurbines = parseInt(resources.wind_turbines_required.replace(/[^\d]/g, ''));

    return (
        <div className="visualization-section">
            <div className="section-header">
                <h2>3D Infrastructure Visualization</h2>
                <p>Interactive 3D models and satellite view of green hydrogen infrastructure.</p>
            </div>

            <div className="visualization-content">
                <div className="map-section card">
                    {renderSatelliteMap()}
                </div>

                <div className="models-section">
                    {solarPanels > 0 && (
                        <div className="model-card card">
                            <h3>Solar Panel Array</h3>
                            <div className="model-container">
                                <SolarPanel 
                                    solarPanelCount={Math.min(solarPanels, 10)} 
                                    electrolysisCount={parseInt(resources.electrolyzers_required)} 
                                />
                            </div>
                            <div className="model-stats">
                                <div className="stat-item">
                                    <i className="fas fa-solar-panel"></i>
                                    <span>{resources.solar_panels_required} Solar Panels</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {windTurbines > 0 && (
                        <div className="model-card card">
                            <h3>Wind Power Array</h3>
                            <div className="model-container">
                                <WindPower 
                                    windTurbineCount={Math.min(windTurbines, 5)} 
                                    electrolysisCount={parseInt(resources.electrolyzers_required)} 
                                />
                            </div>
                            <div className="model-stats">
                                <div className="stat-item">
                                    <i className="fas fa-wind"></i>
                                    <span>{resources.wind_turbines_required} Wind Turbines</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardVisualization;
