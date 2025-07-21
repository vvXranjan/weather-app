import { Sun, Moon } from "lucide-react";

const SunMoonCard = ({ data }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">SUN & MOON</h2>
      <div className="grid grid-cols-2 gap-y-4 text-sm text-gray-700">
        <div className="flex items-center space-x-2">
          <Sun className="w-5 h-5 text-orange-500" />
          <span>Sunrise</span>
        </div>
        <div className="text-right font-medium">{data.sunrise}</div>

        <div className="flex items-center space-x-2">
          <Sun className="w-5 h-5 text-orange-500" />
          <span>Sunset</span>
        </div>
        <div className="text-right font-medium">{data.sunset}</div>

        <div className="flex items-center space-x-2">
          <Sun className="w-5 h-5 text-orange-500" />
          <span>Daylight</span>
        </div>
        <div className="text-right font-medium">{data.daylightDuration}</div>

        <div className="flex items-center space-x-2">
          <Moon className="w-5 h-5 text-blue-600" />
          <span>Moonrise</span>
        </div>
        <div className="text-right font-medium">{data.moonrise}</div>

        <div className="flex items-center space-x-2">
          <Moon className="w-5 h-5 text-blue-600" />
          <span>Moonset</span>
        </div>
        <div className="text-right font-medium">{data.moonset}</div>

        <div className="flex items-center space-x-2">
          <Moon className="w-5 h-5 text-blue-600" />
          <span>Moon</span>
        </div>
        <div className="text-right font-medium">{data.moonPhase}</div>
      </div>
    </div>
  );
};

export default SunMoonCard;
