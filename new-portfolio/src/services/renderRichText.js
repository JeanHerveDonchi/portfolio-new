import React from "react";

/**
 * Render marks (bold, italic, underline, code, etc.)
 */
function renderTextWithMarks(text, marks) {
  return marks.reduce((acc, mark) => {
    switch (mark.type) {
      case "bold":
        return <strong>{acc}</strong>;
      case "italic":
        return <em>{acc}</em>;
      case "underline":
        return <u>{acc}</u>;
      case "code":
        return <code>{acc}</code>;
      default:
        return acc;
    }
  }, text);
}

/**
 * Recursively render Contentful rich text nodes
 */
function renderNode(node, index) {
  const { nodeType, content, value, marks = [], data } = node;

  switch (nodeType) {
    case "text":
      return <React.Fragment key={index}>{renderTextWithMarks(value, marks)}</React.Fragment>;

    case "paragraph":
      return (
        <p key={index}>
          {content.map((child, i) => renderNode(child, i))}
        </p>
      );

    case "heading-1":
      return (
        <h1 key={index}>
          {content.map((child, i) => renderNode(child, i))}
        </h1>
      );
    case "heading-2":
      return (
        <h2 key={index}>
          {content.map((child, i) => renderNode(child, i))}
        </h2>
      );
    case "heading-3":
      return (
        <h3 key={index}>
          {content.map((child, i) => renderNode(child, i))}
        </h3>
      );

    case "unordered-list":
      return (
        <ul key={index}>
          {content.map((child, i) => renderNode(child, i))}
        </ul>
      );

    case "ordered-list":
      return (
        <ol key={index}>
          {content.map((child, i) => renderNode(child, i))}
        </ol>
      );

    case "list-item":
      return (
        <li key={index}>
          {content.map((child, i) => renderNode(child, i))}
        </li>
      );

    case "hr":
      return <hr key={index} />;

    case "hyperlink":
      return (
        <a key={index} href={data.uri} target="_blank" rel="noopener noreferrer">
          {content.map((child, i) => renderNode(child, i))}
        </a>
      );

    default:
      return content?.map((child, i) => renderNode(child, i)) || null;
  }
}

/**
 * Top-level renderer for rich text
 */
export function renderRichText(richTextDocument) {
  if (!richTextDocument?.content) return null;
  return richTextDocument.content.map((node, i) => renderNode(node, i));
}
