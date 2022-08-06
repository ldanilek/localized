import { defineSchema, defineTable, s } from "convex/schema";

export default defineSchema({
  localized_text: defineTable({
    language: s.string(),
    text: s.string(),
    localizedText: s.union(s.string(), s.null()),
  }).index('by_text', ["language", "text"])
  .index('by_localized_text', ["language", "localizedText"]),
});
