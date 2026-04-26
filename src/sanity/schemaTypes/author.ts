import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Muallif",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Ism", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "bio", title: "Biografiya", type: "text", rows: 3 }),
    defineField({ name: "image", title: "Rasm", type: "image", options: { hotspot: true } }),
  ],
  preview: { select: { title: "name", media: "image" } },
});
