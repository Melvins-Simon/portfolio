const Logo = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-purple-500 hover:text-white transition-colors"
  >
    {/* Gradient Background Circle */}
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#9333ea" /> {/* purple-600 */}
        <stop offset="100%" stopColor="#ec4899" /> {/* pink-600 */}
      </linearGradient>
    </defs>

    {/* Circuit Board Base */}
    <path
      d="M10 15H30V25H10V15Z"
      fill="url(#gradient)"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* AI Neuron Symbol */}
    <path
      d="M20 10V15M15 20H10M25 20H30M20 25V30M16 16L13 13M24 16L27 13M16 24L13 27M24 24L27 27"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Binary Code Detail */}
    <path
      d="M12 17H14V19H12V17ZM16 17H18V19H16V17ZM12 21H14V23H12V21ZM16 21H18V23H16V21ZM22 17H24V19H22V17ZM26 17H28V19H26V17ZM22 21H24V23H22V21ZM26 21H28V23H26V21Z"
      fill="white"
    />
  </svg>
);

export default Logo;
