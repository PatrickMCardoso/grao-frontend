const ACRONYMS = new Set([
  'AI',
  'UI',
  'UX',
  'API',
  'SDK',
  'SQL',
  'CSS',
  'HTML',
  'JS',
  'TS',
  'CI',
  'CD',
  'AWS',
  'GCP',
  'REST',
  'GraphQL',
  'JWT',
  'OAuth',
  'SEO',
  'SPA',
  'PWA',
  'CLI',
  'GUI',
  'IDE',
  'VCS',
  'CMS',
  'ERP',
  'CRM',
  'SaaS',
  'PaaS',
  'IaaS',
]);

const COMPOUND_ACRONYMS = new Set(['UI/UX', 'CI/CD', 'HTML/CSS', 'JS/TS']);

export function formatTag(tag: string): string {
  const trimmed = tag.trim();

  // Verificar se é uma sigla composta exata
  const upperTag = trimmed.toUpperCase();
  if (COMPOUND_ACRONYMS.has(upperTag)) {
    return upperTag;
  }

  // Verificar se é uma sigla simples
  if (ACRONYMS.has(upperTag)) {
    return upperTag;
  }

  // Capitaliza normalmente
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
}
