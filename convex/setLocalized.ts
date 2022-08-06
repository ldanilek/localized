import { mutation } from './_generated/server'

export default mutation(
  async ({ db }, text: string, localizedText: string | null, language: string) => {
    let localizedDoc = await db
    .table('localized_text').index('by_text')
    .range(q => q.eq('language', language).eq('text', text))
    .first();
    if (localizedDoc === null) {
      db.insert('localized_text', {
        text,
        localizedText,
        language,
      });
    } else {
      localizedDoc.localizedText = localizedText;
      db.replace(localizedDoc._id, localizedDoc);
    }
    console.log(`Value of localizedText is now ${localizedText}`)
  }
)
