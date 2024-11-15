import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VendorListView = ({ selectedType }) => {
    const [vendors, setVendors] = useState([]);

    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/vendors');
                setVendors(response.data);
            } catch (error) {
                console.error('Error fetching vendors', error);
            }
        };
        fetchVendors();
    }, []);

    const getCriticalityClass = (criticality) => {
        switch (criticality) {
            case 'Low':
                return 'bg-green-100';
            case 'Medium':
                return 'bg-yellow-100';
            case 'High':
                return 'bg-orange-100';
            default:
                return 'bg-gray-100';
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'Active':
                return 'bg-gray-100';
            case 'Inactive':
                return 'bg-green-100';
            default:
                return 'bg-gray-100';
        }
    };

    const filteredVendors = selectedType ? vendors.filter((v) => v.type === selectedType) : vendors;

    return (
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-gray-50 shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Vendor List</h2>
            {selectedType && (
                <h3 className="text-lg font-semibold text-blue-600 mb-4">
                    Showing {selectedType} Vendors ({filteredVendors.length})
                </h3>
            )}
            {filteredVendors.length === 0 ? (
                <p className="text-gray-600">No vendors found for {selectedType || "selected type"}.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {filteredVendors.map((vendor, index) => (
                        <div key={index} className={`p-4 shadow-sm rounded-lg border border-gray-300 ${getCriticalityClass(vendor.criticality)} ${getStatusClass(vendor.status)}`}>
                            <h3 className="text-lg font-semibold text-gray-800">{vendor.name}</h3>
                            <p className="text-gray-600">Address: {vendor.address}</p>
                            <p className="text-gray-600">Contact: {vendor.contact}</p>
                            <p className="text-gray-600">Type: {vendor.type}</p>
                            <p className="text-gray-600">
                                Criticality: <span className="font-semibold">{vendor.criticality}</span>
                            </p>
                            <p className="text-gray-600">
                                Status: <span className="font-semibold">{vendor.status}</span>
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default VendorListView;
