import {NextRequest, NextResponse} from 'next/server'
import countriesJson from '@/app/lib/countries.json'

interface GeoInfo {
    country: string;
    city: string;
    region: string;
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


const countryInfoList: any = countriesJson

export const config = {
    matcher: '/',
}

export async function middlewareGeo(req: NextRequest) {
    const {nextUrl: url, geo} = req as { nextUrl: URL, geo: GeoInfo }

    if (!geo || Object.keys(geo).length === 0) {
        console.log("no geo info")
        return
    }

    const country = geo.country
    const city = geo.city
    const region = geo.region

    const countryInfo = countryInfoList.find((x: CountryInfo) => x.cca2 === country)

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

    updatedUrl.searchParams.set('country', country)
    updatedUrl.searchParams.set('city', city)
    updatedUrl.searchParams.set('region', region)

    if (currencyCode) updatedUrl.searchParams.set('currencyCode', currencyCode)
    if (currency.symbol) updatedUrl.searchParams.set('currencySymbol', currency.symbol)
    if (currency.name) updatedUrl.searchParams.set('name', currency.name)
    if (languages) updatedUrl.searchParams.set('languages', languages)

    console.log("updatedUrl", updatedUrl.toString())

    return NextResponse.rewrite(updatedUrl.toString())
}
