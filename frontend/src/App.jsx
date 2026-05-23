import React, { useState, useEffect, useCallback } from "react";
import Navbar from "./components/Navbar";
import AuthForm from "./components/AuthForm";
import GenerateForm from "./components/GenerateForm";
import EmailOutput from "./components/EmailOutput";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [isLogin, setIsLogin] = useState(true);
  const [authData, setAuthData] = useState({ name: "", email: "", password: "" });
  const [formData, setFormData] = useState({ purpose: "", keyPoints: "", tone: "Professional" });
  const [generated, setGenerated] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("generate");

  const server = "http://localhost:5000";

  const handleAuth = useCallback(async (e) => {
    e.preventDefault();
    try {
      const url = isLogin ? "/api/auth/login" : "/api/auth/register";
      const res = await axios.post(server + url, authData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setToken(res.data.token);
      setUser(res.data.user);
      toast.success(isLogin ? "Login Successful!" : "Registration Successful!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }, [isLogin, authData]);

  const generateEmail = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const pointArray = formData.keyPoints.split("\n").map(p => p.trim()).filter(p => p);
      const res = await axios.post(server + "/api/emails/generate", {
        purpose: formData.purpose,
        keyPoints: pointArray,
        tone: formData.tone,
      }, { headers: { Authorization: `Bearer ${token}` } });

      setGenerated(res.data.email);
      toast.success("Email Generated Successfully!");
      loadHistory(); // Refresh history after generating
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to generate");
    } finally {
      setLoading(false);
    }
  }, [formData, token]);

  const loadHistory = useCallback(async () => {
    try {
      const res = await axios.get(server + "/api/emails/history", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHistory(res.data.emails || []);
    } catch (error) {
      console.error("Failed to load history:", error);
    }
  }, [token]);

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setUser(null);
    setGenerated(null);
    setHistory([]);
    toast.success("Logged out");
  };

  useEffect(() => {
    if (token) loadHistory();
  }, [token, loadHistory]);

  if (!token || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <AuthForm
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          authData={authData}
          setAuthData={setAuthData}
          handleAuth={handleAuth}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogout={logout} />

      <div className="max-w-6xl mx-auto p-6">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b pb-1">
          <button
            onClick={() => setActiveTab("generate")}
            className={`pb-4 px-8 font-medium text-lg transition-all ${activeTab === "generate" ? "border-b-4 border-blue-600 text-blue-600" : "text-gray-500"}`}
          >
            Generate Email
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`pb-4 px-8 font-medium text-lg transition-all ${activeTab === "history" ? "border-b-4 border-blue-600 text-blue-600" : "text-gray-500"}`}
          >
            History ({history.length})
          </button>
        </div>

        {/* Generate Tab */}
        {activeTab === "generate" && (
          <div className="grid md:grid-cols-2 gap-8">
            <GenerateForm
              formData={formData}
              setFormData={setFormData}
              generateEmail={generateEmail}
              loading={loading}
            />
            <EmailOutput
              generated={generated}
              copyToClipboard={(text, label) => {
                navigator.clipboard.writeText(text);
                toast.success(`${label} copied!`);
              }}
              setGenerated={setGenerated}
            />
          </div>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
          <div className="bg-white rounded-3xl shadow p-8">
            <h2 className="text-2xl font-semibold mb-6">Your Email History</h2>
            
            {history.length === 0 ? (
              <div className="text-center py-32 text-gray-400">
                No emails generated yet.<br />Go to Generate tab and create some!
              </div>
            ) : (
              <div className="space-y-6">
                {history.map((email) => (
                  <div key={email._id} className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-3">
                      <p className="font-semibold text-lg">{email.subject}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(email.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <p className="text-gray-700 whitespace-pre-wrap line-clamp-4">{email.body}</p>
                    
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(email.body);
                        toast.success("Body copied!");
                      }}
                      className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      📋 Copy Body
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <Toaster position="top-center" />
    </div>
  );
};

export default App;