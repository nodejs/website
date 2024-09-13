import type { FC, SVGProps } from 'react';

const WinGet: FC<SVGProps<SVGSVGElement>> = props => (
  // TODO: Use real svg for WinGet: https://github.com/microsoft/winget-cli/issues/4691
  // For now, the Windows logo is used as a placeholder
  <svg
  width="32"
  height="32"
  viewBox="0 0 32 32"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  {...props}
>
  <path fill="#FEBA08" d="M17 17h10v10H17z" />
  <path fill="#05A6F0" d="M5 17h10v10H5z" />
  <path fill="#80BC06" d="M17 5h10v10H17z" />
  <path fill="#F25325" d="M5 5h10v10H5z" />
</svg>
);

export default WinGet;
