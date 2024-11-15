import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import VendorForm from './components/VendorForm';
import VendorListView from './components/VendorListView';
import VendorDashboard from './components/VendorDashboard';

function App() {
    const [vendors, setVendors] = useState([]);
    const [selectedType, setSelectedType] = useState(null);

    // Add vendor to the state list
    const addVendor = (vendor) => {
        setVendors([...vendors, vendor]);
    };

    return (
        <Router>
            <div className="bg-gray-100 min-h-screen">
                <nav className="bg-blue-600 p-4 text-white">
                    <div className="container mx-auto flex justify-between">
                        <Link to="/" className="px-3 py-2 hover:bg-blue-700 rounded">Dashboard</Link>
                        <Link to="/create" className="px-3 py-2 hover:bg-blue-700 rounded">Create Vendor</Link>
                        <Link to="/list" className="px-3 py-2 hover:bg-blue-700 rounded">Vendor List</Link>
                    </div>
                </nav>
                <main className="container mx-auto p-4">
                    <Routes>
                        <Route path="/" element={<VendorDashboard vendors={vendors} setSelectedType={setSelectedType} />} />
                        <Route path="/create" element={<VendorForm addVendor={addVendor} />} />
                        <Route path="/list" element={<VendorListView vendors={vendors} selectedType={selectedType} />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
