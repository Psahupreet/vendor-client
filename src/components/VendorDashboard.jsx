import React from 'react';
import { useNavigate } from 'react-router-dom';

const VendorDashboard = ({ vendors, setSelectedType }) => {
    const navigate = useNavigate();

    const vendorTypeCount = {
        Supplier: vendors.filter((v) => v.type === 'Supplier').length,
        ServiceProvider: vendors.filter((v) => v.type === 'Service Provider').length,
        Logistics: vendors.filter((v) => v.type === 'Logistics').length,
    };

    const handleFilter = (type) => {
        setSelectedType(type);
        navigate("/list");
    };

    return (
        <div className="max-w-lg mx-auto mt-8 p-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md rounded-lg text-center">
            <h2 className="text-2xl font-semibold">Vendor Dashboard</h2>
            <div className="mt-10 h-full w-full flex flex-wrap place-content-evenly">
                <div>
                <button
                    className="w-40 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 text-center"
                    onClick={() => handleFilter('Supplier')}
                >
                    Supplier ({vendorTypeCount.Supplier})
                </button>
                </div>
                <div>
                <button
                    className="w-40 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 text-center"
                    onClick={() => handleFilter('Service Provider')}
                >
                    Service Prov ({vendorTypeCount.ServiceProvider})
                </button>
                </div>
               
               <div>
               <button
                    className="mt-4 w-40 px-4 py-2 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600 text-center"
                    onClick={() => handleFilter('Logistics')}
                >
                    Logistics ({vendorTypeCount.Logistics})
                </button>
               </div>
             
             <div>
             <button
                    className="mt-4 w-40 px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 text-center"
                    onClick={() => handleFilter(null)}
                >
                    All Vendors ({vendors.length})
                </button>
             </div>
            </div>
        </div>
    );
};

export default VendorDashboard;
