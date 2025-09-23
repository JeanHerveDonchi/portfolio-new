import { renderRichText } from "../services/renderRichText";

export default function BlogPost({ body }) {
    return <div className="prose prose-base 
      lg:prose-xl max-w-full w-full
    prose-a:text-primary prose-blockquote:border-primary
     prose-blockquote:border-l-[2.4px]
      prose-blockquote:text-accent-foreground
       prose-blockquote:not-italic prose-img:mx-auto">{renderRichText(body)}</div>;
}