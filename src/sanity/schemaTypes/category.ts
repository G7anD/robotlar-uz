import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "Kategoriya",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nomi", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "emoji", title: "Emoji", type: "string" }),
    defineField({ name: "description", title: "Tavsif", type: "text", rows: 2 }),
  ],
  preview: { select: { title: "name", subtitle: "emoji" } },
});
