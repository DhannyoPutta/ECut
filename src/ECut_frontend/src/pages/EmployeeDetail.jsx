import React from "react";
import { useParams } from "react-router-dom";
import { Star, Phone, Clock } from "lucide-react";

const EmployeeDetailPage = () => {
    const { employeeId } = useParams();
    // const [employee, setEmployee] = useState(null);
    // const [rating, setRating] = useState(null);
    // const [portfolio, setPortfolio] = useState([]);
    // const [reviews, setReviews] = useState([]);
    // const [services, setServices] = useState([]);

    // Static employee data
    const employee = {
        employeeId: "123",
        userId: "John Doe",
        employeeRating: 4.5,
        barberShopId: "001",
        contact: "+123 456 789",
        schedule: "Mon-Fri, 9 AM - 6 PM",
    };

    // Static portfolio data
    const portfolio = [
        {
            id: 1,
            image: "https://via.placeholder.com/150",
            description: "Modern haircut for men.",
        },
        {
            id: 2,
            image: "https://via.placeholder.com/150",
            description: "Elegant fade haircut.",
        },
    ];

    // Static reviews data
    const reviews = [
        { id: 1, customerName: "John Smith", comment: "Great service!", reply: null },
        { id: 2, customerName: "Jane Doe", comment: "Loved the haircut!", reply: null },
    ];

    // Static services data
    const services = [
        { name: "Basic Haircut", price: "$20" },
        { name: "Fade Haircut", price: "$30" },
        { name: "Beard Trim", price: "$15" },
    ];

    return (
        <div className="h-screen w-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
            <div className="bg-white shadow-2xl rounded-2xl p-6">
                {/* Header Section */}
                <div className="flex items-center space-x-4">
                    <h1 className="text-4xl font-extrabold text-gray-800">{employee.userId}</h1>
                    <Star className="text-yellow-500 w-8 h-8" />
                    <p className="text-gray-600 text-xl">{employee.employeeRating} / 5</p>
                </div>
                <div className="text-gray-600 mt-4">
                    <p className="flex items-center space-x-2">
                        <Phone className="text-blue-500 w-6 h-6" />
                        <span>Contact: {employee.contact}</span>
                    </p>
                    <p className="flex items-center space-x-2">
                        <Clock className="text-green-500 w-6 h-6" />
                        <span>Work Schedule: {employee.schedule}</span>
                    </p>
                </div>

                {/* Portfolio Section */}
                <div className="mt-8">
                    <h2 className="text-2xl font-bold text-gray-800">Portfolio</h2>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        {portfolio.map((item) => (
                            <div
                                key={item.id}
                                className="border rounded-lg overflow-hidden shadow-sm"
                            >
                                <img
                                    src={item.image}
                                    alt="Portfolio"
                                    className="w-full h-40 object-cover"
                                />
                                <p className="p-4 text-gray-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Services Section */}
                <div className="mt-8">
                    <h2 className="text-2xl font-bold text-gray-800">Services & Prices</h2>
                    <ul className="mt-4 text-gray-600">
                        {services.map((service, index) => (
                            <li key={index}>
                                {service.name} - {service.price}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Reviews Section */}
                <div className="mt-8">
                    <h2 className="text-2xl font-bold text-gray-800">Customer Reviews</h2>
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className="border-t py-4 flex flex-col space-y-2"
                        >
                            <p className="text-gray-800 font-semibold">
                                {review.customerName}
                            </p>
                            <p className="text-gray-600">{review.comment}</p>
                            <div>
                                {review.reply ? (
                                    <p className="text-green-600">Reply: {review.reply}</p>
                                ) : (
                                    <button
                                        className="text-blue-500 underline"
                                        onClick={() =>
                                            alert("Reply functionality coming soon!")
                                        }
                                    >
                                        Reply
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetailPage;
