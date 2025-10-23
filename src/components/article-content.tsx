type Props = {
  readonly content: string;
};

export function ArticleContent({ content }: Props) {
  return (
    <article className="prose prose-neutral max-w-none">
      <div className="overflow-hidden text-base leading-relaxed break-all whitespace-pre-wrap text-neutral-800">
        {content}
      </div>
    </article>
  );
}
