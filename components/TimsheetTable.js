"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TimesheetTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTimesheets = async () => {
      try {
        const res = await fetch("/api/timesheets");
        const json = await res.json();
        // Assuming API returns timesheets with totalHours included
        setData(json.timesheets || []);
      } finally {
        setLoading(false);
      }
    };

    fetchTimesheets();
  }, []);

  const openDetails = (id) => router.push(`/dashboard/${id}`);

  const getStatus = (hours) => {
    if (!hours || hours === 0) return "MISSING";
    if (hours < 40) return "INCOMPLETE";
    return "COMPLETED";
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-700";
      case "INCOMPLETE":
        return "bg-yellow-100 text-yellow-700";
      case "MISSING":
        return "bg-red-100 text-red-700";
      default:
        return "";
    }
  };

  if (loading)
    return (
      <div className="bg-white rounded-lg border border-gray-200 px-6 py-12">
        <p className="text-center text-gray-500">Loading timesheets...</p>
      </div>
    );

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="px-6 py-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Your Timesheets
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">WEEK #</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">DATE</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">STATUS</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {data.map((row) => {
                const status = getStatus(row.totalHours || 0); // Use totalHours from API
                const style = getStatusStyle(status);

                return (
                  <tr
                    key={row.id}
                    className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                    onClick={() => openDetails(row.id)}
                  >
                    <td className="py-4 px-4 text-sm text-gray-900">{row.week}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{row.dateRange}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${style}`}
                      >
                        {status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm font-medium text-blue-600 hover:text-blue-800 underline">
                      View
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
