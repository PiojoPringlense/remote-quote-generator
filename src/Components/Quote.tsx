import { QuoteType } from "../API/quotes";
import { MdArrowRightAlt } from "react-icons/md";

export const Quote = ({
	quote,
	setAuthor,
	button,
}: {
	quote: QuoteType;
	setAuthor: (author: string) => void;
	button: boolean;
}) => {
	return (
		<div className="quote">
			<p className="quote-text">{quote.quoteText}</p>
			{button && (
				<div className="quote-btn" onClick={() => setAuthor(quote.quoteAuthor)}>
					<div>
						<p className="quote-author">{quote.quoteAuthor}</p>
						<p className="quote-genre">{quote.quoteGenre}</p>
					</div>
					<div className="arrow">
						<MdArrowRightAlt />
					</div>
				</div>
			)}
		</div>
	);
};
