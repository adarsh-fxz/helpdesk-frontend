import React, { useState, useRef } from "react";

const TechnicianForm = () => {
  const [formData, setFormData] = useState({
    photo: null,
    photoPreview: "",
    contact: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    citizenshipFront: null,
    citizenshipFrontPreview: "",
    citizenshipBack: null,
    citizenshipBackPreview: "",
    skills: [],
    otherSkills: "",
  });

  const [errors, setErrors] = useState({});
  const [showSkillDropdown, setShowSkillDropdown] = useState(false);
  const fileInputRef = useRef(null);
  const citizenshipFrontRef = useRef(null);
  const citizenshipBackRef = useRef(null);

  const skillsList = [
    "Electrical",
    "Plumbing",
    "HVAC",
    "Computer Repair",
    "Appliance Maintenance",
    "Networking",
    "Carpentry",
    "Automotive",
    "Painting",
    "Masonry",
  ];

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.photo) {
      newErrors.photo = "Photo is required";
    }
    
    if (!formData.contact) {
      newErrors.contact = "Contact number is required";
    }
    
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    
    if (!formData.citizenshipFront) {
      newErrors.citizenshipFront = "Citizenship front is required";
    }
    
    if (!formData.citizenshipBack) {
      newErrors.citizenshipBack = "Citizenship back is required";
    }
    
    if (formData.skills.length === 0) {
      newErrors.skills = "At least one skill is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e, fieldName, previewField) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          [fieldName]: file,
          [previewField]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
      
      // Clear error when file is selected
      if (errors[fieldName]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[fieldName];
          return newErrors;
        });
      }
    }
  };

  const handleSkillToggle = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
    
    // Clear skills error when a skill is selected
    if (errors.skills) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.skills;
        return newErrors;
      });
    }
  };

  const handleAddCustomSkill = () => {
    if (formData.otherSkills.trim() && !formData.skills.includes(formData.otherSkills)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, prev.otherSkills.trim()],
        otherSkills: "",
      }));
      
      // Clear skills error when a skill is added
      if (errors.skills) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.skills;
          return newErrors;
        });
      }
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    console.log("Submitted Form:", formData);
    // Integrate API submission logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-3xl mx-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          Technician Verification
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mb-6">
          Please fill out the form completely for verification
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          

          {/* Technician Photo */}
          <div>
            <label className="block text-sm sm:text-base text-gray-700 font-medium mb-2">
              Technician Photo <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-100">
                {formData.photoPreview ? (
                  <img
                    src={formData.photoPreview}
                    alt="Technician Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs sm:text-sm text-gray-400">No photo</span>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  name="photo"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "photo", "photoPreview")}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  required
                />
              </div>
              <div className="flex-1">
                <p className="text-xs sm:text-sm text-gray-500 mb-2">
                  Upload a clear photo of yourself
                </p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="text-xs sm:text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium py-2 px-3 sm:px-4 rounded-lg transition"
                >
                  {formData.photo ? "Change Photo" : "Select Photo"}
                </button>
                {errors.photo && (
                  <p className="mt-1 text-xs text-red-500">{errors.photo}</p>
                )}
              </div>
            </div>
          </div>
          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* First Name */}
            <div>
              <label className="block text-sm sm:text-base text-gray-700 font-medium mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="firstname"
                className={`w-full text-sm sm:text-base border ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                } rounded-lg p-2 sm:p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
                required
              />
              {errors.firstName && (
                <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
              )}
            </div>
            
            {/* Last Name */}
            <div>
              <label className="block text-sm sm:text-base text-gray-700 font-medium mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="lastname"
                className={`w-full text-sm sm:text-base border ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                } rounded-lg p-2 sm:p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
                required
              />
              {errors.lastName && (
                <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>
          
          {/* Email */}
          <div>
            <label className="block text-sm sm:text-base text-gray-700 font-medium mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="abc@example.com"
              className={`w-full text-sm sm:text-base border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg p-2 sm:p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
              required
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Contact Number */}
          <div>
            <label className="block text-sm sm:text-base text-gray-700 font-medium mb-2">
              Contact Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="e.g. +977 9800000000"
              className={`w-full text-sm sm:text-base border ${
                errors.contact ? "border-red-500" : "border-gray-300"
              } rounded-lg p-2 sm:p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
              required
            />
            {errors.contact && (
              <p className="mt-1 text-xs text-red-500">{errors.contact}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm sm:text-base text-gray-700 font-medium mb-2">
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              placeholder="Enter your full address"
              className={`w-full text-sm sm:text-base border ${
                errors.address ? "border-red-500" : "border-gray-300"
              } rounded-lg p-2 sm:p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
              required
            />
            {errors.address && (
              <p className="mt-1 text-xs text-red-500">{errors.address}</p>
            )}
          </div>

          {/* Citizenship ID */}
          <div>
            <label className="block text-sm sm:text-base text-gray-700 font-medium mb-2">
              Citizenship ID <span className="text-red-500">*</span>
            </label>
            <p className="text-xs sm:text-sm text-gray-500 mb-4">
              Please upload both front and back of your citizenship document
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Front Side */}
              <div>
                <label className="block text-xs sm:text-sm text-gray-600 mb-2">Front Side</label>
                <div className="relative h-40 sm:h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden">
                  {formData.citizenshipFrontPreview ? (
                    <img
                      src={formData.citizenshipFrontPreview}
                      alt="Citizenship Front Preview"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-xs sm:text-sm text-gray-400">No image</span>
                  )}
                  <input
                    type="file"
                    ref={citizenshipFrontRef}
                    name="citizenshipFront"
                    accept="image/*"
                    onChange={(e) =>
                      handleFileChange(e, "citizenshipFront", "citizenshipFrontPreview")
                    }
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={() => citizenshipFrontRef.current.click()}
                  className="mt-2 text-xs sm:text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium py-2 px-3 rounded-lg transition w-full"
                >
                  {formData.citizenshipFront ? "Change Front" : "Upload Front"}
                </button>
                {errors.citizenshipFront && (
                  <p className="mt-1 text-xs text-red-500">{errors.citizenshipFront}</p>
                )}
              </div>

              {/* Back Side */}
              <div>
                <label className="block text-xs sm:text-sm text-gray-600 mb-2">Back Side</label>
                <div className="relative h-40 sm:h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden">
                  {formData.citizenshipBackPreview ? (
                    <img
                      src={formData.citizenshipBackPreview}
                      alt="Citizenship Back Preview"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-xs sm:text-sm text-gray-400">No image</span>
                  )}
                  <input
                    type="file"
                    ref={citizenshipBackRef}
                    name="citizenshipBack"
                    accept="image/*"
                    onChange={(e) =>
                      handleFileChange(e, "citizenshipBack", "citizenshipBackPreview")
                    }
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={() => citizenshipBackRef.current.click()}
                  className="mt-2 text-xs sm:text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium py-2 px-3 rounded-lg transition w-full"
                >
                  {formData.citizenshipBack ? "Change Back" : "Upload Back"}
                </button>
                {errors.citizenshipBack && (
                  <p className="mt-1 text-xs text-red-500">{errors.citizenshipBack}</p>
                )}
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm sm:text-base text-gray-700 font-medium mb-2">
              Skills <span className="text-red-500">*</span>
            </label>
            
            {/* Selected Skills */}
            {formData.skills.length > 0 && (
              <div className="mb-4">
                <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Selected Skills:</h3>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center bg-blue-50 text-blue-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-1 sm:ml-2 text-blue-500 hover:text-blue-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skill Selection */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowSkillDropdown(!showSkillDropdown)}
                className="w-full flex justify-between items-center border border-gray-300 rounded-lg p-2 sm:p-3 bg-white text-xs sm:text-sm text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span>Select from common skills</span>
                <svg
                  className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-500 transition-transform ${showSkillDropdown ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {showSkillDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                  {skillsList.map((skill) => (
                    <label
                      key={skill}
                      className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.skills.includes(skill)}
                        onChange={() => handleSkillToggle(skill)}
                        className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-xs sm:text-sm text-gray-700">{skill}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Custom Skill Input */}
            <div className="mt-4 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                name="otherSkills"
                value={formData.otherSkills}
                onChange={handleChange}
                placeholder="Add custom skill"
                className="flex-1 text-sm sm:text-base border border-gray-300 rounded-lg p-2 sm:p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
              <button
                type="button"
                onClick={handleAddCustomSkill}
                disabled={!formData.otherSkills.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white text-sm sm:text-base font-medium py-2 px-3 sm:px-4 rounded-lg transition"
              >
                Add
              </button>
            </div>
            {errors.skills && (
              <p className="mt-1 text-xs text-red-500">{errors.skills}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-semibold py-2 sm:py-3 px-4 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
            >
              Submit Verification Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TechnicianForm;