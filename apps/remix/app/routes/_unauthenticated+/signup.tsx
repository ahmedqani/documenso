import { redirect } from "react-router";

import { appMetaTags } from "~/utils/meta";

/**
 * Praxure-internal: signup is permanently disabled.
 *
 * Recipients reach the signing surface via tokenized magic-link URLs
 * (`/sign/<token>`) — they never need an account. The only login path
 * we keep open is `/signin` for system administration. Any direct hit
 * on `/signup` redirects to the signin page.
 */

export function meta() {
  return appMetaTags();
}

export function loader() {
  throw redirect("/signin");
}

export function action() {
  throw redirect("/signin");
}

export default function SignUpDisabled() {
  return null;
}

