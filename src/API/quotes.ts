export interface ResponseType {
	data: QuoteType[];
	message: string;
	pagination: Pagination;
	statusCode: number;
	totalQuotes: number;
}

export interface QuoteType {
	__v: number;
	_id: string;
	quoteAuthor: string;
	quoteGenre: string;
	quoteText: string;
}

export interface Pagination {
	currentPage: number;
	nextPage: null;
	totalPages: number;
}

export async function getRandomQuote(): Promise<QuoteType[]> {
	const options = { method: "GET" };

	return fetch("https://quote-garden.onrender.com/api/v3/quotes/random", options)
		.then((response) => response.json())
		.then((res) => res.data)
		.catch((err) => console.error(err));
}

export async function getAuthorQuotes(author: string): Promise<QuoteType[]> {
	const options = { method: "GET" };

	return fetch(
		"https://quote-garden.onrender.com/api/v3/quotes?" + new URLSearchParams({ author }),
		options
	)
		.then((response) => response.json())
		.then((res) => res.data)
		.catch((err) => console.error(err));
}

export async function getQuotes(author: string): Promise<QuoteType[]> {
	return author === "" ? getRandomQuote() : getAuthorQuotes(author);
}
