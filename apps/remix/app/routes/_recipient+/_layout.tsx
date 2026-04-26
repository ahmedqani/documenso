import { Trans } from '@lingui/react/macro';
import { ChevronLeft } from 'lucide-react';
import { Link, Outlet, isRouteErrorResponse, redirect } from 'react-router';

import { useOptionalSession } from '@documenso/lib/client-only/providers/session';
import { cn } from '@documenso/ui/lib/utils';
import { Button } from '@documenso/ui/primitives/button';

import { Header as AuthenticatedHeader } from '~/components/general/app-header';
import { GenericErrorLayout } from '~/components/general/generic-error-layout';

import type { Route } from './+types/_layout';

/**
 * Praxure lockdown loader.
 *
 * Recipients should reach the Documenso signing surface ONLY through the
 * Praxure shell at `praxure.com/sign/<token>` (which iframes us). If a
 * direct top-level browser navigation hits `signing.praxure.com/sign/...`
 * we redirect them to the Praxure equivalent, which will iframe back to
 * us with `Sec-Fetch-Dest: iframe`. Iframed hits pass through.
 *
 * We use Sec-Fetch-Dest because all modern browsers send it; if absent
 * (older browsers, curl, scripts), we treat it as a top-level hit and
 * redirect — strictly the conservative posture.
 */
export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  // Only gate the public recipient surfaces.
  if (
    !url.pathname.startsWith('/sign/') &&
    !url.pathname.startsWith('/d/')
  ) {
    return null;
  }
  const dest = request.headers.get('sec-fetch-dest');
  const mode = request.headers.get('sec-fetch-mode');
  // Browser-side iframe loads send `Sec-Fetch-Dest: iframe`. Direct
  // top-level navigations send `document`. We allow `iframe` and `empty`
  // (the latter for fetch() callbacks from inside the iframe).
  if (dest === 'iframe' || dest === 'empty' || mode === 'cors') {
    return null;
  }
  if (dest === 'document') {
    const target = `https://praxure.com${url.pathname}${url.search}`;
    return redirect(target, 302);
  }
  return null;
}

/**
 * A layout to handle scenarios where the user is a recipient of a given resource
 * where we do not care whether they are authenticated or not.
 *
 * Such as direct template access, or signing.
 */
export default function RecipientLayout({ matches }: Route.ComponentProps) {
  const { sessionData } = useOptionalSession();

  // Hide the header for signing routes.
  const hideHeader = matches.some(
    (match) =>
      match?.id === 'routes/_recipient+/sign.$token+/_index' ||
      match?.id === 'routes/_recipient+/d.$token+/_index',
  );

  return (
    <div className="min-h-screen">
      {!hideHeader && sessionData?.user && <AuthenticatedHeader />}

      <main
        className={cn({
          'mb-8 mt-8 px-4 md:mb-12 md:mt-12 md:px-8': !hideHeader,
        })}
      >
        <Outlet />
      </main>
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const errorCode = isRouteErrorResponse(error) ? error.status : 500;

  return (
    <GenericErrorLayout
      errorCode={errorCode}
      secondaryButton={null}
      primaryButton={
        <Button asChild className="w-32">
          <Link to="/">
            <ChevronLeft className="mr-2 h-4 w-4" />
            <Trans>Go Back</Trans>
          </Link>
        </Button>
      }
    />
  );
}
