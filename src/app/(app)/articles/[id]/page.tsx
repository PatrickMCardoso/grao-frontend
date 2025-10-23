'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import { ArticleContent } from '@/components/article-content';
import { ArticleHeader } from '@/components/article-header';
import { CommentsList } from '@/components/comments-list';
import { ConfirmDialog } from '@/components/confirm-dialog';
import { Toast, useToast } from '@/components/toast';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth';
import { useArticle } from '@/hooks/use-article';
import { useComments, useCreateComment, useDeleteComment } from '@/hooks/use-comments';
import { useDeleteArticle } from '@/hooks/use-delete-article';

export default function ArticleDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const articleId = Number.parseInt(id, 10);
  const { data: article, isLoading, error } = useArticle(id);
  const { data: comments = [] } = useComments(articleId);
  const createCommentMutation = useCreateComment(articleId);
  const deleteCommentMutation = useDeleteComment(articleId);
  const deleteArticleMutation = useDeleteArticle();
  const { user } = useAuth();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { toast, showSuccess, showError, hideToast } = useToast();

  const handleCreateComment = async (content: string, parentId?: number) => {
    if (!user) return;

    return new Promise<void>((resolve, reject) => {
      createCommentMutation.mutate(
        { content, parentId },
        {
          onSuccess: () => resolve(),
          onError: (error) => reject(error),
        },
      );
    });
  };

  const handleDeleteComment = async (commentId: number) => {
    return new Promise<void>((resolve, reject) => {
      deleteCommentMutation.mutate(commentId, {
        onSuccess: () => resolve(),
        onError: (error) => reject(error),
      });
    });
  };

  const handleDeleteArticle = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDeleteArticle = async () => {
    try {
      await deleteArticleMutation.mutateAsync(articleId);
      showSuccess('Artigo excluído com sucesso!');
      router.push('/articles');
    } catch (error) {
      console.error('Erro ao excluir artigo:', error);
      showError('Não foi possível excluir o artigo. Tente novamente.');
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-4 w-24 animate-pulse rounded bg-neutral-200" />
        <div className="space-y-4">
          <div className="h-8 w-3/4 animate-pulse rounded bg-neutral-200" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-neutral-200" />
          <div className="flex gap-2">
            <div className="h-6 w-16 animate-pulse rounded-full bg-neutral-200" />
            <div className="h-6 w-20 animate-pulse rounded-full bg-neutral-200" />
          </div>
        </div>
        <div className="space-y-3">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={`skeleton-${i}`} className="h-4 animate-pulse rounded bg-neutral-200" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-neutral-900">Artigo não encontrado</h1>
        <p className="mt-2 text-neutral-600">
          O artigo que você procura não existe ou foi removido.
        </p>
        <Button asChild className="mt-4">
          <Link href="/articles">Voltar aos artigos</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Button variant="ghost" size="sm" asChild className="my-1 -ml-3 gap-2">
        <Link href="/articles">
          <ArrowLeft className="h-4 w-4" />
          Voltar aos artigos
        </Link>
      </Button>

      <ArticleHeader article={article} currentUserId={user?.id} onDelete={handleDeleteArticle} />

      <div className="mt-8">
        <ArticleContent content={article.content} />
      </div>

      <div className="mt-10 border-t border-neutral-200 pt-8">
        <CommentsList
          comments={comments}
          onCreateComment={handleCreateComment}
          onDeleteComment={handleDeleteComment}
          currentUserId={user?.id}
          isLoading={createCommentMutation.isPending || deleteCommentMutation.isPending}
        />
      </div>

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={confirmDeleteArticle}
        title="Excluir artigo"
        description="Esta ação não pode ser desfeita. O artigo e todos os seus comentários serão permanentemente removidos."
        confirmText="Excluir"
        cancelText="Cancelar"
        variant="danger"
      />

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={hideToast}
        />
      )}
    </div>
  );
}
