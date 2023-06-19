import {NextRequest, NextResponse} from 'next/server'
import countriesJson from '@/app/lib/countries.json'

interface GeoInfo {
    country?: string;
    city?: string;
    region?: string;
}

interface CurrencyDetail {
    name: string;
    symbol: string;
}

interface CountryInfo {
    cca2: string;
    currencies: {
        [key: string]: CurrencyDetail;
    };
    languages: {
        [key: string]: string;
    };
    flag: string;
}

const countryInfoList = countriesJson as CountryInfo[];

export const config = {
    matcher: '/',
}

export async function middleware(req: NextRequest) {
    const {nextUrl: url, geo} = req as { nextUrl: URL, geo: GeoInfo }

    if (!geo || Object.keys(geo).length === 0) {
        return
    }

    const country = geo.country
    const city = geo.city
    const region = geo.region

    const countryInfo = country ? countryInfoList.find((x) => x.cca2 === country) : undefined;

    let currencyCode = ""
    let currency: CurrencyDetail = {name: "", symbol: ""}
    let languages = ""

    if (countryInfo) {
        const currencies = countryInfo.currencies
        currencyCode = Object.keys(currencies)[0];
        currency = currencies[currencyCode];
        languages = Object.values(countryInfo.languages).join(', ');
    }

    const updatedUrl = new URL(url);
    if (country) updatedUrl.searchParams.set('country', country)
    if (city) updatedUrl.searchParams.set('city', city)
    if (region) updatedUrl.searchParams.set('region', region)
    if (currencyCode) updatedUrl.searchParams.set('currencyCode', currencyCode)
    if (currency.symbol) updatedUrl.searchParams.set('currencySymbol', currency.symbol)
    if (currency.name) updatedUrl.searchParams.set('name', currency.name)
    if (languages) updatedUrl.searchParams.set('languages', languages)

    return NextResponse.rewrite(updatedUrl.toString())
}
