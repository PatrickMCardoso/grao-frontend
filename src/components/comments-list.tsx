'use client';

import { useState } from 'react';

import { CommentForm } from './comment-form';

type Comment = {
  id: number;
  content: string;
  authorId: number;
  createdAt: string;
  parentId: number | null;
  replies: Comment[];
  author?: {
    id: number;
    username: string;
    email: string;
  };
};

type Props = {
  readonly comments: Comment[];
  readonly onCreateComment: (content: string, parentId?: number) => Promise<void>;
  readonly onDeleteComment?: (commentId: number) => Promise<void>;
  readonly currentUserId?: number;
  readonly isLoading?: boolean;
};

function CommentItem({
  comment,
  onReply,
  onDelete,
  currentUserId,
  isLoading,
}: {
  readonly comment: Comment;
  readonly onReply: (content: string, parentId: number) => Promise<void>;
  readonly onDelete?: (commentId: number) => Promise<void>;
  readonly currentUserId?: number;
  readonly isLoading?: boolean;
}) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Agora há pouco';
    if (diffInHours < 24) return `${diffInHours}h`;
    if (diffInHours < 24 * 7) return `${Math.floor(diffInHours / 24)}d`;

    return date.toLocaleDateString('pt-BR', {
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

  const handleReply = async (content: string) => {
    await onReply(content, comment.id);
    setShowReplyForm(false);
  };

  const authorName = comment.author?.username || `Usuário ${comment.authorId}`;

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-300 text-sm font-medium text-neutral-600">
          {formatAuthorName(authorName).charAt(0)}
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium text-neutral-900">{formatAuthorName(authorName)}</span>
              <span className="text-neutral-500">{formatDate(comment.createdAt)}</span>
            </div>
            {currentUserId === comment.authorId && onDelete && (
              <button
                onClick={() => onDelete(comment.id)}
                className="flex h-6 w-6 items-center justify-center rounded text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-600"
                title="Excluir comentário"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            )}
          </div>

          <div className="text-sm leading-relaxed text-neutral-700">{comment.content}</div>

          <button
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="text-xs font-medium text-neutral-500 hover:text-neutral-700"
          >
            Responder
          </button>

          {showReplyForm && (
            <div className="mt-3 mb-4">
              <CommentForm
                onSubmit={handleReply}
                placeholder="Escreva uma resposta..."
                submitLabel="Responder"
                isLoading={isLoading}
              />
            </div>
          )}
        </div>
      </div>

      {comment.replies.length > 0 && (
        <div className="ml-11 space-y-6 border-l border-neutral-200 pt-2 pl-4">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onReply={onReply}
              onDelete={onDelete}
              currentUserId={currentUserId}
              isLoading={isLoading}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function CommentsList({
  comments,
  onCreateComment,
  onDeleteComment,
  currentUserId,
  isLoading,
}: Props) {
  const handleMainComment = (content: string) => onCreateComment(content);
  const handleReply = (content: string, parentId: number) => onCreateComment(content, parentId);

  return (
    <div className="space-y-6 pb-8">
      <div className="mb-4">
        <h3 className="mb-4 text-lg font-semibold text-neutral-900">Comentários</h3>
        <CommentForm onSubmit={handleMainComment} isLoading={isLoading} />
      </div>

      {comments.length > 0 ? (
        <div className="space-y-6 pb-4">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onReply={handleReply}
              onDelete={onDeleteComment}
              currentUserId={currentUserId}
              isLoading={isLoading}
            />
          ))}
        </div>
      ) : (
        <div className="py-4 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
            <svg
              className="h-8 w-8 text-neutral-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <h4 className="mb-2 text-lg font-medium text-neutral-900">Nenhum comentário ainda</h4>
          <p className="text-neutral-600">Seja o primeiro a comentar neste artigo!</p>
        </div>
      )}
    </div>
  );
}
