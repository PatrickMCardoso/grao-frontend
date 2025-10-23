type Props = {
  readonly authorName?: string;
  readonly updatedAt: string;
  readonly readTime?: string;
};

export function ArticleMeta({ authorName, updatedAt, readTime }: Props) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatAuthorName = (name: string) => {
    return name
      .split('.')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-600 sm:gap-4">
      {authorName && (
        <>
          <span className="shrink-0">
            Publicado por <span className="font-medium">{formatAuthorName(authorName)}</span>
          </span>
          <span className="text-neutral-400">•</span>
        </>
      )}
      <span className="shrink-0">{formatDate(updatedAt)}</span>
      {readTime && (
        <>
          <span className="text-neutral-400">•</span>
          <span className="shrink-0 text-xs">{readTime} min de leitura</span>
        </>
      )}
    </div>
  );
}
