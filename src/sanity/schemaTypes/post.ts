// schemas/post.ts
import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  name: 'post',
  type: 'document',
  title: 'Post',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImageUrl',
      type: 'string',
      title: 'Main Image URL',
      description: 'Provide a direct link to the image hosted externally.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      type: 'string',
      title: 'Excerpt',
      description: 'A short description of the post.',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'authorName',
      type: 'string',
      title: 'Author Name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authorImage',
      type: 'string',
      title: 'Author Image URL',
      description: 'Provide a direct link to the author\'s image.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published At',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body Content',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'External Link',
                fields: [
                  defineField({
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
});