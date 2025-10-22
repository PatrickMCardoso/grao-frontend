'use client';

import { useAllTags } from '@/hooks/use-all-tags';
import { formatTag } from '@/lib/format-tag';

import { ArticlesList } from './_components/articles-list';
import { ArticlesPagination } from './_components/articles-pagination';
import { SearchBar } from './_components/search-bar';
import { TagScroller } from './_components/tag-scroller';
import { useArticlesFilters } from './_components/use-articles-filters';

const MANUAL_TAGS = ['Frontend', 'Backend', 'Mobile', 'DevOps', 'AI'];

export default function ArticlesPage() {
  const { search, tag, page, setSearch, setTag, setPage, data, isLoading } = useArticlesFilters();
  const { data: dbTags = [] } = useAllTags();

  const all = [...MANUAL_TAGS, ...dbTags];
  const unique = Array.from(new Map(all.map((t) => [t.toLowerCase(), formatTag(t)]))).map(
    ([, v]) => v,
  );

  return (
    <section className="space-y-4 py-4">
      <SearchBar value={search} onChange={setSearch} onPageReset={() => setPage(1)} />

      <div className="-mr-4">
        <TagScroller
          tags={unique}
          active={tag}
          onToggle={(newTag) => {
            setTag(newTag);
            setPage(1);
          }}
          itemClassName="font-bold"
        />
      </div>

      <ArticlesList articles={data?.items ?? []} isLoading={isLoading} />

      <ArticlesPagination
        page={page}
        totalPages={data ? Math.max(1, Math.ceil(data.total / data.limit)) : 1}
        onChange={setPage}
      />
    </section>
  );
}
