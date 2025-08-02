import { useState } from "react";

export default function ContactForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    country: "",
    interests: [],
    bio: "",
    profilePicture: null,
    newsletter: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const interests = [
    "Technology",
    "Sports",
    "Music",
    "Travel",
    "Food",
    "Art",
    "Books",
    "Movies",
  ];

  // Validation functions
  const validateStep1 = () => {
    const stepErrors = {};

    if (!formData.name.trim()) {
      stepErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      stepErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      stepErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      stepErrors.email = "Please enter a valid email address";
    }

    if (!formData.age) {
      stepErrors.age = "Age is required";
    } else if (formData.age < 13) {
      stepErrors.age = "You must be at least 13 years old";
    } else if (formData.age > 120) {
      stepErrors.age = "Please enter a valid age";
    }

    return stepErrors;
  };

  const validateStep2 = () => {
    const stepErrors = {};

    if (!formData.country) {
      stepErrors.country = "Please select a country";
    }

    if (formData.interests.length === 0) {
      stepErrors.interests = "Please select at least one interest";
    }

    return stepErrors;
  };

  const validateStep3 = () => {
    const stepErrors = {};

    if (formData.bio && formData.bio.length > 500) {
      stepErrors.bio = "Bio must be less than 500 characters";
    }

    return stepErrors;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "interests") {
      setFormData((prev) => ({
        ...prev,
        interests: checked
          ? [...prev.interests, value]
          : prev.interests.filter((interest) => interest !== value),
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Mark field as touched
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const nextStep = () => {
    let stepErrors = {};

    // Validate current step
    if (currentStep === 1) {
      stepErrors = validateStep1();
    } else if (currentStep === 2) {
      stepErrors = validateStep2();
    } else if (currentStep === 3) {
      stepErrors = validateStep3();
    }

    setErrors(stepErrors);

    // Only proceed if no errors
    if (Object.keys(stepErrors).length === 0 && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Final validation of all steps
    const step1Errors = validateStep1();
    const step2Errors = validateStep2();
    const step3Errors = validateStep3();

    const allErrors = { ...step1Errors, ...step2Errors, ...step3Errors };

    if (Object.keys(allErrors).length === 0) {
      alert("Registration completed successfully!");
      console.log("Form data:", formData);
      // Reset form
      setFormData({
        name: "",
        email: "",
        age: "",
        country: "",
        interests: [],
        bio: "",
        profilePicture: null,
        newsletter: false,
      });
      setCurrentStep(1);
      setErrors({});
      setTouched({});
    } else {
      setErrors(allErrors);
      alert("Please fix the errors before submitting");
    }
  };

  return (
    <div className="bg-[#ffffff] min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#003049] mb-4">
              Join SocialHub
            </h1>
            <div className="flex justify-center space-x-2 mb-6">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                    step <= currentStep
                      ? "bg-[#C1121F] text-[#ffffff]"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
            <p className="text-[#003049]">Step {currentStep} of 4</p>
          </div>

          <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <div>
                <h2 className="text-xl font-semibold text-[#003049] mb-6">
                  Basic Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[#003049] font-semibold mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded focus:outline-none focus:border-[#669BBC] ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                      required
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[#003049] font-semibold mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded focus:outline-none focus:border-[#669BBC] ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[#003049] font-semibold mb-2">
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      min="13"
                      max="120"
                      className={`w-full p-3 border rounded focus:outline-none focus:border-[#669BBC] ${
                        errors.age ? "border-red-500" : "border-gray-300"
                      }`}
                      required
                    />
                    {errors.age && (
                      <p className="text-red-500 text-sm mt-1">{errors.age}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <h2 className="text-xl font-semibold text-[#003049] mb-6">
                  Location & Interests
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[#003049] font-semibold mb-2">
                      Country
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded focus:outline-none focus:border-[#669BBC] ${
                        errors.country ? "border-red-500" : "border-gray-300"
                      }`}
                      required
                    >
                      <option value="">Select a country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="IN">India</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                    </select>
                    {errors.country && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.country}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[#003049] font-semibold mb-2">
                      Interests (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {interests.map((interest) => (
                        <label key={interest} className="flex items-center">
                          <input
                            type="checkbox"
                            name="interests"
                            value={interest}
                            checked={formData.interests.includes(interest)}
                            onChange={handleInputChange}
                            className="mr-2"
                          />
                          <span className="text-[#003049]">{interest}</span>
                        </label>
                      ))}
                    </div>
                    {errors.interests && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.interests}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <h2 className="text-xl font-semibold text-[#003049] mb-6">
                  Profile Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[#003049] font-semibold mb-2">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows="4"
                      maxLength="500"
                      placeholder="Tell us about yourself..."
                      className={`w-full p-3 border rounded focus:outline-none focus:border-[#669BBC] ${
                        errors.bio ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-sm text-gray-500">
                        {formData.bio.length}/500 characters
                      </span>
                      {errors.bio && (
                        <p className="text-red-500 text-sm">{errors.bio}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#003049] font-semibold mb-2">
                      Profile Picture
                    </label>
                    <input
                      type="file"
                      name="profilePicture"
                      accept="image/*"
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-[#669BBC]"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div>
                <h2 className="text-xl font-semibold text-[#003049] mb-6">
                  Review & Submit
                </h2>
                <div className="bg-[#ffffff] p-6 rounded-lg mb-6">
                  <h3 className="font-semibold text-[#003049] mb-4">
                    Registration Summary
                  </h3>
                  <div className="space-y-2 text-[#003049]">
                    <p>
                      <strong>Name:</strong> {formData.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {formData.email}
                    </p>
                    <p>
                      <strong>Age:</strong> {formData.age}
                    </p>
                    <p>
                      <strong>Country:</strong> {formData.country}
                    </p>
                    <p>
                      <strong>Interests:</strong>{" "}
                      {formData.interests.join(", ")}
                    </p>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="newsletter"
                      checked={formData.newsletter}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span className="text-[#003049]">
                      Subscribe to our newsletter for updates
                    </span>
                  </label>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-white text-[#003049] px-6 py-2 rounded font-semibold border border-[#003049] hover:bg-gray-50"
                >
                  Previous
                </button>
              )}

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-[#C1121F] text-[#ffffff] px-6 py-2 rounded font-semibold hover:bg-[#780000] ml-auto"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-[#669BBC] text-[#ffffff] px-6 py-2 rounded font-semibold hover:bg-[#003049] ml-auto"
                >
                  Complete Registration
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
