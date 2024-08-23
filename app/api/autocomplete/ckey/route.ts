import { type NextRequest, NextResponse } from "next/server";

import headers from "@/app/lib/headers";

export const revalidate = 3_600; // 1 hour

const url = process.env.NEXT_PUBLIC_API_URL + '/v2/autocomplete/ckey?ckey=';

export async function GET(request: NextRequest) {
	const ckey = request.nextUrl.searchParams.get('ckey');

	if (!ckey) {
		return new NextResponse('Missing ckey param', { status: 400 });
	}

	try {
		const response = await fetch(url + ckey, { headers, next: { revalidate } });

		if (!response.ok) {
			return new NextResponse('Internal API Error', { status: 500 });
		}

		return NextResponse.json(await response.json());
	} catch {
		return new NextResponse('Internal Server Error', { status: 500 });
	}
}
