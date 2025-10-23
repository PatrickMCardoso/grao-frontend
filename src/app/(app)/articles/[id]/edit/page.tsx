'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/auth';
import { useAllTags } from '@/hooks/use-all-tags';
import { useArticle } from '@/hooks/use-article';
import { useUpdateArticle } from '@/hooks/use-update-article';

type FormData = {
  title: string;
  imageUrl: string;
  tags: string[];
  content: string;
};

type FormErrors = {
  title?: string;
  content?: string;
  tags?: string;
  general?: string;
};

const FORBIDDEN_WORDS = [
  'idiota',
  'burro',
  'estupido',
  'estúpido',
  'imbecil',
  'otario',
  'otário',
  'merda',
  'porra',
  'caralho',
  'fdp',
  'puta',
  'vadia',
  'nazi',
  'fascista',
  'comunista',
  'drogas',
  'maconha',
  'cocaina',
  'cocaína',
  'crack',
  'lsd',
  'ecstasy',
  'lixo',
  'bosta',
  'desgraça',
  'desgraca',
  'vagabundo',
  'golpista',
  'corrupto',
  'ladrão',
  'ladrao',
];

const MANUAL_TAGS = ['Frontend', 'Backend', 'Mobile', 'DevOps', 'AI'];

export default function EditArticlePage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { data: allTags = [] } = useAllTags();
  const { data: article, isLoading } = useArticle(Number(params.id));
  const updateArticleMutation = useUpdateArticle();

  const [formData, setFormData] = useState<FormData>({
    title: '',
    imageUrl: '',
    tags: [],
    content: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showAllTags, setShowAllTags] = useState(false);

  // Carregar dados do artigo quando disponível
  useEffect(() => {
    if (article && article.tags) {
      const tagNames = article.tags.map((tag) => tag.name);

      setFormData({
        title: article.title,
        imageUrl: '',
        tags: tagNames,
        content: article.content,
      });
    }
  }, [article]);

  // Verificar se o usuário é o autor
  useEffect(() => {
    if (article && user && article.authorId !== user.id) {
      router.push('/articles');
    }
  }, [article, user, router]);

  const validateForbiddenWords = (text: string): boolean => {
    const normalizedText = text
      .toLowerCase()
      .normalize('NFD')
      .replaceAll(/[\u0300-\u036f]/g, '')
      .replaceAll(/[^a-z0-9\s]/g, ' ');

    return FORBIDDEN_WORDS.some((word) => {
      const normalizedWord = word
        .toLowerCase()
        .normalize('NFD')
        .replaceAll(/[\u0300-\u036f]/g, '');

      const regex = new RegExp(`\\b${normalizedWord}\\b`, 'i');
      return regex.test(normalizedText);
    });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Título é obrigatório';
    } else if (formData.title.trim().length < 5) {
      newErrors.title = 'Título deve ter pelo menos 5 caracteres';
    } else if (validateForbiddenWords(formData.title)) {
      newErrors.title = 'Título contém palavras não permitidas';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Conteúdo é obrigatório';
    } else if (formData.content.trim().length < 50) {
      newErrors.content = 'Conteúdo deve ter pelo menos 50 caracteres';
    } else if (validateForbiddenWords(formData.content)) {
      newErrors.content = 'Conteúdo contém palavras não permitidas';
    }

    if (formData.tags.length === 0) {
      newErrors.tags = 'Selecione pelo menos uma tag';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTagToggle = (tag: string) => {
    setFormData((prev) => {
      const isSelected = prev.tags.some((t) => t.toLowerCase() === tag.toLowerCase());

      if (isSelected) {
        return {
          ...prev,
          tags: prev.tags.filter((t) => t.toLowerCase() !== tag.toLowerCase()),
        };
      } else {
        return {
          ...prev,
          tags: [...prev.tags, tag],
        };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setErrors({ general: 'Você precisa estar logado para editar um artigo' });
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      await updateArticleMutation.mutateAsync({
        id: Number(params.id),
        title: formData.title.trim(),
        content: formData.content.trim(),
        imageUrl: formData.imageUrl.trim() || undefined,
        tags: formData.tags,
      });

      router.push(`/articles/${params.id}`);
    } catch (error) {
      console.error('Erro ao editar artigo:', error);
      setErrors({ general: 'Erro ao editar artigo. Tente novamente.' });
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl space-y-3">
        <div className="space-y-2">
          <Button variant="ghost" size="sm" asChild className="justify-start p-0">
            <Link href="/articles" className="mt-2 gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Link>
          </Button>
          <h1 className="text-2xl font-bold text-neutral-900">Carregando...</h1>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="mx-auto max-w-4xl space-y-3">
        <div className="space-y-2">
          <Button variant="ghost" size="sm" asChild className="justify-start p-0">
            <Link href="/articles" className="mt-2 gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Link>
          </Button>
          <h1 className="text-2xl font-bold text-neutral-900">Artigo não encontrado</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-3">
      <div className="space-y-2">
        <Button variant="ghost" size="sm" asChild className="justify-start p-0">
          <Link href={`/articles/${params.id}`} className="mt-2 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
        </Button>
        <h1 className="text-2xl font-bold text-neutral-900">Editar artigo</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="text-base font-medium text-neutral-900">
            Título do artigo *
          </label>
          <Input
            id="title"
            type="text"
            placeholder="Título"
            value={formData.title}
            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
            tone="soft"
            className={`border-0 placeholder:text-neutral-400 focus-visible:ring-0 ${errors.title ? 'ring-2 ring-red-500' : ''}`}
          />
          {errors.title && <p className="text-base text-red-600">{errors.title}</p>}
        </div>

        <div className="space-y-1">
          <label htmlFor="imageUrl" className="text-base font-medium text-neutral-900">
            Imagem do artigo
          </label>
          <Input
            id="imageUrl"
            type="url"
            placeholder="URL da imagem"
            value={formData.imageUrl}
            onChange={(e) => setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))}
            tone="soft"
            className="border-0 placeholder:text-neutral-400 focus-visible:ring-0"
          />
          <p className="text-xs text-neutral-500">Deixe em branco para usar a imagem padrão</p>
        </div>

        {/* Tags */}
        <fieldset className="space-y-3">
          <legend className="text-base font-medium text-neutral-900">
            Tags do artigo *
            {formData.tags.length > 0 && (
              <span className="ml-2 text-sm text-neutral-600">
                ({formData.tags.length} selecionada{formData.tags.length === 1 ? '' : 's'})
              </span>
            )}
          </legend>

          {/* Tags manuais */}
          <div className="bg-muted flex flex-wrap items-center gap-2 rounded-lg p-2">
            {MANUAL_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagToggle(tag)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  formData.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
                }`}
              >
                {tag}
              </button>
            ))}
            {allTags.length > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowAllTags(!showAllTags)}
                className="ml-2 text-sm text-neutral-600 hover:text-neutral-900"
              >
                {showAllTags ? 'Ocultar' : 'Ver todas'}
              </Button>
            )}
          </div>

          {/* Tags adicionais */}
          {showAllTags && allTags.length > 0 && (
            <div className="bg-muted flex max-h-32 flex-wrap gap-2 overflow-y-auto rounded-lg p-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagToggle(tag)}
                  className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                    formData.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          {errors.tags && <p className="text-base text-red-600">{errors.tags}</p>}
        </fieldset>

        {/* Conteúdo */}
        <div className="space-y-2">
          <label htmlFor="content" className="text-base font-medium text-neutral-900">
            Conteúdo do artigo *
          </label>
          <textarea
            id="content"
            placeholder="Escreva o conteúdo do seu artigo..."
            value={formData.content}
            onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
            className={`bg-muted min-h-[80px] w-full resize-y rounded-md border-0 px-3 py-2 text-sm text-neutral-900 transition-colors placeholder:text-neutral-400 focus:ring-0 focus:outline-none ${errors.content ? 'ring-2 ring-red-500' : ''}`}
            rows={3}
            style={{
              height: 'auto',
              minHeight: '80px',
              resize: 'vertical',
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = Math.max(80, target.scrollHeight) + 'px';
            }}
          />
          <p className="text-xs text-neutral-500">
            Mínimo de 50 caracteres • {formData.content.length} caracteres
          </p>
          {errors.content && <p className="text-base text-red-600">{errors.content}</p>}
        </div>

        {/* Erro geral */}
        {errors.general && (
          <div className="rounded-md border border-red-200 bg-red-50 p-3">
            <p className="text-base text-red-600">{errors.general}</p>
          </div>
        )}

        <Button type="submit" disabled={updateArticleMutation.isPending} className="mb-3 w-full">
          {updateArticleMutation.isPending ? 'Salvando...' : 'Salvar alterações'}
        </Button>
      </form>
    </div>
  );
}
