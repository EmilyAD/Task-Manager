import { Link } from "react-router-dom";
import { Sprout, CheckCircle2, TrendingUp, Award, ArrowRight, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-purple-50 to-amber-50 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="text-center">

            {/* Logo */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl text-white text-4xl mb-8 shadow-lg shadow-emerald-500/30 animate-bounce">
              🌱
            </div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              Welcome to{" "}
              <span className="text-emerald-600">
  Bloomly
</span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
              Transform your tasks into a thriving garden. Watch your productivity bloom with every completed goal.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">

              <Link
                to="/register"
                className="group px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-xl font-semibold text-lg shadow-lg shadow-emerald-500/30 transition-all hover:shadow-xl hover:shadow-emerald-500/40 hover:scale-105 flex items-center gap-2"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/login"
                className="px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 rounded-xl font-semibold text-lg transition-all hover:scale-105 shadow-lg"
              >
                Sign In
              </Link>

            </div>
          </div>

          {/* Decorative Plants */}
          <div className="absolute top-10 left-10 text-6xl animate-bounce opacity-30" style={{ animationDelay: "0.2s" }}>
            🌸
          </div>

          <div className="absolute top-20 right-20 text-6xl animate-bounce opacity-30" style={{ animationDelay: "0.4s" }}>
            🌻
          </div>

          <div className="absolute bottom-20 left-1/4 text-6xl animate-bounce opacity-30" style={{ animationDelay: "0.6s" }}>
            🌺
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Bloomly?
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-400">
            Productivity that grows with you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Feature 1 */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
            <div className="w-14 h-14 bg-emerald-500 rounded-xl flex items-center justify-center mb-4">
              <Sprout className="w-7 h-7 text-white" />
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Visual Progress
            </h3>

            <p className="text-gray-600 dark:text-gray-400">
              Watch your tasks grow from seeds to plants as you complete them.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
            <div className="w-14 h-14 bg-purple-500 rounded-xl flex items-center justify-center mb-4">
              <CheckCircle2 className="w-7 h-7 text-white" />
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Task Management
            </h3>

            <p className="text-gray-600 dark:text-gray-400">
              Organize and track tasks with categories and simple controls.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
            <div className="w-14 h-14 bg-amber-500 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Track Growth
            </h3>

            <p className="text-gray-600 dark:text-gray-400">
              Monitor your productivity and see how much you accomplish.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
            <div className="w-14 h-14 bg-pink-500 rounded-xl flex items-center justify-center mb-4">
              <Award className="w-7 h-7 text-white" />
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Earn Rewards
            </h3>

            <p className="text-gray-600 dark:text-gray-400">
              Unlock achievements and maintain productivity streaks.
            </p>
          </div>

        </div>
      </div>
      {/* Garden Preview Section */}
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

  <div className="bg-gradient-to-br from-white to-emerald-50 rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">

    <div className="grid lg:grid-cols-2 gap-12 p-12 items-center">

      <div>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full mb-6">
          <span className="text-sm font-semibold text-emerald-700">
            Beautiful Gardens
          </span>
        </div>

        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Your Personal Productivity Garden
        </h2>

        <p className="text-lg text-gray-600 mb-8">
          Every completed task blooms into a beautiful plant in your digital garden.
          Watch your achievements grow and create a vibrant display of your success.
        </p>

        <Link
          to="/register"
          className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold shadow-lg transition-all"
        >
          Start Growing
        </Link>
      </div>

      {/* Garden */}
      <div className="bg-gradient-to-b from-sky-100 to-emerald-100 rounded-2xl p-8 min-h-[300px] relative overflow-hidden">

        <div className="text-right mb-4 text-5xl">
          ☀️
        </div>

        <div className="flex flex-wrap gap-4 justify-center text-5xl">
          {["🌱","🌿","🌸","🌻","🌺","🌹","🌷","🌼","🪴","🌾","🌵","🍀"].map((plant,i)=>(
            <div key={i} className="animate-bounce" style={{animationDelay:`${i*0.1}s`}}>
              {plant}
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-b from-emerald-600 to-emerald-800"></div>

      </div>

    </div>

  </div>

</div>

{/* CTA */}
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

  <div className="relative bg-gradient-to-br from-green-500 via-emerald-500 to-green-700 rounded-3xl p-12 text-center shadow-2xl overflow-hidden">

    <div className="absolute top-4 left-6 text-3xl opacity-40">🌸</div>
    <div className="absolute top-6 right-10 text-3xl opacity-40">🌻</div>
    <div className="absolute bottom-6 left-1/4 text-3xl opacity-40">🌿</div>
    <div className="absolute bottom-6 right-1/4 text-3xl opacity-40">🌷</div>

    <h2 className="text-4xl font-bold text-white mb-4">
      Ready to Start Growing?
    </h2>

    <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
      Join thousands of users who transformed their productivity with Bloomly.
    </p>

    <Link
      to="/register"
      className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 rounded-xl font-semibold text-lg shadow-xl transition-all hover:scale-105"
    >
      Get Started Free
      <ArrowRight className="w-5 h-5" />
    </Link>

  </div>

</div>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-12">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white">
              🌱
            </div>

            <span className="font-bold text-xl text-gray-900 dark:text-white">
              Bloomly
            </span>
          </div>

          <p className="text-gray-600 dark:text-gray-400">
            © 2026 Bloomly. All rights reserved.
          </p>

        </div>

      </footer>

    </div>
  );
}