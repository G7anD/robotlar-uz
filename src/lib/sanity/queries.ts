import { groq } from "next-sanity";

export const newsArticlesQuery = groq`*[_type == "newsArticle"] | order(publishedAt desc) {
  _id,
  "id": _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  imageEmoji,
  mainImage,
  "date": publishedAt,
  readTime,
  featured,
  "author": author->{ name, "slug": slug.current }
}`;

export const newsArticleBySlugQuery = groq`*[_type == "newsArticle" && slug.current == $slug][0] {
  _id,
  "id": _id,
  title,
  "slug": slug.current,
  excerpt,
  body,
  category,
  imageEmoji,
  mainImage,
  "date": publishedAt,
  readTime,
  featured,
  "author": author->{ name, "slug": slug.current }
}`;

export const newsArticleSlugsQuery = groq`*[_type == "newsArticle"]{ "slug": slug.current }`;

export const categoriesQuery = groq`*[_type == "category"] | order(name asc) {
  "slug": slug.current,
  name,
  emoji,
  description,
  "count": count(*[_type == "robotProfile" && references(^._id)])
}`;

export const robotsQuery = groq`*[_type == "robotProfile"] | order(name asc) {
  _id,
  "id": _id,
  name,
  "slug": slug.current,
  manufacturer,
  category,
  "categorySlug": categoryRef->slug.current,
  year,
  description,
  emoji,
  mainImage,
  featured
}`;

export const featuredRobotsQuery = groq`*[_type == "robotProfile" && featured == true] | order(name asc) {
  _id,
  "id": _id,
  name,
  "slug": slug.current,
  manufacturer,
  category,
  "categorySlug": categoryRef->slug.current,
  year,
  description,
  emoji,
  mainImage,
  featured
}`;

export const robotsByCategoryQuery = groq`*[_type == "robotProfile" && categoryRef->slug.current == $categorySlug] | order(name asc) {
  _id,
  "id": _id,
  name,
  "slug": slug.current,
  manufacturer,
  category,
  "categorySlug": categoryRef->slug.current,
  year,
  description,
  emoji,
  mainImage,
  featured
}`;

export const robotBySlugQuery = groq`*[_type == "robotProfile" && slug.current == $slug][0] {
  _id,
  "id": _id,
  name,
  "slug": slug.current,
  manufacturer,
  category,
  "categorySlug": categoryRef->slug.current,
  year,
  description,
  body,
  emoji,
  mainImage,
  featured,
  specs
}`;

export const robotSlugsQuery = groq`*[_type == "robotProfile"]{ "slug": slug.current, "categorySlug": categoryRef->slug.current }`;

export const categorySlugsQuery = groq`*[_type == "category"]{ "slug": slug.current }`;
