import { defineField, defineType } from "sanity";

export const robotProfile = defineType({
  name: "robotProfile",
  title: "Robot Profili",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nomi", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "manufacturer", title: "Ishlab chiqaruvchi", type: "string", validation: (r) => r.required() }),
    defineField({ name: "category", title: "Kategoriya nomi", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "categoryRef",
      title: "Kategoriya",
      type: "reference",
      to: [{ type: "category" }],
    }),
    defineField({ name: "year", title: "Yaratilgan yil", type: "number", validation: (r) => r.required().min(1900).max(2100) }),
    defineField({ name: "description", title: "Tavsif", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "body", title: "Batafsil ma'lumot", type: "array", of: [{ type: "block" }, { type: "image", options: { hotspot: true } }] }),
    defineField({ name: "emoji", title: "Emoji", type: "string" }),
    defineField({ name: "mainImage", title: "Asosiy rasm", type: "image", options: { hotspot: true } }),
    defineField({ name: "featured", title: "Tanlangan", type: "boolean", initialValue: false }),
    defineField({
      name: "specs",
      title: "Texnik xususiyatlar",
      type: "array",
      of: [{ type: "object", fields: [{ name: "label", type: "string", title: "Nomi" }, { name: "value", type: "string", title: "Qiymati" }] }],
    }),
    defineField({
      name: "source",
      title: "Manba",
      type: "string",
      options: {
        list: [
          { title: "Curated profile (data.ts)", value: "curated" },
          { title: "awesome-robot-descriptions", value: "awesome-robots" },
          { title: "Manual entry", value: "manual" },
        ],
      },
      initialValue: "manual",
    }),
    defineField({ name: "formats", title: "Formatlar (URDF/MJCF...)", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "license", title: "Litsenziya", type: "string" }),
    defineField({ name: "githubUrl", title: "GitHub URL", type: "url" }),
    defineField({ name: "galleryImageUrl", title: "Galereya rasmi (tashqi URL)", type: "url" }),
  ],
  preview: { select: { title: "name", subtitle: "manufacturer", media: "mainImage" } },
});
