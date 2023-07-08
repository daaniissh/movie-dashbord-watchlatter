import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const SignupPage = () => {
  const navigate = useNavigate();
  const [allData, setAllData] = useState({
    userName: "",
    email: "",
    password: "",
  })
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios("http://localhost:3005/api/users/signup", {
        method: "POST",
        data: allData
      })
      if (response?.status == 200) {
        toast.success("Successfully completed. please Login now", {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate("/login");

        }, 2000);
      }
      console.log(response.data);
    } catch (error) {
      // alert("f")
      toast.error(error?.response?.data.message);

    }
    // Handle form submission logic here
  };
  const handleInputChange = (event) => {

    const { name, value } = event.target;
    setAllData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

  };

  return (
    <div className="min-h-screen bg-gray-200 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-4">
              <img
                className="h-10"
                src="logo.png"
                alt="Logo"
              />
              <h1 className="text-2xl font-bold">Sign Up</h1>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="font-bold">Name</label>
                <input
                  onChange={handleInputChange}
                  name='userName'
                  value={allData.userName}
                  type="text"
                  className="w-full border-2 rounded p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label className="font-bold">Email</label>
                <input
                  onChange={handleInputChange}
                  name='email'
                  value={allData.email}
                  type="email"
                  className="w-full border-2 rounded p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label className="font-bold">Password</label>
                <input
                  onChange={handleInputChange}
                  name='password'
                  value={allData.password}
                  type="password"
                  className="w-full border-2 rounded p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Sign Up
                </button>
              </div>
              <div className="text-sm text-center mt-4">
                <span>Already have an account?</span>
                <a
                  href="/login"
                  className="text-blue-500 hover:text-blue-700 font-bold ml-1"
                >
                  Log in
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignupPage;
