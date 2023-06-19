import {NextRequest, NextResponse} from 'next/server'
import countries from '@/app/lib/countries.json'
// run only on homepage
export const config = {
    matcher: '/',
}

interface CurrencyDetail {
    name: string;
    symbol: string;
}

interface CurrencyInfo {
    [key: string]: Partial<CurrencyDetail>;
}

export async function middleware(req: NextRequest) {
    const {nextUrl: url, geo} = req

    if (!geo || Object.keys(geo).length === 0) {
        console.log('no geo')
        return
    }

    console.log(geo)

    const country = geo.country ?? ''
    const city = geo.city ?? ''
    const region = geo.region ?? ''

    const countryInfo = countries.find((x) => x.cca2 === country)

    let currencyCode = ""
    let currency: Partial<CurrencyDetail> = {}
    let languages: string = ""

    if (countryInfo) {
        const currencies = countryInfo.currencies as unknown as CurrencyInfo;

        const currencyCode = Object.keys(currencies)[0];
        let currency = currencies[currencyCode]

        languages = Object.values(countryInfo.languages).join(', ');
    }

    url.searchParams.set('country', country)
    url.searchParams.set('city', city)
    url.searchParams.set('region', region)
    url.searchParams.set('currencyCode', currencyCode)
    url.searchParams.set('currencySymbol', currency?.symbol || '')
    url.searchParams.set('name', currency?.name || '')
    url.searchParams.set('languages', languages)

    console.log(url.searchParams.toString())

    return NextResponse.rewrite(url)
}
