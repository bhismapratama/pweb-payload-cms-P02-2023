/** @type {import('payload/types').CollectionConfig} */

const Changelog = {
    slug: 'changelog',
    access: {
        create: () => false,
        read: () => true,
        update: () => false,
        delete: () => true,
    },
    fields: [
        {
            name: 'type',
            label: 'Type',
            type: 'text',
            required: true,
        },
        {
            name: 'name',
            label: 'Title',
            type: 'text',
            required: true,
        },
        {
            name: 'action',
            type: 'text',
            required: true,
        },
    ],
};

export default Changelog;
