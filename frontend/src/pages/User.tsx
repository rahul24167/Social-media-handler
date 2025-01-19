import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from "../config";

const User = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    socialHandle: '',
    images: [] as File[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Merge newly selected files with existing files in state
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...Array.from(e.target.files || [])],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    const data = new FormData();
    data.append('name', formData.name);
    data.append('socialHandle', formData.socialHandle);
    formData.images.forEach((file) => {
      data.append('images', file);
    });

    try {
      const response = await axios.post(`${BACKEND_URL}api/v1/user/submit`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Success:', response.data);
      alert('Data submitted successfully!');
      navigate("/signout");
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Failed to submit data.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">User Submission Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block font-medium">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
            required
          />
        </div>

        {/* Social Media Handle Input */}
        <div>
          <label htmlFor="socialHandle" className="block font-medium">
            Social Media Handle:
          </label>
          <input
            type="text"
            id="socialHandle"
            name="socialHandle"
            value={formData.socialHandle}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
            required
          />
        </div>

        {/* File Input */}
        <div>
          <label htmlFor="images" className="block font-medium">
            Upload Images:
          </label>
          <input
            type="file"
            id="images"
            name="images"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      {/* Preview Uploaded Images */}
      {formData.images.length > 0 && (
        <div className="mt-4">
          <h2 className="font-bold">Selected Images:</h2>
          <ul>
            {formData.images.map((image, index) => (
              <li key={index}>{image.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default User;
