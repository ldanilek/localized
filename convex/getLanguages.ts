import { query } from './_generated/server'

export default query(async ({ db }): Promise<string[]> => {
  let languages: string[] = [];
  let lastLanguage = '';
  while (true) {
    const nextLanguageDoc = await db
      .table('localized_text')
      .index('by_text')
      .range(q => q.gt('language', lastLanguage))
      .first();
    if (nextLanguageDoc === null) {
      return languages;
    } else {
      lastLanguage = nextLanguageDoc.language;
      languages.push(lastLanguage);
    }
  }
})
