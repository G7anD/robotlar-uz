import { defineField, defineType } from "sanity";

export const newsArticle = defineType({
  name: "newsArticle",
  title: "Yangilik",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Sarlavha", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "excerpt", title: "Qisqa matn", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "body", title: "Asosiy matn", type: "array", of: [{ type: "block" }, { type: "image", options: { hotspot: true } }] }),
    defineField({ name: "category", title: "Kategoriya", type: "string", validation: (r) => r.required() }),
    defineField({ name: "author", title: "Muallif", type: "reference", to: [{ type: "author" }] }),
    defineField({ name: "imageEmoji", title: "Rasm Emoji", type: "string" }),
    defineField({ name: "mainImage", title: "Asosiy rasm", type: "image", options: { hotspot: true } }),
    defineField({ name: "publishedAt", title: "Nashr sanasi", type: "datetime", validation: (r) => r.required() }),
    defineField({ name: "readTime", title: "O'qish vaqti (daqiqa)", type: "number" }),
    defineField({ name: "featured", title: "Tanlangan", type: "boolean", initialValue: false }),
  ],
  orderings: [{ title: "Nashr sanasi, yangi", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "category", media: "mainImage" } },
});
