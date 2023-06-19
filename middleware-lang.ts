import {NextResponse, NextRequest} from 'next/server';
import {match} from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

let locales = ['en', 'es'];
let defaultLocale = 'en';

function getLocale(request: NextRequest) {
    // Retrieving languages from request headers
    let headers = {'accept-language': 'en-US,en;q=0.5'};
    let languages = new Negotiator({headers}).languages();
    let defaultLocale = 'en';
    let locale = match(languages, locales, defaultLocale);
    console.log(locale);
    return locale || defaultLocale;
}

export function middlewareLang(request: NextRequest) {
    // Check if there is any supported locale in the pathname
    const pathname = request.nextUrl.pathname;
    const pathnameIsMissingLocale = locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    console.log(pathnameIsMissingLocale);
    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);

        // Redirect to the URL with the determined locale
        return NextResponse.redirect(
            new URL(`/${locale}/${pathname}`, request.url)
        );
    }
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next).*)',
        // Optional: only run on root (/) URL
        // '/'
    ],
};