type Props = {
  content: string;
};

export function ArticleContent({ content }: Props) {
  return (
    <article className="prose prose-neutral max-w-none">
      <div className="text-base leading-relaxed whitespace-pre-wrap text-neutral-800">
        {content}
      </div>
    </article>
  );
}
