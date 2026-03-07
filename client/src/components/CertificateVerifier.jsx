import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Eye, Download, AlertTriangle } from "lucide-react";
import Loading from "./Loading"; // Adjust the import path based on your file structure

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const CertificateVerifier = () => {
  const query = useQuery();
  const ucParam = query.get("uc");

  const [certificateData, setCertificateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!ucParam || ucParam.length !== 10) {
      setError(
        "Certificate verification failed. Please check the provided code and try again."
      );
      setLoading(false);
      return;
    }

    const fetchCertificateInfo = async () => {
      try {
        const response = await axios.get(
          `https://teranisbackend.vercel.app/verifycertificate/${ucParam}/`
        );
        setCertificateData(response.data);
      } catch (err) {
        setError(
          "Certificate verification failed. Please check the provided code and try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCertificateInfo();
  }, [ucParam]);

  return (
    <div className="min-h-screen w-screen flex items-center mt-16 md:mt-0 justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-gray-200 p-6">
      <div className="bg-gray-900 bg-opacity-80 backdrop-blur-lg rounded-2xl p-8 w-full max-w-3xl text-center shadow-xl transform transition-all hover:shadow-2xl">
        {loading ? (
          <Loading />
        ) : error ? (
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-6 rounded-xl shadow-inner flex flex-col items-center justify-center space-y-4">
            <AlertTriangle className="w-12 h-12 text-red-500" />
            <p className="text-white font-semibold text-lg">
              Oops! Verification failed—that code looks off. Double-check and
              try again!
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Success Message */}
            <p className="text-xl font-semibold text-green-400 animate-fade-in">
              Valid Certificate ✅
            </p>

            {/* User Details */}
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-6 rounded-xl shadow-inner transition-all hover:bg-opacity-70">
              <h3 className="text-2xl font-semibold text-white mb-6">
                User Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-left">
                <div className="flex items-center py-2">
                  <p className="text-gray-400 font-medium min-w-[100px]">
                    Name:
                  </p>
                  <p className="text-white ml-2 ">
                    {certificateData.user_details.name}
                  </p>
                </div>
                <div className="flex items-center py-2">
                  <p className="text-gray-400 font-medium min-w-[100px]">
                    Event:
                  </p>
                  <p className="text-white ml-2">
                    {certificateData.user_details.event_name}
                  </p>
                </div>
                <div className="flex items-center py-2">
                  <p className="text-gray-400 font-medium min-w-[100px]">
                    Date:
                  </p>
                  <p className="text-white ml-2 ">
                    {certificateData.user_details.event_date}
                  </p>
                </div>
                <div className="flex items-center py-2">
                  <p className="text-gray-400 font-medium min-w-[100px]">
                    Department:
                  </p>
                  <p className="text-white ml-2 ">
                    {certificateData.user_details.department}
                  </p>
                </div>
                <div className="flex items-center py-2">
                  <p className="text-gray-400 font-medium min-w-[100px]">
                    Semester:
                  </p>
                  <p className="text-white ml-2 ">
                    {certificateData.user_details.semester}
                  </p>
                </div>
                <div className="flex items-center py-2">
                  <p className="text-gray-400 font-medium min-w-[100px]">
                    Type:
                  </p>
                  <p className="text-white ml-2 ">
                    {certificateData.user_details.type_of_certificate || ""}
                  </p>
                </div>
                <div className="flex items-center py-2">
                  <p className="text-gray-400 font-medium min-w-[100px]">
                    Notes:
                  </p>
                  <p className="text-white ml-2 ">
                    {certificateData.user_details.notes}
                  </p>
                </div>
              </div>
            </div>

            {/* Certificate Actions */}
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-6 rounded-xl shadow-inner transition-all hover:bg-opacity-70">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Certificate
              </h3>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <a
                  href={certificateData.certificate_details.view_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View certificate in a new tab"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 w-full sm:w-auto"
                >
                  <Eye size={20} /> View
                </a>

                <div className="hidden md:flex">
                  <a
                    href={certificateData.certificate_details.download_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Download certificate"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 w-full sm:w-auto"
                  >
                    <Download size={20} /> Download
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateVerifier;
