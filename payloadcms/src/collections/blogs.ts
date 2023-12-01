// src/collections/Blogs.ts

import { CollectionConfig } from 'payload/types'

const Blogs: CollectionConfig = {
  slug: 'blogs',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      label: 'Content',
      type: 'textarea',
      required: true,
    },
    {
      name: 'links',
      label: 'Links',
      type: 'text',
      required: false,
    },
    // Add other fields as needed
  ],
};

export default Blogs;
