import Svg, { Path, Rect } from "react-native-svg";

export const ChartIcon = ({ color }: any) => (
  <Svg width={24} height={24} fill="none">
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m21 6-5.293 5.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 0-1.414 0L7 14"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeWidth={2}
      d="M3 3v14.8c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C4.52 21 5.08 21 6.2 21H21"
    />
  </Svg>
);

export const ArrowLeftIcon = ({ color }: any) => (
  <Svg width={22} height={22} fill="none">
    <Path
      d="M9.047 16.087 3.917 11.1l4.986-5.13M18.083 10.9l-14.024.199"
      stroke={color}
      strokeWidth={1.429}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const AddIcon = ({ color }: any) => (
  <Svg width={25} height={25} fill="none">
    <Path
      stroke={color}
      strokeWidth={2}
      d="M3.125 11.125c0-3.771 0-5.657 1.172-6.828 1.171-1.172 3.057-1.172 6.828-1.172h2.75c3.771 0 5.657 0 6.828 1.172 1.172 1.171 1.172 3.057 1.172 6.828v2.75c0 3.771 0 5.657-1.172 6.828-1.171 1.172-3.057 1.172-6.828 1.172h-2.75c-3.771 0-5.657 0-6.828-1.172-1.172-1.171-1.172-3.057-1.172-6.828v-2.75Z"
    />
    <Path
      stroke={color}
      strokeLinecap="square"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12.5 8.333v8.334M16.667 12.5H8.333"
    />
  </Svg>
);

export const ChevronDownIcon = ({ color }: any) => (
  <Svg width={24} height={24} fill="none">
    <Path stroke={color} strokeWidth={2} d="m18 9-6 6-6-6" />
  </Svg>
);

export const CalendarIcon = ({ color }: any) => (
  <Svg width={24} height={24} fill="none">
    <Rect width={18} height={15} x={3} y={6} stroke={color} rx={2} />
    <Path
      fill={color}
      d="M3 10c0-1.886 0-2.828.586-3.414C4.172 6 5.114 6 7 6h10c1.886 0 2.828 0 3.414.586C21 7.172 21 8.114 21 10H3Z"
    />
    <Path stroke={color} strokeLinecap="round" d="M7 3v3M17 3v3" />
    <Rect width={4} height={2} x={7} y={12} fill={color} rx={0.5} />
    <Rect width={4} height={2} x={7} y={16} fill={color} rx={0.5} />
    <Rect width={4} height={2} x={13} y={12} fill={color} rx={0.5} />
    <Rect width={4} height={2} x={13} y={16} fill={color} rx={0.5} />
  </Svg>
);
