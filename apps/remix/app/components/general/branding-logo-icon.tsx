import type { SVGAttributes } from 'react';

export type LogoProps = SVGAttributes<SVGSVGElement>;

/**
 * Praxure Signing square mark.
 *
 * Replaces upstream Documenso square logo. Stylized "P" + circle in the
 * Praxure blue→teal gradient (sourced from
 * `apps/web/src/assets/praxure/praxure-mark.svg` in the praxure repo).
 */
export const BrandingLogoIcon = ({ ...props }: LogoProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      role="img"
      aria-label="Praxure"
      {...props}
    >
      <defs>
        <linearGradient id="praxure-mark-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4a90d9" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
      </defs>
      <g fill="url(#praxure-mark-grad)">
        <rect x="272" y="212" width="128" height="616" rx="64" />
        <path
          fillRule="evenodd"
          d="M560 196a192 192 0 1 1 0 384 192 192 0 1 1 0-384Zm0 128a64 64 0 1 0 0 128 64 64 0 1 0 0-128Z"
        />
      </g>
    </svg>
  );
};
