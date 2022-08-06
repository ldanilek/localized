import { query } from './_generated/server'

interface TranslateRequest {
    text: string,
    language: string,
}

export default query(async ({ db }, language: string): Promise<TranslateRequest | null> => {
  let unlocalizedDoc = await db.table('localized_text').index('by_localized_text').range(q => q.eq('language', language).eq('localizedText', null)).first();
  console.log(unlocalizedDoc);
  if (unlocalizedDoc === null) {
    return null;
  }
  return {
    text: unlocalizedDoc.text,
    language: unlocalizedDoc.language,
  };
})
