import React, { useState } from 'react';
import axios from 'axios';

const VendorForm = ({ addVendor }) => {
    const [vendor, setVendor] = useState({
        name: '',
        address: '',
        contact: '',
        type: 'Supplier',
        criticality: 'Low',
        status: 'Active',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setVendor({ ...vendor, [e.target.name]: e.target.value });
        if (e.target.name === "contact") setError('');  // Clear error on input change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vendor.contact)) {
            setError("Please enter a valid email address.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/vendors', vendor);
            addVendor(response.data);
            setVendor({ name: '', address: '', contact: '', type: 'Supplier', criticality: 'Low', status: 'Active' });
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (error) {
            console.error('Error creating vendor', error);
            setError("Failed to create vendor");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg bg-gray-100">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Create Vendor</h2>
            
            {success && <p className="mb-4 text-green-600 font-semibold">Vendor created successfully!</p>}

            <div className="mb-4">
                <label className="block text-gray-600">Name</label>
                <input
                    type="text"
                    name="name"
                    value={vendor.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-600">Address</label>
                <input
                    type="text"
                    name="address"
                    value={vendor.address}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-600">Contact (Email)</label>
                <input
                    type="email"
                    name="contact"
                    value={vendor.contact}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
                    required
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-600">Type</label>
                <select
                    name="type"
                    value={vendor.type}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                >
                    <option value="Supplier">Supplier</option>
                    <option value="Service Provider">Service Provider</option>
                    <option value="Logistics">Logistics</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-600">Criticality</label>
                <select
                    name="criticality"
                    value={vendor.criticality}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-600">Status</label>
                <select
                    name="status"
                    value={vendor.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>

            <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Add Vendor
            </button>
        </form>
    );
};

export default VendorForm;
