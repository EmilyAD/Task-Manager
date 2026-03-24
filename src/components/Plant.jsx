export default function Plant({ type, growth }) {
  const scale = Math.max(0.7, growth / 100 + 0.3);
  const common = "transition-all duration-700 origin-bottom";

  const plants = {

    "🌱": (
      <div className={common} style={{ transform: `scale(${scale})` }}>
        <div className="w-[4px] h-24 bg-green-700 mx-auto" />
        <div className="flex justify-center gap-2 -mt-2">
          <div className="w-6 h-3 bg-green-500 rounded-full rotate-[-30deg]" />
          <div className="w-6 h-3 bg-green-500 rounded-full rotate-[30deg]" />
        </div>
      </div>
    ),

    "🌿": (
      <div className={common} style={{ transform: `scale(${scale})` }}>
        <div className="w-[4px] h-28 bg-green-700 mx-auto" />
        <div className="flex flex-col items-center -mt-2 gap-1">
          <div className="w-5 h-2 bg-green-500 rounded-full rotate-[-30deg]" />
          <div className="w-5 h-2 bg-green-500 rounded-full rotate-[30deg]" />
          <div className="w-5 h-2 bg-green-400 rounded-full rotate-[-30deg]" />
          <div className="w-5 h-2 bg-green-400 rounded-full rotate-[30deg]" />
        </div>
      </div>
    ),

    "🌸": (
      <div className={common} style={{ transform: `scale(${scale})` }}>
        <div className="w-[4px] h-28 bg-green-700 mx-auto" />
        <div className="relative flex justify-center -mt-4">
          <div className="w-3 h-3 bg-yellow-300 rounded-full z-10"></div>
          <div className="absolute w-6 h-6 bg-pink-300 rounded-full"></div>
          <div className="absolute w-6 h-6 bg-pink-400 rounded-full rotate-45"></div>
        </div>
      </div>
    ),

    "🌻": (
      <div className={common} style={{ transform: `scale(${scale})` }}>
        <div className="w-[5px] h-32 bg-green-700 mx-auto" />
        <div className="relative flex justify-center -mt-4">
          <div className="w-5 h-5 bg-[#6b4f3b] rounded-full z-10"></div>
          <div className="absolute w-8 h-8 border-[6px] border-yellow-400 rounded-full"></div>
        </div>
      </div>
    ),

    "🌷": (
      <div className={common} style={{ transform: `scale(${scale})` }}>
        <div className="w-[4px] h-28 bg-green-700 mx-auto" />
        <div className="flex justify-center -mt-3">
          <div className="w-6 h-10 bg-pink-500 rounded-t-full"></div>
        </div>
      </div>
    )
  };

  return plants[type] || plants["🌱"];
}