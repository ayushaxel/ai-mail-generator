import React from "react";

const AuthForm = ({ 
  isLogin, 
  setIsLogin, 
  authData, 
  setAuthData, 
  handleAuth 
}) => {
  return (
    <div className="max-w-md w-full rounded-3xl p-8 shadow-2xl bg-white">
      <h1 className="text-4xl font-bold text-center mb-2">AI Mail</h1>
      <p className="text-center text-gray-600 mb-8">Generate Emails with AI</p>

      <div className="flex bg-gray-100 rounded-2xl p-1 mb-8">
        <button
          type="button"
          onClick={() => setIsLogin(true)}
          className={`flex-1 py-3 rounded-xl font-medium ${isLogin ? "bg-white shadow" : ""}`}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => setIsLogin(false)}
          className={`flex-1 py-3 rounded-xl font-medium ${!isLogin ? "bg-white shadow" : ""}`}
        >
          Register
        </button>
      </div>

      <form onSubmit={handleAuth} className="space-y-5">
        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            value={authData.name}
            onChange={(e) => setAuthData({ ...authData, name: e.target.value })}
            className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500"
            required
          />
        )}

        <input
          type="email"
          placeholder="Email Address"
          value={authData.email}
          onChange={(e) => setAuthData({ ...authData, email: e.target.value })}
          className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={authData.password}
          onChange={(e) => setAuthData({ ...authData, password: e.target.value })}
          className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold text-lg"
        >
          {isLogin ? 'Login' : 'Create Account'}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;