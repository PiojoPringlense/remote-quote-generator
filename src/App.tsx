import { useState } from "react";
import { getQuotes, QuoteType } from "./API/quotes";
import "./App.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Quote } from "./Components/Quote";
import { MdCached } from "react-icons/md";

function App() {
	const [author, setAuthor] = useState("");
	const queryClient = useQueryClient();

	const { isLoading, data, error } = useQuery({
		queryKey: ["quotes", author],
		queryFn: () => getQuotes(author),
	});

	if (error instanceof Error) {
		console.log(error);
		return <div>{error.message}</div>;
	}

	function refetchRandomQuote() {
		queryClient.invalidateQueries({ queryKey: ["quotes", author] });
		setAuthor("");
	}

	return (
		<div className="App">
			<div className="header">
				<button onClick={refetchRandomQuote}>
					random <MdCached />{" "}
				</button>
			</div>
			<div className="quotes-container">
				{isLoading ? (
					<h1 className="author">Loading...</h1>
				) : (
					<>
						<h1 className="author">{author}</h1>
						{data?.map((quote: QuoteType) => (
							<Quote
								key={quote._id}
								quote={quote}
								setAuthor={setAuthor}
								button={author === ""}
							/>
						))}
					</>
				)}
			</div>
		</div>
	);
}

export default App;
