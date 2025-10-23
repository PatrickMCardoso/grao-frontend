import { TagPill } from '@/components/tag-pill';
import { formatTag } from '@/lib/format-tag';

type Props = {
  tags: Array<{ id: number; name: string }>;
};

export function ArticleTags({ tags }: Props) {
  if (!tags?.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <TagPill key={tag.id} label={formatTag(tag.name)} className="px-3 py-1 text-sm" />
      ))}
    </div>
  );
}
