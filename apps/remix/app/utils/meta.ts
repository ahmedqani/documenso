import { type MessageDescriptor, i18n } from '@lingui/core';

import { NEXT_PUBLIC_WEBAPP_URL } from '@documenso/lib/constants/app';

export const appMetaTags = (title?: MessageDescriptor) => {
  const description =
    'Praxure Signing — secure, BAA-covered document signing for ABA practices. Built on the open-source Documenso engine and integrated end-to-end with the Praxure platform.';

  return [
    {
      title: title ? `${i18n._(title)} – Praxure Signing` : 'Praxure Signing',
    },
    {
      name: 'description',
      content: description,
    },
    {
      name: 'keywords',
      content:
        'Praxure, Praxure Signing, ABA signing, BCBA signing, document signing, e-signature, HIPAA-aware signing',
    },
    {
      name: 'author',
      content: 'Praxure',
    },
    {
      name: 'robots',
      content: 'noindex, nofollow',
    },
    {
      property: 'og:title',
      content: 'Praxure Signing',
    },
    {
      property: 'og:description',
      content: description,
    },
    {
      property: 'og:image',
      content: `${NEXT_PUBLIC_WEBAPP_URL()}/opengraph-image.jpg`,
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:description',
      content: description,
    },
    {
      name: 'twitter:image',
      content: `${NEXT_PUBLIC_WEBAPP_URL()}/opengraph-image.jpg`,
    },
  ];
};
