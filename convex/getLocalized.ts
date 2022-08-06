import { query } from './_generated/server'

export default query(async ({ db }, text: string, language: string): Promise<null | string> => {
  const localizedDoc = await db
    .table('localized_text').index('by_text')
    .range(q => q.eq('language', language).eq('text', text))
    .first();
  if (localizedDoc === null) {
    console.error("Not localized ", text);
    return null;
  }
  return localizedDoc.localizedText;
})
