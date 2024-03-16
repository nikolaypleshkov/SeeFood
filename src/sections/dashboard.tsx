'use client'
import React from 'react'

const DashboardSection = () => {
  return (
    <div className="container mx-auto p-4 mt-20">
        <div className="flex justify-between item-center bg-white p-4 shadow rounded">
            <h1 className="text-xl font-semibold">SeeFood</h1>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Add Food
            </button>
        </div>

        <div className="mt-6">
            <input type="text" placeholder='Search...' className="w-full p-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none" />
        </div>

        <div className="mt-4 bg-white shadow rounded-lg">
            <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Search Result</h2>
            </div>
            <ul className="divide-y">
                <li
                    key="1"
                    className="flex items-center justify-between p-4 hover:bg-gray-100"
                    >
                        Food 1
                    </li>
            </ul>
        </div>

        <div className="mt-4 bg-white shadow rounded-lg">
            <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Nutritional Totals</h2>
            </div>
            <table className="min-w-full">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wider p4">Food Items</th>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wider p4">Calories</th>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wider p4">Protein</th>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wider p4">Carbs</th>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wider p4">Fats</th>
                    </tr>
                </thead>
                <tbody>
                    {/* TODO: Insert selected food items here */}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default DashboardSection