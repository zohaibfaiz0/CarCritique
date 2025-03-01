import { defineType, defineField } from 'sanity';

export const newsAndUpdates = defineType({
  name: 'newsAndUpdates',
  title: 'News & Updates',
  type: 'document',
  fields: [
    // Title of the News or Update
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required().min(5).max(100),
    }),
    
    // Slug for URL path
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    
    // Main Image
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    
    // Short excerpt/description
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'A short summary that will display in listings',
      validation: Rule => Rule.max(300),
    }),
    
    // Main content using PortableText
    defineField({
      name: 'content',
      title: 'Main Content',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility',
            },
          ],
        },
      ],
      validation: Rule => Rule.required().min(10),
    }),
    
    // Date field to capture when the news article was published
    defineField({
      name: 'date',
      title: 'Publish Date',
      type: 'datetime',
      validation: Rule => Rule.required(),
    }),
    
    // Author of the article
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: Rule => Rule.required().min(3).max(50),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});