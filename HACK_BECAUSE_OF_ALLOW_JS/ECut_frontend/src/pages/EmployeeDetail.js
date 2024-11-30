import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ECut_backend } from "../../../declarations/ECut_backend";
import LoadingPage from "../component/loading/page";
const EmployeeDetailPage = () => {
    const { id } = useParams();
    // State Management
    const [employeeData, setEmployeeData] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [portfolio, setPortfolio] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Dummy data to create a new employee (You can dynamically set this)
    const createEmployeeData = {
        userId: "E123", // Replace with actual user ID or dynamic value
        employeeRating: 4.5, // Set a default rating or dynamic value
        barberShopId: "S1" // Replace with the correct shop ID
    };
    // Fetch Employee Data & Create Employee if necessary
    useEffect(() => {
        const fetchEmployeeData = async () => {
            setLoading(true);
            setError(null);
            try {
                // Check if employee already exists or create a new employee
                const employeeResult = await ECut_backend.get_employee(id);
                if (employeeResult.length === 0) {
                    // Create employee if not found
                    const createResult = await ECut_backend.create_employee(createEmployeeData);
                    if ('ok' in createResult) {
                        console.log("Employee created:", createResult.ok);
                        setEmployeeData(createResult.ok); // Set the newly created employee data
                    }
                    else {
                        throw new Error(createResult.err);
                    }
                }
                else {
                    setEmployeeData(employeeResult[0]);
                }
                // Fetch transactions and portfolio
                const transactionsResult = await ECut_backend.read_employee_transactions(id);
                setTransactions(Array.isArray(transactionsResult) ? transactionsResult : []);
                const portfolioResult = await ECut_backend.read_employee_portfolio(id);
                setPortfolio(portfolioResult);
            }
            catch (err) {
                console.error("Error fetching or creating employee data:", err);
                setError("Failed to load employee data. Please try again later.");
            }
            finally {
                setLoading(false);
            }
        };
        fetchEmployeeData();
    }, [id]);
    // Calculate Total Earnings
    const calculateTotalEarnings = () => {
        return transactions.reduce((total, transaction) => total + Number(transaction.totalAmount), 0);
    };
    if (loading) {
        return <LoadingPage />;
    }
    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }
    return (<div className="h-screen w-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
            <div className="w-full">
                {/* Header Section */}
                <div className="bg-white shadow-2xl rounded-2xl overflow-hidden mb-8">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
                        <h1 className="text-4xl font-extrabold text-white tracking-tight" aria-label="Employee Name">
                            {employeeData?.employeeName || "Loading..."}
                        </h1>
                    </div>

                    {/* Other Sections */}
                </div>

                {/* Other sections such as transactions */}
            </div>
        </div>);
};
export default EmployeeDetailPage;
