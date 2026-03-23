import { Link } from "react-router-dom";
import { Sprout, CheckCircle2, TrendingUp, Award, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="text-center">

            {/* Logo */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-3xl text-white text-4xl mb-8 shadow-lg shadow-green-500/30">
              🌱
            </div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              Welcome to{" "}
              <span className="text-green-600">
                Bloomly
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto mb-12">
              Transform your tasks into a thriving garden. Watch your productivity bloom with every completed goal.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">

              <Link
                to="/register"
                className="group px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold text-lg shadow-lg transition-all hover:scale-105 flex items-center gap-2"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/login"
                className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 rounded-xl font-semibold text-lg transition-all hover:scale-105 shadow-lg"
              >
                Sign In
              </Link>

            </div>
          </div>

          {/* Decorations */}
          <div className="absolute top-10 left-10 text-6xl opacity-30">🌸</div>
          <div className="absolute top-20 right-20 text-6xl opacity-30">🌻</div>
          <div className="absolute bottom-20 left-1/4 text-6xl opacity-30">🌺</div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Bloomly?
          </h2>

          <p className="text-xl text-gray-600">
            Productivity that grows with you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center mb-4">
              <Sprout className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Visual Progress
            </h3>
            <p className="text-gray-600">
              Watch your tasks grow from seeds to plants.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center mb-4">
              <CheckCircle2 className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Task Management
            </h3>
            <p className="text-gray-600">
              Organize and track tasks easily.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Track Growth
            </h3>
            <p className="text-gray-600">
              Monitor your productivity progress.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center mb-4">
              <Award className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Earn Rewards
            </h3>
            <p className="text-gray-600">
              Stay motivated with achievements.
            </p>
          </div>

        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-green-600 rounded-3xl p-12 text-center shadow-2xl">

          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Start Growing?
          </h2>

          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users improving their productivity.
          </p>

          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-gray-100 text-gray-900 rounded-xl font-semibold text-lg shadow-xl transition-all hover:scale-105"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </Link>

        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white">
              🌱
            </div>
            <span className="font-bold text-xl text-gray-900">
              Bloomly
            </span>
          </div>

          <p className="text-gray-600">
            © 2026 Bloomly. All rights reserved.
          </p>

        </div>
      </footer>

    </div>
  );
}