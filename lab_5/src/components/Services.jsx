import { useState } from "react";

export default function Services() {
  const [activeTab, setActiveTab] = useState("features");
  const [selectedPlan, setSelectedPlan] = useState(null);

  const features = [
    {
      title: "Profile Creation",
      description: "Create and customize your personal profile",
    },
    {
      title: "Friend Connections",
      description: "Connect with friends and family members",
    },
    {
      title: "Content Sharing",
      description: "Share photos, videos, and text posts",
    },
    {
      title: "Messaging",
      description: "Send private messages to your connections",
    },
    {
      title: "Groups & Communities",
      description: "Join groups based on your interests",
    },
    {
      title: "Event Planning",
      description: "Create and manage events with friends",
    },
  ];

  const plans = [
    {
      name: "Basic",
      price: "Free",
      features: ["Basic Profile", "Limited Posts", "Basic Messaging"],
    },
    {
      name: "Premium",
      price: "$9.99/month",
      features: [
        "Enhanced Profile",
        "Unlimited Posts",
        "Priority Support",
        "Advanced Privacy",
      ],
    },
    {
      name: "Business",
      price: "$19.99/month",
      features: [
        "Business Profile",
        "Analytics",
        "Promoted Posts",
        "Custom Branding",
      ],
    },
  ];

  return (
    <div className="bg-[#ffffff] min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#003049] mb-4">
            Our Services
          </h1>
          <p className="text-xl text-[#003049]">
            Everything you need for social networking
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setActiveTab("features")}
              className={`px-6 py-3 mr-4 rounded font-semibold ${
                activeTab === "features"
                  ? "bg-[#C1121F] text-[#ffffff]"
                  : "bg-white text-[#003049] border border-[#003049]"
              }`}
            >
              Features
            </button>
            <button
              onClick={() => setActiveTab("pricing")}
              className={`px-6 py-3 rounded font-semibold ${
                activeTab === "pricing"
                  ? "bg-[#C1121F] text-[#ffffff]"
                  : "bg-white text-[#003049] border border-[#003049]"
              }`}
            >
              Pricing
            </button>
          </div>

          {activeTab === "features" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-[#003049] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-[#003049]">{feature.description}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "pricing" && (
            <div className="grid md:grid-cols-3 gap-6">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md text-center"
                >
                  <h3 className="text-2xl font-bold text-[#003049] mb-4">
                    {plan.name}
                  </h3>
                  <div className="text-3xl font-bold text-[#C1121F] mb-6">
                    {plan.price}
                  </div>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-[#003049]">
                        ✓ {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setSelectedPlan(plan)}
                    className="bg-[#669BBC] text-[#ffffff] px-6 py-2 rounded font-semibold hover:bg-[#003049] w-full"
                  >
                    Choose Plan
                  </button>
                </div>
              ))}
            </div>
          )}

          {selectedPlan && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
                <h3 className="text-2xl font-bold text-[#003049] mb-4">
                  Selected Plan: {selectedPlan.name}
                </h3>
                <p className="text-[#003049] mb-6">
                  You have selected the {selectedPlan.name} plan for{" "}
                  {selectedPlan.price}.
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setSelectedPlan(null)}
                    className="bg-[#669BBC] text-[#ffffff] px-4 py-2 rounded font-semibold hover:bg-[#003049]"
                  >
                    Continue
                  </button>
                  <button
                    onClick={() => setSelectedPlan(null)}
                    className="bg-white text-[#003049] px-4 py-2 rounded font-semibold border border-[#003049]"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
